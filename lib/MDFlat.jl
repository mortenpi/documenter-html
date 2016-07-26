module MDFlat

export mdflatten

import Base.Markdown:
    MD, BlockQuote, Bold, Code, Header, HorizontalRule,
    Image, Italic, LaTeX, LineBreak, Link, List, Paragraph, Table

"""
Convert a markdown object to a `String`.

It drops a lot of information (e.g. the language of a code block) and all the
formatting (e.g. strong, emph).
"""
function mdflatten(md)
    ss = IOBuffer()
    mdflatten(ss, md, md)
    takebuf_string(ss)
end

mdflatten(io, md) = mdflatten(io, md, md)
mdflatten(io, md::MD, parent) = mdflatten(io, md.content, md)
mdflatten(io, vec::Vector, parent) = map(x->mdflatten(io, x, parent), vec)
#mdflatten(io, vec::Vector, parent::MD) = mdblockflatten(io, vec, parent)
function mdflatten(io, vec::Vector, parent::MD)
#function mdblockflatten(io, vec::Vector, parent)
    for md in vec
        #info("BlockFlatten: $(infostr(md)) < $(infostr(vec)) < $(infostr(parent))")
        mdflatten(io, md, parent)
        print(io, "\n\n")
    end
end
#mdflatten(io, vec::Vector, parent::List) = mdblockflatten(io, vec, parent)

infostr(x) = "0x$(hex(hash(x),16))($(typeof(x)))"


# Block level MD nodes
mdflatten{N}(io, h::Header{N}, parent) = mdflatten(io, h.text, h)
mdflatten(io, p::Paragraph, parent) = mdflatten(io, p.content, p)
#mdflatten(io, c::Code, parent::MD) = print(io, c.code)
mdflatten(io, bq::BlockQuote, parent) = mdflatten(io, bq.content, bq)
mdflatten(io, ::HorizontalRule, parent) = nothing
function mdflatten(io, list::List, parent)
    for (idx,li) in enumerate(list.items)
        #info("MDFlat(List): $(infostr(li)) < $(infostr(list)) < $(infostr(parent))")
        for (jdx,x) in enumerate(li)
            mdflatten(io, x, list)
            jdx != length(li) && print(io, '\n')
        end
        idx != length(list.items) && print(io, '\n')
    end
end
function mdflatten(io, t::Table, parent)
    for (idx,row) = enumerate(t.rows)
        for (jdx,x) in enumerate(row)
            mdflatten(io, x, t)
            jdx != length(row) && print(io, ' ')
        end
        idx != length(t.rows) && print(io, '\n')
    end
end
#mdflatten(io, m::LaTeX, ::MD) = print(io, "[latex: m.formula]")

# Inline nodes
mdflatten(io, text::AbstractString, parent) = print(io, text)
mdflatten(io, ::LineBreak, parent) = print(io, '\n')
mdflatten(io, link::Link, parent) = mdflatten(io, link.text, link)
mdflatten(io, b::Bold, parent) = mdflatten(io, b.text, b)
mdflatten(io, i::Italic, parent) = mdflatten(io, i.text, i)
mdflatten(io, c::Code, parent) = print(io, c.code)
mdflatten(io, i::Image, parent) = print(io, "[image: $(i.alt) ($(i.url))]")
mdflatten(io, m::LaTeX, parent) = print(io, "[latex: m.formula]")

# Special (inline) "nodes" -- due to JuliaMark's interpolations
mdflatten(io, expr::Union{Symbol,Expr}, parent) = print(io, expr)


# Only available on Julia 0.5.
if isdefined(Base.Markdown, :Footnote)
    import Base.Markdown: Footnote
    mdflatten(io, f::Footnote, parent) = footnote(io, f.id, f.text, parent)
    footnote(io, id, text::Void, parent) = print(io, "[$id]")
    function footnote(io, id, text, parent)
        print(io, "[$id]: ")
        mdflatten(io, text, parent)
    end
end

if isdefined(Base.Markdown, :Admonition)
    import Base.Markdown: Admonition
    function mdflatten(io, a::Admonition, parent)
        println(io, "$(a.category): $(a.title)")
        mdflatten(io, a.content, a)
    end
end

end # module
