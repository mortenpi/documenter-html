"""
Provides the [`render`](@ref) methods to write the documentation as HTML files
(`MIME"text/html"`).
"""
module HTMLWriter

using Compat

import Documenter:
    Anchors,
    Builder,
    Documents,
    Expanders,
    Formats,
    Documenter,
    Utilities,
    Utilities.DOM,
    Writers

using Documenter.Utilities.DOM
import Documenter.Writers.HTMLWriter: mdconvert
import Documenter.Documents: NavNode, navpath

include("compat.jl")

type SearchIndex
    loc::String
    title::String
    text::String
    category::String
end

immutable DomifyContext
    doc::Documents.Document
    page::Documents.Page
    index::Vector{SearchIndex}
    DomifyContext(page, doc) = new(doc, page, [])
end

type HTMLContext
    doc :: Documents.Document
    pkgname :: Compat.String
    versionstring :: Compat.String
    logo :: Compat.String
    scripts :: Vector{Compat.String}
    requirejs_path :: Compat.String
    documenterjs_path :: Compat.String
    stylesheets :: Vector{Compat.String}
    search_index :: IOBuffer
end
HTMLContext(doc) = HTMLContext(doc, "", "", "", [], "", "", [], IOBuffer())

function add_stylesheet!(htmlctx, stylesheet)
    asset = joinpath("css", stylesheet)
    path = copy_asset(asset, htmlctx.doc)
    push!(htmlctx.stylesheets, path)
end

getpage(path, doc) = doc.internal.pages[path]
getpage(navnode::NavNode, doc) = getpage(get(navnode.page), doc)

import Documenter.Writers: Writer, render
function render(::Writer{Formats.HTML}, doc::Documents.Document)
    htmlctx = HTMLContext(doc)
    htmlctx.pkgname = "\$pkgname.jl" # TODO
    htmlctx.versionstring = "v0.0.0" # TODO

    add_stylesheet!(htmlctx, "normalize.css")
    add_stylesheet!(htmlctx, "style.css")
    add_stylesheet!(htmlctx, "highlightjs_default.css")
    #add_stylesheet!(htmlctx, "highlight.css")

    local_assetsdir = joinpath(pwd(), "assets")
    let src = joinpath(local_assetsdir, "logo.png")
        if isfile(src)
            dst = joinpath(doc.user.build, "logo.png")
            info("Copying logo...")
            cp(src, dst, remove_destination=true)
            htmlctx.logo = "logo.png"
        end
    end

    htmlctx.requirejs_path = copy_asset("js/require.js", doc)
    htmlctx.documenterjs_path = copy_asset("js/documenter.js", doc)
    copy_asset("js/lunr.js", doc)
    copy_asset("js/highlight.pack.js", doc)

    for navnode in doc.internal.navlist
        isnull(navnode.page) || render_page(navnode, htmlctx)
    end

    info("Writing the search index")
    open("build/search-index.js", "w") do io # TODO
        println(io, "var documenterSearchIndex = {\"docs\": [\n")
        write(io, takebuf_string(htmlctx.search_index))
        println(io, "]}")
    end
end

"""
Constructs and writes the page referred to by the `navnode` to `.build`.
"""
function render_page(navnode, htmlctx)
    @tags html body

    src = get(navnode.page)
    page = getpage(navnode, htmlctx.doc)
    println(" - Building page: $(page.build)")

    head = render_head(navnode, htmlctx)
    navmenu = render_navmenu(navnode, htmlctx)
    article = render_article(navnode, htmlctx)

    htmldoc = HTMLDocument(
        html[:lang=>"en"](
            head,
            body(navmenu, article)
        )
    )
    open(Formats.extension(Formats.HTML, page.build), "w") do io
        print(io, htmldoc)
    end
end

function render_head(navnode, htmlctx)
    @tags head meta link script title
    src = get(navnode.page)
    head(
        meta[:charset=>"UTF-8"](),
        meta[:name => "viewport", :content => "width=device-width, initial-scale=1.0"](),
        title(htmlctx.pkgname), # TODO: title of the particular page

        map(htmlctx.stylesheets) do stylesheet
            link[
                :href => relhref(src, stylesheet),
                :rel => "stylesheet",
                :type => "text/css"
            ]()
        end,

        script("documenterBaseURL=\"$(relhref(src, "."))\""),
        script[
            :src => relhref(src, htmlctx.requirejs_path),
            Symbol("data-main") => relhref(src, htmlctx.documenterjs_path)
        ](),
        script[:src => relhref(src, "search-index.js")](),
    )
