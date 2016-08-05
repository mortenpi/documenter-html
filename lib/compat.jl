# Necessary until HTML PR is merged
if isdefined(Documenter.Utilities, :MDFlatten)
    info("Loading methods from Documenter's HTMLWriter")
    using Documenter.Utilities.MDFlatten
    import Documenter.Utilities.DOM: HTMLDocument
    import Documenter.Writers.HTMLWriter:
        relhref,
        copy_asset,
        stylesheet_asset
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
end
