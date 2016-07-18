md = Markdown.parse("""
# This is an *awesome* `code` header

This is a very long paragraph with
**BOLD** and *italic* text.

    A block quote from Hemingway?

```julia
function foo(x)
    return nothing
end
```
!!! note "Hello World!"
    An amazing [Admonition](google.com/admonitions)

Let's have a list[^16]!

- I_1

- I_2_1

    I_2_2

    - I_2_3_1

    - I_2_3_2

- I_3

Dense list:

- A
- `CODE`
- C

[^16]: Nice to have a **FOOTNOTE** ?!

""")

include("../lib/MDFlat.jl")

print(MDFlat.mdflatten(md))
