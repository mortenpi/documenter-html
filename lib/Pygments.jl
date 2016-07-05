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
