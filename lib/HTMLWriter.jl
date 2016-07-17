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

type MetaPage
    #title::String
    title::Vector{DOM.Node}
    subpages::Vector{MetaPage}
    page::Nullable{Pair{String,Documents.Page}}
    parent::Nullable{MetaPage}
    prev::Nullable{MetaPage}
    next::Nullable{MetaPage}
end

"""
Build a `Page` "database" out of a `Document`.
"""
type PageDB
    doc::Documents.Document
    tree::Vector{MetaPage}
    """a flat list of pages that have a corresponding "physical" page."""
    pages::Vector{MetaPage}
    function PageDB(doc::Documents.Document)
        pagewalkstate = PageWalkState(doc, [], nothing, nothing)
        tree = walkpages(pagewalkstate, doc.user.pages)
        @show map(typeof,tree)
        new(doc,tree,pagewalkstate.pagelist)
    end
end

type PageWalkState
    doc::Documents.Document
    pagelist::Vector{MetaPage}
    parent::Nullable{MetaPage}
    prev::Nullable{MetaPage}
end

walkpages(state, ps::Vector) = map(p->walkpages(state,p), ps)
function walkpages{T}(state, p::Pair{String,Vector{T}})
    mp = MetaPage(
        [DOM.Node(p.first)],
        [],
        Nullable{Pair{String,Documents.Page}}(),
        state.parent,
        nothing,
        nothing
    )
    state.parent = mp
    subpages = walkpages(state, p.second)
    mp.subpages = subpages
    state.parent = mp.parent
    mp
end
function walkpages(state, p::Pair{String,String})
    mp = walkpages(state, p.second)
    mp.title = [DOM.Node(p.first)]
    mp
end
function walkpages(state, src::String)
    pname = pagename(src)
    page = state.doc.internal.pages[pname]
    mp = MetaPage(
        get(pagetitle(page), "<Untitled>"),
        [],
        Nullable(src => page),
        state.parent,
        state.prev,
        nothing
    )
    Utilities.unwrap(state.prev) do prev
        prev.next = Nullable(mp)
    end
    state.prev = Nullable(mp)
    push!(state.pagelist, mp)
    mp
end

import Base: start, next, done
start(pagedb::PageDB) = start(pagedb.pages)
next(pagedb::PageDB, state) = next(pagedb.pages, state)
done(pagedb::PageDB, state) = done(pagedb.pages, state)

parents(mp::MetaPage) = isnull(mp.parent) ? [mp] : push!(parents(get(mp.parent)), mp)

import Documenter.Writers: Writer, render
function render(::Writer{Formats.HTML}, doc::Documents.Document)
    @tags hr meta input
    @tags span
    #if ispath("build")
    #    rm("build", recursive=true)
    #end

    # determine variables
    pkgname = "\$pkgname.jl" # TODO
    versionstring = "v0.0.0" # TODO

    pagedb = PageDB(doc)

    #mkdir("build")
    cp("assets/normalize.css", "build/normalize.css", remove_destination=true)
    cp("assets/style.css", "build/style.css", remove_destination=true)
    cp("assets/highlight.css", "build/highlight.css", remove_destination=true)
    cp(joinpath(Pkg.dir("Documenter"), "assets/mathjaxhelper.js"),
        "build/mathjaxhelper.js", remove_destination=true)

    for metapage in pagedb
        if isnull(metapage.page) continue end
        src, page = get(metapage.page)
        println("- building $(page.build)")
        @show page.source page.build
        @show pagename(page,doc)
        @show Formats.extension(Formats.HTML, pagename(page,doc))

        h = head(
            meta[:charset=>"UTF-8"](),
            meta[:name => "viewport", :content => "width=device-width, initial-scale=1.0"](),
            title("Documenter.jl"),
            stylesheet(_relpath("normalize.css",src)),
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
            input[:type => "text", :placeholder => "Search docs"](),
            #navitem(doc.user.pages, src)
            navitem(pagedb, metapage)
        )

        header_links = map(parents(metapage)) do mp
            if isnull(mp.page)
                li(mp.title)
            else
                li(a[:href => navhref(mp, metapage)](mp.title))
            end
        end

        art_header = header(
            nav(
                ul(
                    #li(a[:href => navhref("/", src)]("Home")),
                    header_links
                ),
                a[".edit-page", :href=>"https://github.com/"](span[".fa"]("\uf09b"), " Edit on GitHub") # TODO
            ),
            hr()
        )

        # build the footer with nav links
        art_footer = footer(hr())
        Utilities.unwrap(metapage.prev) do mp
            direction = span[".direction"]("Previous")
            pagetitle = span[".title"](mp.title)
            link = a[".previous", :href => navhref(mp, metapage)](direction, pagetitle)
            push!(art_footer.nodes, link)
        end
        Utilities.unwrap(metapage.next) do mp
            direction = span[".direction"]("Next")
            pagetitle = span[".title"](mp.title)
            link = a[".next", :href => navhref(mp, metapage)](direction, pagetitle)
            push!(art_footer.nodes, link)
        end

        pagenodes = domify(page, doc)
        art = article(art_header, pagenodes, art_footer)

        htmldoc = HTMLDocument(html[:lang=>"en"](h,body(page_nav, art)))
        open(Formats.extension(Formats.HTML, page.build), "w") do io
            print(io, htmldoc)
        end
    end
