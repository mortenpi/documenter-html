import Documenter: Formats

function build end

include("lib/HTMLWriter.jl")

#=import Documenter.Documents: Document, addpage!
function addpage!(doc::Document, dst::AbstractString)
    page = Page(src, dst)
    doc.internal.pages[src] = page
end=#

println("Creating the document...")
doc = Documenter.Documents.Document()
Documenter.Documents.addpage!(doc, "src/index.md", "index")
Documenter.Documents.addpage!(doc, "src/guide.md", "guide")

println("Build starting...")
build(doc)
println("Build complete.")
