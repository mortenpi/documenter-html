"""
Provides the [`render`](@ref) methods to write the documentation as HTML files
(`MIME"text/html"`).
"""
module HTMLWriter

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

import ..build

function build(doc::Documents.Document) # TODO: dispatch on format
    if ispath("build")
        rm("build", recursive=true)
    end

    mkdir("build")
    cp("assets/style.css", "build/style.css")

    h = head(title("Documenter.jl"), stylesheet("style.css"))
    navnode = hnode()

    art_header = header("Header stuff")
    art_footer = footer("Footer stuff")

    for (src, page) in doc.internal.pages
        dst = page.build * ".html"
        println("- building $(dst)")

        art = article(
            art_header,
            Documenter.Utilities.DOM.MarkdownConverter.mdconvert(page.elements),
            art_footer
        )

        open(joinpath("build", dst), "w") do io
            print(io, html(h,body(navnode, art)))
        end

        #=open(Formats.extension(doc.user.format, page.build), "w") do io
            for elem in page.elements
                node = page.mapping[elem]
                render(io, mime, node, page, doc)
            end
        end=#
    end
end

stylesheet(href) = link[:href=>href,:rel=>"stylesheet",:type=>"text/css"]()

function hnode()
    function ulist(elems...)
        lis = map(elems) do e
            li(e)
        end
        ul(lis...)
    end

    nav_manual = ulist(
        a[:href=>"guide.html"]("Guide"),
        "Examples",
        "Syntax"
        )
    nav_menu = ulist(
        a[:href=>"index.html"]("Home"),
        ["Manual", nav_manual],
        a[:href=>"reference.html"]("Reference")
    )
    logo = a[:href=>"http://julialang.org/"](
        img[".logo", :src=>"http://docs.julialang.org/en/release-0.4/_static/julia-logo.svg"]()
    )
    nav(logo, nav_menu)
end

function anode_ref()
    article(
        h1("Function reference"),
        p(em("A documentation generator for Julia.")),
        p("A package for building documentation from docstrings and markdown files."),

        h2("Package features"),
        ul(
            li("Minimal configuration."),
            li("Supports Julia 0.4 and 0.5-dev."),
            li("Doctests Julia code blocks.")
        ),
        p(
            "The ",
            a[:href=>"guide.html"]("Package Guide"),
            " provides a tutorial explaining how to get started using Documenter."
        )
    )
end


end
