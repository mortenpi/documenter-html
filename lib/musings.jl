module Musings
using Compat
import Documenter: Documents
## Outline?
type PageSection
    header :: Markdown.Header
    anchor :: Compat.String
    subsections :: Vector{PageSection}
end

function sections(page::Documents.Page)
    headers = filter(e -> isa(e, Markdown.Header), page.elements)
    sections(headers, page)
end

function sections(headers::Vector, page::Documents.Page)
    isempty(headers) && return []
    maxlevel = Utilities.header_level(headers[1])
    topheaders = find(h -> Utilities.header_level(h) <= maxlevel, headers)

    map(enumerate(topheaders)) do _
        n, i = _
        last = (n == length(topheaders)) ? length(headers) : i-1
        header = headers[i]
        anchor = page.mapping[header]
        PageSection(
            header,
            "#$(anchor.id)-$(anchor.nth)",
            sections(headers[i+1:last], page)
        )
    end

end

print_sections(sections) = print_sections(sections, 0)
function print_sections(sections, n)
    for s in sections
        print("  "^n)
        print(" ")
        Markdown.plain(STDOUT, Markdown.Header{n+1}(s.header.text))
        print_sections(s.subsections, n+1)
    end
end

## Other musings
function pageid(page, doc)
    for (src, page_try) in doc.internal.pages
        page == page_try && return src
    end
    throw(KeyError("page [$(object_id(page))] not found in document [$(object_id(doc))]"))
end

function copy_assets(doc)
    assetsdir = joinpath(Utilities.assetsdir(), "html")
    copy_assets(doc, assetsdir)
end

function copy_assets(doc, assetsdir)
    Utilities.log(doc, "copying assets to build directory.")
    isdir(assetsdir) || error("assets directory '$(abspath(assets))' is missing.")
    for file in readdir(assetsdir)
        if !isfile(file)
            warn("asset copy: skipping directory $file")
        end
        ext = splitext(file)
        if !(ext == "css" || ext == "js")
            warn("asset copy: unrecognized file type '$file' (we support only .js and .css)")
            continue
        end
        # copy the file to <build>/<ext> (e.g. /css/file.css, /js/file.js)
        builddir = joinpath(doc.user.build, ext)
        isdir(builddir) || mkdir(builddir)
        src = joinpath(assetsdir, file)
        dst = joinpath(builddir, file)
        ispath(dst) && Utilities.warn("Overwriting '$dst'.")
        cp(src, dst; remove_destination = true)
    end
end

end
