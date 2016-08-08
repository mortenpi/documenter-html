"""
Usage

```julia
include("Pygments.jl")
```
"""
module Pygments

using PyCall

@pyimport pygments
@pyimport pygments.lexers as lexers
@pyimport pygments.token as token

export lex

function lex(language, code)
    lexer = try
        lexers.get_lexer_by_name(language)
    catch e
        warn(e)
        return nothing
    end

    Magpie(pygments.lex(code, lexer))
end

type Magpie
    obj::PyCall.PyObject
end

import Base: start, done, next, length
start(iter::Magpie) = start(iter.obj)
done(iter::Magpie, state) = done(iter.obj,state)
function next(iter::Magpie, state)
    item,state = next(iter.obj,state)
    tokentype, value = item
    (token.STANDARD_TYPES[tokentype], value), state
end
#length(iter::Magpie) = length(iter.obj)

end # module


#= Pygments version
import Base.Markdown: MD, Code, Header
function mdconvert(c::Code, parent::MD)
    @tags pre code
    language = isempty(c.language) ? "none" : c.language
    try
        #pre(code[".highlight.language-$(language)"]((domify(Pygments.lex(language, c.code)))))
        pre(code[".highlight.language-$(language)"](c.code))
    catch
        warn("No lexer for $(language)")
        pre(code[".language-$(language)"](c.code))
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

=#
