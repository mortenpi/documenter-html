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
include("Pygments.jl")


# Necessary until HTML PR is merged
if isdefined(Documenter.Utilities, :MDFlatten)
    using Documenter.Utilities.MDFlatten
    import Documenter.Utilities.DOM: HTMLDocument
else
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
end

# Necessary until pages refactor is merged
if isdefined(Documenter.Documents, :NavNode)
    import Documenter.Documents: NavNode, navpath
else
    """
    Element in the navigation tree of a document, containing navigation references
    to other page, reference to the [`Page`](@ref) object etc.
    """
    type NavNode
        page           :: Nullable{Compat.UTF8String} # unless null, should point to a valid Page in the document
        title_override :: Nullable{Compat.UTF8String}
        parent         :: Nullable{NavNode}
        children       :: Vector{NavNode}
        prev           :: Nullable{NavNode}
        next           :: Nullable{NavNode}
    end
    NavNode(page, title_override, parent) = NavNode(page, title_override, parent, [], nothing, nothing)

    """
    Constructs a list of the parents of the `navnode`, ordered such that the `navnode`
    itself is the last item.
    """
    navpath(navnode::NavNode) = isnull(navnode.parent) ? [navnode] :
        push!(navpath(get(navnode.parent)), navnode)

    """
        walk_navpages(x, parent, doc)

    Recursively walks through the [`Documents.Document`](@ref)'s `.user.pages` field,
    generating [`Documents.NavNode`](@ref)s and related data structures in the
    process.

    This implementation is the de facto specification for the `.user.pages` field.
    """
    walk_navpages(ps::Vector, parent, doc) = map(p -> walk_navpages(p, parent, doc), ps)
    function walk_navpages{T}(p::Pair{String, Vector{T}}, parent, doc)
        nn = NavNode(nothing, p.first, parent)
        nn.children = walk_navpages(p.second, nn, doc)
        nn
    end
    function walk_navpages(p::Pair{String,String}, parent, doc)
        nn = walk_navpages(p.second, parent, doc)
        nn.title_override = p.first
        nn
    end
    function walk_navpages(src::String, parent, pagedb)
        doc = pagedb.doc
        if !(src in keys(doc.internal.pages))
            _src = first(splitext(src))
            _src in keys(doc.internal.pages) || error("'$src' is not an existing page!")
            src = _src
        end
        nn = NavNode(src, nothing, parent)
        push!(pagedb.navlist, nn)
        nn
    end
end

"""
Build a `Page` "database" out of a `Document`.
"""
type PageDB
    doc::Documents.Document
    navtree::Vector{NavNode}
    navlist::Vector{NavNode}
end


# UNTIL: refactor-pages PR
#function pagedb end
if isdefined(Documenter.Documents, :NavNode)
    PageDB(doc::Documents.Document) = PageDB(doc, doc.internal.navtree, doc.internal.navlist)
    function findpage(doc, path)
        for page in doc.internal.pages
            pagepath = if startswith(page.source, "dynamic://")
                string(page.source[length("dynamic://")+1 : end], ".md")
            else
                normpath(relpath(page.source, doc.user.source))
            end
            @show pagepath
            if pagepath == path
                return page
            end
        end
        error("Unable to find page: $path")
    end
else
    function PageDB(doc::Documents.Document)
        pagedb = PageDB(doc, [], [])
        mdpages = map(p -> "$p.md", keys(doc.internal.pages))
        userpages = isempty(doc.user.pages) ? mdpages : doc.user.pages
        pagedb.navtree = walk_navpages(userpages, nothing, pagedb)

        # Finally we populate the .next and .prev fields of the navnodes that point
        # to actual pages (leaf nodes).
        local prev::Nullable{NavNode} = nothing
        for navnode in pagedb.navlist
            navnode.prev = prev
            Utilities.unwrap(prev) do prevnode
                prevnode.next = navnode
            end
            prev = navnode
        end

        pagedb
    end

    findpage(doc, path) = doc.internal.pages[pagename(path)]
    pagename(src::String) = first(splitext(src))
end

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

script(src) = DOM.Tag(:script)[:src => src]()