end

function render_navmenu(navnode, htmlctx)
    @tags nav a img h1 input
    src = get(navnode.page)
    navmenu = nav[".toc"]()
    if !isempty(htmlctx.logo)
        push!(navmenu.nodes,
            a[:href=>"http://julialang.org/"](
                img[
                    ".logo",
                    :src => relhref(src, htmlctx.logo),
                    :alt => "$(htmlctx.pkgname) logo"
                ]()
            )
        )
    end
    push!(navmenu.nodes, h1(htmlctx.pkgname))
    push!(navmenu.nodes, input[:type => "text", :placeholder => "Search docs"]())
    push!(navmenu.nodes, navitem(NavContext(htmlctx.doc, navnode, htmlctx), htmlctx))
    navmenu
end

function render_article(navnode, htmlctx)
    @tags article header footer nav h1 ul li span a img input hr

    src = get(navnode.page)
    doc = htmlctx.doc
    page = getpage(src, doc)

    header_links = map(navpath(navnode)) do nn
        if isnull(nn.page)
            li(domify_pagetitle(nn, doc))
        else
            li(a[:href => navhref(nn, navnode)](domify_pagetitle(nn, doc)))
        end
    end

    art_header = header(
        nav(
            ul(header_links),
            a[".edit-page", :href=>"https://github.com/"](span[".fa"]("\uf09b"), " Edit on GitHub") # TODO
        ),
        hr()
    )

    # build the footer with nav links
    art_footer = footer(hr())
    Utilities.unwrap(navnode.prev) do nn
        direction = span[".direction"]("Previous")
        pagetitle = span[".title"](domify_pagetitle(nn, doc))
        link = a[".previous", :href => navhref(nn, navnode)](direction, pagetitle)
        push!(art_footer.nodes, link)
    end

    Utilities.unwrap(navnode.next) do nn
        direction = span[".direction"]("Next")
        pagetitle = span[".title"](domify_pagetitle(nn, doc))
        link = a[".next", :href => navhref(nn, navnode)](direction, pagetitle)
        push!(art_footer.nodes, link)
    end

    context = DomifyContext(page, doc)
    pagenodes = domify(page, context)

    # Append to the search index
    href = Formats.extension(Formats.HTML, src)
    for idx in context.index
        ref = isempty(idx.loc) ? href : "$(href)#$(idx.loc)"
        println(htmlctx.search_index, """
        {
            "location": "$(jsonescape(ref))",
            "title": "$(jsonescape(idx.title))",
            "category": "$(jsonescape(idx.category))",
            "text": "$(jsonescape(idx.text))"
        },
        """)
    end

    article["#docs"](art_header, pagenodes, art_footer)
end

function _relpath(to, from)
    warn("Using deprecated _relpath:")
    println(STDERR, stacktrace()[2])
    relhref(from, to)
end

function jsonescape(s)
    s = replace(s, '\\', "\\\\")
    s = replace(s, '\n', "\\n")
    replace(s, '"', "\\\"")
end

flattenpages(pages::Vector) = mapreduce(flattenpages, vcat, pages)
flattenpages(page::String) = [page]
flattenpages(p::Pair) = flattenpages(p.second)

type NavContext
    doc     :: Documents.Document
    current :: NavNode
    pagedb  :: HTMLContext
end

function navhref(to, from)
    from_src = get(from.page)
    to_src = get(to.page)
    Formats.extension(Formats.HTML,relhref(from_src, to_src))
end
navlink(ctx, to) = DOM.Tag(:a)[".toctext",:href=>navhref(to, ctx.current)](domify_pagetitle(to, ctx.doc))

