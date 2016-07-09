"""
Provides the [`render`](@ref) methods to write the documentation as HTML files
(`MIME"text/html"`).
"""
module HTMLWriter

using Compat

import Documenter:
    Anchors,
    Builder,
    Documents,
    Expanders,
    Formats,
    Documenter,
    Utilities,
    Utilities.DOM,
    Writers

using Documenter.Utilities.DOM
@tags html body title head link article
@tags title head link
@tags nav li ul
@tags img
@tags header footer
@tags h1 h2 p em a div
@tags pre

include("Pygments.jl")

type HTMLDocument
    doctype::String
    root::DOM.Node
end
HTMLDocument(root) = HTMLDocument("html", root)

function Base.show(io::IO, doc::HTMLDocument)
    println(io, "<!DOCTYPE $(doc.doctype)>")
    println(io, doc.root)
end

import Documenter.Writers: Writer, render
function render(::Writer{Formats.HTML}, doc::Documents.Document)
    @tags hr meta
    #if ispath("build")
    #    rm("build", recursive=true)
    #end

    # determine variables
    pkgname = "SomePackage.jl (TODO)"

    #mkdir("build")
    cp("assets/style.css", "build/style.css", remove_destination=true)
    cp("assets/highlight.css", "build/highlight.css", remove_destination=true)
    cp(joinpath(Pkg.dir("Documenter"), "assets/mathjaxhelper.js"),
        "build/mathjaxhelper.js", remove_destination=true)

    for (src, page) in doc.internal.pages
        println("- building $(page.build)")
        @show page.source page.build
        @show pagename(page,doc)
        @show Formats.extension(Formats.HTML, pagename(page,doc))

        h = head(
            meta[:charset=>"UTF-8"](),
            title("Documenter.jl"),
            stylesheet(_relpath("style.css",src)),
            stylesheet(_relpath("highlight.css",src)),
            script("https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"),
            script(_relpath("mathjaxhelper.js",src))
        )

        logo = a[:href=>"http://julialang.org/"](
            img[
                ".logo",
                :src => "http://docs.julialang.org/en/release-0.4/_static/julia-logo.svg",
                :alt => "$(pkgname) logo"
            ]()
        )
        page_nav = nav[".toc"](
            logo,
            h1(pkgname),
            ul(navitem(doc.user.pages, src))
        )

        art_header = header(
            "Header stuff",
            nav(
                "You'd like some nav?",
                div("GitHub link maybe?")
            ),
            hr()
        )
        art_footer = footer(
            hr(),
            "Footer stuff"
        )

        pagenodes = domify(page, doc)
        art = article(art_header, pagenodes, art_footer)

        htmldoc = HTMLDocument(html[:lang=>"en"](h,body(page_nav, art)))
        open(Formats.extension(Formats.HTML, page.build), "w") do io
            print(io, htmldoc)
        end
    end
end

function _relpath(path, src)
    pagedir = dirname(src)
    relpath(path, isempty(pagedir)?".":pagedir)
end

function pagename(page,doc)
    docpath = normpath(relpath(page.build,doc.user.build))
    first(splitext(docpath))
end

stylesheet(href) = link[:href=>href,:rel=>"stylesheet",:type=>"text/css"]()
script(src) = DOM.Tag(:script)[:src=>src]()

@compat navitem(p::String, src) = li(a[:href=>Formats.extension(Formats.HTML,_relpath(p,src))](p))
navitem(p::Pair, src) = li(p.first, ul(navitem(p.second, src)))
navitem(p::Vector, src) = map(p->navitem(p, src), p)

# DOMIFY

function domify(anchor::Anchors.Anchor, page, doc)
    aid = "$(anchor.id)-$(anchor.nth)"
    [
        a["#$(aid)"]()
        domify(anchor.object, page, doc)
    ]
end

import Base: push!
type ListBuilder
    es::Vector
end
ListBuilder() = ListBuilder([])

function push!(lb::ListBuilder, level, node)
    @assert level >= 1
    if level == 1
        push!(lb.es, node)
    else
        if isempty(lb.es) || typeof(last(lb.es)) !== ListBuilder
            push!(lb.es, ListBuilder())
        end
        push!(last(lb.es), level-1, node)
    end
end

function domify(lb::ListBuilder)
    ul(map(lb.es) do e
        if typeof(e) === ListBuilder
            domify(e)
        else
            li(e)
        end
    end)
end

function domify(contents::Documents.ContentsNode, page, doc)
    lb = ListBuilder()
    for (count, path, anchor) in contents.elements
        header = anchor.object
        url = string(path, '#', anchor.id, '-', anchor.nth)
        node = a[:href=>url](mdconvert(header.text))
        level = Utilities.header_level(header)
        push!(lb, level, node)
    end
    domify(lb)
end

function domify(index::Documents.IndexNode, page, doc)
    lis = map(index.elements) do _
        object, doc, page, mod, cat = _
        url = string(page, "#", Utilities.slugify(object))
        li(a[:href=>url]("$(object.binding)"))
    end
    ul(lis)
end

