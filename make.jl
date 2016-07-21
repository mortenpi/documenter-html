using Documenter
import Documenter: Builder, Selectors, Formats
import Documenter.Documents: Page, Globals
import Documenter.Builder: SetupBuildDirectory
import Documenter: Selectors

#include("lib/HTMLWriter.jl")

pages = [
    "Overview" => "index.md",
    "Manual" => [
        "Guide" => "man/guide.md",
        "man/examples.md",
        "man/syntax.md",
        "man/doctests.md",
        "man/hosting.md",
        "man/latex.md",
        "man/internals.md",
    ],
    "Library" => [
        "lib/public.md",
        "lib/internals.md",
    ],
    "Dynamic pages" => [
        "dynamic/code.md",
        "Admonitions & Co" => "dynamic/admonitions.md",
        "dynamic/styles.md",
        "dynamic/bugs.md"
    ],
]

Documenter.Selectors.disable(::Type{Documenter.Builder.RenderDocument}) = true

println("Creating the document...")
ispath("build") && rm("build", recursive=true)
doc = Documenter.Documents.Document(
    source = relpath(joinpath(Pkg.dir("Documenter"), "docs/src")),
    format = Formats.HTML,
    modules = Documenter,
    pages = pages
)
@show doc.user.source

function custompage!(doc, name, mds)
    elements = Base.Markdown.parse(mds).content
    build = joinpath(doc.user.build, name)
    page = Page("", build, elements, ObjectIdDict(), Globals())
    doc.internal.pages[name] = page
end

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

custompage!(doc, "dynamic/styles", """
# Demonstrating _styles_ of MD elements

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

""")

custompage!(doc, "dynamic/bugs", """
# Some existing bugs

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

macro build()
    quote
        include("lib/HTMLWriter.jl")
        Documenter.Writers.render(doc)
    end
end
