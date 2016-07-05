using Documenter
import Documenter: Builder, Selectors, Formats
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
cd(doc.user.root) do
    Selectors.dispatch(Builder.DocumentPipeline, doc)
end

macro build()
    quote
        include("lib/HTMLWriter.jl")
        Documenter.Writers.render(doc)
    end
end