function domify(node::Documents.DocsNodes, page, doc)
    [domify(node, page, doc) for node in node.nodes]
end

function domify(node::Documents.DocsNode, page, doc)
    @tags strong br em
    ret = [
        a[:id=>node.anchor.id, :href=>"#$(node.anchor.id)"]("#")
        strong(code("$(node.object.binding)"))
        "—" # &mdash;
        em("$(Utilities.doccat(node.object))")
        "."
        br()
        domify_doc(node.docstr,page,doc)
    ]
    Utilities.unwrap(node.methods) do methodnodes
        name = node.object.binding.var # name of the method without the modules

        # We filter out the methods that are marked `visible`
        ms = [m.method for m in filter(m -> m.visible, methodnodes)]

        push!(ret, strong("Methods"))

        # We print a small notice of the methods table is completely empty,
        # and an unordered list of methods if there are some to display.
        if isempty(methodnodes)
            push!(ret, "This function has no methods.")
        elseif isempty(ms)
            push!(ret, "This function has no methods to display.")
        else
            # A regexp to match filenames with an absolute path
            r = Regex("$(Pkg.dir())/([A-Za-z0-9]+)/(.*)")

            lis = map(ms) do m
                tv, decls, file, line = Base.arg_decl_parts(m)
                decls = decls[2:end]
                file = string(file)
                url = get(Utilities.url(doc.internal.remote, doc.user.repo, m.module, file, line), "")
                file_match = match(r, file)
                if file_match !== nothing
                    file = file_match.captures[2]
                end
                args_raw = join([Writers.MarkdownWriter.join_decl(d, html=false) for d in decls], ", ")
                tvars = isempty(tv) ? "" : "{" * join(tv,", ") * "}"
                signature = "$(name)$(tvars)($(args_raw))"
                # TODO: Multiline signature (as done in the Markdown output)
                li(code(domify(Pygments.lex("julia",signature))), " defined at ", a[:target=>"_blank", :href=>url]("$(file):$(line)"))
            end
            push!(ret, ul(lis))
        end

        # we print a small notice if we are not displaying all the methods
        nh = length(methodnodes)-length(ms) # number of hidden methods
        if nh > 0
            push!(ret, em("Hiding $(nh) method$(nh==1?"":"s") defined outside of this package."))
        end
    end
    ret
end

function domify_doc(md::Markdown.MD, page, doc)
    @tags br
    if haskey(md.meta, :results)
        # The `:results` field contains a vector of `Docs.DocStr` objects associated with
        # each markdown object. The `DocStr` contains data such as file and line info that
        # we need for generating correct source links.
        map(zip(md.content, md.meta[:results])) do _
            markdown, result = _
            ret = Vector{Any}(domify(Writers.MarkdownWriter.dropheaders(markdown), page, doc))
            @show typeof(ret)
            # When a source link is available then print the link.
            Utilities.unwrap(Utilities.url(doc.internal.remote, doc.user.repo, result)) do url
                push!(ret, a[".documenter-source", :target=>"_blank", :href=>url]("source"))
                push!(ret, br())
            end
            ret
        end
    else
        # Docstrings with no `:results` metadata won't contain source locations so we don't
        # try to print them out. Just print the basic docstring.
        domify(Writers.MarkdownWriter.dropheaders(md), page, doc)
    end
end

# nothing to show for MetaNodes, so we just return an empty list
domify(anchor::Documents.MetaNode, page, doc) = Vector{DOM.Node}()

function domify(page, doc)
    map(page.elements) do elem
        node = page.mapping[elem]
        #info("domify: $(typeof(elem)) -> $(typeof(node))")
        domify(node, page, doc)
    end
end

function domify(node, page, doc)
    warn("Default domify: $(typeof(node))")
    if typeof(node).name.module === Base.Markdown
        [
            div[".mdnote.debug"]("$(typeof(node))")
            Documenter.Utilities.DOM.MarkdownConverter.mdconvert(node, Base.Markdown.MD())
        ]
    else
        io = IOBuffer()
        Documenter.Writers.MarkdownWriter.render(io,MIME("text/plain"),node,page,doc)
        div[".ukwnode"](
            h1("$(typeof(node))"),
            pre(takebuf_string(io))
        )
    end
end

function domify(mp::Pygments.Magpie)
    @tags span
    ret = Vector()
    for (t,v) in mp
        push!(ret, isempty(t) ? span(v) : span[".$t"](v))
    end
    ret
end

import Documenter.Utilities.DOM.MarkdownConverter: mdconvert
import Base.Markdown: MD, Code, Header
@tags code
function mdconvert(c::Code, parent::MD)
    #info("MD CODE BLOCK: `$(c.language)`")
    language = isempty(c.language) ? "none" : c.language
    try
        pre(code[".language-$(language)"]((domify(Pygments.lex(language, c.code)))))
    catch
        warn("No lexer for $(language)")
        pre(code[".language-$(language)"](c.code))
    end
end

function mdconvert(c::Code, parent)
    #info("MD CODE: `$(c.language)`")
    code[".asdf"](c.code)
end

end