navitem(ctx, htmlctx::HTMLContext) = navitem(ctx, htmlctx.doc.internal.navtree)
navitem(ctx, p::Vector) = DOM.Tag(:ul)(map(p->navitem(ctx, p), p))
function navitem(ctx, p::NavNode)
    @tags ul li span a
    link = isnull(p.page) ? span[".toctext"](domify_pagetitle(p, ctx.doc)) : navlink(ctx, p)
    item = (p === ctx.current) ? li[".current"](link) : li(link)

    if !isempty(p.children)
        push!(item.nodes, navitem(ctx, p.children))
    end

    if p === ctx.current && !isnull(p.page)
        sections = collect_subsections(ctx.doc.internal.pages[get(p.page)])
        internal_links = map(sections) do s
            anchor, title = s
            li(a[".toctext", :href => anchor](title))
        end
        push!(item.nodes, ul[".internal"](internal_links))
    end

    item
end

function domify_pagetitle(navnode, doc)::Vector{DOM.Node}
    !isnull(navnode.title_override) && return [DOM.Node(get(navnode.title_override))]

    if !isnull(navnode.page)
        title = pagetitle(doc.internal.pages[get(navnode.page)])
        !isnull(title) && return mdconvert(get(title))
    end

    # TODO: How to handle this error?
    warn("Unable to determine page title.")
    [DOM.Node("<UNTITLED>")]
end

# DOMIFY

function domify(anchor::Anchors.Anchor, page, doc)
    @tags a
    aid = "$(anchor.id)-$(anchor.nth)"
    [
        a[:id => aid](),
        domify(anchor.object, page, doc)
    ]
end

import Base: push!
type ListBuilder
    es::Vector
end
ListBuilder() = ListBuilder([])

function push!(lb::ListBuilder, level, node)
    @assert level >= 1
    if level == 1
        push!(lb.es, node)
    else
        if isempty(lb.es) || typeof(last(lb.es)) !== ListBuilder
            push!(lb.es, ListBuilder())
        end
        push!(last(lb.es), level-1, node)
    end
end

function domify(lb::ListBuilder)
    @tags ul li
    ul(map(lb.es) do e
        if typeof(e) === ListBuilder
            domify(e)
        else
            li(e)
        end
    end)
end

function domify(contents::Documents.ContentsNode, page, doc)
    @tags a
    lb = ListBuilder()
    for (count, path, anchor) in contents.elements
        header = anchor.object
        url = string(path, '#', anchor.id, '-', anchor.nth)
        node = a[:href=>url](mdconvert(header.text))
        level = Utilities.header_level(header)
        push!(lb, level, node)
    end
    domify(lb)
end

function domify(index::Documents.IndexNode, page, doc)
    @tags ul li a
    lis = map(index.elements) do _
        object, doc, page, mod, cat = _
        url = string(page, "#", Utilities.slugify(object))
        li(a[:href=>url]("$(object.binding)"))
    end
    ul(lis)
end

function domify(node::Documents.DocsNodes, context::DomifyContext)
    [domify(node, context) for node in node.nodes]
end

function domify(node::Documents.DocsNode, context::DomifyContext)
    @tags code div section p ul li pre strong em a br
    page, doc = context.page, context.doc

    # push to search index
    push!(context.index, SearchIndex(
        node.anchor.id,
        string(node.object.binding),
        mdflatten(node.docstr),
        Utilities.doccat(node.object)
    ))

    section[".docstring"](
        div[".docheader"](
            a[:id=>node.anchor.id, :href=>"#$(node.anchor.id)"]("#"),
            " ",
            strong(code("$(node.object.binding)")),
            " — ", # &mdash;
            em("$(Utilities.doccat(node.object))"),
            "."
        ),
        domify_doc(node.docstr,page,doc)
    )
end

function domify_doc(md::Markdown.MD, page, doc)
    @tags a br
    if haskey(md.meta, :results)
        # The `:results` field contains a vector of `Docs.DocStr` objects associated with
        # each markdown object. The `DocStr` contains data such as file and line info that
        # we need for generating correct source links.
        map(zip(md.content, md.meta[:results])) do _
            markdown, result = _
            ret = Vector{Any}(domify(Writers.MarkdownWriter.dropheaders(markdown), page, doc))
            @show typeof(ret)
            # When a source link is available then print the link.
            Utilities.unwrap(Utilities.url(doc.internal.remote, doc.user.repo, result)) do url
                push!(ret, a[".documenter-source", :target=>"_blank", :href=>url]("source"))
                push!(ret, br())
            end
            ret
        end
    else
        # Docstrings with no `:results` metadata won't contain source locations so we don't
        # try to print them out. Just print the basic docstring.
        domify(Writers.MarkdownWriter.dropheaders(md), page, doc)
    end
