using DocStringExtensions
using Documenter
import Documenter: Builder, Selectors, Formats
import Documenter.Documents: Page, Globals
import Documenter.Builder: SetupBuildDirectory

# Configure Documenter
Documenter.Selectors.disable(::Type{Documenter.Builder.RenderDocument}) = true
Documenter.Selectors.disable(::Type{Documenter.Builder.CheckDocument}) = true

function loadpages(dir, prefix)
    names = collect(readdir(dir))
    map!(n -> joinpath(prefix, n), names)
    sort(names)
end

println("Creating the document...")
ispath("build") && rm("build", recursive=true)
doc = Documenter.Documents.Document(
    sitename = "Julia language",
    source = "julia-docs/",
    format = Formats.HTML,
    modules = [Main, Documenter],
    pages = [
        "Home" => "index",
        "Manual" => loadpages("julia-docs/manual", "manual"),
        "Standard Libary" => loadpages("julia-docs/stdlib", "stdlib"),
        "DevDocs" => loadpages("julia-docs/devdocs", "devdocs"),
        "Dynamic pages" => [
            "dynamic/code",
            "Admonitions & Co" => "dynamic/admonitions",
            "dynamic/styles",
            "dynamic/latex",
            "dynamic/bugs"
        ],
    ]
)

function custompage!(doc, name, mds)
    elements = Base.Markdown.parse(mds).content
    build = joinpath(doc.user.build, name)
    page = Page("", build, elements, ObjectIdDict(), Globals())
    doc.internal.pages[name] = page
end

custompage!(doc, "index", """
# The Julia manual

!!! note
    Built with Documenter.jl

```@contents
```
""")

custompage!(doc, "dynamic/code", """
# Code examples

Whee, showing off syntax highlighting.

## Python

```python
def median(pool):
    '''Statistical median to demonstrate doctest.
    >>> median([2, 9, 9, 7, 9, 2, 4, 5, 8])
    7
    '''
    copy = sorted(pool)
    size = len(copy)
    if size % 2 == 1:
        return copy[(size - 1) / 2]
    else:
        return (copy[size/2 - 1] + copy[size/2]) / 2
if __name__ == '__main__':
    import doctest
    doctest.testmod()
```

## Julia

```julia
println("Creating the document...")
ispath("build") && rm("build", recursive=true)
doc = Documenter.Documents.Document(
    source = relpath(joinpath(Pkg.dir("Documenter"), "docs/src")),
    format = Formats.HTML,
    modules = Documenter,
    pages = pages
)
@show doc.user.source

\"""Does stuff\"""
function custompage!(doc, name, mds)
    elements = Base.Markdown.parse(mds).content
    build = joinpath(doc.user.build, name)
    page = Page("", build, elements, ObjectIdDict(), Globals())
    doc.internal.pages[name] = page
end
```
""")

custompage!(doc, "dynamic/admonitions", """
# Admonitions

!!! warning
    Paragraph?

    Another paragraph?

!!! note
    # Heading
    ## in
    ### an
    #### ad-
    ##### mo-
    ###### ni
    ####### tion?



!!! tip "Custom title for an admonition?"
    ```julia
    function custompage!(doc, name, mds)
        elements = Base.Markdown.parse(mds).content
        build = joinpath(doc.user.build, name)
        page = Page("", build, elements, ObjectIdDict(), Globals())
        doc.internal.pages[name] = page
    end
    ```

    Let's link to something: [`makedocs`](@ref)

    !!! warning
        Admonition in an admonition?
""")

"""
$(SIGNATURES)

`foo` is a function that does things.
"""
foo() = nothing
foo(x,y) = nothing

"""
Bar is a type!
"""
type Bar
    x :: Int
    "`y` is documented."
    y :: Float64
end

custompage!(doc, "dynamic/styles", """
# Demonstrating *styles* of MD elements

## Headers

`h1` and `h2` ↑.

### Header 3
This is `h3`.

#### Header 4
This is `h4`.

##### Header 5
This is `h5`.

###### Header 6
This is `h6`.

## Blocks

```
This is a normal code block.
With multiple lines.
```

> This is a quote.
> Another *line* in source.

## Tables

If you require... | ... then use...
----------- | -----------------
features         | PyPlot, Plotly, GR
speed            | GR
interactivity    | Plotly
beauty           | Plotly, PGFPlots
REPL Plotting    | UnicodePlots
3D plots  		 | PyPlot, GR, Plotly
a GUI Window     | GR, PyPlot, PlotlyJS
a small footprint | UnicodePlots, Plotly


## Pictures

[![Ducks! (alt-text)](http://www.freedigitalphotos.net/images/img/homepage/87357.jpg)](https://en.wikipedia.org/wiki/Duck)

## Docstrings

Of course, docstrings can be included. Such as the one for the functions [`foo`](@ref):
```@docs
foo
```
In addition to that we can have even more docstrings!
```julia
# Example with foo and Bar
x = Bar()
foo(x)
```
```@docs
Bar
```

That's all folks!

""")

custompage!(doc, "dynamic/latex", """
# The ``\\sin(x^2)`` project

... aka ``\\LaTeX`` in titles.

```math
y = f(x)
```

""")

custompage!(doc, "dynamic/bugs", """
# Some existing bugs

... in Julia's Markdown parser.

## Emphasis

The underscores don't work for _emphasis_ nor __strong emphasis__.
Only *asterisks* work for **emphasis**.

## Titles for links and images.

![Ducks! (alt-text)](http://www.freedigitalphotos.net/images/img/homepage/87357.jpg "Title text? About ducks?")

[About ducks.](https://en.wikipedia.org/wiki/Duck "Whee, wikipedia.")

## Lists

If a list follows a paragraph without a space...
- it
- does
- not
- work

Also, dense lists don't get parsed correctly:

- This should be
- a dense list.
- But it's not.

```@example
using Base.Markdown
x = md\"""
Some initial paragraph.

- This should be
- a dense list.
- But it's not.
\"""

for li in x.content[2].items
    println(" - \$(typeof(li)) :: \$(li)")
end
```

These should not be paragraphs.

""")

Selectors.disable(::Type{SetupBuildDirectory}) = true

cd(doc.user.root) do
    @show doc.user.root
    Selectors.runner(SetupBuildDirectory, doc)
    mkdir("build/dynamic")
    Selectors.dispatch(Builder.DocumentPipeline, doc)
end

println("Pages:")
for (src, page) in doc.internal.pages
    println(" - [$src] \t $(page.source)")
end

build() = Documenter.Writers.render(doc)
