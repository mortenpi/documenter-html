# Old MetaPage
type NavItem
    title    :: Vector
    page     :: Nullable{Pair{String,Documents.Page}}
    children :: Vector{NavItem}
    parent   :: Nullable{NavItem}
    prev     :: Nullable{NavItem}
    next     :: Nullable{NavItem}
end