end

# nothing to show for MetaNodes, so we just return an empty list
domify(anchor::Documents.MetaNode, page, doc) = Vector{DOM.Node}()

function domify(page::Documents.Page, context::DomifyContext)
    stillpage = true
    sl = ""
    st = get(pagetitle_string(page), "<UNTITLED>")
    ss = IOBuffer()
    map(page.elements) do elem
        if typeof(elem) <: Header
            searchcat = stillpage ? "Page" : "Section"
            stillpage && (stillpage = false)
            push!(context.index, SearchIndex(sl, st, takebuf_string(ss), searchcat))

            a = page.mapping[elem]
            sl = "$(a.id)-$(a.nth)"
            st = mdflatten(elem)
            info("New section: $(a.file)#$(a.id)-$(a.nth)")
        else
            mdflatten(ss, elem)
        end
        node = page.mapping[elem]
        info("Top-block-domify: $(typeof(elem)) -> $(typeof(node))")
        #domify(node, page, doc)
        domify(node, context)
    end
end

#domify(node, context::DomifyContext) = domify(node, context.page, context.doc)
function domify(node, context::DomifyContext)
    warn("Default context-domify: $(typeof(node))")
    domify(node, context.page, context.doc)
end

function domify(node, page, doc)
    @tags div h1
    warn("Default domify: $(typeof(node))")
    if typeof(node).name.module === Base.Markdown
        [
            div[".mdnote.debug"]("$(typeof(node))")
            mdconvert(node, Base.Markdown.MD())
        ]
    else
        io = IOBuffer()
        Documenter.Writers.MarkdownWriter.render(io,MIME("text/plain"),node,page,doc)
        div[".ukwnode"](
            h1("$(typeof(node))"),
            pre(takebuf_string(io))
        )
    end
end

import Base.Markdown: MD, Code, Header
function mdconvert(c::Code, parent::MD)
    @tags pre code
    language = isempty(c.language) ? "none" : c.language
    pre(code[".language-$(language)"](c.code))
end

mdconvert(c::Code, parent) = DOM.Tag(:code)(c.code)

if isdefined(Base.Markdown, :Admonition)
    import Base.Markdown: Admonition
    function mdconvert(a::Admonition, parent)
        @tags div
        div[".admonition.$(a.category)"](
            div[".admonition-title"](a.title),
            div[".admonition-text"](mdconvert(a.content, a))
        )
    end
end

mdconvert(expr::Union{Expr,Symbol}, parent) = string(expr)

# Other utilities

"""
Returns a `Nullable{String}`, which is nulled if the page title could not be
determined.
"""
function pagetitle_string(page::Documenter.Documents.Page)::Nullable{String}
    for e in page.elements
        if typeof(e) === Base.Markdown.Header{1}
            return mdflatten(e.text)
        end
    end
    return nothing
end

function pagetitle(page::Documenter.Documents.Page)::Nullable{Any}
    for e in page.elements
        if typeof(e) === Base.Markdown.Header{1}
            return e.text
        end
    end
    return nothing
end

function collect_subsections(page::Documenter.Documents.Page)
    # TODO: Multiple H1-s?
    # TODO: Can we get header "link" as well?
    h2s = filter(e->typeof(e)===Base.Markdown.Header{2}, page.elements)
    map(h2s) do e
        anchor = page.mapping[e]
        "#$(anchor.id)-$(anchor.nth)", mdconvert(e.text)
    end
end

function pageid(page, doc)
    for (src, page_try) in doc.internal.pages
        page == page_try && return src
    end
    throw(KeyError("page [$(object_id(page))] not found in document [$(object_id(doc))]"))
end

end

#= GRAVEYARD

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

=#
