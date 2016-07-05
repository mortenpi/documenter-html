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
    Utilities.DOM

using Documenter.Utilities.DOM
@tags html body title head link article
@tags title head link
@tags nav li ul
@tags img
@tags header footer
@tags h1 h2 p em a div
@tags pre

import Documenter.Writers: Writer, render
function render(::Writer{Formats.HTML}, doc::Documents.Document)
    #if ispath("build")
    #    rm("build", recursive=true)
    #end

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
            title("Documenter.jl"),
            stylesheet(_relpath("style.css",src)),
            stylesheet(_relpath("highlight.css",src)),
            script("https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"),
            script(_relpath("mathjaxhelper.js",src))
        )

        logo = a[:href=>"http://julialang.org/"](
            img[".logo", :src=>"http://docs.julialang.org/en/release-0.4/_static/julia-logo.svg"]()
        )
        navmenu = nav(logo, ul(navitem(doc.user.pages, src)))

        art_header = header("Header stuff")
        art_footer = footer("Footer stuff")

        pagenodes = domify(page, doc)
        art = article(art_header, pagenodes, art_footer)
        open(Formats.extension(Formats.HTML, page.build), "w") do io
            print(io, html(h,body(navmenu, art)))
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
    a["#$(aid)"]()
end

function domify(contents::Documents.ContentsNode, page, doc)
    io = IOBuffer()
    Documenter.Writers.MarkdownWriter.render(io,MIME("text/plain"),contents,page,doc)
    pre[".info"](takebuf_string(io))
end

# nothing to show for MetaNodes, so we just return an empty list
domify(anchor::Documents.MetaNode, page, doc) = Vector{DOM.Node}()

function domify(page, doc)
    map(page.elements) do elem
        node = page.mapping[elem]
        domify(node, page, doc)
    end
end

function domify(node, page, doc)
    warn("Default domify: $(typeof(node))")
    if typeof(node).name.module === Base.Markdown
        Documenter.Utilities.DOM.MarkdownConverter.mdconvert(node, Base.Markdown.MD())
    else
        io = IOBuffer()
        Documenter.Writers.MarkdownWriter.render(io,MIME("text/plain"),node,page,doc)
        div[".ukwnode"](
            h1("$(typeof(node))"),
            pre(takebuf_string(io))
        )
    end
end

include("Pygments.jl")
function domify(mp::Pygments.Magpie)
    @tags span
    ret = Vector()
    for (t,v) in mp
        push!(ret, isempty(t) ? span(v) : span[".$t"](v))
    end
    ret
end

import Documenter.Utilities.DOM.MarkdownConverter: mdconvert
import Base.Markdown: MD, Code
@tags code
function mdconvert(c::Code, parent::MD)
    info("MD CODE BLOCK: `$(c.language)`")
    language = isempty(c.language) ? "none" : c.language
    try
        code[".language-$(language)"](pre((domify(Pygments.lex(language, c.code)))))
    catch
        warn("No lexer for $(language)")
        code[".language-$(language)"](pre(c.code))
    end
end
mdconvert(c::Code, parent) = begin info("MD CODE: `$(c.language)`"); code[".asdf"](c.code) end

end
