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
@tags nav li ul
@tags img
@tags header footer
@tags h1 h2 p em a
@tags pre

import Documenter.Writers: Writer, render
function render(::Writer{Formats.HTML}, doc::Documents.Document)
    #if ispath("build")
    #    rm("build", recursive=true)
    #end

    #mkdir("build")
    cp("assets/style.css", "build/style.css")

    h = head(title("Documenter.jl"), stylesheet("style.css"))

    logo = a[:href=>"http://julialang.org/"](
        img[".logo", :src=>"http://docs.julialang.org/en/release-0.4/_static/julia-logo.svg"]()
    )
    navmenu = nav(logo, ul(navitem(doc.user.pages)))

    art_header = header("Header stuff")
    art_footer = footer("Footer stuff")

    for (src, page) in doc.internal.pages
        println("- building $(page.build)")
        pagenodes = domify(page, doc)
        art = article(art_header, pagenodes, art_footer)
        open(Formats.extension(Formats.HTML, page.build), "w") do io
            print(io, html(h,body(navmenu, art)))
        end
    end
end

stylesheet(href) = link[:href=>href,:rel=>"stylesheet",:type=>"text/css"]()
@compat navitem(p::String) = li(a[:href=>Formats.extension(Formats.HTML,p)](p))
navitem(p::Pair) = li(p.first, ul(navitem(p.second)))
navitem(p::Vector) = map(navitem, p)

function domify(page::Documents.Page, doc::Documents.Document)
    map(page.elements) do elem
        node = page.mapping[elem]
        domify(node, page, doc)
    end
end

function domify(node, page::Documents.Page, doc::Documents.Document)
    warn("Default domify().")
    if typeof(node).name.module === Base.Markdown
        Documenter.Utilities.DOM.MarkdownConverter.mdconvert(node)
    else
        pre[".ukwnode"]("$(typeof(node))")
    end
end

end
