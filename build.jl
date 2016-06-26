using Documenter.Utilities.DOM

@tags body html title head link li ul nav header article
@tags h1 h2 p em a

stylesheet(href) = link[:href=>href,:rel=>"stylesheet",:type=>"text/css"]()

h = head(title("Documenter.jl"), stylesheet("style.css"))

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
_nav = nav(nav_menu)
_header = header(_nav)

function anode_index()
    article(
        h1("Documenter.jl"),
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

pages = Dict(
    "index.html" => anode_index(),
    "guide.html" => anode_index(),
    "reference.html" => anode_ref()
)

if ispath("build")
    rm("build", recursive=true)
end

mkdir("build")
cp("assets/style.css", "build/style.css")

for (page,art) in pages
    b = body(_header, art)
    r = html(h,b)
    open(joinpath("build",page), "w") do io
        print(io, r)
    end
end