import Documenter.Writers: Writer, render
function render(::Writer{Formats.HTML}, doc::Documents.Document)
    @tags html head title meta link
    @tags body article header footer nav h1 ul li
    @tags span a img input hr

    # determine variables
    pkgname = "\$pkgname.jl" # TODO
    versionstring = "v0.0.0" # TODO

    pagedb = PageDB(doc)

    requirejs_path = copy_asset("js/require.js", doc)
    documenterjs_path = copy_asset("js/documenter.js", doc)
    copy_asset("js/lunr.js", doc)

    fout_search = open("build/search-index.js", "w")
    println(fout_search, "var documenterSearchIndex = {\"docs\": [\n")

    for navnode in pagedb.navlist
        if isnull(navnode.page) continue end
        src = get(navnode.page)
        page = doc.internal.pages[src]
        println("- building $(page.build)")

        h = head(
            meta[:charset=>"UTF-8"](),
            meta[:name => "viewport", :content => "width=device-width, initial-scale=1.0"](),
            title("Documenter.jl"),

            stylesheet_asset("normalize.css", src),
            stylesheet_asset("style.css", src),
            stylesheet_asset("highlight.css", src),

            DOM.Tag(:script)("documenterBaseURL=\"$(_relpath(".",src))\""),
            DOM.Tag(:script)[
                :src=>_relpath(requirejs_path, src),
                Symbol("data-main") => _relpath(documenterjs_path, src)
            ](),
            script(_relpath("search-index.js", src)),
        )

        logo = a[:href=>"http://julialang.org/"](
            img[
                ".logo",
                :src => "http://docs.julialang.org/en/release-0.4/_static/julia-logo.svg",
                :alt => "$(pkgname) logo"
            ]()
        )
        page_nav = nav[".toc"](
            logo,
            h1(pkgname),
            input[:type => "text", :placeholder => "Search docs"](),
            #navitem(doc.user.pages, src)
            navitem(NavContext(doc, navnode, pagedb), pagedb)
        )

        header_links = map(navpath(navnode)) do nn
            if isnull(nn.page)
                li(domify_pagetitle(nn, doc))
            else
                li(a[:href => navhref(nn, navnode)](domify_pagetitle(nn, doc)))
            end
        end

        art_header = header(
            nav(
                ul(
                    #li(a[:href => navhref("/", src)]("Home")),
                    header_links
                ),
                a[".edit-page", :href=>"https://github.com/"](span[".fa"]("\uf09b"), " Edit on GitHub") # TODO
            ),
            hr()
        )

        # build the footer with nav links
        art_footer = footer(hr())
        Utilities.unwrap(navnode.prev) do mp
            direction = span[".direction"]("Previous")
            pagetitle = span[".title"](domify_pagetitle(mp, doc))
            link = a[".previous", :href => navhref(mp, navnode)](direction, pagetitle)
            push!(art_footer.nodes, link)
        end
        Utilities.unwrap(navnode.next) do mp
            direction = span[".direction"]("Next")
            pagetitle = span[".title"](domify_pagetitle(mp, doc))
            link = a[".next", :href => navhref(mp, navnode)](direction, pagetitle)
            push!(art_footer.nodes, link)
        end

        context = DomifyContext(page, doc)
        pagenodes = domify(page, context)
        art = article["#docs"](art_header, pagenodes, art_footer)

        htmldoc = HTMLDocument(html[:lang=>"en"](h,body(page_nav, art)))
        open(Formats.extension(Formats.HTML, page.build), "w") do io
            print(io, htmldoc)
        end

        # Append to the search index
        href = Formats.extension(Formats.HTML, src)
        for idx in context.index
            ref = isempty(idx.loc) ? href : "$(href)#$(idx.loc)"
            println(fout_search, """
            {
                "location": "$(jsonescape(ref))",
                "title": "$(jsonescape(idx.title))",
                "category": "$(jsonescape(idx.category))",
                "text": "$(jsonescape(idx.text))"
            },
            """)
        end
    end

    println(fout_search, "]}")
    close(fout_search)
end

################################################################################
################################### TO  COPY ###################################
################################################################################

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

################################################################################
################################################################################
################################################################################

_relpath(to, from) = relhref(from, to)

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
    pagedb  :: PageDB
end

function navhref(to, from)
    from_src = get(from.page)
    to_src = get(to.page)
    Formats.extension(Formats.HTML,_relpath(to_src, from_src))
end
navlink(ctx, to) = DOM.Tag(:a)[".toctext",:href=>navhref(to, ctx.current)](domify_pagetitle(to, ctx.doc))

