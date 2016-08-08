# Necessary until HTML PR is merged
if isdefined(Documenter.Utilities, :MDFlatten)
    info("Loading methods from Documenter's HTMLWriter")
    using Documenter.Utilities.MDFlatten
    import Documenter.Utilities.DOM: HTMLDocument
    import Documenter.Writers.HTMLWriter:
        relhref,
        copy_asset,
        stylesheet_asset,
        collect_subsections,
        pagetitle,
else
    info("Loading methods from compat.jl")
    include("MDFlatten.jl")
    mdflatten = MDFlatten.mdflatten

    type HTMLDocument
        doctype::String
        root::DOM.Node
    end
    HTMLDocument(root) = HTMLDocument("html", root)

    function Base.show(io::IO, doc::HTMLDocument)
        println(io, "<!DOCTYPE $(doc.doctype)>")
        println(io, doc.root)
    end

    """
    Calculates a relative HTML link.
    """
    function relhref(from, to)
        pagedir = dirname(from)
        relpath(to, isempty(pagedir) ? "." : pagedir)
    end

    """
    Copies an asset from Documenters `assets/html/` directory to `doc.user.build`.
    Returns the path of the copied asset relative to `.build`.

    Note: while the current implementation trivially just appends `file` to
    `doc.user.build`, this behaviour should not be assumed and could change in the
    future. Instead the returned path should be used to figure out the links to the
    asset.
    """
    function copy_asset(file, doc)
        info(" - copying asset: $file")
        src = joinpath("assets/", file) # TODO: Utilities.assetsdir()
        dst = joinpath("build/", file)  # TODO: doc.user.build / assets
        isfile(src) || error("Asset '$file' not found at $(abspath(src))")
        ispath(dirname(dst)) || mkpath(dirname(dst))
        cp(src, dst, remove_destination=true)
        normpath(file)
    end

    """
    Copies over a stylesheet from the assets directory and returns the `link` node.

    `stylesheet` should be just the name of the stylesheet with the extension
    (e.g. `normalize.css`). `src` is the path of the current page and used to
    determine the relative href.
    """
    function stylesheet_asset(stylesheet, src)
        asset = joinpath("css", stylesheet)
        path = copy_asset(asset, src)
        DOM.Tag(:link)[
            :href => relhref(src, path),
            :rel => "stylesheet",
            :type => "text/css"
        ]()
    end

    """
    Tries to guess the page title by looking at the `<h1>` headers and returns the
    header contents as a `Nullable` (nulled if the algorithm was unable to determine
    the header).
    """
    function pagetitle(page::Documenter.Documents.Page)::Nullable{Any}
        for e in page.elements
            isa(e, Base.Markdown.Header{1}) && return e.text
        end
        return nothing
    end

    """
    Returns a list of tuples `(anchor, text)`, corresponding to all level 2 headers.
    """
    function collect_subsections(page::Documents.Page)
        # TODO: Should probably be replaced by a proper outline algorithm.
        #       Currently we ignore the case when there are multiple h1-s.
        hs = filter(e -> isa(e, Base.Markdown.Header{2}), page.elements)
        map(hs) do e
            anchor = page.mapping[e]
            "#$(anchor.id)-$(anchor.nth)", e.text
        end
    end
end