end

function uncertain_title(mp::Nullable{MetaPage})::Nullable{String}
    !isnull(mp) ? get(mp).title : nothing
end


flattenpages(pages::Vector) = mapreduce(flattenpages, vcat, pages)
flattenpages(page::String) = [page]
flattenpages(p::Pair) = flattenpages(p.second)

function _relpath(path, src)
    pagedir = dirname(src)
    relpath(path, isempty(pagedir) ? "." : pagedir)
end

function pagename(src::String)
    first(splitext(src))
end

function pagename(page::Documents.Page, doc)
    docpath = normpath(relpath(page.build,doc.user.build))
    first(splitext(docpath))
end

stylesheet(href) = link[:href=>href,:rel=>"stylesheet",:type=>"text/css"]()
script(src) = DOM.Tag(:script)[:src=>src]()

function navhref(to, from)
    from_src = get(from.page).first
    to_src = get(to.page).first
    Formats.extension(Formats.HTML,_relpath(to_src, from_src))
end
navlink(to,from) = a[".toctext",:href=>navhref(to,from)](to.title)

navitem(pagedb::PageDB, mp) = navitem(pagedb.tree, mp)
navitem(p::Vector, mp) = ul(map(p->navitem(p, mp), p))
function navitem(p::MetaPage, mp)
    @tags span
    link = isnull(p.page) ? span[".toctext"](p.title) : navlink(p, mp)
    item = (p === mp) ? li[".current"](link) : li(link)

    if !isempty(p.subpages)
        push!(item.nodes, navitem(p.subpages, mp))
    end

    if p === mp && !isnull(p.page)
        sections = collect_subsections(get(p.page).second)
        internal_links = map(sections) do s
            anchor, title = s
            li(a[".toctext", :href => anchor](title))
        end
        push!(item.nodes, ul[".internal"](internal_links))
    end

    item
end

navitem(p::String, mp) = li(navlink(p,p,mp))
navitem(p::Pair, mp) = li(p.first, navitem(p.second, mp))
navitem(p::Pair{String,String}, mp) = li(navlink(p.first,p.second,mp))

# DOMIFY

function domify(anchor::Anchors.Anchor, page, doc)
    aid = "$(anchor.id)-$(anchor.nth)"
    [
        a[:id => aid](),
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
    @tags div strong br em
    docheader = div[".docheader"](
        a[:id=>node.anchor.id, :href=>"#$(node.anchor.id)"]("#"),
        " ",
        strong(code("$(node.object.binding)")),
        " — ", # &mdash;
        em("$(Utilities.doccat(node.object))"),
        "."
    )
    ret = [
        docheader,
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
        pre(code[".highlight.language-$(language)"]((domify(Pygments.lex(language, c.code)))))
    catch
        warn("No lexer for $(language)")
        pre(code[".language-$(language)"](c.code))
    end
end

function mdconvert(c::Code, parent)
    #info("MD CODE: `$(c.language)`")
    code(c.code)
end


# Other utilities

"""
Returns a `Nullable{String}`, which is nulled if the page title could not be
determined.
"""
function pagetitle(page::Documenter.Documents.Page)::Nullable{Any}
    for e in page.elements
        if typeof(e) === Base.Markdown.Header{1}
            return mdconvert(e.text)
        end
    end
    return nothing
end

function collect_subsections(page::Documenter.Documents.Page)
    # TODO: Multiple H1-s?
    # TODO: Can we get header "link" as well?
    h2s = filter(e->typeof(e)===Base.Markdown.Header{2}, page.elements)
    map(h2s) do e
        anchor = page.mapping[e]
        "#$(anchor.id)-$(anchor.nth)", mdconvert(e.text)
    end
end

end
