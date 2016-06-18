using Hiccup

stylesheet(href) = Hiccup.Node(:link, "", Dict(:href=>href,:rel=>"stylesheet",:type=>"text/css"))

h = Node(:head, [Node(:title, "Documenter.jl"), stylesheet("style.css")])

function ulist(elems...)
    lis = map(elems) do e
        li(e)
    end
    ul(lis...)
end

nav_manual = ulist("Guide","Examples","Syntax")
nav_menu = ulist("Home", ["Manual", nav_manual], "Reference")
nav = Node(:nav, nav_menu)
header = Node(:header, nav)

function anode_index()
    Node(:article, [
        h1("Documenter.jl"),
        Node(:p, Node(:em, "A documentation generator for Julia.")),
        Node(:p, "A package for building documentation from docstrings and markdown files."),

        h2("Package features"),
        ul(
            li("Minimal configuration."),
            li("Supports Julia 0.4 and 0.5-dev."),
            li("Doctests Julia code blocks.")
        ),
        Node(:p, [
            "The ",
            a(Dict(:href=>"guide.html"),"Package Guide"),
            " provides a tutorial explaining how to get started using Documenter."
        ])
    ])
end

function anode_ref()
    Node(:article, [
        h1("Function reference"),
        Node(:p, Node(:em, "A documentation generator for Julia.")),
        Node(:p, "A package for building documentation from docstrings and markdown files."),

        h2("Package features"),
        ul(
            li("Minimal configuration."),
            li("Supports Julia 0.4 and 0.5-dev."),
            li("Doctests Julia code blocks.")
        ),
        Node(:p, [
            "The ",
            a(Dict(:href=>"guide.html"),"Package Guide"),
            " provides a tutorial explaining how to get started using Documenter."
        ])
    ])
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
    b = body(header, art)
    r = html(h,b)
    open(joinpath("build",page), "w") do io
        Hiccup.render(io, r)
    end
end