navitem(ctx, pagedb::PageDB) = navitem(ctx, pagedb.navtree)
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
#navitem(ctx, p::String) = li(navlink(ctx, p, p))
#navitem(ctx, p::Pair) = li(p.first, navitem(ctx, p.second))
#navitem(ctx, p::Pair{String,String}) = li(navlink(ctx, p.first, p.second))

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
    @tags div section p ul li pre strong em a br
    page, doc = context.page, context.doc
    docheader = div[".docheader"](
        a[:id=>node.anchor.id, :href=>"#$(node.anchor.id)"]("#"),
        " ",
        strong(code("$(node.object.binding)")),
        " — ", # &mdash;
        em("$(Utilities.doccat(node.object))"),
        "."
    )
    ret = [
        docheader,
        domify_doc(node.docstr,page,doc)
    ]

    # push to search index
    push!(context.index, SearchIndex(
        node.anchor.id,
        string(node.object.binding),
        mdflatten(node.docstr),
        Utilities.doccat(node.object)
    ))

    # generate a table of methods
    Utilities.unwrap(node.methods) do methodnodes
        name = node.object.binding.var # name of the method without the modules

        # We filter out the methods that are marked `visible`
        ms = [m.method for m in filter(m -> m.visible, methodnodes)]

        push!(ret, strong("Methods"))

        # We print a small notice of the methods table is completely empty,
        # and an unordered list of methods if there are some to display.
        if isempty(methodnodes)
            push!(ret, "This function has no methods.")
        elseif isempty(ms)
            push!(ret, "This function has no methods to display.")
        else
            # A regexp to match filenames with an absolute path
            # TODO: improve the comment
            r = Regex("$(Pkg.dir())/([A-Za-z0-9]+)/(.*)")

            lis = map(ms) do m
                tv, decls, file, line = Base.arg_decl_parts(m)
                decls = decls[2:end]
                file = string(file)
                url = try
                    get(Utilities.url(doc.internal.remote, doc.user.repo, m.module, file, line), "")
                catch e
                    # the url() fails sometimes because is can't chdir into somewhere
                    warn(e)
                    info(" > file: $(file)")
                    ""
                end
                file_match = match(r, file)
                if file_match !== nothing
                    file = file_match.captures[2]
                end
                args_raw = join([Writers.MarkdownWriter.join_decl(d, html=false) for d in decls], ", ")
                tvars = isempty(tv) ? "" : "{" * join(tv,", ") * "}"
                signature = "$(name)$(tvars)($(args_raw))"
                # TODO: Multiline signature (as done in the Markdown output)
                if length(signature) <= 40
                    li(
                        code[".highlight.language-julia"](
                            domify(Pygments.lex("julia",signature))
                        ),
                        " defined at ",
                        a[:target=>"_blank", :href=>url]("$(file):$(line)")
                    )
                else
                    args_raw = join([" "^4 * Writers.MarkdownWriter.join_decl(d, html=false) for d in decls], ",\n")
                    signature = "$(name)$(tvars)(\n$(args_raw)\n)"
                    li(
                        pre(code[".highlight.language-julia"](
                            domify(Pygments.lex("julia",signature))
                        )),
                        " defined at ",
                        a[:target=>"_blank", :href=>url]("$(file):$(line)")
                    )
                end
            end
            push!(ret, ul[".methods"](lis))
        end

        # we print a small notice if we are not displaying all the methods
        nh = length(methodnodes)-length(ms) # number of hidden methods
        if nh > 0
            push!(ret, p(em("Hiding $(nh) method$(nh==1?"":"s") defined outside of this package.")))
        end
    end
    section[".docstring"](ret)
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

function domify(mp::Pygments.Magpie)
    @tags span
    ret = Vector()
    for (t,v) in mp
        push!(ret, isempty(t) ? span(v) : span[".$t"](v))
    end
    ret
end

import Base.Markdown: MD, Code, Header
@tags code
function mdconvert(c::Code, parent::MD)
    @tags pre code
    language = isempty(c.language) ? "none" : c.language
    try
        pre(code[".highlight.language-$(language)"]((domify(Pygments.lex(language, c.code)))))
    catch
        warn("No lexer for $(language)")
        pre(code[".language-$(language)"](c.code))
    end
end

function mdconvert(c::Code, parent)
    @tags code
    code(c.code)
end

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
