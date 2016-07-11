using Documenter
import Documenter: Builder, Selectors, Formats
import Documenter.Documents: Page, Globals
import Documenter.Builder: SetupBuildDirectory
import Documenter: Selectors

#include("lib/HTMLWriter.jl")

pages = [
    "index.md"
    "Manual" => [
        "man/guide.md"
        "man/examples.md"
        "man/syntax.md"
        "man/doctests.md"
        "man/hosting.md"
        "man/latex.md"
        "man/internals.md"
    ]
    "Library" => [
        "lib/public.md"
        "lib/internals.md"
    ]
    "Dynamic pages" => [
        "dynamic/code.md"
        "Admonitions & Co" => "dynamic/admonitions.md"
    ]
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

cd(doc.user.root) do
    Selectors.dispatch(Builder.DocumentPipeline, doc)
end
mkdir("build/dynamic")

macro build()
    quote
        include("lib/HTMLWriter.jl")
        Documenter.Writers.render(doc)
    end
end
