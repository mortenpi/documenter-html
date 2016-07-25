var documenterSearchIndex = {"docs": [

{
    "location": "index.html",
    "title": "Documenter.jl",
    "category": "Page",
    "text": ""
},

{
    "location": "index.html#Documenter.jl-1",
    "title": "Documenter.jl",
    "category": "Section",
    "text": "A documentation generator for Julia.A package for building documentation from docstrings and markdown files.note: Note\nnPlease read through the Documentation section of the main Julia manual if this is your first time using Julia's documentation system. Once you've read through how to write documentation for your code then come back here."
},

{
    "location": "index.html#Package-Features-1",
    "title": "Package Features",
    "category": "Section",
    "text": "Write all your documentation in Markdown.\nnMinimal configuration.\nnSupports Julia 0.4 and 0.5-dev.\nnDoctests Julia code blocks.\nnCross references for docs and section headers.\nn[latex: m.formula] syntax support.\nnChecks for missing docstrings and incorrect cross references.\nnGenerates tables of contents and docstring indexes.\nnUse git push to automatically build and deploy docs from Travis to GitHub Pages.The Package Guide provides a tutorial explaining how to get started using Documenter.Some examples of packages using Documenter can be found on the Examples page.See the Index for the complete list of documented functions and types."
},

{
    "location": "index.html#Manual-Outline-1",
    "title": "Manual Outline",
    "category": "Section",
    "text": "Pages = [\nn    \"man/guide.md\",\nn    \"man/examples.md\",\nn    \"man/syntax.md\",\nn    \"man/doctests.md\",\nn    \"man/hosting.md\",\nn    \"man/latex.md\",\nn]\nnDepth = 2"
},

{
    "location": "index.html#Library-Outline-1",
    "title": "Library Outline",
    "category": "Section",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nnDepth = 2"
},

{
    "location": "index.html#main-index-1",
    "title": "Index",
    "category": "Section",
    "text": ""
},

{
    "location": "index.html#Modules-1",
    "title": "Modules",
    "category": "Section",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nnOrder = [:module]"
},

{
    "location": "index.html#Functions-1",
    "title": "Functions",
    "category": "Section",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nnOrder = [:function]"
},

{
    "location": "man/guide.html",
    "title": "Package Guide",
    "category": "Page",
    "text": ""
},

{
    "location": "man/guide.html#Package-Guide-1",
    "title": "Package Guide",
    "category": "Section",
    "text": ""
},

{
    "location": "man/guide.html#Installation-1",
    "title": "Installation",
    "category": "Section",
    "text": "Documenter is a registered package and so can be installed via Pkg.add.Pkg.add(\"Documenter\")This package supports Julia 0.4 and 0.5."
},

{
    "location": "man/guide.html#Usage-1",
    "title": "Usage",
    "category": "Section",
    "text": "Documenter is designed to do one thing – combine markdown files and inline docstrings from Julia's docsystem into a single inter-linked document. What follows is a step-by-step guide to creating a simple document."
},

{
    "location": "man/guide.html#Setting-up-the-folder-structure-1",
    "title": "Setting up the folder structure",
    "category": "Section",
    "text": "Firstly, we need a Julia module to document. This could be a package generated via PkgDev.generate or a single .jl script. For this guide we'll be using a package called Example.jl that has the following directory layout:Example/\nn    src/\nn        Example.jl\nn    ...Note that the ... just represent unimportant files and folders.We must decide on a location where we'd like to store the documentation for this package. It's recommended to use a folder named docs/ in the toplevel of the package, like soExample/\nn    docs/\nn        ...\nn    src/\nn        Example.jl\nn    ...Inside the docs/ folder we need to add two things. A source folder which will contain the markdown files that will be used to build the finished document and a Julia script that will be used to control the build process. The following names are recommendeddocs/\nn    src/\nn    make.jl"
},

{
    "location": "man/guide.html#Building-an-empty-document-1",
    "title": "Building an empty document",
    "category": "Section",
    "text": "With our docs/ directory now setup we're going to build our first document. It'll just be a single empty file at the moment, but we'll be adding to it later on.Add the following to your make.jl fileusing Documenter, Example\nn\nnmakedocs()This assumes you've installed Documenter as discussed in Installation and that your Examples package can be found by Julia.Now add an index.md file to the src/ directory. The name has no particular significance though and you may name it whatever you like. We'll stick to index.md for this guide.Leave the newly added file empty and then run the following command from the docs/ directory$ julia make.jlNote that $ just represents the prompt character. You don't need to type that.If you'd like to see the output from this command in color use$ julia --color=yes make.jlWhen you run that you should see the following outputDocumenter: setting up build directory.\nnDocumenter: redirecting output streams.\nnDocumenter: expanding markdown templates.\nnDocumenter: building cross-references.\nnDocumenter: running document checks.\nnDocumenter: restoring output streams.\nnDocumenter: rendering document.\nnDocumenter: populating indices.\nnDocumenter: copying assets to build directory.The docs/ folder should contain a new directory – called build/. It's structure should look like the followingbuild/\nn    assets/\nn        Documenter.css\nn        mathjaxhelper.js\nn    index.mdAt the moment build/index.md should be empty since src/index.md is empty.At this point you can add some text to src/index.md and rerun the make.jl file to see the changes if you'd like to."
},

{
    "location": "man/guide.html#Adding-some-docstrings-1",
    "title": "Adding some docstrings",
    "category": "Section",
    "text": "Next we'll splice a docstring defined in the Example module into the index.md file. To do this first document a function in that module:module Example\nn\nnexport func\nn\nn\"\"\"\nn    func(x)\nn\nnReturns double the number `x` plus `1`.\nn\"\"\"\nnfunc(x) = 2x + 1\nn\nnendThen in the src/index.md file add the following# Example.jl Documentation\nn\nn```@docs\nnfunc(x)\nn```When we next run make.jl the docstring for Example.func(x) should appear in place of the @docs block in build/index.md. Note that more than one object can be referenced inside a @docs block – just place each one on a separate line.Note that the module in which a @docs block is evaluated is determined by current_module() and so will more than likely be Main. This means that each object listed in the block must be visible there. The module can be changed to something else on a per-page basis with a @meta block as in the following# Example.jl Documentation\nn\nn```@meta\nnCurrentModule = Documenter\nn```\nn\nn```@docs\nnfunc(x)\nn```"
},

{
    "location": "man/guide.html#Filtering-Included-Docstrings-1",
    "title": "Filtering Included Docstrings",
    "category": "Section",
    "text": "In some cases you may want to include a docstring for a Method that extends a Function from a different module – such as Base. In the following example we extend Base.length with a new definition for type T and also add a docstring:type T\nn    # ...\nnend\nn\nn\"\"\"\nnCustom `length` docs for `T`.\nn\"\"\"\nnBase.length(::T) = 1When trying to include this docstring with```@docs\nnlength\nn```all the docs for length will be included – even those from other modules. There are two ways to solve this problem. Either include the type in the signature with```@docs\nnlength(::T)\nn```or declare the specific modules that makedocs should include withmakedocs(\nn    # options\nn    modules = [MyModule]\nn)"
},

{
    "location": "man/guide.html#Cross-Referencing-1",
    "title": "Cross Referencing",
    "category": "Section",
    "text": "It may be necessary to refer to a particular docstring or section of your document from elsewhere in the document. To do this we can make use of Documenter's cross-referencing syntax which looks pretty similar to normal markdown link syntax. Replace the contents of src/index.md with the following# Example.jl Documentation\nn\nn```@docs\nnfunc(x)\nn```\nn\nn- link to [Example.jl Documentation](@ref)\nn- link to [`func(x)`](@ref)So we just have to replace each link's url with @ref and write the name of the thing we'd link to cross-reference. For document headers it's just plain text that matches the name of the header and for docstrings enclose the object in backticks.This also works across different pages in the same way. Note that these sections and docstrings must be unique within a document."
},

{
    "location": "man/examples.html",
    "title": "Examples",
    "category": "Page",
    "text": ""
},

{
    "location": "man/examples.html#Examples-1",
    "title": "Examples",
    "category": "Section",
    "text": "Sometimes the best way to learn how to use a new package is to look for examples of what others have already built with it.The following packages use Documenter to build their documentation and so should give a good overview of what this package is currently able to do.note: Note\nnPackages are listed alphabetically. If you have a package that uses Documenter then please open a PR that adds it to the appropriate list below.The make.jl file for all listed packages will be tested to check for potential regressions prior to tagging new Documenter releases whenever possible."
},

{
    "location": "man/examples.html#Registered-1",
    "title": "Registered",
    "category": "Section",
    "text": "Packages that have tagged versions available in METADATA.jl.ControlSystems.jl\nnCurrencies.jl\nnDifferentialEquations.jl\nnDocumenter.jl\nnExtractMacro.jl\nnMergedMethods.jl\nnNumericSuffixes.jl\nnOptim.jl\nnPhyloNetworks.jl\nnPOMDPs.jl\nnPrivateModules.jl\nnTaylorSeries.jl\nnWeave.jl"
},

{
    "location": "man/syntax.html",
    "title": "Syntax",
    "category": "Page",
    "text": ""
},

{
    "location": "man/syntax.html#Syntax-1",
    "title": "Syntax",
    "category": "Section",
    "text": "This section of the manual describes the syntax used by Documenter to build documentation.Pages = [\"syntax.md\"]"
},

{
    "location": "man/syntax.html#@docs-block-1",
    "title": "@docs block",
    "category": "Section",
    "text": "Splice one or more docstrings into a document in place of the code block, i.e.```@docs\nnDocumenter\nnmakedocs\nndeploydocs\nn```This block type is evaluated within the CurrentModule module if defined, otherwise within current_module(), and so each object listed in the block should be visible from that module. Undefined objects will raise warnings during documentation generation and cause the code block to be rendered in the final document unchanged.Objects may not be listed more than once within the document. When duplicate objects are detected an error will be raised and the build process will be terminated.To ensure that all docstrings from a module are included in the final document the modules keyword for makedocs can be set to the desired module or modules, i.e.makedocs(\nn    modules = [Documenter],\nn)which will cause any unlisted docstrings to raise warnings when makedocs is called. If modules is not defined then no warnings are printed, even if a document has missing docstrings."
},

{
    "location": "man/syntax.html#@autodocs-block-1",
    "title": "@autodocs block",
    "category": "Section",
    "text": "Automatically splices all docstrings from the provided modules in place of the code block. This is equivalent to manually adding all the docstrings in a @docs block.```@autodocs\nnModules = [Foo, Bar]\nnOrder   = [:function, :type]\nn```The above @autodocs block adds all the docstrings found in modules Foo and Bar that refer to functions or types to the document.Each module is added in order and so all docs from Foo will appear before those of Bar. Possible values for the Order vector are:module\nn:constant\nn:type\nn:function\nn:macroIf no Order is provided then the order listed above is used.When a potential docstring is found in one of the listed modules, but does not match any value from Order then it will be omitted from the document. Hence Order acts as a basic filter as well as sorter.In addition to Order, a Pages vector may be included in @autodocs to filter docstrings based on the source file in which they are defined:```@autodocs\nnModules = [Foo]\nnPages   = [\"a.jl\", \"b.jl\"]\nn```In the above example docstrings from module Foo found in source files that end in a.jl and b.jl are included. The page order provided by Pages is also used to sort the docstrings. Note that page matching is done using the end of the provided strings and so a.jl will be matched by any source file that ends in a.jl, i.e. src/a.jl or src/foo/a.jl.note: Note\nnWhen more complex sorting and filtering is needed then use @docs to define it explicitly."
},

{
    "location": "man/syntax.html#@ref-link-1",
    "title": "@ref link",
    "category": "Section",
    "text": "Used in markdown links as the URL to tell Documenter to generate a cross-reference automatically. The text part of the link can be a docstring, header name, or GitHub PR/Issue number.# Syntax\nn\nn... [`makedocs`](@ref) ...\nn\nn# Functions\nn\nn```@docs\nnmakedocs\nn```\nn\nn... [Syntax](@ref) ...\nn\nn... [#42](@ref) ...Plain text in the \"text\" part of a link will either cross-reference a header, or, when it is a number preceded by a #, a GitHub issue/pull request. Text wrapped in backticks will cross-reference a docstring from a @docs block.@refs may refer to docstrings or headers on different pages as well as the current page using the same syntax.Note that depending on what the CurrentModule is set to, a docstring @ref may need to be prefixed by the module which defines it.Duplicate HeadersIn some cases a document may contain multiple headers with the same name, but on different pages or of different levels. To allow @ref to cross-reference a duplicate header it must be given a name as in the following example# [Header](@id my_custom_header_name)\nn\nn...\nn\nn## Header\nn\nn... [Custom Header](@ref my_custom_header_name) ...The link that wraps the named header is removed in the final document. The text for a named @ref ... does not need to match the header that it references. Named @ref ...s may refer to headers on different pages in the same way as unnamed ones do.Duplicate docstring references do not occur since splicing the same docstring into a document more than once is disallowed."
},

{
    "location": "man/syntax.html#@meta-block-1",
    "title": "@meta block",
    "category": "Section",
    "text": "This block type is used to define metadata key/value pairs that can be used elsewhere in the page. Currently CurrentModule and DocTestSetup are the only recognised keys.```@meta\nnCurrentModule = FooBar\nnDocTestSetup  = quote\nn    using MyPackage\nnend\nn```Note that @meta blocks are always evaluated with the current_module(), which is typically Main.See Setup Code section of the Doctests page for an explanation of DocTestSetup."
},

{
    "location": "man/syntax.html#@index-block-1",
    "title": "@index block",
    "category": "Section",
    "text": "Generates a list of links to docstrings that have been spliced into a document. Valid settings are Pages, Modules, and Order. For example:```@index\nnPages   = [\"foo.md\"]\nnModules = [Foo, Bar]\nnOrder   = [:function, :type]\nn```When Pages or Modules are not provided then all pages or modules are included. Order defaults to[:module, :constant, :type, :function, :macro]if not specified. Order and Modules behave the same way as in @autodocs blocks and filter out docstrings that do not match one of the modules or categories specified.Note that the values assigned to Pages, Modules, and Order may be any valid Julia code and thus can be something more complex that an array literal if required, i.e.```@index\nnPages = map(file -> joinpath(\"man\", file), readdir(\"man\"))\nn```It should be noted though that in this case Pages may not be sorted in the order that is expected by the user. Try to stick to array literals as much as possible."
},

{
    "location": "man/syntax.html#@contents-block-1",
    "title": "@contents block",
    "category": "Section",
    "text": "Generates a nested list of links to document sections. Valid settings are Pages and Depth.```@contents\nnPages = [\"foo.md\"]\nnDepth = 5\nn```As with @index if Pages is not provided then all pages are included. The default Depth value is 2."
},

{
    "location": "man/syntax.html#@example-block-1",
    "title": "@example block",
    "category": "Section",
    "text": "Evaluates the code block and inserts the result into the final document along with the original source code.```@example\nna = 1\nnb = 2\nna + b\nn```The above @example block will splice the following into the final document```julia\nna = 1\nnb = 2\nna + b\nn```\nn\nn```\nn3\nn```Leading and trailing newlines are removed from the rendered code blocks. Trailing whitespace on each line is also removed.Hiding Source CodeCode blocks may have some content that does not need to be displayed in the final document. # hide comments can be appended to lines that should not be rendered, i.e.```@example\nnsrand(1) # hide\nnA = rand(3, 3)\nnb = [1, 2, 3]\nnA \ b\nn```Note that appending # hide to every line in an @example block will result in the block being hidden in the rendered document. The results block will still be rendered though.STDOUT and STDERRThe Julia output streams are redirected to the results block when evaluating @example blocks in the same way as when running doctest code blocks.nothing ResultsWhen the @example block evaluates to nothing then the second block is not displayed. Only the source code block will be shown in the rendered document. Note that if any output from either STDOUT or STDERR is captured then the results block will be displayed even if nothing is returned.Named @example BlocksBy default @example blocks are run in their own anonymous Modules to avoid side-effects between blocks. To share the same module between different blocks on a page the @example can be named with the following syntax```@example 1\nna = 1\nn```\nn\nn```@example 1\nnprintln(a)\nn```The name can be any text, not just integers as in the example above, i.e. @example foo.Named @example blocks can be useful when generating documentation that requires intermediate explanation or multimedia such as plots as illustrated in the following exampleFirst we define some functions\nn\nn```@example 1\nnusing PyPlot # hide\nnf(x) = sin(2x) + 1\nng(x) = cos(x) - x\nn```\nn\nnand then we plot `f` over the interval from ``-π`` to ``π``\nn\nn```@example 1\nnx = linspace(-π, π)\nnplot(x, f(x), color = \"red\")\nnsavefig(\"f-plot.svg\"); nothing # hide\nn```\nn\nn![](f-plot.svg)\nn\nnand then we do the same with `g`\nn\nn```@example 1\nnplot(x, g(x), color = \"blue\")\nnsavefig(\"g-plot.svg\"); nothing # hide\nn```\nn\nn![](g-plot.svg)Note that @example blocks are evaluated within the directory of build where the file will be rendered . This means than in the above example savefig will output the .svg files into that directory. This allows the images to be easily referenced without needing to worry about relative paths.@example blocks automatically define ans which, as in the Julia REPL, is bound to the value of the last evaluated expression. This can be useful in situations such as the following one where where binding the object returned by plot to a named variable would look out of place in the final rendered documentation:```@example\nnusing Gadfly # hide\nnplot([sin, x -> 2sin(x) + x], -2π, 2π)\nndraw(SVG(\"plot.svg\", 6inch, 4inch), ans); nothing # hide\nn```\nn\nn![](plot.svg)"
},

{
    "location": "man/syntax.html#@repl-block-1",
    "title": "@repl block",
    "category": "Section",
    "text": "These are similar to @example blocks, but adds a julia> prompt before each toplevel expression. ; and # hide syntax may be used in @repl blocks in the same way as in the Julia REPL and @example blocks.```@repl\nna = 1\nnb = 2\nna + b\nn```will generate```julia\nnjulia> a = 1\nn1\nn\nnjulia> b = 2\nn2\nn\nnjulia> a + b\nn3\nn```Named @repl <name> blocks behave in the same way as named @example <name> blocks."
},

{
    "location": "man/doctests.html",
    "title": "Doctests",
    "category": "Page",
    "text": ""
},

{
    "location": "man/doctests.html#Doctests-1",
    "title": "Doctests",
    "category": "Section",
    "text": "Documenter will, by default, try to run Julia code blocks that it finds in the generated documentation. This can help to avoid documentation examples from becoming outdated, incorrect, or misleading. It's recommended that as many of a package's examples be runnable by Documenter's doctest.This section of the manual outlines how to go about enabling doctests for code blocks in your package's documentation."
},

{
    "location": "man/doctests.html#\"Script\"-Examples-1",
    "title": "\"Script\" Examples",
    "category": "Section",
    "text": "The first, of two, types of doctests is the \"script\" code block. To make Documenter detect this kind of code block the following format must be used:```julia\nna = 1\nnb = 2\nna + b\nn\nn# output\nn\nn3\nn```The code block's \"language\" must be julia and must include a line containing the text # output. The text before this line is the contents of the script which is run. The text that appears after # output is the textual representation that would be shown in the Julia REPL if the script had been included.The actual output produced by running the \"script\" is compared to the expected result and any difference will result in makedocs throwing an error and terminating.Note that the amount of whitespace appearing above and below the # output line is not significant and can be increased or decreased if desired."
},

{
    "location": "man/doctests.html#REPL-Examples-1",
    "title": "REPL Examples",
    "category": "Section",
    "text": "The other kind of doctest is a simulated Julia REPL session. The following format is detected by Documenter as a REPL doctest:```julia\nnjulia> a = 1\nn1\nn\nnjulia> b = 2;\nn\nnjulia> c = 3;  # comment\nn\nnjulia> a + b + c\nn6\nn\nn```As with script doctests, the code block must have it's language set to julia. When a code block contains one or more julia> at the start of a line then it is assumed to be a REPL doctest. Semi-colons, ;, at the end of a line works in the same way as in the Julia REPL and will suppress the output, although the line is still evaluated.Note that not all features of the REPL are supported such as shell and help modes."
},

{
    "location": "man/doctests.html#Skipping-Doctests-1",
    "title": "Skipping Doctests",
    "category": "Section",
    "text": "Doctesting can be disabled by setting the makedocs keyword doctest = false. This should only be done when initially laying out the structure of a package's documentation, after which it's encouraged to always run doctests when building docs."
},

{
    "location": "man/hosting.html",
    "title": "Hosting Documentation",
    "category": "Page",
    "text": ""
},

{
    "location": "man/hosting.html#Hosting-Documentation-1",
    "title": "Hosting Documentation",
    "category": "Section",
    "text": "After going through the Package Guide and Doctests page you will need to host the generated documentation somewhere for potential users to read. This guide will describe how to setup automatic updates for your package docs using the Travis build service and GitHub Pages. This is the same approach used by this package to host it's own docs – the docs you're currently reading.note: Note\nnFollowing this guide should be the final step you take after you are comfortable with the syntax and build process used by Documenter.jl. Only proceed with the steps outlined on this page once you have successfully used mkdocs locally to build your documentation.  mkdocs can typically be installed using pip install mkdocs in your terminal.This guide assumes that you already have GitHub and Travis accounts setup. If not then go set those up first and then return here."
},

{
    "location": "man/hosting.html#Overview-1",
    "title": "Overview",
    "category": "Section",
    "text": "Once setup correctly the following will happen each time you push new updates to your package repository:travis buildbots startup and run your tests;\nneach buildbot will build the package docs using your docs/make.jl script;\nna single buildbot will then try to push the generated docs back the github.The following sections outline how to enable this for your own package."
},

{
    "location": "man/hosting.html#Deploy-Keys-1",
    "title": "Deploy Keys",
    "category": "Section",
    "text": "Two methods are available for securely deploying generated documentation from Travis to GitHub. The first method listed below is the preferred approach. The second, and original, method should be avoided whenever possible."
},

{
    "location": "man/hosting.html#SSH-Deploy-Keys-1",
    "title": "SSH Deploy Keys",
    "category": "Section",
    "text": "Deploy keys provide push access to a single repository.note: Note\nnYou will need several command line programs installed for the following steps to work. They are which, git, ssh-keygen, and travis.  Make sure these are installed before you begin.Open a Julia REPL and import Documenter.julia> using DocumenterThen call the Travis.genkeys function as follows:julia> Travis.genkeys(\"MyPackage\")where \"MyPackage\" is the name of the package you would like to create deploy keys for.You may be asked to enter your password for Travis during this process. Once complete you will need to add the public key displayed in the REPL to your repository – just follow the instructions displayed in the REPL.Then close the REPL and commit the docs/.documenter.enc file that was generated by Travis.genkeys to the repository. You can skip the GitHub Security Tokens section and move straight on to Travis Environment Settings now."
},

{
    "location": "man/hosting.html#GitHub-Security-Tokens-1",
    "title": "GitHub Security Tokens",
    "category": "Section",
    "text": "These tokens provide push access to every repository owned by the user.Firstly, generate a new personal access token.Enter a description for this new token. We'll be calling ours \"Travis\", but any other name will do. For the \"Select scopes\" option choose \"public_repo\" only. Then generate the token and save it somewhere safe. We'll be needing it during the next section."
},

{
    "location": "man/hosting.html#Travis-Environment-Settings-1",
    "title": "Travis Environment Settings",
    "category": "Section",
    "text": ""
},

{
    "location": "man/hosting.html#SSH-Keys-1",
    "title": "SSH Keys",
    "category": "Section",
    "text": "If you used Travis.genkeys in the previous step then you should go to your Travis settings page and check that two new keys have been added with names similar to the followingencrypted_e6b49e69746a_key\nnencrypted_e6b49e69746a_iv"
},

{
    "location": "man/hosting.html#Tokens-1",
    "title": "Tokens",
    "category": "Section",
    "text": "If you generated a GitHub token during the previous step then we'll add the token to our repository's Travis page. Go to the settings page for the repository and under the \"Environment Variables\" section add a new variable called GITHUB_API_KEY. Copy the generated key from the GitHub Security Tokens section as the value and make sure that \"Display value in build log\" is off. Be careful to remove any leading white-space from the key. Then add the key."
},

{
    "location": "man/hosting.html#.travis.yml-Configuration-1",
    "title": ".travis.yml Configuration",
    "category": "Section",
    "text": "In the after_success section of the .travis.yml file, where code coverage is processed, run your docs/make.jl file:after_success:\nn  - julia -e 'Pkg.add(\"Documenter\")'\nn  - julia -e 'cd(Pkg.dir(\"PACKAGE_NAME\")); include(joinpath(\"docs\", \"make.jl\"))'"
},

{
    "location": "man/hosting.html#The-deploydocs-Function-1",
    "title": "The deploydocs Function",
    "category": "Section",
    "text": "At the moment your docs/make.jl file probably only containsusing Documenter, PACKAGE_NAME\nn\nnmakedocs()We'll need to add an additional call to this file after makedocs. Add the following at the end of the file:deploydocs(\nn    repo = \"github.com/USER_NAME/PACKAGE_NAME.jl.git\"\nn)where USER_NAME and PACKAGE_NAME must be set to the appropriate names.By default deploydocs will deploy the documentation from the nightly Julia build for Linux. This can be changed using the julia and osname keywords as follows:deploydocs(\nn    deps   = Deps.pip(\"mkdocs\", \"python-markdown-math\"),\nn    repo   = \"github.com/USER_NAME/PACKAGE_NAME.jl.git\",\nn    julia  = \"0.4\",\nn    osname = \"osx\"\nn)This will deploy the docs from the OSX Julia 0.4 Travis build bot.The keyword deps serves to provide the required dependencies to deploy the documentation. In the example above we include the dependencies mkdocs and python-markdown-math. The former makes sure that MkDocs is installed to deploy the documentation, and the latter provides the mdx_math markdown extension to exploit MathJax rendering of latex equations in markdown. Other dependencies should be included here.See the deploydocs function documentation for more details."
},

{
    "location": "man/hosting.html#The-MkDocs-mkdocs.yml-File-1",
    "title": "The MkDocs mkdocs.yml File",
    "category": "Section",
    "text": "We'll be using MkDocs to convert the markdown files generated by Documenter to HTML. (This, of course, is not the only option you have for this step. Any markdown to HTML converter should work fine with some amount of setting up.)Add an mkdocs.yml file to your docs/ directory with the following content:site_name:        PACKAGE_NAME.jl\nnrepo_url:         https://github.com/USER_NAME/PACKAGE_NAME.jl\nnsite_description: Description...\nnsite_author:      USER_NAME\nn\nntheme: readthedocs\nn\nnextra_css:\nn  - assets/Documenter.css\nn\nnextra_javascript:\nn  - https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML\nn  - assets/mathjaxhelper.js\nn\nnmarkdown_extensions:\nn  - extra\nn  - tables\nn  - fenced_code\nn  - mdx_math\nn\nndocs_dir: 'build'\nn\nnpages:\nn  - Home: index.mdThis is only a basic skeleton. Read through the MkDocs documentation if you would like to know more about the available settings."
},

{
    "location": "man/hosting.html#.gitignore-1",
    "title": ".gitignore",
    "category": "Section",
    "text": "Add the following to your package's .gitignore filedocs/build/\nndocs/site/These are needed to avoid committing generated content to your repository."
},

{
    "location": "man/hosting.html#gh-pages-Branch-1",
    "title": "gh-pages Branch",
    "category": "Section",
    "text": "Create a new branch called gh-pages and push it to GitHub. If this branch already exists then you can skip this step, but do note that the generated content is automatically pushed to this branch from Travis."
},

{
    "location": "man/latex.html",
    "title": "[latex: m.formula] syntax",
    "category": "Page",
    "text": ""
},

{
    "location": "man/latex.html#latex_syntax-1",
    "title": "[latex: m.formula] syntax",
    "category": "Section",
    "text": "The following section describes how to add equations written using [latex: m.formula] to your documentation. There are some differences between Julia 0.4 and 0.5 that need to be taken into account when reading this section of the manual. These differences are outlined in the next two sections."
},

{
    "location": "man/latex.html#Julia-0.4-1",
    "title": "Julia 0.4",
    "category": "Section",
    "text": ""
},

{
    "location": "man/latex.html#Inline-equations-1",
    "title": "Inline equations",
    "category": "Section",
    "text": "Surround inline equations and mathematical symbols in $ characters, i.e.Here's some inline maths: $\sqrt[n]{1 + x + x^2 + \ldots}$.which will be displayed asHere's some inline maths: [latex: m.formula]."
},

{
    "location": "man/latex.html#Display-equations-1",
    "title": "Display equations",
    "category": "Section",
    "text": "Use the same single $ characters to wrap the equation, but also add a newline above and below it, i.e.Here's an equation:\nn\nn$\frac{n!}{k!(n - k)!} = \binom{n}{k}$\nn\nnThis is the binomial coefficient.which will be displayed asHere's an equation:[latex: m.formula]This is the binomial coefficient."
},

{
    "location": "man/latex.html#Escaping-characters-in-docstrings-1",
    "title": "Escaping characters in docstrings",
    "category": "Section",
    "text": "Since some characters used in [latex: m.formula] syntax are treated differently in docstrings they need to be escaped using a \ character as in the following example:\"\"\"\nnHere's some inline maths: \$\\sqrt[n]{1 + x + x^2 + \\ldots}\$.\nn\nnHere's an equation:\nn\nn\$\\frac{n!}{k!(n - k)!} = \\binom{n}{k}\$\nn\nnThis is the binomial coefficient.\nn\"\"\"\nnfunc(x) = # ...To avoid needing to escape the special characters the doc\"\" string macro can be used:doc\"\"\"\nnHere's some inline maths: $\sqrt[n]{1 + x + x^2 + \ldots}$.\nn\nnHere's an equation:\nn\nn$\frac{n!}{k!(n - k)!} = \binom{n}{k}$\nn\nnThis is the binomial coefficient.\nn\"\"\"\nnfunc(x) = # ..."
},

{
    "location": "man/latex.html#Julia-0.5-1",
    "title": "Julia 0.5",
    "category": "Section",
    "text": "The syntax from above, using $s, will still work in 0.5, but it is recommended, if possible, to use the following double backtick syntax instead since it avoids overloading the meaning of the $ character within docstrings."
},

{
    "location": "man/latex.html#Inline-equations-2",
    "title": "Inline equations",
    "category": "Section",
    "text": "Here's some inline maths: ``\sqrt[n]{1 + x + x^2 + \ldots}``.which will be displayed asHere's some inline maths: [latex: m.formula]."
},

{
    "location": "man/latex.html#Display-equations-2",
    "title": "Display equations",
    "category": "Section",
    "text": "Here's an equation:\nn\nn```math\nn\frac{n!}{k!(n - k)!} = \binom{n}{k}\nn```\nn\nnThis is the binomial coefficient.which will be displayed asHere's an equation:[latex: m.formula]This is the binomial coefficient."
},

{
    "location": "man/latex.html#Escaping-characters-in-docstrings-2",
    "title": "Escaping characters in docstrings",
    "category": "Section",
    "text": "In the same way as in Julia 0.4 \ characters in docstrings must be escaped using a \."
},

{
    "location": "man/internals.html",
    "title": "Package Internals",
    "category": "Page",
    "text": ""
},

{
    "location": "lib/public.html",
    "title": "Public Documentation",
    "category": "Page",
    "text": ""
},

{
    "location": "lib/public.html#Public-Documentation-1",
    "title": "Public Documentation",
    "category": "Section",
    "text": "Documentation for Documenter.jl's public interface.See Internal Documentation for internal package docs covering all submodules."
},

{
    "location": "lib/public.html#Contents-1",
    "title": "Contents",
    "category": "Section",
    "text": "Pages = [\"public.md\"]"
},

{
    "location": "lib/public.html#Index-1",
    "title": "Index",
    "category": "Section",
    "text": "Pages = [\"public.md\"]"
},

{
    "location": "lib/public.html#Documenter",
    "title": "Documenter",
    "category": "Module",
    "text": "Main module for Documenter.jl – a documentation generation package for Julia.\nn\nnTwo functions are exported from this module for public use:\nn\nnmakedocs. Generates documentation from docstrings and templated markdown files.\nndeploydocs. Deploys generated documentation from Travis-CI to GitHub Pages.\nn\nnAdditionally it provides the unexported Documenter.generate, which can be used to generate documentation stubs for new packages.\nn\nn\nn\nn"
},

{
    "location": "lib/public.html#Documenter.makedocs",
    "title": "Documenter.makedocs",
    "category": "Function",
    "text": "makedocs(\nn    root    = \"<current-directory>\",\nn    source  = \"src\",\nn    build   = \"build\",\nn    clean   = true,\nn    doctest = true,\nn    modules = Module[],\nn    repo    = \"\",\nn)\nn\nnCombines markdown files and inline docstrings into an interlinked document. In most cases makedocs should be run from a make.jl file:\nn\nnusing Documenter\nnmakedocs(\nn    # keywords...\nn)\nn\nnwhich is then run from the command line with:\nn\nn$ julia make.jl\nn\nnThe folder structure that makedocs expects looks like:\nn\nndocs/\nn    build/\nn    src/\nn    make.jl\nn\nnKeywords\nn\nnroot is the directory from which makedocs should run. When run from a make.jl file this keyword does not need to be set. It is, for the most part, needed when repeatedly running makedocs from the Julia REPL like so:\nn\nnjulia> makedocs(root = Pkg.dir(\"MyPackage\", \"docs\"))\nn\nnsource is the directory, relative to root, where the markdown source files are read from. By convention this folder is called src. Note that any non-markdown files stored in source are copied over to the build directory when makedocs is run.\nn\nnbuild is the directory, relative to root, into which generated files and folders are written when makedocs is run. The name of the build directory is, by convention, called build, though, like with source, users are free to change this to anything else to better suit their project needs.\nn\nnclean tells makedocs whether to remove all the content from the build folder prior to generating new content from source. By default this is set to true.\nn\nndoctest instructs makedocs on whether to try to test Julia code blocks that are encountered in the generated document. By default this keyword is set to true. Doctesting should only ever be disabled when initially setting up a newly developed package where the developer is just trying to get their package and documentation structure correct. After that, it's encouraged to always make sure that documentation examples are runnable and produce the expected results. See the Doctests manual section for details about running doctests.\nn\nnmodules specifies a vector of modules that should be documented in source. If any inline docstrings from those modules are seen to be missing from the generated content then a warning will be printed during execution of makedocs. By default no modules are passed to modules and so no warnings will appear. This setting can be used as an indicator of the \"coverage\" of the generated documentation. For example Documenter's make.jl file contains:\nn\nnusing Documenter\nn\nnmakedocs(\nn    modules = Documenter,\nn    clean   = false,\nn)\nn\nndeploydocs(\nn    deps = Deps.pip(\"pygments\", \"mkdocs\", \"mkdocs-material\", \"python-markdown-math\"),\nn    repo = \"github.com/JuliaDocs/Documenter.jl.git\",\nn)\nn\nnand so any docstring from the module Documenter that is not spliced into the generated documentation in build will raise a warning.\nn\nnrepo specifies a template for the \"link to source\" feature. If you are using GitHub, this is automatically generated from the remote. If you are using a different host, you can use this option to tell Documenter how URLs should be generated. The following placeholders will be replaced with the respective value of the generated link:\nn\nn{commit} Git commit id\nn{path} Path to the file in the repository\nn{line} Line (or range of lines) in the source file\nn\nnFor example if you are using GitLab.com, you could use\nn\nnmakedocs(repo = \"https://gitlab.com/user/project/blob/{commit}{path}#L{line}\")\nn\nnSee Also\nn\nnA guide detailing how to document a package using Documenter's makedocs is provided in the Usage section of the manual.\nn\nn\nn\nn"
},

{
    "location": "lib/public.html#Documenter.deploydocs",
    "title": "Documenter.deploydocs",
    "category": "Function",
    "text": "deploydocs(\nn    root   = \"<current-directory>\",\nn    target = \"site\",\nn    repo   = \"<required>\",\nn    branch = \"gh-pages\",\nn    latest = \"master\",\nn    osname = \"linux\",\nn    julia  = \"nightly\",\nn    deps   = <Function>,\nn    make   = <Function>,\nn)\nn\nnConverts markdown files generated by makedocs to HTML and pushes them to repo. This function should be called from within a package's docs/make.jl file after the call to makedocs, like so\nn\nnusing Documenter, PACKAGE_NAME\nnmakedocs(\nn    # options...\nn)\nndeploydocs(\nn    repo = \"github.com/...\"\nn)\nn\nnKeywords\nn\nnroot has the same purpose as the root keyword for makedocs.\nn\nntarget is the directory, relative to root, where generated HTML content should be written to. This directory must be added to the repository's .gitignore file. The default value is \"site\".\nn\nnrepo is the remote repository where generated HTML content should be pushed to. This keyword must be set and will throw an error when left undefined. For example this package uses the following repo value:\nn\nnrepo = \"github.com/JuliaDocs/Documenter.jl.git\"\nn\nnbranch is the branch where the generated documentation is pushed. By default this value is set to \"gh-pages\".\nn\nnlatest is the branch that \"tracks\" the latest generated documentation. By default this value is set to \"master\".\nn\nnosname is the operating system which will be used to deploy generated documentation. This defaults to \"linux\". This value must be one of those specified in the os: section of the .travis.yml configuration file.\nn\nnjulia is the version of Julia that will be used to deploy generated documentation. This defaults to \"nightly\". This value must be one of those specified in the julia: section of the .travis.yml configuration file.\nn\nndeps is the function used to install any dependancies needed to build the documentation. By default this function installs pygments and mkdocs using the Deps.pip function:\nn\nndeps = Deps.pip(\"pygments\", \"mkdocs\")\nn\nnmake is the function used to convert the markdown files to HTML. By default this just runs mkdocs build which populates the target directory.\nn\nnSee Also\nn\nnThe Hosting Documentation section of the manual provides a step-by-step guide to using the deploydocs function to automatically generate docs and push then to GitHub.\nn\nn\nn\nn"
},

{
    "location": "lib/public.html#Documenter.generate",
    "title": "Documenter.generate",
    "category": "Function",
    "text": "generate(\nn    pkgname;\nn    dir = \"<package directory>/docs\"\nn)\nn\nnCreates a documentation stub for a package called pkgname. The location of the documentation is assumed to be <package directory>/docs, but this can be overriden with keyword arguments.\nn\nnIt creates the following files\nn\nndocs/\nn    .gitignore\nn    src/index.md\nn    make.jl\nn    mkdocs.yml\nn\nnPositionals\nn\nnpkgname is the name of the package (without .jl). It is used to determine the location of the documentation if dir is not provided.\nn\nnKeywords\nn\nndir defines the directory where the documentation will be generated. It defaults to <package directory>/docs. The directory must not exist.\nn\nnExamples\nn\nnjulia> using Documenter\nn\nnjulia> Documenter.generate(\"MyPackageName\")\nn[ ... output ... ]\nn\nn\nn\nn"
},

{
    "location": "lib/public.html#Documenter.Travis",
    "title": "Documenter.Travis",
    "category": "Module",
    "text": "Package functions for interacting with Travis.\nn\nn\nn\nn"
},

{
    "location": "lib/public.html#Documenter.Travis.genkeys",
    "title": "Documenter.Travis.genkeys",
    "category": "Function",
    "text": "Generate ssh keys for automatic deployment of docs from Travis to GitHub pages. Requires the following command lines programs to be installed:\nn\nnwhich\nngit\nntravis\nnssh-keygen\nn\nnExamples\nn\nnjulia> using Documenter\nn\nnjulia> Travis.genkeys(\"MyPackageName\")\nn[ ... output ... ]\nn\nn\nn\nn"
},

{
    "location": "lib/public.html#Documenter.Deps",
    "title": "Documenter.Deps",
    "category": "Module",
    "text": "Exported module that provides build and deploy dependancies and related functions.\nn\nnCurrently only pip is implemented.\nn\nn\nn\nn"
},

{
    "location": "lib/public.html#Documenter.Deps.pip",
    "title": "Documenter.Deps.pip",
    "category": "Function",
    "text": "pip(deps...)\nn\nnInstalls (as non-root user) all python packages listed in deps.\nn\nnExamples\nn\nnusing Documenter\nn\nnmakedocs(\nn    # ...\nn)\nn\nndeploydocs(\nn    deps = Deps.pip(\"pygments\", \"mkdocs\", \"mkdocs-material\"),\nn    # ...\nn)\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html",
    "title": "Internal Documentation",
    "category": "Page",
    "text": "CurrentModule = Documenter"
},

{
    "location": "lib/internals.html#Internal-Documentation-1",
    "title": "Internal Documentation",
    "category": "Section",
    "text": ""
},

{
    "location": "lib/internals.html#Contents-1",
    "title": "Contents",
    "category": "Section",
    "text": "Pages = [\"internals.md\"]"
},

{
    "location": "lib/internals.html#Index-1",
    "title": "Index",
    "category": "Section",
    "text": "Pages = [\"internals.md\"]"
},

{
    "location": "lib/internals.html#Documenter.Anchors",
    "title": "Documenter.Anchors",
    "category": "Module",
    "text": "Defines the Anchor and AnchorMap types.\nn\nnAnchors and AnchorMaps are used to represent links between objects within a document.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Anchors.Anchor",
    "title": "Documenter.Anchors.Anchor",
    "category": "Type",
    "text": "Stores an arbitrary object called .object and it's location within a document.\nn\nnFields\nn\nnobject – the stored object.\nnorder  – ordering of object within the entire document.\nnfile   – the destination file, in build, where the object will be written to.\nnid     – the generated \"slug\" identifying the object.\nnnth    – integer that unique-ifies anchors with the same id.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Anchors.AnchorMap",
    "title": "Documenter.Anchors.AnchorMap",
    "category": "Type",
    "text": "Tree structure representating anchors in a document and their relationships with eachother.\nn\nnObject Hierarchy\nn\nnid -> file -> anchors\nn\nnEach id maps to a file which in turn maps to a vector of Anchor objects.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Anchors.add!",
    "title": "Documenter.Anchors.add!",
    "category": "Function",
    "text": "Adds a new Anchor to the AnchorMap for a given id and file.\nn\nnEither an actual Anchor object may be provided or any other object which is automatically wrapped in an Anchor before being added to the AnchorMap.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Anchors.anchor",
    "title": "Documenter.Anchors.anchor",
    "category": "Function",
    "text": "anchor(m, id)\nnanchor(m, id, file)\nnanchor(m, id, file, n)\nn\nnReturns the Anchor object matching id. file and n may also be provided. A Nullable{Anchor} is returned which must be unwrapped with isnull and get before use.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Anchors.exists",
    "title": "Documenter.Anchors.exists",
    "category": "Function",
    "text": "exists(m, id)\nnexists(m, id, file)\nnexists(m, id, file, n)\nn\nnDoes the given id exist within the AnchorMap? A file and integer n may also be provided to narrow the search for existance.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Anchors.isunique",
    "title": "Documenter.Anchors.isunique",
    "category": "Function",
    "text": "isunique(m, id)\nnisunique(m, id, file)\nn\nnIs the id unique within the given AnchorMap? May also specify the file.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Anchors-1",
    "title": "Anchors",
    "category": "Section",
    "text": "Anchors\nnAnchors.Anchor\nnAnchors.AnchorMap\nnAnchors.add!\nnAnchors.anchor\nnAnchors.exists\nnAnchors.isunique"
},

{
    "location": "lib/internals.html#Documenter.Builder",
    "title": "Documenter.Builder",
    "category": "Module",
    "text": "Defines the Documenter.jl build \"pipeline\" named DocumentPipeline.\nn\nnEach stage of the pipeline performs an action on a Documents.Document object. These actions may involve creating directory structures, expanding templates, running doctests, etc.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.DocumentPipeline",
    "title": "Documenter.Builder.DocumentPipeline",
    "category": "Type",
    "text": "The default document processing \"pipeline\", which consists of the following actions:\nn\nnSetupBuildDirectory\nnRedirectOutputStreams\nnExpandTemplates\nnCrossReferences\nnCheckDocument\nnRestoreOutputStreams\nnPopulate\nnRenderDocument\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.SetupBuildDirectory",
    "title": "Documenter.Builder.SetupBuildDirectory",
    "category": "Type",
    "text": "Creates the correct directory layout within the build folder and parses markdown files.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.RedirectOutputStreams",
    "title": "Documenter.Builder.RedirectOutputStreams",
    "category": "Type",
    "text": "Replace STDOUT and STDERR streams with a single stream to capture doctest output.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.ExpandTemplates",
    "title": "Documenter.Builder.ExpandTemplates",
    "category": "Type",
    "text": "Executes a sequence of actions on each node of the parsed markdown files in turn.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.CrossReferences",
    "title": "Documenter.Builder.CrossReferences",
    "category": "Type",
    "text": "Finds and sets URLs for each @ref link in the document to the correct destinations.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.CheckDocument",
    "title": "Documenter.Builder.CheckDocument",
    "category": "Type",
    "text": "Checks that all documented objects are included in the document and runs doctests on all valid Julia code blocks.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.RestoreOutputStreams",
    "title": "Documenter.Builder.RestoreOutputStreams",
    "category": "Type",
    "text": "Switch back to the real STDOUT and STDERR that were changed in RedirectOutputStreams.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.Populate",
    "title": "Documenter.Builder.Populate",
    "category": "Type",
    "text": "Populates the ContentsNodes and IndexNodes with links.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Builder.RenderDocument",
    "title": "Documenter.Builder.RenderDocument",
    "category": "Type",
    "text": "Writes the document tree to the build directory.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Builder-1",
    "title": "Builder",
    "category": "Section",
    "text": "Builder\nnBuilder.DocumentPipeline\nnBuilder.SetupBuildDirectory\nnBuilder.RedirectOutputStreams\nnBuilder.ExpandTemplates\nnBuilder.CrossReferences\nnBuilder.CheckDocument\nnBuilder.RestoreOutputStreams\nnBuilder.Populate\nnBuilder.RenderDocument"
},

{
    "location": "lib/internals.html#Documenter.CrossReferences",
    "title": "Documenter.CrossReferences",
    "category": "Module",
    "text": "Provides the crossref function used to automatically calculate link URLs.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.CrossReferences.crossref",
    "title": "Documenter.CrossReferences.crossref",
    "category": "Function",
    "text": "Traverses a Documents.Document and replaces links containg @ref URLs with their real URLs.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#CrossReferences-1",
    "title": "CrossReferences",
    "category": "Section",
    "text": "CrossReferences\nnCrossReferences.crossref"
},

{
    "location": "lib/internals.html#Documenter.DocChecks",
    "title": "Documenter.DocChecks",
    "category": "Module",
    "text": "Provides two functions, missingdocs and doctest, for checking docs.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.DocChecks.missingdocs",
    "title": "Documenter.DocChecks.missingdocs",
    "category": "Function",
    "text": "Checks that a Documents.Document contains all available docstrings that are defined in the modules keyword passed to Documenter.makedocs.\nn\nnPrints out the name of each object that has not had its docs spliced into the document.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.DocChecks.doctest",
    "title": "Documenter.DocChecks.doctest",
    "category": "Function",
    "text": "Traverses the document tree and tries to run each Julia code block encountered. Will abort the document generation when an error is thrown. Use doctest = false keyword in Documenter.makedocs to disable doctesting.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#DocChecks-1",
    "title": "DocChecks",
    "category": "Section",
    "text": "DocChecks\nnDocChecks.missingdocs\nnDocChecks.doctest"
},

{
    "location": "lib/internals.html#Documenter.DocSystem",
    "title": "Documenter.DocSystem",
    "category": "Module",
    "text": "Provides a consistent interface to retreiving DocStr objects from the Julia docsystem in both 0.4 and 0.5.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.DocSystem.getdocs",
    "title": "Documenter.DocSystem.getdocs",
    "category": "Function",
    "text": "Find all DocStr objects that match the provided arguments:\nn\nnbinding: the name of the object.\nntypesig: the signature of the object. Default: Union{}.\nncompare: how to compare signatures? Exact (==) or subtypes (<:). Default: <:.\nnmodules: which modules to search through. Default: all modules.\nnaliases: check aliases of binding when nothing is found. Default: true.\nn\nnReturns a Vector{DocStr} ordered by definition order in 0.5 and by type_morespecific in 0.4.\nn\nn\nn\nnAccepts objects of any type and tries to convert them to Bindings before searching for the Binding in the docsystem.\nn\nnNote that when conversion fails this method returns an empty Vector{DocStr}.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.DocSystem.binding",
    "title": "Documenter.DocSystem.binding",
    "category": "Function",
    "text": "Converts an object to a Base.Docs.Binding object.\nn\nnbinding(object) :: Binding\nn\nnSupported inputs are:\nn\nnBinding\nnDataType\nnFunction\nnModule\nnSymbol\nn\nnNote that unsupported objects will throw an ArgumentError.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.DocSystem.docstr",
    "title": "Documenter.DocSystem.docstr",
    "category": "Function",
    "text": "Construct a DocStr object from a Markdown.MD object.\nn\nnThe optional keyword arguments are used to add new data to the DocStr's .data dictionary.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.DocSystem.multidoc",
    "title": "Documenter.DocSystem.multidoc",
    "category": "Function",
    "text": "Construct a MultiDoc object from the provided argument.\nn\nnValid inputs are:\nn\nnMarkdown.MD\nnDocs.FuncDoc\nnDocs.TypeDoc\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.DocSystem.convertmeta",
    "title": "Documenter.DocSystem.convertmeta",
    "category": "Function",
    "text": "Converts a 0.4-style docstring cache into a 0.5 one.\nn\nnThe original docstring cache is not modified.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#DocSystem-1",
    "title": "DocSystem",
    "category": "Section",
    "text": "DocSystem\nnDocSystem.getdocs\nnDocSystem.binding\nnDocSystem.docstr\nnDocSystem.multidoc\nnDocSystem.convertmeta"
},

{
    "location": "lib/internals.html#Documenter.Documents",
    "title": "Documenter.Documents",
    "category": "Module",
    "text": "Defines Document and its supporting types\nn\nnPage\nnUser\nnInternal\nnGlobals\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Documents.Document",
    "title": "Documenter.Documents.Document",
    "category": "Type",
    "text": "Represents an entire document.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Documents.Page",
    "title": "Documenter.Documents.Page",
    "category": "Type",
    "text": "Represents a single markdown file.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Documents.User",
    "title": "Documenter.Documents.User",
    "category": "Type",
    "text": "User-specified values used to control the generation process.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Documents.Internal",
    "title": "Documenter.Documents.Internal",
    "category": "Type",
    "text": "Private state used to control the generation process.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Documents.Globals",
    "title": "Documenter.Documents.Globals",
    "category": "Type",
    "text": "Page-local values such as current module that are shared between nodes in a page.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Documents.populate!",
    "title": "Documenter.Documents.populate!",
    "category": "Function",
    "text": "Populates the ContentsNodes and IndexNodes of the document with links.\nn\nnThis can only be done after all the blocks have been expanded (and nodes constructed), because the items have to exist before we can gather the links to those items.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documents-1",
    "title": "Documents",
    "category": "Section",
    "text": "Documents\nnDocuments.Document\nnDocuments.Page\nnDocuments.User\nnDocuments.Internal\nnDocuments.Globals\nnDocuments.populate!"
},

{
    "location": "lib/internals.html#Documenter.Expanders",
    "title": "Documenter.Expanders",
    "category": "Module",
    "text": "Defines node \"expanders\" that transform nodes from the parsed markdown files.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.ExpanderPipeline",
    "title": "Documenter.Expanders.ExpanderPipeline",
    "category": "Type",
    "text": "The default node expander \"pipeline\", which consists of the following expanders:\nn\nnTrackHeaders\nnMetaBlocks\nnDocsBlocks\nnAutoDocsBlocks\nnEvalBlocks\nnIndexBlocks\nnContentsBlocks\nnExampleBlocks\nnREPLBlocks\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.TrackHeaders",
    "title": "Documenter.Expanders.TrackHeaders",
    "category": "Type",
    "text": "Tracks all Markdown.Header nodes found in the parsed markdown files and stores an Anchors.Anchor object for each one.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.MetaBlocks",
    "title": "Documenter.Expanders.MetaBlocks",
    "category": "Type",
    "text": "Parses each code block where the language is @meta and evaluates the key/value pairs found within the block, i.e.\nn\nn```@meta\nnCurrentModule = Documenter\nnDocTestSetup  = quote\nn    using Documenter\nnend\nn```\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.DocsBlocks",
    "title": "Documenter.Expanders.DocsBlocks",
    "category": "Type",
    "text": "Parses each code block where the language is @docs and evaluates the expressions found within the block. Replaces the block with the docstrings associated with each expression.\nn\nn```@docs\nnDocumenter\nnmakedocs\nndeploydocs\nn```\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.AutoDocsBlocks",
    "title": "Documenter.Expanders.AutoDocsBlocks",
    "category": "Type",
    "text": "Parses each code block where the language is @autodocs and replaces it with all the docstrings that match the provided key/value pairs Modules = ... and Order = ....\nn\nn```@autodocs\nnModules = [Foo, Bar]\nnOrder   = [:function, :type]\nn```\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.EvalBlocks",
    "title": "Documenter.Expanders.EvalBlocks",
    "category": "Type",
    "text": "Parses each code block where the language is @eval and evaluates it's content. Replaces the block with the value resulting from the evaluation. This can be useful for inserting generated content into a document such as plots.\nn\nn```@eval\nnusing PyPlot\nnx = linspace(-π, π)\nny = sin(x)\nnplot(x, y, color = \"red\")\nnsavefig(\"plot.svg\")\nnMarkdown.Image(\"Plot\", \"plot.svg\")\nn```\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.IndexBlocks",
    "title": "Documenter.Expanders.IndexBlocks",
    "category": "Type",
    "text": "Parses each code block where the language is @index and replaces it with an index of all docstrings spliced into the document. The pages that are included can be set using a key/value pair Pages = [...] such as\nn\nn```@index\nnPages = [\"foo.md\", \"bar.md\"]\nn```\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.ContentsBlocks",
    "title": "Documenter.Expanders.ContentsBlocks",
    "category": "Type",
    "text": "Parses each code block where the language is @contents and replaces it with a nested list of all Header nodes in the generated document. The pages and depth of the list can be set using Pages = [...] and Depth = N where N is and integer.\nn\nn```@contents\nnPages = [\"foo.md\", \"bar.md\"]\nnDepth = 1\nn```\nn\nnThe default Depth value is 2.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.ExampleBlocks",
    "title": "Documenter.Expanders.ExampleBlocks",
    "category": "Type",
    "text": "Parses each code block where the language is @example and evaluates the parsed Julia code found within. The resulting value is then inserted into the final document after the source code.\nn\nn```@example\nna = 1\nnb = 2\nna + b\nn```\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.REPLBlocks",
    "title": "Documenter.Expanders.REPLBlocks",
    "category": "Type",
    "text": "Similar to the ExampleBlocks expander, but inserts a Julia REPL prompt before each toplevel expression in the final document.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Expanders.docsnode_methodlist",
    "title": "Documenter.Expanders.docsnode_methodlist",
    "category": "Function",
    "text": "Returns a Nullable{Vector{MethodNode}} with the methods associated with the object.\nn\nnNull is returned if the object conceptually does not have a table of methods (e.g. modules). If instead the object should have a table of methods which just happens to be empty then it returns an empty vector.\nn\nnThe methods are also filtered, with MethodNode.visible set to false for those methods not defined in this package. This allows the writers to choose how they want to treat trivial constructors, functions imported from Base and such.\nn\nnDue to differences between 0.4 and 0.5, only 0.5 is supported currently. On 0.4 we always drop the methods table.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Expanders-1",
    "title": "Expanders",
    "category": "Section",
    "text": "Expanders\nnExpanders.ExpanderPipeline\nnExpanders.TrackHeaders\nnExpanders.MetaBlocks\nnExpanders.DocsBlocks\nnExpanders.AutoDocsBlocks\nnExpanders.EvalBlocks\nnExpanders.IndexBlocks\nnExpanders.ContentsBlocks\nnExpanders.ExampleBlocks\nnExpanders.REPLBlocks\nnExpanders.docsnode_methodlist"
},

{
    "location": "lib/internals.html#Documenter.Formats",
    "title": "Documenter.Formats",
    "category": "Module",
    "text": "Filetypes used to decide which rendering methods in Documenter.Writers are called.\nn\nnThe only supported format is currently Markdown.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Formats.Format",
    "title": "Documenter.Formats.Format",
    "category": "Type",
    "text": "Represents the output format. Possible values are Markdown, LaTeX, and HTML.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Formats.mimetype",
    "title": "Documenter.Formats.mimetype",
    "category": "Function",
    "text": "Converts a Format value to a MIME type.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Formats-1",
    "title": "Formats",
    "category": "Section",
    "text": "Formats\nnFormats.Format\nnFormats.mimetype"
},

{
    "location": "lib/internals.html#Documenter.Generator",
    "title": "Documenter.Generator",
    "category": "Module",
    "text": "Provides the functions related to generating documentation stubs.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Generator.savefile",
    "title": "Documenter.Generator.savefile",
    "category": "Function",
    "text": "savefile(f, root, filename)\nn\nnAttempts to save a file at $(root)/$(filename). f will be called with file stream (see open).\nn\nnfilename can also be a file in a subdirectory (e.g. src/index.md), and then then subdirectories will be created automatically.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Generator.make",
    "title": "Documenter.Generator.make",
    "category": "Function",
    "text": "Contents of the default make.jl file.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Generator.gitignore",
    "title": "Documenter.Generator.gitignore",
    "category": "Function",
    "text": "Contents of the default .gitignore file.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Generator.mkdocs",
    "title": "Documenter.Generator.mkdocs",
    "category": "Function",
    "text": "Contents of the default mkdocs.yml file.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Generator.index",
    "title": "Documenter.Generator.index",
    "category": "Function",
    "text": "Contents of the default src/index.md file.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Generator-1",
    "title": "Generator",
    "category": "Section",
    "text": "Generator\nnGenerator.savefile\nnGenerator.make\nnGenerator.gitignore\nnGenerator.mkdocs\nnGenerator.index"
},

{
    "location": "lib/internals.html#Documenter.Selectors",
    "title": "Documenter.Selectors",
    "category": "Module",
    "text": "An extensible code selection interface.\nn\nnThe Selectors module provides an extensible way to write code that has to dispatch on different predicates without hardcoding the control flow into a single chain of if statements.\nn\nnIn the following example a selector for a simple condition is implemented and the generated selector code is described:\nn\nnabstract MySelector <: Selectors.AbstractSelector\nn\nn# The different cases we want to test.\nnabstract One    <: MySelector\nnabstract NotOne <: MySelector\nn\nn# The order in which to test the cases.\nnSelectors.order(::Type{One})    = 0.0\nnSelectors.order(::Type{NotOne}) = 1.0\nn\nn# The predicate to test against.\nnSelectors.matcher(::Type{One}, x)    = x === 1\nnSelectors.matcher(::Type{NotOne}, x) = x !== 1\nn\nn# What to do when a test is successful.\nnSelectors.runner(::Type{One}, x)    = println(\"found one\")\nnSelectors.runner(::Type{NotOne}, x) = println(\"not found\")\nn\nn# Test our selector with some numbers.\nnfor i in 0:5\nn    Selectors.dispatch(MySelector, i)\nnend\nn\nnThe code generated by Selectors.dispatch(Selector, i) will look similar to the following:\nn\nnfunction dispatch(::Type{MySelector}, i::Int)\nn    if matcher(One, i)\nn        runner(One, i)\nn    elseif matcher(NotOne, i)\nn        runner(NotOne, i)\nn    end\nnend\nn\nnwhich would be further simplified after inlining matcher and runner as\nn\nnfunction dispatch(::Type{MySelector}, i::Int)\nn    if i === 1\nn        println(\"found one\")\nn    elseif i !== 1\nn        println(\"not found\")\nn    end\nnend\nn\nnThe module provides the following interface for creating selectors:\nn\nnorder\nnmatcher\nnrunner\nnstrict\nndisable\nndispatch\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Selectors.AbstractSelector",
    "title": "Documenter.Selectors.AbstractSelector",
    "category": "Type",
    "text": "Root selector type. Each user-defined selector must subtype from this, i.e.\nn\nnabstract MySelector <: Selectors.AbstractSelector\nn\nnabstract First  <: MySelector\nnabstract Second <: MySelector\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Selectors.order",
    "title": "Documenter.Selectors.order",
    "category": "Function",
    "text": "Define the precedence of each case in a selector, i.e.\nn\nnSelectors.order(::Type{First})  = 1.0\nnSelectors.order(::Type{Second}) = 2.0\nn\nnNote that the return type must be Float64. Defining multiple case types to have the same order will result in undefined behaviour.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Selectors.matcher",
    "title": "Documenter.Selectors.matcher",
    "category": "Function",
    "text": "Define the matching test for each case in a selector, i.e.\nn\nnSelectors.matcher(::Type{First}, x)  = x == 1\nnSelectors.matcher(::Type{Second}, x) = true\nn\nnNote that the return type must be Bool.\nn\nnTo match against multiple cases use the Selectors.strict function.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Selectors.runner",
    "title": "Documenter.Selectors.runner",
    "category": "Function",
    "text": "Define the code that will run when a particular Selectors.matcher test returns true, i.e.\nn\nnSelectors.runner(::Type{First}, x)  = println(\"`x` is equal to `1`.\")\nnSelectors.runner(::Type{Second}, x) = println(\"`x` is not equal to `1`.\")\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Selectors.strict",
    "title": "Documenter.Selectors.strict",
    "category": "Function",
    "text": "Define whether a selector case will \"fallthrough\" or not when successfully matched against. By default matching is strict and does not fallthrough to subsequent selector cases.\nn\nn# Adding a debugging selector case.\nnabstract Debug <: MySelector\nn\nn# Insert prior to all other cases.\nnSelectors.order(::Type{Debug}) = 0.0\nn\nn# Fallthrough to the next case on success.\nnSelectors.strict(::Type{Debug}) = false\nn\nn# We always match, regardless of the value of `x`.\nnSelectors.matcher(::Type{Debug}, x) = true\nn\nn# Print some debugging info.\nnSelectors.runner(::Type{Debug}, x) = @show x\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Selectors.disable",
    "title": "Documenter.Selectors.disable",
    "category": "Function",
    "text": "Disable a particular case in a selector so that it is never used.\nn\nnSelectors.disable(::Type{Debug}) = true\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Selectors.dispatch",
    "title": "Documenter.Selectors.dispatch",
    "category": "Function",
    "text": "Generated function that builds a specialised selector for each selector type provided, i.e.\nn\nnSelectors.dispatch(MySelector, 1)\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Selectors-1",
    "title": "Selectors",
    "category": "Section",
    "text": "Selectors\nnSelectors.AbstractSelector\nnSelectors.order\nnSelectors.matcher\nnSelectors.runner\nnSelectors.strict\nnSelectors.disable\nnSelectors.dispatch"
},

{
    "location": "lib/internals.html#Documenter.Walkers",
    "title": "Documenter.Walkers",
    "category": "Module",
    "text": "Provides the walk function.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Walkers.walk",
    "title": "Documenter.Walkers.walk",
    "category": "Function",
    "text": "walk(f, meta, element)\nn\nnCalls f on element and any of its child elements. meta is a Dict containing metadata such as current module.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Walkers-1",
    "title": "Walkers",
    "category": "Section",
    "text": "Walkers\nnWalkers.walk"
},

{
    "location": "lib/internals.html#Documenter.Writers",
    "title": "Documenter.Writers",
    "category": "Module",
    "text": "Provides a rendering function, render, for writing each supported Formats.Format to file.\nn\nnNote that currently Formats.Markdown is the only supported format.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Writers.Writer",
    "title": "Documenter.Writers.Writer",
    "category": "Type",
    "text": "A parametric type that allows us to use multiple dispatch to pick the appropriate writer for each output format.\nn\nnThe parameter f should be an instance of the Formats.Format enumeration.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Writers.render",
    "title": "Documenter.Writers.render",
    "category": "Function",
    "text": "Writes a Documents.Document object to .user.build directory in the format specified in .user.format.\nn\nnThe method should be overloaded in each writer as\nn\nnrender(::Writer{format}, doc)\nn\nnwhere format is one of the values of the Formats.Format enumeration.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Writers.MarkdownWriter",
    "title": "Documenter.Writers.MarkdownWriter",
    "category": "Module",
    "text": "Provides the render methods to write the documentation as Markdown files (MIME\"text/plain\").\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Writers.MarkdownWriter.join_decl",
    "title": "Documenter.Writers.MarkdownWriter.join_decl",
    "category": "Function",
    "text": "Converts the function argument tuple (name, type) into a string.\nn\nnThe tuple comes from the second return element of the Base.arg_decl_parts(::Method) and it seems they are always both ::String (::ASCIIString in 0.4). It also appears that if the type is not declared for the method, arg_decl_parts returns an empty string.\nn\nnThe returned string is name::type or just name, if the type is not declared.\nn\nnIf the keyword argument html is true (default), then it also puts <span>s around the characters for code highlighting.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Writers.MarkdownWriter.span",
    "title": "Documenter.Writers.MarkdownWriter.span",
    "category": "Function",
    "text": "Wrap a string str in a <span class=\"<cls>\">.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Writers.HTMLWriter",
    "title": "Documenter.Writers.HTMLWriter",
    "category": "Module",
    "text": "Provides the render methods to write the documentation as HTML files (MIME\"text/html\").\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Writers.LaTeXWriter",
    "title": "Documenter.Writers.LaTeXWriter",
    "category": "Module",
    "text": "Provides the render methods to write the documentation as LaTeX files (MIME\"text/latex\").\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Writers-1",
    "title": "Writers",
    "category": "Section",
    "text": "Writers\nnWriters.Writer\nnWriters.render\nnWriters.MarkdownWriter\nnWriters.MarkdownWriter.join_decl\nnWriters.MarkdownWriter.span\nnWriters.HTMLWriter\nnWriters.LaTeXWriter"
},

{
    "location": "lib/internals.html#Documenter.Utilities",
    "title": "Documenter.Utilities",
    "category": "Module",
    "text": "Provides a collection of utility functions and types that are used in other submodules.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.currentdir",
    "title": "Documenter.Utilities.currentdir",
    "category": "Function",
    "text": "Returns the current directory.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.assetsdir",
    "title": "Documenter.Utilities.assetsdir",
    "category": "Function",
    "text": "Returns the path to the Documenter assets directory.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.check_kwargs",
    "title": "Documenter.Utilities.check_kwargs",
    "category": "Function",
    "text": "Prints a formatted warning to the user listing unrecognised keyword arguments.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.slugify",
    "title": "Documenter.Utilities.slugify",
    "category": "Function",
    "text": "Slugify a string into a suitable URL.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.parseblock",
    "title": "Documenter.Utilities.parseblock",
    "category": "Function",
    "text": "Returns a vector of parsed expressions and their corresponding raw strings.\nn\nnThe keyword argument skip = N drops the leading N lines from the input string.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.log",
    "title": "Documenter.Utilities.log",
    "category": "Function",
    "text": "Format and print a message to the user.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.warn",
    "title": "Documenter.Utilities.warn",
    "category": "Function",
    "text": "warn(file, msg)\nnwarn(msg)\nn\nnFormat and print a warning message to the user. Passing a file will include the filename where the warning was raised.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.logging",
    "title": "Documenter.Utilities.logging",
    "category": "Function",
    "text": "logging(flag::Bool)\nn\nnEnable or disable logging output for log and warn.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.submodules",
    "title": "Documenter.Utilities.submodules",
    "category": "Function",
    "text": "Returns the set of submodules of a given root module/s.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.filterdocs",
    "title": "Documenter.Utilities.filterdocs",
    "category": "Function",
    "text": "filterdocs(doc, modules)\nn\nnRemove docstrings from the markdown object, doc, that are not from one of modules.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.Object",
    "title": "Documenter.Utilities.Object",
    "category": "Type",
    "text": "Represents an object stored in the docsystem by its binding and signature.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.object",
    "title": "Documenter.Utilities.object",
    "category": "Function",
    "text": "object(ex, str)\nn\nnReturns a expression that, when evaluated, returns an Object representing ex.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.docs",
    "title": "Documenter.Utilities.docs",
    "category": "Function",
    "text": "docs(ex, str)\nn\nnReturns an expression that, when evaluated, returns the docstrings associated with ex.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.doccat",
    "title": "Documenter.Utilities.doccat",
    "category": "Function",
    "text": "Returns the category name of the provided Object.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.nodocs",
    "title": "Documenter.Utilities.nodocs",
    "category": "Function",
    "text": "Does the given docstring represent actual documentation or a no docs error message?\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.issubmodule",
    "title": "Documenter.Utilities.issubmodule",
    "category": "Function",
    "text": "issubmodule(sub, mod)\nn\nnChecks whether sub is a submodule of mod. A module is also considered to be its own submodule.\nn\nnE.g. A.B.C is a submodule of A, A.B and A.B.C, but it is not a submodule of D, A.D nor A.B.C.D.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Utilities-1",
    "title": "Utilities",
    "category": "Section",
    "text": "Utilities\nnUtilities.currentdir\nnUtilities.assetsdir\nnUtilities.check_kwargs\nnUtilities.slugify\nnUtilities.parseblock\nnUtilities.log\nnUtilities.warn\nnUtilities.logging\nnUtilities.submodules\nnUtilities.filterdocs\nnUtilities.Object\nnUtilities.object\nnUtilities.docs\nnUtilities.doccat\nnUtilities.nodocs\nnUtilities.issubmodule"
},

{
    "location": "lib/internals.html#Documenter.Utilities.DOM",
    "title": "Documenter.Utilities.DOM",
    "category": "Module",
    "text": "Provides a domain specific language for representing HTML documents.\nn\nnExamples\nn\nnusing Documenter.Utilities.DOM\nn\nn# `DOM` does not export any HTML tags. Define the ones we actually need.\nn@tags div p em strong ul li\nn\nndiv(\nn    p(\"This \", em(\"is\"), \" a \", strong(\"paragraph.\"),\nn    p(\"And this is \", strong(\"another\"), \" one\"),\nn    ul(\nn        li(\"and\"),\nn        li(\"an\"),\nn        li(\"unordered\"),\nn        li(\"list\")\nn    )\nn)\nn\nnNotes\nn\nnAll the arguments passed to a node are flattened into a single vector rather than preserving any nested structure. This means that passing two vectors of nodes to a div will result in a div node with a single vector of children (the concatenation of the two vectors) rather than two vector children. The only arguments that are not flattened are nested nodes.\nn\nnString arguments are automatically converted into text nodes. Text nodes do not have any children or attributes and when displayed the string is escaped using escapehtml.\nn\nnAttributes\nn\nnAs well as plain nodes shown in the previous example, nodes can have attributes added to them using the following syntax.\nn\nndiv[\".my-class\"](\nn    img[:src => \"foo.jpg\"],\nn    input[\"#my-id\", :disabled]\nn)\nn\nnIn the above example we add a class = \"my-class\" attribute to the div node, a src = \"foo.jpg\" to the img, and id = \"my-id\" disabled attributes to the input node.\nn\nnThe following syntax is supported within [...]:\nn\nntag[\"#id\"]\nntag[\".class\"]\nntag[\".class#id\"]\nntag[:disabled]\nntag[:src => \"foo.jpg\"]\nn# ... or any combination of the above arguments.\nn\nnInternal Representation\nn\nnThe @tags macro defines named Tag objects as follows\nn\nn@tags div p em strong\nn\nnexpands to\nn\nnconst div, p, em, strong = Tag(:div), Tag(:p), Tag(:em), Tag(:strong)\nn\nnThese Tag objects are lightweight representations of empty HTML elements without any attributes and cannot be used to represent a complete document. To create an actual tree of HTML elements that can be rendered we need to add some attributes and/or child elements using getindex or call syntax. Applying either to a Tag object will construct a new Node object.\nn\nntag(...)      # No attributes.\nntag[...]      # No children.\nntag[...](...) # Has both attributes and children.\nn\nnAll three of the above syntaxes return a new Node object. Printing of Node objects is defined using the standard Julia display functions, so only needs a call to print to print out a valid HTML document with all nessesary text escaped.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.DOM.@tags",
    "title": "Documenter.Utilities.DOM.@tags",
    "category": "Macro",
    "text": "Define a collection of Tag objects and bind them to constants with the same names.\nn\nnExamples\nn\nnDefined globally within a module:\nn\nn@tags div ul li\nn\nnDefined within the scope of a function to avoid cluttering the global namespace:\nn\nnfunction template(args...)\nn    @tags div ul li\nn    # ...\nnend\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.DOM.Tag",
    "title": "Documenter.Utilities.DOM.Tag",
    "category": "Type",
    "text": "Represents a empty and attribute-less HTML element.\nn\nnUse @tags to define instances of this type rather than manually creating them via Tag(:tagname).\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.DOM.Node",
    "title": "Documenter.Utilities.DOM.Node",
    "category": "Type",
    "text": "Represents an element within an HTML document including any textual content, children Nodes, and attributes.\nn\nnThis type should not be constructed directly, but instead via (...) and [...] applied to a Tag or another Node object.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.DOM.escapehtml",
    "title": "Documenter.Utilities.DOM.escapehtml",
    "category": "Function",
    "text": "Escape characters in the provided string. This converts the following characters:\nn\nn< to &lt;\nn> to &gt;\nn& to &amp;\nn' to &#39;\nn\" to &quot;\nn\nnWhen no escaping is needed then the same object is returned, otherwise a new string is constructed with the characters escaped. The returned object should always be treated as an immutable copy and compared using == rather than ===.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.DOM.flatten!",
    "title": "Documenter.Utilities.DOM.flatten!",
    "category": "Function",
    "text": "Signatures\nn\nnflatten!(f!, out, x::Atom)\nnflatten!(f!, out, xs)\nn\nnFlatten the contents the third argument into the second after applying the function f! to the element.\nn\nn\nn\nn"
},

{
    "location": "dynamic/code.html",
    "title": "Code examples",
    "category": "Page",
    "text": ""
},

{
    "location": "dynamic/code.html#Code-examples-1",
    "title": "Code examples",
    "category": "Section",
    "text": "Whee, showing off syntax highlighting."
},

{
    "location": "dynamic/code.html#Python-1",
    "title": "Python",
    "category": "Section",
    "text": "def median(pool):\nn    '''Statistical median to demonstrate doctest.\nn    >>> median([2, 9, 9, 7, 9, 2, 4, 5, 8])\nn    7\nn    '''\nn    copy = sorted(pool)\nn    size = len(copy)\nn    if size % 2 == 1:\nn        return copy[(size - 1) / 2]\nn    else:\nn        return (copy[size/2 - 1] + copy[size/2]) / 2\nnif __name__ == '__main__':\nn    import doctest\nn    doctest.testmod()"
},

{
    "location": "dynamic/admonitions.html",
    "title": "Admonitions",
    "category": "Page",
    "text": ""
},

{
    "location": "dynamic/styles.html",
    "title": "Demonstrating styles of MD elements",
    "category": "Page",
    "text": ""
},

{
    "location": "dynamic/styles.html#Demonstrating-*styles*-of-MD-elements-1",
    "title": "Demonstrating styles of MD elements",
    "category": "Section",
    "text": ""
},

{
    "location": "dynamic/styles.html#Headers-1",
    "title": "Headers",
    "category": "Section",
    "text": "h1 and h2 ↑."
},

{
    "location": "dynamic/styles.html#Header-3-1",
    "title": "Header 3",
    "category": "Section",
    "text": "This is h3."
},

{
    "location": "dynamic/styles.html#Header-4-1",
    "title": "Header 4",
    "category": "Section",
    "text": "This is h4."
},

{
    "location": "dynamic/styles.html#Header-5-1",
    "title": "Header 5",
    "category": "Section",
    "text": "This is h5."
},

{
    "location": "dynamic/styles.html#Header-6-1",
    "title": "Header 6",
    "category": "Section",
    "text": "This is h6."
},

{
    "location": "dynamic/styles.html#Blocks-1",
    "title": "Blocks",
    "category": "Section",
    "text": "This is a normal code block.\nnWith multiple lines.This is a quote. Another line in source."
},

{
    "location": "dynamic/styles.html#Tables-1",
    "title": "Tables",
    "category": "Section",
    "text": "If you require... ... then use...\nnfeatures PyPlot, Plotly, GR\nnspeed GR\nninteractivity Plotly\nnbeauty Plotly, PGFPlots\nnREPL Plotting UnicodePlots\nn3D plots PyPlot, GR, Plotly\nna GUI Window GR, PyPlot, PlotlyJS\nna small footprint UnicodePlots, Plotly"
},

{
    "location": "dynamic/bugs.html",
    "title": "Some existing bugs",
    "category": "Page",
    "text": ""
},

{
    "location": "dynamic/bugs.html#Some-existing-bugs-1",
    "title": "Some existing bugs",
    "category": "Section",
    "text": "... in Julia's Markdown parser."
},

{
    "location": "dynamic/bugs.html#Emphasis-1",
    "title": "Emphasis",
    "category": "Section",
    "text": "The underscores don't work for _emphasis_ nor __strong emphasis__. Only asterisks work for emphasis."
},

{
    "location": "dynamic/bugs.html#Titles-for-links-and-images.-1",
    "title": "Titles for links and images.",
    "category": "Section",
    "text": "[image: Ducks! (alt-text) (http://www.freedigitalphotos.net/images/img/homepage/87357.jpg \"Title text? About ducks?\")]About ducks."
},

{
    "location": "manual/arrays.html",
    "title": "Multi-dimensional Arrays",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/arrays.html#Multi-dimensional-Arrays-1",
    "title": "Multi-dimensional Arrays",
    "category": "Section",
    "text": "Julia, like most technical computing languages, provides a first-class array implementation. Most technical computing languages pay a lot of attention to their array implementation at the expense of other containers. Julia does not treat arrays in any special way. The array library is implemented almost completely in Julia itself, and derives its performance from the compiler, just like any other code written in Julia. As such, it's also possible to define custom array types by inheriting from AbstractArray. See the manual section on the AbstractArray interface for more details on implementing a custom array type.An array is a collection of objects stored in a multi-dimensional grid.  In the most general case, an array may contain objects of type Any.  For most computational purposes, arrays should contain objects of a more specific type, such as Float64 or Int32.In general, unlike many other technical computing languages, Julia does not expect programs to be written in a vectorized style for performance. Julia's compiler uses type inference and generates optimized code for scalar array indexing, allowing programs to be written in a style that is convenient and readable, without sacrificing performance, and using less memory at times.In Julia, all arguments to functions are passed by reference. Some technical computing languages pass arrays by value, and this is convenient in many cases. In Julia, modifications made to input arrays within a function will be visible in the parent function. The entire Julia array library ensures that inputs are not modified by library functions. User code, if it needs to exhibit similar behavior, should take care to create a copy of inputs that it may modify."
},

{
    "location": "manual/arrays.html#Arrays-1",
    "title": "Arrays",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/arrays.html#Basic-Functions-1",
    "title": "Basic Functions",
    "category": "Section",
    "text": "Function Description\nneltype(A) the type of the elements contained in A\nnlength(A) the number of elements in A\nnndims(A) the number of dimensions of A\nnsize(A) a tuple containing the dimensions of A\nnsize(A,n) the size of A along a particular dimension\nnindices(A) a tuple containing the valid indices of A\nnindices(A,n) a range expressing the valid indices along dimension n\nneachindex(A) an efficient iterator for visiting each position in A\nnstride(A,k) the stride (linear index distance between adjacent elements) along dimension k\nnstrides(A) a tuple of the strides in each dimension"
},

{
    "location": "manual/arrays.html#Construction-and-Initialization-1",
    "title": "Construction and Initialization",
    "category": "Section",
    "text": "Many functions for constructing and initializing arrays are provided. In the following list of such functions, calls with a dims... argument can either take a single tuple of dimension sizes or a series of dimension sizes passed as a variable number of arguments.Function Description\nnArray{type}(dims...) an uninitialized dense array\nnzeros(type, dims...) an array of all zeros of specified type, defaults to Float64 if type not specified\nnzeros(A) an array of all zeros of same element type and shape of A\nnones(type, dims...) an array of all ones of specified type, defaults to Float64 if type not specified\nnones(A) an array of all ones of same element type and shape of A\nntrues(dims...) a Bool array with all values true\nntrues(A) a Bool array with all values true and the shape of A\nnfalses(dims...) a Bool array with all values false\nnfalses(A) a Bool array with all values false and the shape of A\nnreshape(A, dims...) an array with the same data as the given array, but with different dimensions.\nncopy(A) copy A\nndeepcopy(A) copy A, recursively copying its elements\nnsimilar(A, element_type, dims...) an uninitialized array of the same type as the given array (dense, sparse, etc.), but with the specified element type and dimensions. The second and third arguments are both optional, defaulting to the element type and dimensions of A if omitted.\nnreinterpret(type, A) an array with the same binary data as the given array, but with the specified element type\nnrand(dims) Array of Float64s with random, iid[#]_ and uniformly distributed values in the half-open interval ([0, 1))\nnrandn(dims) Array of Float64s with random, iid and standard normally distributed random values\nneye(n) n-by-n identity matrix\nneye(m, n) m-by-n identity matrix\nnlinspace(start, stop, n) range of n linearly spaced elements from start to stop\nnfill!(A, x) fill the array A with the value x\nnfill(x, dims) create an array filled with the value xfootnote: [1]\nniid, independently and identically distributed.The syntax [A, B, C, ...] constructs a 1-d array (vector) of its arguments."
},

{
    "location": "manual/arrays.html#Concatenation-1",
    "title": "Concatenation",
    "category": "Section",
    "text": "Arrays can be constructed and also concatenated using the following functions:Function Description\nncat(k, A...) concatenate input n-d arrays along the dimension k\nnvcat(A...) shorthand for cat(1, A...)\nnhcat(A...) shorthand for cat(2, A...)Scalar values passed to these functions are treated as 1-element arrays.The concatenation functions are used so often that they have special syntax:Expression Calls\nn[A; B; C; ...] vcat()\nn[A B C ...] hcat()\nn[A B; C D; ...] hvcat()hvcat() concatenates in both dimension 1 (with semicolons) and dimension 2 (with spaces)."
},

{
    "location": "manual/arrays.html#Typed-array-initializers-1",
    "title": "Typed array initializers",
    "category": "Section",
    "text": "An array with a specific element type can be constructed using the syntax T[A, B, C, ...]. This will construct a 1-d array with element type T, initialized to contain elements A, B, C, etc. For example Any[x, y, z] constructs a heterogeneous array that can contain any values.Concatenation syntax can similarly be prefixed with a type to specify the element type of the result.julia> [[1 2] [3 4]]\nn1×4 Array{Int64,2}:\nn 1  2  3  4\nn\nnjulia> Int8[[1 2] [3 4]]\nn1×4 Array{Int8,2}:\nn 1  2  3  4"
},

{
    "location": "manual/arrays.html#Comprehensions-1",
    "title": "Comprehensions",
    "category": "Section",
    "text": "Comprehensions provide a general and powerful way to construct arrays. Comprehension syntax is similar to set construction notation in mathematics:A = [ F(x,y,...) for x=rx, y=ry, ... ]The meaning of this form is that F(x,y,...) is evaluated with the variables x, y, etc. taking on each value in their given list of values. Values can be specified as any iterable object, but will commonly be ranges like 1:n or 2:(n-1), or explicit arrays of values like [1.2, 3.4, 5.7]. The result is an N-d dense array with dimensions that are the concatenation of the dimensions of the variable ranges rx, ry, etc. and each F(x,y,...) evaluation returns a scalar.The following example computes a weighted average of the current element and its left and right neighbor along a 1-d grid. :julia> x = rand(8)\nn8-element Array{Float64,1}:\nn 0.843025\nn 0.869052\nn 0.365105\nn 0.699456\nn 0.977653\nn 0.994953\nn 0.41084\nn 0.809411\nn\nnjulia> [ 0.25*x[i-1] + 0.5*x[i] + 0.25*x[i+1] for i=2:length(x)-1 ]\nn6-element Array{Float64,1}:\nn 0.736559\nn 0.57468\nn 0.685417\nn 0.912429\nn 0.8446\nn 0.656511The resulting array type depends on the types of the computed elements. In order to control the type explicitly, a type can be prepended to the comprehension. For example, we could have requested the result in single precision by writing:Float32[ 0.25*x[i-1] + 0.5*x[i] + 0.25*x[i+1] for i=2:length(x)-1 ]"
},

{
    "location": "manual/arrays.html#Generator-Expressions-1",
    "title": "Generator Expressions",
    "category": "Section",
    "text": "Comprehensions can also be written without the enclosing square brackets, producing an object known as a generator. This object can be iterated to produce values on demand, instead of allocating an array and storing them in advance (see Iteration). For example, the following expression sums a series without allocating memory:julia> sum(1/n^2 for n=1:1000)\nn1.6439345666815615When writing a generator expression with multiple dimensions inside an argument list, parentheses are needed to separate the generator from subsequent arguments:julia> map(tuple, 1/(i+j) for i=1:2, j=1:2, [1:4;])\nnERROR: syntax: invalid iteration specificationAll comma-separated expressions after for are interpreted as ranges. Adding parentheses lets us add a third argument to map:julia> map(tuple, (1/(i+j) for i=1:2, j=1:2), [1 3; 2 4])\nn2×2 Array{Tuple{Float64,Int64},2}:\nn (0.5,1)       (0.333333,3)\nn (0.333333,2)  (0.25,4)Ranges in generators and comprehensions can depend on previous ranges by writing multiple for keywords:julia> [(i,j) for i=1:3 for j=1:i]\nn6-element Array{Tuple{Int64,Int64},1}:\nn (1,1)\nn (2,1)\nn (2,2)\nn (3,1)\nn (3,2)\nn (3,3)In such cases, the result is always 1-d.Generated values can be filtered using the if keyword:julia> [(i,j) for i=1:3 for j=1:i if i+j == 4]\nn2-element Array{Tuple{Int64,Int64},1}:\nn (2,2)\nn (3,1)"
},

{
    "location": "manual/arrays.html#Indexing-1",
    "title": "Indexing",
    "category": "Section",
    "text": "The general syntax for indexing into an n-dimensional array A is:X = A[I_1, I_2, ..., I_n]where each I_k may be:A scalar integer\nnA Range of the form a:b, or a:b:c\nnA : or Colon() to select entire dimensions\nnAn arbitrary integer array, including the empty array []\nnA boolean array to select a vector of elements at its true indicesIf all the indices are scalars, then the result X is a single element from the array A. Otherwise, X is an array with the same number of dimensions as the sum of the dimensionalities of all the indices.If all indices are vectors, for example, then the shape of X would be (length(I_1), length(I_2), ..., length(I_n)), with location (i_1, i_2, ..., i_n) of X containing the value A[I_1[i_1], I_2[i_2], ..., I_n[i_n]]. If I_1 is changed to a two-dimensional matrix, then X becomes an n+1-dimensional array of shape (size(I_1, 1), size(I_1, 2), length(I_2), ..., length(I_n)). The matrix adds a dimension. The location (i_1, i_2, i_3, ..., i_{n+1}) contains the value at A[I_1[i_1, i_2], I_2[i_3], ..., I_n[i_{n+1}]]. All dimensions indexed with scalars are dropped. For example, the result of A[2, I, 3] is an array with size size(I). Its ith element is populated by A[2, I[i], 3].Indexing by a boolean array B is effectively the same as indexing by the vector that is returned by find(B). Often referred to as logical indexing, this selects elements at the indices where the values are true, akin to a mask. A logical index must be a vector of the same length as the dimension it indexes into, or it must be the only index provided and match the size and dimensionality of the array it indexes into. It is generally more efficient to use boolean arrays as indices directly instead of first calling find().Additionally, single elements of a multidimensional array can be indexed as x = A[I], where I is a CartesianIndex. It effectively behaves like an n-tuple of integers spanning multiple dimensions of A. See Iteration below.As a special part of this syntax, the end keyword may be used to represent the last index of each dimension within the indexing brackets, as determined by the size of the innermost array being indexed. Indexing syntax without the end keyword is equivalent to a call to getindex:X = getindex(A, I_1, I_2, ..., I_n)Example:julia> x = reshape(1:16, 4, 4)\nn4×4 Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}}:\nn 1  5   9  13\nn 2  6  10  14\nn 3  7  11  15\nn 4  8  12  16\nn\nnjulia> x[2:3, 2:end-1]\nn2×2 Array{Int64,2}:\nn 6  10\nn 7  11\nn\nnjulia> x[map(ispow2, x)]\nn5-element Array{Int64,1}:\nn  1\nn  2\nn  4\nn  8\nn 16\nn\nnjulia> x[1, [2 3; 4 1]]\nn2×2 Array{Int64,2}:\nn  5  9\nn 13  1Empty ranges of the form n:n-1 are sometimes used to indicate the inter-index location between n-1 and n.  For example, the searchsorted() function uses this convention to indicate the insertion point of a value not found in a sorted array:julia> a = [1,2,5,6,7];\nn\nnjulia> searchsorted(a, 3)\nn3:2"
},

{
    "location": "manual/arrays.html#Assignment-1",
    "title": "Assignment",
    "category": "Section",
    "text": "The general syntax for assigning values in an n-dimensional array A is:A[I_1, I_2, ..., I_n] = Xwhere each I_k may be:A scalar integer\nnA Range of the form a:b, or a:b:c\nnA : or Colon() to select entire dimensions\nnAn arbitrary integer array, including the empty array []\nnA boolean array to select elements at its true indicesIf X is an array, it must have the same number of elements as the product of the lengths of the indices: prod(length(I_1), length(I_2), ..., length(I_n)). The value in location I_1[i_1], I_2[i_2], ..., I_n[i_n] of A is overwritten with the value X[i_1, i_2, ..., i_n]. If X is not an array, its value is written to all referenced locations of A.A boolean array used as an index behaves as in getindex(), behaving as though it is first transformed with find().Index assignment syntax is equivalent to a call to setindex!():setindex!(A, X, I_1, I_2, ..., I_n)Example:julia> x = collect(reshape(1:9, 3, 3))\nn3×3 Array{Int64,2}:\nn 1  4  7\nn 2  5  8\nn 3  6  9\nn\nnjulia> x[1:2, 2:3] = -1\nn-1\nn\nnjulia> x\nn3×3 Array{Int64,2}:\nn 1  -1  -1\nn 2  -1  -1\nn 3   6   9"
},

{
    "location": "manual/arrays.html#Iteration-1",
    "title": "Iteration",
    "category": "Section",
    "text": "The recommended ways to iterate over a whole array arefor a in A\nn    # Do something with the element a\nnend\nn\nnfor i in eachindex(A)\nn    # Do something with i and/or A[i]\nnendThe first construct is used when you need the value, but not index, of each element.  In the second construct, i will be an Int if A is an array type with fast linear indexing; otherwise, it will be a CartesianIndex:A = rand(4,3)\nnB = view(A, 1:3, 2:3)\nnjulia> for i in eachindex(B)\nn           @show i\nn       end\nn       i = Base.IteratorsMD.CartesianIndex_2(1,1)\nn       i = Base.IteratorsMD.CartesianIndex_2(2,1)\nn       i = Base.IteratorsMD.CartesianIndex_2(3,1)\nn       i = Base.IteratorsMD.CartesianIndex_2(1,2)\nn       i = Base.IteratorsMD.CartesianIndex_2(2,2)\nn       i = Base.IteratorsMD.CartesianIndex_2(3,2)In contrast with for i = 1:length(A), iterating with eachindex provides an efficient way to iterate over any array type."
},

{
    "location": "manual/arrays.html#Array-traits-1",
    "title": "Array traits",
    "category": "Section",
    "text": "If you write a custom AbstractArray type, you can specify that it has fast linear indexing usingBase.linearindexing{T<:MyArray}(::Type{T}) = LinearFast()This setting will cause eachindex iteration over a MyArray to use integers.  If you don't specify this trait, the default value LinearSlow() is used."
},

{
    "location": "manual/arrays.html#Vectorized-Operators-and-Functions-1",
    "title": "Vectorized Operators and Functions",
    "category": "Section",
    "text": "The following operators are supported for arrays. The dot version of a binary operator should be used for elementwise operations.Unary arithmetic – -, +, !\nnBinary arithmetic – +, -, *, .*, /, ./, \, .\, ^, .^, div, mod\nnComparison – .==, .!=, .<, .<=, .>, .>=\nnUnary Boolean or bitwise – ~\nnBinary Boolean or bitwise – &, |, $Some operators without dots operate elementwise anyway when one argument is a scalar. These operators are *, +, -, and the bitwise operators. The operators / and \ operate elementwise when the denominator is a scalar.Note that comparisons such as == operate on whole arrays, giving a single boolean answer. Use dot operators for elementwise comparisons.The following built-in functions are also vectorized, whereby the functions act elementwise:abs abs2 angle cbrt\nnairy airyai airyaiprime airybi airybiprime airyprime\nnacos acosh asin asinh atan atan2 atanh\nnacsc acsch asec asech acot acoth\nncos  cospi cosh  sin  sinpi sinh  tan  tanh  sinc  cosc\nncsc  csch  sec  sech  cot  coth\nnacosd asind atand asecd acscd acotd\nncosd  sind  tand  secd  cscd  cotd\nnbesselh besseli besselj besselj0 besselj1 besselk bessely bessely0 bessely1\nnexp  erf  erfc  erfinv erfcinv exp2  expm1\nnbeta dawson digamma erfcx erfi\nnexponent eta zeta gamma\nnhankelh1 hankelh2\nn ceil  floor  round  trunc\nnisfinite isinf isnan\nnlbeta lfact lgamma\nnlog log10 log1p log2\nncopysign max min significand\nnsqrt hypotNote that there is a difference between min() and max(), which operate elementwise over multiple array arguments, and minimum() and maximum(), which find the smallest and largest values within an array.Julia provides the @vectorize_1arg() and @vectorize_2arg() macros to automatically vectorize any function of one or two arguments respectively.  Each of these takes two arguments, namely the Type of argument (which is usually chosen to be the most general possible) and the name of the function to vectorize. Here is a simple example:julia> square(x) = x^2\nnsquare (generic function with 1 method)\nn\nnjulia> @vectorize_1arg Number square\nnsquare (generic function with 2 methods)\nn\nnjulia> methods(square)\nn# 2 methods for generic function \"square\":\nnsquare{T<:Number}(x::AbstractArray{T,N<:Any}) at operators.jl:540\nnsquare(x) at none:1\nn\nnjulia> square([1 2 4; 5 6 7])\nn2×3 Array{Int64,2}:\nn  1   4  16\nn 25  36  49"
},

{
    "location": "manual/arrays.html#Broadcasting-1",
    "title": "Broadcasting",
    "category": "Section",
    "text": "It is sometimes useful to perform element-by-element binary operations on arrays of different sizes, such as adding a vector to each column of a matrix.  An inefficient way to do this would be to replicate the vector to the size of the matrix:julia> a = rand(2,1); A = rand(2,3);\nn\nnjulia> repmat(a,1,3)+A\nn2×3 Array{Float64,2}:\nn 1.20813  1.82068  1.25387\nn 1.56851  1.86401  1.67846This is wasteful when dimensions get large, so Julia offers broadcast(), which expands singleton dimensions in array arguments to match the corresponding dimension in the other array without using extra memory, and applies the given function elementwise:julia> broadcast(+, a, A)\nn2×3 Array{Float64,2}:\nn 1.20813  1.82068  1.25387\nn 1.56851  1.86401  1.67846\nn\nnjulia> b = rand(1,2)\nn1×2 Array{Float64,2}:\nn 0.867535  0.00457906\nn\nnjulia> broadcast(+, a, b)\nn2×2 Array{Float64,2}:\nn 1.71056  0.847604\nn 1.73659  0.873631Elementwise operators such as .+ and .* perform broadcasting if necessary. There is also a broadcast!() function to specify an explicit destination, and broadcast_getindex() and broadcast_setindex!() that broadcast the indices before indexing.   Moreover, f.(args...) is equivalent to broadcast(f, args...), providing a convenient syntax to broadcast any function (Dot Syntax for Vectorizing Functions:)."
},

{
    "location": "manual/arrays.html#Implementation-1",
    "title": "Implementation",
    "category": "Section",
    "text": "The base array type in Julia is the abstract type AbstractArray{T,N}. It is parametrized by the number of dimensions N and the element type T. AbstractVector and AbstractMatrix are aliases for the 1-d and 2-d cases. Operations on AbstractArray objects are defined using higher level operators and functions, in a way that is independent of the underlying storage. These operations generally work correctly as a fallback for any specific array implementation.The AbstractArray type includes anything vaguely array-like, and implementations of it might be quite different from conventional arrays. For example, elements might be computed on request rather than stored.  However, any concrete AbstractArray{T,N} type should generally implement at least size(A) (returning an Int tuple), getindex(A,i) and getindex(A,i1,...,iN); mutable arrays should also implement setindex!().  It is recommended that these operations have nearly constant time complexity, or technically Õ(1) complexity, as otherwise some array functions may be unexpectedly slow.   Concrete types should also typically provide a similar(A,T=eltype(A),dims=size(A)) method, which is used to allocate a similar array for copy() and other out-of-place operations. No matter how an AbstractArray{T,N} is represented internally, T is the type of object returned by integer indexing (A[1, ..., 1], when A is not empty) and N should be the length of the tuple returned by size().DenseArray is an abstract subtype of AbstractArray intended to include all arrays that are laid out at regular offsets in memory, and which can therefore be passed to external C and Fortran functions expecting this memory layout.  Subtypes should provide a method stride(A,k) that returns the \"stride\" of dimension k: increasing the index of dimension k by 1 should increase the index i of getindex(A,i) by stride(A,k).  If a pointer conversion method Base.unsafe_convert(Ptr{T}, A) is provided, the memory layout should correspond in the same way to these strides.The Array type is a specific instance of DenseArray where elements are stored in column-major order (see additional notes in Performance Tips). Vector and Matrix are aliases for the 1-d and 2-d cases. Specific operations such as scalar indexing, assignment, and a few other basic storage-specific operations are all that have to be implemented for Array, so that the rest of the array library can be implemented in a generic manner.SubArray is a specialization of AbstractArray that performs indexing by reference rather than by copying. A SubArray is created with the view() function, which is called the same way as getindex() (with an array and a series of index arguments). The result of view() looks the same as the result of getindex(), except the data is left in place. view() stores the input index vectors in a SubArray object, which can later be used to index the original array indirectly.StridedVector and StridedMatrix are convenient aliases defined to make it possible for Julia to call a wider range of BLAS and LAPACK functions by passing them either Array or SubArray objects, and thus saving inefficiencies from memory allocation and copying.The following example computes the QR decomposition of a small section of a larger array, without creating any temporaries, and by calling the appropriate LAPACK function with the right leading dimension size and stride parameters.julia> a = rand(10,10)\nn10×10 Array{Float64,2}:\nn 0.561255   0.226678   0.203391  0.308912   …  0.750307  0.235023   0.217964\nn 0.718915   0.537192   0.556946  0.996234      0.666232  0.509423   0.660788\nn 0.493501   0.0565622  0.118392  0.493498      0.262048  0.940693   0.252965\nn 0.0470779  0.736979   0.264822  0.228787      0.161441  0.897023   0.567641\nn 0.343935   0.32327    0.795673  0.452242      0.468819  0.628507   0.511528\nn 0.935597   0.991511   0.571297  0.74485    …  0.84589   0.178834   0.284413\nn 0.160706   0.672252   0.133158  0.65554       0.371826  0.770628   0.0531208\nn 0.306617   0.836126   0.301198  0.0224702     0.39344   0.0370205  0.536062\nn 0.890947   0.168877   0.32002   0.486136      0.096078  0.172048   0.77672\nn 0.507762   0.573567   0.220124  0.165816      0.211049  0.433277   0.539476\nn\nnjulia> b = view(a, 2:2:8,2:2:4)\nn4×2 SubArray{Float64,2,Array{Float64,2},Tuple{StepRange{Int64,Int64},StepRange{Int64,Int64}},false}:\nn 0.537192  0.996234\nn 0.736979  0.228787\nn 0.991511  0.74485\nn 0.836126  0.0224702\nn\nnjulia> (q,r) = qr(b);\nn\nnjulia> q\nn4×2 Array{Float64,2}:\nn -0.338809   0.78934\nn -0.464815  -0.230274\nn -0.625349   0.194538\nn -0.527347  -0.534856\nn\nnjulia> r\nn2×2 Array{Float64,2}:\nn -1.58553  -0.921517\nn  0.0       0.866567"
},

{
    "location": "manual/arrays.html#Sparse-Matrices-1",
    "title": "Sparse Matrices",
    "category": "Section",
    "text": "Sparse matrices are matrices that contain enough zeros that storing them in a special data structure leads to savings in space and execution time. Sparse matrices may be used when operations on the sparse representation of a matrix lead to considerable gains in either time or space when compared to performing the same operations on a dense matrix."
},

{
    "location": "manual/arrays.html#Compressed-Sparse-Column-(CSC)-Storage-1",
    "title": "Compressed Sparse Column (CSC) Storage",
    "category": "Section",
    "text": "In Julia, sparse matrices are stored in the Compressed Sparse Column (CSC) format. Julia sparse matrices have the type SparseMatrixCSC{Tv,Ti}, where Tv is the type of the nonzero values, and Ti is the integer type for storing column pointers and row indices.:type SparseMatrixCSC{Tv,Ti<:Integer} <: AbstractSparseMatrix{Tv,Ti}\nn    m::Int                  # Number of rows\nn    n::Int                  # Number of columns\nn    colptr::Vector{Ti}      # Column i is in colptr[i]:(colptr[i+1]-1)\nn    rowval::Vector{Ti}      # Row values of nonzeros\nn    nzval::Vector{Tv}       # Nonzero values\nnendThe compressed sparse column storage makes it easy and quick to access the elements in the column of a sparse matrix, whereas accessing the sparse matrix by rows is considerably slower. Operations such as insertion of nonzero values one at a time in the CSC structure tend to be slow. This is because all elements of the sparse matrix that are beyond the point of insertion have to be moved one place over.All operations on sparse matrices are carefully implemented to exploit the CSC data structure for performance, and to avoid expensive operations.If you have data in CSC format from a different application or library, and wish to import it in Julia, make sure that you use 1-based indexing. The row indices in every column need to be sorted. If your SparseMatrixCSC object contains unsorted row indices, one quick way to sort them is by doing a double transpose.In some applications, it is convenient to store explicit zero values in a SparseMatrixCSC. These are accepted by functions in Base (but there is no guarantee that they will be preserved in mutating operations).  Such explicitly stored zeros are treated as structural nonzeros by many routines.  The nnz() function returns the number of elements explicitly stored in the sparse data structure, including structural nonzeros. In order to count the exact number of actual values that are nonzero, use countnz(), which inspects every stored element of a sparse matrix."
},

{
    "location": "manual/arrays.html#Sparse-matrix-constructors-1",
    "title": "Sparse matrix constructors",
    "category": "Section",
    "text": "The simplest way to create sparse matrices is to use functions equivalent to the zeros() and eye() functions that Julia provides for working with dense matrices. To produce sparse matrices instead, you can use the same names with an sp prefix:julia> spzeros(3,5)\nn3×5 sparse matrix with 0 Float64 nonzero entries\nn\nnjulia> speye(3,5)\nn3×5 sparse matrix with 3 Float64 nonzero entries:\nn        [1, 1]  =  1.0\nn        [2, 2]  =  1.0\nn        [3, 3]  =  1.0The sparse() function is often a handy way to construct sparse matrices. It takes as its input a vector I of row indices, a vector J of column indices, and a vector V of nonzero values. sparse(I,J,V) constructs a sparse matrix such that S[I[k], J[k]] = V[k].julia> I = [1, 4, 3, 5]; J = [4, 7, 18, 9]; V = [1, 2, -5, 3];\nn\nnjulia> S = sparse(I,J,V)\nn5×18 sparse matrix with 4 Int64 nonzero entries:\nn        [1 ,  4]  =  1\nn        [4 ,  7]  =  2\nn        [5 ,  9]  =  3\nn        [3 , 18]  =  -5The inverse of the sparse() function is findn(), which retrieves the inputs used to create the sparse matrix.julia> findn(S)\nn([1,4,5,3],[4,7,9,18])\nn\nnjulia> findnz(S)\nn([1,4,5,3],[4,7,9,18],[1,2,3,-5])Another way to create sparse matrices is to convert a dense matrix into a sparse matrix using the sparse() function:julia> sparse(eye(5))\nn5×5 sparse matrix with 5 Float64 nonzero entries:\nn        [1, 1]  =  1.0\nn        [2, 2]  =  1.0\nn        [3, 3]  =  1.0\nn        [4, 4]  =  1.0\nn        [5, 5]  =  1.0You can go in the other direction using the full() function. The issparse() function can be used to query if a matrix is sparse.julia> issparse(speye(5))\nntrue"
},

{
    "location": "manual/arrays.html#Sparse-matrix-operations-1",
    "title": "Sparse matrix operations",
    "category": "Section",
    "text": "Arithmetic operations on sparse matrices also work as they do on dense matrices. Indexing of, assignment into, and concatenation of sparse matrices work in the same way as dense matrices. Indexing operations, especially assignment, are expensive, when carried out one element at a time. In many cases it may be better to convert the sparse matrix into (I,J,V) format using findnz(), manipulate the non-zeroes or the structure in the dense vectors (I,J,V), and then reconstruct the sparse matrix."
},

{
    "location": "manual/calling-c-and-fortran-code.html",
    "title": "Calling C and Fortran Code",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/calling-c-and-fortran-code.html#Calling-C-and-Fortran-Code-1",
    "title": "Calling C and Fortran Code",
    "category": "Section",
    "text": "Though most code can be written in Julia, there are many high-quality, mature libraries for numerical computing already written in C and Fortran. To allow easy use of this existing code, Julia makes it simple and efficient to call C and Fortran functions. Julia has a \"no boilerplate\" philosophy: functions can be called directly from Julia without any \"glue\" code, code generation, or compilation – even from the interactive prompt. This is accomplished just by making an appropriate call with ccall() syntax, which looks like an ordinary function call.The code to be called must be available as a shared library. Most C and Fortran libraries ship compiled as shared libraries already, but if you are compiling the code yourself using GCC (or Clang), you will need to use the -shared and -fPIC options. The machine instructions generated by Julia's JIT are the same as a native C call would be, so the resulting overhead is the same as calling a library function from C code. (Non-library function calls in both C and Julia can be inlined and thus may have even less overhead than calls to shared library functions. When both libraries and executables are generated by LLVM, it is possible to perform whole-program optimizations that can even optimize across this boundary, but Julia does not yet support that. In the future, however, it may do so, yielding even greater performance gains.)Shared libraries and functions are referenced by a tuple of the form (:function, \"library\") or (\"function\", \"library\") where function is the C-exported function name. library refers to the shared library name: shared libraries available in the (platform-specific) load path will be resolved by name, and if necessary a direct path may be specified.A function name may be used alone in place of the tuple (just :function or \"function\"). In this case the name is resolved within the current process. This form can be used to call C library functions, functions in the Julia runtime, or functions in an application linked to Julia.By default, Fortran compilers generate mangled names (for example, converting function names to lowercase or uppercase, often appending an underscore), and so to call a Fortran function via ccall() you must pass the mangled identifier corresponding to the rule followed by your Fortran compiler.  Also, when calling a Fortran function, all inputs must be passed by reference.Finally, you can use ccall() to actually generate a call to the library function. Arguments to ccall() are as follows:(:function, \"library\") pair (must be a constant, but see below).\nnReturn type (see below for mapping the declared C type to Julia)\nnThis argument will be evaluated at compile-time.\nnA tuple of input types. The input types must be written as a literal tuple, not a tuple-valued variable or expression.\nnThis argument will be evaluated at compile-time.\nnThe following arguments, if any, are the actual argument values passed to the function.As a complete but simple example, the following calls the clock function from the standard C library:julia> t = ccall( (:clock, \"libc\"), Int32, ())\nn2292761\nn\nnjulia> t\nn2292761\nn\nnjulia> typeof(ans)\nnInt32clock takes no arguments and returns an Int32. One common gotcha is that a 1-tuple must be written with a trailing comma. For example, to call the getenv function to get a pointer to the value of an environment variable, one makes a call like this:julia> path = ccall((:getenv, \"libc\"), Cstring, (Cstring,), \"SHELL\")\nnCstring(@0x00007fff5fbffc45)\nn\nnjulia> unsafe_string(path)\nn\"/bin/bash\"Note that the argument type tuple must be written as (Cstring,), rather than (Cstring). This is because (Cstring) is just the expression Cstring surrounded by parentheses, rather than a 1-tuple containing Cstring:julia> (Cstring)\nnCstring\nn\nnjulia> (Cstring,)\nn(Cstring,)In practice, especially when providing reusable functionality, one generally wraps ccall() uses in Julia functions that set up arguments and then check for errors in whatever manner the C or Fortran function indicates them, propagating to the Julia caller as exceptions. This is especially important since C and Fortran APIs are notoriously inconsistent about how they indicate error conditions. For example, the getenv C library function is wrapped in the following Julia function, which is a simplified version of the actual definition from env.jl:function getenv(var::AbstractString)\nn  val = ccall((:getenv, \"libc\"),\nn              Cstring, (Cstring,), var)\nn  if val == C_NULL\nn    error(\"getenv: undefined variable: \", var)\nn  end\nn  unsafe_string(val)\nnendThe C getenv function indicates an error by returning NULL, but other standard C functions indicate errors in various different ways, including by returning -1, 0, 1 and other special values. This wrapper throws an exception clearly indicating the problem if the caller tries to get a non-existent environment variable:julia> getenv(\"SHELL\")\nn\"/bin/bash\"\nn\nnjulia> getenv(\"FOOBAR\")\nngetenv: undefined variable: FOOBARHere is a slightly more complex example that discovers the local machine's hostname:function gethostname()\nn  hostname = Array{UInt8}(128)\nn  ccall((:gethostname, \"libc\"), Int32,\nn        (Ptr{UInt8}, Csize_t),\nn        hostname, sizeof(hostname))\nn  hostname[end] = 0; # ensure null-termination\nn  return unsafe_string(pointer(hostname))\nnendThis example first allocates an array of bytes, then calls the C library function gethostname to fill the array in with the hostname, takes a pointer to the hostname buffer, and converts the pointer to a Julia string, assuming that it is a NUL-terminated C string. It is common for C libraries to use this pattern of requiring the caller to allocate memory to be passed to the callee and filled in. Allocation of memory from Julia like this is generally accomplished by creating an uninitialized array and passing a pointer to its data to the C function. This is why we don't use the Cstring type here: as the array is uninitialized, it could contain NUL bytes. Converting to a Cstring as part of the ccall() checks for contained NUL bytes and could therefore throw a conversion error."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Creating-C-Compatible-Julia-Function-Pointers-1",
    "title": "Creating C-Compatible Julia Function Pointers",
    "category": "Section",
    "text": "It is possible to pass Julia functions to native C functions that accept function pointer arguments. For example, to match C prototypes of the form:typedef returntype (*functiontype)(argumenttype,...)The function cfunction() generates the C-compatible function pointer for a call to a Julia library function. Arguments to cfunction() are as follows:A Julia Function\nnReturn type\nnA tuple of input typesA classic example is the standard C library qsort function, declared as:void qsort(void *base, size_t nmemb, size_t size,\nn           int(*compare)(const void *a, const void *b));The base argument is a pointer to an array of length nmemb, with elements of size bytes each. compare is a callback function which takes pointers to two elements a and b and returns an integer less/greater than zero if a should appear before/after b (or zero if any order is permitted). Now, suppose that we have a 1d array A of values in Julia that we want to sort using the qsort function (rather than Julia's built-in sort function). Before we worry about calling qsort and passing arguments, we need to write a comparison function that works for some arbitrary type T:function mycompare{T}(a::T, b::T)\nn    return convert(Cint, a < b ? -1 : a > b ? +1 : 0)::Cint\nnendNotice that we have to be careful about the return type: qsort expects a function returning a C int, so we must be sure to return Cint via a call to convert and a typeassert.In order to pass this function to C, we obtain its address using the function cfunction:const mycompare_c = cfunction(mycompare, Cint, (Ref{Cdouble}, Ref{Cdouble}))cfunction() accepts three arguments: the Julia function (mycompare), the return type (Cint), and a tuple of the argument types, in this case to sort an array of Cdouble (Float64) elements.The final call to qsort looks like this:A = [1.3, -2.7, 4.4, 3.1]\nnccall(:qsort, Void, (Ptr{Cdouble}, Csize_t, Csize_t, Ptr{Void}),\nn      A, length(A), sizeof(eltype(A)), mycompare_c)After this executes, A is changed to the sorted array [-2.7, 1.3, 3.1, 4.4]. Note that Julia knows how to convert an array into a Ptr{Cdouble}, how to compute the size of a type in bytes (identical to C's sizeof operator), and so on. For fun, try inserting a println(\"mycompare($a,$b)\") line into mycompare, which will allow you to see the comparisons that qsort is performing (and to verify that it is really calling the Julia function that you passed to it)."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Mapping-C-Types-to-Julia-1",
    "title": "Mapping C Types to Julia",
    "category": "Section",
    "text": "It is critical to exactly match the declared C type with its declaration in Julia. Inconsistencies can cause code that works correctly on one system to fail or produce indeterminate results on a different system.Note that no C header files are used anywhere in the process of calling C functions: you are responsible for making sure that your Julia types and call signatures accurately reflect those in the C header file. (The Clang package can be used to auto-generate Julia code from a C header file.)"
},

{
    "location": "manual/calling-c-and-fortran-code.html#Auto-conversion:-1",
    "title": "Auto-conversion:",
    "category": "Section",
    "text": "Julia automatically inserts calls to the cconvert() function to convert each argument to the specified type. For example, the following call:ccall((:foo, \"libfoo\"), Void, (Int32, Float64), x, y)will behave as if the following were written:ccall((:foo, \"libfoo\"), Void, (Int32, Float64),\nn      Base.unsafe_convert(Int32, Base.cconvert(Int32, x)),\nn      Base.unsafe_convert(Float64, Base.cconvert(Float64, y)))cconvert() normally just calls convert(), but can be defined to return an arbitrary new object more appropriate for passing to C. For example, this is used to convert an Array of objects (e.g. strings) to an array of pointers.unsafe_convert() handles conversion to Ptr types. It is considered unsafe because converting an object to a native pointer can hide the object from the garbage collector, causing it to be freed prematurely."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Type-Correspondences:-1",
    "title": "Type Correspondences:",
    "category": "Section",
    "text": "First, a review of some relevant Julia type terminology:Syntax / Keyword Example Description\nntype String \"Leaf Type\" :: A group of related data that includes a type-tag, is managed by the Julia GC, and is defined by object-identity. The type parameters of a leaf type must be fully defined (no TypeVars are allowed) in order for the instance to be constructed.\nnabstract Any, AbstractArray{T,N}, Complex{T} \"Super Type\" :: A super-type (not a leaf-type) that cannot be instantiated, but can be used to describe a group of types.\nn{T} Vector{Int} \"Type Parameter\" :: A specialization of a type (typically used for dispatch or storage optimization).\"TypeVar\" :: The T in the type parameter declaration is referred to as a TypeVar (short for type variable).\nnbitstype Int, Float64 \"Bits Type\" :: A type with no fields, but a size. It is stored and defined by-value.\nnimmutable Pair{Int,Int}Complex128 (isbits) \"Immutable\" :: A type with all fields defined to be constant. It is defined by-value. And may be stored with a type-tag.\"Is-Bits\" :: A bitstype, or an immutable type where all fields are other isbits types. It is defined by-value, and is stored without a type-tag.\nntype ...; end nothing \"Singleton\" :: a Leaf Type or Immutable with no fields.\nn(...) or tuple(...)` (1,2,3) \"Tuple\" :: an immutable data-structure similar to an anonymous immutable type, or a constant array. Represented as either an array or a struct.\nntypealias Not applicable here Type aliases, and other similar mechanisms of doing type indirection, are resolved to their base type (this includes assigning a type to another name, or getting the type out of a function call)."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Bits-Types:-1",
    "title": "Bits Types:",
    "category": "Section",
    "text": "There are several special types to be aware of, as no other type can be defined to behave the same:Float32\nnExactly corresponds to the float type in C (or REAL*4 in Fortran).\nnFloat64\nnExactly corresponds to the double type in C (or REAL*8 in Fortran).\nnComplex64\nnExactly corresponds to the complex float type in C (or COMPLEX*8 in Fortran).\nnComplex128\nnExactly corresponds to the complex double type in C (or COMPLEX*16 in Fortran).\nnSigned\nnExactly corresponds to the signed type annotation in C (or any INTEGER type in Fortran). Any Julia type that is not a subtype of Signed is assumed to be unsigned.\nnRef{T}\nnBehaves like a Ptr{T} that owns its memory.\nnArray{T,N}\nnWhen an array is passed to C as a Ptr{T} argument, it is not reinterpret-cast: Julia requires that the element type of the array matches T, and the address of the first element is passed.\nnTherefore, if an Array contains data in the wrong format, it will have to be explicitly converted using a call such as trunc(Int32,a).\nnTo pass an array A as a pointer of a different type without converting the data beforehand (for example, to pass a Float64 array to a function that operates on uninterpreted bytes), you can declare the argument as Ptr{Void}.\nnIf an array of eltype Ptr{T} is passed as a Ptr{Ptr{T}} argument, Base.cconvert() will attempt to first make a null-terminated copy of the array with each element replaced by its cconvert() version. This allows, for example, passing an argv pointer array of type Vector{String} to an argument of type Ptr{Ptr{Cchar}}.On all systems we currently support, basic C/C++ value types may be translated to Julia types as follows. Every C type also has a corresponding Julia type with the same name, prefixed by C. This can help for writing portable code (and remembering that an int in C is not the same as an Int in Julia).System Independent:C name Fortran name Standard Julia Alias Julia Base Type\nnunsigned charbool (C++) CHARACTER Cuchar UInt8\nnshort INTEGER*2LOGICAL*2 Cshort Int16\nnunsigned short   Cushort UInt16\nnintBOOL (C, typical) INTEGER*4LOGICAL*4 Cint Int32\nnunsigned int   Cuint UInt32\nnlong long INTEGER*8LOGICAL*8 Clonglong Int64\nnunsigned long long   Culonglong UInt64\nnintmax_t   Cintmax_t Int64\nnuintmax_t   Cuintmax_t UInt64\nnfloat REAL*4i Cfloat Float32\nndouble REAL*8 Cdouble Float64\nncomplex float COMPLEX*8 Complex64 Complex{Float32}\nncomplex double COMPLEX*16 Complex128 Complex{Float64}\nnptrdiff_t   Cptrdiff_t Int\nnssize_t   Cssize_t Int\nnsize_t   Csize_t UInt\nnvoid     Void\nnvoid and [[noreturn]] or _Noreturn     Union{}\nnvoid*     Ptr{Void}\nnT* (where T represents an appropriately defined type)     Ref{T}\nnchar* (or char[], e.g. a string) CHARACTER*N   Cstring if NUL-terminated, or Ptr{UInt8} if not\nnchar** (or *char[])     Ptr{Ptr{UInt8}}\nnjl_value_t* (any Julia Type)     Any\nnjl_value_t** (a reference to a Julia Type)     Ref{Any}\nnva_arg     Not supported\nn... (variadic function specification)     T... (where T is one of the above types, variadic functions of different argument types are not supported)The Cstring type is essentially a synonym for Ptr{UInt8}, except the conversion to Cstring throws an error if the Julia string contains any embedded NUL characters (which would cause the string to be silently truncated if the C routine treats NUL as the terminator).  If you are passing a char* to a C routine that does not assume NUL termination (e.g. because you pass an explicit string length), or if you know for certain that your Julia string does not contain NUL and want to skip the check, you can use Ptr{UInt8} as the argument type. Cstring can also be used as the ccall() return type, but in that case it obviously does not introduce any extra checks and is only meant to improve readability of the call.System-dependent:C name Standard Julia Alias Julia Base Type\nnchar Cchar Int8 (x86, x86_64)UInt8 (powerpc, arm)\nnlong Clong Int (UNIX)Int32 (Windows)\nnunsigned long Culong UInt (UNIX)UInt32 (Windows)\nnwchar_t Cwchar_t Int32 (UNIX)UInt16 (Windows)note: \nnWhen calling a Fortran function, all inputs must be passed by reference, so all type correspondences above should contain an additional Ptr{..} or Ref{..} wrapper around their type specification.warning: \nnFor string arguments (char*) the Julia type should be Cstring (if NUL- terminated data is expected) or either Ptr{Cchar} or Ptr{UInt8} otherwise (these two pointer types have the same effect), as described above, not String. Similarly, for array arguments (T[] or T*), the Julia type should again be Ptr{T}, not Vector{T}.warning: \nnJulia's Char type is 32 bits, which is not the same as the wide character type (wchar_t or wint_t) on all platforms.warning: \nnA return type of Union{} means the function will not return i.e. C++11 [[noreturn]] or C11 _Noreturn (e.g. jl_throw or longjmp). Do not use this for functions that return no value (void) but do return.note: \nnFor wchar_t* arguments, the Julia type should be Cwstring (if the C routine expects a NUL-terminated string) or Ptr{Cwchar_t} otherwise. Note also that UTF-8 string data in Julia is internally NUL-terminated, so it can be passed to C functions expecting NUL-terminated data without making a copy (but using the Cwstring type will cause an error to be thrown if the string itself contains NUL characters).note: \nnC functions that take an argument of the type char** can be called by using a Ptr{Ptr{UInt8}} type within Julia. For example, C functions of the form:int main(int argc, char **argv);can be called via the following Julia code:argv = [ \"a.out\", \"arg1\", \"arg2\" ]\nnccall(:main, Int32, (Int32, Ptr{Ptr{UInt8}}), length(argv), argv)note: \nnA C function declared to return Void will return the value nothing in Julia."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Struct-Type-correspondences-1",
    "title": "Struct Type correspondences",
    "category": "Section",
    "text": "Composite types, aka struct in C or TYPE in Fortran90 (or STRUCTURE / RECORD in some variants of F77), can be mirrored in Julia by creating a type or immutable definition with the same field layout.When used recursively, isbits types are stored inline. All other types are stored as a pointer to the data. When mirroring a struct used by-value inside another struct in C, it is imperative that you do not attempt to manually copy the fields over, as this will not preserve the correct field alignment. Instead, declare an immutable isbits type and use that instead. Unnamed structs are not possible in the translation to Julia.Packed structs and union declarations are not supported by Julia.You can get a near approximation of a union if you know, a priori, the field that will have the greatest size (potentially including padding). When translating your fields to Julia, declare the Julia field to be only of that type.Arrays of parameters must be expanded manually, currently (either inline, or in an immutable helper type). For example:in C:\nnstruct B {\nn    int A[3];\nn};\nnb_a_2 = B.A[2];\nn\nnin Julia:\nnimmutable B_A\nn    A_1::Cint\nn    A_2::Cint\nn    A_3::Cint\nnend\nntype B\nn    A::B_A\nnend\nnb_a_2 = B.A.(2)Arrays of unknown size are not supported.In the future, some of these restrictions may be reduced or eliminated."
},

{
    "location": "manual/calling-c-and-fortran-code.html#SIMD-Values-1",
    "title": "SIMD Values",
    "category": "Section",
    "text": "Note: This feature is currently implemented on 64-bit x86 and AArch64 platforms only.If a C/C++ routine has an argument or return value that is a native SIMD type, the corresponding Julia type is a homogeneous tuple of VecElement that naturally maps to the SIMD type.  Specifically:The tuple must be the same size as the SIMD type. For example, a tuple representing an __m128 on x86 must have a size of 16 bytes.\nnThe element type of the tuple must be an instance of VecElement{T} where T is a bitstype that is 1, 2, 4 or 8 bytes.For instance, consider this C routine that uses AVX intrinsics:#include <immintrin.h>\nn\nn__m256 dist( __m256 a, __m256 b ) {\nn    return _mm256_sqrt_ps(_mm256_add_ps(_mm256_mul_ps(a, a),\nn                                        _mm256_mul_ps(b, b)));\nn}The following Julia code calls dist using ccall:typealias m256 NTuple{8,VecElement{Float32}}\nn\nna = m256(ntuple(i->VecElement(sin(Float32(i))),8))\nnb = m256(ntuple(i->VecElement(cos(Float32(i))),8))\nn\nnfunction call_dist(a::m256, b::m256)\nn    ccall((:dist, \"libdist\"), m256, (m256, m256), a, b)\nnend\nn\nnprintln(call_dist(a,b))The host machine must have the requisite SIMD registers.  For example, the code above will not work on hosts without AVX support."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Memory-Ownership-1",
    "title": "Memory Ownership",
    "category": "Section",
    "text": "malloc/freeMemory allocation and deallocation of such objects must be handled by calls to the appropriate cleanup routines in the libraries being used, just like in any C program. Do not try to free an object received from a C library with Libc.free in Julia, as this may result in the free function being called via the wrong libc library and cause Julia to crash. The reverse (passing an object allocated in Julia to be freed by an external library) is equally invalid."
},

{
    "location": "manual/calling-c-and-fortran-code.html#When-to-use-T,-Ptr{T}-and-Ref{T}-1",
    "title": "When to use T, Ptr{T} and Ref{T}",
    "category": "Section",
    "text": "In Julia code wrapping calls to external C routines, ordinary (non-pointer) data should be declared to be of type T inside the ccall(), as they are passed by value.  For C code accepting pointers, Ref{T} should generally be used for the types of input arguments, allowing the use of pointers to memory managed by either Julia or C through the implicit call to cconvert().  In contrast, pointers returned by the C function called should be declared to be of output type Ptr{T}, reflecting that the memory pointed to is managed by C only. Pointers contained in C structs should be represented as fields of type Ptr{T} within the corresponding Julia immutable types designed to mimic the internal structure of corresponding C structs.In Julia code wrapping calls to external Fortran routines, all input arguments should be declared as of type Ref{T}, as Fortran passes all variables by reference. The return type should either be Void for Fortran subroutines, or a T for Fortran functions returning the type T."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Mapping-C-Functions-to-Julia-1",
    "title": "Mapping C Functions to Julia",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/calling-c-and-fortran-code.html#ccall/cfunction-argument-translation-guide-1",
    "title": "ccall/cfunction argument translation guide",
    "category": "Section",
    "text": "For translating a C argument list to Julia:T, where T is one of the primitive types: char, int, long, short, float, double, complex, enum or any of their typedef equivalents\nnT, where T is an equivalent Julia Bits Type (per the table above)\nnif T is an enum, the argument type should be equivalent to Cint or Cuint\nnargument value will be copied (passed by value)\nnstruct T (including typedef to a struct)\nnT, where T is a Julia leaf type\nnargument value will be copied (passed by value)\nnvoid*\nndepends on how this parameter is used, first translate this to the intended pointer type, then determine the Julia equivalent using the remaining rules in this list\nnthis argument may be declared as Ptr{Void}, if it really is just an unknown pointer\nnjl_value_t*\nnAny\nnargument value must be a valid Julia object\nncurrently unsupported by cfunction()\nnjl_value_t**\nnRef{Any}\nnargument value must be a valid Julia object (or C_NULL)\nncurrently unsupported by cfunction()\nnT*\nnRef{T}, where T is the Julia type corresponding to T\nnargument value will be copied if it is an isbits type otherwise, the value must be a valid Julia object\nn(T*)(...) (e.g. a pointer to a function)\nnPtr{Void} (you may need to use cfunction() explicitly to create this pointer)\nn... (e.g. a vararg)\nnT..., where T is the Julia type\nnva_arg\nnnot supported"
},

{
    "location": "manual/calling-c-and-fortran-code.html#ccall/cfunction-return-type-translation-guide-1",
    "title": "ccall/cfunction return type translation guide",
    "category": "Section",
    "text": "For translating a C return type to Julia:void\nnVoid (this will return the singleton instance nothing::Void)\nnT, where T is one of the primitive types: char, int, long, short, float, double, complex, enum or any of their typedef equivalents\nnT, where T is an equivalent Julia Bits Type (per the table above)\nnif T is an enum, the argument type should be equivalent to Cint or Cuint\nnargument value will be copied (returned by-value)\nnstruct T (including typedef to a struct)\nnT, where T is a Julia Leaf Type\nnargument value will be copied (returned by-value)\nnvoid*\nndepends on how this parameter is used, first translate this to the intended pointer type, then determine the Julia equivalent using the remaining rules in this list\nnthis argument may be declared as Ptr{Void}, if it really is just an unknown pointer\nnjl_value_t*\nnAny\nnargument value must be a valid Julia object\nnjl_value_t**\nnRef{Any}\nnargument value must be a valid Julia object (or C_NULL)\nnT*\nnIf the memory is already owned by Julia, or is an isbits type, and is known to be non-null:\nnRef{T}, where T is the Julia type corresponding to T\nna return type of Ref{Any} is invalid, it should either be Any (corresponding to jl_value_t*) or Ptr{Any} (corresponding to Ptr{Any})\nnC MUST NOT modify the memory returned via Ref{T} if T is an isbits type\nnIf the memory is owned by C:\nnPtr{T}, where T is the Julia type corresponding to T\nn(T*)(...) (e.g. a pointer to a function)\nnPtr{Void} (you may need to use cfunction() explicitly to create this pointer)"
},

{
    "location": "manual/calling-c-and-fortran-code.html#Passing-Pointers-for-Modifying-Inputs-1",
    "title": "Passing Pointers for Modifying Inputs",
    "category": "Section",
    "text": "Because C doesn't support multiple return values, often C functions will take pointers to data that the function will modify. To accomplish this within a ccall(), you need to first encapsulate the value inside an Ref{T} of the appropriate type. When you pass this Ref object as an argument, Julia will automatically pass a C pointer to the encapsulated data:width = Ref{Cint}(0)\nnrange = Ref{Cfloat}(0)\nnccall(:foo, Void, (Ref{Cint}, Ref{Cfloat}), width, range)Upon return, the contents of width and range can be retrieved (if they were changed by foo) by width[] and range[]; that is, they act like zero-dimensional arrays."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Special-Reference-Syntax-for-ccall-(deprecated):-1",
    "title": "Special Reference Syntax for ccall (deprecated):",
    "category": "Section",
    "text": "The & syntax is deprecated, use the Ref{T} argument type instead.A prefix & is used on an argument to ccall() to indicate that a pointer to a scalar argument should be passed instead of the scalar value itself (required for all Fortran function arguments, as noted above). The following example computes a dot product using a BLAS function.function compute_dot(DX::Vector{Float64}, DY::Vector{Float64})\nn  assert(length(DX) == length(DY))\nn  n = length(DX)\nn  incx = incy = 1\nn  product = ccall((:ddot_, \"libLAPACK\"),\nn                  Float64,\nn                  (Ptr{Int32}, Ptr{Float64}, Ptr{Int32}, Ptr{Float64}, Ptr{Int32}),\nn                  &n, DX, &incx, DY, &incy)\nn  return product\nnendThe meaning of prefix & is not quite the same as in C. In particular, any changes to the referenced variables will not be visible in Julia unless the type is mutable (declared via type). However, even for immutable types it will not cause any harm for called functions to attempt such modifications (that is, writing through the passed pointers). Moreover, & may be used with any expression, such as &0 or &f(x).When a scalar value is passed with & as an argument of type Ptr{T}, the value will first be converted to type T."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Some-Examples-of-C-Wrappers-1",
    "title": "Some Examples of C Wrappers",
    "category": "Section",
    "text": "Here is a simple example of a C wrapper that returns a Ptr type:type gsl_permutation\nnend\nn\nn# The corresponding C signature is\nn#     gsl_permutation * gsl_permutation_alloc (size_t n);\nnfunction permutation_alloc(n::Integer)\nn    output_ptr = ccall(\nn        (:gsl_permutation_alloc, :libgsl), #name of C function and library\nn        Ptr{gsl_permutation},              #output type\nn        (Csize_t,),                        #tuple of input types\nn        n                                  #name of Julia variable to pass in\nn    )\nn    if output_ptr==C_NULL # Could not allocate memory\nn        throw(OutOfMemoryError())\nn    end\nn    return output_ptr\nnendThe GNU Scientific Library (here assumed to be accessible through :libgsl) defines an opaque pointer, gsl_permutation *, as the return type of the C function gsl_permutation_alloc(). As user code never has to look inside the gsl_permutation struct, the corresponding Julia wrapper simply needs a new type declaration, gsl_permutation, that has no internal fields and whose sole purpose is to be placed in the type parameter of a Ptr type.  The return type of the ccall() is declared as Ptr{gsl_permutation}, since the memory allocated and pointed to by output_ptr is controlled by C (and not Julia).The input n is passed by value, and so the function's input signature is simply declared as (Csize_t,) without any Ref or Ptr necessary. (If the wrapper was calling a Fortran function instead, the corresponding function input signature should instead be (Ref{Csize_t},), since Fortran variables are passed by reference.) Furthermore, n can be any type that is convertable to a Csize_t integer; the ccall() implicitly calls Base.cconvert(Csize_t, n).Here is a second example wrapping the corresponding destructor:# The corresponding C signature is\nn#     void gsl_permutation_free (gsl_permutation * p);\nnfunction permutation_free(p::Ref{gsl_permutation})\nn    ccall(\nn        (:gsl_permutation_free, :libgsl), #name of C function and library\nn        Void,                             #output type\nn        (Ref{gsl_permutation},),          #tuple of input types\nn        p                                 #name of Julia variable to pass in\nn    )\nnendHere, the input p is declared to be of type Ref{gsl_permutation}, meaning that the memory that p points to may be managed by Julia or by C. A pointer to memory allocated by C should be of type Ptr{gsl_permutation}, but it is convertable using cconvert() and therefore can be used in the same (covariant) context of the input argument to a ccall(). A pointer to memory allocated by Julia must be of type Ref{gsl_permutation}, to ensure that the memory address pointed to is valid and that Julia's garbage collector manages the chunk of memory pointed to correctly. Therefore, the Ref{gsl_permutation} declaration allows pointers managed by C or Julia to be used.If the C wrapper never expects the user to pass pointers to memory managed by Julia, then using p::Ptr{gsl_permutation} for the method signature of the wrapper and similarly in the ccall() is also acceptable.Here is a third example passing Julia arrays:# The corresponding C signature is\nn#    int gsl_sf_bessel_Jn_array (int nmin, int nmax, double x,\nn#                                double result_array[])\nnfunction sf_bessel_Jn_array(nmin::Integer, nmax::Integer, x::Real)\nn    if nmax<nmin throw(DomainError()) end\nn    result_array = Array{Cdouble}(nmax-nmin+1)\nn    errorcode = ccall(\nn        (:gsl_sf_bessel_Jn_array, :libgsl), #name of C function and library\nn        Cint,                               #output type\nn        (Cint, Cint, Cdouble, Ref{Cdouble}),#tuple of input types\nn        nmin, nmax, x, result_array         #names of Julia variables to pass in\nn    )\nn    if errorcode!= 0 error(\"GSL error code $errorcode\") end\nn    return result_array\nnendThe C function wrapped returns an integer error code; the results of the actual evaluation of the Bessel J function populate the Julia array result_array. This variable can only be used with corresponding input type declaration Ref{Cdouble}, since its memory is allocated and managed by Julia, not C. The implicit call to Base.cconvert(Ref{Cdouble}, result_array) unpacks the Julia pointer to a Julia array data structure into a form understandable by C.Note that for this code to work correctly, result_array must be declared to be of type Ref{Cdouble} and not Ptr{Cdouble}. The memory is managed by Julia and the Ref signature alerts Julia's garbage collector to keep managing the memory for result_array while the ccall() executes. If Ptr{Cdouble} were used instead, the ccall() may still work, but Julia's garbage collector would not be aware that the memory declared for result_array is being used by the external C function. As a result, the code may produce a memory leak if result_array never gets freed by the garbage collector, or if the garbage collector prematurely frees result_array, the C function may end up throwing an invalid memory access exception."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Garbage-Collection-Safety-1",
    "title": "Garbage Collection Safety",
    "category": "Section",
    "text": "When passing data to a ccall(), it is best to avoid using the pointer() function. Instead define a convert method and pass the variables directly to the ccall(). ccall() automatically arranges that all of its arguments will be preserved from garbage collection until the call returns. If a C API will store a reference to memory allocated by Julia, after the ccall() returns, you must arrange that the object remains visible to the garbage collector. The suggested way to handle this is to make a global variable of type Array{Ref,1} to hold these values, until the C library notifies you that it is finished with them.Whenever you have created a pointer to Julia data, you must ensure the original data exists until you are done with using the pointer. Many methods in Julia such as unsafe_load() and String() make copies of data instead of taking ownership of the buffer, so that it is safe to free (or alter) the original data without affecting Julia. A notable exception is unsafe_wrap() which, for performance reasons, shares (or can be told to take ownership of) the underlying buffer.The garbage collector does not guarantee any order of finalization. That is, if a contained a reference to b and both a and b are due for garbage collection, there is no guarantee that b would be finalized after a. If proper finalization of a depends on b being valid, it must be handled in other ways."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Non-constant-Function-Specifications-1",
    "title": "Non-constant Function Specifications",
    "category": "Section",
    "text": "A (name, library) function specification must be a constant expression. However, it is possible to use computed values as function names by staging through eval as follows:@eval ccall(($(string(\"a\",\"b\")),\"lib\"), ...This expression constructs a name using string, then substitutes this name into a new ccall() expression, which is then evaluated. Keep in mind that eval only operates at the top level, so within this expression local variables will not be available (unless their values are substituted with $). For this reason, eval is typically only used to form top-level definitions, for example when wrapping libraries that contain many similar functions.If your usage is more dynamic, use indirect calls as described in the next section."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Indirect-Calls-1",
    "title": "Indirect Calls",
    "category": "Section",
    "text": "The first argument to ccall() can also be an expression evaluated at run time. In this case, the expression must evaluate to a Ptr, which will be used as the address of the native function to call. This behavior occurs when the first ccall() argument contains references to non-constants, such as local variables, function arguments, or non-constant globals.For example, you might lookup the function via dlsym, then cache it in a global variable for that session. For example:macro dlsym(func, lib)\nn    z, zlocal = gensym(string(func)), gensym()\nn    eval(current_module(),:(global $z = C_NULL))\nn    z = esc(z)\nn    quote\nn        let $zlocal::Ptr{Void} = $z::Ptr{Void}\nn            if $zlocal == C_NULL\nn               $zlocal = dlsym($(esc(lib))::Ptr{Void}, $(esc(func)))\nn               global $z = $zlocal\nn            end\nn            $zlocal\nn        end\nn    end\nnend\nn\nnmylibvar = dlopen(\"mylib\")\nnccall(@dlsym(\"myfunc\", mylibvar), Void, ())"
},

{
    "location": "manual/calling-c-and-fortran-code.html#Calling-Convention-1",
    "title": "Calling Convention",
    "category": "Section",
    "text": "The second argument to ccall() can optionally be a calling convention specifier (immediately preceding return type). Without any specifier, the platform-default C calling convention is used. Other supported conventions are: stdcall, cdecl, fastcall, and thiscall. For example (from base/libc.jl) we see the same gethostnameccall() as above, but with the correct signature for Windows:hn = Array{UInt8}(256)\nnerr = ccall(:gethostname, stdcall, Int32, (Ptr{UInt8}, UInt32), hn, length(hn))For more information, please see the LLVM Language Reference."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Accessing-Global-Variables-1",
    "title": "Accessing Global Variables",
    "category": "Section",
    "text": "Global variables exported by native libraries can be accessed by name using the cglobal() function. The arguments to cglobal() are a symbol specification identical to that used by ccall(), and a type describing the value stored in the variable:julia> cglobal((:errno,:libc), Int32)\nnPtr{Int32} @0x00007f418d0816b8The result is a pointer giving the address of the value. The value can be manipulated through this pointer using unsafe_load() and unsafe_store()."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Accessing-Data-through-a-Pointer-1",
    "title": "Accessing Data through a Pointer",
    "category": "Section",
    "text": "The following methods are described as \"unsafe\" because a bad pointer or type declaration can cause Julia to terminate abruptly.Given a Ptr{T}, the contents of type T can generally be copied from the referenced memory into a Julia object using unsafe_load(ptr, [index]). The index argument is optional (default is 1), and follows the Julia-convention of 1-based indexing. This function is intentionally similar to the behavior of getindex() and setindex!() (e.g. [] access syntax).The return value will be a new object initialized to contain a copy of the contents of the referenced memory. The referenced memory can safely be freed or released.If T is Any, then the memory is assumed to contain a reference to a Julia object (a jl_value_t*), the result will be a reference to this object, and the object will not be copied. You must be careful in this case to ensure that the object was always visible to the garbage collector (pointers do not count, but the new reference does) to ensure the memory is not prematurely freed. Note that if the object was not originally allocated by Julia, the new object will never be finalized by Julia's garbage collector.  If the Ptr itself is actually a jl_value_t*, it can be converted back to a Julia object reference by unsafe_pointer_to_objref(ptr). (Julia values v can be converted to jl_value_t* pointers, as Ptr{Void}, by calling pointer_from_objref(v).)The reverse operation (writing data to a Ptr{T}), can be performed using unsafe_store!(ptr, value, [index]).  Currently, this is only supported for bitstypes or other pointer-free (isbits) immutable types.Any operation that throws an error is probably currently unimplemented and should be posted as a bug so that it can be resolved.If the pointer of interest is a plain-data array (bitstype or immutable), the function unsafe_wrap(Array, ptr,dims,[own]) may be more useful. The final parameter should be true if Julia should \"take ownership\" of the underlying buffer and call free(ptr) when the returned Array object is finalized.  If the own parameter is omitted or false, the caller must ensure the buffer remains in existence until all access is complete.Arithmetic on the Ptr type in Julia (e.g. using +) does not behave the same as C's pointer arithmetic. Adding an integer to a Ptr in Julia always moves the pointer by some number of bytes, not elements. This way, the address values obtained from pointer arithmetic do not depend on the element types of pointers."
},

{
    "location": "manual/calling-c-and-fortran-code.html#Thread-safety-1",
    "title": "Thread-safety",
    "category": "Section",
    "text": "Some C libraries execute their callbacks from a different thread, and since Julia isn't thread-safe you'll need to take some extra precautions. In particular, you'll need to set up a two-layered system: the C callback should only schedule (via Julia's event loop) the execution of your \"real\" callback. To do this, create a AsyncCondition object and wait on it:cond = Base.AsyncCondition()\nnwait(cond)The callback you pass to C should only execute a ccall() to :uv_async_send, passing cb.handle as the argument, taking care to avoid any allocations or other interactions with the Julia runtime.Note that events may be coalesced, so multiple calls to uv_async_send may result in a single wakeup notification to the condition."
},

{
    "location": "manual/calling-c-and-fortran-code.html#More-About-Callbacks-1",
    "title": "More About Callbacks",
    "category": "Section",
    "text": "For more details on how to pass callbacks to C libraries, see this blog post."
},

{
    "location": "manual/complex-and-rational-numbers.html",
    "title": "Complex and Rational Numbers",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/complex-and-rational-numbers.html#Complex-and-Rational-Numbers-1",
    "title": "Complex and Rational Numbers",
    "category": "Section",
    "text": "Julia ships with predefined types representing both complex and rational numbers, and supports all standard mathematical operations on them. Conversion and Promotion are defined so that operations on any combination of predefined numeric types, whether primitive or composite, behave as expected."
},

{
    "location": "manual/complex-and-rational-numbers.html#Complex-Numbers-1",
    "title": "Complex Numbers",
    "category": "Section",
    "text": "The global constant im is bound to the complex number i, representing the principal square root of -1. It was deemed harmful to co-opt the name i for a global constant, since it is such a popular index variable name. Since Julia allows numeric literals to be juxtaposed with identifiers as coefficients, this binding suffices to provide convenient syntax for complex numbers, similar to the traditional mathematical notation:julia> 1 + 2im\nn1 + 2imYou can perform all the standard arithmetic operations with complex numbers:julia> (1 + 2im)*(2 - 3im)\nn8 + 1im\nn\nnjulia> (1 + 2im)/(1 - 2im)\nn-0.6 + 0.8im\nn\nnjulia> (1 + 2im) + (1 - 2im)\nn2 + 0im\nn\nnjulia> (-3 + 2im) - (5 - 1im)\nn-8 + 3im\nn\nnjulia> (-1 + 2im)^2\nn-3 - 4im\nn\nnjulia> (-1 + 2im)^2.5\nn2.7296244647840084 - 6.960664459571898im\nn\nnjulia> (-1 + 2im)^(1 + 1im)\nn-0.27910381075826657 + 0.08708053414102428im\nn\nnjulia> 3(2 - 5im)\nn6 - 15im\nn\nnjulia> 3(2 - 5im)^2\nn-63 - 60im\nn\nnjulia> 3(2 - 5im)^-1.0\nn0.20689655172413796 + 0.5172413793103449imThe promotion mechanism ensures that combinations of operands of different types just work:julia> 2(1 - 1im)\nn2 - 2im\nn\nnjulia> (2 + 3im) - 1\nn1 + 3im\nn\nnjulia> (1 + 2im) + 0.5\nn1.5 + 2.0im\nn\nnjulia> (2 + 3im) - 0.5im\nn2.0 + 2.5im\nn\nnjulia> 0.75(1 + 2im)\nn0.75 + 1.5im\nn\nnjulia> (2 + 3im) / 2\nn1.0 + 1.5im\nn\nnjulia> (1 - 3im) / (2 + 2im)\nn-0.5 - 1.0im\nn\nnjulia> 2im^2\nn-2 + 0im\nn\nnjulia> 1 + 3/4im\nn1.0 - 0.75imNote that 3/4im == 3/(4*im) == -(3/4*im), since a literal coefficient binds more tightly than division.Standard functions to manipulate complex values are provided:julia> real(1 + 2im)\nn1\nn\nnjulia> imag(1 + 2im)\nn2\nn\nnjulia> conj(1 + 2im)\nn1 - 2im\nn\nnjulia> abs(1 + 2im)\nn2.23606797749979\nn\nnjulia> abs2(1 + 2im)\nn5\nn\nnjulia> angle(1 + 2im)\nn1.1071487177940904As usual, the absolute value (abs()) of a complex number is its distance from zero. abs2() gives the square of the absolute value, and is of particular use for complex numbers where it avoids taking a square root. angle() returns the phase angle in radians (also known as the argument or arg function). The full gamut of other Elementary Functions is also defined for complex numbers:julia> sqrt(1im)\nn0.7071067811865476 + 0.7071067811865475im\nn\nnjulia> sqrt(1 + 2im)\nn1.272019649514069 + 0.7861513777574233im\nn\nnjulia> cos(1 + 2im)\nn2.0327230070196656 - 3.0518977991518im\nn\nnjulia> exp(1 + 2im)\nn-1.1312043837568135 + 2.4717266720048188im\nn\nnjulia> sinh(1 + 2im)\nn-0.4890562590412937 + 1.4031192506220405imNote that mathematical functions typically return real values when applied to real numbers and complex values when applied to complex numbers. For example, sqrt() behaves differently when applied to -1 versus -1 + 0im even though -1 == -1 + 0im:julia> sqrt(-1)\nnERROR: DomainError:\nnsqrt will only return a complex result if called with a complex argument. Try sqrt(complex(x)).\nn in sqrt(::Int64) at ./math.jl:149\nn ...\nn\nnjulia> sqrt(-1 + 0im)\nn0.0 + 1.0imThe literal numeric coefficient notation does not work when constructing complex number from variables. Instead, the multiplication must be explicitly written out:julia> a = 1; b = 2; a + b*im\nn1 + 2imHowever, this is not recommended; Use the complex() function instead to construct a complex value directly from its real and imaginary parts.:julia> complex(a,b)\nn1 + 2imThis construction avoids the multiplication and addition operations.Inf and NaN propagate through complex numbers in the real and imaginary parts of a complex number as described in the Special floating-point values section:julia> 1 + Inf*im\nn1.0 + Inf*im\nn\nnjulia> 1 + NaN*im\nn1.0 + NaN*im"
},

{
    "location": "manual/constructors.html",
    "title": "Constructors",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/constructors.html#Constructors-1",
    "title": "Constructors",
    "category": "Section",
    "text": "Constructors [1] are functions that create new objects – specifically, instances of Composite Types. In Julia, type objects also serve as constructor functions: they create new instances of themselves when applied to an argument tuple as a function. This much was already mentioned briefly when composite types were introduced. For example:type Foo\nn  bar\nn  baz\nnend\nn\nnjulia> foo = Foo(1,2)\nnFoo(1,2)\nn\nnjulia> foo.bar\nn1\nn\nnjulia> foo.baz\nn2For many types, forming new objects by binding their field values together is all that is ever needed to create instances. There are, however, cases where more functionality is required when creating composite objects. Sometimes invariants must be enforced, either by checking arguments or by transforming them. Recursive data structures, especially those that may be self-referential, often cannot be constructed cleanly without first being created in an incomplete state and then altered programmatically to be made whole, as a separate step from object creation. Sometimes, it's just convenient to be able to construct objects with fewer or different types of parameters than they have fields. Julia's system for object construction addresses all of these cases and more.footnote: [1]\nnNomenclature: while the term \"constructor\" generally refers to the entire function which constructs objects of a type, it is common to abuse terminology slightly and refer to specific constructor methods as \"constructors\". In such situations, it is generally clear from context that the term is used to mean \"constructor method\" rather than \"constructor function\", especially as it is often used in the sense of singling out a particular method of the constructor from all of the others."
},

{
    "location": "manual/constructors.html#Outer-Constructor-Methods-1",
    "title": "Outer Constructor Methods",
    "category": "Section",
    "text": "A constructor is just like any other function in Julia in that its overall behavior is defined by the combined behavior of its methods. Accordingly, you can add functionality to a constructor by simply defining new methods. For example, let's say you want to add a constructor method for Foo objects that takes only one argument and uses the given value for both the bar and baz fields. This is simple:Foo(x) = Foo(x,x)\nn\nnjulia> Foo(1)\nnFoo(1,1)You could also add a zero-argument Foo constructor method that supplies default values for both of the bar and baz fields:Foo() = Foo(0)\nn\nnjulia> Foo()\nnFoo(0,0)Here the zero-argument constructor method calls the single-argument constructor method, which in turn calls the automatically provided two-argument constructor method. For reasons that will become clear very shortly, additional constructor methods declared as normal methods like this are called outer constructor methods. Outer constructor methods can only ever create a new instance by calling another constructor method, such as the automatically provided default ones."
},

{
    "location": "manual/constructors.html#Inner-Constructor-Methods-1",
    "title": "Inner Constructor Methods",
    "category": "Section",
    "text": "While outer constructor methods succeed in addressing the problem of providing additional convenience methods for constructing objects, they fail to address the other two use cases mentioned in the introduction of this chapter: enforcing invariants, and allowing construction of self-referential objects. For these problems, one needs inner constructor methods. An inner constructor method is much like an outer constructor method, with two differences:It is declared inside the block of a type declaration, rather than outside of it like normal methods.\nnIt has access to a special locally existent function called new that creates objects of the block's type.For example, suppose one wants to declare a type that holds a pair of real numbers, subject to the constraint that the first number is not greater than the second one. One could declare it like this:type OrderedPair\nn  x::Real\nn  y::Real\nn\nn  OrderedPair(x,y) = x > y ? error(\"out of order\") : new(x,y)\nnendNow OrderedPair objects can only be constructed such that x <= y:julia> OrderedPair(1,2)\nnOrderedPair(1,2)\nn\nnjulia> OrderedPair(2,1)\nnERROR: out of order\nn in OrderedPair(::Int64, ::Int64) at ./none:5\nn ...You can still reach in and directly change the field values to violate this invariant, but messing around with an object's internals uninvited is considered poor form. You (or someone else) can also provide additional outer constructor methods at any later point, but once a type is declared, there is no way to add more inner constructor methods. Since outer constructor methods can only create objects by calling other constructor methods, ultimately, some inner constructor must be called to create an object. This guarantees that all objects of the declared type must come into existence by a call to one of the inner constructor methods provided with the type, thereby giving some degree of enforcement of a type's invariants.Of course, if the type is declared as immutable, then its constructor-provided invariants are fully enforced. This is an important consideration when deciding whether a type should be immutable.If any inner constructor method is defined, no default constructor method is provided: it is presumed that you have supplied yourself with all the inner constructors you need. The default constructor is equivalent to writing your own inner constructor method that takes all of the object's fields as parameters (constrained to be of the correct type, if the corresponding field has a type), and passes them to new, returning the resulting object:type Foo\nn  bar\nn  baz\nn\nn  Foo(bar,baz) = new(bar,baz)\nnendThis declaration has the same effect as the earlier definition of the Foo type without an explicit inner constructor method. The following two types are equivalent – one with a default constructor, the other with an explicit constructor:type T1\nn  x::Int64\nnend\nn\nntype T2\nn  x::Int64\nn  T2(x) = new(x)\nnend\nn\nnjulia> T1(1)\nnT1(1)\nn\nnjulia> T2(1)\nnT2(1)\nn\nnjulia> T1(1.0)\nnT1(1)\nn\nnjulia> T2(1.0)\nnT2(1)It is considered good form to provide as few inner constructor methods as possible: only those taking all arguments explicitly and enforcing essential error checking and transformation. Additional convenience constructor methods, supplying default values or auxiliary transformations, should be provided as outer constructors that call the inner constructors to do the heavy lifting. This separation is typically quite natural."
},

{
    "location": "manual/constructors.html#Incomplete-Initialization-1",
    "title": "Incomplete Initialization",
    "category": "Section",
    "text": "The final problem which has still not been addressed is construction of self-referential objects, or more generally, recursive data structures. Since the fundamental difficulty may not be immediately obvious, let us briefly explain it. Consider the following recursive type declaration:type SelfReferential\nn  obj::SelfReferential\nnendThis type may appear innocuous enough, until one considers how to construct an instance of it. If a is an instance of SelfReferential, then a second instance can be created by the call:b = SelfReferential(a)But how does one construct the first instance when no instance exists to provide as a valid value for its obj field? The only solution is to allow creating an incompletely initialized instance of SelfReferential with an unassigned obj field, and using that incomplete instance as a valid value for the obj field of another instance, such as, for example, itself.To allow for the creation of incompletely initialized objects, Julia allows the new function to be called with fewer than the number of fields that the type has, returning an object with the unspecified fields uninitialized. The inner constructor method can then use the incomplete object, finishing its initialization before returning it. Here, for example, we take another crack at defining the SelfReferential type, with a zero-argument inner constructor returning instances having obj fields pointing to themselves:type SelfReferential\nn  obj::SelfReferential\nn\nn  SelfReferential() = (x = new(); x.obj = x)\nnendWe can verify that this constructor works and constructs objects that are, in fact, self-referential:julia> x = SelfReferential();\nn\nnjulia> is(x, x)\nntrue\nn\nnjulia> is(x, x.obj)\nntrue\nn\nnjulia> is(x, x.obj.obj)\nntrueAlthough it is generally a good idea to return a fully initialized object from an inner constructor, incompletely initialized objects can be returned:julia> type Incomplete\nn         xx\nn         Incomplete() = new()\nn       end\nn\nnjulia> z = Incomplete();While you are allowed to create objects with uninitialized fields, any access to an uninitialized reference is an immediate error:julia> z.xx\nnERROR: UndefRefError: access to undefined reference\nn ...This avoids the need to continually check for null values. However, not all object fields are references. Julia considers some types to be \"plain data\", meaning all of their data is self-contained and does not reference other objects. The plain data types consist of bits types (e.g. Int) and immutable structs of other plain data types. The initial contents of a plain data type is undefined:julia> type HasPlain\nn         n::Int\nn         HasPlain() = new()\nn       end\nn\nnjulia> HasPlain()\nnHasPlain(438103441441)Arrays of plain data types exhibit the same behavior.You can pass incomplete objects to other functions from inner constructors to delegate their completion:type Lazy\nn  xx\nn\nn  Lazy(v) = complete_me(new(), v)\nnendAs with incomplete objects returned from constructors, if complete_me or any of its callees try to access the xx field of the Lazy object before it has been initialized, an error will be thrown immediately."
},

{
    "location": "manual/constructors.html#Parametric-Constructors-1",
    "title": "Parametric Constructors",
    "category": "Section",
    "text": "Parametric types add a few wrinkles to the constructor story. Recall from Parametric Types that, by default, instances of parametric composite types can be constructed either with explicitly given type parameters or with type parameters implied by the types of the arguments given to the constructor. Here are some examples:julia> type Point{T<:Real}\nn         x::T\nn         y::T\nn       end\nn\nn## implicit T ##\nn\nnjulia> Point(1,2)\nnPoint{Int64}(1,2)\nn\nnjulia> Point(1.0,2.5)\nnPoint{Float64}(1.0,2.5)\nn\nnjulia> Point(1,2.5)\nnERROR: MethodError: no method matching Point{T<:Real}(::Int64, ::Float64)\nnClosest candidates are:\nn  Point{T<:Real}{T<:Real}(::T<:Real, !Matched::T<:Real)\nn  Point{T<:Real}{T}(::Any)\nn ...\nn\nn## explicit T ##\nn\nnjulia> Point{Int64}(1,2)\nnPoint{Int64}(1,2)\nn\nnjulia> Point{Int64}(1.0,2.5)\nnERROR: InexactError()\nn in Point{Int64}(::Float64, ::Float64) at ./none:2\nn ...\nn\nnjulia> Point{Float64}(1.0,2.5)\nnPoint{Float64}(1.0,2.5)\nn\nnjulia> Point{Float64}(1,2)\nnPoint{Float64}(1.0,2.0)As you can see, for constructor calls with explicit type parameters, the arguments are converted to the implied field types: Point{Int64}(1,2) works, but Point{Int64}(1.0,2.5) raises an InexactError when converting 2.5 to Int64. When the type is implied by the arguments to the constructor call, as in Point(1,2), then the types of the arguments must agree – otherwise the T cannot be determined – but any pair of real arguments with matching type may be given to the generic Point constructor.What's really going on here is that Point, Point{Float64} and Point{Int64} are all different constructor functions. In fact, Point{T} is a distinct constructor function for each type T. Without any explicitly provided inner constructors, the declaration of the composite type Point{T<:Real} automatically provides an inner constructor, Point{T}, for each possible type T<:Real, that behaves just like non-parametric default inner constructors do. It also provides a single general outer Point constructor that takes pairs of real arguments, which must be of the same type. This automatic provision of constructors is equivalent to the following explicit declaration:type Point{T<:Real}\nn  x::T\nn  y::T\nn\nn  Point(x,y) = new(x,y)\nnend\nn\nnPoint{T<:Real}(x::T, y::T) = Point{T}(x,y)Some features of parametric constructor definitions at work here deserve comment. First, inner constructor declarations always define methods of Point{T} rather than methods of the general Point constructor function. Since Point is not a concrete type, it makes no sense for it to even have inner constructor methods at all. Thus, the inner method declaration Point(x,y) = new(x,y) provides an inner constructor method for each value of T. It is this method declaration that defines the behavior of constructor calls with explicit type parameters like Point{Int64}(1,2) and Point{Float64}(1.0,2.0). The outer constructor declaration, on the other hand, defines a method for the general Point constructor which only applies to pairs of values of the same real type. This declaration makes constructor calls without explicit type parameters, like Point(1,2) and Point(1.0,2.5), work. Since the method declaration restricts the arguments to being of the same type, calls like Point(1,2.5), with arguments of different types, result in \"no method\" errors.Suppose we wanted to make the constructor call Point(1,2.5) work by \"promoting\" the integer value 1 to the floating-point value 1.0. The simplest way to achieve this is to define the following additional outer constructor method:julia> Point(x::Int64, y::Float64) = Point(convert(Float64,x),y);This method uses the convert() function to explicitly convert x to Float64 and then delegates construction to the general constructor for the case where both arguments are Float64. With this method definition what was previously a MethodError now successfully creates a point of type Point{Float64}:julia> Point(1,2.5)\nnPoint{Float64}(1.0,2.5)\nn\nnjulia> typeof(ans)\nnPoint{Float64}However, other similar calls still don't work:julia> Point(1.5,2)\nnERROR: MethodError: no method matching Point{T<:Real}(::Float64, ::Int64)\nnClosest candidates are:\nn  Point{T<:Real}{T<:Real}(::T<:Real, !Matched::T<:Real)\nn  Point{T<:Real}{T}(::Any)\nn ...For a much more general way of making all such calls work sensibly, see Conversion and Promotion. At the risk of spoiling the suspense, we can reveal here that all it takes is the following outer method definition to make all calls to the general Point constructor work as one would expect:julia> Point(x::Real, y::Real) = Point(promote(x,y)...);The promote function converts all its arguments to a common type – in this case Float64. With this method definition, the Point constructor promotes its arguments the same way that numeric operators like + do, and works for all kinds of real numbers:julia> Point(1.5,2)\nnPoint{Float64}(1.5,2.0)\nn\nnjulia> Point(1,1//2)\nnPoint{Rational{Int64}}(1//1,1//2)\nn\nnjulia> Point(1.0,1//2)\nnPoint{Float64}(1.0,0.5)Thus, while the implicit type parameter constructors provided by default in Julia are fairly strict, it is possible to make them behave in a more relaxed but sensible manner quite easily. Moreover, since constructors can leverage all of the power of the type system, methods, and multiple dispatch, defining sophisticated behavior is typically quite simple."
},

{
    "location": "manual/constructors.html#Case-Study:-Rational-1",
    "title": "Case Study: Rational",
    "category": "Section",
    "text": "Perhaps the best way to tie all these pieces together is to present a real world example of a parametric composite type and its constructor methods. To that end, here is beginning of rational.jl, which implements Julia's Rational Numbers:immutable Rational{T<:Integer} <: Real\nn    num::T\nn    den::T\nn\nn    function Rational(num::T, den::T)\nn        if num == 0 && den == 0\nn            error(\"invalid rational: 0//0\")\nn        end\nn        g = gcd(den, num)\nn        num = div(num, g)\nn        den = div(den, g)\nn        new(num, den)\nn    end\nnend\nnRational{T<:Integer}(n::T, d::T) = Rational{T}(n,d)\nnRational(n::Integer, d::Integer) = Rational(promote(n,d)...)\nnRational(n::Integer) = Rational(n,one(n))\nn\nn//(n::Integer, d::Integer) = Rational(n,d)\nn//(x::Rational, y::Integer) = x.num // (x.den*y)\nn//(x::Integer, y::Rational) = (x*y.den) // y.num\nn//(x::Complex, y::Real) = complex(real(x)//y, imag(x)//y)\nn//(x::Real, y::Complex) = x*y'//real(y*y')\nn\nnfunction //(x::Complex, y::Complex)\nn    xy = x*y'\nn    yy = real(y*y')\nn    complex(real(xy)//yy, imag(xy)//yy)\nnendThe first line – immutable Rational{T<:Int} <: Real – declares that Rational takes one type parameter of an integer type, and is itself a real type. The field declarations num::T and den::T indicate that the data held in a Rational{T} object are a pair of integers of type T, one representing the rational value's numerator and the other representing its denominator.Now things get interesting. Rational has a single inner constructor method which checks that both of num and den aren't zero and ensures that every rational is constructed in \"lowest terms\" with a non-negative denominator. This is accomplished by dividing the given numerator and denominator values by their greatest common divisor, computed using the gcd function. Since gcd returns the greatest common divisor of its arguments with sign matching the first argument (den here), after this division the new value of den is guaranteed to be non-negative. Because this is the only inner constructor for Rational, we can be certain that Rational objects are always constructed in this normalized form.Rational also provides several outer constructor methods for convenience. The first is the \"standard\" general constructor that infers the type parameter T from the type of the numerator and denominator when they have the same type. The second applies when the given numerator and denominator values have different types: it promotes them to a common type and then delegates construction to the outer constructor for arguments of matching type. The third outer constructor turns integer values into rationals by supplying a value of 1 as the denominator.Following the outer constructor definitions, we have a number of methods for the // operator, which provides a syntax for writing rationals. Before these definitions, // is a completely undefined operator with only syntax and no meaning. Afterwards, it behaves just as described in Rational Numbers – its entire behavior is defined in these few lines. The first and most basic definition just makes a//b construct a Rational by applying the Rational constructor to a and b when they are integers. When one of the operands of // is already a rational number, we construct a new rational for the resulting ratio slightly differently; this behavior is actually identical to division of a rational with an integer. Finally, applying // to complex integral values creates an instance of Complex{Rational} – a complex number whose real and imaginary parts are rationals:julia> (1 + 2im)//(1 - 2im)\nn-3//5 + 4//5*im\nn\nnjulia> typeof(ans)\nnComplex{Rational{Int64}}\nn\nnjulia> ans <: Complex{Rational}\nnfalseThus, although the // operator usually returns an instance of Rational, if either of its arguments are complex integers, it will return an instance of Complex{Rational} instead. The interested reader should consider perusing the rest of rational.jl: it is short, self-contained, and implements an entire basic Julia type."
},

{
    "location": "manual/constructors.html#Constructors-and-Conversion-1",
    "title": "Constructors and Conversion",
    "category": "Section",
    "text": "Constructors T(args...) in Julia are implemented like other callable objects: methods are added to their types. The type of a type is Type, so all constructor methods are stored in the method table for the Type type. This means that you can declare more flexible constructors, e.g. constructors for abstract types, by explicitly defining methods for the appropriate types.However, in some cases you could consider adding methods to Base.convertinstead of defining a constructor, because Julia falls back to calling convert() if no matching constructor is found. For example, if no constructor T(args...) = ... exists Base.convert(::Type{T}, args...) = ... is called.convert is used extensively throughout Julia whenever one type needs to be converted to another (e.g. in assignment, ccall, etcetera), and should generally only be defined (or successful) if the conversion is lossless.  For example, convert(Int, 3.0) produces 3, but convert(Int, 3.2) throws an InexactError.  If you want to define a constructor for a lossless conversion from one type to another, you should probably define a convert method instead.On the other hand, if your constructor does not represent a lossless conversion, or doesn't represent \"conversion\" at all, it is better to leave it as a constructor rather than a convert method.  For example, the Array{Int}() constructor creates a zero-dimensional Array of the type Int, but is not really a \"conversion\" from Int to an Array."
},

{
    "location": "manual/control-flow.html",
    "title": "Control Flow",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/control-flow.html#Control-Flow-1",
    "title": "Control Flow",
    "category": "Section",
    "text": "Julia provides a variety of control flow constructs:Compound Expressions: begin and (;).\nnConditional Evaluation: if-elseif-else and ?: (ternary operator).\nnShort-Circuit Evaluation: &&, || and chained comparisons.\nnRepeated Evaluation: Loops: while and for.\nnException Handling: try-catch, error() and throw().\nnTasks (aka Coroutines): yieldto().The first five control flow mechanisms are standard to high-level programming languages. Tasks are not so standard: they provide non-local control flow, making it possible to switch between temporarily-suspended computations. This is a powerful construct: both exception handling and cooperative multitasking are implemented in Julia using tasks. Everyday programming requires no direct usage of tasks, but certain problems can be solved much more easily by using tasks."
},

{
    "location": "manual/control-flow.html#Compound-Expressions-1",
    "title": "Compound Expressions",
    "category": "Section",
    "text": "Sometimes it is convenient to have a single expression which evaluates several subexpressions in order, returning the value of the last subexpression as its value. There are two Julia constructs that accomplish this: begin blocks and (;) chains. The value of both compound expression constructs is that of the last subexpression. Here's an example of a begin block:julia> z = begin\nn         x = 1\nn         y = 2\nn         x + y\nn       end\nn3Since these are fairly small, simple expressions, they could easily be placed onto a single line, which is where the (;) chain syntax comes in handy:julia> z = (x = 1; y = 2; x + y)\nn3This syntax is particularly useful with the terse single-line function definition form introduced in Functions. Although it is typical, there is no requirement that begin blocks be multiline or that (;) chains be single-line:julia> begin x = 1; y = 2; x + y end\nn3\nn\nnjulia> (x = 1;\nn        y = 2;\nn        x + y)\nn3"
},

{
    "location": "manual/control-flow.html#Conditional-Evaluation-1",
    "title": "Conditional Evaluation",
    "category": "Section",
    "text": "Conditional evaluation allows portions of code to be evaluated or not evaluated depending on the value of a boolean expression. Here is the anatomy of the if-elseif-else conditional syntax:if x < y\nn  println(\"x is less than y\")\nnelseif x > y\nn  println(\"x is greater than y\")\nnelse\nn  println(\"x is equal to y\")\nnendIf the condition expression x < y is true, then the corresponding block is evaluated; otherwise the condition expression x > y is evaluated, and if it is true, the corresponding block is evaluated; if neither expression is true, the else block is evaluated. Here it is in action:julia> function test(x, y)\nn         if x < y\nn           println(\"x is less than y\")\nn         elseif x > y\nn           println(\"x is greater than y\")\nn         else\nn           println(\"x is equal to y\")\nn         end\nn       end\nntest (generic function with 1 method)\nn\nnjulia> test(1, 2)\nnx is less than y\nn\nnjulia> test(2, 1)\nnx is greater than y\nn\nnjulia> test(1, 1)\nnx is equal to yThe elseif and else blocks are optional, and as many elseif blocks as desired can be used. The condition expressions in the if-elseif-else construct are evaluated until the first one evaluates to true, after which the associated block is evaluated, and no further condition expressions or blocks are evaluated.if blocks are \"leaky\", i.e. they do not introduce a local scope. This means that new variables defined inside the ìf clauses can be used after the if block, even if they weren't defined before. So, we could have defined the test function above asjulia> function test(x,y)\nn         if x < y\nn           relation = \"less than\"\nn         elseif x == y\nn           relation = \"equal to\"\nn         else\nn           relation = \"greater than\"\nn         end\nn         println(\"x is \", relation, \" y.\")\nn       end\nntest (generic function with 1 method)The variable relation is declared inside the if block, but used outside. However, when depending on this behavior, make sure all possible code paths define a value for the variable. The following change to the above function results in a runtime errorjulia> function test(x,y)\nn         if x < y\nn           relation = \"less than\"\nn         elseif x == y\nn           relation = \"equal to\"\nn         end\nn         println(\"x is \", relation, \" y.\")\nn       end\nntest (generic function with 1 method)\nn\nnjulia> test(1,2)\nnx is less than y.\nn\nnjulia> test(2,1)\nnERROR: UndefVarError: relation not defined\nn in test(::Int64, ::Int64) at ./none:7\nn ...if blocks also return a value, which may seem unintuitive to users coming from many other languages. This value is simply the return value of the last executed statement in the branch that was chosen, sojulia> x = 3\nn3\nn\nnjulia> if x > 0\nn           \"positive!\"\nn       else\nn           \"negative...\"\nn       end\nn\"positive!\"Note that very short conditional statements (one-liners) are frequently expressed using Short-Circuit Evaluation in Julia, as outlined in the next section.Unlike C, MATLAB, Perl, Python, and Ruby – but like Java, and a few other stricter, typed languages – it is an error if the value of a conditional expression is anything but true or false:julia> if 1\nn         println(\"true\")\nn       end\nnERROR: TypeError: non-boolean (Int64) used in boolean context\nn ...This error indicates that the conditional was of the wrong type: Int64 rather than the required Bool.The so-called \"ternary operator\", ?:, is closely related to the if-elseif-else syntax, but is used where a conditional choice between single expression values is required, as opposed to conditional execution of longer blocks of code. It gets its name from being the only operator in most languages taking three operands:a ? b : cThe expression a, before the ?, is a condition expression, and the ternary operation evaluates the expression b, before the :, if the condition a is true or the expression c, after the :, if it is false.The easiest way to understand this behavior is to see an example. In the previous example, the println call is shared by all three branches: the only real choice is which literal string to print. This could be written more concisely using the ternary operator. For the sake of clarity, let's try a two-way version first:julia> x = 1; y = 2;\nn\nnjulia> println(x < y ? \"less than\" : \"not less than\")\nnless than\nn\nnjulia> x = 1; y = 0;\nn\nnjulia> println(x < y ? \"less than\" : \"not less than\")\nnnot less thanIf the expression x < y is true, the entire ternary operator expression evaluates to the string \"less than\" and otherwise it evaluates to the string \"not less than\". The original three-way example requires chaining multiple uses of the ternary operator together:julia> test(x, y) = println(x < y ? \"x is less than y\"    :\nn                            x > y ? \"x is greater than y\" : \"x is equal to y\")\nntest (generic function with 1 method)\nn\nnjulia> test(1, 2)\nnx is less than y\nn\nnjulia> test(2, 1)\nnx is greater than y\nn\nnjulia> test(1, 1)\nnx is equal to yTo facilitate chaining, the operator associates from right to left.It is significant that like if-elseif-else, the expressions before and after the : are only evaluated if the condition expression evaluates to true or false, respectively:julia> v(x) = (println(x); x)\nnv (generic function with 1 method)\nn\nn\nnjulia> 1 < 2 ? v(\"yes\") : v(\"no\")\nnyes\nn\"yes\"\nn\nnjulia> 1 > 2 ? v(\"yes\") : v(\"no\")\nnno\nn\"no\""
},

{
    "location": "manual/control-flow.html#Short-Circuit-Evaluation-1",
    "title": "Short-Circuit Evaluation",
    "category": "Section",
    "text": "Short-circuit evaluation is quite similar to conditional evaluation. The behavior is found in most imperative programming languages having the && and || boolean operators: in a series of boolean expressions connected by these operators, only the minimum number of expressions are evaluated as are necessary to determine the final boolean value of the entire chain. Explicitly, this means that:In the expression a && b, the subexpression b is only evaluated if a evaluates to true.\nnIn the expression a || b, the subexpression b is only evaluated if a evaluates to false.The reasoning is that a && b must be false if a is false, regardless of the value of b, and likewise, the value of a || b must be true if a is true, regardless of the value of b. Both && and || associate to the right, but && has higher precedence than || does. It's easy to experiment with this behavior:julia> t(x) = (println(x); true)\nnt (generic function with 1 method)\nn\nnjulia> f(x) = (println(x); false)\nnf (generic function with 1 method)\nn\nnjulia> t(1) && t(2)\nn1\nn2\nntrue\nn\nnjulia> t(1) && f(2)\nn1\nn2\nnfalse\nn\nnjulia> f(1) && t(2)\nn1\nnfalse\nn\nnjulia> f(1) && f(2)\nn1\nnfalse\nn\nnjulia> t(1) || t(2)\nn1\nntrue\nn\nnjulia> t(1) || f(2)\nn1\nntrue\nn\nnjulia> f(1) || t(2)\nn1\nn2\nntrue\nn\nnjulia> f(1) || f(2)\nn1\nn2\nnfalseYou can easily experiment in the same way with the associativity and precedence of various combinations of && and || operators.This behavior is frequently used in Julia to form an alternative to very short if statements. Instead of if <cond> <statement> end, one can write <cond> && <statement> (which could be read as: <cond> and then <statement>). Similarly, instead of if ! <cond> <statement> end, one can write <cond> || <statement> (which could be read as: <cond> or else <statement>).For example, a recursive factorial routine could be defined like this:julia> function fact(n::Int)\nn           n >= 0 || error(\"n must be non-negative\")\nn           n == 0 && return 1\nn           n * fact(n-1)\nn       end\nnfact (generic function with 1 method)\nn\nnjulia> fact(5)\nn120\nn\nnjulia> fact(0)\nn1\nn\nnjulia> fact(-1)\nnERROR: n must be non-negative\nn in fact(::Int64) at ./none:2\nn ...Boolean operations without short-circuit evaluation can be done with the bitwise boolean operators introduced in Mathematical Operations and Elementary Functions: & and |. These are normal functions, which happen to support infix operator syntax, but always evaluate their arguments:julia> f(1) & t(2)\nn1\nn2\nnfalse\nn\nnjulia> t(1) | t(2)\nn1\nn2\nntrueJust like condition expressions used in if, elseif or the ternary operator, the operands of && or || must be boolean values (true or false). Using a non-boolean value anywhere except for the last entry in a conditional chain is an error:julia> 1 && true\nnERROR: TypeError: non-boolean (Int64) used in boolean context\nn ...On the other hand, any type of expression can be used at the end of a conditional chain. It will be evaluated and returned depending on the preceding conditionals:julia> true && (x = rand(2,2))\nn2×2 Array{Float64,2}:\nn 0.768448  0.673959\nn 0.940515  0.395453\nn\nnjulia> false && (x = rand(2,2))\nnfalse"
},

{
    "location": "manual/control-flow.html#Repeated-Evaluation:-Loops-1",
    "title": "Repeated Evaluation: Loops",
    "category": "Section",
    "text": "There are two constructs for repeated evaluation of expressions: the while loop and the for loop. Here is an example of a while loop:julia> i = 1;\nn\nnjulia> while i <= 5\nn         println(i)\nn         i += 1\nn       end\nn1\nn2\nn3\nn4\nn5The while loop evaluates the condition expression (i <= 5 in this case), and as long it remains true, keeps also evaluating the body of the while loop. If the condition expression is false when the while loop is first reached, the body is never evaluated.The for loop makes common repeated evaluation idioms easier to write. Since counting up and down like the above while loop does is so common, it can be expressed more concisely with a for loop:julia> for i = 1:5\nn         println(i)\nn       end\nn1\nn2\nn3\nn4\nn5Here the 1:5 is a Range object, representing the sequence of numbers 1, 2, 3, 4, 5. The for loop iterates through these values, assigning each one in turn to the variable i. One rather important distinction between the previous while loop form and the for loop form is the scope during which the variable is visible. If the variable i has not been introduced in an other scope, in the for loop form, it is visible only inside of the for loop, and not afterwards. You'll either need a new interactive session instance or a different variable name to test this:julia> for j = 1:5\nn         println(j)\nn       end\nn1\nn2\nn3\nn4\nn5\nn\nnjulia> j\nnERROR: UndefVarError: j not defined\nn ...See Scope of Variables for a detailed explanation of variable scope and how it works in Julia.In general, the for loop construct can iterate over any container. In these cases, the alternative (but fully equivalent) keyword in or ∈ is typically used instead of =, since it makes the code read more clearly:julia> for i in [1,4,0]\nn         println(i)\nn       end\nn1\nn4\nn0\nn\nnjulia> for s ∈ [\"foo\",\"bar\",\"baz\"]\nn         println(s)\nn       end\nnfoo\nnbar\nnbazVarious types of iterable containers will be introduced and discussed in later sections of the manual (see, e.g., Multi-dimensional Arrays).It is sometimes convenient to terminate the repetition of a while before the test condition is falsified or stop iterating in a for loop before the end of the iterable object is reached. This can be accomplished with the break keyword:julia> i = 1;\nn\nnjulia> while true\nn         println(i)\nn         if i >= 5\nn           break\nn         end\nn         i += 1\nn       end\nn1\nn2\nn3\nn4\nn5\nn\nnjulia> for i = 1:1000\nn         println(i)\nn         if i >= 5\nn           break\nn         end\nn       end\nn1\nn2\nn3\nn4\nn5The above while loop would never terminate on its own, and the for loop would iterate up to 1000. These loops are both exited early by using the break keyword.In other circumstances, it is handy to be able to stop an iteration and move on to the next one immediately. The continue keyword accomplishes this:julia> for i = 1:10\nn         if i % 3 != 0\nn           continue\nn         end\nn         println(i)\nn       end\nn3\nn6\nn9This is a somewhat contrived example since we could produce the same behavior more clearly by negating the condition and placing the println call inside the if block. In realistic usage there is more code to be evaluated after the continue, and often there are multiple points from which one calls continue.Multiple nested for loops can be combined into a single outer loop, forming the cartesian product of its iterables:julia> for i = 1:2, j = 3:4\nn         println((i, j))\nn       end\nn(1,3)\nn(1,4)\nn(2,3)\nn(2,4)A break statement inside such a loop exits the entire nest of loops, not just the inner one."
},

{
    "location": "manual/control-flow.html#Exception-Handling-1",
    "title": "Exception Handling",
    "category": "Section",
    "text": "When an unexpected condition occurs, a function may be unable to return a reasonable value to its caller. In such cases, it may be best for the exceptional condition to either terminate the program, printing a diagnostic error message, or if the programmer has provided code to handle such exceptional circumstances, allow that code to take the appropriate action."
},

{
    "location": "manual/control-flow.html#Built-in-Exceptions-1",
    "title": "Built-in Exceptions",
    "category": "Section",
    "text": "Exceptions are thrown when an unexpected condition has occurred. The built-in Exceptions listed below all interrupt the normal flow of control.Exception\nnArgumentError\nnBoundsError\nnCompositeException\nnDivideError\nnDomainError\nnEOFError\nnErrorException\nnInexactError\nnInitError\nnInterruptException\nnInvalidStateException\nnKeyError\nnLoadError\nnOutOfMemoryError\nnReadOnlyMemoryError\nnRemoteException\nnMethodError\nnOverflowError\nnParseError\nnSystemError\nnTypeError\nnUndefRefError\nnUndefVarError\nnUnicodeErrorFor example, the sqrt() function throws a DomainError if applied to a negative real value:julia> sqrt(-1)\nnERROR: DomainError:\nnsqrt will only return a complex result if called with a complex argument. Try sqrt(complex(x)).\nn in sqrt(::Int64) at ./math.jl:149\nn ...You may define your own exceptions in the following way:julia> type MyCustomException <: Exception end"
},

{
    "location": "manual/control-flow.html#The-[throw()](@ref)-function-1",
    "title": "The throw() function",
    "category": "Section",
    "text": "Exceptions can be created explicitly with throw(). For example, a function defined only for nonnegative numbers could be written to throw() a DomainError if the argument is negative:julia> f(x) = x>=0 ? exp(-x) : throw(DomainError())\nnf (generic function with 1 method)\nn\nnjulia> f(1)\nn0.36787944117144233\nn\nnjulia> f(-1)\nnERROR: DomainError:\nn in f(::Int64) at ./none:1\nn ...Note that DomainError without parentheses is not an exception, but a type of exception. It needs to be called to obtain an Exception object:julia> typeof(DomainError()) <: Exception\nntrue\nn\nnjulia> typeof(DomainError) <: Exception\nnfalseAdditionally, some exception types take one or more arguments that are used for error reporting:julia> throw(UndefVarError(:x))\nnERROR: UndefVarError: x not defined\nn ...This mechanism can be implemented easily by custom exception types following the way UndefVarError is written:julia> type MyUndefVarError <: Exception\nn           var::Symbol\nn       end\nnjulia> Base.showerror(io::IO, e::MyUndefVarError) = print(io, e.var, \" not defined\");"
},

{
    "location": "manual/control-flow.html#Errors-1",
    "title": "Errors",
    "category": "Section",
    "text": "The error() function is used to produce an ErrorException that interrupts the normal flow of control.Suppose we want to stop execution immediately if the square root of a negative number is taken. To do this, we can define a fussy version of the sqrt() function that raises an error if its argument is negative:julia> fussy_sqrt(x) = x >= 0 ? sqrt(x) : error(\"negative x not allowed\")\nnfussy_sqrt (generic function with 1 method)\nn\nnjulia> fussy_sqrt(2)\nn1.4142135623730951\nn\nnjulia> fussy_sqrt(-1)\nnERROR: negative x not allowed\nn in fussy_sqrt(::Int64) at ./none:1\nn ...If fussy_sqrt is called with a negative value from another function, instead of trying to continue execution of the calling function, it returns immediately, displaying the error message in the interactive session:julia> function verbose_fussy_sqrt(x)\nn         println(\"before fussy_sqrt\")\nn         r = fussy_sqrt(x)\nn         println(\"after fussy_sqrt\")\nn         return r\nn       end\nnverbose_fussy_sqrt (generic function with 1 method)\nn\nnjulia> verbose_fussy_sqrt(2)\nnbefore fussy_sqrt\nnafter fussy_sqrt\nn1.4142135623730951\nn\nnjulia> verbose_fussy_sqrt(-1)\nnbefore fussy_sqrt\nnERROR: negative x not allowed\nn in fussy_sqrt at ./none:1 [inlined]\nn in verbose_fussy_sqrt(::Int64) at ./none:3\nn ..."
},

{
    "location": "manual/control-flow.html#Warnings-and-informational-messages-1",
    "title": "Warnings and informational messages",
    "category": "Section",
    "text": "Julia also provides other functions that write messages to the standard error I/O, but do not throw any Exceptions and hence do not interrupt execution:julia> info(\"Hi\"); 1+1\nnINFO: Hi\nn2\nn\nnjulia> warn(\"Hi\"); 1+1\nnWARNING: Hi\nn2\nn\nnjulia> error(\"Hi\"); 1+1\nnERROR: Hi\nn in error(::String) at ./error.jl:21\nn ..."
},

{
    "location": "manual/control-flow.html#The-try/catch-statement-1",
    "title": "The try/catch statement",
    "category": "Section",
    "text": "The try/catch statement allows for Exceptions to be tested for. For example, a customized square root function can be written to automatically call either the real or complex square root method on demand using Exceptions :julia> f(x) = try\nn         sqrt(x)\nn       catch\nn         sqrt(complex(x, 0))\nn       end\nnf (generic function with 1 method)\nn\nnjulia> f(1)\nn1.0\nn\nnjulia> f(-1)\nn0.0 + 1.0imIt is important to note that in real code computing this function, one would compare x to zero instead of catching an exception. The exception is much slower than simply comparing and branching.try/catch statements also allow the Exception to be saved in a variable. In this contrived example, the following example calculates the square root of the second element of x if x is indexable, otherwise assumes x is a real number and returns its square root:julia> sqrt_second(x) = try\nn         sqrt(x[2])\nn       catch y\nn         if isa(y, DomainError)\nn           sqrt(complex(x[2], 0))\nn         elseif isa(y, BoundsError)\nn           sqrt(x)\nn         end\nn       end\nnsqrt_second (generic function with 1 method)\nn\nnjulia> sqrt_second([1 4])\nn2.0\nn\nnjulia> sqrt_second([1 -4])\nn0.0 + 2.0im\nn\nnjulia> sqrt_second(9)\nn3.0\nn\nnjulia> sqrt_second(-9)\nnERROR: DomainError:\nn in sqrt_second(::Int64) at ./none:7\nn ...Note that the symbol following catch will always be interpreted as a name for the exception, so care is needed when writing try/catch expressions on a single line. The following code will not work to return the value of x in case of an error:try bad() catch x endInstead, use a semicolon or insert a line break after catch:try bad() catch; x end\nn\nntry bad()\nncatch\nn  x\nnendThe catch clause is not strictly necessary; when omitted, the default return value is nothing.julia> try error() end #Returns nothingThe power of the try/catch construct lies in the ability to unwind a deeply nested computation immediately to a much higher level in the stack of calling functions. There are situations where no error has occurred, but the ability to unwind the stack and pass a value to a higher level is desirable. Julia provides the rethrow(), backtrace() and catch_backtrace() functions for more advanced error handling."
},

{
    "location": "manual/control-flow.html#finally-Clauses-1",
    "title": "finally Clauses",
    "category": "Section",
    "text": "In code that performs state changes or uses resources like files, there is typically clean-up work (such as closing files) that needs to be done when the code is finished. Exceptions potentially complicate this task, since they can cause a block of code to exit before reaching its normal end. The finally keyword provides a way to run some code when a given block of code exits, regardless of how it exits.For example, here is how we can guarantee that an opened file is closed:f = open(\"file\")\nntry\nn    # operate on file f\nnfinally\nn    close(f)\nnendWhen control leaves the try block (for example due to a return, or just finishing normally), close(f) will be executed. If the try block exits due to an exception, the exception will continue propagating. A catch block may be combined with try and finally as well. In this case the finally block will run after catch has handled the error."
},

{
    "location": "manual/control-flow.html#Tasks-(aka-Coroutines)-1",
    "title": "Tasks (aka Coroutines)",
    "category": "Section",
    "text": "Tasks are a control flow feature that allows computations to be suspended and resumed in a flexible manner. This feature is sometimes called by other names, such as symmetric coroutines, lightweight threads, cooperative multitasking, or one-shot continuations.When a piece of computing work (in practice, executing a particular function) is designated as a Task, it becomes possible to interrupt it by switching to another Task. The original Task can later be resumed, at which point it will pick up right where it left off. At first, this may seem similar to a function call. However there are two key differences. First, switching tasks does not use any space, so any number of task switches can occur without consuming the call stack. Second, switching among tasks can occur in any order, unlike function calls, where the called function must finish executing before control returns to the calling function.This kind of control flow can make it much easier to solve certain problems. In some problems, the various pieces of required work are not naturally related by function calls; there is no obvious \"caller\" or \"callee\" among the jobs that need to be done. An example is the producer-consumer problem, where one complex procedure is generating values and another complex procedure is consuming them. The consumer cannot simply call a producer function to get a value, because the producer may have more values to generate and so might not yet be ready to return. With tasks, the producer and consumer can both run as long as they need to, passing values back and forth as necessary.Julia provides the functions produce() and consume() for solving this problem. A producer is a function that calls produce() on each value it needs to produce:julia> function producer()\nn         produce(\"start\")\nn         for n=1:4\nn           produce(2n)\nn         end\nn         produce(\"stop\")\nn       end;To consume values, first the producer is wrapped in a Task, then consume() is called repeatedly on that object:julia> p = Task(producer);\nn\nnjulia> consume(p)\nn\"start\"\nn\nnjulia> consume(p)\nn2\nn\nnjulia> consume(p)\nn4\nn\nnjulia> consume(p)\nn6\nn\nnjulia> consume(p)\nn8\nn\nnjulia> consume(p)\nn\"stop\"One way to think of this behavior is that producer was able to return multiple times. Between calls to produce(), the producer's execution is suspended and the consumer has control.A Task can be used as an iterable object in a for loop, in which case the loop variable takes on all the produced values:julia> for x in Task(producer)\nn         println(x)\nn       end\nnstart\nn2\nn4\nn6\nn8\nnstopNote that the Task() constructor expects a 0-argument function. A common pattern is for the producer to be parameterized, in which case a partial function application is needed to create a 0-argument anonymous function. This can be done either directly or by use of a convenience macro:function mytask(myarg)\nn    ...\nnend\nn\nntaskHdl = Task(() -> mytask(7))\nn# or, equivalently\nntaskHdl = @task mytask(7)produce() and consume() do not launch threads that can run on separate CPUs. True kernel threads are discussed under the topic of Parallel Computing."
},

{
    "location": "manual/control-flow.html#Core-task-operations-1",
    "title": "Core task operations",
    "category": "Section",
    "text": "While produce() and consume() illustrate the essential nature of tasks, they are actually implemented as library functions using a more primitive function, yieldto(). yieldto(task,value) suspends the current task, switches to the specified task, and causes that task's last yieldto() call to return the specified value. Notice that yieldto() is the only operation required to use task-style control flow; instead of calling and returning we are always just switching to a different task. This is why this feature is also called \"symmetric coroutines\"; each task is switched to and from using the same mechanism.yieldto() is powerful, but most uses of tasks do not invoke it directly. Consider why this might be. If you switch away from the current task, you will probably want to switch back to it at some point, but knowing when to switch back, and knowing which task has the responsibility of switching back, can require considerable coordination. For example, produce() needs to maintain some state to remember who the consumer is. Not needing to manually keep track of the consuming task is what makes produce() easier to use than yieldto().In addition to yieldto(), a few other basic functions are needed to use tasks effectively.current_task() gets a reference to the currently-running task.\nnistaskdone() queries whether a task has exited.\nnistaskstarted() queries whether a task has run yet.\nntask_local_storage() manipulates a key-value store specific to the current task."
},

{
    "location": "manual/control-flow.html#Tasks-and-events-1",
    "title": "Tasks and events",
    "category": "Section",
    "text": "Most task switches occur as a result of waiting for events such as I/O requests, and are performed by a scheduler included in the standard library. The scheduler maintains a queue of runnable tasks, and executes an event loop that restarts tasks based on external events such as message arrival.The basic function for waiting for an event is wait(). Several objects implement wait(); for example, given a Process object, wait() will wait for it to exit. wait() is often implicit; for example, a wait() can happen inside a call to read() to wait for data to be available.In all of these cases, wait() ultimately operates on a Condition object, which is in charge of queueing and restarting tasks. When a task calls wait() on a Condition, the task is marked as non-runnable, added to the condition's queue, and switches to the scheduler. The scheduler will then pick another task to run, or block waiting for external events. If all goes well, eventually an event handler will call notify() on the condition, which causes tasks waiting for that condition to become runnable again.A task created explicitly by calling Task is initially not known to the scheduler. This allows you to manage tasks manually using yieldto() if you wish. However, when such a task waits for an event, it still gets restarted automatically when the event happens, as you would expect. It is also possible to make the scheduler run a task whenever it can, without necessarily waiting for any events. This is done by calling schedule(), or using the @schedule or @async macros (see Parallel Computing for more details)."
},

{
    "location": "manual/conversion-and-promotion.html",
    "title": "Conversion and Promotion",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/conversion-and-promotion.html#Conversion-and-Promotion-1",
    "title": "Conversion and Promotion",
    "category": "Section",
    "text": "Julia has a system for promoting arguments of mathematical operators to a common type, which has been mentioned in various other sections, including Integers and Floating-Point Numbers, Mathematical Operations and Elementary Functions, Types, and Methods. In this section, we explain how this promotion system works, as well as how to extend it to new types and apply it to functions besides built-in mathematical operators. Traditionally, programming languages fall into two camps with respect to promotion of arithmetic arguments:Automatic promotion for built-in arithmetic types and operators. In most languages, built-in numeric types, when used as operands to arithmetic operators with infix syntax, such as +, -, *, and /, are automatically promoted to a common type to produce the expected results. C, Java, Perl, and Python, to name a few, all correctly compute the sum 1 + 1.5 as the floating-point value 2.5, even though one of the operands to + is an integer. These systems are convenient and designed carefully enough that they are generally all-but-invisible to the programmer: hardly anyone consciously thinks of this promotion taking place when writing such an expression, but compilers and interpreters must perform conversion before addition since integers and floating-point values cannot be added as-is. Complex rules for such automatic conversions are thus inevitably part of specifications and implementations for such languages.\nnNo automatic promotion. This camp includes Ada and ML – very \"strict\" statically typed languages. In these languages, every conversion must be explicitly specified by the programmer. Thus, the example expression 1 + 1.5 would be a compilation error in both Ada and ML. Instead one must write real(1) + 1.5, explicitly converting the integer 1 to a floating-point value before performing addition. Explicit conversion everywhere is so inconvenient, however, that even Ada has some degree of automatic conversion: integer literals are promoted to the expected integer type automatically, and floating-point literals are similarly promoted to appropriate floating-point types.In a sense, Julia falls into the \"no automatic promotion\" category: mathematical operators are just functions with special syntax, and the arguments of functions are never automatically converted. However, one may observe that applying mathematical operations to a wide variety of mixed argument types is just an extreme case of polymorphic multiple dispatch – something which Julia's dispatch and type systems are particularly well-suited to handle. \"Automatic\" promotion of mathematical operands simply emerges as a special application: Julia comes with pre-defined catch-all dispatch rules for mathematical operators, invoked when no specific implementation exists for some combination of operand types. These catch-all rules first promote all operands to a common type using user-definable promotion rules, and then invoke a specialized implementation of the operator in question for the resulting values, now of the same type. User-defined types can easily participate in this promotion system by defining methods for conversion to and from other types, and providing a handful of promotion rules defining what types they should promote to when mixed with other types."
},

{
    "location": "manual/conversion-and-promotion.html#Conversion-1",
    "title": "Conversion",
    "category": "Section",
    "text": "Conversion of values to various types is performed by the convert function. The convert function generally takes two arguments: the first is a type object while the second is a value to convert to that type; the returned value is the value converted to an instance of given type. The simplest way to understand this function is to see it in action:julia> x = 12\nn12\nn\nnjulia> typeof(x)\nnInt64\nn\nnjulia> convert(UInt8, x)\nn0x0c\nn\nnjulia> typeof(ans)\nnUInt8\nn\nnjulia> convert(AbstractFloat, x)\nn12.0\nn\nnjulia> typeof(ans)\nnFloat64Conversion isn't always possible, in which case a no method error is thrown indicating that convert doesn't know how to perform the requested conversion:julia> convert(AbstractFloat, \"foo\")\nnERROR: MethodError: Cannot `convert` an object of type String to an object of type AbstractFloat\nnThis may have arisen from a call to the constructor AbstractFloat(...),\nnsince type constructors fall back to convert methods.\nn ...Some languages consider parsing strings as numbers or formatting numbers as strings to be conversions (many dynamic languages will even perform conversion for you automatically), however Julia does not: even though some strings can be parsed as numbers, most strings are not valid representations of numbers, and only a very limited subset of them are. Therefore in Julia the dedicated parse() function must be used to perform this operation, making it more explicit."
},

{
    "location": "manual/conversion-and-promotion.html#Defining-New-Conversions-1",
    "title": "Defining New Conversions",
    "category": "Section",
    "text": "To define a new conversion, simply provide a new method for convert(). That's really all there is to it. For example, the method to convert a real number to a boolean is this:convert(::Type{Bool}, x::Real) = x==0 ? false : x==1 ? true : throw(InexactError())The type of the first argument of this method is a singleton type, Type{Bool}, the only instance of which is Bool. Thus, this method is only invoked when the first argument is the type value Bool. Notice the syntax used for the first argument: the argument name is omitted prior to the :: symbol, and only the type is given.  This is the syntax in Julia for a function argument whose type is specified but whose value is never used in the function body.  In this example, since the type is a singleton, there would never be any reason to use its value within the body. When invoked, the method determines whether a numeric value is true or false as a boolean, by comparing it to one and zero:julia> convert(Bool, 1)\nntrue\nn\nnjulia> convert(Bool, 0)\nnfalse\nn\nnjulia> convert(Bool, 1im)\nnERROR: InexactError()\nn in convert(::Type{Bool}, ::Complex{Int64}) at ./complex.jl:23\nn ...\nn\nnjulia> convert(Bool, 0im)\nnfalseThe method signatures for conversion methods are often quite a bit more involved than this example, especially for parametric types. The example above is meant to be pedagogical, and is not the actual Julia behaviour. This is the actual implementation in Julia:convert{T<:Real}(::Type{T}, z::Complex) = (imag(z)==0 ? convert(T,real(z)) :\nn                                           throw(InexactError()))\nn\nnjulia> convert(Bool, 1im)\nnERROR: InexactError()\nn in convert(::Type{Bool}, ::Complex{Int64}) at ./complex.jl:18\nn ..."
},

{
    "location": "manual/conversion-and-promotion.html#Case-Study:-Rational-Conversions-1",
    "title": "Case Study: Rational Conversions",
    "category": "Section",
    "text": "To continue our case study of Julia's Rational type, here are the conversions declared in rational.jl, right after the declaration of the type and its constructors:convert{T<:Integer}(::Type{Rational{T}}, x::Rational) = Rational(convert(T,x.num),convert(T,x.den))\nnconvert{T<:Integer}(::Type{Rational{T}}, x::Integer) = Rational(convert(T,x), convert(T,1))\nn\nnfunction convert{T<:Integer}(::Type{Rational{T}}, x::AbstractFloat, tol::Real)\nn    if isnan(x); return zero(T)//zero(T); end\nn    if isinf(x); return sign(x)//zero(T); end\nn    y = x\nn    a = d = one(T)\nn    b = c = zero(T)\nn    while true\nn        f = convert(T,round(y)); y -= f\nn        a, b, c, d = f*a+c, f*b+d, a, b\nn        if y == 0 || abs(a/b-x) <= tol\nn            return a//b\nn        end\nn        y = 1/y\nn    end\nnend\nnconvert{T<:Integer}(rt::Type{Rational{T}}, x::AbstractFloat) = convert(rt,x,eps(x))\nn\nnconvert{T<:AbstractFloat}(::Type{T}, x::Rational) = convert(T,x.num)/convert(T,x.den)\nnconvert{T<:Integer}(::Type{T}, x::Rational) = div(convert(T,x.num),convert(T,x.den))The initial four convert methods provide conversions to rational types. The first method converts one type of rational to another type of rational by converting the numerator and denominator to the appropriate integer type. The second method does the same conversion for integers by taking the denominator to be 1. The third method implements a standard algorithm for approximating a floating-point number by a ratio of integers to within a given tolerance, and the fourth method applies it, using machine epsilon at the given value as the threshold. In general, one should have a//b == convert(Rational{Int64}, a/b).The last two convert methods provide conversions from rational types to floating-point and integer types. To convert to floating point, one simply converts both numerator and denominator to that floating point type and then divides. To convert to integer, one can use the div operator for truncated integer division (rounded towards zero)."
},

{
    "location": "manual/conversion-and-promotion.html#Promotion-1",
    "title": "Promotion",
    "category": "Section",
    "text": "Promotion refers to converting values of mixed types to a single common type. Although it is not strictly necessary, it is generally implied that the common type to which the values are converted can faithfully represent all of the original values. In this sense, the term \"promotion\" is appropriate since the values are converted to a \"greater\" type – i.e. one which can represent all of the input values in a single common type. It is important, however, not to confuse this with object-oriented (structural) super-typing, or Julia's notion of abstract super-types: promotion has nothing to do with the type hierarchy, and everything to do with converting between alternate representations. For instance, although every Int32 value can also be represented as a Float64 value, Int32 is not a subtype of Float64.Promotion to a common \"greater\" type is performed in Julia by the promote function, which takes any number of arguments, and returns a tuple of the same number of values, converted to a common type, or throws an exception if promotion is not possible. The most common use case for promotion is to convert numeric arguments to a common type:julia> promote(1, 2.5)\nn(1.0,2.5)\nn\nnjulia> promote(1, 2.5, 3)\nn(1.0,2.5,3.0)\nn\nnjulia> promote(2, 3//4)\nn(2//1,3//4)\nn\nnjulia> promote(1, 2.5, 3, 3//4)\nn(1.0,2.5,3.0,0.75)\nn\nnjulia> promote(1.5, im)\nn(1.5 + 0.0im,0.0 + 1.0im)\nn\nnjulia> promote(1 + 2im, 3//4)\nn(1//1 + 2//1*im,3//4 + 0//1*im)Floating-point values are promoted to the largest of the floating-point argument types. Integer values are promoted to the larger of either the native machine word size or the largest integer argument type. Mixtures of integers and floating-point values are promoted to a floating-point type big enough to hold all the values. Integers mixed with rationals are promoted to rationals. Rationals mixed with floats are promoted to floats. Complex values mixed with real values are promoted to the appropriate kind of complex value.That is really all there is to using promotions. The rest is just a matter of clever application, the most typical \"clever\" application being the definition of catch-all methods for numeric operations like the arithmetic operators +, -, * and /. Here are some of the catch-all method definitions given in promotion.jl:+(x::Number, y::Number) = +(promote(x,y)...)\nn-(x::Number, y::Number) = -(promote(x,y)...)\nn*(x::Number, y::Number) = *(promote(x,y)...)\nn/(x::Number, y::Number) = /(promote(x,y)...)In certain cases, the result type also depends on the operator; how to handle such scenarios is described elsewhere.These method definitions say that in the absence of more specific rules for adding, subtracting, multiplying and dividing pairs of numeric values, promote the values to a common type and then try again. That's all there is to it: nowhere else does one ever need to worry about promotion to a common numeric type for arithmetic operations – it just happens automatically. There are definitions of catch-all promotion methods for a number of other arithmetic and mathematical functions in promotion.jl, but beyond that, there are hardly any calls to promote required in the Julia standard library. The most common usages of promote occur in outer constructors methods, provided for convenience, to allow constructor calls with mixed types to delegate to an inner type with fields promoted to an appropriate common type. For example, recall that rational.jl provides the following outer constructor method:Rational(n::Integer, d::Integer) = Rational(promote(n,d)...)This allows calls like the following to work:julia> Rational(Int8(15),Int32(-5))\nn-3//1\nn\nnjulia> typeof(ans)\nnRational{Int32}For most user-defined types, it is better practice to require programmers to supply the expected types to constructor functions explicitly, but sometimes, especially for numeric problems, it can be convenient to do promotion automatically."
},

{
    "location": "manual/conversion-and-promotion.html#Defining-Promotion-Rules-1",
    "title": "Defining Promotion Rules",
    "category": "Section",
    "text": "Although one could, in principle, define methods for the promote function directly, this would require many redundant definitions for all possible permutations of argument types. Instead, the behavior of promote is defined in terms of an auxiliary function called promote_rule, which one can provide methods for. The promote_rule function takes a pair of type objects and returns another type object, such that instances of the argument types will be promoted to the returned type. Thus, by defining the rule:promote_rule(::Type{Float64}, ::Type{Float32} ) = Float64one declares that when 64-bit and 32-bit floating-point values are promoted together, they should be promoted to 64-bit floating-point. The promotion type does not need to be one of the argument types, however; the following promotion rules both occur in Julia's standard library:promote_rule(::Type{UInt8}, ::Type{Int8}) = Int\nnpromote_rule(::Type{BigInt}, ::Type{Int8}) = BigIntIn the latter case, the result type is BigInt since BigInt is the only type large enough to hold integers for arbitrary-precision integer arithmetic.  Also note that one does not need to define both promote_rule(::Type{A}, ::Type{B}) and promote_rule(::Type{B}, ::Type{A}) – the symmetry is implied by the way promote_rule is used in the promotion process.The promote_rule function is used as a building block to define a second function called promote_type, which, given any number of type objects, returns the common type to which those values, as arguments to promote should be promoted. Thus, if one wants to know, in absence of actual values, what type a collection of values of certain types would promote to, one can use promote_type:julia> promote_type(Int8, UInt16)\nnInt64Internally, promote_type is used inside of promote to determine what type argument values should be converted to for promotion. It can, however, be useful in its own right. The curious reader can read the code in promotion.jl, which defines the complete promotion mechanism in about 35 lines."
},

{
    "location": "manual/dates.html",
    "title": "Date and DateTime",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/dates.html#Date-and-DateTime-1",
    "title": "Date and DateTime",
    "category": "Section",
    "text": "The Dates module provides two types for working with dates: Date and DateTime, representing day and millisecond precision, respectively; both are subtypes of the abstract TimeType. The motivation for distinct types is simple: some operations are much simpler, both in terms of code and mental reasoning, when the complexities of greater precision don't have to be dealt with. For example, since the Date type only resolves to the precision of a single date (i.e. no hours, minutes, or seconds), normal considerations for time zones, daylight savings/summer time, and leap seconds are unnecessary and avoided.Both Date and DateTime are basically immutable Int64 wrappers. The single instant field of either type is actually a UTInstant{P} type, which represents a continuously increasing machine timeline based on the UT second [1]. The DateTime type is timezone-unaware (in Python parlance) or is analogous to a LocalDateTime in Java 8. Additional time zone functionality can be added through the TimeZones.jl package, which compiles the IANA time zone database. Both Date and DateTime are based on the ISO 8601 standard, which follows the proleptic Gregorian calendar. One note is that the ISO 8601 standard is particular about BC/BCE dates. In general, the last day of the BC/BCE era, 1-12-31 BC/BCE, was followed by 1-1-1 AD/CE, thus no year zero exists. The ISO standard, however, states that 1 BC/BCE is year zero, so 0000-12-31 is the day before 0001-01-01, and year -0001 (yes, negative one for the year) is 2 BC/BCE, year -0002 is 3 BC/BCE, etc.footnote: [1]\nnThe notion of the UT second is actually quite fundamental. There are basically two different notions of time generally accepted, one based on the physical rotation of the earth (one full rotation = 1 day), the other based on the SI second (a fixed, constant value). These are radically different! Think about it, a \"UT second\", as defined relative to the rotation of the earth, may have a different absolute length depending on the day! Anyway, the fact that Date and DateTime are based on UT seconds is a simplifying, yet honest assumption so that things like leap seconds and all their complexity can be avoided. This basis of time is formally called UT or UT1. Basing types on the UT second basically means that every minute has 60 seconds and every day has 24 hours and leads to more natural calculations when working with calendar dates."
},

{
    "location": "manual/dates.html#Constructors-1",
    "title": "Constructors",
    "category": "Section",
    "text": "Date and DateTime types can be constructed by integer or Period types, by parsing, or through adjusters (more on those later):julia> DateTime(2013)\nn2013-01-01T00:00:00\nn\nnjulia> DateTime(2013,7)\nn2013-07-01T00:00:00\nn\nnjulia> DateTime(2013,7,1)\nn2013-07-01T00:00:00\nn\nnjulia> DateTime(2013,7,1,12)\nn2013-07-01T12:00:00\nn\nnjulia> DateTime(2013,7,1,12,30)\nn2013-07-01T12:30:00\nn\nnjulia> DateTime(2013,7,1,12,30,59)\nn2013-07-01T12:30:59\nn\nnjulia> DateTime(2013,7,1,12,30,59,1)\nn2013-07-01T12:30:59.001\nn\nnjulia> Date(2013)\nn2013-01-01\nn\nnjulia> Date(2013,7)\nn2013-07-01\nn\nnjulia> Date(2013,7,1)\nn2013-07-01\nn\nnjulia> Date(Dates.Year(2013),Dates.Month(7),Dates.Day(1))\nn2013-07-01\nn\nnjulia> Date(Dates.Month(7),Dates.Year(2013))\nn2013-07-01Date or DateTime parsing is accomplished by the use of format strings. Format strings work by the notion of defining delimited or fixed-width \"slots\" that contain a period to parse and passing the text to parse and format string to a Date or DateTime constructor, of the form Date(\"2015-01-01\",\"y-m-d\") or DateTime(\"20150101\",\"yyyymmdd\").Delimited slots are marked by specifying the delimiter the parser should expect between two subsequent periods; so \"y-m-d\" lets the parser know that between the first and second slots in a date string like \"2014-07-16\", it should find the - character. The y, m, and d characters let the parser know which periods to parse in each slot.Fixed-width slots are specified by repeating the period character the number of times corresponding to the width with no delimiter between characters. So \"yyyymmdd\" would correspond to a date string like \"20140716\". The parser distinguishes a fixed-width slot by the absence of a delimiter, noting the transition \"yyyymm\" from one period character to the next.Support for text-form month parsing is also supported through the u and U characters, for abbreviated and full-length month names, respectively. By default, only English month names are supported, so u corresponds to \"Jan\", \"Feb\", \"Mar\", etc. And U corresponds to \"January\", \"February\", \"March\", etc. Similar to other name=>value mapping functions dayname() and monthname(), custom locales can be loaded by passing in the locale=>Dict{String,Int} mapping to the MONTHTOVALUEABBR and MONTHTOVALUE dicts for abbreviated and full-name month names, respectively.One note on parsing performance: using the Date(date_string,format_string) function is fine if only called a few times. If there are many similarly formatted date strings to parse however, it is much more efficient to first create a Dates.DateFormat, and pass it instead of a raw format string.julia> df = Dates.DateFormat(\"y-m-d\");\nn\nnjulia> dt = Date(\"2015-01-01\",df)\nn2015-01-01\nn\nnjulia> dt2 = Date(\"2015-01-02\",df)\nn2015-01-02A full suite of parsing and formatting tests and examples is available in tests/dates/io.jl."
},

{
    "location": "manual/dates.html#Durations/Comparisons-1",
    "title": "Durations/Comparisons",
    "category": "Section",
    "text": "Finding the length of time between two Date or DateTime is straightforward given their underlying representation as UTInstant{Day} and UTInstant{Millisecond}, respectively. The difference between Date is returned in the number of Day, and DateTime in the number of Millisecond. Similarly, comparing TimeType is a simple matter of comparing the underlying machine instants (which in turn compares the internal Int64 values).julia> dt = Date(2012,2,29)\nn2012-02-29\nn\nnjulia> dt2 = Date(2000,2,1)\nn2000-02-01\nn\nnjulia> dump(dt)\nnDate\nn  instant: UTInstant{Day}\nn    periods: Day\nn      value: Int64 734562\nn\nnjulia> dump(dt2)\nnDate\nninstant: UTInstant{Day}\nn  periods: Day\nn    value: Int64 730151\nn\nnjulia> dt > dt2\nntrue\nn\nnjulia> dt != dt2\nntrue\nn\nnjulia> dt + dt2\nnOperation not defined for TimeTypes\nn\nnjulia> dt * dt2\nnOperation not defined for TimeTypes\nn\nnjulia> dt / dt2\nnOperation not defined for TimeTypes\nn\nnjulia> dt - dt2\nn4411 days\nn\nnjulia> dt2 - dt\nn-4411 days\nn\nnjulia> dt = DateTime(2012,2,29)\nn2012-02-29T00:00:00\nn\nnjulia> dt2 = DateTime(2000,2,1)\nn2000-02-01T00:00:00\nn\nnjulia> dt - dt2\nn381110402000 milliseconds"
},

{
    "location": "manual/dates.html#Accessor-Functions-1",
    "title": "Accessor Functions",
    "category": "Section",
    "text": "Because the Date and DateTime types are stored as single Int64 values, date parts or fields can be retrieved through accessor functions. The lowercase accessors return the field as an integer:julia> t = Date(2014,1,31)\nn2014-01-31\nn\nnjulia> Dates.year(t)\nn2014\nn\nnjulia> Dates.month(t)\nn1\nn\nnjulia> Dates.week(t)\nn5\nn\nnjulia> Dates.day(t)\nn31While propercase return the same value in the corresponding Period type:julia> Dates.Year(t)\nn2014 years\nn\nnjulia> Dates.Day(t)\nn31 daysCompound methods are provided, as they provide a measure of efficiency if multiple fields are needed at the same time:julia> Dates.yearmonth(t)\nn(2014,1)\nn\nnjulia> Dates.monthday(t)\nn(1,31)\nn\nnjulia> Dates.yearmonthday(t)\nn(2014,1,31)One may also access the underlying UTInstant or integer value:julia> dump(t)\nnDate\nninstant: UTInstant{Day}\nn  periods: Day\nn    value: Int64 735264\nn\nnjulia> t.instant\nnUTInstant{Day}(735264 days)\nn\nnjulia> Dates.value(t)\nn735264"
},

{
    "location": "manual/dates.html#Query-Functions-1",
    "title": "Query Functions",
    "category": "Section",
    "text": "Query functions provide calendrical information about a TimeType. They include information about the day of the week:julia> t = Date(2014,1,31)\nn2014-01-31\nn\nnjulia> Dates.dayofweek(t)\nn5\nn\nnjulia> Dates.dayname(t)\nn\"Friday\"\nn\nnjulia> Dates.dayofweekofmonth(t)\nn5  # 5th Friday of JanuaryMonth of the year:julia> Dates.monthname(t)\nn\"January\"\nn\nnjulia> Dates.daysinmonth(t)\nn31As well as information about the TimeType's year and quarter:julia> Dates.isleapyear(t)\nnfalse\nn\nnjulia> Dates.dayofyear(t)\nn31\nn\nnjulia> Dates.quarterofyear(t)\nn1\nn\nnjulia> Dates.dayofquarter(t)\nn31The dayname() and monthname() methods can also take an optional locale keyword that can be used to return the name of the day or month of the year for other languages/locales:julia> const french_daysofweek = Dict(1=>\"Lundi\",2=>\"Mardi\",3=>\"Mercredi\",4=>\"Jeudi\",5=>\"Vendredi\",6=>\"Samedi\",7=>\"Dimanche\");\nn\nn# Load the mapping into the Dates module under locale name \"french\"\nnjulia> Dates.VALUETODAYOFWEEK[\"french\"] = french_daysofweek;\nn\nnjulia> Dates.dayname(t;locale=\"french\")\nn\"Vendredi\"Similarly for the monthname() function, a mapping of locale=>Dict{Int,String} should be loaded in VALUETOMONTH."
},

{
    "location": "manual/dates.html#TimeType-Period-Arithmetic-1",
    "title": "TimeType-Period Arithmetic",
    "category": "Section",
    "text": "It's good practice when using any language/date framework to be familiar with how date-period arithmetic is handled as there are some tricky issues to deal with (though much less so for day-precision types).The Dates module approach tries to follow the simple principle of trying to change as little as possible when doing Period arithmetic. This approach is also often known as calendrical arithmetic or what you would probably guess if someone were to ask you the same calculation in a conversation. Why all the fuss about this? Let's take a classic example: add 1 month to January 31st, 2014. What's the answer? Javascript will say March 3 (assumes 31 days). PHP says March 2 (assumes 30 days). The fact is, there is no right answer. In the Dates module, it gives the result of February 28th. How does it figure that out? I like to think of the classic 7-7-7 gambling game in casinos.Now just imagine that instead of 7-7-7, the slots are Year-Month-Day, or in our example, 2014-01-31. When you ask to add 1 month to this date, the month slot is incremented, so now we have 2014-02-31. Then the day number is checked if it is greater than the last valid day of the new month; if it is (as in the case above), the day number is adjusted down to the last valid day (28). What are the ramifications with this approach? Go ahead and add another month to our date, 2014-02-28 + Month(1) == 2014-03-28. What? Were you expecting the last day of March? Nope, sorry, remember the 7-7-7 slots. As few slots as possible are going to change, so we first increment the month slot by 1, 2014-03-28, and boom, we're done because that's a valid date. On the other hand, if we were to add 2 months to our original date, 2014-01-31, then we end up with 2014-03-31, as expected. The other ramification of this approach is a loss in associativity when a specific ordering is forced (i.e. adding things in different orders results in different outcomes). For example:julia> (Date(2014,1,29)+Dates.Day(1)) + Dates.Month(1)\nn2014-02-28\nn\nnjulia> (Date(2014,1,29)+Dates.Month(1)) + Dates.Day(1)\nn2014-03-01What's going on there? In the first line, we're adding 1 day to January 29th, which results in 2014-01-30; then we add 1 month, so we get 2014-02-30, which then adjusts down to 2014-02-28. In the second example, we add 1 month first, where we get 2014-02-29, which adjusts down to 2014-02-28, and then add 1 day, which results in 2014-03-01. One design principle that helps in this case is that, in the presence of multiple Periods, the operations will be ordered by the Periods' types, not their value or positional order; this means Year will always be added first, then Month, then Week, etc. Hence the following does result in associativity and Just Works:julia> Date(2014,1,29) + Dates.Day(1) + Dates.Month(1)\nn2014-03-01\nn\nnjulia> Date(2014,1,29) + Dates.Month(1) + Dates.Day(1)\nn2014-03-01Tricky? Perhaps. What is an innocent Dates user to do? The bottom line is to be aware that explicitly forcing a certain associativity, when dealing with months, may lead to some unexpected results, but otherwise, everything should work as expected. Thankfully, that's pretty much the extent of the odd cases in date-period arithmetic when dealing with time in UT (avoiding the \"joys\" of dealing with daylight savings, leap seconds, etc.)."
},

{
    "location": "manual/dates.html#Adjuster-Functions-1",
    "title": "Adjuster Functions",
    "category": "Section",
    "text": "As convenient as date-period arithmetics are, often the kinds of calculations needed on dates take on a calendrical or temporal nature rather than a fixed number of periods. Holidays are a perfect example; most follow rules such as \"Memorial Day = Last Monday of May\", or \"Thanksgiving = 4th Thursday of November\". These kinds of temporal expressions deal with rules relative to the calendar, like first or last of the month, next Tuesday, or the first and third Wednesdays, etc.The Dates module provides the adjuster API through several convenient methods that aid in simply and succinctly expressing temporal rules. The first group of adjuster methods deal with the first and last of weeks, months, quarters, and years. They each take a single TimeType as input and return or adjust to the first or last of the desired period relative to the input.# Adjusts the input to the Monday of the input's week\nnjulia> Dates.firstdayofweek(Date(2014,7,16))\nn2014-07-14\nn\nn# Adjusts to the last day of the input's month\nnjulia> Dates.lastdayofmonth(Date(2014,7,16))\nn2014-07-31\nn\nn# Adjusts to the last day of the input's quarter\nnjulia> Dates.lastdayofquarter(Date(2014,7,16))\nn2014-09-30The next two higher-order methods, tonext(), and toprev(), generalize working with temporal expressions by taking a DateFunction as first argument, along with a starting TimeType. A DateFunction is just a function, usually anonymous, that takes a single TimeType as input and returns a Bool, true indicating a satisfied adjustment criterion. For example:julia> istuesday = x->Dates.dayofweek(x) == Dates.Tuesday  # Returns true if the day of the week of x is Tuesday\nn(anonymous function)\nn\nnjulia> Dates.tonext(istuesday, Date(2014,7,13)) # 2014-07-13 is a Sunday\nn2014-07-15\nn\nn# Convenience method provided for day of the week adjustments\nnjulia> Dates.tonext(Date(2014,7,13), Dates.Tuesday)\nn2014-07-15This is useful with the do-block syntax for more complex temporal expressions:julia> Dates.tonext(Date(2014,7,13)) do x\nn          # Return true on the 4th Thursday of November (Thanksgiving)\nn          Dates.dayofweek(x) == Dates.Thursday &&\nn          Dates.dayofweekofmonth(x) == 4 &&\nn          Dates.month(x) == Dates.November\nn      end\nn2014-11-27The final method in the adjuster API is the recur() function. recur() vectorizes the adjustment process by taking a start and stop date (optionally specificed by a StepRange), along with a DateFunction to specify all valid dates/moments to be returned in the specified range. In this case, the DateFunction is often referred to as the \"inclusion\" function because it specifies (by returning true) which dates/moments should be included in the returned vector of dates.# Pittsburgh street cleaning; Every 2nd Tuesday from April to November\nn# Date range from January 1st, 2014 to January 1st, 2015\nnjulia> dr = Dates.Date(2014):Dates.Date(2015);\nnjulia> recur(dr) do x\nn           Dates.dayofweek(x) == Dates.Tue &&\nn           Dates.April <= Dates.month(x) <= Dates.Nov &&\nn           Dates.dayofweekofmonth(x) == 2\nn       end\nn 8-element Array{Date,1}:\nn  2014-04-08\nn  2014-05-13\nn  2014-06-10\nn  2014-07-08\nn  2014-08-12\nn  2014-09-09\nn  2014-10-14\nn  2014-11-11Additional examples and tests are available in test/dates/adjusters.jl."
},

{
    "location": "manual/dates.html#Period-Types-1",
    "title": "Period Types",
    "category": "Section",
    "text": "Periods are a human view of discrete, sometimes irregular durations of time. Consider 1 month; it could represent, in days, a value of 28, 29, 30, or 31 depending on the year and month context. Or a year could represent 365 or 366 days in the case of a leap year. Period types are simple Int64 wrappers and are constructed by wrapping any Int64 convertible type, i.e. Year(1) or Month(3.0). Arithmetic between Period of the same type behave like integers, and limited Period-Real arithmetic is available.julia> y1 = Dates.Year(1)\nn1 year\nn\nnjulia> y2 = Dates.Year(2)\nn2 years\nn\nnjulia> y3 = Dates.Year(10)\nn10 years\nn\nnjulia> y1 + y2\nn3 years\nn\nnjulia> div(y3,y2)\nn5 years\nn\nnjulia> y3 - y2\nn8 years\nn\nnjulia> y3 * y2\nn20 years\nn\nnjulia> y3 % y2\nn0 years\nn\nnjulia> y1 + 20\nn21 years\nn\nnjulia> div(y3,3) # mirrors integer division\nn3 years"
},

{
    "location": "manual/dates.html#Rounding-1",
    "title": "Rounding",
    "category": "Section",
    "text": "Date and DateTime values can be rounded to a specified resolution (e.g., 1 month or 15 minutes) with floor(), ceil(), or round():julia> floor(Date(1985, 8, 16), Dates.Month)\nn1985-08-01\nn\nnjulia> ceil(DateTime(2013, 2, 13, 0, 31, 20), Dates.Minute(15))\nn2013-02-13T00:45:00\nn\nnjulia> round(DateTime(2016, 8, 6, 20, 15), Dates.Day)\nn2016-08-07T00:00:00Unlike the numeric round() method, which breaks ties toward the even number by default, the TimeTyperound() method uses the RoundNearestTiesUp rounding mode. (It's difficult to guess what breaking ties to nearest \"even\" TimeType would entail.) Further details on the available RoundingMode s can be found in the API reference.Rounding should generally behave as expected, but there are a few cases in which the expected behaviour is not obvious."
},

{
    "location": "manual/documentation.html",
    "title": "Documentation",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/documentation.html#Documentation-1",
    "title": "Documentation",
    "category": "Section",
    "text": "Julia enables package developers and users to document functions, types and other objects easily via a built-in documentation system since Julia 0.4.tip: \nnThis documentation system can also be used in Julia 0.3 via the Docile.jl package; see the documentation for that package for more details.The basic syntax is very simple: any string appearing at the top-level right before an object (function, macro, type or instance) will be interpreted as documenting it (these are called docstrings). Here is a very simple example:\"Tell whether there are too foo items in the array.\"\nnfoo(xs::Array) = ...Documentation is interpreted as Markdown, so you can use indentation and code fences to delimit code examples from text. Technically, any object can be associated with any other as metadata; Markdown happens to be the default, but one can construct other string macros and pass them to the @doc macro just as well.Here is a more complex example, still using Markdown:\"\"\"\nn    bar(x[, y])\nn\nnCompute the Bar index between `x` and `y`. If `y` is missing, compute\nnthe Bar index between all pairs of columns of `x`.\nn\nn# Examples\nn```julia\nnjulia> bar([1, 2], [1, 2])\nn1\nn```\nn\"\"\"\nnfunction bar(x, y) ...As in the example above, we recommend following some simple conventions when writing documentation:Always show the signature of a function at the top of the documentation, with a four-space indent so that it is printed as Julia code.\nnInclude a single one-line sentence describing what the function does or what the object represents after the simplified signature block. If needed, provide more details in a second paragraph, after a blank line.\nnDo not repeat yourself.\nnOnly provide an argument list when really necessary.For simple functions, it is often clearer to mention the role of the arguments directly in the description of the function's purpose. An argument list would only repeat information already provided elsewhere. However, providing an argument list can be a good idea for complex functions with many arguments (in particular keyword arguments). In that case, insert it after the general description of the function, under an # Arguments header, with one * bullet for each argument. The list should mention the types and default values (if any) of the arguments:\"\"\"\nn...\nn# Arguments\nn* `n::Integer`: the number of elements to compute.\nn* `dim::Integer=1`: the dimensions along which to perform the computation.\nn...\nn\"\"\"Group examples under an # Examples section and use ``julia blocks instead of standard text.\nnUse backticks to identify code and equations.\nnPlace the starting and ending \"\"\" characters on lines by themselves.That is, write:\"\"\"\nn...\nn\nn...\nn\"\"\"\nnf(x, y) = ...rather than:\"\"\"...\nn\nn...\"\"\"\nnf(x, y) = ...This makes it more clear where docstrings start and end.Respect the line length limit used in the surrounding code."
},

{
    "location": "manual/documentation.html#Accessing-Documentation-1",
    "title": "Accessing Documentation",
    "category": "Section",
    "text": "Documentation can be accessed at the REPL or in IJulia by typing ? followed by the name of a function or macro, and pressing Enter. For example,?fft\nn?@time\nn?r\"\"will bring up docs for the relevant function, macro or string macro respectively. In Juno using Ctrl-D will bring up documentation for the object under the cursor."
},

{
    "location": "manual/documentation.html#Functions-and-Methods-1",
    "title": "Functions & Methods",
    "category": "Section",
    "text": "Functions in Julia may have multiple implementations, known as methods. While it's good practice for generic functions to have a single purpose, Julia allows methods to be documented individually if necessary. In general, only the most generic method should be documented, or even the function itself (i.e. the object created without any methods by function bar end). Specific methods should only be documented if their behaviour differs from the more generic ones. In any case, they should not repeat the information provided elsewhere. For example:\"\"\"\nnMultiplication operator. `x*y*z*...` calls this function with multiple\nnarguments, i.e. `*(x,y,z...)`.\nn\"\"\"\nnfunction *(x, y)\nn  # ... [implementation sold separately] ...\nnend\nn\nn\"When applied to strings, concatenates them.\"\nnfunction *(x::AbstractString, y::AbstractString)\nn  # ... [insert secret sauce here] ...\nnend\nn\nnhelp?>*\nnMultiplication operator. `x*y*z*...` calls this function with multiple\nnarguments, i.e. `*(x,y,z...)`.\nn\nnWhen applied to strings, concatenates them.When retrieving documentation for a generic function, the metadata for each method is concatenated with the catdoc function, which can of course be overridden for custom types."
},

{
    "location": "manual/documentation.html#Advanced-Usage-1",
    "title": "Advanced Usage",
    "category": "Section",
    "text": "The @doc macro associates its first argument with its second in a per-module dictionary called META. By default, documentation is expected to be written in Markdown, and the doc\"\" string macro simply creates an object representing the Markdown content. In the future it is likely to do more advanced things such as allowing for relative image or link paths.When used for retrieving documentation, the @doc macro (or equally, the doc function) will search all META dictionaries for metadata relevant to the given object and return it. The returned object (some Markdown content, for example) will by default display itself intelligently. This design also makes it easy to use the doc system in a programmatic way; for example, to re-use documentation between different versions of a function:@doc \"...\" foo!\nn@doc (@doc foo!) fooOr for use with Julia's metaprogramming functionality:for (f, op) in ((:add, :+), (:subtract, :-), (:multiply, :*), (:divide, :/))\nn    @eval begin\nn        $f(a,b) = $op(a,b)\nn    end\nnend\nn@doc \"`add(a,b)` adds `a` and `b` together\" add\nn@doc \"`subtract(a,b)` subtracts `b` from `a`\" subtractDocumentation written in non-toplevel blocks, such as if, for, and let, are not automatically added to the documentation system. @doc must be used in these cases. For example:if VERSION > v\"0.4\"\nn    \"...\"\nn    f(x) = x\nnendwill not add any documentation to f even when the condition is true and must instead be written as:if VERSION > v\"0.4\"\nn    @doc \"...\" ->\nn    f(x) = x\nnend"
},

{
    "location": "manual/documentation.html#Syntax-Guide-1",
    "title": "Syntax Guide",
    "category": "Section",
    "text": "A comprehensive overview of all documentable Julia syntax.In the following examples \"...\" is used to illustrate an arbitrary docstring which may be one of the follow four variants and contain arbitrary text:\"...\"\nn\nndoc\"...\"\nn\nn\"\"\"\nn...\nn\"\"\"\nn\nndoc\"\"\"\nn...\nn\"\"\"@doc_str should only be used when the docstring contains $ or \ characters that should not be parsed by Julia such as LaTeX syntax or Julia source code examples containing interpolation."
},

{
    "location": "manual/documentation.html#Functions-and-Methods-2",
    "title": "Functions and Methods",
    "category": "Section",
    "text": "\"...\"\nnfunction f end\nn\nn\"...\"\nnfAdds docstring \"...\" to Functionf. The first version is the preferred syntax, however both are equivalent.\"...\"\nnf(x) = x\nn\nn\"...\"\nnfunction f(x)\nn    x\nnend\nn\nn\"...\"\nnf(x)Adds docstring \"...\" to Methodf(::Any).\"...\"\nnf(x, y = 1) = x + yAdds docstring \"...\" to two Methods, namely f(::Any) and f(::Any, ::Any)."
},

{
    "location": "manual/documentation.html#Macros-1",
    "title": "Macros",
    "category": "Section",
    "text": "\"...\"\nnmacro m(x) endAdds docstring \"...\" to the @m(::Any) macro definition.\"...\"\nn:(@m)Adds docstring \"...\" to the macro named @m."
},

{
    "location": "manual/documentation.html#Types-1",
    "title": "Types",
    "category": "Section",
    "text": "\"...\"\nnabstract T1\nn\nn\"...\"\nntype T2\nn    ...\nnend\nn\nn\"...\"\nnimmutable T3\nn    ...\nnendAdds the docstring \"...\" to types T1, T2, and T3.\"...\"\nntype T\nn    \"x\"\nn    x\nn    \"y\"\nn    y\nnendAdds docstring \"...\" to type T, \"x\" to field T.x and \"y\" to field T.y. Also applicable to immutable types.\"...\"\nntypealias A TAdds docstring \"...\" to the BindingA.Bindings are used to store a reference to a particular Symbol in a Module without storing the referenced value itself."
},

{
    "location": "manual/documentation.html#Modules-1",
    "title": "Modules",
    "category": "Section",
    "text": "\"...\"\nnmodule M end\nn\nnmodule M\nn\nn\"...\"\nnM\nn\nnendAdds docstring \"...\" to the ModuleM. Adding the docstring above the Module is the preferred syntax, however both are equivalent.\"...\"\nnbaremodule M\nn# ...\nnend\nn\nnbaremodule M\nn\nnimport Base: @doc\nn\nn\"...\"\nnf(x) = x\nn\nnendDocumenting a baremodule by placing a docstring above the expression automatically imports @doc into the module. These imports must be done manually when the module expression is not documented. Empty baremodules cannot be documented."
},

{
    "location": "manual/documentation.html#Global-Variables-1",
    "title": "Global Variables",
    "category": "Section",
    "text": "\"...\"\nnconst a = 1\nn\nn\"...\"\nnb = 2\nn\nn\"...\"\nnglobal c = 3Adds docstring \"...\" to the Bindings a, b, and c.\"...\"\nnsymAdds docstring \"...\" to the value associated with sym. Users should prefer documenting sym at it's definition."
},

{
    "location": "manual/documentation.html#Multiple-Objects-1",
    "title": "Multiple Objects",
    "category": "Section",
    "text": "\"...\"\nna, bAdds docstring \"...\" to a and b each of which should be a documentable expression. This syntax is equivalent to\"...\"\nna\nn\nn\"...\"\nnbAny number of expressions many be documented together in this way. This syntax can be useful when two functions are related, such as non-mutating and mutating versions f and f!."
},

{
    "location": "manual/documentation.html#Core.@__doc__",
    "title": "Core.@__doc__",
    "category": "Macro",
    "text": ""
},

{
    "location": "manual/documentation.html#Macro-generated-code-1",
    "title": "Macro-generated code",
    "category": "Section",
    "text": "\"...\"\nn@m expressionAdds docstring \"...\" to expression generated by expanding @m expression. This allows for expressions decorated with @inline, @noinline, @generated, or any other macro to be documented in the same way as undecorated expressions.Macro authors should take note that only macros that generate a single expression will automatically support docstrings. If a macro returns a block containing multiple subexpressions then the subexpression that should be documented must be marked using the @__doc__() macro.The @enum macro makes use of @__doc__ to allow for documenting Enums. Examining it's definition should serve as an example of how to use @__doc__ correctly.Core.@__doc__"
},

{
    "location": "manual/embedding.html",
    "title": "Embedding Julia",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/embedding.html#Embedding-Julia-1",
    "title": "Embedding Julia",
    "category": "Section",
    "text": "As we have seen in Calling C and Fortran Code, Julia has a simple and efficient way to call functions written in C. But there are situations where the opposite is needed: calling Julia function from C code. This can be used to integrate Julia code into a larger C/C++ project, without the need to rewrite everything in C/C++. Julia has a C API to make this possible. As almost all programming languages have some way to call C functions, the Julia C API can also be used to build further language bridges (e.g. calling Julia from Python or C#)."
},

{
    "location": "manual/embedding.html#High-Level-Embedding-1",
    "title": "High-Level Embedding",
    "category": "Section",
    "text": "We start with a simple C program that initializes Julia and calls some Julia code:#include <julia.h>\nn\nnint main(int argc, char *argv[])\nn{\nn    /* required: setup the Julia context */\nn    jl_init(NULL);\nn\nn    /* run Julia commands */\nn    jl_eval_string(\"print(sqrt(2.0))\");\nn\nn    /* strongly recommended: notify Julia that the\nn         program is about to terminate. this allows\nn         Julia time to cleanup pending write requests\nn         and run all finalizers\nn    */\nn    jl_atexit_hook(0);\nn    return 0;\nn}In order to build this program you have to put the path to the Julia header into the include path and link against libjulia. For instance, when Julia is installed to $JULIA_DIR, one can compile the above test program test.c with gcc using:gcc -o test -fPIC -I$JULIA_DIR/include/julia -L$JULIA_DIR/lib test.c -ljulia $JULIA_DIR/lib/julia/libstdc++.so.6Then if the environment variable JULIA_HOME is set to $JULIA_DIR/bin, the output test program can be executed.Alternatively, look at the embedding.c program in the Julia source tree in the examples/ folder. The file ui/repl.c program is another simple example of how to set jl_options options while linking against libjulia.The first thing that has to be done before calling any other Julia C function is to initialize Julia. This is done by calling jl_init, which takes as argument a C string (const char*) to the location where Julia is installed. When the argument is NULL, Julia tries to determine the install location automatically.The second statement in the test program evaluates a Julia statement using a call to jl_eval_string.Before the program terminates, it is strongly recommended to call jl_atexit_hook.  The above example program calls this before returning from main.note: \nnCurrently, dynamically linking with the libjulia shared library requires passing the RTLD_GLOBAL option. In Python, this looks like:>>> julia=CDLL('./libjulia.dylib',RTLD_GLOBAL)\nn>>> julia.jl_init.argtypes = [c_char_p]\nn>>> julia.jl_init('.')\nn250593296note: \nnIf the julia program needs to access symbols from the main executable, it may be necessary to add -Wl,--export-dynamic linker flag at compile time on Linux in addition to the ones generated by julia-config.jl described below. This is not necessary when compiling a shared library."
},

{
    "location": "manual/embedding.html#Using-julia-config-to-automatically-determine-build-parameters-1",
    "title": "Using julia-config to automatically determine build parameters",
    "category": "Section",
    "text": "The script julia-config.jl was created to aid in determining what build parameters are required by a program that uses embedded Julia.  This script uses the build parameters and system configuration of the particular Julia distribution it is invoked by to export the necessary compiler flags for an embedding program to interact with that distribution.  This script is located in the Julia shared data directory."
},

{
    "location": "manual/embedding.html#Example-1",
    "title": "Example",
    "category": "Section",
    "text": "Below is essentially the same as above with one small change; the argument to jl_init is now JULIA_INIT_DIR which is defined by julia-config.jl.:#include <julia.h>\nn\nnint main(int argc, char *argv[])\nn{\nn   jl_init(JULIA_INIT_DIR);\nn   (void)jl_eval_string(\"println(sqrt(2.0))\");\nn   jl_atexit_hook(0);\nn   return 0;\nn}"
},

{
    "location": "manual/embedding.html#On-the-command-line-1",
    "title": "On the command line",
    "category": "Section",
    "text": "A simple use of this script is from the command line.  Assuming that julia-config.jl is located in /usr/local/julia/share/julia, it can be invoked on the command line directly and takes any combination of 3 flags:/usr/local/julia/share/julia/julia-config.jl\nnUsage: julia-config [--cflags|--ldflags|--ldlibs]If the above example source is saved in the file embed_example.c, then the following command will compile it into a running program on Linux and Windows (MSYS2 environment), or if on OS/X, then substitute clang for gcc.:/usr/local/julia/share/julia/julia-config.jl --cflags --ldflags --ldlibs | xargs gcc embed_example.c"
},

{
    "location": "manual/embedding.html#Use-in-Makefiles-1",
    "title": "Use in Makefiles",
    "category": "Section",
    "text": "But in general, embedding projects will be more complicated than the above, and so the following allows general makefile support as well – assuming GNU make because of the use of the shell macro expansions.  Additionally, though many times julia-config.jl may be found in the directory /usr/local, this is not necessarily the case, but Julia can be used to locate julia-config.jl too, and the makefile can be used to take advantage of that.  The above example is extended to use a Makefile:JL_SHARE = $(shell julia -e 'print(joinpath(JULIA_HOME,Base.DATAROOTDIR,\"julia\"))')\nnCFLAGS   += $(shell $(JL_SHARE)/julia-config.jl --cflags)\nnCXXFLAGS += $(shell $(JL_SHARE)/julia-config.jl --cflags)\nnLDFLAGS  += $(shell $(JL_SHARE)/julia-config.jl --ldflags)\nnLDLIBS   += $(shell $(JL_SHARE)/julia-config.jl --ldlibs)\nn\nnall: embed_exampleNow the build command is simply make."
},

{
    "location": "manual/embedding.html#Converting-Types-1",
    "title": "Converting Types",
    "category": "Section",
    "text": "Real applications will not just need to execute expressions, but also return their values to the host program. jl_eval_string returns a jl_value_t*, which is a pointer to a heap-allocated Julia object. Storing simple data types like Float64 in this way is called boxing, and extracting the stored primitive data is called unboxing. Our improved sample program that calculates the square root of 2 in Julia and reads back the result in C looks as follows:jl_value_t *ret = jl_eval_string(\"sqrt(2.0)\");\nn\nnif (jl_is_float64(ret)) {\nn    double ret_unboxed = jl_unbox_float64(ret);\nn    printf(\"sqrt(2.0) in C: %e \n\", ret_unboxed);\nn}In order to check whether ret is of a specific Julia type, we can use the jl_is_... functions. By typing typeof(sqrt(2.0)) into the Julia shell we can see that the return type is Float64 (double in C). To convert the boxed Julia value into a C double the jl_unbox_float64 function is used in the above code snippet.Corresponding jl_box_... functions are used to convert the other way:jl_value_t *a = jl_box_float64(3.0);\nnjl_value_t *b = jl_box_float32(3.0f);\nnjl_value_t *c = jl_box_int32(3);As we will see next, boxing is required to call Julia functions with specific arguments."
},

{
    "location": "manual/embedding.html#Calling-Julia-Functions-1",
    "title": "Calling Julia Functions",
    "category": "Section",
    "text": "While jl_eval_string allows C to obtain the result of a Julia expression, it does not allow passing arguments computed in C to Julia. For this you will need to invoke Julia functions directly, using jl_call:jl_function_t *func = jl_get_function(jl_base_module, \"sqrt\");\nnjl_value_t *argument = jl_box_float64(2.0);\nnjl_value_t *ret = jl_call1(func, argument);In the first step, a handle to the Julia function sqrt is retrieved by calling jl_get_function. The first argument passed to jl_get_function is a pointer to the Base module in which sqrt is defined. Then, the double value is boxed using jl_box_float64. Finally, in the last step, the function is called using jl_call1. jl_call0, jl_call2, and jl_call3 functions also exist, to conveniently handle different numbers of arguments. To pass more arguments, use jl_call:jl_value_t *jl_call(jl_function_t *f, jl_value_t **args, int32_t nargs)Its second argument args is an array of jl_value_t* arguments and nargs is the number of arguments."
},

{
    "location": "manual/embedding.html#Memory-Management-1",
    "title": "Memory Management",
    "category": "Section",
    "text": "As we have seen, Julia objects are represented in C as pointers. This raises the question of who is responsible for freeing these objects.Typically, Julia objects are freed by a garbage collector (GC), but the GC does not automatically know that we are holding a reference to a Julia value from C. This means the GC can free objects out from under you, rendering pointers invalid.The GC can only run when Julia objects are allocated. Calls like jl_box_float64 perform allocation, and allocation might also happen at any point in running Julia code. However, it is generally safe to use pointers in between jl_... calls. But in order to make sure that values can survive jl_... calls, we have to tell Julia that we hold a reference to a Julia value. This can be done using the JL_GC_PUSH macros:jl_value_t *ret = jl_eval_string(\"sqrt(2.0)\");\nnJL_GC_PUSH1(&ret);\nn// Do something with ret\nnJL_GC_POP();The JL_GC_POP call releases the references established by the previous JL_GC_PUSH. Note that JL_GC_PUSH  is working on the stack, so it must be exactly paired with a JL_GC_POP before the stack frame is destroyed.Several Julia values can be pushed at once using the JL_GC_PUSH2 , JL_GC_PUSH3 , and JL_GC_PUSH4 macros. To push an array of Julia values one can use the  JL_GC_PUSHARGS macro, which can be used as follows:jl_value_t **args;\nnJL_GC_PUSHARGS(args, 2); // args can now hold 2 `jl_value_t*` objects\nnargs[0] = some_value;\nnargs[1] = some_other_value;\nn// Do something with args (e.g. call jl_... functions)\nnJL_GC_POP();The garbage collector also operates under the assumption that it is aware of every old-generation object pointing to a young-generation one. Any time a pointer is updated breaking that assumption, it must be signaled to the collector with the jl_gc_wb (write barrier) function like so:jl_value_t *parent = some_old_value, *child = some_young_value;\nn((some_specific_type*)parent)->field = child;\nnjl_gc_wb(parent, child);It is in general impossible to predict which values will be old at runtime, so the write barrier must be inserted after all explicit stores. One notable exception is if the parent object was just allocated and garbage collection was not run since then. Remember that most jl_... functions can sometimes invoke garbage collection.The write barrier is also necessary for arrays of pointers when updating their data directly. For example:jl_array_t *some_array = ...; // e.g. a Vector{Any}\nnvoid **data = (void**)jl_array_data(some_array);\nnjl_value_t *some_value = ...;\nndata[0] = some_value;\nnjl_gc_wb(some_array, some_value);"
},

{
    "location": "manual/embedding.html#Manipulating-the-Garbage-Collector-1",
    "title": "Manipulating the Garbage Collector",
    "category": "Section",
    "text": "There are some functions to control the GC. In normal use cases, these should not be necessary.Function Description\nnjl_gc_collect() Force a GC run\nnjl_gc_enable(0) Disable the GC, return previous state as int\nnjl_gc_enable(1) Enable the GC,  return previous state as int\nnjl_gc_is_enabled() Return current state as int"
},

{
    "location": "manual/embedding.html#Working-with-Arrays-1",
    "title": "Working with Arrays",
    "category": "Section",
    "text": "Julia and C can share array data without copying. The next example will show how this works.Julia arrays are represented in C by the datatype jl_array_t*. Basically, jl_array_t is a struct that contains:Information about the datatype\nnA pointer to the data block\nnInformation about the sizes of the arrayTo keep things simple, we start with a 1D array. Creating an array containing Float64 elements of length 10 is done by:jl_value_t* array_type = jl_apply_array_type(jl_float64_type, 1);\nnjl_array_t* x          = jl_alloc_array_1d(array_type, 10);Alternatively, if you have already allocated the array you can generate a thin wrapper around its data:double *existingArray = (double*)malloc(sizeof(double)*10);\nnjl_array_t *x = jl_ptr_to_array_1d(array_type, existingArray, 10, 0);The last argument is a boolean indicating whether Julia should take ownership of the data. If this argument is non-zero, the GC will call free on the data pointer when the array is no longer referenced.In order to access the data of x, we can use jl_array_data:double *xData = (double*)jl_array_data(x);Now we can fill the array:for(size_t i=0; i<jl_array_len(x); i++)\nn    xData[i] = i;Now let us call a Julia function that performs an in-place operation on x:jl_function_t *func  = jl_get_function(jl_base_module, \"reverse!\");\nnjl_call1(func, (jl_value_t*)x);By printing the array, one can verify that the elements of x are now reversed."
},

{
    "location": "manual/embedding.html#Accessing-Returned-Arrays-1",
    "title": "Accessing Returned Arrays",
    "category": "Section",
    "text": "If a Julia function returns an array, the return value of jl_eval_string and jl_call can be cast to a jl_array_t*:jl_function_t *func  = jl_get_function(jl_base_module, \"reverse\");\nnjl_array_t *y = (jl_array_t*)jl_call1(func, (jl_value_t*)x);Now the content of y can be accessed as before using jl_array_data. As always, be sure to keep a reference to the array while it is in use."
},

{
    "location": "manual/embedding.html#Multidimensional-Arrays-1",
    "title": "Multidimensional Arrays",
    "category": "Section",
    "text": "Julia's multidimensional arrays are stored in memory in column-major order. Here is some code that creates a 2D array and accesses its properties:// Create 2D array of float64 type\nnjl_value_t *array_type = jl_apply_array_type(jl_float64_type, 2);\nnjl_array_t *x  = jl_alloc_array_2d(array_type, 10, 5);\nn\nn// Get array pointer\nndouble *p = (double*)jl_array_data(x);\nn// Get number of dimensions\nnint ndims = jl_array_ndims(x);\nn// Get the size of the i-th dim\nnsize_t size0 = jl_array_dim(x,0);\nnsize_t size1 = jl_array_dim(x,1);\nn\nn// Fill array with data\nnfor(size_t i=0; i<size1; i++)\nn    for(size_t j=0; j<size0; j++)\nn        p[j + size0*i] = i + j;Notice that while Julia arrays use 1-based indexing, the C API uses 0-based indexing (for example in calling jl_array_dim) in order to read as idiomatic C code."
},

{
    "location": "manual/embedding.html#Exceptions-1",
    "title": "Exceptions",
    "category": "Section",
    "text": "Julia code can throw exceptions. For example, consider:jl_eval_string(\"this_function_does_not_exist()\");This call will appear to do nothing. However, it is possible to check whether an exception was thrown:if (jl_exception_occurred())\nn    printf(\"%s \n\", jl_typeof_str(jl_exception_occurred()));If you are using the Julia C API from a language that supports exceptions (e.g. Python, C#, C++), it makes sense to wrap each call into libjulia with a function that checks whether an exception was thrown, and then rethrows the exception in the host language."
},

{
    "location": "manual/faq.html",
    "title": "Frequently Asked Questions",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/faq.html#Frequently-Asked-Questions-1",
    "title": "Frequently Asked Questions",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#Sessions-and-the-REPL-1",
    "title": "Sessions and the REPL",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#How-do-I-delete-an-object-in-memory?-1",
    "title": "How do I delete an object in memory?",
    "category": "Section",
    "text": "Julia does not have an analog of MATLAB's clear function; once a name is defined in a Julia session (technically, in module Main), it is always present.If memory usage is your concern, you can always replace objects with ones that consume less memory.  For example, if A is a gigabyte-sized array that you no longer need, you can free the memory with A = 0.  The memory will be released the next time the garbage collector runs; you can force this to happen with gc()."
},

{
    "location": "manual/faq.html#How-can-I-modify-the-declaration-of-a-type/immutable-in-my-session?-1",
    "title": "How can I modify the declaration of a type/immutable in my session?",
    "category": "Section",
    "text": "Perhaps you've defined a type and then realize you need to add a new field.  If you try this at the REPL, you get the error:ERROR: invalid redefinition of constant MyTypeTypes in module Main cannot be redefined.While this can be inconvenient when you are developing new code, there's an excellent workaround.  Modules can be replaced by redefining them, and so if you wrap all your new code inside a module you can redefine types and constants.  You can't import the type names into Main and then expect to be able to redefine them there, but you can use the module name to resolve the scope.  In other words, while developing you might use a workflow something like this:include(\"mynewcode.jl\")              # this defines a module MyModule\nnobj1 = MyModule.ObjConstructor(a, b)\nnobj2 = MyModule.somefunction(obj1)\nn# Got an error. Change something in \"mynewcode.jl\"\nninclude(\"mynewcode.jl\")              # reload the module\nnobj1 = MyModule.ObjConstructor(a, b) # old objects are no longer valid, must reconstruct\nnobj2 = MyModule.somefunction(obj1)   # this time it worked!\nnobj3 = MyModule.someotherfunction(obj2, c)\nn..."
},

{
    "location": "manual/faq.html#Functions-1",
    "title": "Functions",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#I-passed-an-argument-x-to-a-function,-modified-it-inside-that-function,-but-on-the-outside,-the-variable-x-is-still-unchanged.-Why?-1",
    "title": "I passed an argument x to a function, modified it inside that function, but on the outside, the variable x is still unchanged. Why?",
    "category": "Section",
    "text": "Suppose you call a function like this:julia> x = 10\nn10\nn\nnjulia> function change_value!(y)\nn           y = 17\nn       end\nnchange_value! (generic function with 1 method)\nn\nnjulia> change_value!(x)\nn17\nn\nnjulia> x # x is unchanged!\nn10In Julia, the binding of a variable x cannot be changed by passing x as an argument to a function. When calling change_value!(x) in the above example, y is a newly created variable, bound initially to the value of x, i.e. 10; then y is rebound to the constant 17, while the variable x of the outer scope is left untouched.But here is a thing you should pay attention to: suppose x is bound to an object of type Array (or any other mutable type). From within the function, you cannot \"unbind\" x from this Array, but you can change its content. For example:julia> x = [1,2,3]\nn3-element Array{Int64,1}:\nn1\nn2\nn3\nn\nnjulia> function change_array!(A)\nn           A[1] = 5\nn       end\nnchange_array! (generic function with 1 method)\nn\nnjulia> change_array!(x)\nn5\nn\nnjulia> x\nn3-element Array{Int64,1}:\nn5\nn2\nn3Here we created a function change_array!(), that assigns 5 to the first element of the passed array (bound to x at the call site, and bound to A within the function). Notice that, after the function call, x is still bound to the same array, but the content of that array changed: the variables A and x were distinct bindings refering to the same mutable Array object."
},

{
    "location": "manual/faq.html#Can-I-use-using-or-import-inside-a-function?-1",
    "title": "Can I use using or import inside a function?",
    "category": "Section",
    "text": "No, you are not allowed to have a using or import statement inside a function.  If you want to import a module but only use its symbols inside a specific function or set of functions, you have two options:Use import:\nnimport Foo  function bar(...)      ... refer to Foo symbols via Foo.baz ...  end\nnThis loads the module Foo and defines a variable Foo that refers to the module, but does not import any of the other symbols from the module into the current namespace.  You refer to the Foo symbols by their qualified names Foo.bar etc.\nnWrap your function in a module:\nnmodule Bar  export bar  using Foo  function bar(...)      ... refer to Foo.baz as simply baz ....  end  end  using Bar\nnThis imports all the symbols from Foo, but only inside the module Bar."
},

{
    "location": "manual/faq.html#What-does-the-...-operator-do?-1",
    "title": "What does the ... operator do?",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#The-two-uses-of-the-...-operator:-slurping-and-splatting-1",
    "title": "The two uses of the ... operator: slurping and splatting",
    "category": "Section",
    "text": "Many newcomers to Julia find the use of ... operator confusing. Part of what makes the ... operator confusing is that it means two different things depending on context."
},

{
    "location": "manual/faq.html#...-combines-many-arguments-into-one-argument-in-function-definitions-1",
    "title": "... combines many arguments into one argument in function definitions",
    "category": "Section",
    "text": "In the context of function definitions, the ... operator is used to combine many different arguments into a single argument. This use of ... for combining many different arguments into a single argument is called slurping:julia> function printargs(args...)\nn           @printf(\"%s\n\", typeof(args))\nn           for (i, arg) in enumerate(args)\nn               @printf(\"Arg %d = %s\n\", i, arg)\nn           end\nn       end\nnprintargs (generic function with 1 method)\nn\nnjulia> printargs(1, 2, 3)\nn(Int64,Int64,Int64)\nnArg 1 = 1\nnArg 2 = 2\nnArg 3 = 3If Julia were a language that made more liberal use of ASCII characters, the slurping operator might have been written as <-... instead of ...."
},

{
    "location": "manual/faq.html#...-splits-one-argument-into-many-different-arguments-in-function-calls-1",
    "title": "... splits one argument into many different arguments in function calls",
    "category": "Section",
    "text": "In contrast to the use of the ... operator to denote slurping many different arguments into one argument when defining a function, the ... operator is also used to cause a single function argument to be split apart into many different arguments when used in the context of a function call. This use of ... is called splatting:julia> function threeargs(a, b, c)\nn           @printf(\"a = %s::%s\n\", a, typeof(a))\nn           @printf(\"b = %s::%s\n\", b, typeof(b))\nn           @printf(\"c = %s::%s\n\", c, typeof(c))\nn       end\nnthreeargs (generic function with 1 method)\nn\nnjulia> vec = [1, 2, 3]\nn3-element Array{Int64,1}:\nn 1\nn 2\nn 3\nn\nnjulia> threeargs(vec...)\nna = 1::Int64\nnb = 2::Int64\nnc = 3::Int64If Julia were a language that made more liberal use of ASCII characters, the splatting operator might have been written as ...-> instead of ...."
},

{
    "location": "manual/faq.html#Types,-type-declarations,-and-constructors-1",
    "title": "Types, type declarations, and constructors",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#What-does-\"type-stable\"-mean?-1",
    "title": "What does \"type-stable\" mean?",
    "category": "Section",
    "text": "It means that the type of the output is predictable from the types of the inputs.  In particular, it means that the type of the output cannot vary depending on the values of the inputs. The following code is not type-stable:function unstable(flag::Bool)\nn    if flag\nn        return 1\nn    else\nn        return 1.0\nn    end\nnendIt returns either an Int or a Float64 depending on the value of its argument. Since Julia can't predict the return type of this function at compile-time, any computation that uses it will have to guard against both types possibly occurring, making generation of fast machine code difficult."
},

{
    "location": "manual/faq.html#Why-does-Julia-give-a-DomainError-for-certain-seemingly-sensible-operations?-1",
    "title": "Why does Julia give a DomainError for certain seemingly-sensible operations?",
    "category": "Section",
    "text": "Certain operations make mathematical sense but result in errors:julia> sqrt(-2.0)\nnERROR: DomainError\nn in sqrt at math.jl:128\nn\nnjulia> 2^-5\nnERROR: DomainError\nn in power_by_squaring at intfuncs.jl:70\nn in ^ at intfuncs.jl:84This behavior is an inconvenient consequence of the requirement for type-stability.  In the case of sqrt(), most users want sqrt(2.0) to give a real number, and would be unhappy if it produced the complex number 1.4142135623730951 + 0.0im.  One could write the sqrt() function to switch to a complex-valued output only when passed a negative number (which is what sqrt() does in some other languages), but then the result would not be type-stable and the sqrt() function would have poor performance.In these and other cases, you can get the result you want by choosing an input type that conveys your willingness to accept an output type in which the result can be represented:julia> sqrt(-2.0+0im)\nn0.0 + 1.4142135623730951im\nn\nnjulia> 2.0^-5\nn0.03125"
},

{
    "location": "manual/faq.html#Why-does-Julia-use-native-machine-integer-arithmetic?-1",
    "title": "Why does Julia use native machine integer arithmetic?",
    "category": "Section",
    "text": "Julia uses machine arithmetic for integer computations. This means that the range of Int values is bounded and wraps around at either end so that adding, subtracting and multiplying integers can overflow or underflow, leading to some results that can be unsettling at first:julia> typemax(Int)\nn9223372036854775807\nn\nnjulia> ans+1\nn-9223372036854775808\nn\nnjulia> -ans\nn-9223372036854775808\nn\nnjulia> 2*ans\nn0Clearly, this is far from the way mathematical integers behave, and you might think it less than ideal for a high-level programming language to expose this to the user. For numerical work where efficiency and transparency are at a premium, however, the alternatives are worse.One alternative to consider would be to check each integer operation for overflow and promote results to bigger integer types such as Int128 or BigInt in the case of overflow. Unfortunately, this introduces major overhead on every integer operation (think incrementing a loop counter) – it requires emitting code to perform run-time overflow checks after arithmetic instructions and branches to handle potential overflows. Worse still, this would cause every computation involving integers to be type-unstable. As we mentioned above, type-stability is crucial for effective generation of efficient code. If you can't count on the results of integer operations being integers, it's impossible to generate fast, simple code the way C and Fortran compilers do.A variation on this approach, which avoids the appearance of type instability is to merge the Int and BigInt types into a single hybrid integer type, that internally changes representation when a result no longer fits into the size of a machine integer. While this superficially avoids type-instability at the level of Julia code, it just sweeps the problem under the rug by foisting all of the same difficulties onto the C code implementing this hybrid integer type. This approach can be made to work and can even be made quite fast in many cases, but has several drawbacks. One problem is that the in-memory representation of integers and arrays of integers no longer match the natural representation used by C, Fortran and other languages with native machine integers. Thus, to interoperate with those languages, we would ultimately need to introduce native integer types anyway. Any unbounded representation of integers cannot have a fixed number of bits, and thus cannot be stored inline in an array with fixed-size slots – large integer values will always require separate heap-allocated storage. And of course, no matter how clever a hybrid integer implementation one uses, there are always performance traps – situations where performance degrades unexpectedly. Complex representation, lack of interoperability with C and Fortran, the inability to represent integer arrays without additional heap storage, and unpredictable performance characteristics make even the cleverest hybrid integer implementations a poor choice for high-performance numerical work.An alternative to using hybrid integers or promoting to BigInts is to use saturating integer arithmetic, where adding to the largest integer value leaves it unchanged and likewise for subtracting from the smallest integer value. This is precisely what Matlab™ does:>> int64(9223372036854775807)\nn\nnans =\nn\nn  9223372036854775807\nn\nn>> int64(9223372036854775807) + 1\nn\nnans =\nn\nn  9223372036854775807\nn\nn>> int64(-9223372036854775808)\nn\nnans =\nn\nn -9223372036854775808\nn\nn>> int64(-9223372036854775808) - 1\nn\nnans =\nn\nn -9223372036854775808At first blush, this seems reasonable enough since 9223372036854775807 is much closer to 9223372036854775808 than -9223372036854775808 is and integers are still represented with a fixed size in a natural way that is compatible with C and Fortran. Saturated integer arithmetic, however, is deeply problematic. The first and most obvious issue is that this is not the way machine integer arithmetic works, so implementing saturated operations requires emitting instructions after each machine integer operation to check for underflow or overflow and replace the result with typemin(Int) or typemax(Int) as appropriate. This alone expands each integer operation from a single, fast instruction into half a dozen instructions, probably including branches. Ouch. But it gets worse – saturating integer arithmetic isn't associative. Consider this Matlab computation:>> n = int64(2)^62\nn4611686018427387904\nn\nn>> n + (n - 1)\nn9223372036854775807\nn\nn>> (n + n) - 1\nn9223372036854775806This makes it hard to write many basic integer algorithms since a lot of common techniques depend on the fact that machine addition with overflow is associative. Consider finding the midpoint between integer values lo and hi in Julia using the expression (lo + hi) >>> 1:julia> n = 2^62\nn4611686018427387904\nn\nnjulia> (n + 2n) >>> 1\nn6917529027641081856See? No problem. That's the correct midpoint between 2^62 and 2^63, despite the fact that n + 2n is -4611686018427387904. Now try it in Matlab:>> (n + 2*n)/2\nn\nnans =\nn\nn  4611686018427387904Oops. Adding a >>> operator to Matlab wouldn't help, because saturation that occurs when adding n and 2n has already destroyed the information necessary to compute the correct midpoint.Not only is lack of associativity unfortunate for programmers who cannot rely it for techniques like this, but it also defeats almost anything compilers might want to do to optimize integer arithmetic. For example, since Julia integers use normal machine integer arithmetic, LLVM is free to aggressively optimize simple little functions like f(k) = 5k-1. The machine code for this function is just this:julia> code_native(f,(Int,))\nn    .section    __TEXT,__text,regular,pure_instructions\nnFilename: none\nnSource line: 1\nn    push    RBP\nn    mov RBP, RSP\nnSource line: 1\nn    lea RAX, QWORD PTR [RDI + 4*RDI - 1]\nn    pop RBP\nn    retThe actual body of the function is a single lea instruction, which computes the integer multiply and add at once. This is even more beneficial when f gets inlined into another function:julia> function g(k,n)\nn         for i = 1:n\nn           k = f(k)\nn         end\nn         return k\nn       end\nng (generic function with 2 methods)\nn\nnjulia> code_native(g,(Int,Int))\nn    .section    __TEXT,__text,regular,pure_instructions\nnFilename: none\nnSource line: 3\nn    push    RBP\nn    mov RBP, RSP\nn    test    RSI, RSI\nn    jle 22\nn    mov EAX, 1\nnSource line: 3\nn    lea RDI, QWORD PTR [RDI + 4*RDI - 1]\nn    inc RAX\nn    cmp RAX, RSI\nnSource line: 2\nn    jle -17\nnSource line: 5\nn    mov RAX, RDI\nn    pop RBP\nn    retSince the call to f gets inlined, the loop body ends up being just a single lea instruction. Next, consider what happens if we make the number of loop iterations fixed:julia> function g(k)\nn         for i = 1:10\nn           k = f(k)\nn         end\nn         return k\nn       end\nng (generic function with 2 methods)\nn\nnjulia> code_native(g,(Int,))\nn    .section    __TEXT,__text,regular,pure_instructions\nnFilename: none\nnSource line: 3\nn    push    RBP\nn    mov RBP, RSP\nnSource line: 3\nn    imul    RAX, RDI, 9765625\nn    add RAX, -2441406\nnSource line: 5\nn    pop RBP\nn    retBecause the compiler knows that integer addition and multiplication are associative and that multiplication distributes over addition – neither of which is true of saturating arithmetic – it can optimize the entire loop down to just a multiply and an add. Saturated arithmetic completely defeats this kind of optimization since associativity and distributivity can fail at each loop iteration, causing different outcomes depending on which iteration the failure occurs in. The compiler can unroll the loop, but it cannot algebraically reduce multiple operations into fewer equivalent operations.The most reasonable alternative to having integer arithmetic silently overflow is to do checked arithmetic everywhere, raising errors when adds, subtracts, and multiplies overflow, producing values that are not value-correct. In this blog post, Dan Luu analyzes this and finds that rather than the trivial cost that this approach should in theory have, it ends up having a substantial cost due to compilers (LLVM and GCC) not gracefully optimizing around the added overflow checks. If this improves in the future, we could consider defaulting to checked integer arithmetic in Julia, but for now, we have to live with the possibility of overflow."
},

{
    "location": "manual/faq.html#Packages-and-Modules-1",
    "title": "Packages and Modules",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#What-is-the-difference-between-\"using\"-and-\"importall\"?-1",
    "title": "What is the difference between \"using\" and \"importall\"?",
    "category": "Section",
    "text": "There is only one difference, and on the surface (syntax-wise) it may seem very minor. The difference between using and importall is that with using you need to say function Foo.bar(.. to extend module Foo's function bar with a new method, but with importall or import Foo.bar, you only need to say function bar(... and it automatically extends module Foo's function bar.If you use importall, then function Foo.bar(... and function bar(... become equivalent. If you use using, then they are different.The reason this is important enough to have been given separate syntax is that you don't want to accidentally extend a function that you didn't know existed, because that could easily cause a bug. This is most likely to happen with a method that takes a common type like a string or integer, because both you and the other module could define a method to handle such a common type. If you use importall, then you'll replace the other module's implementation of bar(s::AbstractString) with your new implementation, which could easily do something completely different (and break all/many future usages of the other functions in module Foo that depend on calling bar)."
},

{
    "location": "manual/faq.html#Nothingness-and-missing-values-1",
    "title": "Nothingness and missing values",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#How-does-\"null\"-or-\"nothingness\"-work-in-Julia?-1",
    "title": "How does \"null\" or \"nothingness\" work in Julia?",
    "category": "Section",
    "text": "Unlike many languages (for example, C and Java), Julia does not have a \"null\" value. When a reference (variable, object field, or array element) is uninitialized, accessing it will immediately throw an error. This situation can be detected using the isdefined function.Some functions are used only for their side effects, and do not need to return a value. In these cases, the convention is to return the value nothing, which is just a singleton object of type Void. This is an ordinary type with no fields; there is nothing special about it except for this convention, and that the REPL does not print anything for it. Some language constructs that would not otherwise have a value also yield nothing, for example if false; end.For situations where a value exists only sometimes (for example, missing statistical data), it is best to use the Nullable{T} type, which allows specifying the type of a missing value.The empty tuple (()) is another form of nothingness. But, it should not really be thought of as nothing but rather a tuple of zero values.In code written for Julia prior to version 0.4 you may occasionally see None, which is quite different. It is the empty (or \"bottom\") type, a type with no values and no subtypes (except itself). This is now written as Union{} (an empty union type). You will generally not need to use this type."
},

{
    "location": "manual/faq.html#Memory-1",
    "title": "Memory",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#Why-does-x-y-allocate-memory-when-x-and-y-are-arrays?-1",
    "title": "Why does x += y allocate memory when x and y are arrays?",
    "category": "Section",
    "text": "In Julia, x += y gets replaced during parsing by x = x + y. For arrays, this has the consequence that, rather than storing the result in the same location in memory as x, it allocates a new array to store the result.While this behavior might surprise some, the choice is deliberate. The main reason is the presence of immutable objects within Julia, which cannot change their value once created.  Indeed, a number is an immutable object; the statements x = 5; x += 1 do not modify the meaning of 5, they modify the value bound to x. For an immutable, the only way to change the value is to reassign it.To amplify a bit further, consider the following function:function power_by_squaring(x, n::Int)\nn    ispow2(n) || error(\"This implementation only works for powers of 2\")\nn    while n >= 2\nn        x *= x\nn        n >>= 1\nn    end\nn    x\nnendAfter a call like x = 5; y = power_by_squaring(x, 4), you would get the expected result: x == 5 && y == 625.  However, now suppose that *=, when used with matrices, instead mutated the left hand side.  There would be two problems:For general square matrices, A = A*B cannot be implemented without temporary storage: A[1,1] gets computed and stored on the left hand side before you're done using it on the right hand side.\nnSuppose you were willing to allocate a temporary for the computation (which would eliminate most of the point of making *= work in-place); if you took advantage of the mutability of x, then this function would behave differently for mutable vs. immutable inputs. In particular, for immutable x, after the call you'd have (in general) y != x, but for mutable x you'd have y == x.Because supporting generic programming is deemed more important than potential performance optimizations that can be achieved by other means (e.g., using explicit loops), operators like += and *= work by rebinding new values."
},

{
    "location": "manual/faq.html#Asynchronous-IO-and-concurrent-synchronous-writes-1",
    "title": "Asynchronous IO and concurrent synchronous writes",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#Why-do-concurrent-writes-to-the-same-stream-result-in-inter-mixed-output?-1",
    "title": "Why do concurrent writes to the same stream result in inter-mixed output?",
    "category": "Section",
    "text": "While the streaming I/O API is synchronous, the underlying implementation is fully asynchronous.The following:@sync for i in 1:3\nn    @async write(STDOUT, string(i), \" Foo \", \" Bar \")\nnendresults in:123 Foo  Foo  Foo  Bar  Bar  BarThis is happening because, while the write call is synchronous, the writing of each argument yields to other tasks while waiting for that part of the I/O to complete.print and println \"lock\" the stream during a call. Consequently changing write to println in the above example results in:1 Foo  Bar\nn2 Foo  Bar\nn3 Foo  BarYou can lock your writes with a ReentrantLock like this:l = ReentrantLock()\nn@sync for i in 1:3\nn    @async begin\nn        lock(l)\nn        try\nn            write(STDOUT, string(i), \" Foo \", \" Bar \")\nn        finally\nn            unlock(l)\nn        end\nn    end\nnend"
},

{
    "location": "manual/faq.html#Julia-Releases-1",
    "title": "Julia Releases",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/faq.html#Do-I-want-to-use-a-release,-beta,-or-nightly-version-of-Julia?-1",
    "title": "Do I want to use a release, beta, or nightly version of Julia?",
    "category": "Section",
    "text": "You may prefer the release version of Julia if you are looking for a stable code base. Releases generally occur every 6 months, giving you a stable platform for writing code.You may prefer the beta version of Julia if you don't mind being slightly behind the latest bugfixes and changes, but find the slightly faster rate of changes more appealing. Additionally, these binaries are tested before they are published to ensure they are fully functional.You may prefer the nightly version of Julia if you want to take advantage of the latest updates to the language, and don't mind if the version available today occasionally doesn't actually work.Finally, you may also consider building Julia from source for yourself. This option is mainly for those individuals who are comfortable at the command line, or interested in learning. If this describes you, you may also be interested in reading our guidelines for contributing.Links to each of these download types can be found on the download page at http://julialang.org/downloads/. Note that not all versions of Julia are available for all platforms."
},

{
    "location": "manual/functions.html",
    "title": "Functions",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/functions.html#Functions-1",
    "title": "Functions",
    "category": "Section",
    "text": "In Julia, a function is an object that maps a tuple of argument values to a return value. Julia functions are not pure mathematical functions, in the sense that functions can alter and be affected by the global state of the program. The basic syntax for defining functions in Julia is:function f(x,y)\nn  x + y\nnendThere is a second, more terse syntax for defining a function in Julia. The traditional function declaration syntax demonstrated above is equivalent to the following compact \"assignment form\":f(x,y) = x + yIn the assignment form, the body of the function must be a single expression, although it can be a compound expression (see Compound Expressions). Short, simple function definitions are common in Julia. The short function syntax is accordingly quite idiomatic, considerably reducing both typing and visual noise.A function is called using the traditional parenthesis syntax:julia> f(2,3)\nn5Without parentheses, the expression f refers to the function object, and can be passed around like any value:julia> g = f;\nn\nnjulia> g(2,3)\nn5As with variables, Unicode can also be used for function names:julia> ∑(x,y) = x + y\nn∑ (generic function with 1 method)"
},

{
    "location": "manual/functions.html#Argument-Passing-Behavior-1",
    "title": "Argument Passing Behavior",
    "category": "Section",
    "text": "Julia function arguments follow a convention sometimes called \"pass-by-sharing\", which means that values are not copied when they are passed to functions. Function arguments themselves act as new variable bindings (new locations that can refer to values), but the values they refer to are identical to the passed values. Modifications to mutable values (such as Arrays) made within a function will be visible to the caller. This is the same behavior found in Scheme, most Lisps, Python, Ruby and Perl, among other dynamic languages."
},

{
    "location": "manual/functions.html#The-return-Keyword-1",
    "title": "The return Keyword",
    "category": "Section",
    "text": "The value returned by a function is the value of the last expression evaluated, which, by default, is the last expression in the body of the function definition. In the example function, f, from the previous section this is the value of the expression x + y. As in C and most other imperative or functional languages, the return keyword causes a function to return immediately, providing an expression whose value is returned:function g(x,y)\nn  return x * y\nn  x + y\nnendSince function definitions can be entered into interactive sessions, it is easy to compare these definitions:f(x,y) = x + y\nn\nnfunction g(x,y)\nn  return x * y\nn  x + y\nnend\nn\nnjulia> f(2,3)\nn5\nn\nnjulia> g(2,3)\nn6Of course, in a purely linear function body like g, the usage of return is pointless since the expression x + y is never evaluated and we could simply make x * y the last expression in the function and omit the return. In conjunction with other control flow, however, return is of real use. Here, for example, is a function that computes the hypotenuse length of a right triangle with sides of length x and y, avoiding overflow:function hypot(x,y)\nn  x = abs(x)\nn  y = abs(y)\nn  if x > y\nn    r = y/x\nn    return x*sqrt(1+r*r)\nn  end\nn  if y == 0\nn    return zero(x)\nn  end\nn  r = x/y\nn  return y*sqrt(1+r*r)\nnendThere are three possible points of return from this function, returning the values of three different expressions, depending on the values of x and y. The return on the last line could be omitted since it is the last expression."
},

{
    "location": "manual/functions.html#Operators-Are-Functions-1",
    "title": "Operators Are Functions",
    "category": "Section",
    "text": "In Julia, most operators are just functions with support for special syntax. (The exceptions are operators with special evaluation semantics like && and ||. These operators cannot be functions since short-circuit evaluation requires that their operands are not evaluated before evaluation of the operator.) Accordingly, you can also apply them using parenthesized argument lists, just as you would any other function:julia> 1 + 2 + 3\nn6\nn\nnjulia> +(1,2,3)\nn6The infix form is exactly equivalent to the function application form – in fact the former is parsed to produce the function call internally. This also means that you can assign and pass around operators such as +() and *() just like you would with other function values:julia> f = +;\nn\nnjulia> f(1,2,3)\nn6Under the name f, the function does not support infix notation, however."
},

{
    "location": "manual/functions.html#Operators-With-Special-Names-1",
    "title": "Operators With Special Names",
    "category": "Section",
    "text": "A few special expressions correspond to calls to functions with non-obvious names. These are:Expression Calls\nn[A B C ...] hcat()\nn[A, B, C, ...] vcat()\nn[A B; C D; ...] hvcat()\nnA' ctranspose()\nnA.' transpose()\nn1:n colon()\nnA[i] getindex()\nnA[i]=x setindex!()\nnA(x) call()These functions are included in the Base.Operators module even though they do not have operator-like names."
},

{
    "location": "manual/functions.html#Anonymous-Functions-1",
    "title": "Anonymous Functions",
    "category": "Section",
    "text": "Functions in Julia are first-class objects: they can be assigned to variables, and called using the standard function call syntax from the variable they have been assigned to. They can be used as arguments, and they can be returned as values. They can also be created anonymously, without being given a name, using either of these syntaxes:julia> x -> x^2 + 2x - 1\nn(::#1) (generic function with 1 method)\nn\nnjulia> function (x)\nn           x^2 + 2x - 1\nn       end\nn(::#3) (generic function with 1 method)This creates a function taking one argument x and returning the value of the polynomial x^2 + 2x - 1 at that value. Notice that the result is a generic function, but with a compiler-generated name based on consecutive numbering.The primary use for anonymous functions is passing them to functions which take other functions as arguments. A classic example is map(), which applies a function to each value of an array and returns a new array containing the resulting values:julia> map(round, [1.2,3.5,1.7])\nn3-element Array{Float64,1}:\nn 1.0\nn 4.0\nn 2.0This is fine if a named function effecting the transform one wants already exists to pass as the first argument to map(). Often, however, a ready-to-use, named function does not exist. In these situations, the anonymous function construct allows easy creation of a single-use function object without needing a name:julia> map(x -> x^2 + 2x - 1, [1,3,-1])\nn3-element Array{Int64,1}:\nn  2\nn 14\nn -2An anonymous function accepting multiple arguments can be written using the syntax (x,y,z)->2x+y-z. A zero-argument anonymous function is written as ()->3. The idea of a function with no arguments may seem strange, but is useful for \"delaying\" a computation. In this usage, a block of code is wrapped in a zero-argument function, which is later invoked by calling it as f()."
},

{
    "location": "manual/functions.html#Multiple-Return-Values-1",
    "title": "Multiple Return Values",
    "category": "Section",
    "text": "In Julia, one returns a tuple of values to simulate returning multiple values. However, tuples can be created and destructured without needing parentheses, thereby providing an illusion that multiple values are being returned, rather than a single tuple value. For example, the following function returns a pair of values:julia> function foo(a,b)\nn         a+b, a*b\nn       end;If you call it in an interactive session without assigning the return value anywhere, you will see the tuple returned:julia> foo(2,3)\nn(5,6)A typical usage of such a pair of return values, however, extracts each value into a variable. Julia supports simple tuple \"destructuring\" that facilitates this:julia> x, y = foo(2,3);\nn\nnjulia> x\nn5\nn\nnjulia> y\nn6You can also return multiple values via an explicit usage of the return keyword:function foo(a,b)\nn  return a+b, a*b\nnendThis has the exact same effect as the previous definition of foo."
},

{
    "location": "manual/functions.html#Varargs-Functions-1",
    "title": "Varargs Functions",
    "category": "Section",
    "text": "It is often convenient to be able to write functions taking an arbitrary number of arguments. Such functions are traditionally known as \"varargs\" functions, which is short for \"variable number of arguments\". You can define a varargs function by following the last argument with an ellipsis:julia> bar(a,b,x...) = (a,b,x)\nnbar (generic function with 1 method)The variables a and b are bound to the first two argument values as usual, and the variable x is bound to an iterable collection of the zero or more values passed to bar after its first two arguments:julia> bar(1,2)\nn(1,2,())\nn\nnjulia> bar(1,2,3)\nn(1,2,(3,))\nn\nnjulia> bar(1,2,3,4)\nn(1,2,(3,4))\nn\nnjulia> bar(1,2,3,4,5,6)\nn(1,2,(3,4,5,6))In all these cases, x is bound to a tuple of the trailing values passed to bar.It is possible to constrain the number of values passed as a variable argument; this will be discussed later in Parametrically-constrained Varargs methods.On the flip side, it is often handy to \"splice\" the values contained in an iterable collection into a function call as individual arguments. To do this, one also uses ... but in the function call instead:julia> x = (3,4)\nn(3,4)\nn\nnjulia> bar(1,2,x...)\nn(1,2,(3,4))In this case a tuple of values is spliced into a varargs call precisely where the variable number of arguments go. This need not be the case, however:julia> x = (2,3,4)\nn(2,3,4)\nn\nnjulia> bar(1,x...)\nn(1,2,(3,4))\nn\nnjulia> x = (1,2,3,4)\nn(1,2,3,4)\nn\nnjulia> bar(x...)\nn(1,2,(3,4))Furthermore, the iterable object spliced into a function call need not be a tuple:julia> x = [3,4]\nn2-element Array{Int64,1}:\nn 3\nn 4\nn\nnjulia> bar(1,2,x...)\nn(1,2,(3,4))\nn\nnjulia> x = [1,2,3,4]\nn4-element Array{Int64,1}:\nn 1\nn 2\nn 3\nn 4\nn\nnjulia> bar(x...)\nn(1,2,(3,4))Also, the function that arguments are spliced into need not be a varargs function (although it often is):julia> baz(a,b) = a + b;\nn\nnjulia> args = [1,2]\nn2-element Array{Int64,1}:\nn 1\nn 2\nn\nnjulia> baz(args...)\nn3\nn\nnjulia> args = [1,2,3]\nn3-element Array{Int64,1}:\nn 1\nn 2\nn 3\nn\nnjulia> baz(args...)\nnERROR: MethodError: no method matching baz(::Int64, ::Int64, ::Int64)\nnClosest candidates are:\nn  baz(::Any, ::Any)\nn...As you can see, if the wrong number of elements are in the spliced container, then the function call will fail, just as it would if too many arguments were given explicitly."
},

{
    "location": "manual/functions.html#Optional-Arguments-1",
    "title": "Optional Arguments",
    "category": "Section",
    "text": "In many cases, function arguments have sensible default values and therefore might not need to be passed explicitly in every call. For example, the library function parse(type,num,base) interprets a string as a number in some base. The base argument defaults to 10. This behavior can be expressed concisely as:function parse(type, num, base=10)\nn    ###\nnendWith this definition, the function can be called with either two or three arguments, and 10 is automatically passed when a third argument is not specified:julia> parse(Int,\"12\",10)\nn12\nn\nnjulia> parse(Int,\"12\",3)\nn5\nn\nnjulia> parse(Int,\"12\")\nn12Optional arguments are actually just a convenient syntax for writing multiple method definitions with different numbers of arguments (see Note on Optional and keyword Arguments)."
},

{
    "location": "manual/functions.html#Keyword-Arguments-1",
    "title": "Keyword Arguments",
    "category": "Section",
    "text": "Some functions need a large number of arguments, or have a large number of behaviors. Remembering how to call such functions can be difficult. Keyword arguments can make these complex interfaces easier to use and extend by allowing arguments to be identified by name instead of only by position.For example, consider a function plot that plots a line. This function might have many options, for controlling line style, width, color, and so on. If it accepts keyword arguments, a possible call might look like plot(x, y, width=2), where we have chosen to specify only line width. Notice that this serves two purposes. The call is easier to read, since we can label an argument with its meaning. It also becomes possible to pass any subset of a large number of arguments, in any order.Functions with keyword arguments are defined using a semicolon in the signature:function plot(x, y; style=\"solid\", width=1, color=\"black\")\nn    ###\nnendWhen the function is called, the semicolon is optional: one can either call plot(x, y, width=2) or plot(x, y; width=2), but the former style is more common.  An explicit semicolon is required only for passing varargs or computed keywords as described below.Keyword argument default values are evaluated only when necessary (when a corresponding keyword argument is not passed), and in left-to-right order. Therefore default expressions may refer to prior keyword arguments.The types of keyword arguments can be made explicit as follows:function f(;x::Int64=1)\nn    ###\nnendExtra keyword arguments can be collected using ..., as in varargs functions:function f(x; y=0, kwargs...)\nn    ###\nnendInside f, kwargs will be a collection of (key,value) tuples, where each key is a symbol. Such collections can be passed as keyword arguments using a semicolon in a call, e.g. f(x, z=1; kwargs...). Dictionaries can also be used for this purpose.One can also pass (key,value) tuples, or any iterable expression (such as a => pair) that can be assigned to such a tuple, explicitly after a semicolon.  For example, plot(x, y; (:width,2)) and plot(x, y; :width => 2) are equivalent to plot(x, y, width=2).  This is useful in situations where the keyword name is computed at runtime."
},

{
    "location": "manual/functions.html#Evaluation-Scope-of-Default-Values-1",
    "title": "Evaluation Scope of Default Values",
    "category": "Section",
    "text": "Optional and keyword arguments differ slightly in how their default values are evaluated. When optional argument default expressions are evaluated, only previous arguments are in scope. In contrast, all the arguments are in scope when keyword arguments default expressions are evaluated. For example, given this definition:function f(x, a=b, b=1)\nn    ###\nnendthe b in a=b refers to a b in an outer scope, not the subsequent argument b. However, if a and b were keyword arguments instead, then both would be created in the same scope and the b in a=b would refer to the subsequent argument b (shadowing any b in an outer scope), which would result in an undefined variable error (since the default expressions are evaluated left-to-right, and b has not been assigned yet)."
},

{
    "location": "manual/functions.html#Do-Block-Syntax-for-Function-Arguments-1",
    "title": "Do-Block Syntax for Function Arguments",
    "category": "Section",
    "text": "Passing functions as arguments to other functions is a powerful technique, but the syntax for it is not always convenient. Such calls are especially awkward to write when the function argument requires multiple lines. As an example, consider calling map() on a function with several cases:map(x->begin\nn           if x < 0 && iseven(x)\nn               return 0\nn           elseif x == 0\nn               return 1\nn           else\nn               return x\nn           end\nn       end,\nn    [A, B, C])Julia provides a reserved word do for rewriting this code more clearly:map([A, B, C]) do x\nn    if x < 0 && iseven(x)\nn        return 0\nn    elseif x == 0\nn        return 1\nn    else\nn        return x\nn    end\nnendThe do x syntax creates an anonymous function with argument x and passes it as the first argument to map(). Similarly, do a,b would create a two-argument anonymous function, and a plain do would declare that what follows is an anonymous function of the form () -> ....How these arguments are initialized depends on the \"outer\" function; here, map() will sequentially set x to A, B, C, calling the anonymous function on each, just as would happen in the syntax map(func, [A, B, C]).This syntax makes it easier to use functions to effectively extend the language, since calls look like normal code blocks. There are many possible uses quite different from map(), such as managing system state. For example, there is a version of open() that runs code ensuring that the opened file is eventually closed:open(\"outfile\", \"w\") do io\nn    write(io, data)\nnendThis is accomplished by the following definition:function open(f::Function, args...)\nn    io = open(args...)\nn    try\nn        f(io)\nn    finally\nn        close(io)\nn    end\nnendHere, open() first opens the file for writing and then passes the resulting output stream to the anonymous function you defined in the do ... end block. After your function exits, open() will make sure that the stream is properly closed, regardless of whether your function exited normally or threw an exception. (The try/finally construct will be described in Control Flow.)With the do block syntax, it helps to check the documentation or implementation to know how the arguments of the user function are initialized."
},

{
    "location": "manual/functions.html#Dot-Syntax-for-Vectorizing-Functions-1",
    "title": "Dot Syntax for Vectorizing Functions",
    "category": "Section",
    "text": "In technical-computing languages, it is common to have \"vectorized\" versions of functions, which simply apply a given function f(x) to each element of an array A to yield a new array via f(A).   This kind of syntax is convenient for data processing, but in other languages vectorization is also often required for performance: if loops are slow, the \"vectorized\" version of a function can call fast library code written in a low-level language.   In Julia, vectorized functions are not required for performance, and indeed it is often beneficial to write your own loops (see Performance Tips), but they can still be convenient.  Therefore, any Julia function f can be applied elementwise to any array (or other collection) with the syntax f.(A).Of course, you can omit the dot if you write a specialized \"vector\" method of f, e.g. via f(A::AbstractArray) = map(f, A), and this is just as efficient as f.(A).   But that approach requires you to decide in advance which functions you want to vectorize.More generally, f.(args...) is actually equivalent to broadcast(f, args...), which allows you to operate on multiple arrays (even of different shapes), or a mix of arrays and scalars (see Broadcasting).  For example, if you have f(x,y) = 3x + 4y, then f.(pi,A) will return a new array consisting of f(pi,a) for each a in A, and f.(vector1,vector2) will return a new vector consisting of f(vector1[i],vector2[i]) for each index i (throwing an exception if the vectors have different length).Moreover, nestedf.(args...) calls are fused into a single broadcast loop.  For example, sin.(cos.(X)) is equivalent to broadcast(x -> sin(cos(x)), X), similar to [sin(cos(x)) for x in X]: there is only a single loop over X, and a single array is allocated for the result.   [In contrast, sin(cos(X)) in a typical \"vectorized\" language would first allocate one temporary array for tmp=cos(X), and then compute sin(tmp) in a separate loop, allocating a second array.] This loop fusion is not a compiler optimization that may or may not occur, it is a syntactic guarantee whenever nested f.(args...) calls are encountered.  Technically, the fusion stops as soon as a \"non-dot\" function is encountered; for example, in sin.(sort(cos.(X))) the sin and cos loops cannot be merged because of the intervening sort function.Finally, the maximum efficiency is typically achieved when the output array of a vectorized operation is pre-allocated, so that repeated calls do not allocate new arrays over and over again for the results (Pre-allocating outputs:).   A convenient syntax for this is X .= ..., which is equivalent to broadcast!(identity, X, ...) except that, as above, the broadcast! loop is fused with any nested \"dot\" calls.  For example, X .= sin.(Y) is equivalent to broadcast!(sin, X, Y), overwriting X with sin.(Y) in-place. If the left-hand side is a getindex expression, e.g. X[2:end] .= sin.(Y), then it translates to broadcast! on a view, e.g. broadcast!(sin, view(X, 2:endof(X)), Y), so that the left-hand side is updated in-place.(In future versions of Julia, operators like .* will also be handled with the same mechanism: they will be equivalent to broadcast calls and will be fused with other nested \"dot\" calls.  X .+= Y is equivalent to X .= X .+ Y and will eventually result in a fused in-place assignment. Similarly for .*= etcetera.)"
},

{
    "location": "manual/getting-started.html",
    "title": "Getting Started",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/getting-started.html#Getting-Started-1",
    "title": "Getting Started",
    "category": "Section",
    "text": "Julia installation is straightforward, whether using precompiled binaries or compiling from source. Download and install Julia by following the instructions at http://julialang.org/downloads/.The easiest way to learn and experiment with Julia is by starting an interactive session (also known as a read-eval-print loop or \"repl\") by double-clicking the Julia executable or running julia from the command line:$ julia\nn               _\nn   _       _ _(_)_     |  A fresh approach to technical computing\nn  (_)     | (_) (_)    |  Documentation: http://docs.julialang.org\nn   _ _   _| |_  __ _   |  Type \"?help\" for help.\nn  | | | | | | |/ _` |  |\nn  | | |_| | | | (_| |  |  Version 0.5.0-dev+2440 (2016-02-01 02:22 UTC)\nn _/ |\__'_|_|_|\__'_|  |  Commit 2bb94d6 (11 days old master)\nn|__/                   |  x86_64-apple-darwin13.1.0\nn\nnjulia> 1 + 2\nn3\nn\nnjulia> ans\nn3To exit the interactive session, type ^D – the control key together with the d key or type quit(). When run in interactive mode, julia displays a banner and prompts the user for input. Once the user has entered a complete expression, such as 1 + 2, and hits enter, the interactive session evaluates the expression and shows its value. If an expression is entered into an interactive session with a trailing semicolon, its value is not shown. The variable ans is bound to the value of the last evaluated expression whether it is shown or not. The ans variable is only bound in interactive sessions, not when Julia code is run in other ways.To evaluate expressions written in a source file file.jl, write include(\"file.jl\").To run code in a file non-interactively, you can give it as the first argument to the julia command:$ julia script.jl arg1 arg2...As the example implies, the following command-line arguments to julia are taken as command-line arguments to the program script.jl, passed in the global constant ARGS. The name of the script itself is passed in as the global PROGRAM_FILE. Note that ARGS is also set when script code is given using the -e option on the command line (see the julia help output below) but PROGRAM_FILE will be empty. For example, to just print the arguments given to a script, you could do this:$ julia -e 'println(PROGRAM_FILE); for x in ARGS; println(x); end' foo bar\nn\nnfoo\nnbarOr you could put that code into a script and run it:$ echo 'println(PROGRAM_FILE); for x in ARGS; println(x); end' > script.jl\nn$ julia script.jl foo bar\nnscript.jl\nnfoo\nnbarThe -- delimiter can be used to separate command-line args to the scriptfile from args to Julia:$ julia --color=yes -O -- foo.jl arg1 arg2..Julia can be started in parallel mode with either the -p or the --machinefile options. -p n will launch an additional n worker processes, while --machinefile file will launch a worker for each line in file file. The machines defined in file must be accessible via a passwordless ssh login, with Julia installed at the same location as the current host. Each machine definition takes the form [count*][user@]host[:port] [bind_addr[:port]] . user defaults to current user, port to the standard ssh port. count is the number of workers to spawn on the node, and defaults to 1. The optional bind-to bind_addr[:port] specifies the ip-address and port that other workers should use to connect to this worker.If you have code that you want executed whenever Julia is run, you can put it in ~/.juliarc.jl:$ echo 'println(\"Greetings! 你好! 안녕하세요?\")' > ~/.juliarc.jl\nn$ julia\nnGreetings! 你好! 안녕하세요?\nn\nn...There are various ways to run Julia code and provide options, similar to those available for the perl and ruby programs:julia [switches] -- [programfile] [args...]\nn -v, --version             Display version information\nn -h, --help                Print this message\nn\nn -J, --sysimage <file>     Start up with the given system image file\nn --precompiled={yes|no}    Use precompiled code from system image if available\nn --compilecache={yes|no}   Enable/disable incremental precompilation of modules\nn -H, --home <dir>          Set location of `julia` executable\nn --startup-file={yes|no}   Load ~/.juliarc.jl\nn --handle-signals={yes|no} Enable or disable Julia's default signal handlers\nn\nn -e, --eval <expr>         Evaluate <expr>\nn -E, --print <expr>        Evaluate and show <expr>\nn -L, --load <file>         Load <file> immediately on all processors\nn\nn -p, --procs {N|auto}      Integer value N launches N additional local worker processes\nn                           \"auto\" launches as many workers as the number of local cores\nn --machinefile <file>      Run processes on hosts listed in <file>\nn\nn -i                        Interactive mode; REPL runs and isinteractive() is true\nn -q, --quiet               Quiet startup (no banner)\nn --color={yes|no}          Enable or disable color text\nn --history-file={yes|no}   Load or save history\nn\nn --compile={yes|no|all|min}Enable or disable JIT compiler, or request exhaustive compilation\nn -C, --cpu-target <target> Limit usage of cpu features up to <target>\nn -O, --optimize={0,1,2,3}  Set the optimization level (default 2 if unspecified or 3 if specified as -O)\nn --inline={yes|no}         Control whether inlining is permitted (overrides functions declared as @inline)\nn --check-bounds={yes|no}   Emit bounds checks always or never (ignoring declarations)\nn --math-mode={ieee,fast}   Disallow or enable unsafe floating point optimizations (overrides @fastmath declaration)\nn\nn --depwarn={yes|no|error}  Enable or disable syntax and method deprecation warnings (\"error\" turns warnings into errors)\nn\nn --output-o name           Generate an object file (including system image data)\nn --output-ji name          Generate a system image data file (.ji)\nn --output-bc name          Generate LLVM bitcode (.bc)\nn --output-incremental=no   Generate an incremental output file (rather than complete)\nn\nn --code-coverage={none|user|all}, --code-coverage\nn                           Count executions of source lines (omitting setting is equivalent to \"user\")\nn --track-allocation={none|user|all}, --track-allocation\nn                           Count bytes allocated by each source line"
},

{
    "location": "manual/handling-operating-system-variation.html",
    "title": "Handling Operating System Variation",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/index.html",
    "title": "The Julia Manual",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/integers-and-floating-point-numbers.html",
    "title": "Integers and Floating-Point Numbers",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Integers-and-Floating-Point-Numbers-1",
    "title": "Integers and Floating-Point Numbers",
    "category": "Section",
    "text": "Integers and floating-point values are the basic building blocks of arithmetic and computation. Built-in representations of such values are called numeric primitives, while representations of integers and floating-point numbers as immediate values in code are known as numeric literals. For example, 1 is an integer literal, while 1.0 is a floating-point literal; their binary in-memory representations as objects are numeric primitives.Julia provides a broad range of primitive numeric types, and a full complement of arithmetic and bitwise operators as well as standard mathematical functions are defined over them. These map directly onto numeric types and operations that are natively supported on modern computers, thus allowing Julia to take full advantage of computational resources. Additionally, Julia provides software support for Arbitrary Precision Arithmetic, which can handle operations on numeric values that cannot be represented effectively in native hardware representations, but at the cost of relatively slower performance.The following are Julia's primitive numeric types:Integer types:Type Signed? Number of bits Smallest value Largest value\nnInt8 ✓ 8 -2^7 2^7 - 1\nnUInt8   8 0 2^8 - 1\nnInt16 ✓ 16 -2^15 2^15 - 1\nnUInt16   16 0 2^16 - 1\nnInt32 ✓ 32 -2^31 2^31 - 1\nnUInt32   32 0 2^32 - 1\nnInt64 ✓ 64 -2^63 2^63 - 1\nnUInt64   64 0 2^64 - 1\nnInt128 ✓ 128 -2^127 2^127 - 1\nnUInt128   128 0 2^128 - 1\nnBool N/A 8 false (0) true (1)Floating-point types:Type Precision Number of bits\nnFloat16 half 16\nnFloat32 single 32\nnFloat64 double 64Additionally, full support for Complex and Rational Numbers is built on top of these primitive numeric types. All numeric types interoperate naturally without explicit casting, thanks to a flexible, user-extensible type promotion system."
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Integers-1",
    "title": "Integers",
    "category": "Section",
    "text": "Literal integers are represented in the standard manner:julia> 1\nn1\nn\nnjulia> 1234\nn1234The default type for an integer literal depends on whether the target system has a 32-bit architecture or a 64-bit architecture:# 32-bit system:\nnjulia> typeof(1)\nnInt32\nn\nn# 64-bit system:\nnjulia> typeof(1)\nnInt64The Julia internal variable Sys.WORD_SIZE indicates whether the target system is 32-bit or 64-bit.:# 32-bit system:\nnjulia> Sys.WORD_SIZE\nn32\nn\nn# 64-bit system:\nnjulia> Sys.WORD_SIZE\nn64Julia also defines the types Int and UInt, which are aliases for the system's signed and unsigned native integer types respectively.:# 32-bit system:\nnjulia> Int\nnInt32\nnjulia> UInt\nnUInt32\nn\nn\nn# 64-bit system:\nnjulia> Int\nnInt64\nnjulia> UInt\nnUInt64Larger integer literals that cannot be represented using only 32 bits but can be represented in 64 bits always create 64-bit integers, regardless of the system type:# 32-bit or 64-bit system:\nnjulia> typeof(3000000000)\nnInt64Unsigned integers are input and output using the 0x prefix and hexadecimal (base 16) digits 0-9a-f (the capitalized digits A-F also work for input). The size of the unsigned value is determined by the number of hex digits used:julia> 0x1\nn0x01\nn\nnjulia> typeof(ans)\nnUInt8\nn\nnjulia> 0x123\nn0x0123\nn\nnjulia> typeof(ans)\nnUInt16\nn\nnjulia> 0x1234567\nn0x01234567\nn\nnjulia> typeof(ans)\nnUInt32\nn\nnjulia> 0x123456789abcdef\nn0x0123456789abcdef\nn\nnjulia> typeof(ans)\nnUInt64This behavior is based on the observation that when one uses unsigned hex literals for integer values, one typically is using them to represent a fixed numeric byte sequence, rather than just an integer value.Recall that the variable ans is set to the value of the last expression evaluated in an interactive session. This does not occur when Julia code is run in other ways.Binary and octal literals are also supported:julia> 0b10\nn0x02\nn\nnjulia> typeof(ans)\nnUInt8\nn\nnjulia> 0o10\nn0x08\nn\nnjulia> typeof(ans)\nnUInt8The minimum and maximum representable values of primitive numeric types such as integers are given by the typemin() and typemax() functions:julia> (typemin(Int32), typemax(Int32))\nn(-2147483648,2147483647)\nn\nnjulia> for T in [Int8,Int16,Int32,Int64,Int128,UInt8,UInt16,UInt32,UInt64,UInt128]\nn         println(\"$(lpad(T,7)): [$(typemin(T)),$(typemax(T))]\")\nn       end\nn   Int8: [-128,127]\nn  Int16: [-32768,32767]\nn  Int32: [-2147483648,2147483647]\nn  Int64: [-9223372036854775808,9223372036854775807]\nn Int128: [-170141183460469231731687303715884105728,170141183460469231731687303715884105727]\nn  UInt8: [0,255]\nn UInt16: [0,65535]\nn UInt32: [0,4294967295]\nn UInt64: [0,18446744073709551615]\nnUInt128: [0,340282366920938463463374607431768211455]The values returned by typemin() and typemax() are always of the given argument type. (The above expression uses several features we have yet to introduce, including for loops, Strings, and Interpolation, but should be easy enough to understand for users with some existing programming experience.)"
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Overflow-behavior-1",
    "title": "Overflow behavior",
    "category": "Section",
    "text": "In Julia, exceeding the maximum representable value of a given type results in a wraparound behavior:julia> x = typemax(Int64)\nn9223372036854775807\nn\nnjulia> x + 1\nn-9223372036854775808\nn\nnjulia> x + 1 == typemin(Int64)\nntrueThus, arithmetic with Julia integers is actually a form of modular arithmetic. This reflects the characteristics of the underlying arithmetic of integers as implemented on modern computers. In applications where overflow is possible, explicit checking for wraparound produced by overflow is essential; otherwise, the BigInt type in Arbitrary Precision Arithmetic is recommended instead."
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Division-errors-1",
    "title": "Division errors",
    "category": "Section",
    "text": "Integer division (the div function) has two exceptional cases: dividing by zero, and dividing the lowest negative number (typemin()) by -1. Both of these cases throw a DivideError. The remainder and modulus functions (rem and mod) throw a DivideError when their second argument is zero."
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Floating-Point-Numbers-1",
    "title": "Floating-Point Numbers",
    "category": "Section",
    "text": "Literal floating-point numbers are represented in the standard formats:julia> 1.0\nn1.0\nn\nnjulia> 1.\nn1.0\nn\nnjulia> 0.5\nn0.5\nn\nnjulia> .5\nn0.5\nn\nnjulia> -1.23\nn-1.23\nn\nnjulia> 1e10\nn1.0e10\nn\nnjulia> 2.5e-4\nn0.00025The above results are all Float64 values. Literal Float32 values can be entered by writing an f in place of e:julia> 0.5f0\nn0.5f0\nn\nnjulia> typeof(ans)\nnFloat32\nn\nnjulia> 2.5f-4\nn0.00025f0Values can be converted to Float32 easily:julia> Float32(-1.5)\nn-1.5f0\nn\nnjulia> typeof(ans)\nnFloat32Hexadecimal floating-point literals are also valid, but only as Float64 values:julia> 0x1p0\nn1.0\nn\nnjulia> 0x1.8p3\nn12.0\nn\nnjulia> 0x.4p-1\nn0.125\nn\nnjulia> typeof(ans)\nnFloat64Half-precision floating-point numbers are also supported (Float16), but only as a storage format. In calculations they'll be converted to Float32:julia> sizeof(Float16(4.))\nn2\nn\nnjulia> 2*Float16(4.)\nn8.0f0The underscore _ can be used as digit separator:julia> 10_000, 0.000_000_005, 0xdead_beef, 0b1011_0010\nn(10000,5.0e-9,0xdeadbeef,0xb2)"
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Floating-point-zero-1",
    "title": "Floating-point zero",
    "category": "Section",
    "text": "Floating-point numbers have two zeros, positive zero and negative zero. They are equal to each other but have different binary representations, as can be seen using the bits function: :julia> 0.0 == -0.0\nntrue\nn\nnjulia> bits(0.0)\nn\"0000000000000000000000000000000000000000000000000000000000000000\"\nn\nnjulia> bits(-0.0)\nn\"1000000000000000000000000000000000000000000000000000000000000000\""
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Special-floating-point-values-1",
    "title": "Special floating-point values",
    "category": "Section",
    "text": "There are three specified standard floating-point values that do not correspond to any point on the real number line:Float16 Float32 Float64 Name Description\nnInf16 Inf32 Inf positive infinity a value greater than all finite floating-point values\nn-Inf16 -Inf32 -Inf negative infinity a value less than all finite floating-point values\nnNaN16 NaN32 NaN not a number a value not == to any floating-point value (including itself)For further discussion of how these non-finite floating-point values are ordered with respect to each other and other floats, see Numeric Comparisons. By the IEEE 754 standard, these floating-point values are the results of certain arithmetic operations:julia> 1/Inf\nn0.0\nn\nnjulia> 1/0\nnInf\nn\nnjulia> -5/0\nn-Inf\nn\nnjulia> 0.000001/0\nnInf\nn\nnjulia> 0/0\nnNaN\nn\nnjulia> 500 + Inf\nnInf\nn\nnjulia> 500 - Inf\nn-Inf\nn\nnjulia> Inf + Inf\nnInf\nn\nnjulia> Inf - Inf\nnNaN\nn\nnjulia> Inf * Inf\nnInf\nn\nnjulia> Inf / Inf\nnNaN\nn\nnjulia> 0 * Inf\nnNaNThe typemin() and typemax() functions also apply to floating-point types:julia> (typemin(Float16),typemax(Float16))\nn(-Inf16,Inf16)\nn\nnjulia> (typemin(Float32),typemax(Float32))\nn(-Inf32,Inf32)\nn\nnjulia> (typemin(Float64),typemax(Float64))\nn(-Inf,Inf)"
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Machine-epsilon-1",
    "title": "Machine epsilon",
    "category": "Section",
    "text": "Most real numbers cannot be represented exactly with floating-point numbers, and so for many purposes it is important to know the distance between two adjacent representable floating-point numbers, which is often known as machine epsilon.Julia provides eps(), which gives the distance between 1.0 and the next larger representable floating-point value:julia> eps(Float32)\nn1.1920929f-7\nn\nnjulia> eps(Float64)\nn2.220446049250313e-16\nn\nnjulia> eps() # same as eps(Float64)\nn2.220446049250313e-16These values are 2.0^-23 and 2.0^-52 as Float32 and Float64 values, respectively. The eps() function can also take a floating-point value as an argument, and gives the absolute difference between that value and the next representable floating point value. That is, eps(x) yields a value of the same type as x such that x + eps(x) is the next representable floating-point value larger than x:julia> eps(1.0)\nn2.220446049250313e-16\nn\nnjulia> eps(1000.)\nn1.1368683772161603e-13\nn\nnjulia> eps(1e-27)\nn1.793662034335766e-43\nn\nnjulia> eps(0.0)\nn5.0e-324The distance between two adjacent representable floating-point numbers is not constant, but is smaller for smaller values and larger for larger values. In other words, the representable floating-point numbers are densest in the real number line near zero, and grow sparser exponentially as one moves farther away from zero. By definition, eps(1.0) is the same as eps(Float64) since 1.0 is a 64-bit floating-point value.Julia also provides the nextfloat() and prevfloat() functions which return the next largest or smallest representable floating-point number to the argument respectively: :julia> x = 1.25f0\nn1.25f0\nn\nnjulia> nextfloat(x)\nn1.2500001f0\nn\nnjulia> prevfloat(x)\nn1.2499999f0\nn\nnjulia> bits(prevfloat(x))\nn\"00111111100111111111111111111111\"\nn\nnjulia> bits(x)\nn\"00111111101000000000000000000000\"\nn\nnjulia> bits(nextfloat(x))\nn\"00111111101000000000000000000001\"This example highlights the general principle that the adjacent representable floating-point numbers also have adjacent binary integer representations."
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Rounding-modes-1",
    "title": "Rounding modes",
    "category": "Section",
    "text": "If a number doesn't have an exact floating-point representation, it must be rounded to an appropriate representable value, however, if wanted, the manner in which this rounding is done can be changed according to the rounding modes presented in the IEEE 754 standard:julia> 1.1 + 0.1\nn1.2000000000000002\nn\nnjulia> setrounding(Float64,RoundDown) do\nn       1.1 + 0.1\nn       end\nn1.2The default mode used is always RoundNearest, which rounds to the nearest representable value, with ties rounded towards the nearest value with an even least significant bit.warning: \nnRounding is generally only correct for basic arithmetic functions (+(), -(), *(), /() and sqrt()) and type conversion operations. Many other functions assume the default RoundNearest mode is set, and can give erroneous results when operating under other rounding modes."
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Background-and-References-1",
    "title": "Background and References",
    "category": "Section",
    "text": "Floating-point arithmetic entails many subtleties which can be surprising to users who are unfamiliar with the low-level implementation details. However, these subtleties are described in detail in most books on scientific computation, and also in the following references:The definitive guide to floating point arithmetic is the IEEE 754-2008 Standard; however, it is not available for free online.\nnFor a brief but lucid presentation of how floating-point numbers are represented, see John D. Cook's article on the subject as well as his introduction to some of the issues arising from how this representation differs in behavior from the idealized abstraction of real numbers.\nnAlso recommended is Bruce Dawson's series of blog posts on floating-point numbers.\nnFor an excellent, in-depth discussion of floating-point numbers and issues of numerical accuracy encountered when computing with them, see David Goldberg's paper What Every Computer Scientist Should Know About Floating-Point Arithmetic.\nnFor even more extensive documentation of the history of, rationale for, and issues with floating-point numbers, as well as discussion of many other topics in numerical computing, see the collected writings of William Kahan, commonly known as the \"Father of Floating-Point\". Of particular interest may be An Interview with the Old Man of Floating-Point."
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Arbitrary-Precision-Arithmetic-1",
    "title": "Arbitrary Precision Arithmetic",
    "category": "Section",
    "text": "To allow computations with arbitrary-precision integers and floating point numbers, Julia wraps the GNU Multiple Precision Arithmetic Library (GMP) and the GNU MPFR Library, respectively. The BigInt and BigFloat types are available in Julia for arbitrary precision integer and floating point numbers respectively.Constructors exist to create these types from primitive numerical types, and parse() can be use to construct them from AbstractStrings.  Once created, they participate in arithmetic with all other numeric types thanks to Julia's type promotion and conversion mechanism:julia> BigInt(typemax(Int64)) + 1\nn9223372036854775808\nn\nnjulia> parse(BigInt, \"123456789012345678901234567890\") + 1\nn123456789012345678901234567891\nn\nnjulia> parse(BigFloat, \"1.23456789012345678901\")\nn1.234567890123456789010000000000000000000000000000000000000000000000000000000004\nn\nnjulia> BigFloat(2.0^66) / 3\nn2.459565876494606882133333333333333333333333333333333333333333333333333333333344e+19\nn\nnjulia> factorial(BigInt(40))\nn815915283247897734345611269596115894272000000000However, type promotion between the primitive types above and BigInt/BigFloat is not automatic and must be explicitly stated.julia> x = typemin(Int64)\nn-9223372036854775808\nn\nnjulia> x = x - 1\nn9223372036854775807\nn\nnjulia> typeof(x)\nnInt64\nn\nnjulia> y = BigInt(typemin(Int64))\nn-9223372036854775808\nn\nnjulia> y = y - 1\nn-9223372036854775809\nn\nnjulia> typeof(y)\nnBigIntThe default precision (in number of bits of the significand) and rounding mode of BigFloat operations can be changed globally by calling setprecision() and setrounding(), and all further calculations will take these changes in account.  Alternatively, the precision or the rounding can be changed only within the execution of a particular block of code by using the same functions with a do block:julia> setrounding(BigFloat, RoundUp) do\nn       BigFloat(1) + parse(BigFloat, \"0.1\")\nn       end\nn1.100000000000000000000000000000000000000000000000000000000000000000000000000003\nn\nnjulia> setrounding(BigFloat, RoundDown) do\nn       BigFloat(1) + parse(BigFloat, \"0.1\")\nn       end\nn1.099999999999999999999999999999999999999999999999999999999999999999999999999986\nn\nnjulia> setprecision(40) do\nn       BigFloat(1) + parse(BigFloat, \"0.1\")\nn       end\nn1.1000000000004"
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Numeric-Literal-Coefficients-1",
    "title": "Numeric Literal Coefficients",
    "category": "Section",
    "text": "To make common numeric formulas and expressions clearer, Julia allows variables to be immediately preceded by a numeric literal, implying multiplication. This makes writing polynomial expressions much cleaner:julia> x = 3\nn3\nn\nnjulia> 2x^2 - 3x + 1\nn10\nn\nnjulia> 1.5x^2 - .5x + 1\nn13.0It also makes writing exponential functions more elegant:julia> 2^2x\nn64The precedence of numeric literal coefficients is the same as that of unary operators such as negation. So 2^3x is parsed as 2^(3x), and 2x^3 is parsed as 2*(x^3).Numeric literals also work as coefficients to parenthesized expressions:julia> 2(x-1)^2 - 3(x-1) + 1\nn3Additionally, parenthesized expressions can be used as coefficients to variables, implying multiplication of the expression by the variable:julia> (x-1)x\nn6Neither juxtaposition of two parenthesized expressions, nor placing a variable before a parenthesized expression, however, can be used to imply multiplication:julia> (x-1)(x+1)\nnERROR: MethodError: objects of type Int64 are not callable\nn...\nn\nnjulia> x(x+1)\nnERROR: MethodError: objects of type Int64 are not callable\nn...Both expressions are interpreted as function application: any expression that is not a numeric literal, when immediately followed by a parenthetical, is interpreted as a function applied to the values in parentheses (see Functions for more about functions). Thus, in both of these cases, an error occurs since the left-hand value is not a function.The above syntactic enhancements significantly reduce the visual noise incurred when writing common mathematical formulae. Note that no whitespace may come between a numeric literal coefficient and the identifier or parenthesized expression which it multiplies."
},

{
    "location": "manual/integers-and-floating-point-numbers.html#Syntax-Conflicts-1",
    "title": "Syntax Conflicts",
    "category": "Section",
    "text": "Juxtaposed literal coefficient syntax may conflict with two numeric literal syntaxes: hexadecimal integer literals and engineering notation for floating-point literals. Here are some situations where syntactic conflicts arise:The hexadecimal integer literal expression 0xff could be interpreted as the numeric literal 0 multiplied by the variable xff.\nnThe floating-point literal expression 1e10 could be interpreted as the numeric literal 1 multiplied by the variable e10, and similarly with the equivalent E form.In both cases, we resolve the ambiguity in favor of interpretation as a numeric literals:Expressions starting with 0x are always hexadecimal literals.\nnExpressions starting with a numeric literal followed by e or E are always floating-point literals."
},

{
    "location": "manual/interacting-with-julia.html",
    "title": "Interacting With Julia",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/interacting-with-julia.html#Interacting-With-Julia-1",
    "title": "Interacting With Julia",
    "category": "Section",
    "text": "Julia comes with a full-featured interactive command-line REPL (read-eval-print loop) built into the julia executable.  In addition to allowing quick and easy evaluation of Julia statements, it has a searchable history, tab-completion, many helpful keybindings, and dedicated help and shell modes.  The REPL can be started by simply calling julia with no arguments or double-clicking on the executable:$ julia\nn               _\nn   _       _ _(_)_     |  A fresh approach to technical computing\nn  (_)     | (_) (_)    |  Documentation: http://docs.julialang.org\nn   _ _   _| |_  __ _   |  Type \"help()\" to list help topics\nn  | | | | | | |/ _` |  |\nn  | | |_| | | | (_| |  |  Version 0.3.0-prerelease+2834 (2014-04-30 03:13 UTC)\nn _/ |\__'_|_|_|\__'_|  |  Commit 64f437b (0 days old master)\nn|__/                   |  x86_64-apple-darwin13.1.0\nn\nnjulia>To exit the interactive session, type ^D – the control key together with the d key on a blank line – or type quit() followed by the return or enter key. The REPL greets you with a banner and a julia> prompt."
},

{
    "location": "manual/interacting-with-julia.html#The-different-prompt-modes-1",
    "title": "The different prompt modes",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/interacting-with-julia.html#The-Julian-mode-1",
    "title": "The Julian mode",
    "category": "Section",
    "text": "The REPL has four main modes of operation.  The first and most common is the Julian prompt.  It is the default mode of operation; each new line initially starts with julia>.  It is here that you can enter Julia expressions.  Hitting return or enter after a complete expression has been entered will evaluate the entry and show the result of the last expression.julia> string(1 + 2)\nn\"3\"There are a number useful features unique to interactive work. In addition to showing the result, the REPL also binds the result to the variable ans.  A trailing semicolon on the line can be used as a flag to suppress showing the result.julia> string(3 * 4);\nn\nnjulia> ans\nn\"12\""
},

{
    "location": "manual/interacting-with-julia.html#Help-mode-1",
    "title": "Help mode",
    "category": "Section",
    "text": "When the cursor is at the beginning of the line, the prompt can be changed to a help mode by typing ?.  Julia will attempt to print help or documentation for anything entered in help mode:julia> ? # upon typing ?, the prompt changes (in place) to: help>\nn\nnhelp> string\nnBase.string(xs...)\nn\nn   Create a string from any values using the \"print\" function.In addition to function names, complete function calls may be entered to see which method is called for the given argument(s).  Macros, types and variables can also be queried:help> string(1)\nnstring(x::Union{Int16,Int128,Int8,Int32,Int64}) at string.jl:1553\nn\nnhelp> @printf\nnBase.@printf([io::IOStream], \"%Fmt\", args...)\nn\nn   Print arg(s) using C \"printf()\" style format specification\nn   string. Optionally, an IOStream may be passed as the first argument\nn   to redirect output.\nn\nnhelp> AbstractString\nnDataType   : AbstractString\nn  supertype: Any\nn  subtypes : Any[DirectIndexString,RepString,RevString{T<:AbstractString},SubString{T<:AbstractString},String]Help mode can be exited by pressing backspace at the beginning of the line."
},

{
    "location": "manual/interacting-with-julia.html#Shell-mode-1",
    "title": "Shell mode",
    "category": "Section",
    "text": "Just as help mode is useful for quick access to documentation, another common task is to use the system shell to execute system commands.  Just as ? entered help mode when at the beginning of the line, a semicolon (;) will enter the shell mode.  And it can be exited by pressing backspace at the beginning of the line.julia> ; # upon typing ;, the prompt changes (in place) to: shell>\nn\nnshell> echo hello\nnhello"
},

{
    "location": "manual/interacting-with-julia.html#Search-modes-1",
    "title": "Search modes",
    "category": "Section",
    "text": "In all of the above modes, the executed lines get saved to a history file, which can be searched.  To initiate an incremental search through the previous history, type ^R – the control key together with the r key.  The prompt will change to (reverse-i-search)`':, and as you type the search query will appear in the quotes.  The most recent result that matches the query will dynamically update to the right of the colon as more is typed.  To find an older result using the same query, simply type ^R again.Just as ^R is a reverse search, ^S is a forward search, with the prompt (i-search)`':.  The two may be used in conjunction with each other to move through the previous or next matching results, respectively."
},

{
    "location": "manual/interacting-with-julia.html#Key-bindings-1",
    "title": "Key bindings",
    "category": "Section",
    "text": "The Julia REPL makes great use of key bindings.  Several control-key bindings were already introduced above (^D to exit, ^R and ^S for searching), but there are many more.  In addition to the control-key, there are also meta-key bindings.  These vary more by platform, but most terminals  default to using alt- or option- held down with a key to send the meta-key (or can be configured to do so).Keybinding Description\nnProgram control  \nn^D Exit (when buffer is empty)\nn^C Interrupt or cancel\nn^L Clear console screen\nnReturn/Enter, ^J New line, executing if it is complete\nnmeta-Return/Enter Insert new line without executing it\nn? or ; Enter help or shell mode (when at start of a line)\nn^R, ^S Incremental history search, described above\nnCursor movement  \nnRight arrow, ^F Move right one character\nnLeft arrow, ^B Move left one character\nnHome, ^A Move to beginning of line\nnEnd, ^E Move to end of line\nn^P Change to the previous or next history entry\nn^N Change to the next history entry\nnUp arrow Move up one line (or to the previous history entry)\nnDown arrow Move down one line (or to the next history entry)\nnPage-up Change to the previous history entry that matches the text before the cursor\nnPage-down Change to the next history entry that matches the text before the cursor\nnmeta-F Move right one word\nnmeta-B Move left one word\nnEditing  \nnBackspace, ^H Delete the previous character\nnDelete, ^D Forward delete one character (when buffer has text)\nnmeta-Backspace Delete the previous word\nnmeta-D Forward delete the next word\nn^W Delete previous text up to the nearest whitespace\nn^K \"Kill\" to end of line, placing the text in a buffer\nn^Y \"Yank\" insert the text from the kill buffer\nn^T Transpose the characters about the cursor"
},

{
    "location": "manual/interacting-with-julia.html#Customizing-keybindings-1",
    "title": "Customizing keybindings",
    "category": "Section",
    "text": "Julia's REPL keybindings may be fully customized to a user's preferences by passing a dictionary to REPL.setup_interface(). The keys of this dictionary may be characters or strings. The key '*' refers to the default action. Control plus character x bindings are indicated with \"^x\". Meta plus x can be written \"\\Mx\". The values of the custom keymap must be nothing (indicating that the input should be ignored) or functions that accept the signature (PromptState, AbstractREPL, Char). The REPL.setup_interface() function must be called before the REPL is initialized, by registering the operation with atreplinit(). For example, to bind the up and down arrow keys to move through history without prefix search, one could put the following code in .juliarc.jl:import Base: LineEdit, REPL\nn\nnconst mykeys = Dict{Any,Any}(\nn  # Up Arrow\nn  \"\e[A\" => (s,o...)->(LineEdit.edit_move_up(s) || LineEdit.history_prev(s, LineEdit.mode(s).hist)),\nn  # Down Arrow\nn  \"\e[B\" => (s,o...)->(LineEdit.edit_move_up(s) || LineEdit.history_next(s, LineEdit.mode(s).hist))\nn)\nn\nnfunction customize_keys(repl)\nn  repl.interface = REPL.setup_interface(repl; extra_repl_keymap = mykeys)\nnend\nn\nnatreplinit(customize_keys)Users should refer to base/LineEdit.jl to discover the available actions on key input."
},

{
    "location": "manual/interacting-with-julia.html#Tab-completion-1",
    "title": "Tab completion",
    "category": "Section",
    "text": "In both the Julian and help modes of the REPL, one can enter the first few characters of a function or type and then press the tab key to get a list all matches:julia> stri\nnstride     strides     string      stringmime  strip\nn\nnjulia> Stri\nnStridedArray    StridedVecOrMat  AbstractString\nnStridedMatrix   StridedVectorThe tab key can also be used to substitute LaTeX math symbols with their Unicode equivalents, and get a list of LaTeX matches as well:julia> \pi[TAB]\nnjulia> π\nnπ = 3.1415926535897...\nn\nnjulia> e\_1[TAB] = [1,0]\nnjulia> e₁ = [1,0]\nn2-element Array{Int64,1}:\nn 1\nn 0\nn\nnjulia> e\^1[TAB] = [1 0]\nnjulia> e¹ = [1 0]\nn1×2 Array{Int64,2}:\nn 1  0\nn\nnjulia> \sqrt[TAB]2     # √ is equivalent to the sqrt() function\nnjulia> √2\nn1.4142135623730951\nn\nnjulia> \hbar[TAB](h) = h / 2\pi[TAB]\nnjulia> ħ(h) = h / 2π\nnħ (generic function with 1 method)\nn\nnjulia> \h[TAB]\nn\hat              \heartsuit         \hksearow          \hookleftarrow     \hslash\nn\hbar             \hermitconjmatrix  \hkswarow          \hookrightarrow    \hspace\nn\nnjulia> α=\"\alpha[TAB]\"   # LaTeX completion also works in strings\nnjulia> α=\"α\"A full list of tab-completions can be found in the Unicode Input section of the manual.Completion of paths works for strings and julia's shell mode:julia> path=\"/[TAB]\"\nn.dockerenv  .juliabox/   boot/        etc/         lib/         media/       opt/         root/        sbin/        sys/         usr/\nn.dockerinit bin/         dev/         home/        lib64/       mnt/         proc/        run/         srv/         tmp/         var/\nnshell> /[TAB]\nn.dockerenv  .juliabox/   boot/        etc/         lib/         media/       opt/         root/        sbin/        sys/         usr/\nn.dockerinit bin/         dev/         home/        lib64/       mnt/         proc/        run/         srv/         tmp/         var/Tab completion can help with investigation of the available methods matching the input arguments:julia> max([TAB] # All methods are displayed, not shown here due to size of the list\nn\nnjulia> max([1,2],[TAB] # All methods where `Vector{Int}` matches as first argument\nnmax{T1<:Real,T2<:Real}(x::AbstractArray{T1,N<:Any}, y::T2) at operators.jl:544\nnmax{Tx<:Real,Ty<:Real}(x::Union{Base.ReshapedArray{Tx,1,A<:DenseArray,MI<:Tuple{Vararg{Base.MultiplicativeInverses.SignedMultiplicativeInverse{Int64},N<:Any}}},DenseArray{Tx,1},SubArray{Tx,1,A<:Union{Base.ReshapedArray{T<:Any,N<:Any,A<:DenseArray,MI<:Tuple{Vararg{Base.MultiplicativeInverses.SignedMultiplicativeInverse{Int64},N<:Any}}},DenseArray},I<:Tuple{Vararg{Union{Base.AbstractCartesianIndex,Colon,Int64,Range{Int64}},N<:Any}},L<:Any}}, y::AbstractSparseArray{Ty,Ti<:Any,1}) at sparse\sparsevector.jl:1127\nnmax{T1<:Real,T2<:Real}(x::AbstractArray{T1,N<:Any}, y::AbstractArray{T2,N<:Any}) at operators.jl:548\nnmax(x, y) at operators.jl:78\nnmax(a, b, c, xs...) at operators.jl:119\nn\nnjulia> max([1,2], max(1,2),[TAB] # All methods matching the arguments.\nnmax{T1<:Real,T2<:Real}(x::AbstractArray{T1,N<:Any}, y::T2) at operators.jl:544\nnmax(x, y) at operators.jl:78\nnmax(a, b, c, xs...) at operators.jl:119\nn\nnjulia> split(\"1 1 1\", # Keywords are also displayed in the suggested methods, see second line after `;` where `limit` and `keep` are keyword arguments\nnsplit(str::AbstractString) at strings/util.jl:151\nnsplit{T<:AbstractString}(str::T, splitter; limit, keep) at strings/util.jl:127The completion of the methods uses type inference and can therefore see if the arguments match even if the arguments are output from functions. The function needs to be type stable for the completion to be able to remove non-matching methods.Tab completion can also help completing fields:julia> Pkg.a\nnadd       availableFields for output from functions can also be completed:julia> split(\"\",\"\")[1].[TAB]\nnendof  offset  stringThe completion of fields for output from functions uses type inference, and it can only suggest fields if the function is type stable."
},

{
    "location": "manual/interfaces.html",
    "title": "Interfaces",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/interfaces.html#Interfaces-1",
    "title": "Interfaces",
    "category": "Section",
    "text": "A lot of the power and extensibility in Julia comes from a collection of informal interfaces.  By extending a few specific methods to work for a custom type, objects of that type not only receive those functionalities, but they are also able to be used in other methods that are written to generically build upon those behaviors."
},

{
    "location": "manual/interfaces.html#Iteration-1",
    "title": "Iteration",
    "category": "Section",
    "text": "Required methods   Brief description\nnstart(iter)   Returns the initial iteration state\nnnext(iter, state)   Returns the current item and the next state\nndone(iter, state)   Tests if there are any items remaining\nnImportant optional methods Default definition Brief description\nniteratorsize(IterType) HasLength() One of HasLength(), HasShape(), IsInfinite(), or SizeUnknown() as appropriate\nniteratoreltype(IterType) HasEltype() Either EltypeUnknown() or HasEltype() as appropriate\nneltype(IterType) Any The type the items returned by next()\nnlength(iter) (undefined) The number of items, if known\nnsize(iter, [dim...]) (undefined) The number of items in each dimension, if knownValue returned by iteratorsize(IterType) Required Methods\nnHasLength() length(iter)\nnHasShape() length(iter)  and size(iter, [dim...])\nnIsInfinite() (none)\nnSizeUnknown() (none)Value returned by iteratoreltype(IterType) Required Methods\nnHasEltype() eltype(IterType)\nnEltypeUnknown() (none)Sequential iteration is implemented by the methods start(), done(), and next(). Instead of mutating objects as they are iterated over, Julia provides these three methods to keep track of the iteration state externally from the object. The start(iter) method returns the initial state for the iterable object iter. That state gets passed along to done(iter, state), which tests if there are any elements remaining, and next(iter, state), which returns a tuple containing the current element and an updated state. The state object can be anything, and is generally considered to be an implementation detail private to the iterable object.Any object defines these three methods is iterable and can be used in the many functions that rely upon iteration. It can also be used directly in a for loop since the syntax:for i in iter   # or  \"for i = iter\"\nn    # body\nnendis translated into:state = start(iter)\nnwhile !done(iter, state)\nn    (i, state) = next(iter, state)\nn    # body\nnendA simple example is an iterable sequence of square numbers with a defined length:julia> immutable Squares\nn           count::Int\nn       end\nn       Base.start(::Squares) = 1\nn       Base.next(S::Squares, state) = (state*state, state+1)\nn       Base.done(S::Squares, s) = s > S.count;\nn       Base.eltype(::Type{Squares}) = Int # Note that this is defined for the type\nn       Base.length(S::Squares) = S.count;With only start, next, and done definitions, the Squares type is already pretty powerful. We can iterate over all the elements:julia> for i in Squares(7)\nn           println(i)\nn       end\nn1\nn4\nn9\nn16\nn25\nn36\nn49We can use many of the builtin methods that work with iterables, like in(), mean() and std():julia> 25 in Squares(10)\nntrue\nn\nnjulia> mean(Squares(100)), std(Squares(100))\nn(3383.5,3024.355854282583)There are a few more methods we can extend to give Julia more information about this iterable collection.  We know that the elements in a Squares sequence will always be Int. By extending the eltype() method, we can give that information to Julia and help it make more specialized code in the more complicated methods. We also know the number of elements in our sequence, so we can extend length(), too.Now, when we ask Julia to collect() all the elements into an array it can preallocate a Vector{Int} of the right size instead of blindly push!ing each element into a Vector{Any}:julia> collect(Squares(100))' # transposed to save space\nn1×100 Array{Int64,2}:\nn 1  4  9  16  25  36  49  64  81  100  …  9025  9216  9409  9604  9801  10000While we can rely upon generic implementations, we can also extend specific methods where we know there is a simpler algorithm.  For example, there's a formula to compute the sum of squares, so we can override the generic iterative version with a more performant solution:julia> Base.sum(S::Squares) = (n = S.count; return n*(n+1)*(2n+1)÷6)\nn       sum(Squares(1803))\nn1955361914This is a very common pattern throughout the Julia standard library: a small set of required methods define an informal interface that enable many fancier behaviors.  In some cases, types will want to additionally specialize those extra behaviors when they know a more efficient algorithm can be used in their specific case."
},

{
    "location": "manual/interfaces.html#Indexing-1",
    "title": "Indexing",
    "category": "Section",
    "text": "Methods to implement Brief description\nngetindex(X, i) X[i], indexed element access\nnsetindex!(X, v, i) X[i] = v, indexed assignment\nnendof(X) The last index, used in X[end]For the Squares iterable above, we can easily compute the ith element of the sequence by squaring it.  We can expose this as an indexing expression S[i].  To opt into this behavior, Squares simply needs to define getindex():julia> function Base.getindex(S::Squares, i::Int)\nn           1 <= i <= S.count || throw(BoundsError(S, i))\nn           return i*i\nn       end\nn       Squares(100)[23]\nn529Additionally, to support the syntax S[end], we must define endof() to specify the last valid index:julia> Base.endof(S::Squares) = length(S)\nn       Squares(23)[end]\nn529Note, though, that the above only defines getindex() with one integer index. Indexing with anything other than an Int will throw a MethodError saying that there was no matching method.  In order to support indexing with ranges or vectors of Ints, separate methods must be written:julia> Base.getindex(S::Squares, i::Number) = S[convert(Int, i)]\nn       Base.getindex(S::Squares, I) = [S[i] for i in I]\nn       Squares(10)[[3,4.,5]]\nn3-element Array{Int64,1}:\nn  9\nn 16\nn 25While this is starting to support more of the indexing operations supported by some of the builtin types, there's still quite a number of behaviors missing. This Squares sequence is starting to look more and more like a vector as we've added behaviors to it. Instead of defining all these behaviors ourselves, we can officially define it as a subtype of an AbstractArray."
},

{
    "location": "manual/introduction.html",
    "title": "Introduction",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/linear-algebra.html",
    "title": "Linear algebra",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/linear-algebra.html#Linear-algebra-1",
    "title": "Linear algebra",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/linear-algebra.html#Matrix-factorizations-1",
    "title": "Matrix factorizations",
    "category": "Section",
    "text": "Matrix factorizations (a.k.a. matrix decompositions) compute the factorization of a matrix into a product of matrices, and are one of the central concepts in linear algebra.The following table summarizes the types of matrix factorizations that have been implemented in Julia. Details of their associated methods can be found in the Linear Algebra section of the standard library documentation.Type Description\nnCholesky Cholesky factorization\nnCholeskyPivoted Pivoted Cholesky factorization\nnLU LU factorization\nnLUTridiagonal LU factorization for Tridiagonal matrices\nnUmfpackLU LU factorization for sparse matrices (computed by UMFPack)\nnQR QR factorization\nnQRCompactWY Compact WY form of the QR factorization\nnQRPivoted Pivoted QR factorization\nnHessenberg Hessenberg decomposition\nnEigen Spectral decomposition\nnSVD Singular value decomposition\nnGeneralizedSVD Generalized SVD"
},

{
    "location": "manual/linear-algebra.html#Special-matrices-1",
    "title": "Special matrices",
    "category": "Section",
    "text": "Matrices with special symmetries and structures arise often in linear algebra and are frequently associated with various matrix factorizations. Julia features a rich collection of special matrix types, which allow for fast computation with specialized routines that are specially developed for particular matrix types.The following tables summarize the types of special matrices that have been implemented in Julia, as well as whether hooks to various optimized methods for them in LAPACK are available.Type Description\nnHermitian Hermitian matrix\nnUpperTriangular Upper triangular matrix\nnLowerTriangular Lower triangular matrix\nnTridiagonal Tridiagonal matrix\nnSymTridiagonal Symmetric tridiagonal matrix\nnBidiagonal Upper/lower bidiagonal matrix\nnDiagonal Diagonal matrix\nnUniformScaling Uniform scaling operator"
},

{
    "location": "manual/linear-algebra.html#Elementary-operations-1",
    "title": "Elementary operations",
    "category": "Section",
    "text": "Matrix type + - * \ Other functions with optimized methods\nnHermitian       MV inv(), sqrtm(), expm()\nnUpperTriangular     MV MV inv(), det()\nnLowerTriangular     MV MV inv(), det()\nnSymTridiagonal M M MS MV eigmax(), eigmin()\nnTridiagonal M M MS MV  \nnBidiagonal M M MS MV  \nnDiagonal M M MV MV inv(), det(), logdet(), /()\nnUniformScaling M M MVS MVS /()Legend:Key Description\nnM (matrix) An optimized method for matrix-matrix operations is available\nnV (vector) An optimized method for matrix-vector operations is available\nnS (scalar) An optimized method for matrix-scalar operations is available"
},

{
    "location": "manual/linear-algebra.html#Matrix-factorizations-2",
    "title": "Matrix factorizations",
    "category": "Section",
    "text": "Matrix type LAPACK eig() eigvals() eigvecs() svd() svdvals()\nnHermitian HE   ARI      \nnUpperTriangular TR A A A    \nnLowerTriangular TR A A A    \nnSymTridiagonal ST A ARI AV    \nnTridiagonal GT          \nnBidiagonal BD       A A\nnDiagonal DI   A      Legend:Key Description Example\nnA (all) An optimized method to find all the characteristic values and/or vectors is available e.g. eigvals(M)\nnR (range) An optimized method to find the ilth through the ihth characteristic values are available eigvals(M, il, ih)\nnI (interval) An optimized method to find the characteristic values in the interval [vl, vh] is available eigvals(M, vl, vh)\nnV (vectors) An optimized method to find the characteristic vectors corresponding to the characteristic values x=[x1, x2,...] is available eigvecs(M, x)"
},

{
    "location": "manual/mathematical-operations.html",
    "title": "Mathematical Operations and Elementary Functions",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/mathematical-operations.html#Mathematical-Operations-and-Elementary-Functions-1",
    "title": "Mathematical Operations and Elementary Functions",
    "category": "Section",
    "text": "Julia provides a complete collection of basic arithmetic and bitwise operators across all of its numeric primitive types, as well as providing portable, efficient implementations of a comprehensive collection of standard mathematical functions."
},

{
    "location": "manual/mathematical-operations.html#Arithmetic-Operators-1",
    "title": "Arithmetic Operators",
    "category": "Section",
    "text": "The following arithmetic operators are supported on all primitive numeric types:Expression Name Description\nn+x unary plus the identity operation\nn-x unary minus maps values to their additive inverses\nnx + y binary plus performs addition\nnx - y binary minus performs subtraction\nnx * y times performs multiplication\nnx / y divide performs division\nnx \ y inverse divide equivalent to y / x\nnx ^ y power raises x to the yth power\nnx % y remainder equivalent to rem(x,y)as well as the negation on Bool types:Expression Name Description\nn!x negation changes true to false and vice versaJulia's promotion system makes arithmetic operations on mixtures of argument types \"just work\" naturally and automatically. See Conversion and Promotion for details of the promotion system.Here are some simple examples using arithmetic operators:julia> 1 + 2 + 3\nn6\nn\nnjulia> 1 - 2\nn-1\nn\nnjulia> 3*2/12\nn0.5(By convention, we tend to space operators more tightly if they get applied before other nearby operators. For instance, we would generally write -x + 2 to reflect that first x gets negated, and then 2 is added to that result.)"
},

{
    "location": "manual/mathematical-operations.html#Bitwise-Operators-1",
    "title": "Bitwise Operators",
    "category": "Section",
    "text": "The following bitwise operators are supported on all primitive integer types:Expression Name\nn~x bitwise not\nnx & y bitwise and\nn`x \ y`\nnx $ y bitwise xor (exclusive or)\nnx >>> y logical shift right\nnx >> y arithmetic shift right\nnx << y logical/arithmetic shift leftHere are some examples with bitwise operators:julia> ~123\nn-124\nn\nnjulia> 123 & 234\nn106\nn\nnjulia> 123 | 234\nn251\nn\nnjulia> 123 $ 234\nn145\nn\nnjulia> ~UInt32(123)\nn0xffffff84\nn\nnjulia> ~UInt8(123)\nn0x84"
},

{
    "location": "manual/mathematical-operations.html#Updating-operators-1",
    "title": "Updating operators",
    "category": "Section",
    "text": "Every binary arithmetic and bitwise operator also has an updating version that assigns the result of the operation back into its left operand. The updating version of the binary operator is formed by placing a = immediately after the operator. For example, writing x += 3 is equivalent to writing x = x + 3:julia> x = 1\nn1\nn\nnjulia> x += 3\nn4\nn\nnjulia> x\nn4The updating versions of all the binary arithmetic and bitwise operators are:+=  -=  *=  /=  \=  ÷=  %=  ^=  &=  |=  $=  >>>=  >>=  <<=note: \nnAn updating operator rebinds the variable on the left-hand side. As a result, the type of the variable may change.julia> x = 0x01; typeof(x)\nnUInt8\nn\nnjulia> x *= 2 #Same as x = x * 2\nn2\nn\nnjulia> isa(x, Int)\nntrue"
},

{
    "location": "manual/mathematical-operations.html#Numeric-Comparisons-1",
    "title": "Numeric Comparisons",
    "category": "Section",
    "text": "Standard comparison operations are defined for all the primitive numeric types:Operator Name\nn== equality\nn!=, ≠ inequality\nn< less than\nn<=, ≤ less than or equal to\nn> greater than\nn>=, ≥ greater than or equal toHere are some simple examples:julia> 1 == 1\nntrue\nn\nnjulia> 1 == 2\nnfalse\nn\nnjulia> 1 != 2\nntrue\nn\nnjulia> 1 == 1.0\nntrue\nn\nnjulia> 1 < 2\nntrue\nn\nnjulia> 1.0 > 3\nnfalse\nn\nnjulia> 1 >= 1.0\nntrue\nn\nnjulia> -1 <= 1\nntrue\nn\nnjulia> -1 <= -1\nntrue\nn\nnjulia> -1 <= -2\nnfalse\nn\nnjulia> 3 < -0.5\nnfalseIntegers are compared in the standard manner – by comparison of bits. Floating-point numbers are compared according to the IEEE 754 standard:Finite numbers are ordered in the usual manner.\nnPositive zero is equal but not greater than negative zero.\nnInf is equal to itself and greater than everything else except NaN.\nn-Inf is equal to itself and less then everything else except NaN.\nnNaN is not equal to, not less than, and not greater than anything, including itself.The last point is potentially surprising and thus worth noting:julia> NaN == NaN\nnfalse\nn\nnjulia> NaN != NaN\nntrue\nn\nnjulia> NaN < NaN\nnfalse\nn\nnjulia> NaN > NaN\nnfalseand can cause especial headaches with Arrays:julia> [1 NaN] == [1 NaN]\nnfalseJulia provides additional functions to test numbers for special values, which can be useful in situations like hash key comparisons:Function Tests if\nnisequal(x, y) x and y are identical\nnisfinite(x) x is a finite number\nnisinf(x) x is infinite\nnisnan(x) x is not a numberisequal() considers NaNs equal to each other:julia> isequal(NaN,NaN)\nntrue\nn\nnjulia> isequal([1 NaN], [1 NaN])\nntrue\nn\nnjulia> isequal(NaN,NaN32)\nntrueisequal() can also be used to distinguish signed zeros:julia> -0.0 == 0.0\nntrue\nn\nnjulia> isequal(-0.0, 0.0)\nnfalseMixed-type comparisons between signed integers, unsigned integers, and floats can be tricky. A great deal of care has been taken to ensure that Julia does them correctly.For other types, isequal() defaults to calling ==(), so if you want to define equality for your own types then you only need to add a ==() method.  If you define your own equality function, you should probably define a corresponding hash() method to ensure that isequal(x,y) implies hash(x) == hash(y)."
},

{
    "location": "manual/mathematical-operations.html#Chaining-comparisons-1",
    "title": "Chaining comparisons",
    "category": "Section",
    "text": "Unlike most languages, with the notable exception of Python, comparisons can be arbitrarily chained:julia> 1 < 2 <= 2 < 3 == 3 > 2 >= 1 == 1 < 3 != 5\nntrueChaining comparisons is often quite convenient in numerical code. Chained comparisons use the && operator for scalar comparisons, and the & operator for elementwise comparisons, which allows them to work on arrays. For example, 0 .< A .< 1 gives a boolean array whose entries are true where the corresponding elements of A are between 0 and 1.The operator .< is intended for array objects; the operation A .< B is valid only if A and B have the same dimensions.  The operator returns an array with boolean entries and with the same dimensions as A and B.  Such operators are called elementwise; Julia offers a suite of elementwise operators: .*, .+, etc.  Some of the elementwise operators can take a scalar operand such as the example 0 .< A .< 1 in the preceding paragraph. This notation means that the scalar operand should be replicated for each entry of the array.Note the evaluation behavior of chained comparisons:julia> v(x) = (println(x); x)\nnv (generic function with 1 method)\nn\nnjulia> v(1) < v(2) <= v(3)\nn2\nn1\nn3\nntrue\nn\nnjulia> v(1) > v(2) <= v(3)\nn2\nn1\nnfalseThe middle expression is only evaluated once, rather than twice as it would be if the expression were written as v(1) < v(2) && v(2) <= v(3). However, the order of evaluations in a chained comparison is undefined. It is strongly recommended not to use expressions with side effects (such as printing) in chained comparisons. If side effects are required, the short-circuit && operator should be used explicitly (see Short-Circuit Evaluation)."
},

{
    "location": "manual/mathematical-operations.html#Operator-Precedence-1",
    "title": "Operator Precedence",
    "category": "Section",
    "text": "Julia applies the following order of operations, from highest precedence to lowest:Category Operators\nnSyntax . followed by ::\nnExponentiation ^ and its elementwise equivalent .^\nnFractions // and .//\nnMultiplication * / % & \ and  .* ./ .% .\\nnBitshifts << >> >>> and .<< .>> .>>>\nnAddition `+ - \\nnSyntax : .. followed by `\\nnComparisons > < >= <= == === != !== <: and .> .< .>= .<= .== .!=\nnControl flow && followed by `\\nnAssignments `= += -= *= /= //= \= ^= ÷= %= \"
},

{
    "location": "manual/mathematical-operations.html#Elementary-Functions-1",
    "title": "Elementary Functions",
    "category": "Section",
    "text": "Julia provides a comprehensive collection of mathematical functions and operators. These mathematical operations are defined over as broad a class of numerical values as permit sensible definitions, including integers, floating-point numbers, rationals, and complexes, wherever such definitions make sense.Moreover, these functions (like any Julia function) can be applied in \"vectorized\" fashion to arrays and other collections with the syntax f.(A), e.g. sin.(A) will compute the elementwise sine of each element of an array A.  See Dot Syntax for Vectorizing Functions:."
},

{
    "location": "manual/mathematical-operations.html#Numerical-Conversions-1",
    "title": "Numerical Conversions",
    "category": "Section",
    "text": "Julia supports three forms of numerical conversion, which differ in their handling of inexact conversions.The notation T(x) or convert(T,x) converts x to a value of type T.\nnIf T is a floating-point type, the result is the nearest representable value, which could be positive or negative infinity.\nnIf T is an integer type, an InexactError is raised if x is not representable by T.\nnx % T converts an integer x to a value of integer type T congruent to x modulo 2^n, where n is the number of bits in T. In other words, the binary representation is truncated to fit.\nnThe Rounding functions take a type T as an optional argument. For example, round(Int,x) is a shorthand for Int(round(x)).The following examples show the different forms.julia> Int8(127)\nn127\nn\nnjulia> Int8(128)\nnERROR: InexactError()\nn in Int8(::Int64) at ./sysimg.jl:53\nn ...\nn\nnjulia> Int8(127.0)\nn127\nn\nnjulia> Int8(3.14)\nnERROR: InexactError()\nn in Int8(::Float64) at ./sysimg.jl:53\nn ...\nn\nnjulia> Int8(128.0)\nnERROR: InexactError()\nn in Int8(::Float64) at ./sysimg.jl:53\nn ...\nn\nnjulia> 127 % Int8\nn127\nn\nnjulia> 128 % Int8\nn-128\nn\nnjulia> round(Int8,127.4)\nn127\nn\nnjulia> round(Int8,127.6)\nnERROR: InexactError()\nn in trunc(::Type{Int8}, ::Float64) at ./float.jl:456\nn in round(::Type{Int8}, ::Float64) at ./float.jl:211\nn ...See Conversion and Promotion for how to define your own conversions and promotions."
},

{
    "location": "manual/mathematical-operations.html#Rounding-functions-1",
    "title": "Rounding functions",
    "category": "Section",
    "text": "Function Description Return type\nnround(x) round x to the nearest integer typeof(x)\nnround(T, x) round x to the nearest integer T\nnfloor(x) round x towards -Inf typeof(x)\nnfloor(T, x) round x towards -Inf T\nnceil(x) round x towards +Inf typeof(x)\nnceil(T, x) round x towards +Inf T\nntrunc(x) round x towards zero typeof(x)\nntrunc(T, x) round x towards zero T"
},

{
    "location": "manual/mathematical-operations.html#Division-functions-1",
    "title": "Division functions",
    "category": "Section",
    "text": "Function Description\nndiv(x,y) truncated division; quotient rounded towards zero\nnfld(x,y) floored division; quotient rounded towards -Inf\nncld(x,y) ceiling division; quotient rounded towards +Inf\nnrem(x,y) remainder; satisfies x == div(x,y)*y + rem(x,y); sign matches x\nnmod(x,y) modulus; satisfies x == fld(x,y)*y + mod(x,y); sign matches y\nnmod1(x,y) mod() with offset 1; returns r∈(0,y] for y>0 or r∈[y,0) for y<0, where mod(r, y) == mod(x, y)\nnmod2pi(x) modulus with respect to 2pi;  0 <= mod2pi(x)    < 2pi\nndivrem(x,y) returns (div(x,y),rem(x,y))\nnfldmod(x,y) returns (fld(x,y),mod(x,y))\nngcd(x,y...) greatest positive common divisor of x, y,...\nnlcm(x,y...) least positive common multiple of x, y,..."
},

{
    "location": "manual/mathematical-operations.html#Sign-and-absolute-value-functions-1",
    "title": "Sign and absolute value functions",
    "category": "Section",
    "text": "Function Description\nnabs(x) a positive value with the magnitude of x\nnabs2(x) the squared magnitude of x\nnsign(x) indicates the sign of x, returning -1, 0, or +1\nnsignbit(x) indicates whether the sign bit is on (true) or off (false)\nncopysign(x,y) a value with the magnitude of x and the sign of y\nnflipsign(x,y) a value with the magnitude of x and the sign of x*y"
},

{
    "location": "manual/mathematical-operations.html#Powers,-logs-and-roots-1",
    "title": "Powers, logs and roots",
    "category": "Section",
    "text": "Function Description\nnsqrt(x), √x square root of x\nncbrt(x), ∛x cube root of x\nnhypot(x,y) hypotenuse of right-angled triangle with other sides of length x and y\nnexp(x) natural exponential function at x\nnexpm1(x) accurate exp(x)-1 for x near zero\nnldexp(x,n) x*2^n computed efficiently for integer values of n\nnlog(x) natural logarithm of x\nnlog(b,x) base b logarithm of x\nnlog2(x) base 2 logarithm of x\nnlog10(x) base 10 logarithm of x\nnlog1p(x) accurate log(1+x) for x near zero\nnexponent(x) binary exponent of x\nnsignificand(x) binary significand (a.k.a. mantissa) of a floating-point number xFor an overview of why functions like hypot(), expm1(), and log1p() are necessary and useful, see John D. Cook's excellent pair of blog posts on the subject: expm1, log1p, erfc, and hypot."
},

{
    "location": "manual/mathematical-operations.html#Trigonometric-and-hyperbolic-functions-1",
    "title": "Trigonometric and hyperbolic functions",
    "category": "Section",
    "text": "All the standard trigonometric and hyperbolic functions are also defined:sin    cos    tan    cot    sec    csc\nnsinh   cosh   tanh   coth   sech   csch\nnasin   acos   atan   acot   asec   acsc\nnasinh  acosh  atanh  acoth  asech  acsch\nnsinc   cosc   atan2These are all single-argument functions, with the exception of atan2, which gives the angle in radians between the x-axis and the point specified by its arguments, interpreted as x and y coordinates.Additionally, sinpi(x) and cospi(x) are provided for more accurate computations of sin(pi*x) and cos(pi*x) respectively.In order to compute trigonometric functions with degrees instead of radians, suffix the function with d. For example, sind(x) computes the sine of x where x is specified in degrees. The complete list of trigonometric functions with degree variants is:sind   cosd   tand   cotd   secd   cscd\nnasind  acosd  atand  acotd  asecd  acscd"
},

{
    "location": "manual/metaprogramming.html",
    "title": "Metaprogramming",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/metaprogramming.html#Metaprogramming-1",
    "title": "Metaprogramming",
    "category": "Section",
    "text": "The strongest legacy of Lisp in the Julia language is its metaprogramming support. Like Lisp, Julia represents its own code as a data structure of the language itself. Since code is represented by objects that can be created and manipulated from within the language, it is possible for a program to transform and generate its own code. This allows sophisticated code generation without extra build steps, and also allows true Lisp-style macros operating at the level of abstract syntax trees. In contrast, preprocessor \"macro\" systems, like that of C and C++, perform textual manipulation and substitution before any actual parsing or interpretation occurs. Because all data types and code in Julia are represented by Julia data structures, powerful reflection capabilities are available to explore the internals of a program and its types just like any other data."
},

{
    "location": "manual/metaprogramming.html#Program-representation-1",
    "title": "Program representation",
    "category": "Section",
    "text": "Every Julia program starts life as a string:julia> prog = \"1 + 1\"\nn\"1 + 1\"What happens next?The next step is to parse each string into an object called an expression, represented by the Julia type Expr:julia> ex1 = parse(prog)\nn:(1 + 1)\nn\nnjulia> typeof(ex1)\nnExprExpr objects contain three parts:a Symbol identifying the kind of expression. A symbol is an interned string identifier (more discussion below).julia> ex1.head\nn:callthe expression arguments, which may be symbols, other expressions, or literal values:julia> ex1.args\nn3-element Array{Any,1}:\nn  :+\nn 1\nn 1finally, the expression result type, which may be annotated by the user or inferred by the compiler (and may be ignored completely for the purposes of this chapter):julia> ex1.typ\nnAnyExpressions may also be constructed directly in prefix notation:julia> ex2 = Expr(:call, :+, 1, 1)\nn:(1 + 1)The two expressions constructed above – by parsing and by direct construction – are equivalent:julia> ex1 == ex2\nntrueThe key point here is that Julia code is internally represented as a data structure that is accessible from the language itself.The dump() function provides indented and annotated display of Expr objects:julia> dump(ex2)\nnExpr\nn  head: Symbol call\nn  args: Array{Any}((3,))\nn    1: Symbol +\nn    2: Int64 1\nn    3: Int64 1\nn  typ: AnyExpr objects may also be nested:julia> ex3 = parse(\"(4 + 4) / 2\")\nn:((4 + 4) / 2)Another way to view expressions is with Meta.show_sexpr, which displays the S-expression form of a given Expr, which may look very familiar to users of Lisp. Here's an example illustrating the display on a nested Expr:julia> Meta.show_sexpr(ex3)\nn(:call, :/, (:call, :+, 4, 4), 2)"
},

{
    "location": "manual/metaprogramming.html#Symbols-1",
    "title": "Symbols",
    "category": "Section",
    "text": "The : character has two syntactic purposes in Julia. The first form creates a Symbol, an interned string used as one building-block of expressions:julia> :foo\nn:foo\nn\nnjulia> typeof(ans)\nnSymbolThe Symbol constructor takes any number of arguments and creates a new symbol by concatenating their string representations together:julia> :foo == Symbol(\"foo\")\nntrue\nn\nnjulia> Symbol(\"func\",10)\nn:func10\nn\nnjulia> Symbol(:var,'_',\"sym\")\nn:var_symIn the context of an expression, symbols are used to indicate access to variables; when an expression is evaluated, a symbol is replaced with the value bound to that symbol in the appropriate scope.Sometimes extra parentheses around the argument to : are needed to avoid ambiguity in parsing.:julia> :(:)\nn:(:)\nn\nnjulia> :(::)\nn:(::)"
},

{
    "location": "manual/metaprogramming.html#Expressions-and-evaluation-1",
    "title": "Expressions and evaluation",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/metaprogramming.html#Quoting-1",
    "title": "Quoting",
    "category": "Section",
    "text": "The second syntactic purpose of the : character is to create expression objects without using the explicit Expr constructor. This is referred to as quoting. The : character, followed by paired parentheses around a single statement of Julia code, produces an Expr object based on the enclosed code. Here is example of the short form used to quote an arithmetic expression:julia> ex = :(a+b*c+1)\nn:(a + b * c + 1)\nn\nnjulia> typeof(ex)\nnExpr(to view the structure of this expression, try ex.head and ex.args, or use dump() as above)Note that equivalent expressions may be constructed using parse() or the direct Expr form:julia>      :(a + b*c + 1)  ==\nn       parse(\"a + b*c + 1\") ==\nn       Expr(:call, :+, :a, Expr(:call, :*, :b, :c), 1)\nntrueExpressions provided by the parser generally only have symbols, other expressions, and literal values as their args, whereas expressions constructed by Julia code can have arbitrary run-time values without literal forms as args. In this specific example, + and a are symbols, *(b,c) is a subexpression, and 1 is a literal 64-bit signed integer.There is a second syntactic form of quoting for multiple expressions: blocks of code enclosed in quote ... end. Note that this form introduces QuoteNode elements to the expression tree, which must be considered when directly manipulating an expression tree generated from quote blocks. For other purposes, :( ... ) and quote .. end blocks are treated identically.julia> ex = quote\nn           x = 1\nn           y = 2\nn           x + y\nn       end\nnquote  # none, line 2:\nn    x = 1 # none, line 3:\nn    y = 2 # none, line 4:\nn    x + y\nnend\nn\nnjulia> typeof(ex)\nnExpr"
},

{
    "location": "manual/metaprogramming.html#Interpolation-1",
    "title": "Interpolation",
    "category": "Section",
    "text": "Direct construction of Expr objects with value arguments is powerful, but Expr constructors can be tedious compared to \"normal\" Julia syntax. As an alternative, Julia allows \"splicing\" or interpolation of literals or expressions into quoted expressions. Interpolation is indicated by the $ prefix.In this example, the literal value of a is interpolated:julia> a = 1;\nn\nnjulia> ex = :($a + b)\nn:(1 + b)Interpolating into an unquoted expression is not supported and will cause a compile-time error:julia> $a + b\nnERROR: unsupported or misplaced expression $\nn ...In this example, the tuple (1,2,3) is interpolated as an expression into a conditional test:julia> ex = :(a in $:((1,2,3)) )\nn:(a in (1,2,3))Interpolating symbols into a nested expression requires enclosing each symbol in an enclosing quote block:julia> :( :a in $( :(:a + :b) ) )\nn                   ^^^^^^^^^^\nn                   quoted inner expressionThe use of $ for expression interpolation is intentionally reminiscent of string interpolation and command interpolation. Expression interpolation allows convenient, readable programmatic construction of complex Julia expressions."
},

{
    "location": "manual/metaprogramming.html#[eval()](@ref)-and-effects-1",
    "title": "eval() and effects",
    "category": "Section",
    "text": "Given an expression object, one can cause Julia to evaluate (execute) it at global scope using eval():julia> :(1 + 2)\nn:(1 + 2)\nn\nnjulia> eval(ans)\nn3\nn\nnjulia> ex = :(a + b)\nn:(a + b)\nn\nnjulia> eval(ex)\nnERROR: UndefVarError: b not defined\nn ...\nn\nnjulia> a = 1; b = 2;\nn\nnjulia> eval(ex)\nn3Every module has its own eval() function that evaluates expressions in its global scope. Expressions passed to eval() are not limited to returning values – they can also have side-effects that alter the state of the enclosing module's environment:julia> ex = :(x = 1)\nn:(x = 1)\nn\nnjulia> x\nnERROR: UndefVarError: x not defined\nn ...\nn\nnjulia> eval(ex)\nn1\nn\nnjulia> x\nn1Here, the evaluation of an expression object causes a value to be assigned to the global variable x.Since expressions are just Expr objects which can be constructed programmatically and then evaluated, it is possible to dynamically generate arbitrary code which can then be run using eval(). Here is a simple example:julia> a = 1;\nn\nnjulia> ex = Expr(:call, :+, a, :b)\nn:(1 + b)\nn\nnjulia> a = 0; b = 2;\nn\nnjulia> eval(ex)\nn3The value of a is used to construct the expression ex which applies the + function to the value 1 and the variable b. Note the important distinction between the way a and b are used:The value of the variablea at expression construction time is used as an immediate value in the expression. Thus, the value of a when the expression is evaluated no longer matters: the value in the expression is already 1, independent of whatever the value of a might be.\nnOn the other hand, the symbol:b is used in the expression construction, so the value of the variable b at that time is irrelevant – :b is just a symbol and the variable b need not even be defined. At expression evaluation time, however, the value of the symbol :b is resolved by looking up the value of the variable b."
},

{
    "location": "manual/metaprogramming.html#Functions-on-Expressions-1",
    "title": "Functions on Expressions",
    "category": "Section",
    "text": "As hinted above, one extremely useful feature of Julia is the capability to generate and manipulate Julia code within Julia itself. We have already seen one example of a function returning Expr objects: the parse() function, which takes a string of Julia code and returns the corresponding Expr. A function can also take one or more Expr objects as arguments, and return another Expr. Here is a simple, motivating example:julia> function math_expr(op, op1, op2)\nn         expr = Expr(:call, op, op1, op2)\nn         return expr\nn       end\nn\nn julia>  ex = math_expr(:+, 1, Expr(:call, :*, 4, 5))\nn :(1 + 4*5)\nn\nn julia> eval(ex)\nn 21As another example, here is a function that doubles any numeric argument, but leaves expressions alone:julia> function make_expr2(op, opr1, opr2)\nn         opr1f, opr2f = map(x -> isa(x, Number) ? 2*x : x, (opr1, opr2))\nn         retexpr = Expr(:call, op, opr1f, opr2f)\nn\nn         return retexpr\nn   end\nnmake_expr2 (generic function with 1 method)\nn\nnjulia> make_expr2(:+, 1, 2)\nn:(2 + 4)\nn\nnjulia> ex = make_expr2(:+, 1, Expr(:call, :*, 5, 8))\nn:(2 + 5 * 8)\nn\nnjulia> eval(ex)\nn42"
},

{
    "location": "manual/metaprogramming.html#Macros-1",
    "title": "Macros",
    "category": "Section",
    "text": "Macros provide a method to include generated code in the final body of a program. A macro maps a tuple of arguments to a returned expression, and the resulting expression is compiled directly rather than requiring a runtime eval() call. Macro arguments may include expressions, literal values, and symbols."
},

{
    "location": "manual/metaprogramming.html#Basics-1",
    "title": "Basics",
    "category": "Section",
    "text": "Here is an extraordinarily simple macro:macro sayhello()\nn    return :( println(\"Hello, world!\") )\nnendMacros have a dedicated character in Julia's syntax: the @ (at-sign), followed by the unique name declared in a macro NAME ... end block. In this example, the compiler will replace all instances of @sayhello with::( println(\"Hello, world!\") )When @sayhello is given at the REPL, the expression executes immediately, thus we only see the evaluation result:julia> @sayhello()\nn\"Hello, world!\"Now, consider a slightly more complex macro:julia> macro sayhello(name)\nn           return :( println(\"Hello, \", $name) )\nn       endThis macro takes one argument: name. When @sayhello is encountered, the quoted expression is expanded to interpolate the value of the argument into the final expression:julia> @sayhello(\"human\")\nnHello, humanWe can view the quoted return expression using the function macroexpand() (important note: this is an extremely useful tool for debugging macros):julia> ex = macroexpand( :(@sayhello(\"human\")) )\nn:(println(\"Hello, \",\"human\"))\nn                    ^^^^^^^\nn                    interpolated: now a literal string\nn\nnjulia> typeof(ex)\nnExpr"
},

{
    "location": "manual/metaprogramming.html#Hold-up:-why-macros?-1",
    "title": "Hold up: why macros?",
    "category": "Section",
    "text": "We have already seen a function f(::Expr...) -> Expr in a previous section. In fact, macroexpand() is also such a function. So, why do macros exist?Macros are necessary because they execute when code is parsed, therefore, macros allow the programmer to generate and include fragments of customized code before the full program is run. To illustrate the difference, consider the following example:julia> macro twostep(arg)\nn           println(\"I execute at parse time. The argument is: \", arg)\nn\nn           return :(println(\"I execute at runtime. The argument is: \", $arg))\nn       end\nn\nnjulia> ex = macroexpand( :(@twostep :(1, 2, 3)) );\nnI execute at parse time. The argument is: :((1,2,3))The first call to println() is executed when macroexpand() is called. The resulting expression contains only the second println:julia> typeof(ex)\nnExpr\nn\nnjulia> ex\nn:(println(\"I execute at runtime. The argument is: \",$(Expr(:copyast, :(:((1,2,3)))))))\nn\nnjulia> eval(ex)\nnI execute at runtime. The argument is: (1,2,3)"
},

{
    "location": "manual/metaprogramming.html#Macro-invocation-1",
    "title": "Macro invocation",
    "category": "Section",
    "text": "Macros are invoked with the following general syntax:@name expr1 expr2 ...\nn@name(expr1, expr2, ...)Note the distinguishing @ before the macro name and the lack of commas between the argument expressions in the first form, and the lack of whitespace after @name in the second form. The two styles should not be mixed. For example, the following syntax is different from the examples above; it passes the tuple (expr1, expr2, ...) as one argument to the macro:@name (expr1, expr2, ...)It is important to emphasize that macros receive their arguments as expressions, literals, or symbols. One way to explore macro arguments is to call the show() function within the macro body:julia> macro showarg(x)\nn   show(x)\nn   # ... remainder of macro, returning an expression\nnend\nn\nn\nnjulia> @showarg(a)\nn(:a,)\nn\nnjulia> @showarg(1+1)\nn:(1 + 1)\nn\nnjulia> @showarg(println(\"Yo!\"))\nn:(println(\"Yo!\"))"
},

{
    "location": "manual/metaprogramming.html#Building-an-advanced-macro-1",
    "title": "Building an advanced macro",
    "category": "Section",
    "text": "Here is a simplified definition of Julia's @assert macro:macro assert(ex)\nn    return :( $ex ? nothing : throw(AssertionError($(string(ex)))) )\nnendThis macro can be used like this:julia> @assert 1==1.0\nn\nnjulia> @assert 1==0\nnERROR: AssertionError: 1 == 0\nn ...In place of the written syntax, the macro call is expanded at parse time to its returned result. This is equivalent to writing:1==1.0 ? nothing : throw(AssertionError(\"1==1.0\"))\nn1==0 ? nothing : throw(AssertionError(\"1==0\"))That is, in the first call, the expression :(1==1.0) is spliced into the test condition slot, while the value of string(:(1==1.0)) is spliced into the assertion message slot. The entire expression, thus constructed, is placed into the syntax tree where the @assert macro call occurs. Then at execution time, if the test expression evaluates to true, then nothing is returned, whereas if the test is false, an error is raised indicating the asserted expression that was false. Notice that it would not be possible to write this as a function, since only the value of the condition is available and it would be impossible to display the expression that computed it in the error message.The actual definition of @assert in the standard library is more complicated. It allows the user to optionally specify their own error message, instead of just printing the failed expression. Just like in functions with a variable number of arguments, this is specified with an ellipses following the last argument:macro assert(ex, msgs...)\nn    msg_body = isempty(msgs) ? ex : msgs[1]\nn    msg = string(msg_body)\nn    return :($ex ? nothing : throw(AssertionError($msg)))\nnendNow @assert has two modes of operation, depending upon the number of arguments it receives! If there's only one argument, the tuple of expressions captured by msgs will be empty and it will behave the same as the simpler definition above. But now if the user specifies a second argument, it is printed in the message body instead of the failing expression. You can inspect the result of a macro expansion with the aptly named macroexpand() function:julia> macroexpand(:(@assert a==b))\nn:(if a == b\nn        nothing\nn    else\nn        (Base.throw)(Base.Main.Base.AssertionError(\"a == b\"))\nn    end)\nn\nnjulia> macroexpand(:(@assert a==b \"a should equal b!\"))\nn:(if a == b\nn        nothing\nn    else\nn        (Base.throw)(Base.Main.Base.AssertionError(\"a should equal b!\"))\nn    end)There is yet another case that the actual @assert macro handles: what if, in addition to printing \"a should equal b,\" we wanted to print their values? One might naively try to use string interpolation in the custom message, e.g., @assert a==b \"a ($a) should equal b ($b)!\", but this won't work as expected with the above macro. Can you see why? Recall from string interpolation that an interpolated string is rewritten to a call to string(). Compare:julia> typeof(:(\"a should equal b\"))\nnString\nn\nnjulia> typeof(:(\"a ($a) should equal b ($b)!\"))\nnExpr\nn\nnjulia> dump(:(\"a ($a) should equal b ($b)!\"))\nnExpr\nn  head: Symbol string\nn  args: Array{Any}((5,))\nn    1: String\nn      data: Array{UInt8}((3,)) UInt8[0x61,0x20,0x28]\nn    2: Symbol a\nn    3: String\nn      data: Array{UInt8}((18,)) UInt8[0x29,0x20,0x73,0x68,0x6f,0x75,0x6c,0x64,0x20,0x65,0x71,0x75,0x61,0x6c,0x20,0x62,0x20,0x28]\nn    4: Symbol b\nn    5: String\nn      data: Array{UInt8}((2,)) UInt8[0x29,0x21]\nn  typ: AnySo now instead of getting a plain string in msg_body, the macro is receiving a full expression that will need to be evaluated in order to display as expected. This can be spliced directly into the returned expression as an argument to the string() call; see error.jl for the complete implementation.The @assert macro makes great use of splicing into quoted expressions to simplify the manipulation of expressions inside the macro body."
},

{
    "location": "manual/metaprogramming.html#Hygiene-1",
    "title": "Hygiene",
    "category": "Section",
    "text": "An issue that arises in more complex macros is that of hygiene. In short, macros must ensure that the variables they introduce in their returned expressions do not accidentally clash with existing variables in the surrounding code they expand into. Conversely, the expressions that are passed into a macro as arguments are often expected to evaluate in the context of the surrounding code, interacting with and modifying the existing variables. Another concern arises from the fact that a macro may be called in a different module from where it was defined. In this case we need to ensure that all global variables are resolved to the correct module. Julia already has a major advantage over languages with textual macro expansion (like C) in that it only needs to consider the returned expression. All the other variables (such as msg in @assert above) follow the normal scoping block behavior.To demonstrate these issues, let us consider writing a @time macro that takes an expression as its argument, records the time, evaluates the expression, records the time again, prints the difference between the before and after times, and then has the value of the expression as its final value. The macro might look like this:macro time(ex)\nn  return quote\nn    local t0 = time()\nn    local val = $ex\nn    local t1 = time()\nn    println(\"elapsed time: \", t1-t0, \" seconds\")\nn    val\nn  end\nnendHere, we want t0, t1, and val to be private temporary variables, and we want time to refer to the time() function in the standard library, not to any time variable the user might have (the same applies to println). Imagine the problems that could occur if the user expression ex also contained assignments to a variable called t0, or defined its own time variable. We might get errors, or mysteriously incorrect behavior.Julia's macro expander solves these problems in the following way. First, variables within a macro result are classified as either local or global. A variable is considered local if it is assigned to (and not declared global), declared local, or used as a function argument name. Otherwise, it is considered global. Local variables are then renamed to be unique (using the gensym() function, which generates new symbols), and global variables are resolved within the macro definition environment. Therefore both of the above concerns are handled; the macro's locals will not conflict with any user variables, and time and println will refer to the standard library definitions.One problem remains however. Consider the following use of this macro:module MyModule\nnimport Base.@time\nn\nntime() = ... # compute something\nn\nn@time time()\nnendHere the user expression ex is a call to time, but not the same time function that the macro uses. It clearly refers to MyModule.time. Therefore we must arrange for the code in ex to be resolved in the macro call environment. This is done by \"escaping\" the expression with esc():macro time(ex)\nn    ...\nn    local val = $(esc(ex))\nn    ...\nnendAn expression wrapped in this manner is left alone by the macro expander and simply pasted into the output verbatim. Therefore it will be resolved in the macro call environment.This escaping mechanism can be used to \"violate\" hygiene when necessary, in order to introduce or manipulate user variables. For example, the following macro sets x to zero in the call environment:macro zerox()\nn  return esc(:(x = 0))\nnend\nn\nnfunction foo()\nn  x = 1\nn  @zerox\nn  x  # is zero\nnendThis kind of manipulation of variables should be used judiciously, but is occasionally quite handy."
},

{
    "location": "manual/metaprogramming.html#Code-Generation-1",
    "title": "Code Generation",
    "category": "Section",
    "text": "When a significant amount of repetitive boilerplate code is required, it is common to generate it programmatically to avoid redundancy. In most languages, this requires an extra build step, and a separate program to generate the repetitive code. In Julia, expression interpolation and eval() allow such code generation to take place in the normal course of program execution. For example, the following code defines a series of operators on three arguments in terms of their 2-argument forms:for op = (:+, :*, :&, :|, :$)\nn  eval(quote\nn    ($op)(a,b,c) = ($op)(($op)(a,b),c)\nn  end)\nnendIn this manner, Julia acts as its own preprocessor, and allows code generation from inside the language. The above code could be written slightly more tersely using the : prefix quoting form:for op = (:+, :*, :&, :|, :$)\nn  eval(:(($op)(a,b,c) = ($op)(($op)(a,b),c)))\nnendThis sort of in-language code generation, however, using the eval(quote(...)) pattern, is common enough that Julia comes with a macro to abbreviate this pattern:for op = (:+, :*, :&, :|, :$)\nn  @eval ($op)(a,b,c) = ($op)(($op)(a,b),c)\nnendThe @eval macro rewrites this call to be precisely equivalent to the above longer versions. For longer blocks of generated code, the expression argument given to @eval can be a block:@eval begin\nn  # multiple lines\nnend"
},

{
    "location": "manual/metaprogramming.html#Non-Standard-String-Literals-1",
    "title": "Non-Standard String Literals",
    "category": "Section",
    "text": "Recall from Strings that string literals prefixed by an identifier are called non-standard string literals, and can have different semantics than un-prefixed string literals. For example:r\"^\s*(?:#|$)\" produces a regular expression object rather than a string\nnb\"DATA\xff\u2200\" is a byte array literal for [68,65,84,65,255,226,136,128].Perhaps surprisingly, these behaviors are not hard-coded into the Julia parser or compiler. Instead, they are custom behaviors provided by a general mechanism that anyone can use: prefixed string literals are parsed as calls to specially-named macros. For example, the regular expression macro is just the following:macro r_str(p)\nn  Regex(p)\nnendThat's all. This macro says that the literal contents of the string literal r\"^\s*(?:#|$)\" should be passed to the @r_str macro and the result of that expansion should be placed in the syntax tree where the string literal occurs. In other words, the expression r\"^\s*(?:#|$)\" is equivalent to placing the following object directly into the syntax tree:Regex(\"^\\s*(?:#|\$)\")Not only is the string literal form shorter and far more convenient, but it is also more efficient: since the regular expression is compiled and the Regex object is actually created when the code is compiled, the compilation occurs only once, rather than every time the code is executed. Consider if the regular expression occurs in a loop:for line = lines\nn  m = match(r\"^\s*(?:#|$)\", line)\nn  if m == nothing\nn    # non-comment\nn  else\nn    # comment\nn  end\nnendSince the regular expression r\"^\s*(?:#|$)\" is compiled and inserted into the syntax tree when this code is parsed, the expression is only compiled once instead of each time the loop is executed. In order to accomplish this without macros, one would have to write this loop like this:re = Regex(\"^\\s*(?:#|\$)\")\nnfor line = lines\nn  m = match(re, line)\nn  if m == nothing\nn    # non-comment\nn  else\nn    # comment\nn  end\nnendMoreover, if the compiler could not determine that the regex object was constant over all loops, certain optimizations might not be possible, making this version still less efficient than the more convenient literal form above. Of course, there are still situations where the non-literal form is more convenient: if one needs to interpolate a variable into the regular expression, one must take this more verbose approach; in cases where the regular expression pattern itself is dynamic, potentially changing upon each loop iteration, a new regular expression object must be constructed on each iteration. In the vast majority of use cases, however, regular expressions are not constructed based on run-time data. In this majority of cases, the ability to write regular expressions as compile-time values is invaluable.The mechanism for user-defined string literals is deeply, profoundly powerful. Not only are Julia's non-standard literals implemented using it, but also the command literal syntax (`echo \"Hello, $person\"`) is implemented with the following innocuous-looking macro:macro cmd(str)\nn  :(cmd_gen($shell_parse(str)))\nnendOf course, a large amount of complexity is hidden in the functions used in this macro definition, but they are just functions, written entirely in Julia. You can read their source and see precisely what they do – and all they do is construct expression objects to be inserted into your program's syntax tree."
},

{
    "location": "manual/metaprogramming.html#Generated-functions-1",
    "title": "Generated functions",
    "category": "Section",
    "text": "A very special macro is @generated, which allows you to define so-called generated functions. These have the capability to generate specialized code depending on the types of their arguments with more flexibility and/or less code than what can be achieved with multiple dispatch. While macros work with expressions at parsing-time and cannot access the types of their inputs, a generated function gets expanded at a time when the types of the arguments are known, but the function is not yet compiled.Instead of performing some calculation or action, a generated function declaration returns a quoted expression which then forms the body for the method corresponding to the types of the arguments. When called, the body expression is compiled (or fetched from a cache, on subsequent calls) and only the returned expression - not the code that generated it - is evaluated. Thus, generated functions provide a flexible framework to move work from run-time to compile-time.When defining generated functions, there are three main differences to ordinary functions:You annotate the function declaration with the @generated macro. This adds some information to the AST that lets the compiler know that this is a generated function.\nnIn the body of the generated function you only have access to the types of the arguments, not their values.\nnInstead of calculating something or performing some action, you return a quoted expression which, when evaluated, does what you want.It's easiest to illustrate this with an example. We can declare a generated function foo asjulia> @generated function foo(x)\nn           println(x)\nn           return :(x*x)\nn       end\nnfoo (generic function with 1 method)Note that the body returns a quoted expression, namely :(x*x), rather than just the value of x*x.From the caller's perspective, they are very similar to regular functions; in fact, you don't have to know if you're calling a regular or generated function - the syntax and result of the call is just the same. Let's see how foo behaves:# note: output is from println() statement in the body\nnjulia> x = foo(2);\nnInt64\nn\nnjulia> x           # now we print x\nn4\nn\nnjulia> y = foo(\"bar\");\nnString\nn\nnjulia> y\nn\"barbar\"So, we see that in the body of the generated function, x is the type of the passed argument, and the value returned by the generated function, is the result of evaluating the quoted expression we returned from the definition, now with the value of x.What happens if we evaluate foo again with a type that we have already used?julia> foo(4)\nn16Note that there is no printout of Int64. The body of the generated function is only executed once (not entirely true, see note below) when the method for that specific set of argument types is compiled. After that, the expression returned from the generated function on the first invocation is re-used as the method body.The reason for the disclaimer above is that the number of times a generated function is generated is really an implementation detail; it might be only once, but it might also be more often. As a consequence, you should never write a generated function with side effects - when, and how often, the side effects occur is undefined. (This is true for macros too - and just like for macros, the use of eval() in a generated function is a sign that you're doing something the wrong way.)The example generated function foo above did not do anything a normal function foo(x)=x*x could not do, except printing the type on the first invocation (and incurring a higher compile-time cost). However, the power of a generated function lies in its ability to compute different quoted expression depending on the types passed to it:julia> @generated function bar(x)\nn           if x <: Integer\nn               return :(x^2)\nn           else\nn               return :(x)\nn           end\nn       end\nnbar (generic function with 1 method)\nn\nnjulia> bar(4)\nn16\nnjulia> bar(\"baz\")\nn\"baz\"(although of course this contrived example is easily implemented using multiple dispatch...)We can, of course, abuse this to produce some interesting behavior:julia> @generated function baz(x)\nn           if rand() < .9\nn               return :(x^2)\nn           else\nn               return :(\"boo!\")\nn           end\nn       end\nnbaz (generic function with 1 method)Since the body of the generated function is non-deterministic, its behavior is undefined; the expression returned on the first invocation will be used for all subsequent invocations with the same type (again, with the exception covered by the disclaimer above). When we call the generated function with x of a new type, rand() will be called again to see which method body to use for the new type. In this case, for one type out of ten, baz(x) will return the string \"boo!\".Don't copy these examples!These examples are hopefully helpful to illustrate how generated functions work, both in the definition end and at the call site; however, don't copy them, for the following reasons:the foo function has side-effects, and it is undefined exactly when, how often or how many times these side-effects will occur\nnthe bar function solves a problem that is better solved with multiple dispatch - defining bar(x) = x and bar(x::Integer) = x^2 will do the same thing, but it is both simpler and faster.\nnthe baz function is pathologically insaneInstead, now that we have a better understanding for how generated functions work, let's use them to build some more advanced functionality..."
},

{
    "location": "manual/methods.html",
    "title": "Methods",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/methods.html#Methods-1",
    "title": "Methods",
    "category": "Section",
    "text": "Recall from Functions that a function is an object that maps a tuple of arguments to a return value, or throws an exception if no appropriate value can be returned. It is common for the same conceptual function or operation to be implemented quite differently for different types of arguments: adding two integers is very different from adding two floating-point numbers, both of which are distinct from adding an integer to a floating-point number. Despite their implementation differences, these operations all fall under the general concept of \"addition\". Accordingly, in Julia, these behaviors all belong to a single object: the + function.To facilitate using many different implementations of the same concept smoothly, functions need not be defined all at once, but can rather be defined piecewise by providing specific behaviors for certain combinations of argument types and counts. A definition of one possible behavior for a function is called a method. Thus far, we have presented only examples of functions defined with a single method, applicable to all types of arguments. However, the signatures of method definitions can be annotated to indicate the types of arguments in addition to their number, and more than a single method definition may be provided. When a function is applied to a particular tuple of arguments, the most specific method applicable to those arguments is applied. Thus, the overall behavior of a function is a patchwork of the behaviors of its various method definitions. If the patchwork is well designed, even though the implementations of the methods may be quite different, the outward behavior of the function will appear seamless and consistent.The choice of which method to execute when a function is applied is called dispatch. Julia allows the dispatch process to choose which of a function's methods to call based on the number of arguments given, and on the types of all of the function's arguments. This is different than traditional object-oriented languages, where dispatch occurs based only on the first argument, which often has a special argument syntax, and is sometimes implied rather than explicitly written as an argument. [1] Using all of a function's arguments to choose which method should be invoked, rather than just the first, is known as multiple dispatch. Multiple dispatch is particularly useful for mathematical code, where it makes little sense to artificially deem the operations to \"belong\" to one argument more than any of the others: does the addition operation in x + y belong to x any more than it does to y? The implementation of a mathematical operator generally depends on the types of all of its arguments. Even beyond mathematical operations, however, multiple dispatch ends up being a powerful and convenient paradigm for structuring and organizing programs.footnote: [1]\nnIn C++ or Java, for example, in a method call like obj.meth(arg1,arg2), the object obj \"receives\" the method call and is implicitly passed to the method via the this keyword, rather than as an explicit method argument. When the current this object is the receiver of a method call, it can be omitted altogether, writing just meth(arg1,arg2), with this implied as the receiving object."
},

{
    "location": "manual/methods.html#Defining-Methods-1",
    "title": "Defining Methods",
    "category": "Section",
    "text": "Until now, we have, in our examples, defined only functions with a single method having unconstrained argument types. Such functions behave just like they would in traditional dynamically typed languages. Nevertheless, we have used multiple dispatch and methods almost continually without being aware of it: all of Julia's standard functions and operators, like the aforementioned + function, have many methods defining their behavior over various possible combinations of argument type and count.When defining a function, one can optionally constrain the types of parameters it is applicable to, using the :: type-assertion operator, introduced in the section on Composite Types:julia> f(x::Float64, y::Float64) = 2x + y;This function definition applies only to calls where x and y are both values of type Float64:julia> f(2.0, 3.0)\nn7.0Applying it to any other types of arguments will result in a MethodError:julia> f(2.0, 3)\nnERROR: MethodError: no method matching f(::Float64, ::Int64)\nnClosest candidates are:\nn  f(::Float64, !Matched::Float64)\nn ...\nn\nnjulia> f(Float32(2.0), 3.0)\nnERROR: MethodError: no method matching f(::Float32, ::Float64)\nnClosest candidates are:\nn  f(!Matched::Float64, ::Float64)\nn ...\nn\nnjulia> f(2.0, \"3.0\")\nnERROR: MethodError: no method matching f(::Float64, ::String)\nnClosest candidates are:\nn  f(::Float64, !Matched::Float64)\nn ...\nn\nnjulia> f(\"2.0\", \"3.0\")\nnERROR: MethodError: no method matching f(::String, ::String)\nn ...As you can see, the arguments must be precisely of type Float64. Other numeric types, such as integers or 32-bit floating-point values, are not automatically converted to 64-bit floating-point, nor are strings parsed as numbers. Because Float64 is a concrete type and concrete types cannot be subclassed in Julia, such a definition can only be applied to arguments that are exactly of type Float64. It may often be useful, however, to write more general methods where the declared parameter types are abstract:julia> f(x::Number, y::Number) = 2x - y;\nn\nnjulia> f(2.0, 3)\nn1.0This method definition applies to any pair of arguments that are instances of Number. They need not be of the same type, so long as they are each numeric values. The problem of handling disparate numeric types is delegated to the arithmetic operations in the expression 2x - y.To define a function with multiple methods, one simply defines the function multiple times, with different numbers and types of arguments. The first method definition for a function creates the function object, and subsequent method definitions add new methods to the existing function object. The most specific method definition matching the number and types of the arguments will be executed when the function is applied. Thus, the two method definitions above, taken together, define the behavior for f over all pairs of instances of the abstract type Number – but with a different behavior specific to pairs of Float64 values. If one of the arguments is a 64-bit float but the other one is not, then the f(Float64,Float64) method cannot be called and the more general f(Number,Number) method must be used:julia> f(2.0, 3.0)\nn7.0\nn\nnjulia> f(2, 3.0)\nn1.0\nn\nnjulia> f(2.0, 3)\nn1.0\nn\nnjulia> f(2, 3)\nn1The 2x + y definition is only used in the first case, while the 2x - y definition is used in the others. No automatic casting or conversion of function arguments is ever performed: all conversion in Julia is non-magical and completely explicit. Conversion and Promotion, however, shows how clever application of sufficiently advanced technology can be indistinguishable from magic. [Clarke61]For non-numeric values, and for fewer or more than two arguments, the function f remains undefined, and applying it will still result in a MethodError:julia> f(\"foo\", 3)\nnERROR: MethodError: no method matching f(::String, ::Int64)\nnClosest candidates are:\nn  f(!Matched::Number, ::Number)\nn ...\nn\nnjulia> f()\nnERROR: MethodError: no method matching f()\nnClosest candidates are:\nn  f(!Matched::Float64, !Matched::Float64)\nn  f(!Matched::Number, !Matched::Number)\nn ...You can easily see which methods exist for a function by entering the function object itself in an interactive session:julia> f\nnf (generic function with 2 methods)This output tells us that f is a function object with two methods. To find out what the signatures of those methods are, use the methods() function:julia> methods(f)\nn# 2 methods for generic function \"f\":\nnf(x::Float64, y::Float64) at none:1\nnf(x::Number, y::Number) at none:1which shows that f has two methods, one taking two Float64 arguments and one taking arguments of type Number. It also indicates the file and line number where the methods were defined: because these methods were defined at the REPL, we get the apparent line number none:1.In the absence of a type declaration with ::, the type of a method parameter is Any by default, meaning that it is unconstrained since all values in Julia are instances of the abstract type Any. Thus, we can define a catch-all method for f like so:julia> f(x,y) = println(\"Whoa there, Nelly.\");\nn\nnjulia> f(\"foo\", 1)\nnWhoa there, Nelly.This catch-all is less specific than any other possible method definition for a pair of parameter values, so it is only be called on pairs of arguments to which no other method definition applies.Although it seems a simple concept, multiple dispatch on the types of values is perhaps the single most powerful and central feature of the Julia language. Core operations typically have dozens of methods: julia> methods(+)\nn # 166 methods for generic function \"+\":\nn +(a::Float16, b::Float16) at float16.jl:136\nn +(x::Float32, y::Float32) at float.jl:206\nn +(x::Float64, y::Float64) at float.jl:207\nn +(x::Bool, z::Complex{Bool}) at complex.jl:126\nn +(x::Bool, y::Bool) at bool.jl:48\nn +(x::Bool) at bool.jl:45\nn +{T<:AbstractFloat}(x::Bool, y::T) at bool.jl:55\nn +(x::Bool, z::Complex) at complex.jl:133\nn +(x::Bool, A::AbstractArray{Bool,N<:Any}) at arraymath.jl:105\nn +(x::Char, y::Integer) at char.jl:40\nn +{T<:Union{Int128,Int16,Int32,Int64,Int8,UInt128,UInt16,UInt32,UInt64,UInt8}}(x::T, y::T) at int.jl:32\nn +(z::Complex, w::Complex) at complex.jl:115\nn +(z::Complex, x::Bool) at complex.jl:134\nn +(x::Real, z::Complex{Bool}) at complex.jl:140\nn +(x::Real, z::Complex) at complex.jl:152\nn +(z::Complex, x::Real) at complex.jl:153\nn +(x::Rational, y::Rational) at rational.jl:179\nn ...\nn +(a, b, c, xs...) at operators.jl:119Multiple dispatch together with the flexible parametric type system give Julia its ability to abstractly express high-level algorithms decoupled from implementation details, yet generate efficient, specialized code to handle each case at run time."
},

{
    "location": "manual/methods.html#Method-Ambiguities-1",
    "title": "Method Ambiguities",
    "category": "Section",
    "text": "It is possible to define a set of function methods such that there is no unique most specific method applicable to some combinations of arguments:julia> g(x::Float64, y) = 2x + y;\nn\nnjulia> g(x, y::Float64) = x + 2y;\nn\nnjulia> g(2.0, 3)\nn7.0\nn\nnjulia> g(2, 3.0)\nn8.0\nn\nnjulia> g(2.0, 3.0)\nnERROR: MethodError: g(::Float64, ::Float64) is ambiguous. Candidates:\nn  g(x, y::Float64) at none:1\nn  g(x::Float64, y) at none:1\nn ...Here the call g(2.0, 3.0) could be handled by either the g(Float64, Any) or the g(Any, Float64) method, and neither is more specific than the other. In such cases, Julia raises a MethodError rather than arbitrarily picking a method. You can avoid method ambiguities by specifying an appropriate method for the intersection case:julia> g(x::Float64, y::Float64) = 2x + 2y;\nn\nnjulia> g(x::Float64, y) = 2x + y;\nn\nnjulia> g(x, y::Float64) = x + 2y;\nn\nnjulia> g(2.0, 3)\nn7.0\nn\nnjulia> g(2, 3.0)\nn8.0\nn\nnjulia> g(2.0, 3.0)\nn10.0It is recommended that the disambiguating method be defined first, since otherwise the ambiguity exists, if transiently, until the more specific method is defined."
},

{
    "location": "manual/methods.html#Parametric-Methods-1",
    "title": "Parametric Methods",
    "category": "Section",
    "text": "Method definitions can optionally have type parameters immediately after the method name and before the parameter tuple:julia> same_type{T}(x::T, y::T) = true;\nn\nnjulia> same_type(x,y) = false;The first method applies whenever both arguments are of the same concrete type, regardless of what type that is, while the second method acts as a catch-all, covering all other cases. Thus, overall, this defines a boolean function that checks whether its two arguments are of the same type:julia> same_type(1, 2)\nntrue\nn\nnjulia> same_type(1, 2.0)\nnfalse\nn\nnjulia> same_type(1.0, 2.0)\nntrue\nn\nnjulia> same_type(\"foo\", 2.0)\nnfalse\nn\nnjulia> same_type(\"foo\", \"bar\")\nntrue\nn\nnjulia> same_type(Int32(1), Int64(2))\nnfalseThis kind of definition of function behavior by dispatch is quite common – idiomatic, even – in Julia. Method type parameters are not restricted to being used as the types of parameters: they can be used anywhere a value would be in the signature of the function or body of the function. Here's an example where the method type parameter T is used as the type parameter to the parametric type Vector{T} in the method signature:julia> myappend{T}(v::Vector{T}, x::T) = [v..., x]\nnmyappend (generic function with 1 method)\nn\nnjulia> myappend([1,2,3],4)\nn4-element Array{Int64,1}:\nn 1\nn 2\nn 3\nn 4\nn\nnjulia> myappend([1,2,3],2.5)\nnERROR: MethodError: no method matching myappend(::Array{Int64,1}, ::Float64)\nnClosest candidates are:\nn  myappend{T}(::Array{T,1}, !Matched::T)\nn ...\nn\nnjulia> myappend([1.0,2.0,3.0],4.0)\nn4-element Array{Float64,1}:\nn 1.0\nn 2.0\nn 3.0\nn 4.0\nn\nnjulia> myappend([1.0,2.0,3.0],4)\nnERROR: MethodError: no method matching myappend(::Array{Float64,1}, ::Int64)\nnClosest candidates are:\nn  myappend{T}(::Array{T,1}, !Matched::T)\nn ...As you can see, the type of the appended element must match the element type of the vector it is appended to, or else a MethodError is raised. In the following example, the method type parameter T is used as the return value:julia> mytypeof{T}(x::T) = T\nnmytypeof (generic function with 1 method)\nn\nnjulia> mytypeof(1)\nnInt64\nn\nnjulia> mytypeof(1.0)\nnFloat64Just as you can put subtype constraints on type parameters in type declarations (see Parametric Types), you can also constrain type parameters of methods:same_type_numeric{T<:Number}(x::T, y::T) = true\nnsame_type_numeric(x::Number, y::Number) = false\nn\nnjulia> same_type_numeric(1, 2)\nntrue\nn\nnjulia> same_type_numeric(1, 2.0)\nnfalse\nn\nnjulia> same_type_numeric(1.0, 2.0)\nntrue\nn\nnjulia> same_type_numeric(\"foo\", 2.0)\nnno method same_type_numeric(String,Float64)\nn\nnjulia> same_type_numeric(\"foo\", \"bar\")\nnno method same_type_numeric(String,String)\nn\nnjulia> same_type_numeric(Int32(1), Int64(2))\nnfalseThe same_type_numeric function behaves much like the same_type function defined above, but is only defined for pairs of numbers."
},

{
    "location": "manual/methods.html#Parametrically-constrained-Varargs-methods-1",
    "title": "Parametrically-constrained Varargs methods",
    "category": "Section",
    "text": "Function parameters can also be used to constrain the number of arguments that may be supplied to a \"varargs\" function (Varargs Functions).  The notation Vararg{T,N} is used to indicate such a constraint.  For example:julia> bar(a,b,x::Vararg{Any,2}) = (a,b,x);\nn\nnjulia> bar(1,2,3)\nnERROR: MethodError: no method matching bar(::Int64, ::Int64, ::Int64)\nn...\nn\nnjulia> bar(1,2,3,4)\nn(1,2,(3,4))\nn\nnjulia> bar(1,2,3,4,5)\nnERROR: MethodError: no method matching bar(::Int64, ::Int64, ::Int64, ::Int64, ::Int64)\nn...More usefully, it is possible to constrain varargs methods by a parameter.  For example:function getindex{T,N}(A::AbstractArray{T,N}, indexes::Vararg{Number,N})would be called only when the number of indexes matches the dimensionality of the array."
},

{
    "location": "manual/methods.html#Note-on-Optional-and-keyword-Arguments-1",
    "title": "Note on Optional and keyword Arguments",
    "category": "Section",
    "text": "As mentioned briefly in Functions, optional arguments are implemented as syntax for multiple method definitions. For example, this definition:f(a=1,b=2) = a+2btranslates to the following three methods:f(a,b) = a+2b\nnf(a) = f(a,2)\nnf() = f(1,2)This means that calling f() is equivalent to calling f(1,2). In this case the result is 5, because f(1,2) invokes the first method of f above. However, this need not always be the case. If you define a fourth method that is more specialized for integers:f(a::Int,b::Int) = a-2bthen the result of both f() and f(1,2) is -3. In other words, optional arguments are tied to a function, not to any specific method of that function. It depends on the types of the optional arguments which method is invoked. When optional arguments are defined in terms of a global variable, the type of the optional argument may even change at run-time.Keyword arguments behave quite differently from ordinary positional arguments. In particular, they do not participate in method dispatch. Methods are dispatched based only on positional arguments, with keyword arguments processed after the matching method is identified."
},

{
    "location": "manual/methods.html#Function-like-objects-1",
    "title": "Function-like objects",
    "category": "Section",
    "text": "Methods are associated with types, so it is possible to make any arbitrary Julia object \"callable\" by adding methods to its type. (Such \"callable\" objects are sometimes called \"functors.\")For example, you can define a type that stores the coefficients of a polynomial, but behaves like a function evaluating the polynomial:immutable Polynomial{R}\nn    coeffs::Vector{R}\nnend\nn\nnfunction (p::Polynomial)(x)\nn    v = p.coeffs[end]\nn    for i = (length(p.coeffs)-1):-1:1\nn        v = v*x + p.coeffs[i]\nn    end\nn    return v\nnendNotice that the function is specified by type instead of by name. In the function body, p will refer to the object that was called. A Polynomial can be used as follows:julia> p = Polynomial([1,10,100])\nnPolynomial{Int64}([1,10,100])\nn\nnjulia> p(3)\nn931This mechanism is also the key to how type constructors and closures (inner functions that refer to their surrounding environment) work in Julia, discussed later in the manual."
},

{
    "location": "manual/modules.html",
    "title": "Modules",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/modules.html#Modules-1",
    "title": "Modules",
    "category": "Section",
    "text": "Modules in Julia are separate variable workspaces, i.e. they introduce a new global scope. They are delimited syntactically, inside module Name ... end. Modules allow you to create top-level definitions (aka global variables) without worrying about name conflicts when your code is used together with somebody else's. Within a module, you can control which names from other modules are visible (via importing), and specify which of your names are intended to be public (via exporting).The following example demonstrates the major features of modules. It is not meant to be run, but is shown for illustrative purposes:module MyModule\nnusing Lib\nn\nnusing BigLib: thing1, thing2\nn\nnimport Base.show\nn\nnimportall OtherLib\nn\nnexport MyType, foo\nn\nntype MyType\nn    x\nnend\nn\nnbar(x) = 2x\nnfoo(a::MyType) = bar(a.x) + 1\nn\nnshow(io, a::MyType) = print(io, \"MyType $(a.x)\")\nnendNote that the style is not to indent the body of the module, since that would typically lead to whole files being indented.This module defines a type MyType, and two functions. Function foo and type MyType are exported, and so will be available for importing into other modules.  Function bar is private to MyModule.The statement using Lib means that a module called Lib will be available for resolving names as needed. When a global variable is encountered that has no definition in the current module, the system will search for it among variables exported by Lib and import it if it is found there. This means that all uses of that global within the current module will resolve to the definition of that variable in Lib.The statement using BigLib: thing1, thing2 is a syntactic shortcut for using BigLib.thing1, BigLib.thing2.The import keyword supports all the same syntax as using, but only operates on a single name at a time. It does not add modules to be searched the way using does. import also differs from using in that functions must be imported using import to be extended with new methods.In MyModule above we wanted to add a method to the standard show function, so we had to write import Base.show. Functions whose names are only visible via using cannot be extended.The keyword importall explicitly imports all names exported by the specified module, as if import were individually used on all of them.Once a variable is made visible via using or import, a module may not create its own variable with the same name. Imported variables are read-only; assigning to a global variable always affects a variable owned by the current module, or else raises an error."
},

{
    "location": "manual/modules.html#Summary-of-module-usage-1",
    "title": "Summary of module usage",
    "category": "Section",
    "text": "To load a module, two main keywords can be used: using and import. To understand their differences, consider the following example:module MyModule\nn\nnexport x, y\nn\nnx() = \"x\"\nny() = \"y\"\nnp() = \"p\"\nn\nnendIn this module we export the x and y functions (with the keyword export), and also have the non-exported function p. There are several different ways to load the Module and its inner functions into the current workspace:Import Command What is brought into scope Available for method extension\nnusing MyModule All exported names (x and y), MyModule.x, MyModule.y and MyModule.p MyModule.x, MyModule.y and MyModule.p\nnusing MyModule.x, MyModule.p x and p  \nnusing MyModule: x, p x and p  \nnimport MyModule MyModule.x, MyModule.y and MyModule.p MyModule.x, MyModule.y and MyModule.p\nnimport MyModule.x, MyModule.p x and p x and p\nnimport MyModule: x, p x and p x and p\nnimportall MyModule All exported names (x and y) x and y"
},

{
    "location": "manual/modules.html#Modules-and-files-1",
    "title": "Modules and files",
    "category": "Section",
    "text": "Files and file names are mostly unrelated to modules; modules are associated only with module expressions. One can have multiple files per module, and multiple modules per file:module Foo\nn\nninclude(\"file1.jl\")\nninclude(\"file2.jl\")\nn\nnendIncluding the same code in different modules provides mixin-like behavior. One could use this to run the same code with different base definitions, for example testing code by running it with \"safe\" versions of some operators:module Normal\nninclude(\"mycode.jl\")\nnend\nn\nnmodule Testing\nninclude(\"safe_operators.jl\")\nninclude(\"mycode.jl\")\nnend"
},

{
    "location": "manual/modules.html#Standard-modules-1",
    "title": "Standard modules",
    "category": "Section",
    "text": "There are three important standard modules: Main, Core, and Base.Main is the top-level module, and Julia starts with Main set as the current module.  Variables defined at the prompt go in Main, and whos() lists variables in Main.Core contains all identifiers considered \"built in\" to the language, i.e. part of the core language and not libraries. Every module implicitly specifies using Core, since you can't do anything without those definitions.Base is the standard library (the contents of base/). All modules implicitly contain using Base, since this is needed in the vast majority of cases."
},

{
    "location": "manual/modules.html#Default-top-level-definitions-and-bare-modules-1",
    "title": "Default top-level definitions and bare modules",
    "category": "Section",
    "text": "In addition to using Base, modules also automatically contain a definition of the eval function, which evaluates expressions within the context of that module.If these default definitions are not wanted, modules can be defined using the keyword baremodule instead (note: Core is still imported, as per above). In terms of baremodule, a standard module looks like this:baremodule Mod\nn\nnusing Base\nn\nneval(x) = Core.eval(Mod, x)\nneval(m,x) = Core.eval(m, x)\nn\nn...\nn\nnend"
},

{
    "location": "manual/modules.html#Relative-and-absolute-module-paths-1",
    "title": "Relative and absolute module paths",
    "category": "Section",
    "text": "Given the statement using Foo, the system looks for Foo within Main. If the module does not exist, the system attempts to require(\"Foo\"), which typically results in loading code from an installed package.However, some modules contain submodules, which means you sometimes need to access a module that is not directly available in Main. There are two ways to do this. The first is to use an absolute path, for example using Base.Sort. The second is to use a relative path, which makes it easier to import submodules of the current module or any of its enclosing modules:module Parent\nn\nnmodule Utils\nn...\nnend\nn\nnusing .Utils\nn\nn...\nnendHere module Parent contains a submodule Utils, and code in Parent wants the contents of Utils to be visible. This is done by starting the using path with a period. Adding more leading periods moves up additional levels in the module hierarchy. For example using ..Utils would look for Utils in Parent's enclosing module rather than in Parent itself.Note that relative-import qualifiers are only valid in using and import statements."
},

{
    "location": "manual/modules.html#Module-file-paths-1",
    "title": "Module file paths",
    "category": "Section",
    "text": "The global variable LOAD_PATH contains the directories Julia searches for modules when calling require. It can be extended using push!:push!(LOAD_PATH, \"/Path/To/My/Module/\")Putting this statement in the file ~/.juliarc.jl will extend LOAD_PATH on every Julia startup. Alternatively, the module load path can be extended by defining the environment variable JULIA_LOAD_PATH."
},

{
    "location": "manual/modules.html#Namespace-miscellanea-1",
    "title": "Namespace miscellanea",
    "category": "Section",
    "text": "If a name is qualified (e.g. Base.sin), then it can be accessed even if it is not exported. This is often useful when debugging.Macro names are written with @ in import and export statements, e.g. import Mod.@mac. Macros in other modules can be invoked as Mod.@mac or @Mod.mac.The syntax M.x = y does not work to assign a global in another module; global assignment is always module-local.A variable can be \"reserved\" for the current module without assigning to it by declaring it as global x at the top level. This can be used to prevent name conflicts for globals initialized after load time."
},

{
    "location": "manual/networking-and-streams.html",
    "title": "Networking and Streams",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/networking-and-streams.html#Networking-and-Streams-1",
    "title": "Networking and Streams",
    "category": "Section",
    "text": "Julia provides a rich interface to deal with streaming I/O objects such as terminals, pipes and TCP sockets. This interface, though asynchronous at the system level, is presented in a synchronous manner to the programmer and it is usually unnecessary to think about the underlying asynchronous operation. This is achieved by making heavy use of Julia cooperative threading (coroutine) functionality."
},

{
    "location": "manual/networking-and-streams.html#Basic-Stream-I/O-1",
    "title": "Basic Stream I/O",
    "category": "Section",
    "text": "All Julia streams expose at least a read() and a write() method, taking the stream as their first argument, e.g.:julia> write(STDOUT,\"Hello World\");  # suppress return value 11 with ;\nnHello World\nnjulia> read(STDIN,Char)\nn\nn'\n'Note that write() returns 11, the number of bytes (in \"Hello World\") written to STDOUT, but this return value is suppressed with the ;.Here Enter was pressed again so that Julia would read the newline. Now, as you can see from this example, write() takes the data to write as its second argument, while read() takes the type of the data to be read as the second argument.For example, to read a simple byte array, we could do:julia> x = zeros(UInt8,4)\nn4-element Array{UInt8,1}:\nn 0x00\nn 0x00\nn 0x00\nn 0x00\nn\nnjulia> read!(STDIN,x)\nnabcd\nn4-element Array{UInt8,1}:\nn 0x61\nn 0x62\nn 0x63\nn 0x64However, since this is slightly cumbersome, there are several convenience methods provided. For example, we could have written the above as:julia> read(STDIN,4)\nnabcd\nn4-element Array{UInt8,1}:\nn 0x61\nn 0x62\nn 0x63\nn 0x64or if we had wanted to read the entire line instead:julia> readline(STDIN)\nnabcd\nn\"abcd\n\"Note that depending on your terminal settings, your TTY may be line buffered and might thus require an additional enter before the data is sent to Julia.To read every line from STDIN you can use eachline():for line in eachline(STDIN)\nn    print(\"Found $line\")\nnendor read() if you wanted to read by character instead:while !eof(STDIN)\nn    x = read(STDIN, Char)\nn    println(\"Found: $x\")\nnend"
},

{
    "location": "manual/networking-and-streams.html#Text-I/O-1",
    "title": "Text I/O",
    "category": "Section",
    "text": "Note that the write() method mentioned above operates on binary streams. In particular, values do not get converted to any canonical text representation but are written out as is:julia> write(STDOUT,0x61);  # suppress return value 1 with ;\nnaNote that a is written to STDOUT by the write() function and that the returned value is 1 (since 0x61 is one byte).For text I/O, use the print() or show() methods, depending on your needs (see the standard library reference for a detailed discussion of the difference between the two):julia> print(STDOUT,0x61)\nn97"
},

{
    "location": "manual/networking-and-streams.html#IO-Output-Contextual-Properties-1",
    "title": "IO Output Contextual Properties",
    "category": "Section",
    "text": "Sometimes IO output can benefit from the ability to pass contextual information into show methods. The IOContext object provides this framework for associating arbitrary metadata with an IO object. For example, showcompact adds a hinting parameter to the IO object that the invoked show method should print a shorter output (if applicable)."
},

{
    "location": "manual/networking-and-streams.html#Working-with-Files-1",
    "title": "Working with Files",
    "category": "Section",
    "text": "Like many other environments, Julia has an open() function, which takes a filename and returns an IOStream object that you can use to read and write things from the file. For example if we have a file, hello.txt, whose contents are Hello, World!:julia> f = open(\"hello.txt\")\nnIOStream(<file hello.txt>)\nn\nnjulia> readlines(f)\nn1-element Array{String,1}:\nn \"Hello, World!\n\"If you want to write to a file, you can open it with the write (\"w\") flag:julia> f = open(\"hello.txt\",\"w\")\nnIOStream(<file hello.txt>)\nn\nnjulia> write(f,\"Hello again.\")\nn12If you examine the contents of hello.txt at this point, you will notice that it is empty; nothing has actually been written to disk yet. This is because the IOStream must be closed before the write is actually flushed to disk:julia> close(f)Examining hello.txt again will show its contents have been changed.Opening a file, doing something to its contents, and closing it again is a very common pattern. To make this easier, there exists another invocation of open() which takes a function as its first argument and filename as its second, opens the file, calls the function with the file as an argument, and then closes it again. For example, given a function:function read_and_capitalize(f::IOStream)\nn    return uppercase(readstring(f))\nnendYou can call:julia> open(read_and_capitalize, \"hello.txt\")\nn\"HELLO AGAIN.\"to open hello.txt, call read_and_capitalize on it, close hello.txt and return the capitalized contents.To avoid even having to define a named function, you can use the do syntax, which creates an anonymous function on the fly:julia> open(\"hello.txt\") do f\nn          uppercase(readstring(f))\nn       end\nn\"HELLO AGAIN.\""
},

{
    "location": "manual/networking-and-streams.html#A-simple-TCP-example-1",
    "title": "A simple TCP example",
    "category": "Section",
    "text": "Let's jump right in with a simple example involving TCP sockets. Let's first create a simple server:julia> @async begin\nn         server = listen(2000)\nn         while true\nn           sock = accept(server)\nn           println(\"Hello World\n\")\nn         end\nn       end\nnTask (runnable) @0x00007fd31dc11ae0\nn\nnjulia>To those familiar with the Unix socket API, the method names will feel familiar, though their usage is somewhat simpler than the raw Unix socket API. The first call to listen() will create a server waiting for incoming connections on the specified port (2000) in this case. The same function may also be used to create various other kinds of servers:julia> listen(2000) # Listens on localhost:2000 (IPv4)\nnTCPServer(active)\nn\nnjulia> listen(ip\"127.0.0.1\",2000) # Equivalent to the first\nnTCPServer(active)\nn\nnjulia> listen(ip\"::1\",2000) # Listens on localhost:2000 (IPv6)\nnTCPServer(active)\nn\nnjulia> listen(IPv4(0),2001) # Listens on port 2001 on all IPv4 interfaces\nnTCPServer(active)\nn\nnjulia> listen(IPv6(0),2001) # Listens on port 2001 on all IPv6 interfaces\nnTCPServer(active)\nn\nnjulia> listen(\"testsocket\") # Listens on a domain socket/named pipe\nnPipeServer(active)Note that the return type of the last invocation is different. This is because this server does not listen on TCP, but rather on a named pipe (Windows) or domain socket (UNIX). The difference is subtle and has to do with the accept() and connect() methods. The accept() method retrieves a connection to the client that is connecting on the server we just created, while the connect() function connects to a server using the specified method. The connect() function takes the same arguments as listen(), so, assuming the environment (i.e. host, cwd, etc.) is the same you should be able to pass the same arguments to connect() as you did to listen to establish the connection. So let's try that out (after having created the server above):julia> connect(2000)\nnTCPSocket(open, 0 bytes waiting)\nn\nnjulia> Hello WorldAs expected we saw \"Hello World\" printed. So, let's actually analyze what happened behind the scenes. When we called connect(), we connect to the server we had just created. Meanwhile, the accept function returns a server-side connection to the newly created socket and prints \"Hello World\" to indicate that the connection was successful.A great strength of Julia is that since the API is exposed synchronously even though the I/O is actually happening asynchronously, we didn't have to worry callbacks or even making sure that the server gets to run. When we called connect() the current task waited for the connection to be established and only continued executing after that was done. In this pause, the server task resumed execution (because a connection request was now available), accepted the connection, printed the message and waited for the next client. Reading and writing works in the same way. To see this, consider the following simple echo server:julia> @async begin\nn         server = listen(2001)\nn         while true\nn           sock = accept(server)\nn           @async while isopen(sock)\nn             write(sock,readline(sock))\nn           end\nn         end\nn       end\nnTask (runnable) @0x00007fd31dc12e60\nn\nnjulia> clientside=connect(2001)\nnTCPSocket(open, 0 bytes waiting)\nn\nnjulia> @async while true\nn          write(STDOUT,readline(clientside))\nn       end\nnTask (runnable) @0x00007fd31dc11870\nn\nnjulia> println(clientside,\"Hello World from the Echo Server\")\nnHello World from the Echo ServerAs with other streams, use close() to disconnect the socket:julia> close(clientside)"
},

{
    "location": "manual/noteworthy-differences.html",
    "title": "Noteworthy Differences from other Languages",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/noteworthy-differences.html#Noteworthy-Differences-from-other-Languages-1",
    "title": "Noteworthy Differences from other Languages",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/noteworthy-differences.html#Noteworthy-differences-from-MATLAB-1",
    "title": "Noteworthy differences from MATLAB",
    "category": "Section",
    "text": "Although MATLAB users may find Julia's syntax familiar, Julia is not a MATLAB clone. There are major syntactic and functional differences. The following are some noteworthy differences that may trip up Julia users accustomed to MATLAB:Julia arrays are indexed with square brackets, A[i,j].\nnJulia arrays are assigned by reference. After A=B, changing elements of B will modify A as well.\nnJulia values are passed and assigned by reference. If a function modifies an array, the changes will be visible in the caller.\nnJulia does not automatically grow arrays in an assignment statement. Whereas in MATLAB a(4) = 3.2 can create the array a = [0 0 0 3.2] and a(5) = 7 can grow it into a = [0 0 0 3.2 7], the corresponding Julia statement a[5] = 7 throws an error if the length of a is less than 5 or if this statement is the first use of the identifier a. Julia has push!() and append!(), which grow Vectors much more efficiently than MATLAB's a(end+1) = val.\nnThe imaginary unit sqrt(-1) is represented in Julia as im, not i or j as in MATLAB.\nnIn Julia, literal numbers without a decimal point (such as 42) create integers instead of floating point numbers. Arbitrarily large integer literals are supported. As a result, some operations such as 2^-1 will throw a domain error as the result is not an integer (see the FAQ entry on domain errors for details).\nnIn Julia, multiple values are returned and assigned as tuples, e.g. (a, b) = (1, 2) or a, b = 1, 2. MATLAB's nargout, which is often used in MATLAB to do optional work based on the number of returned values, does not exist in Julia. Instead, users can use optional and keyword arguments to achieve similar capabilities.\nnJulia has true one-dimensional arrays. Column vectors are of size N, not Nx1. For example, rand(N) makes a 1-dimensional array.\nnIn Julia v0.3, concatenating scalars and arrays with the syntax [x,y,z] concatenates in the first dimension (\"vertically\"). For concatenation in the second dimension (\"horizontally\"), use spaces as in [x y z]. To construct block matrices (concatenating in the first two dimensions), the syntax [a b; c d] is used to avoid confusion. In Julia v0.4, the concatenation syntax [x, [y, z]] is deprecated in favor of [x; [y, z]].\nnIn Julia, a:b and a:b:c construct Range objects. To construct a full vector like in MATLAB, use collect(a:b). Generally, there is no need to call collect though. Range will act like a normal array in most cases but is more efficient because it lazily computes its values. This pattern of creating specialized objects instead of full arrays is used frequently, and is also seen in functions such as linspace, or with iterators such as enumerate, and zip. The special objects can mostly be used as if they were normal arrays.\nnFunctions in Julia return values from their last expression or the return keyword instead of listing the names of variables to return in the function definition (see The return Keyword for details).\nnA Julia script may contain any number of functions, and all definitions will be externally visible when the file is loaded. Function definitions can be loaded from files outside the current working directory.\nnIn Julia, reductions such as sum(), prod(), and max() are performed over every element of an array when called with a single argument, as in sum(A), even if A has more than one dimension.\nnIn Julia, functions such as sort() that operate column-wise by default (sort(A) is equivalent to sort(A,1)) do not have special behavior for 1xN arrays; the argument is returned unmodified since it still performs sort(A,1). To sort a 1xN matrix like a vector, use sort(A,2).\nnIn Julia, if A is a 2-dimensional array, fft(A) computes a 2D FFT. In particular, it is not equivalent to fft(A,1), which computes a 1D FFT acting column-wise.\nnIn Julia, parentheses must be used to call a function with zero arguments, like in tic() and toc().\nnJulia discourages the used of semicolons to end statements. The results of statements are not automatically printed (except at the interactive prompt), and lines of code do not need to end with semicolons. println() or @printf() can be used to print specific output.\nnIn Julia, if A and B are arrays, logical comparison operations like A == B do not return an array of booleans. Instead, use A .== B, and similarly for the other boolean operators like <, > and =.\nnIn Julia, the operators &, |, and $ perform the bitwise operations equivalent to and, or, and xor respectively in MATLAB, and have precedence similar to Python's bitwise operators (unlike C). They can operate on scalars or element-wise across arrays and can be used to combine logical arrays, but note the difference in order of operations: parentheses may be required (e.g., to select elements of A equal to 1 or 2 use (A .== 1) | (A .== 2)).\nnIn Julia, the elements of a collection can be passed as arguments to a function using the splat operator ..., as in xs=[1,2]; f(xs...).\nnJulia's svd() returns singular values as a vector instead of as a dense diagonal matrix.\nnIn Julia, ... is not used to continue lines of code. Instead, incomplete expressions automatically continue onto the next line.\nnIn both Julia and MATLAB, the variable ans is set to the value of the last expression issued in an interactive session. In Julia, unlike MATLAB, ans is not set when Julia code is run in non-interactive mode.\nnJulia's types do not support dynamically adding fields at runtime, unlike MATLAB's classes. Instead, use a Dict.\nnIn Julia each module has its own global scope/namespace, whereas in MATLAB there is just one global scope.\nnIn MATLAB, an idiomatic way to remove unwanted values is to use logical indexing, like in the expression x(x>3) or in the statement x(x>3) = [] to modify x in-place. In contrast, Julia provides the higher order functions filter() and filter!(), allowing users to write filter(z->z>3, x) and filter!(z->z>3, x) as alternatives to the corresponding transliterations x[x.>3] and x = x[x.>3]. Using filter!() reduces the use of temporary arrays.\nnThe analogue of extracting (or \"dereferencing\") all elements of a cell array, e.g. in vertcat(A{:}) in MATLAB, is written using the splat operator in Julia, e.g. as vcat(A...)."
},

{
    "location": "manual/noteworthy-differences.html#Noteworthy-differences-from-R-1",
    "title": "Noteworthy differences from R",
    "category": "Section",
    "text": "One of Julia's goals is to provide an effective language for data analysis and statistical programming. For users coming to Julia from R, these are some noteworthy differences:Julia's single quotes enclose characters, not strings.\nnJulia can create substrings by indexing into strings. In R, strings must be converted into character vectors before creating substrings.\nnIn Julia, like Python but unlike R, strings can be created with triple quotes \"\"\" ... \"\"\". This syntax is convenient for constructing strings that contain line breaks.\nnIn Julia, varargs are specified using the splat operator ..., which always follows the name of a specific variable, unlike R, for which ... can occur in isolation.\nnIn Julia, modulus is mod(a, b), not a %% b. % in Julia is the remainder operator.\nnIn Julia, not all data structures support logical indexing. Furthermore, logical indexing in Julia is supported only with vectors of length equal to the object being indexed. For example: - In R, c(1, 2, 3, 4)[c(TRUE, FALSE)] is equivalent to c(1,3). - In R, c(1, 2, 3, 4)[c(TRUE, FALSE, TRUE, FALSE)] is equivalent to c(1,3). - In Julia, [1, 2, 3, 4][[true, false]] throws a BoundsError. - In Julia, [1, 2, 3, 4][[true, false, true, false]] produces [1, 3].\nnLike many languages, Julia does not always allow operations on vectors of different lengths, unlike R where the vectors only need to share a common index range.  For example, c(1,2,3,4) + c(1,2) is valid R but the equivalent [1:4] + [1:2] will throw an error in Julia.\nnJulia's apply() takes the function first, then its arguments, unlike lapply(<structure>, function, arg2, ...) in R.\nnJulia uses end to denote the end of conditional blocks, like if, loop blocks, like while/for, and functions. In lieu of the one-line if ( cond ) statement, Julia allows statements of the form if cond; statement; end, cond && statement and !cond || statement. Assignment statements in the latter two syntaxes must be explicitly wrapped in parentheses, e.g. cond && (x = value).\nnIn Julia, <-, <<- and -> are not assignment operators.\nnJulia's -> creates an anonymous function, like Python.\nnJulia constructs vectors using brackets. Julia's [1, 2, 3] is the equivalent of R's c(1, 2, 3).\nnJulia's * operator can perform matrix multiplication, unlike in R. If A and B are matrices, then A * B denotes a matrix multiplication in Julia, equivalent to R's A %*% B. In R, this same notation would perform an element-wise (Hadamard) product. To get the element-wise multiplication operation, you need to write A .* B in Julia.\nnJulia performs matrix transposition using the .' operator and conjugated transposition using the ' operator. Julia's A.' is therefore equivalent to R's t(A).\nnJulia does not require parentheses when writing if statements or for/while loops: use for i in [1, 2, 3] instead of for (i in c(1, 2, 3)) and if i == 1 instead of if (i == 1).\nnJulia does not treat the numbers 0 and 1 as Booleans. You cannot write if (1) in Julia, because if statements accept only booleans. Instead, you can write if true, if Bool(1), or if 1==1.\nnJulia does not provide nrow and ncol. Instead, use size(M, 1) for nrow(M) and size(M, 2) for ncol(M).\nnJulia is careful to distinguish scalars, vectors and matrices.  In R, 1 and c(1) are the same. In Julia, they can not be used interchangeably. One potentially confusing result of this is that x' * y for vectors x and y is a 1-element vector, not a scalar. To get a scalar, use dot(x, y).\nnJulia's diag() and diagm() are not like R's.\nnJulia cannot assign to the results of function calls on the left hand side of an assignment operation: you cannot write diag(M) = ones(n).\nnJulia discourages populating the main namespace with functions. Most statistical functionality for Julia is found in packages under the JuliaStats organization. For example:\nnFunctions pertaining to probability distributions are provided by the Distributions package.\nnThe DataFrames package provides data frames.\nnGeneralized linear models are provided by the GLM package.\nnJulia provides tuples and real hash tables, but not R-style lists. When returning multiple items, you should typically use a tuple: instead of list(a = 1, b = 2), use (1, 2).\nnJulia encourages users to write their own types, which are easier to use than S3 or S4 objects in R. Julia's multiple dispatch system means that table(x::TypeA) and table(x::TypeB) act like R's table.TypeA(x) and table.TypeB(x).\nnIn Julia, values are passed and assigned by reference. If a function modifies an array, the changes will be visible in the caller. This is very different from R and allows new functions to operate on large data structures much more efficiently.\nnIn Julia, vectors and matrices are concatenated using hcat(), vcat() and hvcat(), not c, rbind and cbind like in R.\nnIn Julia, a range like a:b is not shorthand for a vector like in R, but is a specialized Range that is used for iteration without high memory overhead. To convert a range into a vector, use collect(a:b).\nnJulia's max() and min() are the equivalent of pmax and pmin respectively in R, but both arguments need to have the same dimensions.  While maximum() and minimum() replace max and min in R, there are important differences.\nnJulia's sum(), prod(), maximum(), and minimum() are different from their counterparts in R. They all accept one or two arguments. The first argument is an iterable collection such as an array.  If there is a second argument, then this argument indicates the dimensions, over which the operation is carried out.  For instance, let A=[[1 2],[3 4]] in Julia and B=rbind(c(1,2),c(3,4)) be the same matrix in R.  Then sum(A) gives the same result as sum(B), but sum(A, 1) is a row vector containing the sum over each column and sum(A, 2) is a column vector containing the sum over each row.  This contrasts to the behavior of R, where sum(B,1)=11 and sum(B,2)=12.  If the second argument is a vector, then it specifies all the dimensions over which the sum is performed, e.g., sum(A,[1,2])=10.  It should be noted that there is no error checking regarding the second argument.\nnJulia has several functions that can mutate their arguments. For example, it has both sort() and sort!().\nnIn R, performance requires vectorization. In Julia, almost the opposite is true: the best performing code is often achieved by using devectorized loops.\nnJulia is eagerly evaluated and does not support R-style lazy evaluation. For most users, this means that there are very few unquoted expressions or column names.\nnJulia does not support the NULL type.\nnJulia lacks the equivalent of R's assign or get.\nnIn Julia, return does not require parentheses.\nnIn R, an idiomatic way to remove unwanted values is to use logical indexing, like in the expression x[x>3] or in the statement x = x[x>3] to modify x in-place. In contrast, Julia provides the higher order functions filter() and filter!(), allowing users to write filter(z->z>3, x) and filter!(z->z>3, x) as alternatives to the corresponding transliterations x[x.>3] and x = x[x.>3]. Using filter!() reduces the use of temporary arrays."
},

{
    "location": "manual/noteworthy-differences.html#Noteworthy-differences-from-Python-1",
    "title": "Noteworthy differences from Python",
    "category": "Section",
    "text": "In Julia, a vector of vectors can automatically concatenate into a one-dimensional vector if no explicit element type is specified. For example:\nnIn Julia, [1, [2, 3]] concatenates into [1, 2, 3], like in R.\nnIn Julia, Int[1, Int[2, 3]] will not concatenate, but instead throw an error.\nnIn Julia, Any[1, [2,3]] will not concatenate.\nnIn Julia, Vector{Int}[[1, 2], [3, 4]] will not concatenate, but produces an object similar to Python's list of lists. This object is different from a two-dimensional Array of Ints.\nnJulia requires end to end a block. Unlike Python, Julia has no pass keyword.\nnIn Julia, indexing of arrays, strings, etc. is 1-based not 0-based.\nnJulia's slice indexing includes the last element, unlike in Python. a[2:3] in Julia is a[1:3] in Python.\nnJulia does not support negative indexes. In particular, the last element of a list or array is indexed with end in Julia, not -1 as in Python.\nnJulia's list comprehensions do not support the optional if clause that Python has.\nnJulia's for, if, while, etc. blocks are terminated by the end keyword. Indentation level is not significant as it is in Python.\nnJulia has no line continuation syntax: if, at the end of a line, the input so far is a complete expression, it is considered done; otherwise the input continues. One way to force an expression to continue is to wrap it in parentheses.\nnJulia arrays are column major (Fortran ordered) whereas NumPy arrays are row major (C-ordered) by default. To get optimal performance when looping over arrays, the order of the loops should be reversed in Julia relative to NumPy (see relevant section of Performance Tips).\nnJulia's updating operators (e.g. +=, -=, ...) are not in-place whereas NumPy's are. This means A = ones(4); B = A; B += 3 doesn't change values in A, it rather rebinds the name B to the result of the right- hand side B = B + 3, which is a new array. Use B[:] += 3, explicit loops, or InplaceOps.jl.\nnJulia evaluates default values of function arguments every time the method is invoked, unlike in Python where the default values are evaluated only once when the function is defined. For example, the function f(x=rand()) = x returns a new random number every time it is invoked without argument. On the other hand, the function g(x=[1,2]) = push!(x,3) returns [1,2,3] every time it is called as g().\nnIn Julia % is the remainder operator, whereas in Python it is the modulus."
},

{
    "location": "manual/packages.html",
    "title": "Packages",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/packages.html#Packages-1",
    "title": "Packages",
    "category": "Section",
    "text": "Julia has a built-in package manager for installing add-on functionality written in Julia. It can also install external libraries using your operating system's standard system for doing so, or by compiling from source. The list of registered Julia packages can be found at http://pkg.julialang.org. All package manager commands are found in the Pkg module, included in Julia's Base install.First we'll go over the mechanics of the Pkg family of commands and then we'll provide some guidance on how to get your package registered. Be sure to read the section below on package naming conventions, tagging versions and the importance of a REQUIRE file for when you're ready to add your code to the curated METADATA repository."
},

{
    "location": "manual/packages.html#Package-Status-1",
    "title": "Package Status",
    "category": "Section",
    "text": "The Pkg.status() function prints out a summary of the state of packages you have installed. Initially, you'll have no packages installed:julia> Pkg.status()\nnINFO: Initializing package repository /Users/stefan/.julia/v0.4\nnINFO: Cloning METADATA from git://github.com/JuliaLang/METADATA.jl\nnNo packages installed.Your package directory is automatically initialized the first time you run a Pkg command that expects it to exist – which includes  Pkg.status(). Here's an example non-trivial set of required and additional packages:julia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.8\nn - UTF16                         0.2.0\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.6These packages are all on registered versions, managed by Pkg. Packages can be in more complicated states, indicated by annotations to the right of the installed package version; we will explain these states and annotations as we encounter them. For programmatic usage, Pkg.installed() returns a dictionary, mapping installed package names to the version of that package which is installed:julia> Pkg.installed()\nnDict{String,VersionNumber} with 4 entries:\nn\"Distributions\"     => v\"0.2.8\"\nn\"Stats\"             => v\"0.2.6\"\nn\"UTF16\"             => v\"0.2.0\"\nn\"NumericExtensions\" => v\"0.2.17\""
},

{
    "location": "manual/packages.html#Adding-and-Removing-Packages-1",
    "title": "Adding and Removing Packages",
    "category": "Section",
    "text": "Julia's package manager is a little unusual in that it is declarative rather than imperative. This means that you tell it what you want and it figures out what versions to install (or remove) to satisfy those requirements optimally – and minimally. So rather than installing a package, you just add it to the list of requirements and then \"resolve\" what needs to be installed. In particular, this means that if some package had been installed because it was needed by a previous version of something you wanted, and a newer version doesn't have that requirement anymore, updating will actually remove that package.Your package requirements are in the file ~/.julia/v0.4/REQUIRE. You can edit this file by hand and then call Pkg.resolve() to install, upgrade or remove packages to optimally satisfy the requirements, or you can do Pkg.edit(), which will open REQUIRE in your editor (configured via the EDITOR or VISUAL environment variables), and then automatically call Pkg.resolve() afterwards if necessary. If you only want to add or remove the requirement for a single package, you can also use the non-interactive Pkg.add() and Pkg.rm() commands, which add or remove a single requirement to REQUIRE and then call Pkg.resolve().You can add a package to the list of requirements with the Pkg.add() function, and the package and all the packages that it depends on will be installed:julia> Pkg.status()\nnNo packages installed.\nn\nnjulia> Pkg.add(\"Distributions\")\nnINFO: Cloning cache of Distributions from git://github.com/JuliaStats/Distributions.jl.git\nnINFO: Cloning cache of NumericExtensions from git://github.com/lindahua/NumericExtensions.jl.git\nnINFO: Cloning cache of Stats from git://github.com/JuliaStats/Stats.jl.git\nnINFO: Installing Distributions v0.2.7\nnINFO: Installing NumericExtensions v0.2.17\nnINFO: Installing Stats v0.2.6\nnINFO: REQUIRE updated.\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.7\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.6What this is doing is first adding Distributions to your ~/.julia/v0.4/REQUIRE file:$ cat ~/.julia/v0.4/REQUIRE\nnDistributionsIt then runs Pkg.resolve() using these new requirements, which leads to the conclusion that the Distributions package should be installed since it is required but not installed. As stated before, you can accomplish the same thing by editing your ~/.julia/v0.4/REQUIRE file by hand and then running Pkg.resolve() yourself:$ echo UTF16 >> ~/.julia/v0.4/REQUIRE\nn\nnjulia> Pkg.resolve()\nnINFO: Cloning cache of UTF16 from git://github.com/nolta/UTF16.jl.git\nnINFO: Installing UTF16 v0.2.0\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.7\nn - UTF16                         0.2.0\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.6This is functionally equivalent to calling Pkg.add(\"UTF16\"), except that Pkg.add() doesn't change REQUIRE until after installation has completed, so if there are problems, REQUIRE will be left as it was before calling Pkg.add(). The format of the REQUIRE file is described in Requirements Specification; it allows, among other things, requiring specific ranges of versions of packages.When you decide that you don't want to have a package around any more, you can use Pkg.rm() to remove the requirement for it from the REQUIRE file:julia> Pkg.rm(\"Distributions\")\nnINFO: Removing Distributions v0.2.7\nnINFO: Removing Stats v0.2.6\nnINFO: Removing NumericExtensions v0.2.17\nnINFO: REQUIRE updated.\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - UTF16                         0.2.0\nn\nnjulia> Pkg.rm(\"UTF16\")\nnINFO: Removing UTF16 v0.2.0\nnINFO: REQUIRE updated.\nn\nnjulia> Pkg.status()\nnNo packages installed.Once again, this is equivalent to editing the REQUIRE file to remove the line with each package name on it then running Pkg.resolve() to update the set of installed packages to match. While Pkg.add() and Pkg.rm() are convenient for adding and removing requirements for a single package, when you want to add or remove multiple packages, you can call Pkg.edit() to manually change the contents of REQUIRE and then update your packages accordingly. Pkg.edit() does not roll back the contents of REQUIRE if Pkg.resolve() fails – rather, you have to run Pkg.edit() again to fix the files contents yourself.Because the package manager uses libgit2 internally to manage the package git repositories, users may run into protocol issues (if behind a firewall, for example), when running Pkg.add(). By default, all GitHub-hosted packages wil be accessed via 'https'; this default can be modified by calling Pkg.setprotocol!().  The following command can be run from the command line in order to tell git to use 'https' instead of the 'git' protocol when cloning all repositories, wherever they are hosted:git config --global url.\"https://\".insteadOf git://However, this change will be system-wide and thus the use of Pkg.setprotocol!() is preferable."
},

{
    "location": "manual/packages.html#Offline-Installation-of-Packages-1",
    "title": "Offline Installation of Packages",
    "category": "Section",
    "text": "For machines with no Internet connection, packages may be installed by copying the package root directory (given by Pkg.dir()) from a machine with the same operating system and environment.Pkg.add() does the following within the package root directory:Adds the name of the package to REQUIRE.\nnDownloads the package to .cache, then copies the package to the package root directory.\nnRecursively performs step 2 against all the packages listed in the package's REQUIRE file.\nnRuns Pkg.build()warning: \nnCopying installed packages from a different machine is brittle for packages requiring binary external dependencies. Such packages may break due to differences in operating system versions, build environments, and/or absolute path dependencies."
},

{
    "location": "manual/packages.html#Installing-Unregistered-Packages-1",
    "title": "Installing Unregistered Packages",
    "category": "Section",
    "text": "Julia packages are simply git repositories, clonable via any of the protocols that git supports, and containing Julia code that follows certain layout conventions. Official Julia packages are registered in the METADATA.jl repository, available at a well-known location [1]. The Pkg.add() and Pkg.rm() commands in the previous section interact with registered packages, but the package manager can install and work with unregistered packages too. To install an unregistered package, use Pkg.clone(url), where url is a git URL from which the package can be cloned:julia> Pkg.clone(\"git://example.com/path/to/Package.jl.git\")\nnINFO: Cloning Package from git://example.com/path/to/Package.jl.git\nnCloning into 'Package'...\nnremote: Counting objects: 22, done.\nnremote: Compressing objects: 100% (10/10), done.\nnremote: Total 22 (delta 8), reused 22 (delta 8)\nnReceiving objects: 100% (22/22), 2.64 KiB, done.\nnResolving deltas: 100% (8/8), done.By convention, Julia repository names end with .jl (the additional .git indicates a \"bare\" git repository), which keeps them from colliding with repositories for other languages, and also makes Julia packages easy to find in search engines. When packages are installed in your .julia/v0.4 directory, however, the extension is redundant so we leave it off.If unregistered packages contain a REQUIRE file at the top of their source tree, that file will be used to determine which registered packages the unregistered package depends on, and they will automatically be installed. Unregistered packages participate in the same version resolution logic as registered packages, so installed package versions will be adjusted as necessary to satisfy the requirements of both registered and unregistered packages.footnote: [1]\nnThe official set of packages is at https://github.com/JuliaLang/METADATA.jl, but individuals and organizations can easily use a different metadata repository. This allows control which packages are available for automatic installation. One can allow only audited and approved package versions, and make private packages or forks available. See Custom METADATA for details."
},

{
    "location": "manual/packages.html#Updating-Packages-1",
    "title": "Updating Packages",
    "category": "Section",
    "text": "When package developers publish new registered versions of packages that you're using, you will, of course, want the new shiny versions. To get the latest and greatest versions of all your packages, just do Pkg.update():julia> Pkg.update()\nnINFO: Updating METADATA...\nnINFO: Computing changes...\nnINFO: Upgrading Distributions: v0.2.8 => v0.2.10\nnINFO: Upgrading Stats: v0.2.7 => v0.2.8The first step of updating packages is to pull new changes to ~/.julia/v0.4/METADATA and see if any new registered package versions have been published. After this, Pkg.update() attempts to update packages that are checked out on a branch and not dirty (i.e. no changes have been made to files tracked by git) by pulling changes from the package's upstream repository. Upstream changes will only be applied if no merging or rebasing is necessary – i.e. if the branch can be \"fast-forwarded\". If the branch cannot be fast-forwarded, it is assumed that you're working on it and will update the repository yourself.Finally, the update process recomputes an optimal set of package versions to have installed to satisfy your top-level requirements and the requirements of \"fixed\" packages. A package is considered fixed if it is one of the following:Unregistered: the package is not in METADATA – you installed it with Pkg.clone().\nnChecked out: the package repo is on a development branch.\nnDirty: changes have been made to files in the repo.If any of these are the case, the package manager cannot freely change the installed version of the package, so its requirements must be satisfied by whatever other package versions it picks. The combination of top-level requirements in ~/.julia/v0.4/REQUIRE and the requirement of fixed packages are used to determine what should be installed.You can also update only a subset of the installed packages, by providing arguments to the Pkg.update function. In that case, only the packages provided as arguments and their dependencies will be updated:julia> Pkg.update(\"Example\")\nnINFO: Updating METADATA...\nnINFO: Computing changes...\nnINFO: Upgrading Example: v0.4.0 => 0.4.1This partial update process still computes the new set of package versions according to top-level requirements and \"fixed\" packages, but it additionally considers all other packages except those explicitly provided, and their dependencies, as fixed."
},

{
    "location": "manual/packages.html#Checkout,-Pin-and-Free-1",
    "title": "Checkout, Pin and Free",
    "category": "Section",
    "text": "You may want to use the master version of a package rather than one of its registered versions. There might be fixes or functionality on master that you need that aren't yet published in any registered versions, or you may be a developer of the package and need to make changes on master or some other development branch. In such cases, you can do Pkg.checkout(pkg) to checkout the master branch of pkg or Pkg.checkout(pkg,branch) to checkout some other branch:julia> Pkg.add(\"Distributions\")\nnINFO: Installing Distributions v0.2.9\nnINFO: Installing NumericExtensions v0.2.17\nnINFO: Installing Stats v0.2.7\nnINFO: REQUIRE updated.\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.9\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.7\nn\nnjulia> Pkg.checkout(\"Distributions\")\nnINFO: Checking out Distributions master...\nnINFO: No packages to install, update or remove.\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.9+             master\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.7Immediately after installing Distributions with Pkg.add() it is on the current most recent registered version – 0.2.9 at the time of writing this. Then after running Pkg.checkout(\"Distributions\"), you can see from the output of Pkg.status() that Distributions is on an unregistered version greater than 0.2.9, indicated by the \"pseudo-version\" number 0.2.9+.When you checkout an unregistered version of a package, the copy of the REQUIRE file in the package repo takes precedence over any requirements registered in METADATA, so it is important that developers keep this file accurate and up-to-date, reflecting the actual requirements of the current version of the package. If the REQUIRE file in the package repo is incorrect or missing, dependencies may be removed when the package is checked out. This file is also used to populate newly published versions of the package if you use the API that Pkg provides for this (described below).When you decide that you no longer want to have a package checked out on a branch, you can \"free\" it back to the control of the package manager with Pkg.free(pkg):julia> Pkg.free(\"Distributions\")\nnINFO: Freeing Distributions...\nnINFO: No packages to install, update or remove.\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.9\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.7After this, since the package is on a registered version and not on a branch, its version will be updated as new registered versions of the package are published.If you want to pin a package at a specific version so that calling Pkg.update() won't change the version the package is on, you can use the Pkg.pin() function:julia> Pkg.pin(\"Stats\")\nnINFO: Creating Stats branch pinned.47c198b1.tmp\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.9\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.7              pinned.47c198b1.tmpAfter this, the Stats package will remain pinned at version 0.2.7 – or more specifically, at commit 47c198b1, but since versions are permanently associated a given git hash, this is the same thing. Pkg.pin() works by creating a throw-away branch for the commit you want to pin the package at and then checking that branch out. By default, it pins a package at the current commit, but you can choose a different version by passing a second argument:julia> Pkg.pin(\"Stats\",v\"0.2.5\")\nnINFO: Creating Stats branch pinned.1fd0983b.tmp\nnINFO: No packages to install, update or remove.\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.9\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.5              pinned.1fd0983b.tmpNow the Stats package is pinned at commit 1fd0983b, which corresponds to version 0.2.5. When you decide to \"unpin\" a package and let the package manager update it again, you can use Pkg.free() like you would to move off of any branch:julia> Pkg.free(\"Stats\")\nnINFO: Freeing Stats...\nnINFO: No packages to install, update or remove.\nn\nnjulia> Pkg.status()\nnRequired packages:\nn - Distributions                 0.2.9\nnAdditional packages:\nn - NumericExtensions             0.2.17\nn - Stats                         0.2.7After this, the Stats package is managed by the package manager again, and future calls to Pkg.update() will upgrade it to newer versions when they are published. The throw-away pinned.1fd0983b.tmp branch remains in your local Stats repo, but since git branches are extremely lightweight, this doesn't really matter; if you feel like cleaning them up, you can go into the repo and delete those branches [2].footnote: [2]\nnPackages that aren't on branches will also be marked as dirty if you make changes in the repo, but that's a less common thing to do."
},

{
    "location": "manual/packages.html#Custom-METADATA-Repository-1",
    "title": "Custom METADATA Repository",
    "category": "Section",
    "text": "By default, Julia assumes you will be using the official METADATA.jl repository for downloading and installing packages. You can also provide a different metadata repository location. A common approach is to keep your metadata-v2 branch up to date with the Julia official branch and add another branch with your custom packages. You can initialize your local metadata repository using that custom location and branch and then periodically rebase your custom branch with the official metadata-v2 branch. In order to use a custom repository and branch, issue the following command:julia> Pkg.init(\"https://me.example.com/METADATA.jl.git\", \"branch\")The branch argument is optional and defaults to metadata-v2. Once initialized, a file named META_BRANCH in your ~/.julia/vX.Y/ path will track the branch that your METADATA repository was initialized with. If you want to change branches, you will need to either modify the META_BRANCH file directly (be careful!) or remove the vX.Y directory and re-initialize your METADATA repository using the Pkg.init command."
},

{
    "location": "manual/packages.html#Package-Development-1",
    "title": "Package Development",
    "category": "Section",
    "text": "Julia's package manager is designed so that when you have a package installed, you are already in a position to look at its source code and full development history. You are also able to make changes to packages, commit them using git, and easily contribute fixes and enhancements upstream. Similarly, the system is designed so that if you want to create a new package, the simplest way to do so is within the infrastructure provided by the package manager."
},

{
    "location": "manual/packages.html#Initial-Setup-1",
    "title": "Initial Setup",
    "category": "Section",
    "text": "Since packages are git repositories, before doing any package development you should setup the following standard global git configuration settings:$ git config --global user.name \"FULL NAME\"\nn$ git config --global user.email \"EMAIL\"where FULL NAME is your actual full name (spaces are allowed between the double quotes) and EMAIL is your actual email address. Although it isn't necessary to use GitHub to create or publish Julia packages, most Julia packages as of writing this are hosted on GitHub and the package manager knows how to format origin URLs correctly and otherwise work with the service smoothly. We recommend that you create a free account on GitHub and then do:$ git config --global github.user \"USERNAME\"where USERNAME is your actual GitHub user name. Once you do this, the package manager knows your GitHub user name and can configure things accordingly. You should also upload your public SSH key to GitHub and set up an SSH agent on your development machine so that you can push changes with minimal hassle. In the future, we will make this system extensible and support other common git hosting options like BitBucket and allow developers to choose their favorite. Since the package development functions has been moved to the PkgDev package, you need to run Pkg.add(\"PkgDev\"); import PkgDev to access the functions starting with PkgDev. in the document below."
},

{
    "location": "manual/packages.html#Making-changes-to-an-existing-package-1",
    "title": "Making changes to an existing package",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/packages.html#Documentation-changes-1",
    "title": "Documentation changes",
    "category": "Section",
    "text": "If you want to improve the online documentation of a package, the easiest approach (at least for small changes) is to use GitHub's online editing functionality. First, navigate to the repository's GitHub \"home page,\" find the file (e.g., README.md) within the repository's folder structure, and click on it. You'll see the contents displayed, along with a small \"pencil\" icon in the upper right hand corner. Clicking that icon opens the file in edit mode. Make your changes, write a brief summary describing the changes you want to make (this is your commit message), and then hit \"Propose file change.\"  Your changes will be submitted for consideration by the package owner(s) and collaborators.For larger documentation changes–and especially ones that you expect to have to update in response to feedback–you might find it easier to use the procedure for code changes described below."
},

{
    "location": "manual/packages.html#Code-changes-1",
    "title": "Code changes",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/packages.html#Executive-summary-1",
    "title": "Executive summary",
    "category": "Section",
    "text": "Here we assume you've already set up git on your local machine and have a GitHub account (see above).  Let's imagine you're fixing a bug in the Images package:Pkg.checkout(\"Images\")           # check out the master branch\nn<here, make sure your bug is still a bug and hasn't been fixed already>\nncd(Pkg.dir(\"Images\"))\nn;git checkout -b myfixes         # create a branch for your changes\nn<edit code>                      # be sure to add a test for your bug\nnPkg.test(\"Images\")               # make sure everything works now\nn;git commit -a -m \"Fix foo by calling bar\"   # write a descriptive message\nnusing PkgDev\nnPkgDev.submit(\"Images\")The last line will present you with a link to submit a pull request to incorporate your changes."
},

{
    "location": "manual/packages.html#Detailed-description-1",
    "title": "Detailed description",
    "category": "Section",
    "text": "If you want to fix a bug or add new functionality, you want to be able to test your changes before you submit them for consideration. You also need to have an easy way to update your proposal in response to the package owner's feedback. Consequently, in this case the strategy is to work locally on your own machine; once you are satisfied with your changes, you submit them for consideration.  This process is called a pull request because you are asking to \"pull\" your changes into the project's main repository. Because the online repository can't see the code on your private machine, you first push your changes to a publicly-visible location, your own online fork of the package (hosted on your own personal GitHub account).Let's assume you already have the Foo package installed.  In the description below, anything starting with Pkg. or PkgDev. is meant to be typed at the Julia prompt; anything starting with git is meant to be typed in julia's shell mode (or using the shell that comes with your operating system).  Within Julia, you can combine these two modes:julia> cd(Pkg.dir(\"Foo\"))          # go to Foo's folder\nn\nnshell> git command arguments...    # command will apply to FooNow suppose you're ready to make some changes to Foo.  While there are several possible approaches, here is one that is widely used:From the Julia prompt, type Pkg.checkout(\"Foo\"). This ensures you're running the latest code (the master branch), rather than just whatever \"official release\" version you have installed. (If you're planning to fix a bug, at this point it's a good idea to check again whether the bug has already been fixed by someone else. If it has, you can request that a new official release be tagged so that the fix gets distributed to the rest of the community.) If you receive an error Foo is dirty, bailing, see Dirty packages below.\nnCreate a branch for your changes: navigate to the package folder (the one that Julia reports from Pkg.dir(\"Foo\")) and (in shell mode) create a new branch using git checkout -b <newbranch>, where <newbranch> might be some descriptive name (e.g., fixbar). By creating a branch, you ensure that you can easily go back and forth between your new work and the current master branch (see http://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell).\nnIf you forget to do this step until after you've already made some changes, don't worry: see more detail about branching below.\nnMake your changes. Whether it's fixing a bug or adding new functionality, in most cases your change should include updates to both the src/ and test/ folders.  If you're fixing a bug, add your minimal example demonstrating the bug (on the current code) to the test suite; by contributing a test for the bug, you ensure that the bug won't accidentally reappear at some later time due to other changes.  If you're adding new functionality, creating tests demonstrates to the package owner that you've made sure your code works as intended.\nnRun the package's tests and make sure they pass. There are several ways to run the tests:\nnFrom Julia, run Pkg.test(\"Foo\"): this will run your tests in a separate (new) julia process.\nnFrom Julia, include(\"runtests.jl\") from the package's test/ folder (it's possible the file has a different name, look for one that runs all the tests): this allows you to run the tests repeatedly in the same session without reloading all the package code; for packages that take a while to load, this can be much faster. With this approach, you do have to do some extra work to make changes in the package code.\nnFrom the shell, run julia ../test/runtests.jl from within the package's src/ folder.\nnCommit your changes: see http://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository.\nnSubmit your changes: From the Julia prompt, type PkgDev.submit(\"Foo\"). This will push your changes to your GitHub fork, creating it if it doesn't already exist. (If you encounter an error, make sure you've set up your SSH keys.) Julia will then give you a hyperlink; open that link, edit the message, and then click \"submit.\" At that point, the package owner will be notified of your changes and may initiate discussion. (If you are comfortable with git, you can also do these steps manually from the shell.)\nnThe package owner may suggest additional improvements. To respond to those suggestions, you can easily update the pull request (this only works for changes that have not already been merged; for merged pull requests, make new changes by starting a new branch):\nnIf you've changed branches in the meantime, make sure you go back to the same branch with git checkout fixbar (from shell mode) or Pkg.checkout(\"Foo\", \"fixbar\") (from the Julia prompt).\nnAs above, make your changes, run the tests, and commit your changes.\nnFrom the shell, type git push.  This will add your new commit(s) to the same pull request; you should see them appear automatically on the page holding the discussion of your pull request.\nnOne potential type of change the owner may request is that you squash your commits.  See Squashing below."
},

{
    "location": "manual/packages.html#Dirty-packages-1",
    "title": "Dirty packages",
    "category": "Section",
    "text": "If you can't change branches because the package manager complains that your package is dirty, it means you have some changes that have not been committed. From the shell, use git diff to see what these changes are; you can either discard them (git checkout changedfile.jl) or commit them before switching branches.  If you can't easily resolve the problems manually, as a last resort you can delete the entire \"Foo\" folder and reinstall a fresh copy with Pkg.add(\"Foo\"). Naturally, this deletes any changes you've made."
},

{
    "location": "manual/packages.html#Making-a-branch-*post-hoc*-1",
    "title": "Making a branch post hoc",
    "category": "Section",
    "text": "Especially for newcomers to git, one often forgets to create a new branch until after some changes have already been made.  If you haven't yet staged or committed your changes, you can create a new branch with git checkout -b <newbranch> just as usual–git will kindly show you that some files have been modified and create the new branch for you.  Your changes have not yet been committed to this new branch, so the normal work rules still apply.However, if you've already made a commit to master but wish to go back to the official master (called origin/master), use the following procedure:Create a new branch. This branch will hold your changes.\nnMake sure everything is committed to this branch.\nngit checkout master. If this fails, do not proceed further until you have resolved the problems, or you may lose your changes.\nnResetmaster (your current branch) back to an earlier state with git reset --hard origin/master (see http://git-scm.com/blog/2011/07/11/reset.html).This requires a bit more familiarity with git, so it's much better to get in the habit of creating a branch at the outset."
},

{
    "location": "manual/packages.html#Squashing-and-rebasing-1",
    "title": "Squashing and rebasing",
    "category": "Section",
    "text": "Depending on the tastes of the package owner (s)he may ask you to \"squash\" your commits. This is especially likely if your change is quite simple but your commit history looks like this:WIP: add new 1-line whizbang function (currently breaks package)\nnFinish whizbang function\nnFix typo in variable name\nnOops, don't forget to supply default argument\nnSplit into two 1-line functions\nnRats, forgot to export the second function\nn...This gets into the territory of more advanced git usage, and you're encouraged to do some reading (http://git-scm.com/book/en/v2/Git-Branching-Rebasing).  However, a brief summary of the procedure is as follows:To protect yourself from error, start from your fixbar branch and create a new branch with git checkout -b fixbar_backup.  Since you started from fixbar, this will be a copy. Now go back to the one you intend to modify with git checkout fixbar.\nnFrom the shell, type git rebase -i origin/master.\nnTo combine commits, change pick to squash (for additional options, consult other sources). Save the file and close the editor window.\nnEdit the combined commit message.If the rebase goes badly, you can go back to the beginning to try again like this:git checkout fixbar\nngit reset --hard fixbar_backupNow let's assume you've rebased successfully. Since your fixbar repository has now diverged from the one in your GitHub fork, you're going to have to do a force push:To make it easy to refer to your GitHub fork, create a \"handle\" for it with git remote add myfork https://github.com/myaccount/Foo.jl.git, where the URL comes from the \"clone URL\" on your GitHub fork's page.\nnForce-push to your fork with git push myfork +fixbar. The + indicates that this should replace the fixbar branch found at myfork."
},

{
    "location": "manual/packages.html#Creating-a-new-Package-1",
    "title": "Creating a new Package",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/packages.html#REQUIRE-speaks-for-itself-1",
    "title": "REQUIRE speaks for itself",
    "category": "Section",
    "text": "You should have a REQUIRE file in your package repository, with a bare minimum directive of what Julia version you expect your users to be running for the package to work. Putting a floor on what Julia version your package supports is done by simply adding julia 0.x in this file. While this line is partly informational, it also has the consequence of whether Pkg.update() will update code found in .julia version directories. It will not update code found in version directories beneath the floor of what's specified in your REQUIRE.As the development version 0.y matures, you may find yourself using it more frequently, and wanting your package to support it. Be warned, the development branch of Julia is the land of breakage, and you can expect things to break. When you go about fixing whatever broke your package in the development 0.y branch, you will likely find that you just broke your package on the stable version.There is a mechanism found in the Compat package that will enable you to support both the stable version and breaking changes found in the development version. Should you decide to use this solution, you will need to add Compat to your REQUIRE file. In this case, you will still have julia 0.x in your REQUIRE. The x is the floor version of what your package supports.You might also have no interest in supporting the development version of Julia. Just as you can add a floor to the version you expect your users to be on, you can set an upper bound. In this case, you would put julia 0.x 0.y- in your REQUIRE file.  The - at the end of the version number means pre-release versions of that specific version from the very first commit. By setting it as the ceiling, you mean the code supports everything up to but not including the ceiling version.Another scenario is that you are writing the bulk of the code for your package with Julia 0.y and do not want to support the current stable version of Julia. If you choose to do this, simply add julia 0.y- to your REQUIRE. Just remember to change the julia 0.y- to julia 0.y in your REQUIRE file once 0.y is officially released. If you don't edit the dash cruft you are suggesting that you support both the development and stable versions of the same version number! That would be madness.  See the Requirements Specification for the full format of REQUIRE."
},

{
    "location": "manual/packages.html#Guidelines-for-naming-a-package-1",
    "title": "Guidelines for naming a package",
    "category": "Section",
    "text": "Package names should be sensible to most Julia users, even to those who are not domain experts. When you submit your package to METADATA, you can expect a little back and forth about the package name with collaborators, especially if it's ambiguous or can be confused with something other than what it is. During this bike-shedding, it's not uncommon to get a range of different name suggestions. These are only suggestions though, with the intent being to keep a tidy namespace in the curated METADATA repository. Since this repository belongs to the entire community, there will likely be a few collaborators who care your package name. Here are some guidelines to follow in naming your package:Avoid jargon. In particular, avoid acronyms unless there is minimal possibility of confusion.\nnIt's ok to say USA if you're talking about the USA.\nnIt's not ok to say PMA, even if you're talking about positive mental attitude.\nnAvoid using Julia in your package name.\nnIt is usually clear from context and to your users that the package is a Julia package.\nnHaving Julia in the name can imply that the package is connected to, or endorsed by, contributors to the Julia language itself.\nnPackages that provide most of their functionality in association with a new type should have pluralized names.\nnDataFrames provides the DataFrame type.\nnBloomFilters provides the BloomFilter type.\nnIn contrast, JuliaParser provides no new type, but instead new functionality in the JuliaParser.parse() function.\nnErr on the side of clarity, even if clarity seems long-winded to you.\nnRandomMatrices is a less ambiguous name than RndMat or RMT, even though the latter are shorter.\nnA less systematic name may suit a package that implements one of several possible approaches to its domain.\nnJulia does not have a single comprehensive plotting package. Instead, Gadfly, PyPlot, Winston and other packages each implement a unique approach based on a particular design philosophy.\nnIn contrast, SortingAlgorithms provides a consistent interface to use many well-established sorting algorithms.\nnPackages that wrap external libraries or programs should be named after those libraries or programs.\nnCPLEX.jl wraps the CPLEX library, which can be identified easily in a web search.\nnMATLAB.jl provides an interface to call the MATLAB engine from within Julia."
},

{
    "location": "manual/packages.html#Generating-the-package-1",
    "title": "Generating the package",
    "category": "Section",
    "text": "Suppose you want to create a new Julia package called FooBar.  To get started, do PkgDev.generate(pkg,license) where pkg is the new package name and license is the name of a license that the package generator knows about:julia> PkgDev.generate(\"FooBar\",\"MIT\")\nnINFO: Initializing FooBar repo: /Users/stefan/.julia/v0.4/FooBar\nnINFO: Origin: git://github.com/StefanKarpinski/FooBar.jl.git\nnINFO: Generating LICENSE.md\nnINFO: Generating README.md\nnINFO: Generating src/FooBar.jl\nnINFO: Generating test/runtests.jl\nnINFO: Generating REQUIRE\nnINFO: Generating .travis.yml\nnINFO: Generating appveyor.yml\nnINFO: Generating .gitignore\nnINFO: Committing FooBar generated filesThis creates the directory ~/.julia/v0.4/FooBar, initializes it as a git repository, generates a bunch of files that all packages should have, and commits them to the repository:$ cd ~/.julia/v0.4/FooBar && git show --stat\nn\nncommit 84b8e266dae6de30ab9703150b3bf771ec7b6285\nnAuthor: Stefan Karpinski <stefan@karpinski.org>\nnDate:   Wed Oct 16 17:57:58 2013 -0400\nn\nn    FooBar.jl generated files.\nn\nn        license: MIT\nn        authors: Stefan Karpinski\nn        years:   2013\nn        user:    StefanKarpinski\nn\nn    Julia Version 0.3.0-prerelease+3217 [5fcfb13*]\nn\nn .gitignore       |  2 ++\nn .travis.yml      | 13 +++++++++++++\nn LICENSE.md       | 22 +++++++++++++++++++++++\nn README.md        |  3 +++\nn REQUIRE          |  1 +\nn appveyor.yml     | 34 ++++++++++++++++++++++++++++++++++\nn src/FooBar.jl    |  5 +++++\nn test/runtests.jl |  5 +++++\nn 8 files changed, 85 insertions(+)At the moment, the package manager knows about the MIT \"Expat\" License, indicated by \"MIT\", the Simplified BSD License, indicated by \"BSD\", and version 2.0 of the Apache Software License, indicated by \"ASL\".  If you want to use a different license, you can ask us to add it to the package generator, or just pick one of these three and then modify the ~/.julia/v0.4/PACKAGE/LICENSE.md file after it has been generated.If you created a GitHub account and configured git to know about it, PkgDev.generate() will set an appropriate origin URL for you.  It will also automatically generate a .travis.yml file for using the Travis automated testing service, and an appveyor.yml file for using AppVeyor.  You will have to enable testing on the Travis and AppVeyor websites for your package repository, but once you've done that, it will already have working tests. Of course, all the default testing does is verify that using FooBar in Julia works."
},

{
    "location": "manual/packages.html#Making-Your-Package-Available-1",
    "title": "Making Your Package Available",
    "category": "Section",
    "text": "Once you've made some commits and you're happy with how FooBar is working, you may want to get some other people to try it out.  First you'll need to create the remote repository and push your code to it; we don't yet automatically do this for you, but we will in the future and it's not too hard to figure out [3].  Once you've done this, letting people try out your code is as simple as sending them the URL of the published repo – in this case:git://github.com/StefanKarpinski/FooBar.jl.gitFor your package, it will be your GitHub user name and the name of your package, but you get the idea. People you send this URL to can use Pkg.clone() to install the package and try it out:julia> Pkg.clone(\"git://github.com/StefanKarpinski/FooBar.jl.git\")\nnINFO: Cloning FooBar from git@github.com:StefanKarpinski/FooBar.jl.gitfootnote: [3]\nnInstalling and using GitHub's \"hub\" tool is highly recommended. It allows you to do things like run hub create in the package repo and have it automatically created via GitHub's API."
},

{
    "location": "manual/packages.html#Tagging-and-Publishing-Your-Package-1",
    "title": "Tagging and Publishing Your Package",
    "category": "Section",
    "text": "Once you've decided that FooBar is ready to be registered as an official package, you can add it to your local copy of METADATA using PkgDev.register():julia> PkgDev.register(\"FooBar\")\nnINFO: Registering FooBar at git://github.com/StefanKarpinski/FooBar.jl.git\nnINFO: Committing METADATA for FooBarThis creates a commit in the ~/.julia/v0.4/METADATA repo:$ cd ~/.julia/v0.4/METADATA && git show\nn\nncommit 9f71f4becb05cadacb983c54a72eed744e5c019d\nnAuthor: Stefan Karpinski <stefan@karpinski.org>\nnDate:   Wed Oct 16 18:46:02 2013 -0400\nn\nn    Register FooBar\nn\nndiff --git a/FooBar/url b/FooBar/url\nnnew file mode 100644\nnindex 0000000..30e525e\nn--- /dev/null\nn+++ b/FooBar/url\nn@@ -0,0 +1 @@\nn+git://github.com/StefanKarpinski/FooBar.jl.gitThis commit is only locally visible, however.  To make it visible to the Julia community, you need to merge your local METADATA upstream into the official repo.  The PkgDev.publish() command will fork the METADATA repository on GitHub, push your changes to your fork, and open a pull request:julia> PkgDev.publish()\nnINFO: Validating METADATA\nnINFO: No new package versions to publish\nnINFO: Submitting METADATA changes\nnINFO: Forking JuliaLang/METADATA.jl to StefanKarpinski\nnINFO: Pushing changes as branch pull-request/ef45f54b\nnINFO: To create a pull-request open:\nn\nn  https://github.com/StefanKarpinski/METADATA.jl/compare/pull-request/ef45f54btip: \nnIf PkgDev.publish() fails with error:ERROR: key not found: \"token\"then you may have encountered an issue from using the GitHub API on multiple systems. The solution is to delete the \"Julia Package Manager\" personal access token from your Github account and try again.Other failures may require you to circumvent PkgDev.publish() by creating a pull request on GitHub. See: Publishing METADATA manually below.Once the package URL for FooBar is registered in the official METADATA repo, people know where to clone the package from, but there still aren't any registered versions available. You can tag and register it with the PkgDev.tag() command:julia> PkgDev.tag(\"FooBar\")\nnINFO: Tagging FooBar v0.0.1\nnINFO: Committing METADATA for FooBarThis tags v0.0.1 in the FooBar repo:$ cd ~/.julia/v0.4/FooBar && git tag\nnv0.0.1It also creates a new version entry in your local METADATA repo for FooBar:$ cd ~/.julia/v0.4/FooBar && git show\nncommit de77ee4dc0689b12c5e8b574aef7f70e8b311b0e\nnAuthor: Stefan Karpinski <stefan@karpinski.org>\nnDate:   Wed Oct 16 23:06:18 2013 -0400\nn\nn    Tag FooBar v0.0.1\nn\nndiff --git a/FooBar/versions/0.0.1/sha1 b/FooBar/versions/0.0.1/sha1\nnnew file mode 100644\nnindex 0000000..c1cb1c1\nn--- /dev/null\nn+++ b/FooBar/versions/0.0.1/sha1\nn@@ -0,0 +1 @@\nn+84b8e266dae6de30ab9703150b3bf771ec7b6285The PkgDev.tag() command takes an optional second argument that is either an explicit version number object like v\"0.0.1\" or one of the symbols :patch, :minor or :major.  These increment the patch, minor or major version number of your package intelligently.Adding a tagged version of your package will expedite the official registration into METADATA.jl by collaborators. It is strongly recommended that you complete this process, regardless if your package is completely ready for an official release.As a general rule, packages should be tagged 0.0.1 first. Since Julia itself hasn't achieved 1.0 status, it's best to be conservative in your package's tagged versions.As with PkgDev.register(), these changes to METADATA aren't available to anyone else until they've been included upstream. Again, use the PkgDev.publish() command, which first makes sure that individual package repos have been tagged, pushes them if they haven't already been, and then opens a pull request to METADATA:julia> PkgDev.publish()\nnINFO: Validating METADATA\nnINFO: Pushing FooBar permanent tags: v0.0.1\nnINFO: Submitting METADATA changes\nnINFO: Forking JuliaLang/METADATA.jl to StefanKarpinski\nnINFO: Pushing changes as branch pull-request/3ef4f5c4\nnINFO: To create a pull-request open:\nn\nn  https://github.com/StefanKarpinski/METADATA.jl/compare/pull-request/3ef4f5c4"
},

{
    "location": "manual/packages.html#Publishing-METADATA-manually-1",
    "title": "Publishing METADATA manually",
    "category": "Section",
    "text": "If PkgDev.publish() fails you can follow these instructions to manually publish your package.By \"forking\" the main METADATA repository, you can create a personal copy (of METADATA.jl) under your GitHub account. Once that copy exists, you can push your local changes to your copy (just like any other GitHub project).go to https://github.com/JuliaLang/METADATA.jl/fork and create your own fork.\nnadd your fork as a remote repository for the METADATA repository on your local computer (in the terminal where USERNAME is your github username):cd ~/.julia/v0.4/METADATA\nngit remote add USERNAME https://github.com/USERNAME/METADATA.jl.gitpush your changes to your fork:\nngit push USERNAME metadata-v2\nnIf all of that works, then go back to the GitHub page for your fork, and click the \"pull request\" link."
},

{
    "location": "manual/packages.html#Fixing-Package-Requirements-1",
    "title": "Fixing Package Requirements",
    "category": "Section",
    "text": "If you need to fix the registered requirements of an already-published package version, you can do so just by editing the metadata for that version, which will still have the same commit hash – the hash associated with a version is permanent:$ cd ~/.julia/v0.4/METADATA/FooBar/versions/0.0.1 && cat requires\nnjulia 0.3-\nn$ vi requiresSince the commit hash stays the same, the contents of the REQUIRE file that will be checked out in the repo will not match the requirements in METADATA after such a change; this is unavoidable. When you fix the requirements in METADATA for a previous version of a package, however, you should also fix the REQUIRE file in the current version of the package."
},

{
    "location": "manual/parallel-computing.html",
    "title": "Parallel Computing",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/parallel-computing.html#Parallel-Computing-1",
    "title": "Parallel Computing",
    "category": "Section",
    "text": "Most modern computers possess more than one CPU, and several computers can be combined together in a cluster. Harnessing the power of these multiple CPUs allows many computations to be completed more quickly. There are two major factors that influence performance: the speed of the CPUs themselves, and the speed of their access to memory. In a cluster, it's fairly obvious that a given CPU will have fastest access to the RAM within the same computer (node). Perhaps more surprisingly, similar issues are relevant on a typical multicore laptop, due to differences in the speed of main memory and the cache. Consequently, a good multiprocessing environment should allow control over the \"ownership\" of a chunk of memory by a particular CPU. Julia provides a multiprocessing environment based on message passing to allow programs to run on multiple processes in separate memory domains at once.Julia's implementation of message passing is different from other environments such as MPI [1]. Communication in Julia is generally \"one-sided\", meaning that the programmer needs to explicitly manage only one process in a two-process operation. Furthermore, these operations typically do not look like \"message send\" and \"message receive\" but rather resemble higher-level operations like calls to user functions.Parallel programming in Julia is built on two primitives: remote references and remote calls. A remote reference is an object that can be used from any process to refer to an object stored on a particular process. A remote call is a request by one process to call a certain function on certain arguments on another (possibly the same) process.Remote references come in two flavors -Future and RemoteChannel.A remote call returns a Future to its result. Remote calls return immediately; the process that made the call proceeds to its next operation while the remote call happens somewhere else. You can wait for a remote call to finish by calling wait() on the returned Future, and you can obtain the full value of the result using fetch().On the other hand RemoteChannel s are rewritable. For example, multiple processes can co-ordinate their processing by referencing the same remote Channel.Let's try this out. Starting with julia -p n provides n worker processes on the local machine. Generally it makes sense for n to equal the number of CPU cores on the machine.$ ./julia -p 2\nn\nnjulia> r = remotecall(rand, 2, 2, 2)\nnFuture(2,1,3,Nullable{Any}())\nn\nnjulia> s = @spawnat 2 1 .+ fetch(r)\nnFuture(2,1,6,Nullable{Any}())\nn\nnjulia> fetch(s)\nn2×2 Array{Float64,2}:\nn 1.60401  1.50111\nn 1.17457  1.15741The first argument to remotecall() is the function to call. Most parallel programming in Julia does not reference specific processes or the number of processes available, but remotecall() is considered a low-level interface providing finer control. The second argument to remotecall() is the index of the process that will do the work, and the remaining arguments will be passed to the function being called.As you can see, in the first line we asked process 2 to construct a 2-by-2 random matrix, and in the second line we asked it to add 1 to it. The result of both calculations is available in the two futures, r and s. The @spawnat macro evaluates the expression in the second argument on the process specified by the first argument.Occasionally you might want a remotely-computed value immediately. This typically happens when you read from a remote object to obtain data needed by the next local operation. The function remotecall_fetch() exists for this purpose. It is equivalent to fetch(remotecall(...)) but is more efficient.julia> remotecall_fetch(getindex, 2, r, 1, 1)\nn0.10824216411304866Remember that getindex(r,1,1) is equivalent to r[1,1], so this call fetches the first element of the future r.The syntax of remotecall() is not especially convenient. The macro @spawn makes things easier. It operates on an expression rather than a function, and picks where to do the operation for you:julia> r = @spawn rand(2,2)\nnFuture(2,1,4,Nullable{Any}())\nn\nnjulia> s = @spawn 1 .+ fetch(r)\nnFuture(3,1,5,Nullable{Any}())\nn\nnjulia> fetch(s)\nn1.10824216411304866 1.13798233877923116\nn1.12376292706355074 1.18750497916607167Note that we used 1 .+ fetch(r) instead of 1 .+ r. This is because we do not know where the code will run, so in general a fetch() might be required to move r to the process doing the addition. In this case, @spawn is smart enough to perform the computation on the process that owns r, so the fetch() will be a no-op.(It is worth noting that @spawn is not built-in but defined in Julia as a macro. It is possible to define your own such constructs.)An important thing to remember is that, once fetched, a Future will cache its value locally. Further fetch calls do not entail a network hop. Once all referencing Futures have fetched, the remote stored value is deleted."
},

{
    "location": "manual/parallel-computing.html#Code-Availability-and-Loading-Packages-1",
    "title": "Code Availability and Loading Packages",
    "category": "Section",
    "text": "Your code must be available on any process that runs it. For example, type the following into the Julia prompt:julia> function rand2(dims...)\nn         return 2*rand(dims...)\nn       end\nn\nnjulia> rand2(2,2)\nn2×2 Array{Float64,2}:\nn 0.153756  0.368514\nn 1.15119   0.918912\nn\nnjulia> fetch(@spawn rand2(2,2))\nnERROR: On worker 2:\nnfunction rand2 not defined on process 2Process 1 knew about the function rand2, but process 2 did not.Most commonly you'll be loading code from files or packages, and you have a considerable amount of flexibility in controlling which processes load code.  Consider a file, \"DummyModule.jl\", containing the following code:module DummyModule\nn\nnexport MyType, f\nn\nntype MyType\nn    a::Int\nnend\nn\nnf(x) = x^2+1\nn\nnprintln(\"loaded\")\nn\nnendStarting Julia with julia -p 2, you can use this to verify the following:include(\"DummyModule.jl\") loads the file on just a single process (whichever one executes the statement).\nnusing DummyModule causes the module to be loaded on all processes; however, the module is brought into scope only on the one executing the statement.\nnAs long as DummyModule is loaded on process 2, commands like\nnrr = RemoteChannel(2)\nnput!(rr, MyType(7))\nnallow you to store an object of type MyType on process 2 even if DummyModule is not in scope on process 2.You can force a command to run on all processes using the @everywhere macro. For example, @everywhere can also be used to directly define a function on all processes:julia> @everywhere id = myid()\nn\nnjulia> remotecall_fetch(()->id, 2)\nn2A file can also be preloaded on multiple processes at startup, and a driver script can be used to drive the computation:julia -p <n> -L file1.jl -L file2.jl driver.jlEach process has an associated identifier. The process providing the interactive Julia prompt always has an id equal to 1, as would the Julia process running the driver script in the example above. The processes used by default for parallel operations are referred to as \"workers\". When there is only one process, process 1 is considered a worker. Otherwise, workers are considered to be all processes other than process 1.The base Julia installation has in-built support for two types of clusters:A local cluster specified with the -p option as shown above.\nnA cluster spanning machines using the --machinefile option. This uses a passwordless ssh login to start Julia worker processes (from the same path as the current host) on the specified machines.Functions addprocs(), rmprocs(), workers(), and others are available as a programmatic means of adding, removing and querying the processes in a cluster.Note that workers do not run a .juliarc.jl startup script, nor do they synchronize their global state (such as global variables, new method definitions, and loaded modules) with any of the other running processes.Other types of clusters can be supported by writing your own custom ClusterManager, as described below in the ClusterManagers section."
},

{
    "location": "manual/parallel-computing.html#Data-Movement-1",
    "title": "Data Movement",
    "category": "Section",
    "text": "Sending messages and moving data constitute most of the overhead in a parallel program. Reducing the number of messages and the amount of data sent is critical to achieving performance and scalability. To this end, it is important to understand the data movement performed by Julia's various parallel programming constructs.fetch() can be considered an explicit data movement operation, since it directly asks that an object be moved to the local machine. @spawn (and a few related constructs) also moves data, but this is not as obvious, hence it can be called an implicit data movement operation. Consider these two approaches to constructing and squaring a random matrix:# method 1\nnA = rand(1000,1000)\nnBref = @spawn A^2\nn...\nnfetch(Bref)\nn\nn# method 2\nnBref = @spawn rand(1000,1000)^2\nn...\nnfetch(Bref)The difference seems trivial, but in fact is quite significant due to the behavior of @spawn. In the first method, a random matrix is constructed locally, then sent to another process where it is squared. In the second method, a random matrix is both constructed and squared on another process. Therefore the second method sends much less data than the first.In this toy example, the two methods are easy to distinguish and choose from. However, in a real program designing data movement might require more thought and likely some measurement. For example, if the first process needs matrix A then the first method might be better. Or, if computing A is expensive and only the current process has it, then moving it to another process might be unavoidable. Or, if the current process has very little to do between the @spawn and fetch(Bref) then it might be better to eliminate the parallelism altogether. Or imagine rand(1000,1000) is replaced with a more expensive operation. Then it might make sense to add another @spawn statement just for this step."
},

{
    "location": "manual/parallel-computing.html#Parallel-Map-and-Loops-1",
    "title": "Parallel Map and Loops",
    "category": "Section",
    "text": "Fortunately, many useful parallel computations do not require data movement. A common example is a Monte Carlo simulation, where multiple processes can handle independent simulation trials simultaneously. We can use @spawn to flip coins on two processes. First, write the following function in count_heads.jl:function count_heads(n)\nn    c::Int = 0\nn    for i=1:n\nn        c += rand(Bool)\nn    end\nn    c\nnendThe function count_heads simply adds together n random bits. Here is how we can perform some trials on two machines, and add together the results:@everywhere include(\"count_heads.jl\")\nn\nna = @spawn count_heads(100000000)\nnb = @spawn count_heads(100000000)\nnfetch(a)+fetch(b)This example demonstrates a powerful and often-used parallel programming pattern. Many iterations run independently over several processes, and then their results are combined using some function. The combination process is called a reduction, since it is generally tensor-rank-reducing: a vector of numbers is reduced to a single number, or a matrix is reduced to a single row or column, etc. In code, this typically looks like the pattern x = f(x,v[i]), where x is the accumulator, f is the reduction function, and the v[i] are the elements being reduced. It is desirable for f to be associative, so that it does not matter what order the operations are performed in.Notice that our use of this pattern with count_heads can be generalized. We used two explicit @spawn statements, which limits the parallelism to two processes. To run on any number of processes, we can use a parallel for loop, which can be written in Julia like this:nheads = @parallel (+) for i=1:200000000\nn  Int(rand(Bool))\nnendThis construct implements the pattern of assigning iterations to multiple processes, and combining them with a specified reduction (in this case (+)). The result of each iteration is taken as the value of the last expression inside the loop. The whole parallel loop expression itself evaluates to the final answer.Note that although parallel for loops look like serial for loops, their behavior is dramatically different. In particular, the iterations do not happen in a specified order, and writes to variables or arrays will not be globally visible since iterations run on different processes. Any variables used inside the parallel loop will be copied and broadcast to each process.For example, the following code will not work as intended:a = zeros(100000)\nn@parallel for i=1:100000\nn  a[i] = i\nnendHowever, this code will not initialize all of a, since each process will have a separate copy of it. Parallel for loops like these must be avoided. Fortunately,  Shared Arrays can be used to get around this limitation:a = SharedArray(Float64,10)\nn@parallel for i=1:10\nn  a[i] = i\nnendUsing \"outside\" variables in parallel loops is perfectly reasonable if the variables are read-only:a = randn(1000)\nn@parallel (+) for i=1:100000\nn  f(a[rand(1:end)])\nnendHere each iteration applies f to a randomly-chosen sample from a vector a shared by all processes.As you could see, the reduction operator can be omitted if it is not needed. In that case, the loop executes asynchronously, i.e. it spawns independent tasks on all available workers and returns an array of Future immediately without waiting for completion. The caller can wait for the Future completions at a later point by calling fetch() on them, or wait for completion at the end of the loop by prefixing it with @sync, like @sync @parallel for.In some cases no reduction operator is needed, and we merely wish to apply a function to all integers in some range (or, more generally, to all elements in some collection). This is another useful operation called parallel map, implemented in Julia as the pmap() function. For example, we could compute the singular values of several large random matrices in parallel as follows:M = Matrix{Float64}[rand(1000,1000) for i=1:10]\nnpmap(svd, M)Julia's pmap() is designed for the case where each function call does a large amount of work. In contrast, @parallel for can handle situations where each iteration is tiny, perhaps merely summing two numbers. Only worker processes are used by both pmap() and @parallel for for the parallel computation. In case of @parallel for, the final reduction is done on the calling process."
},

{
    "location": "manual/parallel-computing.html#Synchronization-With-Remote-References-1",
    "title": "Synchronization With Remote References",
    "category": "Section",
    "text": ""
},

{
    "location": "manual/parallel-computing.html#Scheduling-1",
    "title": "Scheduling",
    "category": "Section",
    "text": "Julia's parallel programming platform uses Tasks (aka Coroutines) to switch among multiple computations. Whenever code performs a communication operation like fetch() or wait(), the current task is suspended and a scheduler picks another task to run. A task is restarted when the event it is waiting for completes.For many problems, it is not necessary to think about tasks directly. However, they can be used to wait for multiple events at the same time, which provides for dynamic scheduling. In dynamic scheduling, a program decides what to compute or where to compute it based on when other jobs finish. This is needed for unpredictable or unbalanced workloads, where we want to assign more work to processes only when they finish their current tasks.As an example, consider computing the singular values of matrices of different sizes:M = Matrix{Float64}[rand(800,800), rand(600,600), rand(800,800), rand(600,600)]\nnpmap(svd, M)If one process handles both 800×800 matrices and another handles both 600×600 matrices, we will not get as much scalability as we could. The solution is to make a local task to \"feed\" work to each process when it completes its current task. For example, consider a simple pmap() implementation:function pmap(f, lst)\nn    np = nprocs()  # determine the number of processes available\nn    n = length(lst)\nn    results = Vector{Any}(n)\nn    i = 1\nn    # function to produce the next work item from the queue.\nn    # in this case it's just an index.\nn    nextidx() = (idx=i; i+=1; idx)\nn    @sync begin\nn        for p=1:np\nn            if p != myid() || np == 1\nn                @async begin\nn                    while true\nn                        idx = nextidx()\nn                        if idx > n\nn                            break\nn                        end\nn                        results[idx] = remotecall_fetch(f, p, lst[idx])\nn                    end\nn                end\nn            end\nn        end\nn    end\nn    results\nnend@async is similar to @spawn, but only runs tasks on the local process. We use it to create a \"feeder\" task for each process. Each task picks the next index that needs to be computed, then waits for its process to finish, then repeats until we run out of indexes. Note that the feeder tasks do not begin to execute until the main task reaches the end of the @sync block, at which point it surrenders control and waits for all the local tasks to complete before returning from the function. The feeder tasks are able to share state via nextidx() because they all run on the same process. No locking is required, since the threads are scheduled cooperatively and not preemptively. This means context switches only occur at well-defined points: in this case, when remotecall_fetch() is called."
},

{
    "location": "manual/parallel-computing.html#Channels-1",
    "title": "Channels",
    "category": "Section",
    "text": "Channels provide for a fast means of inter-task communication. A Channel{T}(n::Int) is a shared queue of maximum length n holding objects of type T. Multiple readers can read off the channel via fetch and take!. Multiple writers can add to the channel via put!. isready tests for the presence of any object in the channel, while wait waits for an object to become available. close closes a Channel. On a closed channel, put! will fail, while take! and fetch successfully return any existing values till it is emptied.A Channel can be used as an iterable object in a for loop, in which case the loop runs as long as the channel has data or is open. The loop variable takes on all values added to the channel. An empty, closed channel causes the for loop to terminate."
},

{
    "location": "manual/parallel-computing.html#Remote-references-and-AbstractChannels-1",
    "title": "Remote references and AbstractChannels",
    "category": "Section",
    "text": "Remote references always refer to an implementation of an AbstractChannelA concrete implementation of an AbstractChannel (like Channel), is required to implement put!, take!, fetch, isready and wait. The remote object referred to by a Future is stored in a Channel{Any}(1), i.e., a channel of size 1 capable of holding objects of Any type.RemoteChannel, which is rewritable, can point to any type and size of channels, or any other implementation of an AbstractChannel.The constructor RemoteChannel(f::Function, pid) allows us to construct references to channels holding more than one value of a specific type. f() is a function executed on pid and it must return an AbstractChannel.For example, RemoteChannel(()->Channel{Int}(10), pid), will return a reference to a channel of type Int and size 10. The channel exists on worker pid.Methods put!, take!, fetch, isready and wait on a RemoteChannel are proxied onto the backing store on the remote process.RemoteChannel can thus be used to refer to user implemented AbstractChannel objects. A simple example of this is provided in examples/dictchannel.jl which uses a dictionary as its remote store."
},

{
    "location": "manual/parallel-computing.html#Remote-References-and-Distributed-Garbage-Collection-1",
    "title": "Remote References and Distributed Garbage Collection",
    "category": "Section",
    "text": "Objects referred to by remote references can be freed only when all held references in the cluster are deleted.The node where the value is stored keeps track of which of the workers have a reference to it. Every time a RemoteChannel or a (unfetched) Future is serialized to a worker, the node pointed to by the reference is notified. And every time a RemoteChannel or a (unfetched) Future is garbage collected locally, the node owning the value is again notified.The notifications are done via sending of \"tracking\" messages - an \"add reference\" message when a reference is serialized to a different process and a \"delete reference\" message when a reference is locally garbage collected.Since Futures are write-once and cached locally, the act of fetching a Future also updates reference tracking information on the node owning the value.The node which owns the value frees it once all references to it are cleared.With Futures, serializing an already fetched Future to a different node also sends the value since the original remote store may have collected the value by this time.It is important to note that when an object is locally garbage collected depends on the size of the object and the current memory pressure in the system.In case of remote references, the size of the local reference object is quite small, while the value stored on the remote node may be quite large. Since the local object may not be collected immediately, it is a good practice to explicitly call finalize on local instances of a RemoteChannel, or on unfetched Futures. Since calling fetch on a Future also removes its reference from the remote store, this is not required on fetched Futures. Explicitly calling finalize results in an immediate message sent to the remote node to go ahead and remove its reference to the value.Once finalized, a reference becomes invalid and cannot be used in any further calls."
},

{
    "location": "manual/parallel-computing.html#Shared-Arrays-1",
    "title": "Shared Arrays",
    "category": "Section",
    "text": "Shared Arrays use system shared memory to map the same array across many processes.  While there are some similarities to a DArray, the behavior of a SharedArray is quite different. In a DArray, each process has local access to just a chunk of the data, and no two processes share the same chunk; in contrast, in a SharedArray each \"participating\" process has access to the entire array.  A SharedArray is a good choice when you want to have a large amount of data jointly accessible to two or more processes on the same machine.SharedArray indexing (assignment and accessing values) works just as with regular arrays, and is efficient because the underlying memory is available to the local process.  Therefore, most algorithms work naturally on SharedArrays, albeit in single-process mode.  In cases where an algorithm insists on an Array input, the underlying array can be retrieved from a SharedArray by calling sdata(). For other AbstractArray types, sdata just returns the object itself, so it's safe to use sdata() on any Array-type object.The constructor for a shared array is of the form:SharedArray(T::Type, dims::NTuple; init=false, pids=Int[])which creates a shared array of a bitstype T and size dims across the processes specified by pids.  Unlike distributed arrays, a shared array is accessible only from those participating workers specified by the pids named argument (and the creating process too, if it is on the same host).If an init function, of signature initfn(S::SharedArray), is specified, it is called on all the participating workers.  You can arrange it so that each worker runs the init function on a distinct portion of the array, thereby parallelizing initialization.Here's a brief example:julia> addprocs(3)\nn3-element Array{Int64,1}:\nn 2\nn 3\nn 4\nn\nnjulia> S = SharedArray(Int, (3,4), init = S -> S[Base.localindexes(S)] = myid())\nn3×4 SharedArray{Int64,2}:\nn 2  2  3  4\nn 2  3  3  4\nn 2  3  4  4\nn\nnjulia> S[3,2] = 7\nn7\nn\nnjulia> S\nn3×4 SharedArray{Int64,2}:\nn 2  2  3  4\nn 2  3  3  4\nn 2  7  4  4Base.localindexes() provides disjoint one-dimensional ranges of indexes, and is sometimes convenient for splitting up tasks among processes. You can, of course, divide the work any way you wish:julia> S = SharedArray(Int, (3,4), init = S -> S[indexpids(S):length(procs(S)):length(S)] = myid())\nn3×4 SharedArray{Int64,2}:\nn 2  2  2  2\nn 3  3  3  3\nn 4  4  4  4Since all processes have access to the underlying data, you do have to be careful not to set up conflicts.  For example:@sync begin\nn    for p in procs(S)\nn        @async begin\nn            remotecall_wait(fill!, p, S, p)\nn        end\nn    end\nnendwould result in undefined behavior: because each process fills the entire array with its own pid, whichever process is the last to execute (for any particular element of S) will have its pid retained.As a more extended and complex example, consider running the following \"kernel\" in parallel:q[i,j,t+1] = q[i,j,t] + u[i,j,t]In this case, if we try to split up the work using a one-dimensional index, we are likely to run into trouble: if q[i,j,t] is near the end of the block assigned to one worker and q[i,j,t+1] is near the beginning of the block assigned to another, it's very likely that q[i,j,t] will not be ready at the time it's needed for computing q[i,j,t+1].  In such cases, one is better off chunking the array manually.  Let's split along the second dimension:# This function retuns the (irange,jrange) indexes assigned to this worker\nn@everywhere function myrange(q::SharedArray)\nn    idx = indexpids(q)\nn    if idx == 0\nn        # This worker is not assigned a piece\nn        return 1:0, 1:0\nn    end\nn    nchunks = length(procs(q))\nn    splits = [round(Int, s) for s in linspace(0,size(q,2),nchunks+1)]\nn    1:size(q,1), splits[idx]+1:splits[idx+1]\nnend\nn\nn# Here's the kernel\nn@everywhere function advection_chunk!(q, u, irange, jrange, trange)\nn    @show (irange, jrange, trange)  # display so we can see what's happening\nn    for t in trange, j in jrange, i in irange\nn        q[i,j,t+1] = q[i,j,t] +  u[i,j,t]\nn    end\nn    q\nnend\nn\nn# Here's a convenience wrapper for a SharedArray implementation\nn@everywhere advection_shared_chunk!(q, u) = advection_chunk!(q, u, myrange(q)..., 1:size(q,3)-1)Now let's compare three different versions, one that runs in a single process:advection_serial!(q, u) = advection_chunk!(q, u, 1:size(q,1), 1:size(q,2), 1:size(q,3)-1)one that uses @parallel:function advection_parallel!(q, u)\nn    for t = 1:size(q,3)-1\nn        @sync @parallel for j = 1:size(q,2)\nn            for i = 1:size(q,1)\nn                q[i,j,t+1]= q[i,j,t] + u[i,j,t]\nn            end\nn        end\nn    end\nn    q\nnendand one that delegates in chunks:function advection_shared!(q, u)\nn    @sync begin\nn        for p in procs(q)\nn            @async remotecall_wait(advection_shared_chunk!, p, q, u)\nn        end\nn    end\nn    q\nnendIf we create SharedArrays and time these functions, we get the following results (with julia -p 4):q = SharedArray(Float64, (500,500,500))\nnu = SharedArray(Float64, (500,500,500))\nn\nn# Run once to JIT-compile\nnadvection_serial!(q, u)\nnadvection_parallel!(q, u)\nnadvection_shared!(q,u)\nn\nn# Now the real results:\nnjulia> @time advection_serial!(q, u);\nn(irange,jrange,trange) = (1:500,1:500,1:499)\nn 830.220 milliseconds (216 allocations: 13820 bytes)\nn\nnjulia> @time advection_parallel!(q, u);\nn   2.495 seconds      (3999 k allocations: 289 MB, 2.09% gc time)\nn\nnjulia> @time advection_shared!(q,u);\nn        From worker 2:       (irange,jrange,trange) = (1:500,1:125,1:499)\nn        From worker 4:       (irange,jrange,trange) = (1:500,251:375,1:499)\nn        From worker 3:       (irange,jrange,trange) = (1:500,126:250,1:499)\nn        From worker 5:       (irange,jrange,trange) = (1:500,376:500,1:499)\nn 238.119 milliseconds (2264 allocations: 169 KB)The biggest advantage of advection_shared! is that it minimizes traffic among the workers, allowing each to compute for an extended time on the assigned piece."
},

{
    "location": "manual/parallel-computing.html#Shared-Arrays-and-Distributed-Garbage-Collection-1",
    "title": "Shared Arrays and Distributed Garbage Collection",
    "category": "Section",
    "text": "Like remote references, shared arrays are also dependent on garbage collection on the creating node to release references from all participating workers. Code which creates many short lived shared array objects would benefit from explicitly finalizing these objects as soon as possible. This results in both memory and file handles mapping the shared segment being released sooner."
},

{
    "location": "manual/parallel-computing.html#ClusterManagers-1",
    "title": "ClusterManagers",
    "category": "Section",
    "text": "The launching, management and networking of Julia processes into a logical cluster is done via cluster managers. A ClusterManager is responsible forlaunching worker processes in a cluster environment\nnmanaging events during the lifetime of each worker\nnoptionally, a cluster manager can also provide data transportA Julia cluster has the following characteristics: - The initial Julia process, also called the master is special and has a id of 1. - Only the master process can add or remove worker processes. - All processes can directly communicate with each other.Connections between workers (using the in-built TCP/IP transport) is established in the following manner:addprocs() is called on the master process with a ClusterManager object\nnaddprocs() calls the appropriate launch() method which spawns required number of worker processes on appropriate machines\nnEach worker starts listening on a free port and writes out its host, port information to STDOUT\nnThe cluster manager captures the stdout's of each worker and makes it available to the master process\nnThe master process parses this information and sets up TCP/IP connections to each worker\nnEvery worker is also notified of other workers in the cluster\nnEach worker connects to all workers whose id is less than its own id\nnIn this way a mesh network is established, wherein every worker is directly connected with every other workerWhile the default transport layer uses plain TCP sockets, it is possible for a Julia cluster to provide its own transport.Julia provides two in-built cluster managers:LocalManager, used when addprocs() or addprocs(np::Integer) are called\nnSSHManager, used when addprocs(hostnames::Array) is called with a list of hostnamesLocalManager is used to launch additional workers on the same host, thereby leveraging multi-core and multi-processor hardware.Thus, a minimal cluster manager would need to:be a subtype of the abstract ClusterManager\nnimplement launch(), a method responsible for launching new workers\nnimplement manage(), which is called at various events during a worker's lifetimeaddprocs(manager::FooManager) requires FooManager to implement:function launch(manager::FooManager, params::Dict, launched::Array, c::Condition)\nn    ...\nnend\nn\nnfunction manage(manager::FooManager, id::Integer, config::WorkerConfig, op::Symbol)\nn    ...\nnendAs an example let us see how the LocalManager, the manager responsible for starting workers on the same host, is implemented:immutable LocalManager <: ClusterManager\nn    np::Integer\nnend\nn\nnfunction launch(manager::LocalManager, params::Dict, launched::Array, c::Condition)\nn    ...\nnend\nn\nnfunction manage(manager::LocalManager, id::Integer, config::WorkerConfig, op::Symbol)\nn    ...\nnendThe launch() method takes the following arguments:manager::ClusterManager - the cluster manager addprocs() is called with\nnparams::Dict - all the keyword arguments passed to addprocs()\nnlaunched::Array - the array to append one or more WorkerConfig objects to\nnc::Condition - the condition variable to be notified as and when workers are launchedThe launch() method is called asynchronously in a separate task. The termination of this task signals that all requested workers have been launched. Hence the launch() function MUST exit as soon as all the requested workers have been launched.Newly launched workers are connected to each other, and the master process, in a all-to-all manner. Specifying command argument, --worker <cookie> results in the launched processes initializing themselves as workers and connections being setup via TCP/IP sockets. Optionally --bind-to bind_addr[:port] may also be specified to enable other workers to connect to it at the specified bind_addr and port. This is useful for multi-homed hosts.For non-TCP/IP transports, for example, an implementation may choose to use MPI as the transport, --worker must NOT be specified. Instead newly launched workers should call init_worker(cookie) before using any of the parallel constructs.For every worker launched, the launch() method must add a WorkerConfig object (with appropriate fields initialized) to launchedtype WorkerConfig\nn    # Common fields relevant to all cluster managers\nn    io::Nullable{IO}\nn    host::Nullable{AbstractString}\nn    port::Nullable{Integer}\nn\nn    # Used when launching additional workers at a host\nn    count::Nullable{Union{Int, Symbol}}\nn    exename::Nullable{AbstractString}\nn    exeflags::Nullable{Cmd}\nn\nn    # External cluster managers can use this to store information at a per-worker level\nn    # Can be a dict if multiple fields need to be stored.\nn    userdata::Nullable{Any}\nn\nn    # SSHManager / SSH tunnel connections to workers\nn    tunnel::Nullable{Bool}\nn    bind_addr::Nullable{AbstractString}\nn    sshflags::Nullable{Cmd}\nn    max_parallel::Nullable{Integer}\nn\nn    connect_at::Nullable{Any}\nn\nn    .....\nnendMost of the fields in WorkerConfig are used by the inbuilt managers. Custom cluster managers would typically specify only io or host / port:If io is specified, it is used to read host/port information. A Julia worker prints out its bind address and port at startup. This allows Julia workers to listen on any free port available instead of requiring worker ports to be configured manually.If io is not specified, host and port are used to connect.count, exename and exeflags are relevant for launching additional workers from a worker. For example, a cluster manager may launch a single worker per node, and use that to launch additional workers. count with an integer value n will launch a total of n workers, while a value of :auto will launch as many workers as cores on that machine. exename is the name of the julia executable including the full path. exeflags should be set to the required command line arguments for new workers.tunnel, bind_addr, sshflags and max_parallel are used when a ssh tunnel is required to connect to the workers from the master process.userdata is provided for custom cluster managers to store their own worker specific information.manage(manager::FooManager, id::Integer, config::WorkerConfig, op::Symbol) is called at different times during the worker's lifetime with appropriate op values:with :register/:deregister when a worker is added / removed from the Julia worker pool.\nnwith :interrupt when interrupt(workers) is called. The ClusterManager should signal the appropriate worker with an interrupt signal.\nnwith :finalize for cleanup purposes."
},

{
    "location": "manual/parallel-computing.html#Cluster-Managers-with-custom-transports-1",
    "title": "Cluster Managers with custom transports",
    "category": "Section",
    "text": "Replacing the default TCP/IP all-to-all socket connections with a custom transport layer is a little more involved. Each Julia process has as many communication tasks as the workers it is connected to. For example, consider a Julia cluster of 32 processes in a all-to-all mesh network:Each Julia process thus has 31 communication tasks\nnEach task handles all incoming messages from a single remote worker in a message processing loop\nnThe message processing loop waits on an AsyncStream object - for example, a TCP socket in the default implementation, reads an entire message, processes it and waits for the next one\nnSending messages to a process is done directly from any Julia task - not just communication tasks - again, via the appropriate AsyncStream objectReplacing the default transport involves the new implementation to setup connections to remote workers, and to provide appropriate AsyncStream objects that the message processing loops can wait on. The manager specific callbacks to be implemented are:connect(manager::FooManager, pid::Integer, config::WorkerConfig)\nnkill(manager::FooManager, pid::Int, config::WorkerConfig)The default implementation (which uses TCP/IP sockets) is implemented as connect(manager::ClusterManager, pid::Integer, config::WorkerConfig).connect should return a pair of AsyncStream objects, one for reading data sent from worker pid, and the other to write data that needs to be sent to worker pid. Custom cluster managers can use an in-memory BufferStream as the plumbing to proxy data between the custom, possibly non-AsyncStream transport and Julia's in-built parallel infrastructure.A BufferStream is an in-memory IOBuffer which behaves like an AsyncStream.Folder examples/clustermanager/0mq is an example of using ZeroMQ is connect Julia workers in a star network with a 0MQ broker in the middle. Note: The Julia processes are still all logically connected to each other - any worker can message any other worker directly without any awareness of 0MQ being used as the transport layer.When using custom transports:Julia workers must NOT be started with --worker. Starting with --worker will result in the newly launched workers defaulting to the TCP/IP socket transport implementation\nnFor every incoming logical connection with a worker, Base.process_messages(rd::AsyncStream, wr::AsyncStream) must be called. This launches a new task that handles reading and writing of messages from/to the worker represented by the AsyncStream objects\nninit_worker(cookie, manager::FooManager) MUST be called as part of worker process initializaton\nnField connect_at::Any in WorkerConfig can be set by the cluster manager when launch is called. The value of this field is passed in in all connect callbacks. Typically, it carries information on how to connect to a worker. For example, the TCP/IP socket transport uses this field to specify the (host, port) tuple at which to connect to a workerkill(manager, pid, config) is called to remove a worker from the cluster. On the master process, the corresponding AsyncStream objects must be closed by the implementation to ensure proper cleanup. The default implementation simply executes an exit() call on the specified remote worker.examples/clustermanager/simple is an example that shows a simple implementation using unix domain sockets for cluster setup"
},

{
    "location": "manual/parallel-computing.html#Network-requirements-for-LocalManager-and-SSHManager-1",
    "title": "Network requirements for LocalManager and SSHManager",
    "category": "Section",
    "text": "Julia clusters are designed to be executed on already secured environments on infrastructure ranging from local laptops, to departmental clusters or even on the cloud. This section covers network security requirements for the inbuilt LocalManager and SSHManager:The master process does not listen on any port. It only connects out to the workers.\nnEach worker binds to only one of the local interfaces and listens on the first free port starting from 9009.\nnLocalManager, i.e. addprocs(N), by default binds only to the loopback interface. This means that workers consequently started on remote hosts, or anyone with malicious intentions is unable to connect to the cluster. A addprocs(4) followed by a addprocs([\"remote_host\"]) will fail. Some users may need to create a cluster comprised of their local system and a few remote systems. This can be done by explicitly requesting LocalManager to bind to an external network interface via the restrict keyword argument. For example, addprocs(4; restrict=false).\nnSSHManager, i.e. addprocs(list_of_remote_hosts) launches workers on remote hosts via SSH. It is to be noted that by default SSH is only used to launch Julia workers. Subsequent master-worker and worker-worker connections use plain, unencrypted TCP/IP sockets. The remote hosts must have passwordless login enabled. Additional SSH flags or credentials may be specified via keyword argument sshflags.\nnaddprocs(list_of_remote_hosts; tunnel=true, sshflags=<ssh keys and other flags>) is useful when we wish to use SSH connections for master-worker too. A typical scenario for this is a local laptop running the Julia REPL (i.e., the master) with the rest of the cluster on the cloud, say on Amazon EC2. In this case only port 22 needs to be opened at the remote cluster coupled with SSH client authenticated via PKI. Authentication credentials can be supplied via sshflags, for example sshflags=`-e <keyfile>`.\nnNote that worker-worker connections are still plain TCP and the local security policy on the remote cluster must allow for free connections between worker nodes, at least for ports 9009 and above.\nnSecuring and encrypting all worker-worker traffic (via SSH), or encrypting individual messages can be done via a custom ClusterManager."
},

{
    "location": "manual/parallel-computing.html#Cluster-cookie-1",
    "title": "Cluster cookie",
    "category": "Section",
    "text": "All processes in a cluster share the same cookie which, by default, is a randomly generated string on the master process:Base.cluster_cookie() returns the cookie, Base.cluster_cookie(cookie) sets it.\nnAll connections are authenticated on both sides to ensure that only workers started by the master are allowed to connect to each other.\nnThe cookie must be passed to the workers at startup via argument --worker <cookie>. Custom ClusterManagers can retrieve the cookie on the master by calling Base.cluster_cookie(). Cluster managers not using the default TCP/IP transport (and hence not specifying --worker) must call init_worker(cookie, manager) with the same cookie as on the master.It is to be noted that environments requiring higher levels of security (for example, cookies can be pre-shared and hence not specified as a startup arg) can implement this via a custom ClusterManager."
},

{
    "location": "manual/parallel-computing.html#Specifying-network-topology-(Experimental)-1",
    "title": "Specifying network topology (Experimental)",
    "category": "Section",
    "text": "Keyword argument topology to addprocs is used to specify how the workers must be connected to each other::all_to_all : is the default, where all workers are connected to each other.\nn:master_slave : only the driver process, i.e. pid 1 has connections to the workers.\nn:custom : the launch method of the cluster manager specifes the connection topology. Fields ident and connect_idents in WorkerConfig are used to specify the  same. connect_idents is a list of ClusterManager provided identifiers to workers that worker with identified by ident must connect to.Currently sending a message between unconnected workers results in an error. This behaviour, as also the functionality and interface should be considered experimental in nature and may change in future releases."
},

{
    "location": "manual/parallel-computing.html#Multi-threading-(Experimental)-1",
    "title": "Multi-threading (Experimental)",
    "category": "Section",
    "text": "In addition to tasks, remote calls and remote references, Julia from v0.5 will natively support multi-threading. Note that this section is experimental and the interfaces may change in the future."
},

{
    "location": "manual/parallel-computing.html#Setup-1",
    "title": "Setup",
    "category": "Section",
    "text": "By default, Julia starts up with a single thread of execution. This can be verified by using the command Threads.nthreads():julia> Threads.nthreads()\nn1The number of threads Julia starts up with is controlled by an environment variable called JULIA_NUM_THREADS. Now, let's start up Julia with 4 threads:export JULIA_NUM_THREADS=4(The above command works on bourne shells on Linux and OSX. Note that if you're using a C shell on these platforms, you should use the keyword set instead of export. If you're on Windows, start up the command line in the location of julia.exe and use set instead of export.)Let's verify there are 4 threads at our disposal.julia> Threads.nthreads()\nn4But we are currently on the master thread. To check, we use the command Threads.threadid()julia> Threads.threadid()\nn1"
},

{
    "location": "manual/performance-tips.html",
    "title": "Performance Tips",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/performance-tips.html#Performance-Tips-1",
    "title": "Performance Tips",
    "category": "Section",
    "text": "In the following sections, we briefly go through a few techniques that can help make your Julia code run as fast as possible."
},

{
    "location": "manual/performance-tips.html#Avoid-global-variables-1",
    "title": "Avoid global variables",
    "category": "Section",
    "text": "A global variable might have its value, and therefore its type, change at any point. This makes it difficult for the compiler to optimize code using global variables. Variables should be local, or passed as arguments to functions, whenever possible.Any code that is performance critical or being benchmarked should be inside a function.We find that global names are frequently constants, and declaring them as such greatly improves performance:const DEFAULT_VAL = 0Uses of non-constant globals can be optimized by annotating their types at the point of use:global x\nny = f(x::Int + 1)Writing functions is better style. It leads to more reusable code and clarifies what steps are being done, and what their inputs and outputs are.NOTE:  All code in the REPL is evaluated in global scope, so a variable defined and assigned at toplevel will be a global variable.In the following REPL session:julia> x = 1.0is equivalent to:julia> global x = 1.0so all the performance issues discussed previously apply."
},

{
    "location": "manual/performance-tips.html#Measure-performance-with-[@time](@ref)-and-pay-attention-to-memory-allocation-1",
    "title": "Measure performance with @time and pay attention to memory allocation",
    "category": "Section",
    "text": "The most useful tool for measuring performance is the @time macro. The following example illustrates good working style:julia> function f(n)\nn           s = 0\nn           for i = 1:n\nn               s += i/2\nn           end\nn           s\nn       end\nnf (generic function with 1 method)\nn\nnjulia> @time f(1)\nnelapsed time: 0.004710563 seconds (93504 bytes allocated)\nn0.5\nn\nnjulia> @time f(10^6)\nnelapsed time: 0.04123202 seconds (32002136 bytes allocated)\nn2.5000025e11On the first call (@time f(1)), f gets compiled.  (If you've not yet used @time in this session, it will also compile functions needed for timing.)  You should not take the results of this run seriously. For the second run, note that in addition to reporting the time, it also indicated that a large amount of memory was allocated. This is the single biggest advantage of @time vs. functions like tic() and toc(), which only report time.Unexpected memory allocation is almost always a sign of some problem with your code, usually a problem with type-stability. Consequently, in addition to the allocation itself, it's very likely that the code generated for your function is far from optimal. Take such indications seriously and follow the advice below.As a teaser, note that an improved version of this function allocates no memory (except to pass back the result back to the REPL) and has an order of magnitude faster execution after the first call:julia> @time f_improved(1)   # first call\nnelapsed time: 0.003702172 seconds (78944 bytes allocated)\nn0.5\nn\nnjulia> @time f_improved(10^6)\nnelapsed time: 0.004313644 seconds (112 bytes allocated)\nn2.5000025e11Below you'll learn how to spot the problem with f and how to fix it.In some situations, your function may need to allocate memory as part of its operation, and this can complicate the simple picture above. In such cases, consider using one of the tools below to diagnose problems, or write a version of your function that separates allocation from its algorithmic aspects (see Pre-allocating outputs)."
},

{
    "location": "manual/performance-tips.html#Tools-1",
    "title": "Tools",
    "category": "Section",
    "text": "Julia and its package ecosystem includes tools that may help you diagnose problems and improve the performance of your code:Profiling allows you to measure the performance of your running code and identify lines that serve as bottlenecks.  For complex projects, the ProfileView package can help you visualize your profiling results.\nnUnexpectedly-large memory allocations–as reported by @time, @allocated, or the profiler (through calls to the garbage-collection routines)–hint that there might be issues with your code.  If you don't see another reason for the allocations, suspect a type problem.  You can also start Julia with the --track-allocation=user option and examine the resulting *.mem files to see information about where those allocations occur.  See Memory allocation analysis.\nn@code_warntype generates a representation of your code that can be helpful in finding expressions that result in type uncertainty. See @code_warntype below.\nnThe Lint and TypeCheck packages can also warn you of certain types of programming errors."
},

{
    "location": "manual/performance-tips.html#Avoid-containers-with-abstract-type-parameters-1",
    "title": "Avoid containers with abstract type parameters",
    "category": "Section",
    "text": "When working with parameterized types, including arrays, it is best to avoid parameterizing with abstract types where possible.Consider the following:a = Real[]    # typeof(a) = Array{Real,1}\nnif (f = rand()) < .8\nn    push!(a, f)\nnendBecause a is a an array of abstract type Real, it must be able to hold any Real value.  Since Real objects can be of arbitrary size and structure, a must be represented as an array of pointers to individually allocated Real objects.  Because f will always be a Float64, we should instead, use:a = Float64[] # typeof(a) = Array{Float64,1}which will create a contiguous block of 64-bit floating-point values that can be manipulated efficiently.See also the discussion under Parametric Types."
},

{
    "location": "manual/performance-tips.html#Type-declarations-1",
    "title": "Type declarations",
    "category": "Section",
    "text": "In many languages with optional type declarations, adding declarations is the principal way to make code run faster. This is not the case in Julia. In Julia, the compiler generally knows the types of all function arguments, local variables, and expressions. However, there are a few specific instances where declarations are helpful."
},

{
    "location": "manual/performance-tips.html#Avoid-fields-with-abstract-type-1",
    "title": "Avoid fields with abstract type",
    "category": "Section",
    "text": "Types can be declared without specifying the types of their fields:julia> type MyAmbiguousType\nn           a\nn       endThis allows a to be of any type. This can often be useful, but it does have a downside: for objects of type MyAmbiguousType, the compiler will not be able to generate high-performance code.  The reason is that the compiler uses the types of objects, not their values, to determine how to build code. Unfortunately, very little can be inferred about an object of type MyAmbiguousType:julia> b = MyAmbiguousType(\"Hello\")\nnMyAmbiguousType(\"Hello\")\nn\nnjulia> c = MyAmbiguousType(17)\nnMyAmbiguousType(17)\nn\nnjulia> typeof(b)\nnMyAmbiguousType\nn\nnjulia> typeof(c)\nnMyAmbiguousTypeb and c have the same type, yet their underlying representation of data in memory is very different. Even if you stored just numeric values in field a, the fact that the memory representation of a UInt8 differs from a Float64 also means that the CPU needs to handle them using two different kinds of instructions.  Since the required information is not available in the type, such decisions have to be made at run-time. This slows performance.You can do better by declaring the type of a. Here, we are focused on the case where a might be any one of several types, in which case the natural solution is to use parameters. For example:julia> type MyType{T<:AbstractFloat}\nn         a::T\nn       endThis is a better choice thanjulia> type MyStillAmbiguousType\nn         a::AbstractFloat\nn       endbecause the first version specifies the type of a from the type of the wrapper object.  For example:julia> m = MyType(3.2)\nnMyType{Float64}(3.2)\nn\nnjulia> t = MyStillAmbiguousType(3.2)\nnMyStillAmbiguousType(3.2)\nn\nnjulia> typeof(m)\nnMyType{Float64}\nn\nnjulia> typeof(t)\nnMyStillAmbiguousTypeThe type of field a can be readily determined from the type of m, but not from the type of t.  Indeed, in t it's possible to change the type of field a:julia> typeof(t.a)\nnFloat64\nn\nnjulia> t.a = 4.5f0\nn4.5f0\nn\nnjulia> typeof(t.a)\nnFloat32In contrast, once m is constructed, the type of m.a cannot change:julia> m.a = 4.5f0\nn4.5f0\nn\nnjulia> typeof(m.a)\nnFloat64The fact that the type of m.a is known from m's type–coupled with the fact that its type cannot change mid-function–allows the compiler to generate highly-optimized code for objects like m but not for objects like t.Of course, all of this is true only if we construct m with a concrete type.  We can break this by explicitly constructing it with an abstract type:julia> m = MyType{AbstractFloat}(3.2)\nnMyType{AbstractFloat}(3.2)\nn\nnjulia> typeof(m.a)\nnFloat64\nn\nnjulia> m.a = 4.5f0\nn4.5f0\nn\nnjulia> typeof(m.a)\nnFloat32For all practical purposes, such objects behave identically to those of MyStillAmbiguousType.It's quite instructive to compare the sheer amount code generated for a simple functionfunc(m::MyType) = m.a+1usingcode_llvm(func,(MyType{Float64},))\nncode_llvm(func,(MyType{AbstractFloat},))\nncode_llvm(func,(MyType,))For reasons of length the results are not shown here, but you may wish to try this yourself. Because the type is fully-specified in the first case, the compiler doesn't need to generate any code to resolve the type at run-time.  This results in shorter and faster code."
},

{
    "location": "manual/performance-tips.html#Avoid-fields-with-abstract-containers-1",
    "title": "Avoid fields with abstract containers",
    "category": "Section",
    "text": "The same best practices also work for container types:julia> type MySimpleContainer{A<:AbstractVector}\nn         a::A\nn       end\nn\nnjulia> type MyAmbiguousContainer{T}\nn         a::AbstractVector{T}\nn       endFor example:julia> c = MySimpleContainer(1:3);\nn\nnjulia> typeof(c)\nnMySimpleContainer{UnitRange{Int64}}\nn\nnjulia> c = MySimpleContainer([1:3;]);\nn\nnjulia> typeof(c)\nnMySimpleContainer{Array{Int64,1}}\nn\nnjulia> b = MyAmbiguousContainer(1:3);\nn\nnjulia> typeof(b)\nnMyAmbiguousContainer{Int64}\nn\nnjulia> b = MyAmbiguousContainer([1:3;]);\nn\nnjulia> typeof(b)\nnMyAmbiguousContainer{Int64}For MySimpleContainer, the object is fully-specified by its type and parameters, so the compiler can generate optimized functions. In most instances, this will probably suffice.While the compiler can now do its job perfectly well, there are cases where you might wish that your code could do different things depending on the element type of a.  Usually the best way to achieve this is to wrap your specific operation (here, foo) in a separate function:function sumfoo(c::MySimpleContainer)\nn    s = 0\nnfor x in c.a\nn    s += foo(x)\nnend\nns\nnend\nn\nnfoo(x::Integer) = x\nnfoo(x::AbstractFloat) = round(x)This keeps things simple, while allowing the compiler to generate optimized code in all cases.However, there are cases where you may need to declare different versions of the outer function for different element types of a. You could do it like this:function myfun{T<:AbstractFloat}(c::MySimpleContainer{Vector{T}})\nn    ...\nnend\nnfunction myfun{T<:Integer}(c::MySimpleContainer{Vector{T}})\nn    ...\nnendThis works fine for Vector{T}, but we'd also have to write explicit versions for UnitRange{T} or other abstract types. To prevent such tedium, you can use two parameters in the declaration of MyContainer:type MyContainer{T, A<:AbstractVector}\nn    a::A\nnend\nnMyContainer(v::AbstractVector) = MyContainer{eltype(v), typeof(v)}(v)\nn\nnjulia> b = MyContainer(1.3:5);\nn\nnjulia> typeof(b)\nnMyContainer{Float64,UnitRange{Float64}}Note the somewhat surprising fact that T doesn't appear in the declaration of field a, a point that we'll return to in a moment. With this approach, one can write functions such as:function myfunc{T<:Integer, A<:AbstractArray}(c::MyContainer{T,A})\nn    return c.a[1]+1\nnend\nn# Note: because we can only define MyContainer for\nn# A<:AbstractArray, and any unspecified parameters are arbitrary,\nn# the previous could have been written more succinctly as\nn#     function myfunc{T<:Integer}(c::MyContainer{T})\nn\nnfunction myfunc{T<:AbstractFloat}(c::MyContainer{T})\nn    return c.a[1]+2\nnend\nn\nnfunction myfunc{T<:Integer}(c::MyContainer{T,Vector{T}})\nn    return c.a[1]+3\nnend\nn\nnjulia> myfunc(MyContainer(1:3))\nn2\nn\nnjulia> myfunc(MyContainer(1.0:3))\nn3.0\nn\nnjulia> myfunc(MyContainer([1:3]))\nn4As you can see, with this approach it's possible to specialize on both the element type T and the array type A.However, there's one remaining hole: we haven't enforced that A has element type T, so it's perfectly possible to construct an object like this:julia> b = MyContainer{Int64, UnitRange{Float64}}(1.3:5);\nn\nnjulia> typeof(b)\nnMyContainer{Int64,UnitRange{Float64}}To prevent this, we can add an inner constructor:type MyBetterContainer{T<:Real, A<:AbstractVector}\nn    a::A\nn\nn    MyBetterContainer(v::AbstractVector{T}) = new(v)\nnend\nnMyBetterContainer(v::AbstractVector) = MyBetterContainer{eltype(v),typeof(v)}(v)\nn\nn\nnjulia> b = MyBetterContainer(1.3:5);\nn\nnjulia> typeof(b)\nnMyBetterContainer{Float64,UnitRange{Float64}}\nn\nnjulia> b = MyBetterContainer{Int64, UnitRange{Float64}}(1.3:5);\nnERROR: no method MyBetterContainer(UnitRange{Float64},)The inner constructor requires that the element type of A be T."
},

{
    "location": "manual/performance-tips.html#Annotate-values-taken-from-untyped-locations-1",
    "title": "Annotate values taken from untyped locations",
    "category": "Section",
    "text": "It is often convenient to work with data structures that may contain values of any type (arrays of type Array{Any}). But, if you're using one of these structures and happen to know the type of an element, it helps to share this knowledge with the compiler:function foo(a::Array{Any,1})\nn    x = a[1]::Int32\nn    b = x+1\nn    ...\nnendHere, we happened to know that the first element of a would be an Int32. Making an annotation like this has the added benefit that it will raise a run-time error if the value is not of the expected type, potentially catching certain bugs earlier."
},

{
    "location": "manual/performance-tips.html#Declare-types-of-keyword-arguments-1",
    "title": "Declare types of keyword arguments",
    "category": "Section",
    "text": "Keyword arguments can have declared types:function with_keyword(x; name::Int = 1)\nn    ...\nnendFunctions are specialized on the types of keyword arguments, so these declarations will not affect performance of code inside the function. However, they will reduce the overhead of calls to the function that include keyword arguments.Functions with keyword arguments have near-zero overhead for call sites that pass only positional arguments.Passing dynamic lists of keyword arguments, as in f(x; keywords...), can be slow and should be avoided in performance-sensitive code."
},

{
    "location": "manual/performance-tips.html#Break-functions-into-multiple-definitions-1",
    "title": "Break functions into multiple definitions",
    "category": "Section",
    "text": "Writing a function as many small definitions allows the compiler to directly call the most applicable code, or even inline it.Here is an example of a \"compound function\" that should really be written as multiple definitions:function norm(A)\nn    if isa(A, Vector)\nn        return sqrt(real(dot(A,A)))\nn    elseif isa(A, Matrix)\nn        return max(svd(A)[2])\nn    else\nn        error(\"norm: invalid argument\")\nn    end\nnendThis can be written more concisely and efficiently as:norm(x::Vector) = sqrt(real(dot(x,x)))\nnnorm(A::Matrix) = max(svd(A)[2])"
},

{
    "location": "manual/performance-tips.html#Write-\"type-stable\"-functions-1",
    "title": "Write \"type-stable\" functions",
    "category": "Section",
    "text": "When possible, it helps to ensure that a function always returns a value of the same type. Consider the following definition:pos(x) = x < 0 ? 0 : xAlthough this seems innocent enough, the problem is that 0 is an integer (of type Int) and x might be of any type. Thus, depending on the value of x, this function might return a value of either of two types. This behavior is allowed, and may be desirable in some cases. But it can easily be fixed as follows:pos(x) = x < 0 ? zero(x) : xThere is also a one() function, and a more general oftype(x,y) function, which returns y converted to the type of x."
},

{
    "location": "manual/performance-tips.html#Avoid-changing-the-type-of-a-variable-1",
    "title": "Avoid changing the type of a variable",
    "category": "Section",
    "text": "An analogous \"type-stability\" problem exists for variables used repeatedly within a function:function foo()\nn    x = 1\nn    for i = 1:10\nn        x = x/bar()\nn    end\nn    return x\nnendLocal variable x starts as an integer, and after one loop iteration becomes a floating-point number (the result of / operator). This makes it more difficult for the compiler to optimize the body of the loop. There are several possible fixes:Initialize x with x = 1.0\nnDeclare the type of x: x::Float64 = 1\nnUse an explicit conversion: x = one(T)"
},

{
    "location": "manual/performance-tips.html#Separate-kernel-functions-(aka,-function-barriers)-1",
    "title": "Separate kernel functions (aka, function barriers)",
    "category": "Section",
    "text": "Many functions follow a pattern of performing some set-up work, and then running many iterations to perform a core computation. Where possible, it is a good idea to put these core computations in separate functions. For example, the following contrived function returns an array of a randomly-chosen type:function strange_twos(n)\nn    a = Array(rand(Bool) ? Int64 : Float64, n)\nn    for i = 1:n\nn        a[i] = 2\nn    end\nn    return a\nnendThis should be written as:function fill_twos!(a)\nn    for i=1:length(a)\nn        a[i] = 2\nn    end\nnend\nn\nnfunction strange_twos(n)\nn    a = Array(rand(Bool) ? Int64 : Float64, n)\nn    fill_twos!(a)\nn    return a\nnendJulia's compiler specializes code for argument types at function boundaries, so in the original implementation it does not know the type of a during the loop (since it is chosen randomly). Therefore the second version is generally faster since the inner loop can be recompiled as part of fill_twos! for different types of a.The second form is also often better style and can lead to more code reuse.This pattern is used in several places in the standard library. For example, see hvcat_fill in abstractarray.jl, or the fill! function, which we could have used instead of writing our own fill_twos!.Functions like strange_twos occur when dealing with data of uncertain type, for example data loaded from an input file that might contain either integers, floats, strings, or something else."
},

{
    "location": "manual/performance-tips.html#Types-with-values-as-parameters-1",
    "title": "Types with values-as-parameters",
    "category": "Section",
    "text": "Let's say you want to create an N-dimensional array that has size 3 along each axis.  Such arrays can be created like this:A = fill(5.0, (3, 3))This approach works very well: the compiler can figure out that A is an Array{Float64,2} because it knows the type of the fill value (5.0::Float64) and the dimensionality ((3, 3)::NTuple{2,Int}). This implies that the compiler can generate very efficient code for any future usage of A in the same function.But now let's say you want to write a function that creates a 3×3×... array in arbitrary dimensions; you might be tempted to write a functionfunction array3(fillval, N)\nn    fill(fillval, ntuple(d->3, N))\nnendThis works, but (as you can verify for yourself using @code_warntype array3(5.0, 2)) the problem is that the output type cannot be inferred: the argument N is a value of type Int, and type-inference does not (and cannot) predict its value in advance. This means that code using the output of this function has to be conservative, checking the type on each access of A; such code will be very slow.Now, one very good way to solve such problems is by using the function-barrier technique. However, in some cases you might want to eliminate the type-instability altogether.  In such cases, one approach is to pass the dimensionality as a parameter, for example through Val{T} (see \"Value types\"):function array3{N}(fillval, ::Type{Val{N}})\nn    fill(fillval, ntuple(d->3, Val{N}))\nnendJulia has a specialized version of ntuple that accepts a Val{::Int} as the second parameter; by passing N as a type-parameter, you make its \"value\" known to the compiler. Consequently, this version of array3 allows the compiler to predict the return type.However, making use of such techniques can be surprisingly subtle. For example, it would be of no help if you called array3 from a function like this:function call_array3(fillval, n)\nn    A = array3(fillval, Val{n})\nnendHere, you've created the same problem all over again: the compiler can't guess the type of n, so it doesn't know the type of Val{n}.  Attempting to use Val, but doing so incorrectly, can easily make performance worse in many situations.  (Only in situations where you're effectively combining Val with the function-barrier trick, to make the kernel function more efficient, should code like the above be used.)An example of correct usage of Val would be:function filter3{T,N}(A::AbstractArray{T,N})\nn    kernel = array3(1, Val{N})\nn    filter(A, kernel)\nnendIn this example, N is passed as a parameter, so its \"value\" is known to the compiler.  Essentially, Val{T} works only when T is either hard-coded (Val{3}) or already specified in the type-domain."
},

{
    "location": "manual/performance-tips.html#The-dangers-of-abusing-multiple-dispatch-(aka,-more-on-types-with-values-as-parameters)-1",
    "title": "The dangers of abusing multiple dispatch (aka, more on types with values-as-parameters)",
    "category": "Section",
    "text": "Once one learns to appreciate multiple dispatch, there's an understandable tendency to go crazy and try to use it for everything. For example, you might imagine using it to store information, e.g.immutable Car{Make,Model}\nn    year::Int\nn    ...more fields...\nnendand then dispatch on objects like Car{:Honda,:Accord}(year, args...).This might be worthwhile when the following are true:You require CPU-intensive processing on each Car, and it becomes vastly more efficient if you know the Make and Model at compile time.\nnYou have homogenous lists of the same type of Car to process, so that you can store them all in an Array{Car{:Honda,:Accord},N}.When the latter holds, a function processing such a homogenous array can be productively specialized: Julia knows the type of each element in advance (all objects in the container have the same concrete type), so Julia can \"look up\" the correct method calls when the function is being compiled (obviating the need to check at run-time) and thereby emit efficient code for processing the whole list.When these do not hold, then it's likely that you'll get no benefit; worse, the resulting \"combinatorial explosion of types\" will be counterproductive.  If items[i+1] has a different type than item[i], Julia has to look up the type at run-time, search for the appropriate method in method tables, decide (via type intersection) which one matches, determine whether it has been JIT-compiled yet (and do so if not), and then make the call. In essence, you're asking the full type- system and JIT-compilation machinery to basically execute the equivalent of a switch statement or dictionary lookup in your own code.Some run-time benchmarks comparing (1) type dispatch, (2) dictionary lookup, and (3) a \"switch\" statement can be found on the mailing list.Perhaps even worse than the run-time impact is the compile-time impact: Julia will compile specialized functions for each different Car{Make, Model}; if you have hundreds or thousands of such types, then every function that accepts such an object as a parameter (from a custom get_year function you might write yourself, to the generic push! function in the standard library) will have hundreds or thousands of variants compiled for it.  Each of these increases the size of the cache of compiled code, the length of internal lists of methods, etc.  Excess enthusiasm for values-as-parameters can easily waste enormous resources."
},

{
    "location": "manual/performance-tips.html#Access-arrays-in-memory-order,-along-columns-1",
    "title": "Access arrays in memory order, along columns",
    "category": "Section",
    "text": "Multidimensional arrays in Julia are stored in column-major order. This means that arrays are stacked one column at a time. This can be verified using the vec function or the syntax [:] as shown below (notice that the array is ordered [1 3 2 4], not [1 2 3 4]):julia> x = [1 2; 3 4]\nn2×2 Array{Int64,2}:\nn 1  2\nn 3  4\nn\nnjulia> x[:]\nn4-element Array{Int64,1}:\nn 1\nn 3\nn 2\nn 4This convention for ordering arrays is common in many languages like Fortran, Matlab, and R (to name a few). The alternative to column-major ordering is row-major ordering, which is the convention adopted by C and Python (numpy) among other languages. Remembering the ordering of arrays can have significant performance effects when looping over arrays. A rule of thumb to keep in mind is that with column-major arrays, the first index changes most rapidly. Essentially this means that looping will be faster if the inner-most loop index is the first to appear in a slice expression.Consider the following contrived example. Imagine we wanted to write a function that accepts a Vector and returns a square Matrix with either the rows or the columns filled with copies of the input vector. Assume that it is not important whether rows or columns are filled with these copies (perhaps the rest of the code can be easily adapted accordingly). We could conceivably do this in at least four ways (in addition to the recommended call to the built-in repmat()):function copy_cols{T}(x::Vector{T})\nn    n = size(x, 1)\nn    out = Array{T}(n, n)\nn    for i=1:n\nn        out[:, i] = x\nn    end\nn    out\nnend\nn\nnfunction copy_rows{T}(x::Vector{T})\nn    n = size(x, 1)\nn    out = Array{T}(n, n)\nn    for i=1:n\nn        out[i, :] = x\nn    end\nn    out\nnend\nn\nnfunction copy_col_row{T}(x::Vector{T})\nn    n = size(x, 1)\nn    out = Array{T}(n, n)\nn    for col=1:n, row=1:n\nn        out[row, col] = x[row]\nn    end\nn    out\nnend\nn\nnfunction copy_row_col{T}(x::Vector{T})\nn    n = size(x, 1)\nn    out = Array{T}(n, n)\nn    for row=1:n, col=1:n\nn        out[row, col] = x[col]\nn    end\nn    out\nnendNow we will time each of these functions using the same random 10000 by 1 input vector:julia> x = randn(10000);\nn\nnjulia> fmt(f) = println(rpad(string(f)*\": \", 14, ' '), @elapsed f(x))\nn\nnjulia> map(fmt, Any[copy_cols, copy_rows, copy_col_row, copy_row_col]);\nncopy_cols:    0.331706323\nncopy_rows:    1.799009911\nncopy_col_row: 0.415630047\nncopy_row_col: 1.721531501Notice that copy_cols is much faster than copy_rows. This is expected because copy_cols respects the column-based memory layout of the Matrix and fills it one column at a time. Additionally, copy_col_row is much faster than copy_row_col because it follows our rule of thumb that the first element to appear in a slice expression should be coupled with the inner-most loop."
},

{
    "location": "manual/performance-tips.html#Pre-allocating-outputs-1",
    "title": "Pre-allocating outputs",
    "category": "Section",
    "text": "If your function returns an Array or some other complex type, it may have to allocate memory.  Unfortunately, oftentimes allocation and its converse, garbage collection, are substantial bottlenecks.Sometimes you can circumvent the need to allocate memory on each function call by preallocating the output.  As a trivial example, comparefunction xinc(x)\nn    return [x, x+1, x+2]\nnend\nn\nnfunction loopinc()\nn    y = 0\nn    for i = 1:10^7\nn        ret = xinc(i)\nn        y += ret[2]\nn    end\nn    y\nnendwithfunction xinc!{T}(ret::AbstractVector{T}, x::T)\nn    ret[1] = x\nn    ret[2] = x+1\nn    ret[3] = x+2\nn    nothing\nnend\nn\nnfunction loopinc_prealloc()\nn    ret = Array{Int}(3)\nn    y = 0\nn    for i = 1:10^7\nn        xinc!(ret, i)\nn        y += ret[2]\nn    end\nn    y\nnendTiming results:julia> @time loopinc()\nnelapsed time: 1.955026528 seconds (1279975584 bytes allocated)\nn50000015000000\nn\nnjulia> @time loopinc_prealloc()\nnelapsed time: 0.078639163 seconds (144 bytes allocated)\nn50000015000000Preallocation has other advantages, for example by allowing the caller to control the \"output\" type from an algorithm.  In the example above, we could have passed a SubArray rather than an Array, had we so desired.Taken to its extreme, pre-allocation can make your code uglier, so performance measurements and some judgment may be required.   However, for \"vectorized\" (element-wise) functions, the convenient syntax x .= f.(y) can be used for in-place operations with fused loops and no temporary arrays (dot-vectorizing)."
},

{
    "location": "manual/performance-tips.html#Avoid-string-interpolation-for-I/O-1",
    "title": "Avoid string interpolation for I/O",
    "category": "Section",
    "text": "When writing data to a file (or other I/O device), forming extra intermediate strings is a source of overhead. Instead of:println(file, \"$a $b\")use:println(file, a, \" \", b)The first version of the code forms a string, then writes it to the file, while the second version writes values directly to the file. Also notice that in some cases string interpolation can be harder to read. Consider:println(file, \"$(f(a))$(f(b))\")versus:println(file, f(a), f(b))"
},

{
    "location": "manual/performance-tips.html#Optimize-network-I/O-during-parallel-execution-1",
    "title": "Optimize network I/O during parallel execution",
    "category": "Section",
    "text": "When executing a remote function in parallel:responses = Vector{Any}(nworkers())\nn@sync begin\nn    for (idx, pid) in enumerate(workers())\nn        @async responses[idx] = remotecall_fetch(pid, foo, args...)\nn    end\nnendis faster than:refs = Vector{Any}(nworkers())\nnfor (idx, pid) in enumerate(workers())\nn    refs[idx] = @spawnat pid foo(args...)\nnend\nnresponses = [fetch(r) for r in refs]The former results in a single network round-trip to every worker, while the latter results in two network calls - first by the @spawnat and the second due to the fetch (or even a wait). The fetch/wait is also being executed serially resulting in an overall poorer performance."
},

{
    "location": "manual/performance-tips.html#Fix-deprecation-warnings-1",
    "title": "Fix deprecation warnings",
    "category": "Section",
    "text": "A deprecated function internally performs a lookup in order to print a relevant warning only once. This extra lookup can cause a significant slowdown, so all uses of deprecated functions should be modified as suggested by the warnings."
},

{
    "location": "manual/performance-tips.html#Tweaks-1",
    "title": "Tweaks",
    "category": "Section",
    "text": "These are some minor points that might help in tight inner loops.Avoid unnecessary arrays. For example, instead of sum([x,y,z]) use x+y+z.\nnUse abs2(z) instead of abs(z)^2 for complex z. In general, try to rewrite code to use abs2() instead of abs() for complex arguments.\nnUse div(x,y) for truncating division of integers instead of trunc(x/y), fld(x,y) instead of floor(x/y), and cld(x,y) instead of ceil(x/y)."
},

{
    "location": "manual/performance-tips.html#Performance-Annotations-1",
    "title": "Performance Annotations",
    "category": "Section",
    "text": "Sometimes you can enable better optimization by promising certain program properties.Use @inbounds to eliminate array bounds checking within expressions. Be certain before doing this. If the subscripts are ever out of bounds, you may suffer crashes or silent corruption.\nnUse @fastmath to allow floating point optimizations that are correct for real numbers, but lead to differences for IEEE numbers. Be careful when doing this, as this may change numerical results. This corresponds to the -ffast-math option of clang.\nnWrite @simd in front of for loops that are amenable to vectorization. This feature is experimental and could change or disappear in future versions of Julia.Note: While @simd needs to be placed directly in front of a loop, both @inbounds and @fastmath can be applied to several statements at once, e.g. using begin ... end, or even to a whole function.Here is an example with both @inbounds and @simd markup:function inner( x, y )\nn    s = zero(eltype(x))\nn    for i=1:length(x)\nn        @inbounds s += x[i]*y[i]\nn    end\nn    s\nnend\nn\nnfunction innersimd( x, y )\nn    s = zero(eltype(x))\nn    @simd for i=1:length(x)\nn        @inbounds s += x[i]*y[i]\nn    end\nn    s\nnend\nn\nnfunction timeit( n, reps )\nn    x = rand(Float32,n)\nn    y = rand(Float32,n)\nn    s = zero(Float64)\nn    time = @elapsed for j in 1:reps\nn        s+=inner(x,y)\nn    end\nn    println(\"GFlop        = \",2.0*n*reps/time*1E-9)\nn    time = @elapsed for j in 1:reps\nn        s+=innersimd(x,y)\nn    end\nn    println(\"GFlop (SIMD) = \",2.0*n*reps/time*1E-9)\nnend\nn\nntimeit(1000,1000)On a computer with a 2.4GHz Intel Core i5 processor, this produces:GFlop        = 1.9467069505224963\nnGFlop (SIMD) = 17.578554163920018The range for a @simd for loop should be a one-dimensional range. A variable used for accumulating, such as s in the example, is called a reduction variable. By using @simd, you are asserting several properties of the loop:It is safe to execute iterations in arbitrary or overlapping order, with special consideration for reduction variables.\nnFloating-point operations on reduction variables can be reordered, possibly causing different results than without @simd.\nnNo iteration ever waits on another iteration to make forward progress.A loop containing break, continue, or @goto will cause a compile-time error.Using @simd merely gives the compiler license to vectorize. Whether it actually does so depends on the compiler. To actually benefit from the current implementation, your loop should have the following additional properties:The loop must be an innermost loop.\nnThe loop body must be straight-line code. This is why @inbounds is currently needed for all array accesses. The compiler can sometimes turn short &&, ||, and ?: expressions into straight-line code, if it is safe to evaluate all operands unconditionally. Consider using ifelse() instead of ?: in the loop if it is safe to do so.\nnAccesses must have a stride pattern and cannot be \"gathers\" (random-index reads) or \"scatters\" (random-index writes).\nnThe stride should be unit stride.\nnIn some simple cases, for example with 2-3 arrays accessed in a loop, the LLVM auto-vectorization may kick in automatically, leading to no further speedup with @simd.Here is an example with all three kinds of markup. This program first calculates the finite difference of a one-dimensional array, and then evaluates the L2-norm of the result:function init!(u)\nn    n = length(u)\nn    dx = 1.0 / (n-1)\nn    @fastmath @inbounds @simd for i in 1:n\nn        u[i] = sin(2pi*dx*i)\nn    end\nnend\nn\nnfunction deriv!(u, du)\nn    n = length(u)\nn    dx = 1.0 / (n-1)\nn    @fastmath @inbounds du[1] = (u[2] - u[1]) / dx\nn    @fastmath @inbounds @simd for i in 2:n-1\nn        du[i] = (u[i+1] - u[i-1]) / (2*dx)\nn    end\nn    @fastmath @inbounds du[n] = (u[n] - u[n-1]) / dx\nnend\nn\nnfunction norm(u)\nn    n = length(u)\nn    T = eltype(u)\nn    s = zero(T)\nn    @fastmath @inbounds @simd for i in 1:n\nn        s += u[i]^2\nn    end\nn    @fastmath @inbounds return sqrt(s/n)\nnend\nn\nnfunction main()\nn    n = 2000\nn    u = Array{Float64}(n)\nn    init!(u)\nn    du = similar(u)\nn\nn    deriv!(u, du)\nn    nu = norm(du)\nn\nn    @time for i in 1:10^6\nn        deriv!(u, du)\nn        nu = norm(du)\nn    end\nn\nn    println(nu)\nnend\nn\nnmain()On a computer with a 2.7 GHz Intel Core i7 processor, this produces:$ julia wave.jl\nnelapsed time: 1.207814709 seconds (0 bytes allocated)\nn4.443986180758243\nn\nn$ julia --math-mode=ieee wave.jl\nnelapsed time: 4.487083643 seconds (0 bytes allocated)\nn4.443986180758243Here, the option --math-mode=ieee disables the @fastmath macro, so that we can compare results.In this case, the speedup due to @fastmath is a factor of about 3.7. This is unusually large – in general, the speedup will be smaller. (In this particular example, the working set of the benchmark is small enough to fit into the L1 cache of the processor, so that memory access latency does not play a role, and computing time is dominated by CPU usage. In many real world programs this is not the case.) Also, in this case this optimization does not change the result – in general, the result will be slightly different. In some cases, especially for numerically unstable algorithms, the result can be very different.The annotation @fastmath re-arranges floating point expressions, e.g. changing the order of evaluation, or assuming that certain special cases (inf, nan) cannot occur. In this case (and on this particular computer), the main difference is that the expression 1 / (2*dx) in the function deriv is hoisted out of the loop (i.e. calculated outside the loop), as if one had written idx = 1 / (2*dx). In the loop, the expression ... / (2*dx) then becomes ... * idx, which is much faster to evaluate. Of course, both the actual optimization that is applied by the compiler as well as the resulting speedup depend very much on the hardware. You can examine the change in generated code by using Julia's code_native() function."
},

{
    "location": "manual/performance-tips.html#Treat-Subnormal-Numbers-as-Zeros-1",
    "title": "Treat Subnormal Numbers as Zeros",
    "category": "Section",
    "text": "Subnormal numbers, formerly called denormal numbers, are useful in many contexts, but incur a performance penalty on some hardware. A call set_zero_subnormals(true) grants permission for floating-point operations to treat subnormal inputs or outputs as zeros, which may improve performance on some hardware. A call set_zero_subnormals(false) enforces strict IEEE behavior for subnormal numbers.Below is an example where subnormals noticeably impact performance on some hardware:function timestep{T}( b::Vector{T}, a::Vector{T}, Δt::T )\nn    @assert length(a)==length(b)\nn    n = length(b)\nn    b[1] = 1                            # Boundary condition\nn    for i=2:n-1\nn        b[i] = a[i] + (a[i-1] - T(2)*a[i] + a[i+1]) * Δt\nn    end\nn    b[n] = 0                            # Boundary condition\nnend\nn\nnfunction heatflow{T}( a::Vector{T}, nstep::Integer )\nn    b = similar(a)\nn    for t=1:div(nstep,2)                # Assume nstep is even\nn        timestep(b,a,T(0.1))\nn        timestep(a,b,T(0.1))\nn    end\nnend\nn\nnheatflow(zeros(Float32,10),2)           # Force compilation\nnfor trial=1:6\nn    a = zeros(Float32,1000)\nn    set_zero_subnormals(iseven(trial))  # Odd trials use strict IEEE arithmetic\nn    @time heatflow(a,1000)\nnendThis example generates many subnormal numbers because the values in a become an exponentially decreasing curve, which slowly flattens out over time.Treating subnormals as zeros should be used with caution, because doing so breaks some identities, such as x-y==0 implies x==y:julia> x=3f-38; y=2f-38;\nn\nnjulia> set_zero_subnormals(false); (x-y,x==y)\nn(1.0000001f-38,false)\nn\nnjulia> set_zero_subnormals(true); (x-y,x==y)\nn(0.0f0,false)In some applications, an alternative to zeroing subnormal numbers is to inject a tiny bit of noise.  For example, instead of initializing a with zeros, initialize it with:a = rand(Float32,1000) * 1.f-9"
},

{
    "location": "manual/profile.html",
    "title": "Profiling",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/profile.html#Profiling-1",
    "title": "Profiling",
    "category": "Section",
    "text": "The Profile module provides tools to help developers improve the performance of their code. When used, it takes measurements on running code, and produces output that helps you understand how much time is spent on individual line(s).  The most common usage is to identify \"bottlenecks\" as targets for optimization.Profile implements what is known as a \"sampling\" or statistical profiler.  It works by periodically taking a backtrace during the execution of any task. Each backtrace captures the currently-running function and line number, plus the complete chain of function calls that led to this line, and hence is a \"snapshot\" of the current state of execution.If much of your run time is spent executing a particular line of code, this line will show up frequently in the set of all backtraces.  In other words, the \"cost\" of a given line–or really, the cost of the sequence of function calls up to and including this line–is proportional to how often it appears in the set of all backtraces.A sampling profiler does not provide complete line-by-line coverage, because the backtraces occur at intervals (by default, 1 ms on Unix systems and 10 ms on Windows, although the actual scheduling is subject to operating system load). Moreover, as discussed further below, because samples are collected at a sparse subset of all execution points, the data collected by a sampling profiler is subject to statistical noise.Despite these limitations, sampling profilers have substantial strengths:You do not have to make any modifications to your code to take timing measurements (in contrast to the alternative instrumenting profiler).\nnIt can profile into Julia's core code and even (optionally) into C and Fortran libraries.\nnBy running \"infrequently\" there is very little performance overhead; while profiling, your code can run at nearly native speed.For these reasons, it's recommended that you try using the built-in sampling profiler before considering any alternatives."
},

{
    "location": "manual/profile.html#Basic-usage-1",
    "title": "Basic usage",
    "category": "Section",
    "text": "Let's work with a simple test case:function myfunc()\nn    A = rand(100, 100, 200)\nn    maximum(A)\nnendIt's a good idea to first run the code you intend to profile at least once (unless you want to profile Julia's JIT-compiler):julia> myfunc()  # run once to force compilationNow we're ready to profile this function:julia> @profile myfunc()To see the profiling results, there is a graphical browser available, but here we'll use the text-based display that comes with the standard library:julia> Profile.print()\nn      23 client.jl; _start; line: 373\nn        23 client.jl; run_repl; line: 166\nn           23 client.jl; eval_user_input; line: 91\nn              23 profile.jl; anonymous; line: 14\nn                 8  none; myfunc; line: 2\nn                  8 dSFMT.jl; dsfmt_gv_fill_array_close_open!; line: 128\nn                 15 none; myfunc; line: 3\nn                  2  reduce.jl; max; line: 35\nn                  2  reduce.jl; max; line: 36\nn                  11 reduce.jl; max; line: 37Each line of this display represents a particular spot (line number) in the code.  Indentation is used to indicate the nested sequence of function calls, with more-indented lines being deeper in the sequence of calls.  In each line, the first \"field\" indicates the number of backtraces (samples) taken at this line or in any functions executed by this line. The second field is the file name, followed by a semicolon; the third is the function name followed by a semicolon, and the fourth is the line number.  Note that the specific line numbers may change as Julia's code changes; if you want to follow along, it's best to run this example yourself.In this example, we can see that the top level is client.jl's _start function. This is the first Julia function that gets called when you launch Julia.  If you examine line 373 of client.jl, you'll see that (at the time of this writing) it calls run_repl(), mentioned on the second line. This in turn calls eval_user_input(). These are the functions in client.jl that interpret what you type at the REPL, and since we're working interactively these functions were invoked when we entered @profile myfunc().  The next line reflects actions taken in the @profile macro.The first line shows that 23 backtraces were taken at line 373 of client.jl, but it's not that this line was \"expensive\" on its own: the second line reveals that all 23 of these backtraces were actually triggered inside its call to run_repl, and so on. To find out which operations are actually taking the time, we need to look deeper in the call chain.The first \"important\" line in this output is this one:8  none; myfunc; line: 2none refers to the fact that we defined myfunc in the REPL, rather than putting it in a file; if we had used a file, this would show the file name. Line 2 of myfunc() contains the call to rand, and there were 8 (out of 23) backtraces that occurred at this line. Below that, you can see a call to dsfmt_gv_fill_array_close_open!() inside dSFMT.jl. You might be surprised not to see the rand function listed explicitly: that's because rand is inlined, and hence doesn't appear in the backtraces.A little further down, you see:15 none; myfunc; line: 3Line 3 of myfunc contains the call to max, and there were 15 (out of 23) backtraces taken here. Below that, you can see the specific places in base/reduce.jl that carry out the time-consuming operations in the max function for this type of input data.Overall, we can tentatively conclude that finding the maximum element is approximately twice as expensive as generating the random numbers. We could increase our confidence in this result by collecting more samples:julia> @profile (for i = 1:100; myfunc(); end)\nn\nnjulia> Profile.print()\nn       3121 client.jl; _start; line: 373\nn        3121 client.jl; run_repl; line: 166\nn           3121 client.jl; eval_user_input; line: 91\nn              3121 profile.jl; anonymous; line: 1\nn                 848  none; myfunc; line: 2\nn                  842 dSFMT.jl; dsfmt_gv_fill_array_close_open!; line: 128\nn                 1510 none; myfunc; line: 3\nn                  74   reduce.jl; max; line: 35\nn                  122  reduce.jl; max; line: 36\nn                  1314 reduce.jl; max; line: 37In general, if you have N samples collected at a line, you can expect an uncertainty on the order of sqrt(N) (barring other sources of noise, like how busy the computer is with other tasks). The major exception to this rule is garbage collection, which runs infrequently but tends to be quite expensive. (Since Julia's garbage collector is written in C, such events can be detected using the C=true output mode described below, or by using ProfileView.jl.)This illustrates the default \"tree\" dump; an alternative is the \"flat\" dump, which accumulates counts independent of their nesting:julia> Profile.print(format=:flat)\nn Count File         Function                         Line\nn  3121 client.jl    _start                            373\nn  3121 client.jl    eval_user_input                    91\nn  3121 client.jl    run_repl                          166\nn   842 dSFMT.jl     dsfmt_gv_fill_array_close_open!   128\nn   848 none         myfunc                              2\nn  1510 none         myfunc                              3\nn  3121 profile.jl   anonymous                           1\nn    74 reduce.jl    max                                35\nn   122 reduce.jl    max                                36\nn  1314 reduce.jl    max                                37If your code has recursion, one potentially-confusing point is that a line in a \"child\" function can accumulate more counts than there are total backtraces. Consider the following function definitions:dumbsum(n::Integer) = n == 1 ? 1 : 1 + dumbsum(n-1)\nndumbsum3() = dumbsum(3)If you were to profile dumbsum3, and a backtrace was taken while it was executing dumbsum(1), the backtrace would look like this:dumbsum3\nn    dumbsum(3)\nn        dumbsum(2)\nn            dumbsum(1)Consequently, this child function gets 3 counts, even though the parent only gets one.  The \"tree\" representation makes this much clearer, and for this reason (among others) is probably the most useful way to view the results."
},

{
    "location": "manual/profile.html#Accumulation-and-clearing-1",
    "title": "Accumulation and clearing",
    "category": "Section",
    "text": "Results from @profile accumulate in a buffer; if you run multiple pieces of code under @profile, then Profile.print() will show you the combined results. This can be very useful, but sometimes you want to start fresh; you can do so with Profile.clear()."
},

{
    "location": "manual/profile.html#Options-for-controlling-the-display-of-profile-results-1",
    "title": "Options for controlling the display of profile results",
    "category": "Section",
    "text": "Profile.print() has more options than we've described so far. Let's see the full declaration:function print(io::IO = STDOUT, data = fetch(); format = :tree, C = false, combine = true, cols = tty_cols(), maxdepth = typemax(Int), sortedby = :filefuncline)Let's discuss these arguments in order:The first argument allows you to save the results to a file, but the default is to print to STDOUT (the console).\nnThe second argument contains the data you want to analyze; by default that is obtained from Profile.fetch(), which pulls out the backtraces from a pre-allocated buffer. For example, if you want to profile the profiler, you could say:\nndata = copy(Profile.fetch())\nnProfile.clear()\nn@profile Profile.print(STDOUT, data) # Prints the previous results\nnProfile.print()                      # Prints results from Profile.print()\nnThe first keyword argument, format, was introduced above. The possible choices are :tree and :flat.\nnC, if set to true, allows you to see even the calls to C code.  Try running the introductory example with Profile.print(C = true). This can be extremely helpful in deciding whether it's Julia code or C code that is causing a bottleneck; setting C=true also improves the interpretability of the nesting, at the cost of longer profile dumps.\nnSome lines of code contain multiple operations; for example, s += A[i] contains both an array reference (A[i]) and a sum operation.  These correspond to different lines in the generated machine code, and hence there may be two or more different addresses captured during backtraces on this line.  combine=true lumps them together, and is probably what you typically want, but you can generate an output separately for each unique instruction pointer with combine=false.\nncols allows you to control the number of columns that you are willing to use for display.  When the text would be wider than the display, you might see output like this:\nn33 inference.jl; abstract_call; line: 645\nn  33 inference.jl; abstract_call; line: 645\nn    33 ...rence.jl; abstract_call_gf; line: 567\nn       33 ...nce.jl; typeinf; line: 1201\nn     +1 5  ...nce.jl; ...t_interpret; line: 900\nn     +3 5 ...ence.jl; abstract_eval; line: 758\nn     +4 5 ...ence.jl; ...ct_eval_call; line: 733\nn     +6 5 ...ence.jl; abstract_call; line: 645\nnFile/function names are sometimes truncated (with ...), and indentation is truncated with a +n at the beginning, where n is the number of extra spaces that would have been inserted, had there been room. If you want a complete profile of deeply-nested code, often a good idea is to save to a file and use a very wide cols setting:\nns = open(\"/tmp/prof.txt\",\"w\")\nnProfile.print(s,cols = 500)\nnclose(s)\nnmaxdepth can be used to limit the size of the output in :tree format (it nests only up to level maxdepth)\nnsortedby = :count sorts the :flat format in order of increasing counts"
},

{
    "location": "manual/profile.html#Configuration-1",
    "title": "Configuration",
    "category": "Section",
    "text": "@profile just accumulates backtraces, and the analysis happens when you call Profile.print(). For a long-running computation, it's entirely possible that the pre-allocated buffer for storing backtraces will be filled. If that happens, the backtraces stop but your computation continues. As a consequence, you may miss some important profiling data (you will get a warning when that happens).You can obtain and configure the relevant parameters this way:Profile.init()            # returns the current settings\nnProfile.init(n, delay)\nnProfile.init(delay = 0.01)n is the total number of instruction pointers you can store, with a default value of 10^6. If your typical backtrace is 20 instruction pointers, then you can collect 50000 backtraces, which suggests a statistical uncertainty of less than 1%. This may be good enough for most applications.Consequently, you are more likely to need to modify delay, expressed in seconds, which sets the amount of time that Julia gets between snapshots to perform the requested computations. A very long-running job might not need frequent backtraces. The default setting is delay = 0.001.  Of course, you can decrease the delay as well as increase it; however, the overhead of profiling grows once the delay becomes similar to the amount of time needed to take a backtrace (~30 microseconds on the author's laptop)."
},

{
    "location": "manual/running-external-programs.html",
    "title": "Running External Programs",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/running-external-programs.html#Running-External-Programs-1",
    "title": "Running External Programs",
    "category": "Section",
    "text": "Julia borrows backtick notation for commands from the shell, Perl, and Ruby. However, in Julia, writingjulia> `echo hello`\nn`echo hello`differs in several aspects from the behavior in various shells, Perl, or Ruby:Instead of immediately running the command, backticks create a Cmd object to represent the command. You can use this object to connect the command to others via pipes, run it, and read or write to it.\nnWhen the command is run, Julia does not capture its output unless you specifically arrange for it to. Instead, the output of the command by default goes to STDOUT as it would using libc's system call.\nnThe command is never run with a shell. Instead, Julia parses the command syntax directly, appropriately interpolating variables and splitting on words as the shell would, respecting shell quoting syntax. The command is run as julia's immediate child process, using fork and exec calls.Here's a simple example of running an external program:julia> run(`echo hello`)\nnhelloThe hello is the output of the echo command, sent to STDOUT. The run method itself returns nothing, and throws an ErrorException if the external command fails to run successfully.If you want to read the output of the external command, readstring() can be used instead:julia> a=readstring(`echo hello`)\nn\"hello\n\"\nn\nnjulia> (chomp(a)) == \"hello\"\nntrueMore generally, you can use open() to read from or write to an external command.julia> open(`less`, \"w\", STDOUT) do io\nn           for i = 1:3\nn               println(io, i)\nn           end\nn       end\nn1\nn2\nn3"
},

{
    "location": "manual/running-external-programs.html#Interpolation-1",
    "title": "Interpolation",
    "category": "Section",
    "text": "Suppose you want to do something a bit more complicated and use the name of a file in the variable file as an argument to a command. You can use $ for interpolation much as you would in a string literal (see Strings):julia> file = \"/etc/passwd\"\nn\"/etc/passwd\"\nn\nnjulia> `sort $file`\nn`sort /etc/passwd`A common pitfall when running external programs via a shell is that if a file name contains characters that are special to the shell, they may cause undesirable behavior. Suppose, for example, rather than /etc/passwd, we wanted to sort the contents of the file /Volumes/External HD/data.csv. Let's try it:julia> file = \"/Volumes/External HD/data.csv\"\nn\"/Volumes/External HD/data.csv\"\nn\nnjulia> `sort $file`\nn`sort '/Volumes/External HD/data.csv'`How did the file name get quoted? Julia knows that file is meant to be interpolated as a single argument, so it quotes the word for you. Actually, that is not quite accurate: the value of file is never interpreted by a shell, so there's no need for actual quoting; the quotes are inserted only for presentation to the user. This will even work if you interpolate a value as part of a shell word:julia> path = \"/Volumes/External HD\"\nn\"/Volumes/External HD\"\nn\nnjulia> name = \"data\"\nn\"data\"\nn\nnjulia> ext = \"csv\"\nn\"csv\"\nn\nnjulia> `sort $path/$name.$ext`\nn`sort '/Volumes/External HD/data.csv'`As you can see, the space in the path variable is appropriately escaped. But what if you want to interpolate multiple words? In that case, just use an array (or any other iterable container):julia> files = [\"/etc/passwd\",\"/Volumes/External HD/data.csv\"]\nn2-element Array{String,1}:\nn \"/etc/passwd\"\nn \"/Volumes/External HD/data.csv\"\nn\nn\nnjulia> `grep foo $files`\nn`grep foo /etc/passwd '/Volumes/External HD/data.csv'`If you interpolate an array as part of a shell word, Julia emulates the shell's {a,b,c} argument generation:julia> names = [\"foo\",\"bar\",\"baz\"]\nn3-element Array{String,1}:\nn \"foo\"\nn \"bar\"\nn \"baz\"\nn\nnjulia> `grep xylophone $names.txt`\nn`grep xylophone foo.txt bar.txt baz.txt`Moreover, if you interpolate multiple arrays into the same word, the shell's Cartesian product generation behavior is emulated:julia> names = [\"foo\",\"bar\",\"baz\"]\nn3-element Array{String,1}:\nn \"foo\"\nn \"bar\"\nn \"baz\"\nn\nnjulia> exts = [\"aux\",\"log\"]\nn2-element Array{String,1}:\nn \"aux\"\nn \"log\"\nn\nnjulia> `rm -f $names.$exts`\nn`rm -f foo.aux foo.log bar.aux bar.log baz.aux baz.log`Since you can interpolate literal arrays, you can use this generative functionality without needing to create temporary array objects first:julia> `rm -rf $[\"foo\",\"bar\",\"baz\",\"qux\"].$[\"aux\",\"log\",\"pdf\"]`\nn`rm -rf foo.aux foo.log foo.pdf bar.aux bar.log bar.pdf baz.aux baz.log baz.pdf qux.aux qux.log qux.pdf`"
},

{
    "location": "manual/running-external-programs.html#Quoting-1",
    "title": "Quoting",
    "category": "Section",
    "text": "Inevitably, one wants to write commands that aren't quite so simple, and it becomes necessary to use quotes. Here's a simple example of a Perl one-liner at a shell prompt:sh$ perl -le '$|=1; for (0..3) { print }'\nn0\nn1\nn2\nn3The Perl expression needs to be in single quotes for two reasons: so that spaces don't break the expression into multiple shell words, and so that uses of Perl variables like $| (yes, that's the name of a variable in Perl), don't cause interpolation. In other instances, you may want to use double quotes so that interpolation does occur:sh$ first=\"A\"\nnsh$ second=\"B\"\nnsh$ perl -le '$|=1; print for @ARGV' \"1: $first\" \"2: $second\"\nn1: A\nn2: BIn general, the Julia backtick syntax is carefully designed so that you can just cut-and-paste shell commands as is into backticks and they will work: the escaping, quoting, and interpolation behaviors are the same as the shell's. The only difference is that the interpolation is integrated and aware of Julia's notion of what is a single string value, and what is a container for multiple values. Let's try the above two examples in Julia:julia> `perl -le '$|=1; for (0..3) { print }'`\nn`perl -le '$|=1; for (0..3) { print }'`\nn\nnjulia> run(ans)\nn0\nn1\nn2\nn3\nn\nnjulia> first = \"A\"; second = \"B\";\nn\nnjulia> `perl -le 'print for @ARGV' \"1: $first\" \"2: $second\"`\nn`perl -le 'print for @ARGV' '1: A' '2: B'`\nn\nnjulia> run(ans)\nn1: A\nn2: BThe results are identical, and Julia's interpolation behavior mimics the shell's with some improvements due to the fact that Julia supports first-class iterable objects while most shells use strings split on spaces for this, which introduces ambiguities. When trying to port shell commands to Julia, try cut and pasting first. Since Julia shows commands to you before running them, you can easily and safely just examine its interpretation without doing any damage."
},

{
    "location": "manual/running-external-programs.html#Pipelines-1",
    "title": "Pipelines",
    "category": "Section",
    "text": "Shell metacharacters, such as |, &, and >, are not special inside of Julia's backticks: unlike in the shell, inside of Julia's backticks, a pipe is always just a pipe:julia> run(`echo hello | sort`)\nnhello | sortThis expression invokes the echo command with three words as arguments: \"hello\", \"|\", and \"sort\". The result is that a single line is printed: \"hello | sort\". Inside of backticks, a \"|\" is just a literal pipe character. How, then, does one construct a pipeline? Instead of using \"|\" inside of backticks, one uses pipeline():julia> run(pipeline(`echo hello`, `sort`))\nnhelloThis pipes the output of the echo command to the sort command. Of course, this isn't terribly interesting since there's only one line to sort, but we can certainly do much more interesting things:julia> run(pipeline(`cut -d: -f3 /etc/passwd`, `sort -n`, `tail -n5`))\nn210\nn211\nn212\nn213\nn214This prints the highest five user IDs on a UNIX system. The cut, sort and tail commands are all spawned as immediate children of the current julia process, with no intervening shell process. Julia itself does the work to setup pipes and connect file descriptors that is normally done by the shell. Since Julia does this itself, it retains better control and can do some things that shells cannot.Julia can run multiple commands in parallel:julia> run(`echo hello` & `echo world`)\nnworld\nnhelloThe order of the output here is non-deterministic because the two echo processes are started nearly simultaneously, and race to make the first write to the STDOUT descriptor they share with each other and the julia parent process. Julia lets you pipe the output from both of these processes to another program:julia> run(pipeline(`echo world` & `echo hello`, `sort`))\nnhello\nnworldIn terms of UNIX plumbing, what's happening here is that a single UNIX pipe object is created and written to by both echo processes, and the other end of the pipe is read from by the sort command.IO redirection can be accomplished by passing keyword arguments stdin, stdout, and stderr to the pipeline function:pipeline(`do_work`, stdout=pipeline(`sort`, \"out.txt\"), stderr=\"errs.txt\")"
},

{
    "location": "manual/running-external-programs.html#Avoiding-Deadlock-in-Pipelines-1",
    "title": "Avoiding Deadlock in Pipelines",
    "category": "Section",
    "text": "When reading and writing to both ends of a pipeline from a single process, it is important to avoid forcing the kernel to buffer all of the data.For example, when reading all of the output from a command, call readstring(out), not wait(process), since the former will actively consume all of the data written by the process, whereas the latter will attempt to store the data in the kernel's buffers while waiting for a reader to be connected.Another common solution is to separate the reader and writer of the pipeline into separate Tasks:writer = @async writeall(process, \"data\")\nnreader = @async do_compute(readstring(process))\nnwait(process)\nnfetch(reader)"
},

{
    "location": "manual/stacktraces.html",
    "title": "Stack Traces",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/stacktraces.html#Stack-Traces-1",
    "title": "Stack Traces",
    "category": "Section",
    "text": "The StackTraces module provides simple stack traces that are both human readable and easy to use programmatically."
},

{
    "location": "manual/stacktraces.html#Viewing-a-stack-trace-1",
    "title": "Viewing a stack trace",
    "category": "Section",
    "text": "The primary function used to obtain a stack trace is stacktrace():julia> stacktrace()\nn3-element Array{StackFrame,1}:\nn eval at boot.jl:265\nn [inlined code from REPL.jl:3] eval_user_input at REPL.jl:62\nn [inlined code from REPL.jl:92] anonymous at task.jl:63Calling stacktrace() returns a vector of StackFrame s. For ease of use, the alias StackTrace can be used in place of Vector{StackFrame}. (Examples with ... indicate that output may vary depending on how the code is run.)julia> example() = stacktrace()\nnexample (generic function with 1 method)\nn\nnjulia> example()\nn6-element Array{StackFrame,1}:\nn  in example() at none:1\nn  in eval(::Module, ::Any) at boot.jl:234\nn  in eval_user_input(::Any, ::Bool) at client.jl:117\nn  in eval(::Module, ::Any) at boot.jl:234\nn  in eval_user_input(::Any, ::Bool) at client.jl:117\nn  in _start() at client.jl:355\nn\nnjulia> @noinline child() = stacktrace()\nnchild (generic function with 1 method)\nn\nnjulia> @noinline parent() = child()\nnparent (generic function with 1 method)\nn\nnjulia> grandparent() = parent()\nngrandparent (generic function with 1 method)\nn\nnjulia> grandparent()\nn8-element Array{StackFrame,1}:\nn  in child() at none:1\nn  in parent() at none:1\nn  in grandparent() at none:1\nn  ...Note that when calling stacktrace() you'll typically see a frame with eval(...) at boot.jl. When calling stacktrace() from the REPL you'll also have a few extra frames in the stack from REPL.jl, usually looking something like this:julia> example() = stacktrace()\nnexample (generic function with 1 method)\nn\nnjulia> example()\nn5-element Array{StackFrame,1}:\nn  in example() at REPL[1]:1\nn  in eval(::Module, ::Any) at boot.jl:234\nn  in eval_user_input(::Any, ::Base.REPL.REPLBackend) at REPL.jl:62\nn  in macro expansion at REPL.jl:92 [inlined]\nn  in (::Base.REPL.##1#2{Base.REPL.REPLBackend})() at event.jl:46"
},

{
    "location": "manual/stacktraces.html#Extracting-useful-information-1",
    "title": "Extracting useful information",
    "category": "Section",
    "text": "Each StackFrame contains the function name, file name, line number, lambda info, a flag indicating whether the frame has been inlined, a flag indicating whether it is a C function (by default C functions do not appear in the stack trace), and an integer representation of the pointer returned by backtrace():julia> top_frame = stacktrace()[1]\nn in eval(::Module, ::Any) at boot.jl:234\nn\nnjulia> top_frame.func\nn:eval\nn\nnjulia> top_frame.file\nnSymbol(\"./boot.jl\")\nn\nnjulia> top_frame.line\nn234\nn\nnjulia> top_frame.linfo\nnNullable{LambdaInfo}(LambdaInfo for eval(::Module, ::Any)\nn...\nn\nnjulia> top_frame.inlined\nnfalse\nn\nnjulia> top_frame.from_c\nnfalsejulia> top_frame.pointer\nn13203085684This makes stack trace information available programmatically for logging, error handling, and more."
},

{
    "location": "manual/stacktraces.html#Error-handling-1",
    "title": "Error handling",
    "category": "Section",
    "text": "While having easy access to information about the current state of the callstack can be helpful in many places, the most obvious application is in error handling and debugging.julia> @noinline bad_function() = undeclared_variable\nnbad_function (generic function with 1 method)\nn\nnjulia> @noinline example() = try\nn           bad_function()\nn       catch\nn           stacktrace()\nn       end\nnexample (generic function with 1 method)\nn\nnjulia> example()\nn6-element Array{StackFrame,1}:\nn  in example() at none:4\nn  in eval(::Module, ::Any) at boot.jl:234\nn  ...You may notice that in the example above the first stack frame points points at line 4, where stacktrace() is called, rather than line 2, where bad_function is called, and bad_function's frame is missing entirely. This is understandable, given that stacktrace() is called from the context of the catch. While in this example it's fairly easy to find the actual source of the error, in complex cases tracking down the source of the error becomes nontrivial.This can be remedied by calling catch_stacktrace() instead of stacktrace(). Instead of returning callstack information for the current context, catch_stacktrace() returns stack information for the context of the most recent exception:julia> @noinline bad_function() = undeclared_variable\nnbad_function (generic function with 1 method)\nn\nnjulia> @noinline example() = try\nn           bad_function()\nn       catch\nn           catch_stacktrace()\nn       end\nnexample (generic function with 1 method)\nn\nnjulia> example()\nn7-element Array{StackFrame,1}:\nn  in bad_function() at none:1\nn  in example() at none:2\nn  ...Notice that the stack trace now indicates the appropriate line number and the missing frame.julia> @noinline child() = error(\"Whoops!\")\nnchild (generic function with 1 method)\nn\nnjulia> @noinline parent() = child()\nnparent (generic function with 1 method)\nn\nnjulia> @noinline function grandparent()\nn           try\nn               parent()\nn           catch err\nn               println(\"ERROR: \", err.msg)\nn               catch_stacktrace()\nn           end\nn       end\nngrandparent (generic function with 1 method)\nn\nnjulia> grandparent()\nnERROR: Whoops!\nn8-element Array{StackFrame,1}:\nn  in child() at none:1\nn  in parent() at none:1\nn  in grandparent() at none:3\nn  ..."
},

{
    "location": "manual/strings.html",
    "title": "Strings",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/strings.html#Strings-1",
    "title": "Strings",
    "category": "Section",
    "text": "Strings are finite sequences of characters. Of course, the real trouble comes when one asks what a character is. The characters that English speakers are familiar with are the letters A, B, C, etc., together with numerals and common punctuation symbols. These characters are standardized together with a mapping to integer values between 0 and 127 by the ASCII standard. There are, of course, many other characters used in non-English languages, including variants of the ASCII characters with accents and other modifications, related scripts such as Cyrillic and Greek, and scripts completely unrelated to ASCII and English, including Arabic, Chinese, Hebrew, Hindi, Japanese, and Korean. The Unicode standard tackles the complexities of what exactly a character is, and is generally accepted as the definitive standard addressing this problem. Depending on your needs, you can either ignore these complexities entirely and just pretend that only ASCII characters exist, or you can write code that can handle any of the characters or encodings that one may encounter when handling non-ASCII text. Julia makes dealing with plain ASCII text simple and efficient, and handling Unicode is as simple and efficient as possible. In particular, you can write C-style string code to process ASCII strings, and they will work as expected, both in terms of performance and semantics. If such code encounters non-ASCII text, it will gracefully fail with a clear error message, rather than silently introducing corrupt results. When this happens, modifying the code to handle non-ASCII data is straightforward.There are a few noteworthy high-level features about Julia's strings:AbstractString is an abstraction, not a concrete type – many different representations can implement the AbstractString interface, but they can easily be used together and interact transparently. Any string type can be used in any function expecting a AbstractString.\nnLike C and Java, but unlike most dynamic languages, Julia has a first-class type representing a single character, called Char. This is just a special kind of 32-bit bitstype whose numeric value represents a Unicode code point.\nnAs in Java, strings are immutable: the value of a AbstractString object cannot be changed. To construct a different string value, you construct a new string from parts of other strings.\nnConceptually, a string is a partial function from indices to characters – for some index values, no character value is returned, and instead an exception is thrown. This allows for efficient indexing into strings by the byte index of an encoded representation rather than by a character index, which cannot be implemented both efficiently and simply for variable-width encodings of Unicode strings.\nnJulia supports the full range of Unicode characters: literal strings are always UTF-8 but other encodings for strings from external sources can be supported."
},

{
    "location": "manual/strings.html#Characters-1",
    "title": "Characters",
    "category": "Section",
    "text": "A Char value represents a single character: it is just a 32-bit bitstype with a special literal representation and appropriate arithmetic behaviors, whose numeric value is interpreted as a Unicode code point. Here is how Char values are input and shown:julia> 'x'\nn'x'\nn\nnjulia> typeof(ans)\nnCharYou can convert a Char to its integer value, i.e. code point, easily:julia> Int('x')\nn120\nn\nnjulia> typeof(ans)\nnInt64On 32-bit architectures, typeof(ans) will be Int32. You can convert an integer value back to a Char just as easily:julia> Char(120)\nn'x'Not all integer values are valid Unicode code points, but for performance, the Char() conversion does not check that every character value is valid. If you want to check that each converted value is a valid code point, use the isvalid() function:julia> Char(0x110000)\nn'\U110000'\nn\nnjulia> isvalid(Char, 0x110000)\nnfalseAs of this writing, the valid Unicode code points are U+00 through U+d7ff and U+e000 through U+10ffff. These have not all been assigned intelligible meanings yet, nor are they necessarily interpretable by applications, but all of these values are considered to be valid Unicode characters.You can input any Unicode character in single quotes using \u followed by up to four hexadecimal digits or \U followed by up to eight hexadecimal digits (the longest valid value only requires six):julia> '\u0'\nn'\0'\nn\nnjulia> '\u78'\nn'x'\nn\nnjulia> '\u2200'\nn'∀'\nn\nnjulia> '\U10ffff'\nn'\U10ffff'Julia uses your system's locale and language settings to determine which characters can be printed as-is and which must be output using the generic, escaped \u or \U input forms. In addition to these Unicode escape forms, all of C's traditional escaped input forms can also be used:julia> Int('\0')\nn0\nn\nnjulia> Int('\t')\nn9\nn\nnjulia> Int('\n')\nn10\nn\nnjulia> Int('\e')\nn27\nn\nnjulia> Int('\x7f')\nn127\nn\nnjulia> Int('\177')\nn127\nn\nnjulia> Int('\xff')\nn255You can do comparisons and a limited amount of arithmetic with Char values:julia> 'A' < 'a'\nntrue\nn\nnjulia> 'A' <= 'a' <= 'Z'\nnfalse\nn\nnjulia> 'A' <= 'X' <= 'Z'\nntrue\nn\nnjulia> 'x' - 'a'\nn23\nn\nnjulia> 'A' + 1\nn'B'"
},

{
    "location": "manual/strings.html#String-Basics-1",
    "title": "String Basics",
    "category": "Section",
    "text": "String literals are delimited by double quotes or triple double quotes:julia> str = \"Hello, world.\n\"\nn\"Hello, world.\n\"\nn\nnjulia> \"\"\"Contains \"quote\" characters\"\"\"\nn\"Contains \\"quote\\" characters\"If you want to extract a character from a string, you index into it:julia> str[1]\nn'H'\nn\nnjulia> str[6]\nn','\nn\nnjulia> str[end]\nn'\n'All indexing in Julia is 1-based: the first element of any integer-indexed object is found at index 1, and the last element is found at index n, when the string has a length of n.In any indexing expression, the keyword end can be used as a shorthand for the last index (computed by endof(str)). You can perform arithmetic and other operations with end, just like a normal value:julia> str[end-1]\nn'.'\nn\nnjulia> str[end÷2]\nn' 'Using an index less than 1 or greater than end raises an error:julia> str[0]\nnERROR: BoundsError: attempt to access 14-element Array{UInt8,1} at index [0]\nn\nnjulia> str[end+1]\nnERROR: BoundsError: attempt to access 14-element Array{UInt8,1} at index [15]You can also extract a substring using range indexing:julia> str[4:9]\nn\"lo, wo\"Notice that the expressions str[k] and str[k:k] do not give the same result:julia> str[6]\nn','\nn\nnjulia> str[6:6]\nn\",\"The former is a single character value of type Char, while the latter is a string value that happens to contain only a single character. In Julia these are very different things."
},

{
    "location": "manual/strings.html#Unicode-and-UTF-8-1",
    "title": "Unicode and UTF-8",
    "category": "Section",
    "text": "Julia fully supports Unicode characters and strings. As discussed above, in character literals, Unicode code points can be represented using Unicode \u and \U escape sequences, as well as all the standard C escape sequences. These can likewise be used to write string literals:julia> s = \"\u2200 x \u2203 y\"\nn\"∀ x ∃ y\"Whether these Unicode characters are displayed as escapes or shown as special characters depends on your terminal's locale settings and its support for Unicode. String literals are encoded using the UTF-8 encoding. UTF-8 is a variable-width encoding, meaning that not all characters are encoded in the same number of bytes. In UTF-8, ASCII characters – i.e. those with code points less than 0x80 (128) – are encoded as they are in ASCII, using a single byte, while code points 0x80 and above are encoded using multiple bytes – up to four per character. This means that not every byte index into a UTF-8 string is necessarily a valid index for a character. If you index into a string at such an invalid byte index, an error is thrown:julia> s[1]\nn'∀'\nn\nnjulia> s[2]\nnERROR: UnicodeError: invalid character index\nn in slow_utf8_next(::Array{UInt8,1}, ::UInt8, ::Int64) at ./strings/string.jl:67\nn in next at ./strings/string.jl:92 [inlined]\nn in getindex(::String, ::Int64) at ./strings/basic.jl:70\nn ...\nn\nnjulia> s[3]\nnERROR: UnicodeError: invalid character index\nn in slow_utf8_next(::Array{UInt8,1}, ::UInt8, ::Int64) at ./strings/string.jl:67\nn in next at ./strings/string.jl:92 [inlined]\nn in getindex(::String, ::Int64) at ./strings/basic.jl:70\nn ...\nn\nnjulia> s[4]\nn' 'In this case, the character ∀ is a three-byte character, so the indices 2 and 3 are invalid and the next character's index is 4; this next valid index can be computed by nextind(s,1), and the next index after that by nextind(s,4) and so on.Because of variable-length encodings, the number of characters in a string (given by length(s)) is not always the same as the last index. If you iterate through the indices 1 through endof(s) and index into s, the sequence of characters returned when errors aren't thrown is the sequence of characters comprising the string s. Thus we have the identity that length(s) <= endof(s), since each character in a string must have its own index. The following is an inefficient and verbose way to iterate through the characters of s:julia> for i = 1:endof(s)\nn           try\nn               println(s[i])\nn           catch\nn               # ignore the index error\nn           end\nn       end\nn∀\nn\nnx\nn\nn∃\nn\nnyThe blank lines actually have spaces on them. Fortunately, the above awkward idiom is unnecessary for iterating through the characters in a string, since you can just use the string as an iterable object, no exception handling required:julia> for c in s\nn           println(c)\nn       end\nn∀\nn\nnx\nn\nn∃\nn\nnyJulia uses the UTF-8 encoding by default, and support for new encodings can be added by packages. For example, the LegacyStrings.jl package implements UTF16String and UTF32String types. Additional discussion of other encodings and how to implement support for them is beyond the scope of this document for the time being. For further discussion of UTF-8 encoding issues, see the section below on byte array literals. The transcode() function is provided to convert data between the various UTF-xx encodings, primarily for working with external data and libraries."
},

{
    "location": "manual/strings.html#Interpolation-1",
    "title": "Interpolation",
    "category": "Section",
    "text": "One of the most common and useful string operations is concatenation:julia> greet = \"Hello\"\nn\"Hello\"\nn\nnjulia> whom = \"world\"\nn\"world\"\nn\nnjulia> string(greet, \", \", whom, \".\n\")\nn\"Hello, world.\n\"Constructing strings like this can become a bit cumbersome, however. To reduce the need for these verbose calls to string(), Julia allows interpolation into string literals using $, as in Perl:julia> \"$greet, $whom.\n\"\nn\"Hello, world.\n\"This is more readable and convenient and equivalent to the above string concatenation – the system rewrites this apparent single string literal into a concatenation of string literals with variables.The shortest complete expression after the $ is taken as the expression whose value is to be interpolated into the string. Thus, you can interpolate any expression into a string using parentheses:julia> \"1 + 2 = $(1 + 2)\"\nn\"1 + 2 = 3\"Both concatenation and string interpolation call string() to convert objects into string form. Most non-AbstractString objects are converted to strings closely corresponding to how they are entered as literal expressions:julia> v = [1,2,3]\nn3-element Array{Int64,1}:\nn 1\nn 2\nn 3\nn\nnjulia> \"v: $v\"\nn\"v: [1,2,3]\"string() is the identity for AbstractString and Char values, so these are interpolated into strings as themselves, unquoted and unescaped:julia> c = 'x'\nn'x'\nn\nnjulia> \"hi, $c\"\nn\"hi, x\"To include a literal $ in a string literal, escape it with a backslash:julia> print(\"I have \$100 in my account.\n\")\nnI have $100 in my account."
},

{
    "location": "manual/strings.html#Triple-Quoted-String-Literals-1",
    "title": "Triple-Quoted String Literals",
    "category": "Section",
    "text": "When strings are created using triple-quotes (\"\"\"...\"\"\") they have some special behavior that can be useful for creating longer blocks of text. First, if the opening \"\"\" is followed by a newline, the newline is stripped from the resulting string.\"\"\"hello\"\"\"is equivalent to\"\"\"\nnhello\"\"\"but\"\"\"\nn\nnhello\"\"\"will contain a literal newline at the beginning. Trailing whitespace is left unaltered. They can contain \" symbols without escaping. Triple-quoted strings are also dedented to the level of the least-indented line. This is useful for defining strings within code that is indented. For example:julia> str = \"\"\"\nn           Hello,\nn           world.\nn         \"\"\"\nn\"  Hello,\n  world.\n\"In this case the final (empty) line before the closing \"\"\" sets the indentation level.Note that line breaks in literal strings, whether single- or triple-quoted, result in a newline (LF) character \n in the string, even if your editor uses a carriage return \r (CR) or CRLF combination to end lines. To include a CR in a string, use an explicit escape \r; for example, you can enter the literal string \"a CRLF line ending\r\n\"."
},

{
    "location": "manual/strings.html#Common-Operations-1",
    "title": "Common Operations",
    "category": "Section",
    "text": "You can lexicographically compare strings using the standard comparison operators:julia> \"abracadabra\" < \"xylophone\"\nntrue\nn\nnjulia> \"abracadabra\" == \"xylophone\"\nnfalse\nn\nnjulia> \"Hello, world.\" != \"Goodbye, world.\"\nntrue\nn\nnjulia> \"1 + 2 = 3\" == \"1 + 2 = $(1 + 2)\"\nntrueYou can search for the index of a particular character using the search() function:julia> search(\"xylophone\", 'x')\nn1\nn\nnjulia> search(\"xylophone\", 'p')\nn5\nn\nnjulia> search(\"xylophone\", 'z')\nn0You can start the search for a character at a given offset by providing a third argument:julia> search(\"xylophone\", 'o')\nn4\nn\nnjulia> search(\"xylophone\", 'o', 5)\nn7\nn\nnjulia> search(\"xylophone\", 'o', 8)\nn0You can use the contains() function to check if a substring is contained in a string:julia> contains(\"Hello, world.\", \"world\")\nntrue\nn\nnjulia> contains(\"Xylophon\", \"o\")\nntrue\nn\nnjulia> contains(\"Xylophon\", \"a\")\nnfalse\nn\nnjulia> contains(\"Xylophon\", 'o')\nnERROR: MethodError: no method matching contains(::String, ::Char)\nnClosest candidates are:\nn  contains(!Matched::Function, ::Any, !Matched::Any)\nn  contains(::AbstractString, !Matched::AbstractString)\nn ...The last error is because 'o' is a character literal, and contains() is a generic function that looks for subsequences. To look for an element in a sequence, you must use in() instead.Two other handy string functions are repeat() and join():julia> repeat(\".:Z:.\", 10)\nn\".:Z:..:Z:..:Z:..:Z:..:Z:..:Z:..:Z:..:Z:..:Z:..:Z:.\"\nn\nnjulia> join([\"apples\", \"bananas\", \"pineapples\"], \", \", \" and \")\nn\"apples, bananas and pineapples\"Some other useful functions include:endof(str) gives the maximal (byte) index that can be used to index into str.\nnlength(str) the number of characters in str.\nni = start(str) gives the first valid index at which a character can be found in str (typically 1).\nnc, j = next(str,i) returns next character at or after the index i and the next valid character index following that. With start() and endof(), can be used to iterate through the characters in str.\nnind2chr(str,i) gives the number of characters in str up to and including any at index i.\nnchr2ind(str,j) gives the index at which the jth character in str occurs."
},

{
    "location": "manual/strings.html#Non-Standard-String-Literals-1",
    "title": "Non-Standard String Literals",
    "category": "Section",
    "text": "There are situations when you want to construct a string or use string semantics, but the behavior of the standard string construct is not quite what is needed. For these kinds of situations, Julia provides non-standard string literals. A non-standard string literal looks like a regular double-quoted string literal, but is immediately prefixed by an identifier, and doesn't behave quite like a normal string literal. The convention is that non-standard literals with uppercase prefixes produce actual string objects, while those with lowercase prefixes produce non-string objects like byte arrays or compiled regular expressions. Regular expressions, byte array literals and version number literals, as described below, are some examples of non-standard string literals. Other examples are given in the metaprogramming section."
},

{
    "location": "manual/strings.html#Regular-Expressions-1",
    "title": "Regular Expressions",
    "category": "Section",
    "text": "Julia has Perl-compatible regular expressions (regexes), as provided by the PCRE library. Regular expressions are related to strings in two ways: the obvious connection is that regular expressions are used to find regular patterns in strings; the other connection is that regular expressions are themselves input as strings, which are parsed into a state machine that can be used to efficiently search for patterns in strings. In Julia, regular expressions are input using non-standard string literals prefixed with various identifiers beginning with r. The most basic regular expression literal without any options turned on just uses r\"...\":julia> r\"^\s*(?:#|$)\"\nnr\"^\s*(?:#|$)\"\nn\nnjulia> typeof(ans)\nnRegexTo check if a regex matches a string, use ismatch():julia> ismatch(r\"^\s*(?:#|$)\", \"not a comment\")\nnfalse\nn\nnjulia> ismatch(r\"^\s*(?:#|$)\", \"# a comment\")\nntrueAs one can see here, ismatch() simply returns true or false, indicating whether the given regex matches the string or not. Commonly, however, one wants to know not just whether a string matched, but also how it matched. To capture this information about a match, use the match() function instead:julia> match(r\"^\s*(?:#|$)\", \"not a comment\")\nn\nnjulia> match(r\"^\s*(?:#|$)\", \"# a comment\")\nnRegexMatch(\"#\")If the regular expression does not match the given string, match() returns nothing – a special value that does not print anything at the interactive prompt. Other than not printing, it is a completely normal value and you can test for it programmatically:m = match(r\"^\s*(?:#|$)\", line)\nnif m == nothing\nn    println(\"not a comment\")\nnelse\nn    println(\"blank or comment\")\nnendIf a regular expression does match, the value returned by match() is a RegexMatch object. These objects record how the expression matches, including the substring that the pattern matches and any captured substrings, if there are any. This example only captures the portion of the substring that matches, but perhaps we want to capture any non-blank text after the comment character. We could do the following:julia> m = match(r\"^\s*(?:#\s*(.*?)\s*$|$)\", \"# a comment \")\nnRegexMatch(\"# a comment \", 1=\"a comment\")When calling match(), you have the option to specify an index at which to start the search. For example:julia> m = match(r\"[0-9]\",\"aaaa1aaaa2aaaa3\",1)\nnRegexMatch(\"1\")\nn\nnjulia> m = match(r\"[0-9]\",\"aaaa1aaaa2aaaa3\",6)\nnRegexMatch(\"2\")\nn\nnjulia> m = match(r\"[0-9]\",\"aaaa1aaaa2aaaa3\",11)\nnRegexMatch(\"3\")You can extract the following info from a RegexMatch object:the entire substring matched: m.match\nnthe captured substrings as an array of strings: m.captures\nnthe offset at which the whole match begins: m.offset\nnthe offsets of the captured substrings as a vector: m.offsetsFor when a capture doesn't match, instead of a substring, m.captures contains nothing in that position, and m.offsets has a zero offset (recall that indices in Julia are 1-based, so a zero offset into a string is invalid). Here is a pair of somewhat contrived examples:julia> m = match(r\"(a|b)(c)?(d)\", \"acd\")\nnRegexMatch(\"acd\", 1=\"a\", 2=\"c\", 3=\"d\")\nn\nnjulia> m.match\nn\"acd\"\nn\nnjulia> m.captures\nn3-element Array{Union{SubString{String},Void},1}:\nn \"a\"\nn \"c\"\nn \"d\"\nn\nnjulia> m.offset\nn1\nn\nnjulia> m.offsets\nn3-element Array{Int64,1}:\nn 1\nn 2\nn 3\nn\nnjulia> m = match(r\"(a|b)(c)?(d)\", \"ad\")\nnRegexMatch(\"ad\", 1=\"a\", 2=nothing, 3=\"d\")\nn\nnjulia> m.match\nn\"ad\"\nn\nnjulia> m.captures\nn3-element Array{Union{SubString{String},Void},1}:\nn \"a\"\nn nothing\nn \"d\"\nn\nnjulia> m.offset\nn1\nn\nnjulia> m.offsets\nn3-element Array{Int64,1}:\nn 1\nn 0\nn 2It is convenient to have captures returned as an array so that one can use destructuring syntax to bind them to local variables:julia> first, second, third = m.captures; first\nn\"a\"Captures can also be accessed by indexing the RegexMatch object with the number or name of the capture group:julia> m=match(r\"(?<hour>\d+):(?<minute>\d+)\",\"12:45\")\nnRegexMatch(\"12:45\", hour=\"12\", minute=\"45\")\nnjulia> m[:minute]\nn\"45\"\nnjulia> m[2]\nn\"45\"Captures can be referenced in a substitution string when using replace() by using \n to refer to the nth capture group and prefixing the subsitution string with s. Capture group 0 refers to the entire match object. Named capture groups can be referenced in the substitution with g<groupname>. For example:julia> replace(\"first second\", r\"(\w+) (?<agroup>\w+)\", s\"\g<agroup> \1\")\nn\"second first\"Numbered capture groups can also be referenced as \g<n> for disambiguation, as in:julia> replace(\"a\", r\".\", s\"\g<0>1\")\nn\"a1\"You can modify the behavior of regular expressions by some combination of the flags i, m, s, and x after the closing double quote mark. These flags have the same meaning as they do in Perl, as explained in this excerpt from the perlre manpage:i   Do case-insensitive pattern matching.\nn\nn    If locale matching rules are in effect, the case map is taken\nn    from the current locale for code points less than 255, and\nn    from Unicode rules for larger code points. However, matches\nn    that would cross the Unicode rules/non-Unicode rules boundary\nn    (ords 255/256) will not succeed.\nn\nnm   Treat string as multiple lines.  That is, change \"^\" and \"$\"\nn    from matching the start or end of the string to matching the\nn    start or end of any line anywhere within the string.\nn\nns   Treat string as single line.  That is, change \".\" to match any\nn    character whatsoever, even a newline, which normally it would\nn    not match.\nn\nn    Used together, as r\"\"ms, they let the \".\" match any character\nn    whatsoever, while still allowing \"^\" and \"$\" to match,\nn    respectively, just after and just before newlines within the\nn    string.\nn\nnx   Tells the regular expression parser to ignore most whitespace\nn    that is neither backslashed nor within a character class. You\nn    can use this to break up your regular expression into\nn    (slightly) more readable parts. The '#' character is also\nn    treated as a metacharacter introducing a comment, just as in\nn    ordinary code.For example, the following regex has all three flags turned on:julia> r\"a+.*b+.*?d$\"ism\nnr\"a+.*b+.*?d$\"ims\nn\nnjulia> match(r\"a+.*b+.*?d$\"ism, \"Goodbye,\nOh, angry,\nBad world\n\")\nnRegexMatch(\"angry,\nBad world\")Triple-quoted regex strings, of the form r\"\"\"...\"\"\", are also supported (and may be convenient for regular expressions containing quotation marks or newlines)."
},

{
    "location": "manual/strings.html#Byte-Array-Literals-1",
    "title": "Byte Array Literals",
    "category": "Section",
    "text": "Another useful non-standard string literal is the byte-array string literal: b\"...\". This form lets you use string notation to express literal byte arrays – i.e. arrays of UInt8 values. The rules for byte array literals are the following:ASCII characters and ASCII escapes produce a single byte.\nn\x and octal escape sequences produce the byte corresponding to the escape value.\nnUnicode escape sequences produce a sequence of bytes encoding that code point in UTF-8.There is some overlap between these rules since the behavior of \x and octal escapes less than 0x80 (128) are covered by both of the first two rules, but here these rules agree. Together, these rules allow one to easily use ASCII characters, arbitrary byte values, and UTF-8 sequences to produce arrays of bytes. Here is an example using all three:julia> b\"DATA\xff\u2200\"\nn8-element Array{UInt8,1}:\nn 0x44\nn 0x41\nn 0x54\nn 0x41\nn 0xff\nn 0xe2\nn 0x88\nn 0x80The ASCII string \"DATA\" corresponds to the bytes 68, 65, 84, 65. \xff produces the single byte 255. The Unicode escape \u2200 is encoded in UTF-8 as the three bytes 226, 136, 128. Note that the resulting byte array does not correspond to a valid UTF-8 string – if you try to use this as a regular string literal, you will get a syntax error:julia> \"DATA\xff\u2200\"\nnERROR: syntax: invalid UTF-8 sequence\nn ...Also observe the significant distinction between \xff and \uff: the former escape sequence encodes the byte 255, whereas the latter escape sequence represents the code point 255, which is encoded as two bytes in UTF-8:julia> b\"\xff\"\nn1-element Array{UInt8,1}:\nn 0xff\nn\nnjulia> b\"\uff\"\nn2-element Array{UInt8,1}:\nn 0xc3\nn 0xbfIn character literals, this distinction is glossed over and \xff is allowed to represent the code point 255, because characters always represent code points. In strings, however, \x escapes always represent bytes, not code points, whereas \u and \U escapes always represent code points, which are encoded in one or more bytes. For code points less than \u80, it happens that the UTF-8 encoding of each code point is just the single byte produced by the corresponding \x escape, so the distinction can safely be ignored. For the escapes \x80 through \xff as compared to \u80 through \uff, however, there is a major difference: the former escapes all encode single bytes, which – unless followed by very specific continuation bytes – do not form valid UTF-8 data, whereas the latter escapes all represent Unicode code points with two-byte encodings.If this is all extremely confusing, try reading \"The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets\". It's an excellent introduction to Unicode and UTF-8, and may help alleviate some confusion regarding the matter."
},

{
    "location": "manual/style-guide.html",
    "title": "Style Guide",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/style-guide.html#Style-Guide-1",
    "title": "Style Guide",
    "category": "Section",
    "text": "The following sections explain a few aspects of idiomatic Julia coding style. None of these rules are absolute; they are only suggestions to help familiarize you with the language and to help you choose among alternative designs."
},

{
    "location": "manual/style-guide.html#Write-functions,-not-just-scripts-1",
    "title": "Write functions, not just scripts",
    "category": "Section",
    "text": "Writing code as a series of steps at the top level is a quick way to get started solving a problem, but you should try to divide a program into functions as soon as possible. Functions are more reusable and testable, and clarify what steps are being done and what their inputs and outputs are. Furthermore, code inside functions tends to run much faster than top level code, due to how Julia's compiler works.It is also worth emphasizing that functions should take arguments, instead of operating directly on global variables (aside from constants like pi)."
},

{
    "location": "manual/style-guide.html#Avoid-writing-overly-specific-types-1",
    "title": "Avoid writing overly-specific types",
    "category": "Section",
    "text": "Code should be as generic as possible. Instead of writing:convert(Complex{Float64}, x)it's better to use available generic functions:complex(float(x))The second version will convert x to an appropriate type, instead of always the same type.This style point is especially relevant to function arguments. For example, don't declare an argument to be of type Int or Int32 if it really could be any integer, expressed with the abstract type Integer.  In fact, in many cases you can omit the argument type altogether, unless it is needed to disambiguate from other method definitions, since a MethodError will be thrown anyway if a type is passed that does not support any of the requisite operations. (This is known as duck typing.)For example, consider the following definitions of a function addone that returns one plus its argument:addone(x::Int) = x + 1             # works only for Int\nnaddone(x::Integer) = x + one(x)    # any integer type\nnaddone(x::Number) = x + one(x)     # any numeric type\nnaddone(x) = x + one(x)             # any type supporting + and oneThe last definition of addone handles any type supporting one() (which returns 1 in the same type as x, which avoids unwanted type promotion) and the + function with those arguments.  The key thing to realize is that there is no performance penalty to defining only the general addone(x) = x + one(x), because Julia will automatically compile specialized versions as needed.  For example, the first time you call addone(12), Julia will automatically compile a specialized addone function for x::Int arguments, with the call to one() replaced by its inlined value 1.  Therefore, the first three definitions of addone above are completely redundant."
},

{
    "location": "manual/style-guide.html#Handle-excess-argument-diversity-in-the-caller-1",
    "title": "Handle excess argument diversity in the caller",
    "category": "Section",
    "text": "Instead of:function foo(x, y)\nn    x = Int(x); y = Int(y)\nn    ...\nnend\nnfoo(x, y)use:function foo(x::Int, y::Int)\nn    ...\nnend\nnfoo(Int(x), Int(y))This is better style because foo does not really accept numbers of all types; it really needs Int s.One issue here is that if a function inherently requires integers, it might be better to force the caller to decide how non-integers should be converted (e.g. floor or ceiling). Another issue is that declaring more specific types leaves more \"space\" for future method definitions."
},

{
    "location": "manual/style-guide.html#Append-!-to-names-of-functions-that-modify-their-arguments-1",
    "title": "Append ! to names of functions that modify their arguments",
    "category": "Section",
    "text": "Instead of:function double{T<:Number}(a::AbstractArray{T})\nn    for i = 1:endof(a); a[i] *= 2; end\nn    a\nnenduse:function double!{T<:Number}(a::AbstractArray{T})\nn    for i = 1:endof(a); a[i] *= 2; end\nn    a\nnendThe Julia standard library uses this convention throughout and contains examples of functions with both copying and modifying forms (e.g., sort() and sort!()), and others which are just modifying (e.g., push!(), pop!(), splice!()).  It is typical for such functions to also return the modified array for convenience."
},

{
    "location": "manual/style-guide.html#Avoid-strange-type-Unions-1",
    "title": "Avoid strange type Unions",
    "category": "Section",
    "text": "Types such as Union{Function,AbstractString} are often a sign that some design could be cleaner."
},

{
    "location": "manual/style-guide.html#Avoid-type-Unions-in-fields-1",
    "title": "Avoid type Unions in fields",
    "category": "Section",
    "text": "When creating a type such as:type MyType\nn    ...\nn    x::Union{Void,T}\nnendask whether the option for x to be nothing (of type Void) is really necessary. Here are some alternatives to consider:Find a safe default value to initialize x with\nnIntroduce another type that lacks x\nnIf there are many fields like x, store them in a dictionary\nnDetermine whether there is a simple rule for when x is nothing. For example, often the field will start as nothing but get initialized at some well-defined point. In that case, consider leaving it undefined at first.\nnIf x really needs to hold no value at some times, define it as ::Nullable{T} instead, as this guarantees type-stability in the code accessing this field (see Nullable types)"
},

{
    "location": "manual/style-guide.html#Avoid-elaborate-container-types-1",
    "title": "Avoid elaborate container types",
    "category": "Section",
    "text": "It is usually not much help to construct arrays like the following:a = Array{Union{Int,AbstractString,Tuple,Array}}(n)In this case Array{Any}(n) is better. It is also more helpful to the compiler to annotate specific uses (e.g. a[i]::Int) than to try to pack many alternatives into one type."
},

{
    "location": "manual/style-guide.html#Use-naming-conventions-consistent-with-Julia's-base/-1",
    "title": "Use naming conventions consistent with Julia's base/",
    "category": "Section",
    "text": "modules and type names use capitalization and camel case: module SparseArrays,  immutable UnitRange.\nnfunctions are lowercase (maximum(), convert()) and, when readable, with multiple words squashed together (isequal(), haskey()). When necessary, use underscores as word separators. Underscores are also used to indicate a combination of concepts (remotecall_fetch() as a more efficient implementation of fetch(remotecall(...))) or as modifiers (sum_kbn()).\nnconciseness is valued, but avoid abbreviation (indexin() rather than indxin()) as it becomes difficult to remember whether and how particular words are abbreviated.If a function name requires multiple words, consider whether it might represent more than one concept and might be better split into pieces."
},

{
    "location": "manual/style-guide.html#Don't-overuse-try-catch-1",
    "title": "Don't overuse try-catch",
    "category": "Section",
    "text": "It is better to avoid errors than to rely on catching them."
},

{
    "location": "manual/style-guide.html#Don't-parenthesize-conditions-1",
    "title": "Don't parenthesize conditions",
    "category": "Section",
    "text": "Julia doesn't require parens around conditions in if and while. Write:if a == binstead of:if (a == b)"
},

{
    "location": "manual/style-guide.html#Don't-overuse-...-1",
    "title": "Don't overuse ...",
    "category": "Section",
    "text": "Splicing function arguments can be addictive. Instead of [a..., b...], use simply [a; b], which already concatenates arrays. collect(a) is better than [a...], but since a is already iterable it is often even better to leave it alone, and not convert it to an array."
},

{
    "location": "manual/style-guide.html#Don't-use-unnecessary-static-parameters-1",
    "title": "Don't use unnecessary static parameters",
    "category": "Section",
    "text": "A function signature:foo{T<:Real}(x::T) = ...should be written as:foo(x::Real) = ...instead, especially if T is not used in the function body. Even if T is used, it can be replaced with typeof(x) if convenient. There is no performance difference. Note that this is not a general caution against static parameters, just against uses where they are not needed.Note also that container types, specifically may need type parameters in function calls. See the FAQ Avoid fields with abstract containers for more information."
},

{
    "location": "manual/style-guide.html#Avoid-confusion-about-whether-something-is-an-instance-or-a-type-1",
    "title": "Avoid confusion about whether something is an instance or a type",
    "category": "Section",
    "text": "Sets of definitions like the following are confusing:foo(::Type{MyType}) = ...\nnfoo(::MyType) = foo(MyType)Decide whether the concept in question will be written as MyType or MyType(), and stick to it.The preferred style is to use instances by default, and only add methods involving Type{MyType} later if they become necessary to solve some problem.If a type is effectively an enumeration, it should be defined as a single (ideally immutable) type, with the enumeration values being instances of it. Constructors and conversions can check whether values are valid. This design is preferred over making the enumeration an abstract type, with the \"values\" as subtypes."
},

{
    "location": "manual/style-guide.html#Don't-overuse-macros-1",
    "title": "Don't overuse macros",
    "category": "Section",
    "text": "Be aware of when a macro could really be a function instead.Calling eval() inside a macro is a particularly dangerous warning sign; it means the macro will only work when called at the top level. If such a macro is written as a function instead, it will naturally have access to the run-time values it needs."
},

{
    "location": "manual/style-guide.html#Don't-expose-unsafe-operations-at-the-interface-level-1",
    "title": "Don't expose unsafe operations at the interface level",
    "category": "Section",
    "text": "If you have a type that uses a native pointer:type NativeType\nn    p::Ptr{UInt8}\nn    ...\nnenddon't write definitions like the following:getindex(x::NativeType, i) = unsafe_load(x.p, i)The problem is that users of this type can write x[i] without realizing that the operation is unsafe, and then be susceptible to memory bugs.Such a function should either check the operation to ensure it is safe, or have unsafe somewhere in its name to alert callers."
},

{
    "location": "manual/style-guide.html#Don't-overload-methods-of-base-container-types-1",
    "title": "Don't overload methods of base container types",
    "category": "Section",
    "text": "It is possible to write definitions like the following:show(io::IO, v::Vector{MyType}) = ...This would provide custom showing of vectors with a specific new element type. While tempting, this should be avoided. The trouble is that users will expect a well-known type like Vector() to behave in a certain way, and overly customizing its behavior can make it harder to work with."
},

{
    "location": "manual/style-guide.html#Be-careful-with-type-equality-1",
    "title": "Be careful with type equality",
    "category": "Section",
    "text": "You generally want to use isa() and <: (issubtype()) for testing types, not ==. Checking types for exact equality typically only makes sense when comparing to a known concrete type (e.g. T == Float64), or if you really, really know what you're doing."
},

{
    "location": "manual/style-guide.html#Do-not-write-x-f(x)-1",
    "title": "Do not write x->f(x)",
    "category": "Section",
    "text": "Since higher-order functions are often called with anonymous functions, it is easy to conclude that this is desirable or even necessary. But any function can be passed directly, without being \"wrapped\" in an anonymous function. Instead of writing map(x->f(x), a), write map(f, a)."
},

{
    "location": "manual/types.html",
    "title": "Types",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/types.html#Types-1",
    "title": "Types",
    "category": "Section",
    "text": "Type systems have traditionally fallen into two quite different camps: static type systems, where every program expression must have a type computable before the execution of the program, and dynamic type systems, where nothing is known about types until run time, when the actual values manipulated by the program are available. Object orientation allows some flexibility in statically typed languages by letting code be written without the precise types of values being known at compile time. The ability to write code that can operate on different types is called polymorphism. All code in classic dynamically typed languages is polymorphic: only by explicitly checking types, or when objects fail to support operations at run-time, are the types of any values ever restricted.Julia's type system is dynamic, but gains some of the advantages of static type systems by making it possible to indicate that certain values are of specific types. This can be of great assistance in generating efficient code, but even more significantly, it allows method dispatch on the types of function arguments to be deeply integrated with the language. Method dispatch is explored in detail in Methods, but is rooted in the type system presented here.The default behavior in Julia when types are omitted is to allow values to be of any type. Thus, one can write many useful Julia programs without ever explicitly using types. When additional expressiveness is needed, however, it is easy to gradually introduce explicit type annotations into previously \"untyped\" code. Doing so will typically increase both the performance and robustness of these systems, and perhaps somewhat counterintuitively, often significantly simplify them.Describing Julia in the lingo of type systems, it is: dynamic, nominative and parametric. Generic types can be parameterized, and the hierarchical relationships between types are explicitly declared, rather than implied by compatible structure. One particularly distinctive feature of Julia's type system is that concrete types may not subtype each other: all concrete types are final and may only have abstract types as their supertypes. While this might at first seem unduly restrictive, it has many beneficial consequences with surprisingly few drawbacks. It turns out that being able to inherit behavior is much more important than being able to inherit structure, and inheriting both causes significant difficulties in traditional object-oriented languages. Other high-level aspects of Julia's type system that should be mentioned up front are:There is no division between object and non-object values: all values in Julia are true objects having a type that belongs to a single, fully connected type graph, all nodes of which are equally first-class as types.\nnThere is no meaningful concept of a \"compile-time type\": the only type a value has is its actual type when the program is running. This is called a \"run-time type\" in object-oriented languages where the combination of static compilation with polymorphism makes this distinction significant.\nnOnly values, not variables, have types – variables are simply names bound to values.\nnBoth abstract and concrete types can be parameterized by other types. They can also be parameterized by symbols, by values of any type for which isbits() returns true (essentially, things like numbers and bools that are stored like C types or structs with no pointers to other objects), and also by tuples thereof. Type parameters may be omitted when they do not need to be referenced or restricted.Julia's type system is designed to be powerful and expressive, yet clear, intuitive and unobtrusive. Many Julia programmers may never feel the need to write code that explicitly uses types. Some kinds of programming, however, become clearer, simpler, faster and more robust with declared types."
},

{
    "location": "manual/types.html#Type-Declarations-1",
    "title": "Type Declarations",
    "category": "Section",
    "text": "The :: operator can be used to attach type annotations to expressions and variables in programs. There are two primary reasons to do this:As an assertion to help confirm that your program works the way you expect,\nnTo provide extra type information to the compiler, which can then improve performance in some casesWhen appended to an expression computing a value, the :: operator is read as \"is an instance of\". It can be used anywhere to assert that the value of the expression on the left is an instance of the type on the right. When the type on the right is concrete, the value on the left must have that type as its implementation – recall that all concrete types are final, so no implementation is a subtype of any other. When the type is abstract, it suffices for the value to be implemented by a concrete type that is a subtype of the abstract type. If the type assertion is not true, an exception is thrown, otherwise, the left-hand value is returned:julia> (1+2)::AbstractFloat\nnERROR: TypeError: typeassert: expected AbstractFloat, got Int64\nn ...\nn\nnjulia> (1+2)::Int\nn3This allows a type assertion to be attached to any expression in-place.When appended to a variable on the left-hand side of an assignment, or as part of a local declaration, the :: operator means something a bit different: it declares the variable to always have the specified type, like a type declaration in a statically-typed language such as C. Every value assigned to the variable will be converted to the declared type using convert():julia> function foo()\nn         x::Int8 = 100\nn         x\nn       end\nnfoo (generic function with 1 method)\nn\nnjulia> foo()\nn100\nn\nnjulia> typeof(ans)\nnInt8This feature is useful for avoiding performance \"gotchas\" that could occur if one of the assignments to a variable changed its type unexpectedly.This \"declaration\" behavior only occurs in specific contexts:local x::Int8  # in a local declaration\nnx::Int8 = 10   # as the left-hand side of an assignmentand applies to the whole current scope, even before the declaration. Currently, type declarations cannot be used in global scope, e.g. in the REPL, since Julia does not yet have constant-type globals.Declarations can also be attached to function definitions:function sinc(x)::Float64\nn    if x == 0\nn        return 1\nn    end\nn    return sin(pi*x)/(pi*x)\nnendReturning from this function behaves just like an assignment to a variable with a declared type: the value is always converted to Float64."
},

{
    "location": "manual/types.html#Abstract-Types-1",
    "title": "Abstract Types",
    "category": "Section",
    "text": "Abstract types cannot be instantiated, and serve only as nodes in the type graph, thereby describing sets of related concrete types: those concrete types which are their descendants. We begin with abstract types even though they have no instantiation because they are the backbone of the type system: they form the conceptual hierarchy which makes Julia's type system more than just a collection of object implementations.Recall that in Integers and Floating-Point Numbers, we introduced a variety of concrete types of numeric values: Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, Int128, UInt128, Float16, Float32, and Float64.  Although they have different representation sizes, Int8, Int16, Int32, Int64  and Int128 all have in common that they are signed integer types. Likewise UInt8, UInt16, UInt32, UInt64 and UInt128 are all unsigned integer types, while Float16, Float32 and Float64 are distinct in being floating-point types rather than integers. It is common for a piece of code to make sense, for example, only if its arguments are some kind of integer, but not really depend on what particular kind of integer.  For example, the greatest common denominator algorithm works for all kinds of integers, but will not work for floating-point numbers.  Abstract types allow the construction of a hierarchy of types, providing a context into which concrete types can fit.  This allows you, for example, to easily program to any type that is an integer, without restricting an algorithm to a specific type of integer.Abstract types are declared using the abstract keyword. The general syntaxes for declaring an abstract type are:abstract «name»\nnabstract «name» <: «supertype»The abstract keyword introduces a new abstract type, whose name is given by «name». This name can be optionally followed by <: and an already-existing type, indicating that the newly declared abstract type is a subtype of this \"parent\" type.When no supertype is given, the default supertype is Any – a predefined abstract type that all objects are instances of and all types are subtypes of. In type theory, Any is commonly called \"top\" because it is at the apex of the type graph. Julia also has a predefined abstract \"bottom\" type, at the nadir of the type graph, which is written as Union{}. It is the exact opposite of Any: no object is an instance of Union{} and all types are supertypes of Union{}.Let's consider some of the abstract types that make up Julia's numerical hierarchy:abstract Number\nnabstract Real     <: Number\nnabstract AbstractFloat <: Real\nnabstract Integer  <: Real\nnabstract Signed   <: Integer\nnabstract Unsigned <: IntegerThe Number type is a direct child type of Any, and Real is its child. In turn, Real has two children (it has more, but only two are shown here; we'll get to the others later): Integer and AbstractFloat, separating the world into representations of integers and representations of real numbers. Representations of real numbers include, of course, floating-point types, but also include other types, such as rationals. Hence, AbstractFloat is a proper subtype of Real, including only floating-point representations of real numbers. Integers are further subdivided into Signed and Unsigned varieties.The <: operator in general means \"is a subtype of\", and, used in declarations like this, declares the right-hand type to be an immediate supertype of the newly declared type. It can also be used in expressions as a subtype operator which returns true when its left operand is a subtype of its right operand:julia> Integer <: Number\nntrue\nn\nnjulia> Integer <: AbstractFloat\nnfalseAn important use of abstract types is to provide default implementations for concrete types. To give a simple example, consider:function myplus(x,y)\nn x+y\nnendThe first thing to note is that the above argument declarations are equivalent to x::Any and y::Any. When this function is invoked, say as myplus(2,5), the dispatcher chooses the most specific method named myplus that matches the given arguments. (See Methods for more information on multiple dispatch.)Assuming no method more specific than the above is found, Julia next internally defines and compiles a method called myplus specifically for two Int arguments based on the generic function given above, i.e., it implicitly defines and compiles:function myplus(x::Int,y::Int)\nn x+y\nnendand finally, it invokes this specific method.Thus, abstract types allow programmers to write generic functions that can later be used as the default method by many combinations of concrete types. Thanks to multiple dispatch, the programmer has full control over whether the default or more specific method is used.An important point to note is that there is no loss in performance if the programmer relies on a function whose arguments are abstract types, because it is recompiled for each tuple of argument concrete types with which it is invoked. (There may be a performance issue, however, in the case of function arguments that are containers of abstract types; see Performance Tips.)"
},

{
    "location": "manual/types.html#Bits-Types-1",
    "title": "Bits Types",
    "category": "Section",
    "text": "A bits type is a concrete type whose data consists of plain old bits. Classic examples of bits types are integers and floating-point values. Unlike most languages, Julia lets you declare your own bits types, rather than providing only a fixed set of built-in bits types. In fact, the standard bits types are all defined in the language itself:bitstype 16 Float16 <: AbstractFloat\nnbitstype 32 Float32 <: AbstractFloat\nnbitstype 64 Float64 <: AbstractFloat\nn\nnbitstype 8  Bool <: Integer\nnbitstype 32 Char\nn\nnbitstype 8  Int8     <: Signed\nnbitstype 8  UInt8    <: Unsigned\nnbitstype 16 Int16    <: Signed\nnbitstype 16 UInt16   <: Unsigned\nnbitstype 32 Int32    <: Signed\nnbitstype 32 UInt32   <: Unsigned\nnbitstype 64 Int64    <: Signed\nnbitstype 64 UInt64   <: Unsigned\nnbitstype 128 Int128  <: Signed\nnbitstype 128 UInt128 <: UnsignedThe general syntaxes for declaration of a bitstype are:bitstype «bits» «name»\nnbitstype «bits» «name» <: «supertype»The number of bits indicates how much storage the type requires and the name gives the new type a name. A bits type can optionally be declared to be a subtype of some supertype. If a supertype is omitted, then the type defaults to having Any as its immediate supertype. The declaration of Bool above therefore means that a boolean value takes eight bits to store, and has Integer as its immediate supertype. Currently, only sizes that are multiples of 8 bits are supported. Therefore, boolean values, although they really need just a single bit, cannot be declared to be any smaller than eight bits.The types Bool, Int8 and UInt8 all have identical representations: they are eight-bit chunks of memory. Since Julia's type system is nominative, however, they are not interchangeable despite having identical structure. Another fundamental difference between them is that they have different supertypes: Bool's direct supertype is Integer, Int8's is Signed, and UInt8's is Unsigned. All other differences between Bool, Int8, and UInt8 are matters of behavior – the way functions are defined to act when given objects of these types as arguments. This is why a nominative type system is necessary: if structure determined type, which in turn dictates behavior, then it would be impossible to make Bool behave any differently than Int8 or UInt8."
},

{
    "location": "manual/types.html#Composite-Types-1",
    "title": "Composite Types",
    "category": "Section",
    "text": "Composite types are called records, structures (structs in C), or objects in various languages. A composite type is a collection of named fields, an instance of which can be treated as a single value. In many languages, composite types are the only kind of user-definable type, and they are by far the most commonly used user-defined type in Julia as well.In mainstream object oriented languages, such as C++, Java, Python and Ruby, composite types also have named functions associated with them, and the combination is called an \"object\". In purer object-oriented languages, such as Ruby or Smalltalk, all values are objects whether they are composites or not. In less pure object oriented languages, including C++ and Java, some values, such as integers and floating-point values, are not objects, while instances of user-defined composite types are true objects with associated methods. In Julia, all values are objects, but functions are not bundled with the objects they operate on. This is necessary since Julia chooses which method of a function to use by multiple dispatch, meaning that the types of all of a function's arguments are considered when selecting a method, rather than just the first one (see Methods for more information on methods and dispatch). Thus, it would be inappropriate for functions to \"belong\" to only their first argument. Organizing methods into function objects rather than having named bags of methods \"inside\" each object ends up being a highly beneficial aspect of the language design.Since composite types are the most common form of user-defined concrete type, they are simply introduced with the type keyword followed by a block of field names, optionally annotated with types using the :: operator:julia> type Foo\nn         bar\nn         baz::Int\nn         qux::Float64\nn       endFields with no type annotation default to Any, and can accordingly hold any type of value.New objects of composite type Foo are created by applying the Foo type object like a function to values for its fields:julia> foo = Foo(\"Hello, world.\", 23, 1.5)\nnFoo(\"Hello, world.\",23,1.5)\nn\nnjulia> typeof(foo)\nnFooWhen a type is applied like a function it is called a constructor. Two constructors are generated automatically (these are called default constructors). One accepts any arguments and calls convert() to convert them to the types of the fields, and the other accepts arguments that match the field types exactly. The reason both of these are generated is that this makes it easier to add new definitions without inadvertently replacing a default constructor.Since the bar field is unconstrained in type, any value will do. However, the value for baz must be convertible to Int:julia> Foo((), 23.5, 1)\nnERROR: InexactError()\nn in Foo(::Tuple{}, ::Float64, ::Int64) at ./none:2\nn ...You may find a list of field names using the fieldnames function.julia> fieldnames(foo)\nn3-element Array{Symbol,1}:\nn :bar\nn :baz\nn :quxYou can access the field values of a composite object using the traditional foo.bar notation:julia> foo.bar\nn\"Hello, world.\"\nn\nnjulia> foo.baz\nn23\nn\nnjulia> foo.qux\nn1.5You can also change the values as one would expect:julia> foo.qux = 2\nn2\nn\nnjulia> foo.bar = 1//2\nn1//2Composite types with no fields are singletons; there can be only one instance of such types:type NoFields\nnend\nn\nnjulia> is(NoFields(), NoFields())\nntrueThe is function confirms that the \"two\" constructed instances of NoFields are actually one and the same. Singleton types are described in further detail below.There is much more to say about how instances of composite types are created, but that discussion depends on both Parametric Types and on Methods, and is sufficiently important to be addressed in its own section: Constructors."
},

{
    "location": "manual/types.html#Immutable-Composite-Types-1",
    "title": "Immutable Composite Types",
    "category": "Section",
    "text": "It is also possible to define immutable composite types by using the keyword immutable instead of type:immutable Complex\nn  real::Float64\nn  imag::Float64\nnendSuch types behave much like other composite types, except that instances of them cannot be modified. Immutable types have several advantages:They are more efficient in some cases. Types like the Complex example above can be packed efficiently into arrays, and in some cases the compiler is able to avoid allocating immutable objects entirely.\nnIt is not possible to violate the invariants provided by the type's constructors.\nnCode using immutable objects can be easier to reason about.An immutable object might contain mutable objects, such as arrays, as fields. Those contained objects will remain mutable; only the fields of the immutable object itself cannot be changed to point to different objects.A useful way to think about immutable composites is that each instance is associated with specific field values – the field values alone tell you everything about the object. In contrast, a mutable object is like a little container that might hold different values over time, and so is not identified with specific field values. In deciding whether to make a type immutable, ask whether two instances with the same field values would be considered identical, or if they might need to change independently over time. If they would be considered identical, the type should probably be immutable.To recap, two essential properties define immutability in Julia:An object with an immutable type is passed around (both in assignment statements and in function calls) by copying, whereas a mutable type is passed around by reference.\nnIt is not permitted to modify the fields of a composite immutable type.It is instructive, particularly for readers whose background is C/C++, to consider why these two properties go hand in hand.  If they were separated, i.e., if the fields of objects passed around by copying could be modified, then it would become more difficult to reason about certain instances of generic code.  For example, suppose x is a function argument of an abstract type, and suppose that the function changes a field: x.isprocessed = true.  Depending on whether x is passed by copying or by reference, this statement may or may not alter the actual argument in the calling routine.  Julia sidesteps the possibility of creating functions with unknown effects in this scenario by forbidding modification of fields of objects passed around by copying."
},

{
    "location": "manual/types.html#Declared-Types-1",
    "title": "Declared Types",
    "category": "Section",
    "text": "The three kinds of types discussed in the previous three sections are actually all closely related. They share the same key properties:They are explicitly declared.\nnThey have names.\nnThey have explicitly declared supertypes.\nnThey may have parameters.Because of these shared properties, these types are internally represented as instances of the same concept, DataType, which is the type of any of these types:julia> typeof(Real)\nnDataType\nn\nnjulia> typeof(Int)\nnDataTypeA DataType may be abstract or concrete. If it is concrete, it has a specified size, storage layout, and (optionally) field names. Thus a bits type is a DataType with nonzero size, but no field names. A composite type is a DataType that has field names or is empty (zero size).Every concrete value in the system is an instance of some DataType."
},

{
    "location": "manual/types.html#Type-Unions-1",
    "title": "Type Unions",
    "category": "Section",
    "text": "A type union is a special abstract type which includes as objects all instances of any of its argument types, constructed using the special Union function:julia> IntOrString = Union{Int,AbstractString}\nnUnion{AbstractString,Int64}\nn\nnjulia> 1 :: IntOrString\nn1\nn\nnjulia> \"Hello!\" :: IntOrString\nn\"Hello!\"\nn\nnjulia> 1.0 :: IntOrString\nnERROR: type: typeassert: expected Union{AbstractString,Int64}, got Float64The compilers for many languages have an internal union construct for reasoning about types; Julia simply exposes it to the programmer."
},

{
    "location": "manual/types.html#Parametric-Types-1",
    "title": "Parametric Types",
    "category": "Section",
    "text": "An important and powerful feature of Julia's type system is that it is parametric: types can take parameters, so that type declarations actually introduce a whole family of new types – one for each possible combination of parameter values. There are many languages that support some version of generic programming, wherein data structures and algorithms to manipulate them may be specified without specifying the exact types involved. For example, some form of generic programming exists in ML, Haskell, Ada, Eiffel, C++, Java, C#, F#, and Scala, just to name a few. Some of these languages support true parametric polymorphism (e.g. ML, Haskell, Scala), while others support ad-hoc, template-based styles of generic programming (e.g. C++, Java). With so many different varieties of generic programming and parametric types in various languages, we won't even attempt to compare Julia's parametric types to other languages, but will instead focus on explaining Julia's system in its own right. We will note, however, that because Julia is a dynamically typed language and doesn't need to make all type decisions at compile time, many traditional difficulties encountered in static parametric type systems can be relatively easily handled.All declared types (the DataType variety) can be parameterized, with the same syntax in each case. We will discuss them in the following order: first, parametric composite types, then parametric abstract types, and finally parametric bits types."
},

{
    "location": "manual/types.html#Parametric-Composite-Types-1",
    "title": "Parametric Composite Types",
    "category": "Section",
    "text": "Type parameters are introduced immediately after the type name, surrounded by curly braces:type Point{T}\nn  x::T\nn  y::T\nnendThis declaration defines a new parametric type, Point{T}, holding two \"coordinates\" of type T. What, one may ask, is T? Well, that's precisely the point of parametric types: it can be any type at all (or a value of any bits type, actually, although here it's clearly used as a type). Point{Float64} is a concrete type equivalent to the type defined by replacing T in the definition of Point with Float64. Thus, this single declaration actually declares an unlimited number of types: Point{Float64}, Point{AbstractString}, Point{Int64}, etc. Each of these is now a usable concrete type:julia> Point{Float64}\nnPoint{Float64}\nn\nnjulia> Point{AbstractString}\nnPoint{AbstractString}The type Point{Float64} is a point whose coordinates are 64-bit floating-point values, while the type Point{AbstractString} is a \"point\" whose \"coordinates\" are string objects (see Strings). However, Point itself is also a valid type object:julia> Point\nnPoint{T}Here the T is the dummy type symbol used in the original declaration of Point. What does Point by itself mean? It is an abstract type that contains all the specific instances Point{Float64}, Point{AbstractString}, etc.:julia> Point{Float64} <: Point\nntrue\nn\nnjulia> Point{AbstractString} <: Point\nntrueOther types, of course, are not subtypes of it:julia> Float64 <: Point\nnfalse\nn\nnjulia> AbstractString <: Point\nnfalseConcrete Point types with different values of T are never subtypes of each other:julia> Point{Float64} <: Point{Int64}\nnfalse\nn\nnjulia> Point{Float64} <: Point{Real}\nnfalsewarning: \nnThis last point is very important: even though Float64 <: Real we DO NOT have Point{Float64} <: Point{Real}.In other words, in the parlance of type theory, Julia's type parameters are invariant, rather than being covariant (or even contravariant). This is for practical reasons: while any instance of Point{Float64} may conceptually be like an instance of Point{Real} as well, the two types have different representations in memory:An instance of Point{Float64} can be represented compactly and efficiently as an immediate pair of 64-bit values;\nnAn instance of Point{Real} must be able to hold any pair of instances of Real. Since objects that are instances of Real can be of arbitrary size and structure, in practice an instance of Point{Real} must be represented as a pair of pointers to individually allocated Real objects.The efficiency gained by being able to store Point{Float64} objects with immediate values is magnified enormously in the case of arrays: an Array{Float64} can be stored as a contiguous memory block of 64-bit floating-point values, whereas an Array{Real} must be an array of pointers to individually allocated Real objects – which may well be boxed 64-bit floating-point values, but also might be arbitrarily large, complex objects, which are declared to be implementations of the Real abstract type.Since Point{Float64} is not a subtype of Point{Real}, the following method can't be applied to arguments of type Point{Float64}:function norm(p::Point{Real})\nn   sqrt(p.x^2 + p.y^2)\nnendThe correct way to define a method that accepts all arguments of type Point{T} where T is a subtype of Real is:function norm{T<:Real}(p::Point{T})\nn   sqrt(p.x^2 + p.y^2)\nnendMore examples will be discussed later in Methods.How does one construct a Point object? It is possible to define custom constructors for composite types, which will be discussed in detail in Constructors, but in the absence of any special constructor declarations, there are two default ways of creating new composite objects, one in which the type parameters are explicitly given and the other in which they are implied by the arguments to the object constructor.Since the type Point{Float64} is a concrete type equivalent to Point declared with Float64 in place of T, it can be applied as a constructor accordingly:julia> Point{Float64}(1.0,2.0)\nnPoint{Float64}(1.0,2.0)\nn\nnjulia> typeof(ans)\nnPoint{Float64}For the default constructor, exactly one argument must be supplied for each field:julia> Point{Float64}(1.0)\nnERROR: MethodError: Cannot `convert` an object of type Float64 to an object of type Point{Float64}\nnThis may have arisen from a call to the constructor Point{Float64}(...),\nnsince type constructors fall back to convert methods.\nn in Point{Float64}(::Float64) at ./sysimg.jl:53\nn ...\nn\nnjulia> Point{Float64}(1.0,2.0,3.0)\nnERROR: MethodError: no method matching Point{Float64}(::Float64, ::Float64, ::Float64)\nnClosest candidates are:\nn  Point{Float64}{T}(::Any, ::Any)\nn  Point{Float64}{T}(::Any)\nn ...Only one default constructor is generated for parametric types, since overriding it is not possible. This constructor accepts any arguments and converts them to the field types.In many cases, it is redundant to provide the type of Point object one wants to construct, since the types of arguments to the constructor call already implicitly provide type information. For that reason, you can also apply Point itself as a constructor, provided that the implied value of the parameter type T is unambiguous:julia> Point(1.0,2.0)\nnPoint{Float64}(1.0,2.0)\nn\nnjulia> typeof(ans)\nnPoint{Float64}\nn\nnjulia> Point(1,2)\nnPoint{Int64}(1,2)\nn\nnjulia> typeof(ans)\nnPoint{Int64}In the case of Point, the type of T is unambiguously implied if and only if the two arguments to Point have the same type. When this isn't the case, the constructor will fail with a MethodError:julia> Point(1,2.5)\nnERROR: MethodError: no method matching Point{T}(::Int64, ::Float64)\nn...Constructor methods to appropriately handle such mixed cases can be defined, but that will not be discussed until later on in Constructors."
},

{
    "location": "manual/types.html#Parametric-Abstract-Types-1",
    "title": "Parametric Abstract Types",
    "category": "Section",
    "text": "Parametric abstract type declarations declare a collection of abstract types, in much the same way:abstract Pointy{T}With this declaration, Pointy{T} is a distinct abstract type for each type or integer value of T. As with parametric composite types, each such instance is a subtype of Pointy:julia> Pointy{Int64} <: Pointy\nntrue\nn\nnjulia> Pointy{1} <: Pointy\nntrueParametric abstract types are invariant, much as parametric composite types are:julia> Pointy{Float64} <: Pointy{Real}\nnfalse\nn\nnjulia> Pointy{Real} <: Pointy{Float64}\nnfalseMuch as plain old abstract types serve to create a useful hierarchy of types over concrete types, parametric abstract types serve the same purpose with respect to parametric composite types. We could, for example, have declared Point{T} to be a subtype of Pointy{T} as follows:type Point{T} <: Pointy{T}\nn  x::T\nn  y::T\nnendGiven such a declaration, for each choice of T, we have Point{T} as a subtype of Pointy{T}:julia> Point{Float64} <: Pointy{Float64}\nntrue\nn\nnjulia> Point{Real} <: Pointy{Real}\nntrue\nn\nnjulia> Point{AbstractString} <: Pointy{AbstractString}\nntrueThis relationship is also invariant:julia> Point{Float64} <: Pointy{Real}\nnfalseWhat purpose do parametric abstract types like Pointy serve? Consider if we create a point-like implementation that only requires a single coordinate because the point is on the diagonal line x = y:type DiagPoint{T} <: Pointy{T}\nn  x::T\nnendNow both Point{Float64} and DiagPoint{Float64} are implementations of the Pointy{Float64} abstraction, and similarly for every other possible choice of type T. This allows programming to a common interface shared by all Pointy objects, implemented for both Point and DiagPoint. This cannot be fully demonstrated, however, until we have introduced methods and dispatch in the next section, Methods.There are situations where it may not make sense for type parameters to range freely over all possible types. In such situations, one can constrain the range of T like so:abstract Pointy{T<:Real}With such a declaration, it is acceptable to use any type that is a subtype of Real in place of T, but not types that are not subtypes of Real:julia> Pointy{Float64}\nnPointy{Float64}\nn\nnjulia> Pointy{Real}\nnPointy{Real}\nn\nnjulia> Pointy{AbstractString}\nnERROR: TypeError: Pointy: in T, expected T<:Real, got Type{AbstractString}\nn ...\nn\nnjulia> Pointy{1}\nnERROR: TypeError: Pointy: in T, expected T<:Real, got Int64\nn ...Type parameters for parametric composite types can be restricted in the same manner:type Point{T<:Real} <: Pointy{T}\nn  x::T\nn  y::T\nnendTo give a real-world example of how all this parametric type machinery can be useful, here is the actual definition of Julia's Rational immutable type (except that we omit the constructor here for simplicity), representing an exact ratio of integers:immutable Rational{T<:Integer} <: Real\nn  num::T\nn  den::T\nnendIt only makes sense to take ratios of integer values, so the parameter type T is restricted to being a subtype of Integer, and a ratio of integers represents a value on the real number line, so any Rational is an instance of the Real abstraction."
},

{
    "location": "manual/types.html#Tuple-Types-1",
    "title": "Tuple Types",
    "category": "Section",
    "text": "Tuples are an abstraction of the arguments of a function – without the function itself. The salient aspects of a function's arguments are their order and their types. Therefore a tuple type is similar to a parameterized immutable type where each parameter is the type of one field. For example, a 2-element tuple type resembles the following immutable type:immutable Tuple2{A,B}\nn  a::A\nn  b::B\nnendHowever, there are three key differences:Tuple types may have any number of parameters.\nnTuple types are covariant in their parameters: Tuple{Int} is a subtype of Tuple{Any}. Therefore Tuple{Any} is considered an abstract type, and tuple types are only concrete if their parameters are.\nnTuples do not have field names; fields are only accessed by index.Tuple values are written with parentheses and commas. When a tuple is constructed, an appropriate tuple type is generated on demand:julia> typeof((1,\"foo\",2.5))\nnTuple{Int64,String,Float64}Note the implications of covariance:julia> Tuple{Int,AbstractString} <: Tuple{Real,Any}\nntrue\nn\nnjulia> Tuple{Int,AbstractString} <: Tuple{Real,Real}\nnfalse\nn\nnjulia> Tuple{Int,AbstractString} <: Tuple{Real,}\nnfalseIntuitively, this corresponds to the type of a function's arguments being a subtype of the function's signature (when the signature matches)."
},

{
    "location": "manual/types.html#Vararg-Tuple-Types-1",
    "title": "Vararg Tuple Types",
    "category": "Section",
    "text": "The last parameter of a tuple type can be the special type Vararg, which denotes any number of trailing elements:julia> isa((\"1\",), Tuple{AbstractString,Vararg{Int}})\nntrue\nn\nnjulia> isa((\"1\",1), Tuple{AbstractString,Vararg{Int}})\nntrue\nn\nnjulia> isa((\"1\",1,2), Tuple{AbstractString,Vararg{Int}})\nntrue\nn\nnjulia> isa((\"1\",1,2,3.0), Tuple{AbstractString,Vararg{Int}})\nnfalseNotice that Vararg{T} corresponds to zero or more elements of type T. Vararg tuple types are used to represent the arguments accepted by varargs methods (see Varargs Functions).The type Vararg{T,N} corresponds to exactly N elements of type T.  NTuple{N,T} is a convenient alias for Tuple{Vararg{T,N}}, i.e. a tuple type containing exactly N elements of type T."
},

{
    "location": "manual/types.html#Singleton-Types-1",
    "title": "Singleton Types",
    "category": "Section",
    "text": "There is a special kind of abstract parametric type that must be mentioned here: singleton types. For each type, T, the \"singleton type\" Type{T} is an abstract type whose only instance is the object T. Since the definition is a little difficult to parse, let's look at some examples:julia> isa(Float64, Type{Float64})\nntrue\nn\nnjulia> isa(Real, Type{Float64})\nnfalse\nn\nnjulia> isa(Real, Type{Real})\nntrue\nn\nnjulia> isa(Float64, Type{Real})\nnfalseIn other words, isa(A,Type{B}) is true if and only if A and B are the same object and that object is a type. Without the parameter, Type is simply an abstract type which has all type objects as its instances, including, of course, singleton types:julia> isa(Type{Float64},Type)\nntrue\nn\nnjulia> isa(Float64,Type)\nntrue\nn\nnjulia> isa(Real,Type)\nntrueAny object that is not a type is not an instance of Type:julia> isa(1,Type)\nnfalse\nn\nnjulia> isa(\"foo\",Type)\nnfalseUntil we discuss Parametric Methods and conversions, it is difficult to explain the utility of the singleton type construct, but in short, it allows one to specialize function behavior on specific type values. This is useful for writing methods (especially parametric ones) whose behavior depends on a type that is given as an explicit argument rather than implied by the type of one of its arguments.A few popular languages have singleton types, including Haskell, Scala and Ruby. In general usage, the term \"singleton type\" refers to a type whose only instance is a single value. This meaning applies to Julia's singleton types, but with that caveat that only type objects have singleton types."
},

{
    "location": "manual/types.html#Parametric-Bits-Types-1",
    "title": "Parametric Bits Types",
    "category": "Section",
    "text": "Bits types can also be declared parametrically. For example, pointers are represented as boxed bits types which would be declared in Julia like this:# 32-bit system:\nnbitstype 32 Ptr{T}\nn\nn# 64-bit system:\nnbitstype 64 Ptr{T}The slightly odd feature of these declarations as compared to typical parametric composite types, is that the type parameter T is not used in the definition of the type itself – it is just an abstract tag, essentially defining an entire family of types with identical structure, differentiated only by their type parameter. Thus, Ptr{Float64} and Ptr{Int64} are distinct types, even though they have identical representations. And of course, all specific pointer types are subtype of the umbrella Ptr type:julia> Ptr{Float64} <: Ptr\nntrue\nn\nnjulia> Ptr{Int64} <: Ptr\nntrue"
},

{
    "location": "manual/types.html#Type-Aliases-1",
    "title": "Type Aliases",
    "category": "Section",
    "text": "Sometimes it is convenient to introduce a new name for an already expressible type. For such occasions, Julia provides the typealias mechanism. For example, UInt is type aliased to either UInt32 or UInt64 as is appropriate for the size of pointers on the system:# 32-bit system:\nnjulia> UInt\nnUInt32\nn\nn# 64-bit system:\nnjulia> UInt\nnUInt64This is accomplished via the following code in base/boot.jl:if is(Int,Int64)\nn    typealias UInt UInt64\nnelse\nn    typealias UInt UInt32\nnendOf course, this depends on what Int is aliased to – but that is predefined to be the correct type – either Int32 or Int64.For parametric types, typealias can be convenient for providing names for cases where some of the parameter choices are fixed. Julia's arrays have type Array{T,N} where T is the element type and N is the number of array dimensions. For convenience, writing Array{Float64} allows one to specify the element type without specifying the dimension:julia> Array{Float64,1} <: Array{Float64} <: Array\nntrueHowever, there is no way to equally simply restrict just the dimension but not the element type. Yet, one often needs to ensure an object is a vector or a matrix (imposing restrictions on the number of dimensions). For that reason, the following type aliases are provided:typealias Vector{T} Array{T,1}\nntypealias Matrix{T} Array{T,2}Writing Vector{Float64} is equivalent to writing Array{Float64,1}, and the umbrella type Vector has as instances all Array objects where the second parameter – the number of array dimensions – is 1, regardless of what the element type is. In languages where parametric types must always be specified in full, this is not especially helpful, but in Julia, this allows one to write just Matrix for the abstract type including all two-dimensional dense arrays of any element type.This declaration of Vector creates a subtype relation Vector{Int} <: Vector.  However, it is not always the case that a parametric typealias statement creates such a relation; for example, the statement:typealias AA{T} Array{Array{T,1},1}does not create the relation AA{Int} <: AA.  The reason is that Array{Array{T,1},1} is not an abstract type at all; in fact, it is a concrete type describing a 1-dimensional array in which each entry is an object of type Array{T,1} for some value of T."
},

{
    "location": "manual/types.html#Operations-on-Types-1",
    "title": "Operations on Types",
    "category": "Section",
    "text": "Since types in Julia are themselves objects, ordinary functions can operate on them. Some functions that are particularly useful for working with or exploring types have already been introduced, such as the <: operator, which indicates whether its left hand operand is a subtype of its right hand operand.The isa function tests if an object is of a given type and returns true or false:julia> isa(1,Int)\nntrue\nn\nnjulia> isa(1,AbstractFloat)\nnfalseThe typeof() function, already used throughout the manual in examples, returns the type of its argument. Since, as noted above, types are objects, they also have types, and we can ask what their types are:julia> typeof(Rational)\nnDataType\nn\nnjulia> typeof(Union{Real,Float64,Rational})\nnDataType\nn\nnjulia> typeof(Union{Real,String})\nnUnionWhat if we repeat the process? What is the type of a type of a type? As it happens, types are all composite values and thus all have a type of DataType:julia> typeof(DataType)\nnDataType\nn\nnjulia> typeof(Union)\nnDataTypeDataType is its own type.Another operation that applies to some types is supertype(), which reveals a type's supertype. Only declared types (DataType) have unambiguous supertypes:julia> supertype(Float64)\nnAbstractFloat\nn\nnjulia> supertype(Number)\nnAny\nn\nnjulia> supertype(AbstractString)\nnAny\nn\nnjulia> supertype(Any)\nnAnyIf you apply supertype() to other type objects (or non-type objects), a MethodError is raised:julia> supertype(Union{Float64,Int64})\nnERROR: `supertype` has no method matching supertype(::Type{Union{Float64,Int64}})"
},

{
    "location": "manual/types.html#\"Value-types\"-1",
    "title": "\"Value types\"",
    "category": "Section",
    "text": "In Julia, you can't dispatch on a value such as true or false. However, you can dispatch on parametric types, and Julia allows you to include \"plain bits\" values (Types, Symbols, Integers, floating-point numbers, tuples, etc.) as type parameters.  A common example is the dimensionality parameter in Array{T,N}, where T is a type (e.g., Float64) but N is just an Int.You can create your own custom types that take values as parameters, and use them to control dispatch of custom types. By way of illustration of this idea, let's introduce a parametric type, Val{T}, which serves as a customary way to exploit this technique for cases where you don't need a more elaborate hierarchy.Val is defined as:immutable Val{T}\nnendThere is no more to the implementation of Val than this.  Some functions in Julia's standard library accept Val types as arguments, and you can also use it to write your own functions.  For example:firstlast(::Type{Val{true}}) = \"First\"\nnfirstlast(::Type{Val{false}}) = \"Last\"\nn\nnjulia> firstlast(Val{true})\nn\"First\"\nn\nnjulia> firstlast(Val{false})\nn\"Last\"For consistency across Julia, the call site should always pass a Valtype rather than creating an instance, i.e., use foo(Val{:bar}) rather than foo(Val{:bar}()).It's worth noting that it's extremely easy to mis-use parametric \"value\" types, including Val; in unfavorable cases, you can easily end up making the performance of your code much worse.  In particular, you would never want to write actual code as illustrated above.  For more information about the proper (and improper) uses of Val, please read the more extensive discussion in the performance tips."
},

{
    "location": "manual/types.html#Nullable-Types:-Representing-Missing-Values-1",
    "title": "Nullable Types: Representing Missing Values",
    "category": "Section",
    "text": "In many settings, you need to interact with a value of type T that may or may not exist. To handle these settings, Julia provides a parametric type called Nullable{T}, which can be thought of as a specialized container type that can contain either zero or one values. Nullable{T} provides a minimal interface designed to ensure that interactions with missing values are safe. At present, the interface consists of four possible interactions:Construct a Nullable object.\nnCheck if a Nullable object has a missing value.\nnAccess the value of a Nullable object with a guarantee that a NullException will be thrown if the object's value is missing.\nnAccess the value of a Nullable object with a guarantee that a default value of type T will be returned if the object's value is missing."
},

{
    "location": "manual/types.html#Constructing-[Nullable](@ref)-objects-1",
    "title": "Constructing Nullable objects",
    "category": "Section",
    "text": "To construct an object representing a missing value of type T, use the Nullable{T}() function:julia> x1 = Nullable{Int64}()\nnNullable{Int64}()\nn\nnjulia> x2 = Nullable{Float64}()\nnNullable{Float64}()\nn\nnjulia> x3 = Nullable{Vector{Int64}}()\nnNullable{Array{Int64,1}}()To construct an object representing a non-missing value of type T, use the Nullable(x::T) function:julia> x1 = Nullable(1)\nnNullable{Int64}(1)\nn\nnjulia> x2 = Nullable(1.0)\nnNullable{Float64}(1.0)\nn\nnjulia> x3 = Nullable([1, 2, 3])\nnNullable{Array{Int64,1}}([1,2,3])Note the core distinction between these two ways of constructing a Nullable object: in one style, you provide a type, T, as a function parameter; in the other style, you provide a single value of type T as an argument."
},

{
    "location": "manual/types.html#Checking-if-a-[Nullable](@ref)-object-has-a-value-1",
    "title": "Checking if a Nullable object has a value",
    "category": "Section",
    "text": "You can check if a Nullable object has any value using isnull():julia> isnull(Nullable{Float64}())\nntrue\nn\nnjulia> isnull(Nullable(0.0))\nnfalse"
},

{
    "location": "manual/unicode-input.html",
    "title": "Unicode Input",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/variables-and-scoping.html",
    "title": "Scope of Variables",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/variables-and-scoping.html#Scope-of-Variables-1",
    "title": "Scope of Variables",
    "category": "Section",
    "text": "The scope of a variable is the region of code within which a variable is visible. Variable scoping helps avoid variable naming conflicts. The concept is intuitive: two functions can both have arguments called x without the two x's referring to the same thing. Similarly there are many other cases where different blocks of code can use the same name without referring to the same thing. The rules for when the same variable name does or doesn't refer to the same thing are called scope rules; this section spells them out in detail.Certain constructs in the language introduce scope blocks, which are regions of code that are eligible to be the scope of some set of variables. The scope of a variable cannot be an arbitrary set of source lines; instead, it will always line up with one of these blocks.  There are two main types of scopes in Julia, global scope and local scope, the latter can be nested.  The constructs introducing scope blocks are:Scope name block/construct introducing this kind of scope\nnglobal module, baremodule, at interactive prompt (REPL)\nnlocal soft: for, while, comprehensions, try-catch-finally, let\nnlocal hard: functions (either syntax, anonymous & do-blocks), type, immutable, macroNotably missing from this table are begin blocks and if blocks, which do not introduce new scope blocks.  All three types of scopes follow somewhat different rules which will be explained below as well as some extra rules for certain blocks.Julia uses lexical scoping, meaning that a function's scope does not inherit from its caller's scope, but from the scope in which the function was defined. For example, in the following code the x inside foo refers to the x in the global scope of its module Bar:module Bar\nnx = 1\nnfoo() = x\nnendand not a x in the scope where foo is used:julia> import Bar\nn\nnjulia> x = -1;\nn\nnjulia> Bar.foo()\nn1Thus lexical scope means that the scope of variables can be inferred from the source code alone."
},

{
    "location": "manual/variables-and-scoping.html#Global-Scope-1",
    "title": "Global Scope",
    "category": "Section",
    "text": "Each module introduces a new global scope, separate from the global scope of all other modules; there is no all-encompassing global scope. Modules can introduce variables of other modules into their scope through the using or import statements or through qualified access using the dot-notation, i.e. each module is a so-called namespace.  Note that variable bindings can only be changed within their global scope and not from an outside module.module A\nna = 1 # a global in A's scope\nnend\nn\nnmodule B\nn# b = a # would error as B's global scope is separate from A's\nn    module C\nn    c = 2\nn    end\nnb = C.c # can access the namespace of a nested global scope\nn        # through a qualified access\nnimport A # makes module A available\nnd = A.a\nn# A.a = 2 # would error with: \"ERROR: cannot assign variables in other modules\"\nnendNote that the interactive prompt (aka REPL) is in the global scope of the module Main."
},

{
    "location": "manual/variables-and-scoping.html#Local-Scope-1",
    "title": "Local Scope",
    "category": "Section",
    "text": "A new local scope is introduced by most code-blocks, see above table for a complete list.  A local scope usually inherits all the variables from its parent scope, both for reading and writing.  There are two subtypes of local scopes, hard and soft, with slightly different rules concerning what variables are inherited.  Unlike global scopes, local scopes are not namespaces, thus variables in an inner scope cannot be retrieved from the parent scope through some sort of qualified access.The following rules and examples pertain to both hard and soft local scopes.  A newly introduced variable in a local scope does not back-propagate to its parent scope.  For example, here the z is not introduced into the top-level scope:for i=1:10\nn    z = i\nnend\nn\nnjulia> z\nnERROR: UndefVarError: z not defined(Note, in this and all following examples it is assumed that their top-level is a global scope with a clean workspace, for instance a newly started REPL.)Inside a local scope a variable can be forced to be a local variable using the local keyword:x = 0\nnfor i=1:10\nn    local x\nn    x = i + 1\nnend\nn\nnjulia> x\nn0Inside a local scope a new global variable can be defined using the keyword global:for i=1:10\nn    global z\nn    z = i\nnend\nn\nnjulia> z\nn10The location of both the local and global keywords within the scope block is irrelevant.  The following is equivalent to the last example (although stylistically worse):for i=1:10\nn    z = i\nn    global z\nnend\nn\nnjulia> z\nn10Multiple global or local definitions can be on one line and can also be paired with assignments:for i=1:10\nn    global x=i, y, z\nn    local a=4, b , c=1\nnend"
},

{
    "location": "manual/variables-and-scoping.html#Soft-Local-Scope-1",
    "title": "Soft Local Scope",
    "category": "Section",
    "text": "Soft local scopes are introduced by for-loops, while-loops, comprehensions, try-catch-finally-blocks, and let-blocks.  There are some extra rules for let-blocks and for for-loops and comprehensions.In the following example the x and y refer always to the same variables as the soft local scope inherits both read and write variables:x,y = 0, 1\nnfor i = 1:10\nn    x = i + y + 1\nnend\nn\nnjulia> x\nn12Within soft scopes, the global keyword is never necessary, although allowed.  The only case when it would change the semantics is (currently) a syntax error:let\nn    local x = 2\nn    let\nn        global x = 3\nn    end\nnend\nn\nn# ERROR: syntax: `global x`: x is local variable in the enclosing scope"
},

{
    "location": "manual/variables-and-scoping.html#Hard-Local-Scope-1",
    "title": "Hard Local Scope",
    "category": "Section",
    "text": "Hard local scopes are introduced by function definitions (in all their forms), type & immutable-blocks, and macro-definitions.In a hard local scope, all variables are inherited from its parent scope unless:an assignment would result in a modified global variable, or\nna variable is specifically marked with the keyword local.Thus global variables are only inherited for reading but not for writing:x,y = 1,2\nnfunction foo()\nn    x = 2 # assignment introduces a new local\nn    return x + y # y refers to the global\nnend\nn\nnjulia> foo()\nn4\nn\nnjulia> x\nn1An explicit global is needed to assign to a global variable:x = 1\nnfunction foo()\nn    global x = 2\nnend\nnfoo()\nn\nnjulia> x\nn2Note that nested functions can behave differently to functions defined in the global scope as they can modify their parent scope's local variables:x,y = 1,2\nnfunction foo()\nn    x = 2 # introduces a new local\nn    function bar()\nn        x = 10 # modifies the parent's x\nn        return x+y # y is global\nn    end\nn    return bar() + x # 12 + 10 (x is modified in call of bar())\nnend\nn\nnjulia> foo()\nn22  # (x,y unchanged)The distinction between inheriting global and local variables for assignment can lead to some slight differences between functions defined in local vs. global scopes.  Consider the modification of the last example by moving bar to the global scope:x,y = 1,2\nnfunction bar()\nn    x = 10 # local\nn    return x+y\nnend\nnfunction foo()\nn    x = 2 # local\nn    return bar() + x # 12 + 2 (x is not modified)\nnend\nn\nnjulia> foo()\nn14 # as x is not modified anymore.\nn   # (x,y unchanged)Note that above subtlety does not pertain to type and macro definitions as they can only appear at the global scope. There are special scoping rules concerning the evaluation of default and keyword function arguments which are described in the Function section.An assignment introducing a variable used inside a function, type or macro definition need not come before its inner usage:julia> f = y -> x + y\nn(::#1) (generic function with 1 method)\nn\nnjulia> f(3)\nnERROR: UndefVarError: x not defined\nn in (::##1#2)(::Int64) at ./none:1\nn ...\nn\nnjulia> x = 1\nn1\nn\nnjulia> f(3)\nn4This behavior may seem slightly odd for a normal variable, but allows for named functions – which are just normal variables holding function objects – to be used before they are defined. This allows functions to be defined in whatever order is intuitive and convenient, rather than forcing bottom up ordering or requiring forward declarations, as long as they are defined by the time they are actually called.  As an example, here is an inefficient, mutually recursive way to test if positive integers are even or odd:even(n) = n == 0 ? true  :  odd(n-1)\nnodd(n)  = n == 0 ? false : even(n-1)\nn\nnjulia> even(3)\nnfalse\nn\nnjulia> odd(3)\nntrueJulia provides built-in, efficient functions to test for oddness and evenness called iseven() and isodd() so the above definitions should only be taken as examples."
},

{
    "location": "manual/variables-and-scoping.html#Hard-vs.-Soft-Local-Scope-1",
    "title": "Hard vs. Soft Local Scope",
    "category": "Section",
    "text": "Blocks which introduce a soft local scope, such as loops, are generally used to manipulate the variables in their parent scope. Thus their default is to fully access all variables in their parent scope.Conversely, the code inside blocks which introduce a hard local scope (function, type, and macro definitions) can be executed at any place in a program.  Remotely changing the state of global variables in other modules should be done with care and thus this is an opt-in feature requiring the global keyword.The reason to allow modifying local variables of parent scopes in nested functions is to allow constructing closures which have a private state, for instance the state variable in the following example:let\nn    state = 0\nn    global counter\nn    counter() = state += 1\nnend\nn\nnjulia> counter()\nn1\nn\nnjulia> counter()\nn2See also the closures in the examples in the next two sections."
},

{
    "location": "manual/variables-and-scoping.html#Let-Blocks-1",
    "title": "Let Blocks",
    "category": "Section",
    "text": "Unlike assignments to local variables, let statements allocate new variable bindings each time they run. An assignment modifies an existing value location, and let creates new locations. This difference is usually not important, and is only detectable in the case of variables that outlive their scope via closures. The let syntax accepts a comma-separated series of assignments and variable names:let var1 = value1, var2, var3 = value3\nn    code\nnendThe assignments are evaluated in order, with each right-hand side evaluated in the scope before the new variable on the left-hand side has been introduced. Therefore it makes sense to write something like let x = x since the two x variables are distinct and have separate storage. Here is an example where the behavior of let is needed:Fs = Array{Any}(2)\nni = 1\nnwhile i <= 2\nn    Fs[i] = ()->i\nn    i += 1\nnend\nn\nnjulia> Fs[1]()\nn3\nn\nnjulia> Fs[2]()\nn3Here we create and store two closures that return variable i. However, it is always the same variable i, so the two closures behave identically. We can use let to create a new binding for i:Fs = Array{Any}(2)\nni = 1\nnwhile i <= 2\nn    let i = i\nn        Fs[i] = ()->i\nn    end\nn    i += 1\nnend\nn\nnjulia> Fs[1]()\nn1\nn\nnjulia> Fs[2]()\nn2Since the begin construct does not introduce a new scope, it can be useful to use a zero-argument let to just introduce a new scope block without creating any new bindings:julia> let\nn           local x = 1\nn           let\nn               local x = 2\nn           end\nn           x\nn       end\nn1Since let introduces a new scope block, the inner local x is a different variable than the outer local x."
},

{
    "location": "manual/variables-and-scoping.html#For-Loops-and-Comprehensions-1",
    "title": "For Loops and Comprehensions",
    "category": "Section",
    "text": "for loops and comprehensions have the following behavior: any new variables introduced in their body scopes are freshly allocated for each loop iteration.  This is in contrast to while loops which reuse the variables for all iterations. Therefore these constructs are similar to while loops with let blocks inside:Fs = Array{Any}(2)\nnfor i = 1:2\nn    Fs[i] = ()->i\nnend\nn\nnjulia> Fs[1]()\nn1\nn\nnjulia> Fs[2]()\nn2for loops will reuse existing variables for its iteration variable:i = 0\nnfor i = 1:3\nnend\nni  # here equal to 3However, comprehensions do not do this, and always freshly allocate their iteration variables:x = 0\nn[ x for x=1:3 ]\nnx  # here still equal to 0"
},

{
    "location": "manual/variables.html",
    "title": "Variables",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/variables.html#Variables-1",
    "title": "Variables",
    "category": "Section",
    "text": "A variable, in Julia, is a name associated (or bound) to a value. It's useful when you want to store a value (that you obtained after some math, for example) for later use. For example:# Assign the value 10 to the variable x\nnjulia> x = 10\nn10\nn\nn# Doing math with x's value\nnjulia> x + 1\nn11\nn\nn# Reassign x's value\nnjulia> x = 1 + 1\nn2\nn\nn# You can assign values of other types, like strings of text\nnjulia> x = \"Hello World!\"\nn\"Hello World!\"Julia provides an extremely flexible system for naming variables. Variable names are case-sensitive, and have no semantic meaning (that is, the language will not treat variables differently based on their names).julia> x = 1.0\nn1.0\nn\nnjulia> y = -3\nn-3\nn\nnjulia> Z = \"My string\"\nn\"My string\"\nn\nnjulia> customary_phrase = \"Hello world!\"\nn\"Hello world!\"\nn\nnjulia> UniversalDeclarationOfHumanRightsStart = \"人人生而自由，在尊严和权利上一律平等。\"\nn\"人人生而自由，在尊严和权利上一律平等。\"Unicode names (in UTF-8 encoding) are allowed:julia> δ = 0.00001\nn1.0e-5\nn\nnjulia> 안녕하세요 = \"Hello\"\nn\"Hello\"In the Julia REPL and several other Julia editing environments, you can type many Unicode math symbols by typing the backslashed LaTeX symbol name followed by tab.  For example, the variable name δ can be entered by typing \delta-tab, or even α̂₂ by \alpha-tab-\hat-tab-\_2-tab.Julia will even let you redefine built-in constants and functions if needed:julia> pi\nnπ = 3.1415926535897...\nn\nnjulia> pi = 3\nnWARNING: imported binding for pi overwritten in module Main\nn3\nn\nnjulia> pi\nn3\nn\nnjulia> sqrt(100)\nn10.0\nn\nnjulia> sqrt = 4\nnWARNING: imported binding for sqrt overwritten in module Main\nn4However, this is obviously not recommended to avoid potential confusion."
},

{
    "location": "manual/variables.html#Allowed-Variable-Names-1",
    "title": "Allowed Variable Names",
    "category": "Section",
    "text": "Variable names must begin with a letter (A-Z or a-z), underscore, or a subset of Unicode code points greater than 00A0; in particular, Unicode character categories Lu/Ll/Lt/Lm/Lo/Nl (letters), Sc/So (currency and other symbols), and a few other letter-like characters (e.g. a subset of the Sm math symbols) are allowed. Subsequent characters may also include ! and digits (0-9 and other characters in categories Nd/No), as well as other Unicode code points: diacritics and other modifying marks (categories Mn/Mc/Me/Sk), some punctuation connectors (category Pc), primes, and a few other characters.Operators like + are also valid identifiers, but are parsed specially. In some contexts, operators can be used just like variables; for example (+) refers to the addition function, and (+) = f will reassign it.  Most of the Unicode infix operators (in category Sm), such as ⊕, are parsed as infix operators and are available for user-defined methods (e.g. you can use const ⊗ = kron to define ⊗ as an infix Kronecker product).The only explicitly disallowed names for variables are the names of built-in statements:julia> else = false\nnERROR: syntax: unexpected \"else\"\nn ...\nn\nnjulia> try = \"No\"\nnERROR: syntax: unexpected \"=\"\nn ..."
},

{
    "location": "manual/workflow-tips.html",
    "title": "Workflow Tips",
    "category": "Page",
    "text": ""
},

{
    "location": "manual/workflow-tips.html#Workflow-Tips-1",
    "title": "Workflow Tips",
    "category": "Section",
    "text": "Here are some tips for working with Julia efficiently."
},

{
    "location": "manual/workflow-tips.html#REPL-based-workflow-1",
    "title": "REPL-based workflow",
    "category": "Section",
    "text": "As already elaborated in Interacting With Julia, Julia's REPL provides rich functionality that facilitates an efficient interactive workflow. Here are some tips that might further enhance your experience at the command line."
},

{
    "location": "manual/workflow-tips.html#A-basic-editor/REPL-workflow-1",
    "title": "A basic editor/REPL workflow",
    "category": "Section",
    "text": "The most basic Julia workflows involve using a text editor in conjunction with the julia command line. A common pattern includes the following elements:Put code under development in a temporary module. Create a file, say Tmp.jl, and include within it\nnmodule Tmp\nn\nn<your definitions here>\nn\nnend\nnPut your test code in another file. Create another file, say tst.jl, which begins with\nnimport Tmp\nnand includes tests for the contents of Tmp. The value of using import versus using is that you can call reload(\"Tmp\") instead of having to restart the REPL when your definitions change. Of course, the cost is the need to prepend Tmp. to uses of names defined in your module. (You can lower that cost by keeping your module name short.)\nnAlternatively, you can wrap the contents of your test file in a module, as\nnmodule Tst\nn    using Tmp\nn\nn    <scratch work>\nn\nnend\nnThe advantage is that you can now do usingTmp in your test code and can therefore avoid prepending Tmp. everywhere. The disadvantage is that code can no longer be selectively copied to the REPL without some tweaking.\nnLather. Rinse. Repeat. Explore ideas at the julia command prompt. Save good ideas in tst.jl. Occasionally restart the REPL, issuing\nnreload(\"Tmp\")\nninclude(\"tst.jl\")"
},

{
    "location": "manual/workflow-tips.html#Simplify-initialization-1",
    "title": "Simplify initialization",
    "category": "Section",
    "text": "To simplify restarting the REPL, put project-specific initialization code in a file, say _init.jl, which you can run on startup by issuing the command:julia -L _init.jlIf you further add the following to your .juliarc.jl fileisfile(\"_init.jl\") && include(joinpath(pwd(), \"_init.jl\"))then calling julia from that directory will run the initialization code without the additional command line argument."
},

{
    "location": "stdlib/arrays.html",
    "title": "Arrays",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/arrays.html#Arrays-1",
    "title": "Arrays",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/arrays.html#Basic-functions-1",
    "title": "Basic functions",
    "category": "Section",
    "text": "Base.ndims\nnBase.size\nnBase.indices\nnBase.indices\nnBase.length\nnBase.eachindex\nnBase.linearindices\nnBase.linearindexing\nnBase.countnz\nnBase.conj!\nnBase.stride\nnBase.strides\nnBase.ind2sub\nnBase.ind2sub\nnBase.sub2ind\nnBase.LinAlg.checksquare"
},

{
    "location": "stdlib/arrays.html#Constructors-1",
    "title": "Constructors",
    "category": "Section",
    "text": "Core.Array\nnBase.getindex\nnBase.zeros\nnBase.zeros\nnBase.ones\nnBase.ones\nnBase.trues\nnBase.trues\nnBase.falses\nnBase.falses\nnBase.fill\nnBase.fill!\nnBase.reshape\nnBase.similar\nnBase.similar\nnBase.reinterpret\nnBase.eye\nnBase.eye\nnBase.eye\nnBase.linspace\nnBase.logspace"
},

{
    "location": "stdlib/arrays.html#Base.Broadcast.broadcast",
    "title": "Base.Broadcast.broadcast",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/arrays.html#Base.Broadcast.broadcast!",
    "title": "Base.Broadcast.broadcast!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/arrays.html#Base.Broadcast.bitbroadcast",
    "title": "Base.Broadcast.bitbroadcast",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/arrays.html#Mathematical-operators-and-functions-1",
    "title": "Mathematical operators and functions",
    "category": "Section",
    "text": "All mathematical operations and functions are supported for arraysBase.Broadcast.broadcast\nnBase.Broadcast.broadcast!\nnBase.Broadcast.bitbroadcast"
},

{
    "location": "stdlib/arrays.html#Indexing,-Assignment,-and-Concatenation-1",
    "title": "Indexing, Assignment, and Concatenation",
    "category": "Section",
    "text": "Base.getindex\nnBase.view\nnBase.@view\nnBase.parent\nnBase.parentindexes\nnBase.slicedim\nnBase.setindex!\nnBase.Broadcast.broadcast_getindex\nnBase.Broadcast.broadcast_setindex!\nnBase.isassigned\nnBase.cat\nnBase.vcat\nnBase.hcat\nnBase.hvcat\nnBase.flipdim\nnBase.circshift\nnBase.find\nnBase.find\nnBase.findn\nnBase.findnz\nnBase.findfirst\nnBase.findfirst\nnBase.findfirst\nnBase.findlast\nnBase.findlast\nnBase.findlast\nnBase.findnext\nnBase.findnext\nnBase.findnext\nnBase.findprev\nnBase.findprev\nnBase.findprev\nnBase.permutedims\nnBase.ipermutedims\nnBase.permutedims!\nnBase.squeeze\nnBase.vec\nnBase.promote_shape\nnBase.checkbounds\nnBase.checkbounds\nnBase.checkindex\nnBase.Random.randsubseq\nnBase.Random.randsubseq!"
},

{
    "location": "stdlib/arrays.html#Array-functions-1",
    "title": "Array functions",
    "category": "Section",
    "text": "Base.cumprod\nnBase.cumprod!\nnBase.cumsum\nnBase.cumsum!\nnBase.cumsum_kbn\nnBase.cummin\nnBase.cummax\nnBase.LinAlg.diff\nnBase.LinAlg.gradient\nnBase.rot180\nnBase.rot180\nnBase.rotl90\nnBase.rotl90\nnBase.rotr90\nnBase.rotr90\nnBase.reducedim\nnBase.mapreducedim\nnBase.mapslices\nnBase.sum_kbn"
},

{
    "location": "stdlib/arrays.html#Combinatorics-1",
    "title": "Combinatorics",
    "category": "Section",
    "text": "Base.Random.randperm\nnBase.invperm\nnBase.isperm\nnBase.permute!\nnBase.ipermute!\nnBase.Random.randcycle\nnBase.Random.shuffle\nnBase.Random.shuffle!\nnBase.reverse\nnBase.reverseind\nnBase.reverse!"
},

{
    "location": "stdlib/arrays.html#BitArrays-1",
    "title": "BitArrays",
    "category": "Section",
    "text": "BitArrays are space-efficient \"packed\" boolean arrays, which store one bit per boolean value.  They can be used similarly to Array{Bool} arrays (which store one byte per boolean value), and can be converted to/from the latter via Array(bitarray) and BitArray(array), respectively.Base.flipbits!\nnBase.rol!\nnBase.rol!\nnBase.rol\nnBase.ror!\nnBase.ror!\nnBase.ror"
},

{
    "location": "stdlib/base.html",
    "title": "Essentials",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/base.html#Essentials-1",
    "title": "Essentials",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/base.html#Introduction-1",
    "title": "Introduction",
    "category": "Section",
    "text": "The Julia standard library contains a range of functions and macros appropriate for performing scientific and numerical computing, but is also as broad as those of many general purpose programming languages.  Additional functionality is available from a growing collection of available packages. Functions are grouped by topic below.Some general notes:Except for functions in built-in modules (Pkg, Collections, Test and Profile), all functions documented here are directly available for use in programs.\nnTo use module functions, use import Module to import the module, and Module.fn(x) to use the functions.\nnAlternatively, using Module will import all exported Module functions into the current namespace.\nnBy convention, function names ending with an exclamation point (!) modify their arguments.  Some functions have both modifying (e.g., sort!) and non-modifying (sort) versions."
},

{
    "location": "stdlib/base.html#Getting-Around-1",
    "title": "Getting Around",
    "category": "Section",
    "text": "Base.exit\nnBase.quit\nnBase.atexit\nnBase.atreplinit\nnBase.isinteractive\nnBase.whos\nnBase.summarysize\nnBase.edit\nnBase.edit\nnBase.@edit\nnBase.less\nnBase.less\nnBase.@less\nnBase.clipboard\nnBase.clipboard\nnBase.reload\nnBase.require\nnBase.compilecache\nnBase.__precompile__\nnBase.include_from_node1\nnBase.include_string\nnBase.include_dependency\nnBase.Docs.apropos\nnBase.which\nnBase.which\nnBase.@which\nnBase.methods\nnBase.methodswith\nnBase.@show\nnBase.versioninfo\nnBase.workspace\nnans"
},

{
    "location": "stdlib/base.html#Core.is",
    "title": "Core.is",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.isa",
    "title": "Core.isa",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.isequal",
    "title": "Base.isequal",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.isless",
    "title": "Base.isless",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.ifelse",
    "title": "Base.ifelse",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.lexcmp",
    "title": "Base.lexcmp",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.lexless",
    "title": "Base.lexless",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.typeof",
    "title": "Core.typeof",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.tuple",
    "title": "Core.tuple",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.ntuple",
    "title": "Base.ntuple",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.object_id",
    "title": "Base.object_id",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.hash",
    "title": "Base.hash",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.finalizer",
    "title": "Base.finalizer",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.finalize",
    "title": "Base.finalize",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.copy",
    "title": "Base.copy",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.deepcopy",
    "title": "Base.deepcopy",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.isdefined",
    "title": "Core.isdefined",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.convert",
    "title": "Base.convert",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.promote",
    "title": "Base.promote",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.oftype",
    "title": "Base.oftype",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.widen",
    "title": "Base.widen",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.identity",
    "title": "Base.identity",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#All-Objects-1",
    "title": "All Objects",
    "category": "Section",
    "text": "Core.is\nnCore.isa\nnBase.isequal\nnBase.isless\nnBase.ifelse\nnBase.lexcmp\nnBase.lexless\nnCore.typeof\nnCore.tuple\nnBase.ntuple\nnBase.object_id\nnBase.hash\nnBase.finalizer\nnBase.finalize\nnBase.copy\nnBase.deepcopy\nnCore.isdefined\nnBase.convert\nnBase.promote\nnBase.oftype\nnBase.widen\nnBase.identity"
},

{
    "location": "stdlib/base.html#Types-1",
    "title": "Types",
    "category": "Section",
    "text": "Base.supertype\nnCore.issubtype\nnBase.:<:\nnBase.subtypes\nnBase.typemin\nnBase.typemax\nnBase.realmin\nnBase.realmax\nnBase.maxintfloat\nnBase.sizeof\nnBase.eps\nnBase.eps\nnBase.eps\nnBase.promote_type\nnBase.promote_rule\nnCore.getfield\nnCore.setfield!\nnBase.fieldoffset\nnCore.fieldtype\nnBase.isimmutable\nnBase.isbits\nnBase.isleaftype\nnBase.typejoin\nnBase.typeintersect\nnBase.Val\nnBase.Enums.@enum\nnBase.instances"
},

{
    "location": "stdlib/base.html#Base.method_exists",
    "title": "Base.method_exists",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.applicable",
    "title": "Core.applicable",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.invoke",
    "title": "Core.invoke",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.|>",
    "title": "Base.|>",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Generic-Functions-1",
    "title": "Generic Functions",
    "category": "Section",
    "text": "Base.method_exists\nnCore.applicable\nnCore.invoke\nnBase.:|>"
},

{
    "location": "stdlib/base.html#Syntax-1",
    "title": "Syntax",
    "category": "Section",
    "text": "Base.eval\nnBase.@eval\nnBase.evalfile\nnBase.esc\nnBase.gensym\nnBase.@gensym\nnBase.parse\nnBase.parse"
},

{
    "location": "stdlib/base.html#Nullables-1",
    "title": "Nullables",
    "category": "Section",
    "text": "Base.Nullable\nnBase.get\nnBase.isnull"
},

{
    "location": "stdlib/base.html#System-1",
    "title": "System",
    "category": "Section",
    "text": "Base.run\nnBase.spawn\nnBase.DevNull\nnBase.success\nnBase.process_running\nnBase.process_exited\nnBase.kill\nnBase.Sys.set_process_title\nnBase.Sys.get_process_title\nnBase.readandwrite\nnBase.ignorestatus\nnBase.detach\nnBase.Cmd\nnBase.setenv\nnBase.withenv\nnBase.pipeline\nnBase.pipeline\nnBase.Libc.gethostname\nnBase.getipaddr\nnBase.Libc.getpid\nnBase.Libc.time\nnBase.time_ns\nnBase.tic\nnBase.toc\nnBase.toq\nnBase.@time\nnBase.@timev\nnBase.@timed\nnBase.@elapsed\nnBase.@allocated\nnBase.EnvHash\nnBase.ENV\nnBase.is_unix\nnBase.is_apple\nnBase.is_linux\nnBase.is_bsd\nnBase.is_windows\nnBase.Sys.windows_version\nnBase.@static"
},

{
    "location": "stdlib/base.html#Base.error",
    "title": "Base.error",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.throw",
    "title": "Core.throw",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.rethrow",
    "title": "Base.rethrow",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.backtrace",
    "title": "Base.backtrace",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.catch_backtrace",
    "title": "Base.catch_backtrace",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.assert",
    "title": "Base.assert",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.@assert",
    "title": "Base.@assert",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.ArgumentError",
    "title": "Base.ArgumentError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.AssertionError",
    "title": "Base.AssertionError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.BoundsError",
    "title": "Core.BoundsError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.DimensionMismatch",
    "title": "Base.DimensionMismatch",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.DivideError",
    "title": "Core.DivideError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.DomainError",
    "title": "Core.DomainError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.EOFError",
    "title": "Base.EOFError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.ErrorException",
    "title": "Core.ErrorException",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.InexactError",
    "title": "Core.InexactError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.InterruptException",
    "title": "Core.InterruptException",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.KeyError",
    "title": "Base.KeyError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.LoadError",
    "title": "Base.LoadError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.MethodError",
    "title": "Base.MethodError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.NullException",
    "title": "Base.NullException",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.OutOfMemoryError",
    "title": "Core.OutOfMemoryError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.ReadOnlyMemoryError",
    "title": "Core.ReadOnlyMemoryError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.OverflowError",
    "title": "Core.OverflowError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.ParseError",
    "title": "Base.ParseError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.ProcessExitedException",
    "title": "Base.ProcessExitedException",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.StackOverflowError",
    "title": "Core.StackOverflowError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.SystemError",
    "title": "Base.SystemError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.TypeError",
    "title": "Core.TypeError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.UndefRefError",
    "title": "Core.UndefRefError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Core.UndefVarError",
    "title": "Core.UndefVarError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.InitError",
    "title": "Base.InitError",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.retry",
    "title": "Base.retry",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Errors-1",
    "title": "Errors",
    "category": "Section",
    "text": "Base.error\nnCore.throw\nnBase.rethrow\nnBase.backtrace\nnBase.catch_backtrace\nnBase.assert\nnBase.@assert\nnBase.ArgumentError\nnBase.AssertionError\nnCore.BoundsError\nnBase.DimensionMismatch\nnCore.DivideError\nnCore.DomainError\nnBase.EOFError\nnCore.ErrorException\nnCore.InexactError\nnCore.InterruptException\nnBase.KeyError\nnBase.LoadError\nnBase.MethodError\nnBase.NullException\nnCore.OutOfMemoryError\nnCore.ReadOnlyMemoryError\nnCore.OverflowError\nnBase.ParseError\nnBase.ProcessExitedException\nnCore.StackOverflowError\nnBase.SystemError\nnCore.TypeError\nnCore.UndefRefError\nnCore.UndefVarError\nnBase.InitError\nnBase.retry"
},

{
    "location": "stdlib/base.html#Events-1",
    "title": "Events",
    "category": "Section",
    "text": "Base.Timer\nnBase.Timer\nnBase.AsyncCondition\nnBase.AsyncCondition"
},

{
    "location": "stdlib/base.html#Reflection-1",
    "title": "Reflection",
    "category": "Section",
    "text": "Base.module_name\nnBase.module_parent\nnBase.current_module\nnBase.fullname\nnBase.names\nnCore.nfields\nnBase.fieldnames\nnBase.fieldname\nnBase.datatype_module\nnBase.isconst\nnBase.function_name\nnBase.function_module\nnBase.function_module\nnBase.functionloc\nnBase.functionloc\nnBase.@functionloc"
},

{
    "location": "stdlib/base.html#Base.gc",
    "title": "Base.gc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.gc_enable",
    "title": "Base.gc_enable",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.macroexpand",
    "title": "Base.macroexpand",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.expand",
    "title": "Base.expand",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.code_lowered",
    "title": "Base.code_lowered",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.@code_lowered",
    "title": "Base.@code_lowered",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.code_typed",
    "title": "Base.code_typed",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.@code_typed",
    "title": "Base.@code_typed",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.code_warntype",
    "title": "Base.code_warntype",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.@code_warntype",
    "title": "Base.@code_warntype",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.code_llvm",
    "title": "Base.code_llvm",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.@code_llvm",
    "title": "Base.@code_llvm",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.code_native",
    "title": "Base.code_native",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.@code_native",
    "title": "Base.@code_native",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/base.html#Base.precompile",
    "title": "Base.precompile",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/c.html",
    "title": "C Interface",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/c.html#C-Interface-1",
    "title": "C Interface",
    "category": "Section",
    "text": "ccall\nnCore.Intrinsics.cglobal\nnBase.cfunction\nnBase.unsafe_convert\nnBase.cconvert\nnBase.unsafe_load\nnBase.unsafe_store!\nnBase.unsafe_copy!\nnBase.unsafe_copy!\nnBase.copy!\nnBase.copy!\nnBase.pointer\nnBase.unsafe_wrap\nnBase.pointer_from_objref\nnBase.unsafe_pointer_to_objref\nnBase.disable_sigint\nnBase.reenable_sigint\nnBase.systemerror\nnCore.Ptr\nnCore.Ref\nnBase.Cchar\nnBase.Cuchar\nnBase.Cshort\nnBase.Cushort\nnBase.Cint\nnBase.Cuint\nnBase.Clong\nnBase.Culong\nnBase.Clonglong\nnBase.Culonglong\nnBase.Cintmax_t\nnBase.Cuintmax_t\nnBase.Csize_t\nnBase.Cssize_t\nnBase.Cptrdiff_t\nnBase.Cwchar_t\nnBase.Cfloat\nnBase.Cdouble"
},

{
    "location": "stdlib/c.html#Core.Intrinsics.llvmcall",
    "title": "Core.Intrinsics.llvmcall",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/collections.html",
    "title": "Collections and Data Structures",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/collections.html#Collections-and-Data-Structures-1",
    "title": "Collections and Data Structures",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.start",
    "title": "Base.start",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.done",
    "title": "Base.done",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.next",
    "title": "Base.next",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.zip",
    "title": "Base.zip",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.enumerate",
    "title": "Base.enumerate",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.rest",
    "title": "Base.rest",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.countfrom",
    "title": "Base.countfrom",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.take",
    "title": "Base.take",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.drop",
    "title": "Base.drop",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.cycle",
    "title": "Base.cycle",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.repeated",
    "title": "Base.repeated",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.iteratorsize",
    "title": "Base.iteratorsize",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.iteratoreltype",
    "title": "Base.iteratoreltype",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Iteration-1",
    "title": "Iteration",
    "category": "Section",
    "text": "Sequential iteration is implemented by the methods start(), done(), and next(). The general for loop:for i = I   # or  \"for i in I\"\nn    # body\nnendis translated into:state = start(I)\nnwhile !done(I, state)\nn    (i, state) = next(I, state)\nn    # body\nnendThe state object may be anything, and should be chosen appropriately for each iterable type. See the manual section on the iteration interface for more details about defining a custom iterable type.Base.start\nnBase.done\nnBase.next\nnBase.zip\nnBase.enumerate\nnBase.rest\nnBase.countfrom\nnBase.take\nnBase.drop\nnBase.cycle\nnBase.repeated\nnBase.iteratorsize\nnBase.iteratoreltypeFully implemented by:Range\nnUnitRange\nnTuple\nnNumber\nnAbstractArray\nnIntSet\nnObjectIdDict\nnDict\nnWeakKeyDict\nnEachLine\nnAbstractString\nnSet\nnTask"
},

{
    "location": "stdlib/collections.html#Base.isempty",
    "title": "Base.isempty",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.empty!",
    "title": "Base.empty!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.length",
    "title": "Base.length",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.endof",
    "title": "Base.endof",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#General-Collections-1",
    "title": "General Collections",
    "category": "Section",
    "text": "Base.isempty\nnBase.empty!\nnBase.length\nnBase.endofFully implemented by:Range\nnUnitRange\nnTuple\nnNumber\nnAbstractArray\nnIntSet\nnDict\nnWeakKeyDict\nnAbstractString\nnSet"
},

{
    "location": "stdlib/collections.html#Iterable-Collections-1",
    "title": "Iterable Collections",
    "category": "Section",
    "text": "Base.in\nnBase.eltype\nnBase.indexin\nnBase.findin\nnBase.unique\nnBase.unique\nnBase.unique\nnBase.allunique\nnBase.reduce\nnBase.reduce\nnBase.foldl\nnBase.foldl\nnBase.foldr\nnBase.foldr\nnBase.maximum\nnBase.maximum\nnBase.maximum!\nnBase.minimum\nnBase.minimum\nnBase.minimum!\nnBase.extrema\nnBase.extrema\nnBase.indmax\nnBase.indmin\nnBase.findmax\nnBase.findmax\nnBase.findmin\nnBase.findmin\nnBase.findmax!\nnBase.findmin!\nnBase.maxabs\nnBase.maxabs\nnBase.maxabs!\nnBase.minabs\nnBase.minabs\nnBase.minabs!\nnBase.sum\nnBase.sum\nnBase.sum!\nnBase.sum\nnBase.sumabs\nnBase.sumabs\nnBase.sumabs!\nnBase.sumabs2\nnBase.sumabs2\nnBase.sumabs2!\nnBase.prod\nnBase.prod\nnBase.prod!\nnBase.any\nnBase.any\nnBase.any!\nnBase.all\nnBase.all\nnBase.all!\nnBase.count\nnBase.any\nnBase.all\nnBase.foreach\nnBase.map\nnBase.map!\nnBase.map!\nnBase.mapreduce\nnBase.mapreduce\nnBase.mapfoldl\nnBase.mapfoldl\nnBase.mapfoldr\nnBase.mapfoldr\nnBase.first\nnBase.last\nnBase.step\nnBase.collect\nnBase.collect\nnBase.issubset\nnBase.filter\nnBase.filter!"
},

{
    "location": "stdlib/collections.html#Base.getindex",
    "title": "Base.getindex",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.setindex!",
    "title": "Base.setindex!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Indexable-Collections-1",
    "title": "Indexable Collections",
    "category": "Section",
    "text": "Base.getindex\nnBase.setindex!Fully implemented by:Array\nnBitArray\nnAbstractArray\nnSubArray\nnObjectIdDict\nnDict\nnWeakKeyDict\nnAbstractStringPartially implemented by:Range\nnUnitRange\nnTuple"
},

{
    "location": "stdlib/collections.html#Associative-Collections-1",
    "title": "Associative Collections",
    "category": "Section",
    "text": "Dict is the standard associative collection. Its implementation uses hash() as the hashing function for the key, and isequal() to determine equality. Define these two functions for custom types to override how they are stored in a hash table.ObjectIdDict is a special hash table where the keys are always object identities.WeakKeyDict is a hash table implementation where the keys are weak references to objects, and thus may be garbage collected even when referenced in a hash table.Dicts can be created by passing pair objects constructed with =>() to a Dict constructor: Dict(\"A\"=>1, \"B\"=>2). This call will attempt to infer type information from the keys and values (i.e. this example creates a Dict{String, Int64}). To explicitly specify types use the syntax Dict{KeyType,ValueType}(...). For example, Dict{String,Int32}(\"A\"=>1, \"B\"=>2).Dicts may also be created with generators. For example, Dict(i => f(i) for i = 1:10).Given a dictionary D, the syntax D[x] returns the value of key x (if it exists) or throws an error, and D[x] = y stores the key-value pair x => y in D (replacing any existing value for the key x).  Multiple arguments to D[...] are converted to tuples; for example, the syntax D[x,y]  is equivalent to D[(x,y)], i.e. it refers to the value keyed by the tuple (x,y).Base.Dict\nnBase.haskey\nnBase.get\nnBase.get\nnBase.get!\nnBase.get!\nnBase.getkey\nnBase.delete!\nnBase.pop!\nnBase.keys\nnBase.values\nnBase.merge\nnBase.merge!\nnBase.sizehint!\nnBase.keytype\nnBase.valtypeFully implemented by:ObjectIdDict\nnDict\nnWeakKeyDictPartially implemented by:IntSet\nnSet\nnEnvHash\nnArray\nnBitArray"
},

{
    "location": "stdlib/collections.html#Set-Like-Collections-1",
    "title": "Set-Like Collections",
    "category": "Section",
    "text": "Base.Set\nnBase.IntSet\nnBase.union\nnBase.union!\nnBase.intersect\nnBase.setdiff\nnBase.setdiff!\nnBase.symdiff\nnBase.symdiff!\nnBase.symdiff!\nnBase.symdiff!\nnBase.intersect!\nnBase.issubsetFully implemented by:IntSet\nnSetPartially implemented by:Array"
},

{
    "location": "stdlib/collections.html#Dequeues-1",
    "title": "Dequeues",
    "category": "Section",
    "text": "Base.push!\nnBase.pop!\nnBase.unshift!\nnBase.shift!\nnBase.insert!\nnBase.deleteat!\nnBase.deleteat!\nnBase.splice!\nnBase.splice!\nnBase.resize!\nnBase.append!\nnBase.prepend!Fully implemented by:Vector (a.k.a. 1-dimensional Array)\nnBitVector (a.k.a. 1-dimensional BitArray)"
},

{
    "location": "stdlib/collections.html#Base.Collections.PriorityQueue",
    "title": "Base.Collections.PriorityQueue",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.Collections.enqueue!",
    "title": "Base.Collections.enqueue!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.Collections.dequeue!",
    "title": "Base.Collections.dequeue!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.Collections.peek",
    "title": "Base.Collections.peek",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#PriorityQueue-1",
    "title": "PriorityQueue",
    "category": "Section",
    "text": "The PriorityQueue type is available from the Collections module. It provides a basic priority queue implementation allowing for arbitrary key and priority types. Multiple identical keys are not permitted, but the priority of existing keys can be changed efficiently.Base.Collections.PriorityQueue\nnBase.Collections.enqueue!\nnBase.Collections.dequeue!\nnBase.Collections.peekPriorityQueue also behaves similarly to a Dict in that keys can be inserted and priorities accessed or changed using indexing notation.julia> # Julia code\nn       pq = Collections.PriorityQueue();\nn\nnjulia> # Insert keys with associated priorities\nn       pq[\"a\"] = 10; pq[\"b\"] = 5; pq[\"c\"] = 15; pq\nnBase.Collections.PriorityQueue{Any,Any,Base.Order.ForwardOrdering} with 3 entries:\nn  \"c\" => 15\nn  \"b\" => 5\nn  \"a\" => 10\nn\nnjulia> # Change the priority of an existing key\nn       pq[\"a\"] = 0; pq\nnBase.Collections.PriorityQueue{Any,Any,Base.Order.ForwardOrdering} with 3 entries:\nn  \"c\" => 15\nn  \"b\" => 5\nn  \"a\" => 0"
},

{
    "location": "stdlib/collections.html#Base.Collections.heapify",
    "title": "Base.Collections.heapify",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.Collections.heapify!",
    "title": "Base.Collections.heapify!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.Collections.isheap",
    "title": "Base.Collections.isheap",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.Collections.heappush!",
    "title": "Base.Collections.heappush!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/collections.html#Base.Collections.heappop!",
    "title": "Base.Collections.heappop!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/constants.html",
    "title": "Constants",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/constants.html#Core.nothing",
    "title": "Core.nothing",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.PROGRAM_FILE",
    "title": "Base.PROGRAM_FILE",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.ARGS",
    "title": "Base.ARGS",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.C_NULL",
    "title": "Base.C_NULL",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.VERSION",
    "title": "Base.VERSION",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.LOAD_PATH",
    "title": "Base.LOAD_PATH",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.JULIA_HOME",
    "title": "Base.JULIA_HOME",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Core.ANY",
    "title": "Core.ANY",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.Sys.CPU_CORES",
    "title": "Base.Sys.CPU_CORES",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.Sys.WORD_SIZE",
    "title": "Base.Sys.WORD_SIZE",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.Sys.KERNEL",
    "title": "Base.Sys.KERNEL",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.Sys.ARCH",
    "title": "Base.Sys.ARCH",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/constants.html#Base.Sys.MACHINE",
    "title": "Base.Sys.MACHINE",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/dates.html",
    "title": "Dates and Time",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/dates.html#Dates-and-Time-1",
    "title": "Dates and Time",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Period",
    "title": "Base.Dates.Period",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.CompoundPeriod",
    "title": "Base.Dates.CompoundPeriod",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Instant",
    "title": "Base.Dates.Instant",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.UTInstant",
    "title": "Base.Dates.UTInstant",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.TimeType",
    "title": "Base.Dates.TimeType",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.DateTime",
    "title": "Base.Dates.DateTime",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Date",
    "title": "Base.Dates.Date",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Dates-and-Time-Types-1",
    "title": "Dates and Time Types",
    "category": "Section",
    "text": "Base.Dates.Period\nnBase.Dates.CompoundPeriod\nnBase.Dates.Instant\nnBase.Dates.UTInstant\nnBase.Dates.TimeType\nnBase.Dates.DateTime\nnBase.Dates.Date"
},

{
    "location": "stdlib/dates.html#Dates-Functions-1",
    "title": "Dates Functions",
    "category": "Section",
    "text": "All Dates functions are defined in the Dates module; note that only the Date, DateTime, and now functions are exported; to use all other Dates functions, you'll need to prefix each function call with an explicit Dates., e.g. Dates.dayofweek(dt). Alternatively, you can write using Base.Dates to bring all exported functions into Main to be used without the Dates. prefix.Base.Dates.DateTime\nnBase.Dates.DateTime\nnBase.Dates.DateTime\nnBase.Dates.DateTime\nnBase.Dates.DateTime\nnBase.Dates.format\nnBase.Dates.DateFormat\nnBase.Dates.DateTime\nnBase.Dates.Date\nnBase.Dates.Date\nnBase.Dates.Date\nnBase.Dates.Date\nnBase.Dates.Date\nnBase.Dates.Date\nnBase.Dates.now\nnBase.Dates.now\nnBase.eps"
},

{
    "location": "stdlib/dates.html#Base.Dates.year",
    "title": "Base.Dates.year",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.month",
    "title": "Base.Dates.month",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.week",
    "title": "Base.Dates.week",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.day",
    "title": "Base.Dates.day",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.hour",
    "title": "Base.Dates.hour",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.minute",
    "title": "Base.Dates.minute",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.second",
    "title": "Base.Dates.second",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.millisecond",
    "title": "Base.Dates.millisecond",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Year",
    "title": "Base.Dates.Year",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Month",
    "title": "Base.Dates.Month",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Week",
    "title": "Base.Dates.Week",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Day",
    "title": "Base.Dates.Day",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Hour",
    "title": "Base.Dates.Hour",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Minute",
    "title": "Base.Dates.Minute",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Second",
    "title": "Base.Dates.Second",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.Millisecond",
    "title": "Base.Dates.Millisecond",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.yearmonth",
    "title": "Base.Dates.yearmonth",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.monthday",
    "title": "Base.Dates.monthday",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.yearmonthday",
    "title": "Base.Dates.yearmonthday",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Accessor-Functions-1",
    "title": "Accessor Functions",
    "category": "Section",
    "text": "Base.Dates.year\nnBase.Dates.month\nnBase.Dates.week\nnBase.Dates.day\nnBase.Dates.hour\nnBase.Dates.minute\nnBase.Dates.second\nnBase.Dates.millisecond\nnBase.Dates.Year\nnBase.Dates.Month\nnBase.Dates.Week\nnBase.Dates.Day\nnBase.Dates.Hour\nnBase.Dates.Minute\nnBase.Dates.Second\nnBase.Dates.Millisecond\nnBase.Dates.yearmonth\nnBase.Dates.monthday\nnBase.Dates.yearmonthday"
},

{
    "location": "stdlib/dates.html#Base.Dates.dayname",
    "title": "Base.Dates.dayname",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.dayabbr",
    "title": "Base.Dates.dayabbr",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.dayofweek",
    "title": "Base.Dates.dayofweek",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.dayofmonth",
    "title": "Base.Dates.dayofmonth",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.dayofweekofmonth",
    "title": "Base.Dates.dayofweekofmonth",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.daysofweekinmonth",
    "title": "Base.Dates.daysofweekinmonth",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.monthname",
    "title": "Base.Dates.monthname",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.monthabbr",
    "title": "Base.Dates.monthabbr",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.daysinmonth",
    "title": "Base.Dates.daysinmonth",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.isleapyear",
    "title": "Base.Dates.isleapyear",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.dayofyear",
    "title": "Base.Dates.dayofyear",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.daysinyear",
    "title": "Base.Dates.daysinyear",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.quarterofyear",
    "title": "Base.Dates.quarterofyear",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.dayofquarter",
    "title": "Base.Dates.dayofquarter",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Query-Functions-1",
    "title": "Query Functions",
    "category": "Section",
    "text": "Base.Dates.dayname\nnBase.Dates.dayabbr\nnBase.Dates.dayofweek\nnBase.Dates.dayofmonth\nnBase.Dates.dayofweekofmonth\nnBase.Dates.daysofweekinmonth\nnBase.Dates.monthname\nnBase.Dates.monthabbr\nnBase.Dates.daysinmonth\nnBase.Dates.isleapyear\nnBase.Dates.dayofyear\nnBase.Dates.daysinyear\nnBase.Dates.quarterofyear\nnBase.Dates.dayofquarter"
},

{
    "location": "stdlib/dates.html#Adjuster-Functions-1",
    "title": "Adjuster Functions",
    "category": "Section",
    "text": "Base.trunc\nnBase.Dates.firstdayofweek\nnBase.Dates.lastdayofweek\nnBase.Dates.firstdayofmonth\nnBase.Dates.lastdayofmonth\nnBase.Dates.firstdayofyear\nnBase.Dates.lastdayofyear\nnBase.Dates.firstdayofquarter\nnBase.Dates.lastdayofquarter\nnBase.Dates.tonext\nnBase.Dates.toprev\nnBase.Dates.tofirst\nnBase.Dates.tolast\nnBase.Dates.tonext\nnBase.Dates.toprev\nnBase.Dates.recur"
},

{
    "location": "stdlib/dates.html#Periods-1",
    "title": "Periods",
    "category": "Section",
    "text": "Base.Dates.Period\nnBase.Dates.CompoundPeriod\nnBase.Dates.default"
},

{
    "location": "stdlib/dates.html#Base.floor",
    "title": "Base.floor",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.ceil",
    "title": "Base.ceil",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.round",
    "title": "Base.round",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.floorceil",
    "title": "Base.Dates.floorceil",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.epochdays2date",
    "title": "Base.Dates.epochdays2date",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.epochms2datetime",
    "title": "Base.Dates.epochms2datetime",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.date2epochdays",
    "title": "Base.Dates.date2epochdays",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.datetime2epochms",
    "title": "Base.Dates.datetime2epochms",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Rounding-Functions-1",
    "title": "Rounding Functions",
    "category": "Section",
    "text": "Date and DateTime values can be rounded to a specified resolution (e.g., 1 month or 15 minutes) with floor, ceil, or round.Base.floor\nnBase.ceil\nnBase.roundThe following functions are not exported:Base.Dates.floorceil\nnBase.Dates.epochdays2date\nnBase.Dates.epochms2datetime\nnBase.Dates.date2epochdays\nnBase.Dates.datetime2epochms"
},

{
    "location": "stdlib/dates.html#Base.Dates.today",
    "title": "Base.Dates.today",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.unix2datetime",
    "title": "Base.Dates.unix2datetime",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.datetime2unix",
    "title": "Base.Dates.datetime2unix",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.julian2datetime",
    "title": "Base.Dates.julian2datetime",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.datetime2julian",
    "title": "Base.Dates.datetime2julian",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.rata2datetime",
    "title": "Base.Dates.rata2datetime",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Base.Dates.datetime2rata",
    "title": "Base.Dates.datetime2rata",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/dates.html#Conversion-Functions-1",
    "title": "Conversion Functions",
    "category": "Section",
    "text": "Base.Dates.today\nnBase.Dates.unix2datetime\nnBase.Dates.datetime2unix\nnBase.Dates.julian2datetime\nnBase.Dates.datetime2julian\nnBase.Dates.rata2datetime\nnBase.Dates.datetime2rata"
},

{
    "location": "stdlib/file.html",
    "title": "Filesystem",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/index.html",
    "title": "The Julia Standard Library",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/io-network.html",
    "title": "I/O and Network",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/io-network.html#I/O-and-Network-1",
    "title": "I/O and Network",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/io-network.html#General-I/O-1",
    "title": "General I/O",
    "category": "Section",
    "text": "Base.STDOUT\nnBase.STDERR\nnBase.STDIN\nnBase.open\nnBase.open\nnBase.open\nnBase.open\nnBase.open\nnBase.IOBuffer\nnBase.IOBuffer\nnBase.IOBuffer\nnBase.IOBuffer\nnBase.takebuf_array\nnBase.takebuf_string\nnBase.fdio\nnBase.flush\nnBase.close\nnBase.write\nnBase.read\nnBase.read\nnBase.read!\nnBase.readbytes!\nnBase.read\nnBase.read\nnBase.unsafe_read\nnBase.unsafe_write\nnBase.position\nnBase.seek\nnBase.seekstart\nnBase.seekend\nnBase.skip\nnBase.mark\nnBase.unmark\nnBase.reset\nnBase.ismarked\nnBase.eof\nnBase.isreadonly\nnBase.iswritable\nnBase.isreadable\nnBase.isopen\nnBase.Serializer.serialize\nnBase.Serializer.deserialize\nnBase.escape_string\nnBase.unescape_string\nnBase.join\nnBase.Grisu.print_shortest\nnBase.fd\nnBase.redirect_stdout\nnBase.redirect_stdout\nnBase.redirect_stderr\nnBase.redirect_stdin\nnBase.readchomp\nnBase.truncate\nnBase.skipchars\nnBase.DataFmt.countlines\nnBase.PipeBuffer\nnBase.PipeBuffer\nnBase.readavailable\nnBase.IOContext\nnBase.IOContext\nnBase.IOContext\nnBase.IOContext"
},

{
    "location": "stdlib/io-network.html#Text-I/O-1",
    "title": "Text I/O",
    "category": "Section",
    "text": "Base.show\nnBase.showcompact\nnBase.showall\nnBase.summary\nnBase.print\nnBase.println\nnBase.print_with_color\nnBase.info\nnBase.warn\nnBase.Printf.@printf\nnBase.Printf.@sprintf\nnBase.sprint\nnBase.showerror\nnBase.dump\nnBase.readstring\nnBase.readline\nnBase.readuntil\nnBase.readlines\nnBase.eachline\nnBase.DataFmt.readdlm\nnBase.DataFmt.readdlm\nnBase.DataFmt.readdlm\nnBase.DataFmt.readdlm\nnBase.DataFmt.readdlm\nnBase.DataFmt.readdlm\nnBase.DataFmt.writedlm\nnBase.DataFmt.readcsv\nnBase.DataFmt.writecsv\nnBase.Base64.Base64EncodePipe\nnBase.Base64.Base64DecodePipe\nnBase.Base64.base64encode\nnBase.Base64.base64decode\nnBase.displaysize"
},

{
    "location": "stdlib/io-network.html#Base.Multimedia.pushdisplay",
    "title": "Base.Multimedia.pushdisplay",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/io-network.html#Base.Multimedia.popdisplay",
    "title": "Base.Multimedia.popdisplay",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/io-network.html#Base.Multimedia.TextDisplay",
    "title": "Base.Multimedia.TextDisplay",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/io-network.html#Base.Multimedia.istextmime",
    "title": "Base.Multimedia.istextmime",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/io-network.html#Multimedia-I/O-1",
    "title": "Multimedia I/O",
    "category": "Section",
    "text": "Just as text output is performed by print and user-defined types can indicate their textual representation by overloading show, Julia provides a standardized mechanism for rich multimedia output (such as images, formatted text, or even audio and video), consisting of three parts:A function display(x) to request the richest available multimedia display of a Julia object x (with a plain-text fallback).\nnOverloading show allows one to indicate arbitrary multimedia representations (keyed by standard MIME types) of user-defined types.\nnMultimedia-capable display backends may be registered by subclassing a generic Display type and pushing them onto a stack of display backends via pushdisplay.The base Julia runtime provides only plain-text display, but richer displays may be enabled by loading external modules or by using graphical Julia environments (such as the IPython-based IJulia notebook).Base.Multimedia.display\nnBase.Multimedia.redisplay\nnBase.Multimedia.displayable\nnBase.show\nnBase.Multimedia.mimewritable\nnBase.Multimedia.reprmime\nnBase.Multimedia.stringmimeAs mentioned above, one can also define new display backends. For example, a module that can display PNG images in a window can register this capability with Julia, so that calling display(x) on types with PNG representations will automatically display the image using the module's window.In order to define a new display backend, one should first create a subtype D of the abstract class Display.  Then, for each MIME type (mime string) that can be displayed on D, one should define a function display(d::D, ::MIME\"mime\", x) = ... that displays x as that MIME type, usually by calling reprmime(mime, x).  A MethodError should be thrown if x cannot be displayed as that MIME type; this is automatic if one calls reprmime. Finally, one should define a function display(d::D, x) that queries mimewritable(mime, x) for the mime types supported by D and displays the \"best\" one; a MethodError should be thrown if no supported MIME types are found for x.  Similarly, some subtypes may wish to override redisplay(d::D, ...).  (Again, one should import Base.display to add new methods to display.) The return values of these functions are up to the implementation (since in some cases it may be useful to return a display \"handle\" of some type).  The display functions for D can then be called directly, but they can also be invoked automatically from display(x) simply by pushing a new display onto the display-backend stack with:Base.Multimedia.pushdisplay\nnBase.Multimedia.popdisplay\nnBase.Multimedia.TextDisplay\nnBase.Multimedia.istextmime"
},

{
    "location": "stdlib/io-network.html#Memory-mapped-I/O-1",
    "title": "Memory-mapped I/O",
    "category": "Section",
    "text": "Base.Mmap.Anonymous\nnBase.Mmap.mmap\nnBase.Mmap.mmap\nnBase.Mmap.sync!"
},

{
    "location": "stdlib/libc.html",
    "title": "C Standard Library",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.malloc",
    "title": "Base.Libc.malloc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.calloc",
    "title": "Base.Libc.calloc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.realloc",
    "title": "Base.Libc.realloc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.free",
    "title": "Base.Libc.free",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.errno",
    "title": "Base.Libc.errno",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.strerror",
    "title": "Base.Libc.strerror",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.GetLastError",
    "title": "Base.Libc.GetLastError",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.FormatMessage",
    "title": "Base.Libc.FormatMessage",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.time",
    "title": "Base.Libc.time",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.strftime",
    "title": "Base.Libc.strftime",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.strptime",
    "title": "Base.Libc.strptime",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.TmStruct",
    "title": "Base.Libc.TmStruct",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/libc.html#Base.Libc.flush_cstdio",
    "title": "Base.Libc.flush_cstdio",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libdl.html",
    "title": "Dynamic Linker",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.dlopen",
    "title": "Base.Libdl.dlopen",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.dlopen_e",
    "title": "Base.Libdl.dlopen_e",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.RTLD_NOW",
    "title": "Base.Libdl.RTLD_NOW",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.dlsym",
    "title": "Base.Libdl.dlsym",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.dlsym_e",
    "title": "Base.Libdl.dlsym_e",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.dlclose",
    "title": "Base.Libdl.dlclose",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.dlext",
    "title": "Base.Libdl.dlext",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.find_library",
    "title": "Base.Libdl.find_library",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/libdl.html#Base.Libdl.DL_LOAD_PATH",
    "title": "Base.Libdl.DL_LOAD_PATH",
    "category": "Constant",
    "text": ""
},

{
    "location": "stdlib/linalg.html",
    "title": "Linear Algebra",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Linear-Algebra-1",
    "title": "Linear Algebra",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Standard-Functions-1",
    "title": "Standard Functions",
    "category": "Section",
    "text": "Linear algebra functions in Julia are largely implemented by calling functions from LAPACK.  Sparse factorizations call functions from SuiteSparse.Base.:*\nnBase.:\\nnBase.LinAlg.dot\nnBase.LinAlg.vecdot\nnBase.LinAlg.cross\nnBase.LinAlg.factorize\nnBase.full\nnBase.LinAlg.Diagonal\nnBase.LinAlg.Diagonal\nnBase.LinAlg.Bidiagonal\nnBase.LinAlg.Bidiagonal\nnBase.LinAlg.Bidiagonal\nnBase.LinAlg.SymTridiagonal\nnBase.LinAlg.Tridiagonal\nnBase.LinAlg.Symmetric\nnBase.LinAlg.Hermitian\nnBase.LinAlg.lu\nnBase.LinAlg.lufact\nnBase.LinAlg.lufact\nnBase.LinAlg.lufact!\nnBase.LinAlg.chol\nnBase.LinAlg.chol\nnBase.LinAlg.cholfact\nnBase.LinAlg.cholfact\nnBase.LinAlg.cholfact\nnBase.LinAlg.cholfact!\nnBase.LinAlg.cholfact!\nnBase.LinAlg.cholfact!\nnBase.LinAlg.lowrankupdate\nnBase.LinAlg.lowrankdowndate\nnBase.LinAlg.lowrankupdate!\nnBase.LinAlg.lowrankdowndate!\nnBase.LinAlg.ldltfact\nnBase.LinAlg.ldltfact\nnBase.LinAlg.ldltfact!\nnBase.LinAlg.ldltfact!\nnBase.LinAlg.qr\nnBase.LinAlg.qr!\nnBase.LinAlg.qr\nnBase.LinAlg.qrfact\nnBase.LinAlg.qrfact\nnBase.LinAlg.qrfact!\nnBase.full\nnBase.LinAlg.lqfact!\nnBase.LinAlg.lqfact\nnBase.LinAlg.lq\nnBase.LinAlg.bkfact\nnBase.LinAlg.bkfact!\nnBase.LinAlg.eig\nnBase.LinAlg.eig\nnBase.LinAlg.eigvals\nnBase.LinAlg.eigvals!\nnBase.LinAlg.eigmax\nnBase.LinAlg.eigmin\nnBase.LinAlg.eigvecs\nnBase.LinAlg.eigfact\nnBase.LinAlg.eigfact\nnBase.LinAlg.eigfact!\nnBase.LinAlg.hessfact\nnBase.LinAlg.hessfact!\nnBase.LinAlg.schurfact\nnBase.LinAlg.schurfact!\nnBase.LinAlg.schur\nnBase.LinAlg.ordschur\nnBase.LinAlg.ordschur!\nnBase.LinAlg.ordschur\nnBase.LinAlg.ordschur!\nnBase.LinAlg.schurfact\nnBase.LinAlg.schurfact!\nnBase.LinAlg.ordschur\nnBase.LinAlg.ordschur!\nnBase.LinAlg.ordschur\nnBase.LinAlg.ordschur!\nnBase.LinAlg.schur\nnBase.LinAlg.svdfact\nnBase.LinAlg.svdfact!\nnBase.LinAlg.svd\nnBase.LinAlg.svdvals\nnBase.LinAlg.svdvals!\nnBase.LinAlg.svdfact\nnBase.LinAlg.svd\nnBase.LinAlg.svdvals\nnBase.LinAlg.Givens\nnBase.LinAlg.givens\nnBase.LinAlg.givens\nnBase.LinAlg.givens\nnBase.LinAlg.triu\nnBase.LinAlg.triu\nnBase.LinAlg.triu!\nnBase.LinAlg.triu!\nnBase.LinAlg.tril\nnBase.LinAlg.tril\nnBase.LinAlg.tril!\nnBase.LinAlg.tril!\nnBase.LinAlg.diagind\nnBase.LinAlg.diag\nnBase.LinAlg.diagm\nnBase.LinAlg.scale!\nnBase.LinAlg.Tridiagonal\nnBase.LinAlg.rank\nnBase.LinAlg.norm\nnBase.LinAlg.vecnorm\nnBase.LinAlg.normalize!\nnBase.LinAlg.normalize\nnBase.LinAlg.cond\nnBase.LinAlg.condskeel\nnBase.LinAlg.trace\nnBase.LinAlg.det\nnBase.LinAlg.logdet\nnBase.LinAlg.logabsdet\nnBase.inv\nnBase.LinAlg.pinv\nnBase.LinAlg.nullspace\nnBase.repmat\nnBase.repeat\nnBase.kron\nnBase.SparseArrays.blkdiag\nnBase.LinAlg.linreg\nnBase.LinAlg.expm\nnBase.LinAlg.logm\nnBase.LinAlg.sqrtm\nnBase.LinAlg.lyap\nnBase.LinAlg.sylvester\nnBase.LinAlg.issymmetric\nnBase.LinAlg.isposdef\nnBase.LinAlg.isposdef!\nnBase.LinAlg.istril\nnBase.LinAlg.istriu\nnBase.LinAlg.isdiag\nnBase.LinAlg.ishermitian\nnBase.transpose\nnBase.transpose!\nnBase.ctranspose\nnBase.ctranspose!\nnBase.LinAlg.eigs\nnBase.LinAlg.eigs\nnBase.LinAlg.svds\nnBase.LinAlg.peakflops"
},

{
    "location": "stdlib/linalg.html#Base.LinAlg.A_ldiv_B!",
    "title": "Base.LinAlg.A_ldiv_B!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.A_ldiv_Bc",
    "title": "Base.A_ldiv_Bc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.A_ldiv_Bt",
    "title": "Base.A_ldiv_Bt",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.LinAlg.A_mul_B!",
    "title": "Base.LinAlg.A_mul_B!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.A_mul_Bc",
    "title": "Base.A_mul_Bc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.A_mul_Bt",
    "title": "Base.A_mul_Bt",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.A_rdiv_Bc",
    "title": "Base.A_rdiv_Bc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.A_rdiv_Bt",
    "title": "Base.A_rdiv_Bt",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.Ac_ldiv_B",
    "title": "Base.Ac_ldiv_B",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.LinAlg.Ac_ldiv_B!",
    "title": "Base.LinAlg.Ac_ldiv_B!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.Ac_ldiv_Bc",
    "title": "Base.Ac_ldiv_Bc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.Ac_mul_B",
    "title": "Base.Ac_mul_B",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.Ac_mul_Bc",
    "title": "Base.Ac_mul_Bc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.Ac_rdiv_B",
    "title": "Base.Ac_rdiv_B",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.Ac_rdiv_Bc",
    "title": "Base.Ac_rdiv_Bc",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.At_ldiv_B",
    "title": "Base.At_ldiv_B",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.LinAlg.At_ldiv_B!",
    "title": "Base.LinAlg.At_ldiv_B!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.At_ldiv_Bt",
    "title": "Base.At_ldiv_Bt",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.At_mul_B",
    "title": "Base.At_mul_B",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.At_mul_Bt",
    "title": "Base.At_mul_Bt",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.At_rdiv_B",
    "title": "Base.At_rdiv_B",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Base.At_rdiv_Bt",
    "title": "Base.At_rdiv_Bt",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/linalg.html#Low-level-matrix-operations-1",
    "title": "Low-level matrix operations",
    "category": "Section",
    "text": "Matrix operations involving transpositions operations like A' \ B are converted by the Julia parser into calls to specially named functions like Ac_ldiv_B. If you want to overload these operations for your own types, then it is useful to know the names of these functions.Also, in many cases there are in-place versions of matrix operations that allow you to supply a pre-allocated output vector or matrix.  This is useful when optimizing critical code in order to avoid the overhead of repeated allocations. These in-place operations are suffixed with ! below (e.g. A_mul_B!) according to the usual Julia convention.Base.LinAlg.A_ldiv_B!\nnBase.A_ldiv_Bc\nnBase.A_ldiv_Bt\nnBase.LinAlg.A_mul_B!\nnBase.A_mul_Bc\nnBase.A_mul_Bt\nnBase.A_rdiv_Bc\nnBase.A_rdiv_Bt\nnBase.Ac_ldiv_B\nnBase.LinAlg.Ac_ldiv_B!\nnBase.Ac_ldiv_Bc\nnBase.Ac_mul_B\nnBase.Ac_mul_Bc\nnBase.Ac_rdiv_B\nnBase.Ac_rdiv_Bc\nnBase.At_ldiv_B\nnBase.LinAlg.At_ldiv_B!\nnBase.At_ldiv_Bt\nnBase.At_mul_B\nnBase.At_mul_Bt\nnBase.At_rdiv_B\nnBase.At_rdiv_Bt"
},

{
    "location": "stdlib/linalg.html#BLAS-Functions-1",
    "title": "BLAS Functions",
    "category": "Section",
    "text": "In Julia (as in much of scientific computation), dense linear-algebra operations are based on the LAPACK library, which in turn is built on top of basic linear-algebra building-blocks known as the BLAS.  There are highly optimized implementations of BLAS available for every computer architecture, and sometimes in high-performance linear algebra routines it is useful to call the BLAS functions directly.Base.LinAlg.BLAS provides wrappers for some of the BLAS functions. Those BLAS functions that overwrite one of the input arrays have names ending in '!'.  Usually, a BLAS function has four methods defined, for Float64, Float32, Complex128, and Complex64 arrays.Base.LinAlg.dot\nnBase.LinAlg.BLAS.dotu\nnBase.LinAlg.BLAS.dotc\nnBase.LinAlg.BLAS.blascopy!\nnBase.LinAlg.BLAS.nrm2\nnBase.LinAlg.BLAS.asum\nnBase.LinAlg.axpy!\nnBase.LinAlg.BLAS.scal!\nnBase.LinAlg.BLAS.scal\nnBase.LinAlg.BLAS.ger!\nnBase.LinAlg.BLAS.syr!\nnBase.LinAlg.BLAS.syrk!\nnBase.LinAlg.BLAS.syrk\nnBase.LinAlg.BLAS.her!\nnBase.LinAlg.BLAS.herk!\nnBase.LinAlg.BLAS.herk\nnBase.LinAlg.BLAS.gbmv!\nnBase.LinAlg.BLAS.gbmv\nnBase.LinAlg.BLAS.sbmv!\nnBase.LinAlg.BLAS.sbmv\nnBase.LinAlg.BLAS.sbmv\nnBase.LinAlg.BLAS.gemm!\nnBase.LinAlg.BLAS.gemm\nnBase.LinAlg.BLAS.gemm\nnBase.LinAlg.BLAS.gemv!\nnBase.LinAlg.BLAS.gemv\nnBase.LinAlg.BLAS.gemv\nnBase.LinAlg.BLAS.symm!\nnBase.LinAlg.BLAS.symm\nnBase.LinAlg.BLAS.symm\nnBase.LinAlg.BLAS.symm\nnBase.LinAlg.BLAS.symv!\nnBase.LinAlg.BLAS.symv\nnBase.LinAlg.BLAS.symv\nnBase.LinAlg.BLAS.trmm!\nnBase.LinAlg.BLAS.trmm\nnBase.LinAlg.BLAS.trsm!\nnBase.LinAlg.BLAS.trsm\nnBase.LinAlg.BLAS.trmv!\nnBase.LinAlg.BLAS.trmv\nnBase.LinAlg.BLAS.trsv!\nnBase.LinAlg.BLAS.trsv\nnBase.LinAlg.BLAS.set_num_threads\nnBase.LinAlg.I"
},

{
    "location": "stdlib/math.html",
    "title": "Mathematics",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/math.html#Mathematics-1",
    "title": "Mathematics",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/math.html#Mathematical-Operators-1",
    "title": "Mathematical Operators",
    "category": "Section",
    "text": "Base.:-\nnBase.:+\nnBase.:-\nnBase.:*\nnBase.:/\nnBase.:\\nnBase.:^\nnBase.:.+\nnBase.:.-\nnBase.:.*\nnBase.:./\nnBase.:.\\nnBase.:.^\nnBase.fma\nnBase.muladd\nnBase.div\nnBase.fld\nnBase.cld\nnBase.mod\nnBase.Math.mod2pi\nnBase.rem\nnBase.divrem\nnBase.fldmod\nnBase.fld1\nnBase.mod1\nnBase.fldmod1\nnBase.://\nnBase.rationalize\nnBase.num\nnBase.den\nnBase.:<<\nnBase.:>>\nnBase.:>>>\nnBase.colon\nnBase.colon\nnBase.range\nnBase.:==\nnBase.:!=\nnCore.:===\nnBase.:!==\nnBase.:<\nnBase.:<=\nnBase.:>\nnBase.:>=\nnBase.:.==\nnBase.:.!=\nnBase.:.<\nnBase.:.<=\nnBase.:.>\nnBase.:.>=\nnBase.cmp\nnBase.:~\nnBase.:&\nnBase.:|\nnBase.:$\nnBase.:!\nn&&\nn||"
},

{
    "location": "stdlib/math.html#Mathematical-Functions-1",
    "title": "Mathematical Functions",
    "category": "Section",
    "text": "Base.isapprox\nnBase.sin\nnBase.cos\nnBase.tan\nnBase.Math.sind\nnBase.Math.cosd\nnBase.Math.tand\nnBase.Math.sinpi\nnBase.Math.cospi\nnBase.sinh\nnBase.cosh\nnBase.tanh\nnBase.asin\nnBase.acos\nnBase.atan\nnBase.Math.atan2\nnBase.Math.asind\nnBase.Math.acosd\nnBase.Math.atand\nnBase.Math.sec\nnBase.Math.csc\nnBase.Math.cot\nnBase.Math.secd\nnBase.Math.cscd\nnBase.Math.cotd\nnBase.Math.asec\nnBase.Math.acsc\nnBase.Math.acot\nnBase.Math.asecd\nnBase.Math.acscd\nnBase.Math.acotd\nnBase.Math.sech\nnBase.Math.csch\nnBase.Math.coth\nnBase.asinh\nnBase.acosh\nnBase.atanh\nnBase.Math.asech\nnBase.Math.acsch\nnBase.Math.acoth\nnBase.Math.sinc\nnBase.Math.cosc\nnBase.Math.deg2rad\nnBase.Math.rad2deg\nnBase.Math.hypot\nnBase.Math.hypot\nnBase.log\nnBase.log\nnBase.log2\nnBase.log10\nnBase.log1p\nnBase.Math.frexp\nnBase.exp\nnBase.exp2\nnBase.exp10\nnBase.Math.ldexp\nnBase.Math.modf\nnBase.expm1\nnBase.round\nnBase.Rounding.RoundingMode\nnBase.Rounding.RoundNearest\nnBase.Rounding.RoundNearestTiesAway\nnBase.Rounding.RoundNearestTiesUp\nnBase.Rounding.RoundToZero\nnBase.Rounding.RoundUp\nnBase.Rounding.RoundDown\nnBase.round\nnBase.ceil\nnBase.floor\nnBase.trunc\nnBase.unsafe_trunc\nnBase.signif\nnBase.min\nnBase.max\nnBase.minmax\nnBase.Math.clamp\nnBase.Math.clamp!\nnBase.abs\nnBase.Checked.checked_abs\nnBase.Checked.checked_neg\nnBase.Checked.checked_add\nnBase.Checked.checked_sub\nnBase.Checked.checked_mul\nnBase.Checked.checked_div\nnBase.Checked.checked_rem\nnBase.Checked.checked_fld\nnBase.Checked.checked_mod\nnBase.Checked.checked_cld\nnBase.abs2\nnBase.copysign\nnBase.sign\nnBase.signbit\nnBase.flipsign\nnBase.sqrt\nnBase.isqrt\nnBase.Math.cbrt\nnBase.Math.erf\nnBase.Math.erfc\nnBase.Math.erfcx\nnBase.Math.erfi\nnBase.Math.dawson\nnBase.Math.erfinv\nnBase.Math.erfcinv\nnBase.real\nnBase.imag\nnBase.reim\nnBase.conj\nnBase.angle\nnBase.cis\nnBase.binomial\nnBase.factorial\nnBase.gcd\nnBase.lcm\nnBase.gcdx\nnBase.ispow2\nnBase.nextpow2\nnBase.prevpow2\nnBase.nextpow\nnBase.prevpow\nnBase.nextprod\nnBase.invmod\nnBase.powermod\nnBase.Math.gamma\nnBase.Math.lgamma\nnBase.Math.lfact\nnBase.Math.digamma\nnBase.Math.invdigamma\nnBase.Math.trigamma\nnBase.Math.polygamma\nnBase.Math.airy\nnBase.Math.airyai\nnBase.Math.airyprime\nnBase.Math.airyaiprime\nnBase.Math.airybi\nnBase.Math.airybiprime\nnBase.Math.airyx\nnBase.Math.besselj0\nnBase.Math.besselj1\nnBase.Math.besselj\nnBase.Math.besseljx\nnBase.Math.bessely0\nnBase.Math.bessely1\nnBase.Math.bessely\nnBase.Math.besselyx\nnBase.Math.hankelh1\nnBase.Math.hankelh1x\nnBase.Math.hankelh2\nnBase.Math.hankelh2x\nnBase.Math.besselh\nnBase.Math.besselhx\nnBase.Math.besseli\nnBase.Math.besselix\nnBase.Math.besselk\nnBase.Math.besselkx\nnBase.Math.beta\nnBase.Math.lbeta\nnBase.Math.eta\nnBase.Math.zeta\nnBase.Math.zeta\nnBase.ndigits\nnBase.widemul\nnBase.Math.@evalpoly"
},

{
    "location": "stdlib/math.html#Statistics-1",
    "title": "Statistics",
    "category": "Section",
    "text": "Base.mean\nnBase.mean\nnBase.mean!\nnBase.std\nnBase.stdm\nnBase.var\nnBase.varm\nnBase.middle\nnBase.middle\nnBase.middle\nnBase.middle\nnBase.median\nnBase.median!\nnBase.midpoints\nnBase.quantile\nnBase.quantile!\nnBase.cov\nnBase.cov\nnBase.cov\nnBase.cov\nnBase.cor\nnBase.cor\nnBase.cor\nnBase.cor"
},

{
    "location": "stdlib/math.html#Base.DFT.FFTW.r2r",
    "title": "Base.DFT.FFTW.r2r",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/math.html#Base.DFT.FFTW.r2r!",
    "title": "Base.DFT.FFTW.r2r!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/math.html#Base.DFT.FFTW.plan_r2r",
    "title": "Base.DFT.FFTW.plan_r2r",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/math.html#Base.DFT.FFTW.plan_r2r!",
    "title": "Base.DFT.FFTW.plan_r2r!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/math.html#Signal-Processing-1",
    "title": "Signal Processing",
    "category": "Section",
    "text": "Fast Fourier transform (FFT) functions in Julia are implemented by calling functions from FFTW. By default, Julia does not use multi-threaded FFTW. Higher performance may be obtained by experimenting with multi-threading. Use FFTW.set_num_threads(np) to use np threads.Base.DFT.fft\nnBase.DFT.fft!\nnBase.DFT.ifft\nnBase.DFT.ifft!\nnBase.DFT.bfft\nnBase.DFT.bfft!\nnBase.DFT.plan_fft\nnBase.DFT.plan_ifft\nnBase.DFT.plan_bfft\nnBase.DFT.plan_fft!\nnBase.DFT.plan_ifft!\nnBase.DFT.plan_bfft!\nnBase.DFT.rfft\nnBase.DFT.irfft\nnBase.DFT.brfft\nnBase.DFT.plan_rfft\nnBase.DFT.plan_brfft\nnBase.DFT.plan_irfft\nnBase.DFT.FFTW.dct\nnBase.DFT.FFTW.dct!\nnBase.DFT.FFTW.idct\nnBase.DFT.FFTW.idct!\nnBase.DFT.FFTW.plan_dct\nnBase.DFT.FFTW.plan_dct!\nnBase.DFT.FFTW.plan_idct\nnBase.DFT.FFTW.plan_idct!\nnBase.DFT.fftshift\nnBase.DFT.fftshift\nnBase.DFT.ifftshift\nnBase.DSP.filt\nnBase.DSP.filt!\nnBase.DSP.deconv\nnBase.DSP.conv\nnBase.DSP.conv2\nnBase.DSP.conv2\nnBase.DSP.xcorrThe following functions are defined within the Base.FFTW module.Base.DFT.FFTW.r2r\nnBase.DFT.FFTW.r2r!\nnBase.DFT.FFTW.plan_r2r\nnBase.DFT.FFTW.plan_r2r!"
},

{
    "location": "stdlib/math.html#Base.QuadGK.quadgk",
    "title": "Base.QuadGK.quadgk",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html",
    "title": "Numbers",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Numbers-1",
    "title": "Numbers",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Standard-Numeric-Types-1",
    "title": "Standard Numeric Types",
    "category": "Section",
    "text": "Bool\nnInt8\nnUInt8\nnInt16\nnUInt16\nnInt32\nnUInt32\nnInt64\nnUInt64\nnInt128\nnUInt128\nnFloat16\nnFloat32\nnFloat64\nnComplex64\nnComplex128"
},

{
    "location": "stdlib/numbers.html#Data-Formats-1",
    "title": "Data Formats",
    "category": "Section",
    "text": "Base.bin\nnBase.hex\nnBase.dec\nnBase.oct\nnBase.base\nnBase.digits\nnBase.digits!\nnBase.bits\nnBase.parse\nnBase.tryparse\nnBase.big\nnBase.signed\nnBase.unsigned\nnBase.float\nnBase.Math.significand\nnBase.Math.exponent\nnBase.complex\nnBase.bswap\nnBase.num2hex\nnBase.hex2num\nnBase.hex2bytes\nnBase.bytes2hex"
},

{
    "location": "stdlib/numbers.html#General-Number-Functions-and-Constants-1",
    "title": "General Number Functions and Constants",
    "category": "Section",
    "text": "Base.one\nnBase.zero\nnBase.pi\nnBase.im\nnBase.eu\nnBase.catalan\nnBase.eulergamma\nnBase.golden\nnBase.Inf\nnBase.Inf32\nnBase.Inf16\nnBase.NaN\nnBase.NaN32\nnBase.NaN16\nnBase.issubnormal\nnBase.isfinite\nnBase.isinf\nnBase.isnan\nnBase.nextfloat\nnBase.prevfloat\nnBase.nextfloat\nnBase.isinteger\nnBase.isreal\nnBase.isimag\nnCore.Float32\nnCore.Float64\nnBase.GMP.BigInt\nnBase.MPFR.BigFloat\nnBase.Rounding.rounding\nnBase.Rounding.setrounding\nnBase.Rounding.setrounding\nnBase.Rounding.get_zero_subnormals\nnBase.Rounding.set_zero_subnormals"
},

{
    "location": "stdlib/numbers.html#Base.count_ones",
    "title": "Base.count_ones",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.count_zeros",
    "title": "Base.count_zeros",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.leading_zeros",
    "title": "Base.leading_zeros",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.leading_ones",
    "title": "Base.leading_ones",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.trailing_zeros",
    "title": "Base.trailing_zeros",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.trailing_ones",
    "title": "Base.trailing_ones",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.isodd",
    "title": "Base.isodd",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.iseven",
    "title": "Base.iseven",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Integers-1",
    "title": "Integers",
    "category": "Section",
    "text": "Base.count_ones\nnBase.count_zeros\nnBase.leading_zeros\nnBase.leading_ones\nnBase.trailing_zeros\nnBase.trailing_ones\nnBase.isodd\nnBase.iseven"
},

{
    "location": "stdlib/numbers.html#BigFloats-1",
    "title": "BigFloats",
    "category": "Section",
    "text": "The BigFloat type implements arbitrary-precision floating-point arithmetic using the GNU MPFR library.Base.precision\nnBase.precision\nnBase.MPFR.setprecision\nnBase.MPFR.setprecision"
},

{
    "location": "stdlib/numbers.html#Base.Random.srand",
    "title": "Base.Random.srand",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.MersenneTwister",
    "title": "Base.Random.MersenneTwister",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.RandomDevice",
    "title": "Base.Random.RandomDevice",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.rand",
    "title": "Base.Random.rand",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.rand!",
    "title": "Base.Random.rand!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.bitrand",
    "title": "Base.Random.bitrand",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.randn",
    "title": "Base.Random.randn",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.randn!",
    "title": "Base.Random.randn!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.randexp",
    "title": "Base.Random.randexp",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.randexp!",
    "title": "Base.Random.randexp!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/numbers.html#Base.Random.randjump",
    "title": "Base.Random.randjump",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html",
    "title": "Tasks and Parallel Computing",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Tasks-and-Parallel-Computing-1",
    "title": "Tasks and Parallel Computing",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Tasks-1",
    "title": "Tasks",
    "category": "Section",
    "text": "Core.Task\nnBase.yieldto\nnBase.current_task\nnBase.istaskdone\nnBase.istaskstarted\nnBase.consume\nnBase.produce\nnBase.yield\nnBase.task_local_storage\nnBase.task_local_storage\nnBase.task_local_storage\nnBase.Condition\nnBase.notify\nnBase.schedule\nnBase.@schedule\nnBase.@task\nnBase.sleep\nnBase.ReentrantLock\nnBase.lock\nnBase.unlock\nnBase.Channel"
},

{
    "location": "stdlib/parallel.html#General-Parallel-Computing-Support-1",
    "title": "General Parallel Computing Support",
    "category": "Section",
    "text": "Base.addprocs\nnBase.addprocs\nnBase.addprocs\nnBase.addprocs\nnBase.nprocs\nnBase.nworkers\nnBase.procs\nnBase.workers\nnBase.rmprocs\nnBase.interrupt\nnBase.myid\nnBase.asyncmap\nnBase.pmap\nnBase.remotecall\nnBase.Future\nnBase.Future\nnBase.RemoteChannel\nnBase.RemoteChannel\nnBase.RemoteChannel\nnBase.wait\nnBase.fetch\nnBase.remotecall_wait\nnBase.remotecall_fetch\nnBase.put!\nnBase.put!\nnBase.put!\nnBase.take!\nnBase.take!\nnBase.isready\nnBase.isready\nnBase.close\nnBase.WorkerPool\nnBase.CachingPool\nnBase._default_worker_pool\nnBase.remote\nnBase.remotecall\nnBase.remotecall_wait\nnBase.remotecall_fetch\nnBase.timedwait\nnBase.@spawn\nnBase.@spawnat\nnBase.@fetch\nnBase.@fetchfrom\nnBase.@async\nnBase.@sync\nnBase.@parallel\nnBase.@everywhere\nnBase.clear!\nnBase.remoteref_id\nnBase.channel_from_id\nnBase.worker_id_from_socket\nnBase.cluster_cookie"
},

{
    "location": "stdlib/parallel.html#Shared-Arrays-1",
    "title": "Shared Arrays",
    "category": "Section",
    "text": "Base.SharedArray\nnBase.SharedArray\nnBase.procs\nnBase.sdata\nnBase.indexpids\nnBase.localindexes"
},

{
    "location": "stdlib/parallel.html#Base.Threads.threadid",
    "title": "Base.Threads.threadid",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.nthreads",
    "title": "Base.Threads.nthreads",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.@threads",
    "title": "Base.Threads.@threads",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.Atomic",
    "title": "Base.Threads.Atomic",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_cas!",
    "title": "Base.Threads.atomic_cas!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_xchg!",
    "title": "Base.Threads.atomic_xchg!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_add!",
    "title": "Base.Threads.atomic_add!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_sub!",
    "title": "Base.Threads.atomic_sub!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_and!",
    "title": "Base.Threads.atomic_and!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_nand!",
    "title": "Base.Threads.atomic_nand!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_or!",
    "title": "Base.Threads.atomic_or!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_xor!",
    "title": "Base.Threads.atomic_xor!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_max!",
    "title": "Base.Threads.atomic_max!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_min!",
    "title": "Base.Threads.atomic_min!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Base.Threads.atomic_fence",
    "title": "Base.Threads.atomic_fence",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/parallel.html#Multi-Threading-1",
    "title": "Multi-Threading",
    "category": "Section",
    "text": "This experimental interface supports Julia's multi-threading capabilities. Types and function described here might (and likely will) change in the future.Base.Threads.threadid\nnBase.Threads.nthreads\nnBase.Threads.@threads\nnBase.Threads.Atomic\nnBase.Threads.atomic_cas!\nnBase.Threads.atomic_xchg!\nnBase.Threads.atomic_add!\nnBase.Threads.atomic_sub!\nnBase.Threads.atomic_and!\nnBase.Threads.atomic_nand!\nnBase.Threads.atomic_or!\nnBase.Threads.atomic_xor!\nnBase.Threads.atomic_max!\nnBase.Threads.atomic_min!\nnBase.Threads.atomic_fence"
},

{
    "location": "stdlib/pkg.html",
    "title": "Package Manager Functions",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/profile.html",
    "title": "Profiling",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/profile.html#Base.Profile.@profile",
    "title": "Base.Profile.@profile",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/punctuation.html",
    "title": "Punctuation",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/simd-types.html",
    "title": "SIMD Support",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/sort.html",
    "title": "Sorting and Related Functions",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/sort.html#Sorting-and-Related-Functions-1",
    "title": "Sorting and Related Functions",
    "category": "Section",
    "text": "Julia has an extensive, flexible API for sorting and interacting with already-sorted arrays of values. By default, Julia picks reasonable algorithms and sorts in standard ascending order:julia> sort([2,3,1])\nn3-element Array{Int64,1}:\nn 1\nn 2\nn 3You can easily sort in reverse order as well:julia> sort([2,3,1], rev=true)\nn3-element Array{Int64,1}:\nn 3\nn 2\nn 1To sort an array in-place, use the \"bang\" version of the sort function:julia> a = [2,3,1];\nn\nnjulia> sort!(a);\nn\nnjulia> a\nn3-element Array{Int64,1}:\nn 1\nn 2\nn 3Instead of directly sorting an array, you can compute a permutation of the array's indices that puts the array into sorted order:julia> v = randn(5)\nn5-element Array{Float64,1}:\nn  0.297288\nn  0.382396\nn -0.597634\nn -0.0104452\nn -0.839027\nn\nnjulia> p = sortperm(v)\nn5-element Array{Int64,1}:\nn 5\nn 3\nn 4\nn 1\nn 2\nn\nnjulia> v[p]\nn5-element Array{Float64,1}:\nn -0.839027\nn -0.597634\nn -0.0104452\nn  0.297288\nn  0.382396Arrays can easily be sorted according to an arbitrary transformation of their values:julia> sort(v, by=abs)\nn5-element Array{Float64,1}:\nn -0.0104452\nn  0.297288\nn  0.382396\nn -0.597634\nn -0.839027Or in reverse order by a transformation:julia> sort(v, by=abs, rev=true)\nn5-element Array{Float64,1}:\nn -0.839027\nn -0.597634\nn  0.382396\nn  0.297288\nn -0.0104452If needed, the sorting algorithm can be chosen:julia> sort(v, alg=InsertionSort)\nn5-element Array{Float64,1}:\nn -0.839027\nn -0.597634\nn -0.0104452\nn  0.297288\nn  0.382396All the sorting and order related functions rely on a \"less than\" relation defining a total order on the values to be manipulated. The isless function is invoked by default, but the relation can be specified via the lt keyword."
},

{
    "location": "stdlib/sort.html#Sorting-Functions-1",
    "title": "Sorting Functions",
    "category": "Section",
    "text": "Base.sort!\nnBase.sort\nnBase.sort\nnBase.sortperm\nnBase.Sort.sortperm!\nnBase.Sort.sortrows\nnBase.Sort.sortcols"
},

{
    "location": "stdlib/sort.html#Base.issorted",
    "title": "Base.issorted",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/sort.html#Base.Sort.searchsorted",
    "title": "Base.Sort.searchsorted",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/sort.html#Base.Sort.searchsortedfirst",
    "title": "Base.Sort.searchsortedfirst",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/sort.html#Base.Sort.searchsortedlast",
    "title": "Base.Sort.searchsortedlast",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/sort.html#Base.Sort.select!",
    "title": "Base.Sort.select!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/sort.html#Base.Sort.select",
    "title": "Base.Sort.select",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/sort.html#Base.Sort.selectperm",
    "title": "Base.Sort.selectperm",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/sort.html#Base.Sort.selectperm!",
    "title": "Base.Sort.selectperm!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/sort.html#Order-Related-Functions-1",
    "title": "Order-Related Functions",
    "category": "Section",
    "text": "Base.issorted\nnBase.Sort.searchsorted\nnBase.Sort.searchsortedfirst\nnBase.Sort.searchsortedlast\nnBase.Sort.select!\nnBase.Sort.select\nnBase.Sort.selectperm\nnBase.Sort.selectperm!"
},

{
    "location": "stdlib/stacktraces.html",
    "title": "StackTraces",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/stacktraces.html#Base.StackTraces.StackFrame",
    "title": "Base.StackTraces.StackFrame",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/stacktraces.html#Base.StackTraces.StackTrace",
    "title": "Base.StackTraces.StackTrace",
    "category": "Type",
    "text": ""
},

{
    "location": "stdlib/stacktraces.html#Base.StackTraces.stacktrace",
    "title": "Base.StackTraces.stacktrace",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/stacktraces.html#Base.StackTraces.catch_stacktrace",
    "title": "Base.StackTraces.catch_stacktrace",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/stacktraces.html#Base.StackTraces.lookup",
    "title": "Base.StackTraces.lookup",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/stacktraces.html#Base.StackTraces.remove_frames!",
    "title": "Base.StackTraces.remove_frames!",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/strings.html",
    "title": "Strings",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/test.html",
    "title": "Unit Testing",
    "category": "Page",
    "text": ""
},

{
    "location": "stdlib/test.html#Unit-Testing-1",
    "title": "Unit Testing",
    "category": "Section",
    "text": ""
},

{
    "location": "stdlib/test.html#Base.runtests",
    "title": "Base.runtests",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/test.html#Testing-Base-Julia-1",
    "title": "Testing Base Julia",
    "category": "Section",
    "text": "Julia is under rapid development and has an extensive test suite to verify functionality across multiple platforms. If you build Julia from source, you can run this test suite with make test. In a binary install, you can run the test suite using Base.runtests().Base.runtests"
},

{
    "location": "stdlib/test.html#Base.Test.@test",
    "title": "Base.Test.@test",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/test.html#Base.Test.@test_throws",
    "title": "Base.Test.@test_throws",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/test.html#Basic-Unit-Tests-1",
    "title": "Basic Unit Tests",
    "category": "Section",
    "text": "The Base.Test module provides simple unit testing functionality. Unit testing is a way to see if your code is correct by checking that the results are what you expect. It can be helpful to ensure your code still works after you make changes, and can be used when developing as a way of specifying the behaviors your code should have when complete.Simple unit testing can be performed with the @test() and @test_throws() macros:Base.Test.@test\nnBase.Test.@test_throwsFor example, suppose we want to check our new function foo(x) works as expected:julia> using Base.Test\nn\nnjulia> foo(x) = length(x)^2\nnfoo (generic function with 1 method)If the condition is true, a Pass is returned:julia> @test foo(\"bar\") == 9\nnTest Passed\nn  Expression: foo(\"bar\") == 9\nn   Evaluated: 9 == 9\nn\nnjulia> @test foo(\"fizz\") >= 10\nnTest Passed\nn  Expression: foo(\"fizz\") >= 10\nn   Evaluated: 16 >= 10If the condition is false, then a Fail is returned and an exception is thrown:julia> @test foo(\"f\") == 20\nnTest Failed\nn  Expression: foo(\"f\") == 20\nn   Evaluated: 1 == 20\nnERROR: There was an error during testing\nn in record at test.jl:268\nn in do_test at test.jl:191If the condition could not be evaluated because an exception was thrown, which occurs in this case because length() is not defined for symbols, an Error object is returned and an exception is thrown:julia> @test foo(:cat) == 1\nnError During Test\nn  Test threw an exception of type MethodError\nn  Expression: foo(:cat) == 1\nn  MethodError: `length` has no method matching length(::Symbol)\nn   in foo at none:1\nn   in anonymous at test.jl:159\nn   in do_test at test.jl:180\nnERROR: There was an error during testing\nn in record at test.jl:268\nn in do_test at test.jl:191If we expect that evaluating an expression should throw an exception, then we can use @test_throws() to check that this occurs:julia> @test_throws MethodError foo(:cat)\nnTest Passed\nn  Expression: foo(:cat)\nn   Evaluated: MethodError"
},

{
    "location": "stdlib/test.html#Base.Test.@testset",
    "title": "Base.Test.@testset",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/test.html#Working-with-Test-Sets-1",
    "title": "Working with Test Sets",
    "category": "Section",
    "text": "Typically a large of number of tests are used to make sure functions work correctly over a range of inputs. In the event a test fails, the default behavior is to throw an exception immediately. However, it is normally preferable to run the rest of the tests first to get a better picture of how many errors there are in the code being tested.The @testset() macro can be used to group tests into sets. All the tests in a test set will be run, and at the end of the test set a summary will be printed. If any of the tests failed, or could not be evaluated due to an error, the test set will then throw a TestSetException.Base.Test.@testsetWe can put our tests for the foo(x) function in a test set:julia> @testset \"Foo Tests\" begin\nn           @test foo(\"a\")   == 1\nn           @test foo(\"ab\")  == 4\nn           @test foo(\"abc\") == 9\nn       end\nnTest Summary: | Pass  Total\nnFoo Tests     |    3      3Test sets can also be nested:julia> @testset \"Foo Tests\" begin\nn           @testset \"Animals\" begin\nn               @test foo(\"cat\") == 9\nn               @test foo(\"dog\") == foo(\"cat\")\nn           end\nn           @testset \"Arrays $i\" for i in 1:3\nn               @test foo(zeros(i)) == i^2\nn               @test foo(ones(i)) == i^2\nn           end\nn       end\nnTest Summary: | Pass  Total\nnFoo Tests     |    8      8In the event that a nested test set has no failures, as happened here, it will be hidden in the summary. If we do have a test failure, only the details for the failed test sets will be shown:julia> @testset \"Foo Tests\" begin\nn           @testset \"Animals\" begin\nn               @testset \"Felines\" begin\nn                   @test foo(\"cat\") == 9\nn               end\nn               @testset \"Canines\" begin\nn                   @test foo(\"dog\") == 9\nn               end\nn           end\nn           @testset \"Arrays\" begin\nn               @test foo(zeros(2)) == 4\nn               @test foo(ones(4)) == 15\nn           end\nn       end\nn\nnArrays: Test Failed\nn  Expression: foo(ones(4)) == 15\nn   Evaluated: 16 == 15\nn in record at test.jl:297\nn in do_test at test.jl:191\nnTest Summary: | Pass  Fail  Total\nnFoo Tests     |    3     1      4\nn  Animals     |    2            2\nn  Arrays      |    1     1      2\nnERROR: Some tests did not pass: 3 passed, 1 failed, 0 errored, 0 broken.\nn in finish at test.jl:362"
},

{
    "location": "stdlib/test.html#Base.Test.@test_approx_eq",
    "title": "Base.Test.@test_approx_eq",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/test.html#Base.Test.@test_approx_eq_eps",
    "title": "Base.Test.@test_approx_eq_eps",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/test.html#Base.Test.@inferred",
    "title": "Base.Test.@inferred",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/test.html#Other-Test-Macros-1",
    "title": "Other Test Macros",
    "category": "Section",
    "text": "As calculations on floating-point values can be imprecise, you can perform approximate equality checks using either @test a ≈ b (where ≈, typed via tab completion of \approx, is the isapprox() function) or use isapprox() directly.An alternative is the @test_approx_eq macro (which differs from isapprox in that it treats NaN values as equal and has a smaller default tolerance) or @test_approx_eq_eps (which takes an extra argument indicating the relative tolerance):julia> @test 1 ≈ 0.999999999\nn\nnjulia> @test 1 ≈ 0.999999\nnERROR: test failed: 1 isapprox 0.999999\nn in expression: 1 ≈ 0.999999\nn in error at error.jl:21\nn in default_handler at test.jl:30\nn in do_test at test.jl:53\nn\nnjulia> @test_approx_eq 1. 0.999999999\nnERROR: assertion failed: |1.0 - 0.999999999| < 2.220446049250313e-12\nn  1.0 = 1.0\nn  0.999999999 = 0.999999999\nn in test_approx_eq at test.jl:75\nn in test_approx_eq at test.jl:80\nn\nnjulia> @test_approx_eq 1. 0.9999999999999\nn\nnjulia> @test_approx_eq_eps 1. 0.999 1e-2\nn\nnjulia> @test_approx_eq_eps 1. 0.999 1e-3\nnERROR: assertion failed: |1.0 - 0.999| <= 0.001\nn  1.0 = 1.0\nn  0.999 = 0.999\nn  difference = 0.0010000000000000009 > 0.001\nn in error at error.jl:22\nn in test_approx_eq at test.jl:68Note that these macros will fail immediately, and are not compatible with @testset(), so using @test isapprox is encouraged when writing new tests.Base.Test.@test_approx_eq\nnBase.Test.@test_approx_eq_eps\nnBase.Test.@inferred"
},

{
    "location": "stdlib/test.html#Base.Test.@test_broken",
    "title": "Base.Test.@test_broken",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/test.html#Base.Test.@test_skip",
    "title": "Base.Test.@test_skip",
    "category": "Macro",
    "text": ""
},

{
    "location": "stdlib/test.html#Broken-Tests-1",
    "title": "Broken Tests",
    "category": "Section",
    "text": "If a test fails consistently it can be changed to use the @test_broken() macro. This will denote the test as Broken if the test continues to fail and alerts the user via an Error if the test succeeds.Base.Test.@test_broken@test_skip() is also available to skip a test without evaluation, but counting the skipped test in the test set reporting. The test will not run but gives a BrokenResult.Base.Test.@test_skip"
},

{
    "location": "stdlib/test.html#Base.Test.record",
    "title": "Base.Test.record",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/test.html#Base.Test.finish",
    "title": "Base.Test.finish",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/test.html#Base.Test.get_testset",
    "title": "Base.Test.get_testset",
    "category": "Function",
    "text": ""
},

{
    "location": "stdlib/test.html#Base.Test.get_testset_depth",
    "title": "Base.Test.get_testset_depth",
    "category": "Function",
    "text": ""
},

{
    "location": "devdocs/ast.html",
    "title": "Julia ASTs",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/ast.html#Julia-ASTs-1",
    "title": "Julia ASTs",
    "category": "Section",
    "text": "Julia has two representations of code. First there is a surface syntax AST returned by the parser (e.g. the parse() function), and manipulated by macros. It is a structured representation of code as it is written, constructed by julia-parser.scm from a character stream. Next there is a lowered form, or IR (intermediate representation), which is used by type inference and code generation. In the lowered form there are fewer types of nodes, all macros are expanded, and all control flow is converted to explicit branches and sequences of statements. The lowered form is constructed by julia-syntax.scm.First we will focus on the lowered form, since it is more important to the compiler. It is also less obvious to the human, since it results from a significant rearrangement of the input syntax."
},

{
    "location": "devdocs/ast.html#Lowered-form-1",
    "title": "Lowered form",
    "category": "Section",
    "text": "The following data types exist in lowered form:Expr\nnhas a node type indicated by the head field, and an args field which is a Vector{Any} of subexpressions.\nnSlot\nnidentifies arguments and local variables by consecutive numbering. Slot is an abstract type with subtypes SlotNumber and TypedSlot. Both types have an integer-valued id field giving the slot index. Most slots have the same type at all uses, and so are represented with SlotNumber. The types of these slots are found in the slottypes field of their LambdaInfo object. Slots that require per-use type annotations are represented with TypedSlot, which has a typ field.\nnLambdaInfo\nnwraps the IR of each method.\nnLineNumberNode\nncontains a single number, specifying the line number the next statement came from.\nnLabelNode\nnbranch target, a consecutively-numbered integer starting at 0\nnGotoNode\nnunconditional branch\nnQuoteNode\nnwraps an arbitrary value to reference as data. For example, the function f() = :a contains a QuoteNode whose value field is the symbol a, in order to return the symbol itself instead of evaluating it.\nnGlobalRef\nnrefers to global variable name in module mod\nnSSAValue\nnrefers to a consecutively-numbered (starting at 0) static single assignment (SSA) variable inserted by the compiler.\nnNewvarNode\nnMarks a point where a variable is created. This has the effect of resetting a variable to undefined."
},

{
    "location": "devdocs/ast.html#Expr-types-1",
    "title": "Expr types",
    "category": "Section",
    "text": "These symbols appear in the head field of Exprs in lowered form.call\nnfunction call (dynamic dispatch). args[1] is the function to call, args[2:end] are the arguments.\nninvoke\nnfunction call (static dispatch). args[1] is the LambdaInfo to call, args[2:end] are the arguments (including the function that is being called, at args[2]).\nnstatic_parameter\nnreference a static parameter by index.\nnline\nnline number and file name metadata. Unlike a LineNumberNode, can also contain a file name.\nngotoifnot\nnconditional branch. If args[1] is false, goes to label identified in args[2].\nn=\nnassignment\nnmethod\nnadds a method to a generic function and assigns the result if necessary.\nnHas a 1-argument form and a 4-argument form. The 1-argument form arises from the syntax function foo end. In the 1-argument form, the argument is a symbol. If this symbol already names a function in the current scope, nothing happens. If the symbol is undefined, a new function is created and assigned to the identifier specified by the symbol. If the symbol is defined but names a non-function, an error is raised. The definition of \"names a function\" is that the binding is constant, and refers to an object of singleton type. The rationale for this is that an instance of a singleton type uniquely identifies the type to add the method to. When the type has fields, it wouldn't be clear whether the method was being added to the instance or its type.\nnThe 4-argument form has the following arguments: args[1] - A function name, or false if unknown. If a symbol, then the expression first behaves like the 1-argument form above. This argument is ignored from then on. When this is false, it means a method is being added strictly by type, (::T)(x) = x.\nnargs[2] - a SimpleVector of argument type data. args[2][1] is a Tuple type of the argument types, and args[2][2] is a SimpleVector of type variables corresponding to the method's static parameters.\nnargs[3] - a LambdaInfo of the method itself. For \"out of scope\" method definitions (adding a method to a function that also has methods defined in different scopes) this is an expression that evaluates to a :lambda expression.\nnargs[4] - true or false, identifying whether the method is staged (@generated function)\nnconst\nndeclares a (global) variable as constant\nnnull\nnhas no arguments; simply yields the value nothing\nnnew\nnallocates a new struct-like object. First argument is the type. The new pseudo-function is lowered to this, and the type is always inserted by the compiler.  This is very much an internal-only feature, and does no checking. Evaluating arbitrary new expressions can easily segfault.\nnreturn\nnreturns its argument as the value of the enclosing function.\nnthe_exception\nnyields the caught exception inside a catch block. This is the value of the run time system variable jl_exception_in_transit.\nnenter\nnenters an exception handler (setjmp). args[1] is the label of the catch block to jump to on error.\nnleave\nnpop exception handlers. args[1] is the number of handlers to pop.\nninbounds\nncontrols turning bounds checks on or off. A stack is maintained; if the first argument of this expression is true or false (true means bounds checks are disabled), it is pushed onto the stack. If the first argument is :pop, the stack is popped.\nnboundscheck\nnindicates the beginning or end of a section of code that performs a bounds check. Like inbounds, a stack is maintained, and the second argument can be one of: true, false, or :pop.\nncopyast\nnpart of the implementation of quasi-quote. The argument is a surface syntax AST that is simply copied recursively and returned at run time.\nnmeta\nnmetadata. args[1] is typically a symbol specifying the kind of metadata, and the rest of the arguments are free-form. The following kinds of metadata are commonly used:\nn:inline and :noinline: Inlining hints.\nn:push_loc: enters a sequence of statements from a specified source location.\nnargs[2] specifies a filename, as a symbol.\nnargs[3] optionally specifies the name of an (inlined) function that originally contained the code.\nn:pop_loc: returns to the source location before the matching :push_loc."
},

{
    "location": "devdocs/ast.html#LambdaInfo-1",
    "title": "LambdaInfo",
    "category": "Section",
    "text": "sparam_syms - The names (symbols) of static parameters.sparam_vals - The values of the static parameters (once known), indexed by sparam_syms.code - An Any array of statements, or a UInt8 array with a compressed representation of the code.slotnames - An array of symbols giving the name of each slot (argument or local variable).slottypes - An array of types for the slots.slotflags - A UInt8 array of slot properties, represented as bit flags:\nn1  - captured (closed over)\nn2  - assigned (only false if there are no assignment statements with this var on the left)\nn4  - assigned by an inner function\nn8  - const (currently unused for local variables)\nn16 - statically assigned once\nn32 - might be used before assigned. This flag is only valid after type inference.\nnssavaluetypes - Either an array or an Int giving the number of compiler-inserted\nntemporary locations in the function. If an array, specifies a type for each location.\nnnargs - The number of argument slots. The first nargs entries of the slots\nnarrays refer to arguments.isva - A boolean indicating whether the function is variadic."
},

{
    "location": "devdocs/ast.html#Surface-syntax-AST-1",
    "title": "Surface syntax AST",
    "category": "Section",
    "text": "Front end ASTs consist entirely of Exprs and atoms (e.g. symbols, numbers). There is generally a different expression head for each visually distinct syntactic form. Examples will be given in s-expression syntax. Each parenthesized list corresponds to an Expr, where the first element is the head. For example (call f x) corresponds to Expr(:call, :f, :x) in Julia."
},

{
    "location": "devdocs/ast.html#Calls-1",
    "title": "Calls",
    "category": "Section",
    "text": "Input AST\nnf(x) (call f x)\nnf(x, y=1, z=2) (call f x (kw y 1) (kw z 2))\nnf(x; y=1) (call f (parameters (kw y 1)) x)\nnf(x...) (call f (... x))Do syntax:f(x) do a,b\nn    body\nnendparses as (call f (-> (tuple a b) (block body)) x)."
},

{
    "location": "devdocs/ast.html#Operators-1",
    "title": "Operators",
    "category": "Section",
    "text": "Most uses of operators are just function calls, so they are parsed with the head call. However some operators are special forms (not necessarily function calls), and in those cases the operator itself is the expression head. In julia-parser.scm these are referred to as \"syntactic operators\". Some operators (+ and *) use N-ary parsing; chained calls are parsed as a single N-argument call. Finally, chains of comparisons have their own special expression structure.Input AST\nnx+y (call + x y)\nna+b+c+d (call + a b c d)\nn2x (call * 2 x)\nna&&b (&& a b)\nnx += 1 (+= x 1)\nna ? 1 : 2 (if a 1 2)\nna:b (: a b)\nna:b:c (: a b c)\nna,b (tuple a b)\nna==b (comparison a == b)\nn1<i<=n (comparison 1 < i <= n)\nna.b (. a (quote b))\nna.(b) (. a b)"
},

{
    "location": "devdocs/ast.html#Bracketed-forms-1",
    "title": "Bracketed forms",
    "category": "Section",
    "text": "Input AST\nna[i] (ref a i)\nnt[i;j] (typed_vcat t i j)\nnt[i j] (typed_hcat t i j)\nnt[a b; c d] (typed_vcat t (row a b) (row c d))\nna{b} (curly a b)\nna{b;c} (curly a (parameters c) b)\nn[x] (vect x)\nn[x,y] (vect x y)\nn[x;y] (vcat x y)\nn[x y] (hcat x y)\nn[x y; z t] (vcat (row x y) (row z t))\nn[x for y in z, a in b] (comprehension x (= y z) (= a b))\nnT[x for y in z] (typed_comprehension T x (= y z))\nn(a, b, c) (tuple a b c)\nn(a; b; c) (block a (block b c))"
},

{
    "location": "devdocs/ast.html#Macros-1",
    "title": "Macros",
    "category": "Section",
    "text": "Input AST\nn@m x y (macrocall @m x y)\nnBase.@m x y (macrocall (. Base (quote @m)) x y)\nn@Base.m x y (macrocall (. Base (quote @m)) x y)"
},

{
    "location": "devdocs/ast.html#Strings-1",
    "title": "Strings",
    "category": "Section",
    "text": "Input AST\nn\"a\" \"a\"\nnx\"y\" (macrocall @x_str \"y\")\nnx\"y\"z (macrocall @x_str \"y\" \"z\")\nn\"x = x\" (string \"x = \" x)\nna b c (macrocall @cmd \"a b c\")\nnx ~ distr (macrocall @~ x distr)Doc string syntax:\"some docs\"\nnf(x) = xparses as (macrocall (|.| Base '@doc) \"some docs\" (= (call f x) (block x)))"
},

{
    "location": "devdocs/ast.html#Imports-and-such-1",
    "title": "Imports and such",
    "category": "Section",
    "text": "Input AST\nnimport a (import a)\nnimport a.b.c (import a b c)\nnimport ...a (import . . . a)\nnimport a.b, c.d (toplevel (import a b) (import c d))\nnimport Base: x (import Base x)\nnimport Base: x, y (toplevel (import Base x) (import Base y))\nnexport a, b (export a b)"
},

{
    "location": "devdocs/ast.html#Numbers-1",
    "title": "Numbers",
    "category": "Section",
    "text": "Julia supports more number types than many scheme implementations, so not all numbers are represented directly as scheme numbers in the AST.Input AST\nn11111111111111111111 (macrocall @int128_str \"11111111111111111111\")\nn0xfffffffffffffffff (macrocall @uint128_str \"0xfffffffffffffffff\")\nn1111...many digits... (macrocall @big_str \"1111....\")"
},

{
    "location": "devdocs/backtraces.html",
    "title": "Reporting and analyzing crashes (segfaults)",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/backtraces.html#Reporting-and-analyzing-crashes-(segfaults)-1",
    "title": "Reporting and analyzing crashes (segfaults)",
    "category": "Section",
    "text": "So you managed to break Julia.  Congratulations!  Collected here are some general procedures you can undergo for common symptoms encountered when something goes awry.  Including the information from these debugging steps can greatly help the maintainers when tracking down a segfault or trying to figure out why your script is running slower than expected.If you've been directed to this page, find the symptom that best matches what you're experiencing and follow the instructions to generate the debugging information requested.  Table of symptoms:Segfaults during bootstrap (sysimg.jl)\nnSegfaults when running a script\nnErrors during Julia startup"
},

{
    "location": "devdocs/backtraces.html#Version/Environment-info-1",
    "title": "Version/Environment info",
    "category": "Section",
    "text": "No matter the error, we will always need to know what version of Julia you are running. When Julia first starts up, a header is printed out with a version number and date.  If your version is 0.2.0 or higher, please include the output of versioninfo() in any report you create:julia> versioninfo()\nnJulia Version 0.3.3-pre+25\nnCommit 417b50a* (2014-11-03 11:32 UTC)\nnPlatform Info:\nn  System: Linux (x86_64-linux-gnu)\nn  CPU: Intel(R) Core(TM) i7 CPU       L 640  @ 2.13GHz\nn  WORD_SIZE: 64\nn  BLAS: libopenblas (USE64BITINT DYNAMIC_ARCH NO_AFFINITY Nehalem)\nn  LAPACK: libopenblas\nn  LIBM: libopenlibm\nn  LLVM: libLLVM-3.3"
},

{
    "location": "devdocs/backtraces.html#Segfaults-during-bootstrap-(sysimg.jl)-1",
    "title": "Segfaults during bootstrap (sysimg.jl)",
    "category": "Section",
    "text": "Segfaults toward the end of the make process of building Julia are a common symptom of something going wrong while Julia is preparsing the corpus of code in the base/ folder.  Many factors can contribute toward this process dying unexpectedly, however it is as often as not due to an error in the C-code portion of Julia, and as such must typically be debugged with a debug build inside of gdb.  Explicitly:Create a debug build of Julia:$ cd <julia_root>\nn$ make debugNote that this process will likely fail with the same error as a normal make incantation, however this will create a debug executable that will offer gdb the debugging symbols needed to get accurate backtraces.  Next, manually run the bootstrap process inside of gdb:$ cd base/\nn$ gdb -x ../contrib/debug_bootstrap.gdbThis will start gdb, attempt to run the bootstrap process using the debug build of Julia, and print out a backtrace if (when) it segfaults.  You may need to hit <enter> a few times to get the full backtrace.  Create a gist with the backtrace, the version info, and any other pertinent information you can think of and open a new issue on Github with a link to the gist."
},

{
    "location": "devdocs/backtraces.html#Segfaults-when-running-a-script-1",
    "title": "Segfaults when running a script",
    "category": "Section",
    "text": "The procedure is very similar to Segfaults during bootstrap (sysimg.jl).  Create a debug build of Julia, and run your script inside of a debugged Julia process:$ cd <julia_root>\nn$ make debug\nn$ gdb --args usr/bin/julia-debug <path_to_your_script>Note that gdb will sit there, waiting for instructions.  Type r to run the process, and bt to generate a backtrace once it segfaults:(gdb) r\nnStarting program: /home/sabae/src/julia/usr/bin/julia-debug ./test.jl\nn...\nn(gdb) btCreate a gist with the backtrace, the version info, and any other pertinent information you can think of and open a new issue on Github with a link to the gist."
},

{
    "location": "devdocs/backtraces.html#Errors-during-Julia-startup-1",
    "title": "Errors during Julia startup",
    "category": "Section",
    "text": "Occasionally errors occur during Julia's startup process (especially when using binary distributions, as opposed to compiling from source) such as the following:$ julia\nnexec: error -5These errors typically indicate something is not getting loaded properly very early on in the bootup phase, and our best bet in determining what's going wrong is to use external tools to audit the disk activity of the julia process:On Linux, use strace:\nn$ strace julia\nnOn OSX, use dtruss:\nn$ dtruss -f juliaCreate a gist with the strace/ dtruss ouput, the version info, and any other pertinent information and open a new issue on Github with a link to the gist."
},

{
    "location": "devdocs/boundscheck.html",
    "title": "Bounds checking",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/boundscheck.html#Bounds-checking-1",
    "title": "Bounds checking",
    "category": "Section",
    "text": "Like many modern programming languages, Julia uses bounds checking to ensure program safety when accessing arrays. In tight inner loops or other performance critical situations, you may wish to skip these bounds checks to improve runtime performance. For instance, in order to emit vectorized (SIMD) instructions, your loop body cannot contain branches, and thus cannot contain bounds checks. Consequently, Julia includes an @inbounds(...) macro to tell the compiler to skip such bounds checks within the given block. For the built-in Array type, the magic happens inside the arrayref and arrayset intrinsics. User-defined array types instead use the @boundscheck(...) macro to achieve context-sensitive code selection."
},

{
    "location": "devdocs/boundscheck.html#Eliding-bounds-checks-1",
    "title": "Eliding bounds checks",
    "category": "Section",
    "text": "The @boundscheck(...) macro marks blocks of code that perform bounds checking. When such blocks appear inside of an @inbounds(...) block, the compiler removes these blocks. When the @boundscheck(...) is nested inside of a calling function containing an @inbounds(...), the compiler will remove the @boundscheck block only if it is inlined into the calling function. For example, you might write the method sum as:function sum(A::AbstractArray)\nn    r = zero(eltype(A))\nn    for i = 1:length(A)\nn        @inbounds r += A[i]\nn    end\nn    return r\nnendWith a custom array-like type MyArray having:@inline getindex(A::MyArray, i::Real) = (@boundscheck checkbounds(A,i); A.data[to_index(i)])Then when getindex is inlined into sum, the call to checkbounds(A,i) will be elided. If your function contains multiple layers of inlining, only @boundscheck blocks at most one level of inlining deeper are eliminated. The rule prevents unintended changes in program behavior from code further up the stack."
},

{
    "location": "devdocs/boundscheck.html#Propagating-inbounds-1",
    "title": "Propagating inbounds",
    "category": "Section",
    "text": "There may be certain scenarios where for code-organization reasons you want more than one layer between the @inbounds and @boundscheck declarations. For instance, the default getindex methods have the chain getindex(A::AbstractArray, i::Real) calls getindex(linearindexing(A), A, i) calls _getindex(::LinearFast, A, i).To override the \"one layer of inlining\" rule, a function may be marked with @propagate_inbounds to propagate an inbounds context (or out of bounds context) through one additional layer of inlining."
},

{
    "location": "devdocs/callconv.html",
    "title": "Calling Conventions",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/callconv.html#Calling-Conventions-1",
    "title": "Calling Conventions",
    "category": "Section",
    "text": "Julia uses three calling conventions for four distinct purposes:Name Prefix Purpose\nnNative julia_ Speed via specialized signatures\nnJL Call jlcall_ Wrapper for generic calls\nnJL Call jl_ Builtins\nnC ABI jlcapi_ Wrapper callable from C"
},

{
    "location": "devdocs/callconv.html#Julia-Native-Calling-Convention-1",
    "title": "Julia Native Calling Convention",
    "category": "Section",
    "text": "The native calling convention is designed for fast non-generic calls. It usually uses a specialized signature.LLVM ghosts (zero-length types) are omitted.\nnLLVM scalars and vectors are passed by value.\nnLLVM aggregates (arrays and structs) are passed by reference.A small return values is returned as LLVM return values. A large return values is returned via the \"structure return\" (sret) convention, where the caller provides a pointer to a return slot.An argument or return values thta is a homogeneous tuple is sometimes represented as an LLVM vector instead of an LLVM array."
},

{
    "location": "devdocs/callconv.html#JL-Call-Convention-1",
    "title": "JL Call Convention",
    "category": "Section",
    "text": "The JL Call convention is for builtins and generic dispatch. Hand-written functions using this convention are declared via the macro JL_CALLABLE. The convention uses exactly 3 parameters:F  - Julia representation of function that is being applied\nnargs - pointer to array of pointers to boxes\nnnargs - length of the arrayThe return value is a pointer to a box."
},

{
    "location": "devdocs/cartesian.html",
    "title": "Base.Cartesian",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian-1",
    "title": "Base.Cartesian",
    "category": "Section",
    "text": "The (non-exported) Cartesian module provides macros that facilitate writing multidimensional algorithms. It is hoped that Cartesian will not, in the long term, be necessary; however, at present it is one of the few ways to write compact and performant multidimensional code."
},

{
    "location": "devdocs/cartesian.html#Principles-of-usage-1",
    "title": "Principles of usage",
    "category": "Section",
    "text": "A simple example of usage is:@nloops 3 i A begin\nn    s += @nref 3 A i\nnendwhich generates the following code:for i_3 = 1:size(A,3)\nn    for i_2 = 1:size(A,2)\nn        for i_1 = 1:size(A,1)\nn            s += A[i_1,i_2,i_3]\nn        end\nn    end\nnendIn general, Cartesian allows you to write generic code that contains repetitive elements, like the nested loops in this example.  Other applications include repeated expressions (e.g., loop unwinding) or creating function calls with variable numbers of arguments without using the \"splat\" construct (i...)."
},

{
    "location": "devdocs/cartesian.html#Basic-syntax-1",
    "title": "Basic syntax",
    "category": "Section",
    "text": "The (basic) syntax of @nloops is as follows:The first argument must be an integer (not a variable) specifying the number of loops.\nnThe second argument is the symbol-prefix used for the iterator variable. Here we used i, and variables i_1, i_2, i_3 were generated.\nnThe third argument specifies the range for each iterator variable. If you use a variable (symbol) here, it's taken as 1:size(A,dim). More flexibly, you can use the anonymous-function expression syntax described below.\nnThe last argument is the body of the loop. Here, that's what appears between the begin...end.There are some additional features of @nloops described in the reference section.@nref follows a similar pattern, generating A[i_1,i_2,i_3] from @nref 3 A i. The general practice is to read from left to right, which is why @nloops is @nloops 3 i A expr (as in for i_2 = 1:size(A,2), where i_2 is to the left and the range is to the right) whereas @nref is @nref 3 A i (as in A[i_1,i_2,i_3], where the array comes first).If you're developing code with Cartesian, you may find that debugging is easier when you examine the generated code, using macroexpand:julia> macroexpand(:(@nref 2 A i))\nn:(A[i_1,i_2])"
},

{
    "location": "devdocs/cartesian.html#Supplying-the-number-of-expressions-1",
    "title": "Supplying the number of expressions",
    "category": "Section",
    "text": "The first argument to both of these macros is the number of expressions, which must be an integer. When you're writing a function that you intend to work in multiple dimensions, this may not be something you want to hard-code. If you're writing code that you need to work with older Julia versions, currently you should use the @ngenerate macro described in an older version of this documentation.Starting in Julia 0.4-pre, the recommended approach is to use a @generated function.  Here's an example:@generated function mysum{T,N}(A::Array{T,N})\nn    quote\nn        s = zero(T)\nn        @nloops $N i A begin\nn            s += @nref $N A i\nn        end\nn        s\nn    end\nnendNaturally, you can also prepare expressions or perform calculations before the quote block."
},

{
    "location": "devdocs/cartesian.html#Anonymous-function-expressions-as-macro-arguments-1",
    "title": "Anonymous-function expressions as macro arguments",
    "category": "Section",
    "text": "Perhaps the single most powerful feature in Cartesian is the ability to supply anonymous-function expressions that get evaluated at parsing time.  Let's consider a simple example:@nexprs 2 j->(i_j = 1)@nexprs generates n expressions that follow a pattern. This code would generate the following statements:i_1 = 1\nni_2 = 1In each generated statement, an \"isolated\" j (the variable of the anonymous function) gets replaced by values in the range 1:2. Generally speaking, Cartesian employs a LaTeX-like syntax.  This allows you to do math on the index j.  Here's an example computing the strides of an array:s_1 = 1\nn@nexprs 3 j->(s_{j+1} = s_j * size(A, j))would generate expressionss_1 = 1\nns_2 = s_1 * size(A, 1)\nns_3 = s_2 * size(A, 2)\nns_4 = s_3 * size(A, 3)Anonymous-function expressions have many uses in practice."
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@nloops",
    "title": "Base.Cartesian.@nloops",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@nref",
    "title": "Base.Cartesian.@nref",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@nextract",
    "title": "Base.Cartesian.@nextract",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@nexprs",
    "title": "Base.Cartesian.@nexprs",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@ncall",
    "title": "Base.Cartesian.@ncall",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@ntuple",
    "title": "Base.Cartesian.@ntuple",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@nall",
    "title": "Base.Cartesian.@nall",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@nany",
    "title": "Base.Cartesian.@nany",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/cartesian.html#Base.Cartesian.@nif",
    "title": "Base.Cartesian.@nif",
    "category": "Macro",
    "text": ""
},

{
    "location": "devdocs/C.html",
    "title": "Developing/debugging Julia's C code",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/debuggingtips.html",
    "title": "gdb debugging tips",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/debuggingtips.html#gdb-debugging-tips-1",
    "title": "gdb debugging tips",
    "category": "Section",
    "text": ""
},

{
    "location": "devdocs/debuggingtips.html#Displaying-Julia-variables-1",
    "title": "Displaying Julia variables",
    "category": "Section",
    "text": "Within gdb, any jl_value_t* object obj can be displayed using(gdb) call jl_(obj)The object will be displayed in the julia session, not in the gdb session. This is a useful way to discover the types and values of objects being manipulated by Julia's C code.Similarly, if you're debugging some of Julia's internals (e.g., inference.jl), you can print obj usingccall(:jl_, Void, (Any,), obj)This is a good way to circumvent problems that arise from the order in which julia's output streams are initialized.Julia's flisp interpreter uses value_t objects; these can be displayed with call fl_print(fl_ctx, ios_stdout, obj)."
},

{
    "location": "devdocs/debuggingtips.html#Useful-Julia-variables-for-Inspecting-1",
    "title": "Useful Julia variables for Inspecting",
    "category": "Section",
    "text": "While the addresses of many variables, like singletons, can be be useful to print for many failures, there are a number of additional variables (see julia.h for a complete list) that are even more useful.(when in jl_apply_generic) f->linfo and jl_uncompress_ast(f->linfo, f->linfo->ast) :: for figuring out a bit about the call-stack\nnjl_lineno and jl_filename :: for figuring out what line in a test to go start debugging from (or figure out how far into a file has been parsed)\nn$1 :: not really a variable, but still a useful shorthand for referring to the result of the last gdb command (such as print)\nnjl_options :: sometimes useful, since it lists all of the command line options that were successfully parsed\nnjl_uv_stderr :: because who doesn't like to be able to interact with stdio"
},

{
    "location": "devdocs/debuggingtips.html#Useful-Julia-functions-for-Inspecting-those-variables-1",
    "title": "Useful Julia functions for Inspecting those variables",
    "category": "Section",
    "text": "jl_gdblookup($rip) :: For looking up the current function and line. (use $eip on i686 platforms)\nnjlbacktrace() :: For dumping the current Julia backtrace stack to stderr. Only usable after record_backtrace() has been called.\nnjl_dump_llvm_value(Value*) :: For invoking Value->dump() in gdb, where it doesn't work natively. For example, f->linfo->functionObject, f->linfo->specFunctionObject, and to_function(f->linfo).\nnType->dump() :: only works in lldb. Note: add something like ;1 to prevent lldb from printing its prompt over the output\nnjl_eval_string(\"expr\") :: for invoking side-effects to modify the current state or to lookup symbols\nnjl_typeof(jl_value_t*) :: for extracting the type tag of a Julia value (in gdb, call macro define jl_typeof jl_typeof first, or pick something short like ty for the first arg to define a shorthand)"
},

{
    "location": "devdocs/debuggingtips.html#Inserting-breakpoints-for-inspection-from-gdb-1",
    "title": "Inserting breakpoints for inspection from gdb",
    "category": "Section",
    "text": "In your gdb session, set a breakpoint in jl_breakpoint like so:(gdb) break jl_breakpointThen within your Julia code, insert a call to jl_breakpoint by addingccall(:jl_breakpoint, Void, (Any,), obj)where obj can be any variable or tuple you want to be accessible in the breakpoint.It's particularly helpful to back up to the jl_apply frame, from which you can display the arguments to a function using, e.g.,(gdb) call jl_(args[0])Another useful frame is to_function(jl_lambda_info_t *li, bool cstyle). The jl_lambda_info_t* argument is a struct with a reference to the final AST sent into the compiler. However, the AST at this point will usually be compressed; to view the AST, call jl_uncompress_ast and then pass the result to jl_:#2  0x00007ffff7928bf7 in to_function (li=0x2812060, cstyle=false) at codegen.cpp:584\nn584          abort();\nn(gdb) p jl_(jl_uncompress_ast(li, li->ast))"
},

{
    "location": "devdocs/debuggingtips.html#Inserting-breakpoints-upon-certain-conditions-1",
    "title": "Inserting breakpoints upon certain conditions",
    "category": "Section",
    "text": ""
},

{
    "location": "devdocs/debuggingtips.html#Loading-a-particular-file-1",
    "title": "Loading a particular file",
    "category": "Section",
    "text": "Let's say the file is sysimg.jl:(gdb) break jl_load if strcmp(fname, \"sysimg.jl\")==0"
},

{
    "location": "devdocs/debuggingtips.html#Calling-a-particular-method-1",
    "title": "Calling a particular method",
    "category": "Section",
    "text": "(gdb) break jl_apply_generic if strcmp((char*)(jl_symbol_name)(jl_gf_mtable(F)->name), \"method_to_break\")==0Since this function is used for every call, you will make everything 1000x slower if you do this."
},

{
    "location": "devdocs/debuggingtips.html#Dealing-with-signals-1",
    "title": "Dealing with signals",
    "category": "Section",
    "text": "Julia requires a few signal to function property. The profiler uses SIGUSR2 for sampling and the garbage collector uses SIGSEGV for threads synchronization. If you are debugging some code that uses the profiler or multiple threads, you may want to let the debugger ignore these signals since they can be triggered very often during normal operations. The command to do this in GDB is (replace SIGSEGV with SIGUSRS or other signals you want to ignore):(gdb) handle SIGSEGV noprint nostop passThe corresponding LLDB command is (after the process is started):(lldb) pro hand -p true -s false -n false SIGSEGVIf you are debugging a segfault with threaded code, you can set a breakpoint on jl_critical_error (sigdie_handler should also work on Linux and BSD) in order to only catch the actual segfault rather than the GC synchronization points."
},

{
    "location": "devdocs/debuggingtips.html#Debugging-during-Julia's-build-process-(bootstrap)-1",
    "title": "Debugging during Julia's build process (bootstrap)",
    "category": "Section",
    "text": "Errors that occur during make need special handling. Julia is built in two stages, constructing sys0 and sys.ji. To see what commands are running at the time of failure, use make VERBOSE=1.At the time of this writing, you can debug build errors during the sys0 phase from the base directory using:julia/base$ gdb --args ../usr/bin/julia-debug -C native --build ../usr/lib/julia/sys0 sysimg.jlYou might need to delete all the files in usr/lib/julia/ to get this to work.You can debug the sys.ji phase using:julia/base$ gdb --args ../usr/bin/julia-debug -C native --build ../usr/lib/julia/sys -J ../usr/lib/julia/sys0.ji sysimg.jlBy default, any errors will cause Julia to exit, even under gdb. To catch an error \"in the act\", set a breakpoint in jl_error (there are several other useful spots, for specific kinds of failures, including: jl_too_few_args, jl_too_many_args, and jl_throw).Once an error is caught, a useful technique is to walk up the stack and examine the function by inspecting the related call to jl_apply. To take a real-world example:Breakpoint 1, jl_throw (e=0x7ffdf42de400) at task.c:802\nn802 {\nn(gdb) p jl_(e)\nnErrorException(\"auto_unbox: unable to determine argument type\")\nn$2 = void\nn(gdb) bt 10\nn#0  jl_throw (e=0x7ffdf42de400) at task.c:802\nn#1  0x00007ffff65412fe in jl_error (str=0x7ffde56be000 <_j_str267> \"auto_unbox:\nn   unable to determine argument type\")\nn   at builtins.c:39\nn#2  0x00007ffde56bd01a in julia_convert_16886 ()\nn#3  0x00007ffff6541154 in jl_apply (f=0x7ffdf367f630, args=0x7fffffffc2b0, nargs=2) at julia.h:1281\nn...The most recent jl_apply is at frame #3, so we can go back there and look at the AST for the function julia_convert_16886. This is the uniqued name for some method of convert. f in this frame is a jl_function_t*, so we can look at the type signature, if any, from the specTypes field:(gdb) f 3\nn#3  0x00007ffff6541154 in jl_apply (f=0x7ffdf367f630, args=0x7fffffffc2b0, nargs=2) at julia.h:1281\nn1281            return f->fptr((jl_value_t*)f, args, nargs);\nn(gdb) p f->linfo->specTypes\nn$4 = (jl_tupletype_t *) 0x7ffdf39b1030\nn(gdb) p jl_( f->linfo->specTypes )\nnTuple{Type{Float32}, Float64}           # <-- type signature for julia_convert_16886Then, we can look at the AST for this function:(gdb) p jl_( jl_uncompress_ast(f->linfo, f->linfo->ast) )\nnExpr(:lambda, Array{Any, 1}[:#s29, :x], Array{Any, 1}[Array{Any, 1}[], Array{Any, 1}[Array{Any, 1}[:#s29, :Any, 0], Array{Any, 1}[:x, :Any, 0]], Array{Any, 1}[], 0], Expr(:body,\nnExpr(:line, 90, :float.jl)::Any,\nnExpr(:return, Expr(:call, :box, :Float32, Expr(:call, :fptrunc, :Float32, :x)::Any)::Any)::Any)::Any)::AnyFinally, and perhaps most usefully, we can force the function to be recompiled in order to step through the codegen process. To do this, clear the cached functionObject from the jl_lamdbda_info_t*:(gdb) p f->linfo->functionObject\nn$8 = (void *) 0x1289d070\nn(gdb) set f->linfo->functionObject = NULLThen, set a breakpoint somewhere useful (e.g. emit_function, emit_expr, emit_call, etc.), and run codegen:(gdb) p jl_compile(f)\nn... # your breakpoint here"
},

{
    "location": "devdocs/debuggingtips.html#Debugging-precompilation-errors-1",
    "title": "Debugging precompilation errors",
    "category": "Section",
    "text": "Module precompilation spawns a separate Julia process to precompile each module. Setting a breakpoint or catching failures in a precompile worker requires attaching a debugger to the worker. The easiest approach is to set the debugger watch for new process launches matching a given name. For example:(gdb) attach -w -n julia-debugor:(lldb) process attach -w -n julia-debugThen run a script/command to start precompilation. As described earlier, use conditional breakpoints in the parent process to catch specific file-loading events and narrow the debugging window. (some operating systems may require alternative approaches, such as following each fork from the parent process)"
},

{
    "location": "devdocs/eval.html",
    "title": "Eval of Julia code",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/eval.html#Eval-of-Julia-code-1",
    "title": "Eval of Julia code",
    "category": "Section",
    "text": "One of the hardest parts about learning how the Julia Language runs code is learning how all of the pieces work together to execute a block of code.Each chunk of code typically makes a trip through many esoteric acronyms such as (in no particular order), flisp, AST, C++, LLVM, eval, typeinf, macroexpand, sysimg (or system image), bootstrapping, compile, parse, execute, JIT, interpret, box, unbox, intrinsic function, primitive function before turning into the desired result (hopefully).sidebar: Definitions\nnREPL\nnREPL stands for Read-Eval-Print Loop. It's just what we call the command line environment for short.\nnAST\nnAbstract Syntax Tree The AST is the digital representation of the code structure. In this form the code has been tokenized for meaning so that it is more suitable for manipulation and execution."
},

{
    "location": "devdocs/eval.html#Julia-Execution-1",
    "title": "Julia Execution",
    "category": "Section",
    "text": "The 10,000 foot view of the whole process is as follows:The user starts julia.\nnThe C function main() from ui/repl.c gets called. This function processes the command line arguments, filling in the jl_options struct and setting the variable ARGS. It then initializes Julia (by calling julia_init in task.c, which may load a previously compiled sysimg). Finally, it passes off control to Julia by calling Base._start().\nnWhen _start() takes over control, the subsequent sequence of commands depends on the command line arguments given. For example, if a filename was supplied, it will proceed to execute that file. Otherwise, it will start an interactive REPL.\nnSkipping the details about how the REPL interacts with the user, let's just say the program ends up with a block of code that it wants to run.\nnIf the block of code to run is in a file, jl_load(char *filename) gets invoked to load the file and parse it. Each fragment of code is then passed to eval to execute.\nnEach fragment of code (or AST), is handed off to eval() to turn into results.\nneval() takes each code fragment and tries to run it in jl_toplevel_eval_flex().\nnjl_toplevel_eval_flex() decides whether the code is a \"toplevel\" action (such as using or module), which would be invalid inside a function. If so, it passes off the code to the toplevel interpreter.\nnjl_toplevel_eval_flex() then expands the code to eliminate any macros and to \"lower\" the AST to make it simpler to execute.\nnjl_toplevel_eval_flex() then uses some simple heuristics to decide whether to JIT compiler the AST or to interpret it directly.\nnThe bulk of the work to interpret code is handled by eval in interpreter.c.\nnIf instead, the code is compiled, the bulk of the work is handled by codegen.cpp. Whenever a Julia function is called for the first time with a given set of argument types, type inference will be run on that function. This information is used by the codegen step to generate faster code.\nnEventually, the user quits the REPL, or the end of the program is reached, and the _start() method returns.\nnJust before exiting, main() calls jl_atexit_hook(exit_code). This calls Base._atexit() (which calls any functions registered to atexit() inside Julia). Then it calls jl_gc_run_all_finalizers(). Finally, it gracefully cleans up all libuv handles and waits for them to flush and close."
},

{
    "location": "devdocs/eval.html#Parsing-1",
    "title": "Parsing",
    "category": "Section",
    "text": "The Julia parser is a small lisp program written in femtolisp, the source-code for which is distributed inside Julia in src/flisp.The interface functions for this are primarily defined in jlfrontend.scm. The code in ast.c handles this handoff on the Julia side.The other relevant files at this stage are julia-parser.scm, which handles tokenizing Julia code and turning it into an AST, and julia-syntax.scm, which handles transforming complex AST representations into simpler, \"lowered\" AST representations which are more suitable for analysis and execution."
},

{
    "location": "devdocs/eval.html#Macro-Expansion-1",
    "title": "Macro Expansion",
    "category": "Section",
    "text": "When eval() encounters a macro, it expands that AST node before attempting to evaluate the expression. Macro expansion involves a handoff from eval() (in Julia), to the parser function jl_macroexpand() (written in flisp) to the Julia macro itself (written in - what else - Julia) via fl_invoke_julia_macro(), and back.Typically, macro expansion is invoked as a first step during a call to expand()/jl_expand(), although it can also be invoked directly by a call to macroexpand()/jl_macroexpand()."
},

{
    "location": "devdocs/eval.html#Type-Inference-1",
    "title": "Type Inference",
    "category": "Section",
    "text": "Type inference is implemented in Julia by typeinf() in inference.jl. Type inference is the process of examining a Julia function and determining bounds for the types of each of its variables, as well as bounds on the type of the return value from the function. This enables many future optimizations, such as unboxing of known immutable values, and compile-time hoisting of various run-time operations such as computing field offsets and function pointers. Type inference may also include other steps such as constant propagation and inlining.sidebar: More Definitions\nnJIT\nnJust-In-Time Compilation The process of generating native-machine code into memory right when it is needed.\nnLLVM\nnLow-Level Virtual Machine (a compiler) The Julia JIT compiler is a program/library called libLLVM. Codegen in Julia refers both to the process of taking a Julia AST and turning it into LLVM instructions, and the process of LLVM optimizing that and turning it into native assembly instructions.\nnC++\nnThe programming language that LLVM is implemented in, which means that codegen is also implemented in this language. The rest of Julia's library is implemented in C, in part because it's smaller feature set makes it more usable as a cross-language interface layer.\nnbox\nnThis term is used to describe the process of taking a value and allocating a wrapper around the data that is tracked by the garbage collector (gc) and is tagged with the object's type.\nnunbox\nnThe reverse of boxing a value. This operation enables more efficient manipulation of data when the type of that data is fully known at compile-time (through type inference).\nngeneric function\nnA Julia function composed of multiple \"methods\" that are selected for dynamic dispatch based on the argument type-signature\nnanonymous function or \"method\"\nnA Julia function without a name and without type-dispatch capabilities\nnprimitive function\nnA function implemented in C but exposed in Julia as a named function \"method\" (albeit without generic function dispatch capabilities, similar to a anonymous function)\nnintrinsic function\nnA low-level operation exposed as a function in Julia. These pseudo-functions implement operations on raw bits such as add and sign extend that cannot be expressed directly in any other way. Since they operate on bits directly, they must be compiled into a function and surrounded by a call to Core.Intrinsics.box(T, ...) to reassign type information to the value."
},

{
    "location": "devdocs/eval.html#JIT-Code-Generation-1",
    "title": "JIT Code Generation",
    "category": "Section",
    "text": "Codegen is the process of turning a Julia AST into native machine code.The JIT environment is initialized by an early call to jl_init_codegen in codegen.cpp.On demand, a Julia method is converted into a native function by the function emit_function(jl_lambda_info_t*). (note, when using the MCJIT (in LLVM v3.4+), each function must be JIT into a new module.) This function recursively calls emit_expr() until the entire function has been emitted.Much of the remaining bulk of this file is devoted to various manual optimizations of specific code patterns. For example, emit_known_call() knows how to inline many of the primitive functions (defined in builtins.c) for various combinations of argument types.Other parts of codegen are handled by various helper files:debuginfo.cpp\nnHandles backtraces for JIT functions\nnccall.cpp\nnHandles the ccall and llvmcall FFI, along with various abi_*.cpp files\nnintrinsics.cpp\nnHandles the emission of various low-level intrinsic functionssidebar: Bootstrapping\nnThe process of creating a new system image is called \"bootstrapping\".The etymology of this word comes from the phrase \"pulling one's self up by the bootstraps\", and refers to the idea of starting from a very limited set of available functions and definitions and ending with the creation of a full-featured environment."
},

{
    "location": "devdocs/functions.html",
    "title": "Julia Functions",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/functions.html#Julia-Functions-1",
    "title": "Julia Functions",
    "category": "Section",
    "text": "This document will explain how functions, method definitions, and method tables work."
},

{
    "location": "devdocs/functions.html#Method-Tables-1",
    "title": "Method Tables",
    "category": "Section",
    "text": "Every function in Julia is a generic function. A generic function is conceptually a single function, but consists of many definitions, or methods. The methods of a generic function are stored in a method table. Method tables (type MethodTable) are associated with TypeNames. A TypeName describes a family of parameterized types. For example Complex{Float32} and Complex{Float64} share the same Complex type name object.All objects in Julia are potentially callable, because every object has a type, which in turn has a TypeName."
},

{
    "location": "devdocs/functions.html#Function-calls-1",
    "title": "Function calls",
    "category": "Section",
    "text": "Given the call f(x,y), the following steps are performed: first, the method table to use is accessed as typeof(f).name.mt. Second, an argument tuple type is formed, Tuple{typeof(f), typeof(x), typeof(y)}. Note that the type of the function itself is the first element. This is because the type might have parameters, and so needs to take part in dispatch. This tuple type is looked up in the method table.This dispatch process is performed by jl_apply_generic, which takes two arguments: a pointer to an array of the values f, x, and y, and the number of values (in this case 3).Throughout the system, there are two kinds of APIs that handle functions and argument lists: those that accept the function and arguments separately, and those that accept a single argument structure. In the first kind of API, the \"arguments\" part does not contain information about the function, since that is passed separately. In the second kind of API, the function is the first element of the argument structure.For example, the following function for performing a call accepts just an args pointer, so the first element of the args array will be the function to call:jl_value_t *jl_apply(jl_value_t **args, uint32_t nargs)This entry point for the same functionality accepts the function separately, so the args array does not contain the function:jl_value_t *jl_call(jl_function_t *f, jl_value_t **args, int32_t nargs);"
},

{
    "location": "devdocs/functions.html#Adding-methods-1",
    "title": "Adding methods",
    "category": "Section",
    "text": "Given the above dispatch process, conceptually all that is needed to add a new method is (1) a tuple type, and (2) code for the body of the method. jl_method_def implements this operation. jl_first_argument_datatype is called to extract the relevant method table from what would be the type of the first argument. This is much more complicated than the corresponding procedure during dispatch, since the argument tuple type might be abstract. For example, we can define:(::Union{Foo{Int},Foo{Int8}})(x) = 0which works since all possible matching methods would belong to the same method table."
},

{
    "location": "devdocs/functions.html#Creating-generic-functions-1",
    "title": "Creating generic functions",
    "category": "Section",
    "text": "Since every object is callable, nothing special is needed to create a generic function. Therefore jl_new_generic_function simply creates a new singleton (0 size) subtype of Function and returns its instance. A function can have a mnemonic \"display name\" which is used in debug info and when printing objects. For example the name of Base.sin is sin. By convention, the name of the created type is the same as the function name, with a # prepended. So typeof(sin) is Base.#sin."
},

{
    "location": "devdocs/functions.html#Closures-1",
    "title": "Closures",
    "category": "Section",
    "text": "A closure is simply a callable object with field names corresponding to captured variables. For example, the following code:function adder(x)\nn    return y->x+y\nnendis lowered to (roughly):immutable ##1{T}\nn    x::T\nnend\nn\nn(_::##1)(y) = _.x + y\nn\nnfunction adder(x)\nn    return ##1(x)\nnend"
},

{
    "location": "devdocs/functions.html#Constructors-1",
    "title": "Constructors",
    "category": "Section",
    "text": "A constructor call is just a call to a type. The type of most types is DataType, so the method table for DataType contains most constructor definitions. One wrinkle is the fallback definition that makes all types callable via convert:(::Type{T}){T}(args...) = convert(T, args...)::TIn this definition the function type is abstract, which is not normally supported. To make this work, all subtypes of Type (Type, TypeConstructor, Union, and DataType) currently share a method table via special arrangement."
},

{
    "location": "devdocs/functions.html#Builtins-1",
    "title": "Builtins",
    "category": "Section",
    "text": "The \"builtin\" functions, defined in the Core module, are:is typeof sizeof issubtype isa typeassert throw tuple getfield setfield! fieldtype\nnnfields isdefined arrayref arrayset arraysize applicable invoke apply_type _apply\nn_expr svecThese are all singleton objects whose types are subtypes of Builtin, which is a subtype of Function. Their purpose is to expose entry points in the run time that use the \"jlcall\" calling convention:jl_value_t *(jl_value_t*, jl_value_t**, uint32_t)The method tables of builtins are empty. Instead, they have a single catch-all method cache entry (Tuple{Vararg{Any}}) whose jlcall fptr points to the correct function. This is kind of a hack but works reasonably well."
},

{
    "location": "devdocs/functions.html#Keyword-arguments-1",
    "title": "Keyword arguments",
    "category": "Section",
    "text": "Keyword arguments work by associating a special, hidden function object with each method table that has definitions with keyword arguments. This function is called the \"keyword argument sorter\" or \"keyword sorter\", or \"kwsorter\", and is stored in the kwsorter field of MethodTable objects. Every definition in the kwsorter function has the same arguments as some definition in the normal method table, except with a single Array argument prepended. This array contains alternating symbols and values that represent the passed keyword arguments. The kwsorter's job is to move keyword arguments into their canonical positions based on name, plus evaluate and substite any needed default value expressions. The result is a normal positional argument list, which is then passed to yet another function.The easiest way to understand the process is to look at how a keyword argument method definition is lowered. The code:function circle(center, radius; color = black, fill::Bool = true, options...)\nn    # draw\nnendactually produces three method definitions. The first is a function that accepts all arguments (including keywords) as positional arguments, and includes the code for the method body. It has an auto-generated name:function #circle#1(color, fill::Bool, options, circle, center, radius)\nn    # draw\nnendThe second method is an ordinary definition for the original circle function, which handles the case where no keyword arguments are passed:function circle(center, radius)\nn    #circle#1(black, true, Any[], circle, center, radius)\nnendThis simply dispatches to the first method, passing along default values. Finally there is the kwsorter definition:function (::Core.kwftype(typeof(circle)))(kw::Array, circle, center, radius)\nn    options = Any[]\nn    color = arg associated with :color, or black if not found\nn    fill = arg associated with :fill, or true if not found\nn    # push remaining elements of kw into options array\nn    #circle#1(color, fill, options, circle, center, radius)\nnendThe front end generates code to loop over the kw array and pick out arguments in the right order, evaluating default expressions when an argument is not found.The function Core.kwftype(t) fetches (and creates, if necessary) the field t.name.mt.kwsorter.This design has the feature that call sites that don't use keyword arguments require no special handling; everything works as if they were not part of the language at all. Call sites that do use keyword arguments are dispatched directly to the called function's kwsorter. For example the call:circle((0,0), 1.0, color = red; other...)is lowered to:kwfunc(circle)(Any[:color,red,other...], circle, (0,0), 1.0)The unpacking procedure represented here as other... actually further unpacks each element of other, expecting each one to contain two values (a symbol and a value). kwfunc (also in Core) fetches the kwsorter for the called function. Notice that the original circle function is passed through, to handle closures."
},

{
    "location": "devdocs/init.html",
    "title": "Initialization of the Julia runtime",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/init.html#Initialization-of-the-Julia-runtime-1",
    "title": "Initialization of the Julia runtime",
    "category": "Section",
    "text": "How does the Julia runtime execute julia -e 'println(\"Hello World!\")' ?"
},

{
    "location": "devdocs/init.html#main()-1",
    "title": "main()",
    "category": "Section",
    "text": "Execution starts at main() in julia/ui/repl.c.main() calls libsupport_init() to set the C library locale and to initialise the \"ios\" library (see ios_init_stdstreams() and Legacy ios.c library).Next parse_opts() is called to process command line options. Note that parse_opts() only deals with options that affect code generation or early initialisation. Other options are handled later by process_options() in base/client.jl.parse_opts() stores command line options in the global jl_options struct."
},

{
    "location": "devdocs/init.html#julia_init()-1",
    "title": "julia_init()",
    "category": "Section",
    "text": "julia_init() in task.c is called by main() and calls _julia_init() in init.c._julia_init() begins by calling libsupport_init() again (it does nothing the second time).restore_signals() is called to zero the signal handler mask.jl_resolve_sysimg_location() searches configured paths for the base system image. See Building the Julia system image.jl_gc_init() sets up allocation pools and lists for: weak refs, preserved values and finalization.jl_init_frontend() loads and initialises a pre-compiled femtolisp image containing the scanner/parser;jl_init_types() creates jl_datatype_t type description objects for the built-in types defined in julia.h. e.g.jl_any_type = jl_new_abstracttype(jl_symbol(\"Any\"), NULL, jl_null);\nnjl_any_type->super = jl_any_type;\nn\nnjl_type_type = jl_new_abstracttype(jl_symbol(\"Type\"), jl_any_type, jl_null);\nn\nnjl_int32_type = jl_new_bitstype(jl_symbol(\"Int32\"),\nn                                jl_any_type, jl_null, 32);jl_init_tasks() creates the jl_datatype_t* jl_task_type object; initialises the global jl_root_task struct; and sets jl_current_task to the root task.jl_init_codegen() initialises the LLVM library.jl_init_serializer() initialises 8-bit serialisation tags for 256 frequently used jl_value_t values. The serialisation mechanism uses these tags as shorthand (in lieu of storing whole objects) to save storage space.If there is no sysimg file (!jl_options.image_file) then then Core and Main modules are created and boot.jl is evaluated:jl_core_module = jl_new_module(jl_symbol(\"Core\")) creates the Julia Core module.jl_init_intrinsic_functions() creates a new Julia module \"Intrinsics\" containing constant jl_intrinsic_type symbols. These define an integer code for each intrinsic function. emit_intrinsic() translates these symbols into LLVM instructions during code generation.jl_init_primitives() hooks C functions up to Julia function symbols. e.g. the symbol Base.is() is bound to C function pointer jl_f_is() by calling add_builtin_func(\"eval\", jl_f_top_eval).jl_new_main_module() creates the global \"Main\" module and sets jl_current_task->current_module = jl_main_module.Note: _julia_init() then setsjl_root_task->current_module = jl_core_module. jl_root_task is an alias of jl_current_task at this point, so the current_module set by jl_new_main_module() above is overwritten.jl_load(\"boot.jl\", sizeof(\"boot.jl\")) calls jl_parse_eval_all which repeatedly calls jl_toplevel_eval_flex() to execute boot.jl. TODO – drill down into eval?jl_get_builtin_hooks() initialises global C pointers to Julia globals defined in boot.jl.jl_init_box_caches() pre-allocates global boxed integer value objects for values up to 1024. This speeds up allocation of boxed ints later on. e.g.:jl_value_t *jl_box_uint8(uint32_t x)\nn{\nn    return boxed_uint8_cache[(uint8_t)x];\nn}_julia_init() iterates over the jl_core_module->bindings.table looking for jl_datatype_t values and sets the type name's module prefix to jl_core_module.jl_add_standard_imports(jl_main_module) does \"using Base\" in the \"Main\" module.Note: _julia_init() now reverts to jl_root_task->current_module = jl_main_module as it was before being set to jl_core_module above.Platform specific signal handlers are initialised for SIGSEGV (OSX, Linux), and SIGFPE (Windows).Other signals (SIGINFO, SIGBUS, SIGILL, SIGTERM, SIGABRT, SIGQUIT, SIGSYS and SIGPIPE) are hooked up to sigdie_handler() which prints a backtrace.jl_init_restored_modules() calls jl_module_run_initializer() for each deserialised module to run the __init__() function.Finally sigint_handler() is hooked up to SIGINT and calls jl_throw(jl_interrupt_exception)._julia_init() then returns back to main() in julia/ui/repl.c and main() calls true_main(argc, (char**)argv).sidebar: sysimg\nnIf there is a sysimg file, it contains a pre-cooked image of the Core and Main modules (and whatever else is created by boot.jl). See Building the Julia system image.jl_restore_system_image() de-serialises the saved sysimg into the current Julia runtime environment and initialisation continues after jl_init_box_caches() below...Note: jl_restore_system_image() (and dump.c in general) uses the Legacy ios.c library."
},

{
    "location": "devdocs/init.html#true_main()-1",
    "title": "true_main()",
    "category": "Section",
    "text": "true_main() loads the contents of argv[] into Base.ARGS.If a .jl \"program\" file was supplied on the command line, then exec_program() calls jl_load(program,len) which calls jl_parse_eval_all which repeatedly calls jl_toplevel_eval_flex() to execute the program.However, in our example (julia -e 'println(\"Hello World!\")'), jl_get_global(jl_base_module, jl_symbol(\"_start\")) looks up Base._start and jl_apply() executes it."
},

{
    "location": "devdocs/init.html#Base._start-1",
    "title": "Base._start",
    "category": "Section",
    "text": "Base._start calls Base.process_options which calls jl_parse_input_line(\"println(\"Hello World!\")\") to create an expression object and Base.eval() to execute it."
},

{
    "location": "devdocs/init.html#Base.eval-1",
    "title": "Base.eval",
    "category": "Section",
    "text": "Base.eval() was mapped to jl_f_top_eval by jl_init_primitives().jl_f_top_eval() calls jl_toplevel_eval_in(jl_main_module, ex), where \"ex\" is the parsed expression println(\"Hello World!\").jl_toplevel_eval_in() calls jl_toplevel_eval_flex() which calls eval() in interpreter.c.The stack dump below shows how the interpreter works its way through various methods of Base.println() and Base.print() before arriving at write{T}(s::AsyncStream, a::Array{T})  which does ccall(jl_uv_write()).jl_uv_write() calls uv_write() to write \"Hello World!\" to JL_STDOUT. See Libuv wrappers for stdio.:Hello World!Stack frame Source code Notes\nnjl_uv_write() jl_uv.c called though Base.ccall()\nnjulia_write_282942 stream.jl function write!{T}(s::AsyncStream, a::Array{T})\nnjulia_print_284639 ascii.jl print(io::IO, s::String) = (write(io, s);nothing)\nnjlcall_print_284639    \nnjl_apply() julia.h  \nnjl_trampoline() builtins.c  \nnjl_apply() julia.h  \nnjl_apply_generic() gf.c Base.print(Base.TTY, String)\nnjl_apply() julia.h  \nnjl_trampoline() builtins.c  \nnjl_apply() julia.h  \nnjl_apply_generic() gf.c Base.print(Base.TTY, String, Char, Char...)\nnjl_apply() julia.h  \nnjl_f_apply() builtins.c  \nnjl_apply() julia.h  \nnjl_trampoline() builtins.c  \nnjl_apply() julia.h  \nnjl_apply_generic() gf.c Base.println(Base.TTY, String, String...)\nnjl_apply() julia.h  \nnjl_trampoline() builtins.c  \nnjl_apply() julia.h  \nnjl_apply_generic() gf.c Base.println(String,)\nnjl_apply() julia.h  \nndo_call() interpreter.c  \nneval() interpreter.c  \nnjl_interpret_toplevel_expr() interpreter.c  \nnjl_toplevel_eval_flex() toplevel.c  \nnjl_toplevel_eval() toplevel.c  \nnjl_toplevel_eval_in() builtins.c  \nnjl_f_top_eval() builtins.c  Since our example has just one function call, which has done its job of printing \"Hello World!\", the stack now rapidly unwinds back to main()."
},

{
    "location": "devdocs/init.html#jl_atexit_hook()-1",
    "title": "jl_atexit_hook()",
    "category": "Section",
    "text": "main() calls jl_atexit_hook(). This calls _atexit for each module, then calls jl_gc_run_all_finalizers() and cleans up libuv handles."
},

{
    "location": "devdocs/julia.html",
    "title": "Documentation of Julia's Internals",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/llvm.html",
    "title": "Working with LLVM",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/llvm.html#Working-with-LLVM-1",
    "title": "Working with LLVM",
    "category": "Section",
    "text": "This is not a replacement for the LLVM documentation, but a collection of tips for working on LLVM for Julia."
},

{
    "location": "devdocs/llvm.html#Overview-of-Julia-to-LLVM-Interface-1",
    "title": "Overview of Julia to LLVM Interface",
    "category": "Section",
    "text": "Julia statically links in LLVM by default. Build with USE_LLVM_SHLIB=1 to link dynamically.The code for lowering Julia AST to LLVM IR or interpreting it directly is in directory src/.File Description\nnbuiltins.c Builtin functions\nnccall.cpp Lowering ccall\nncgutils.cpp Lowering utilities, notably for array and tuple accesses\nncodegen.cpp Top-level of code generation, pass list, lowering builtins\nndebuginfo.cpp Tracks debug information for JIT code\nndisasm.cpp Handles native object file and JIT code diassembly\nngf.c Generic functions\nnintrinsics.cpp Lowering intrinsics\nnllvm-simdloop.cpp Custom LLVM pass for @simd\nnsys.c I/O and operating system utility functionsSome of the .cpp files form a group that compile to a single object.The difference between an intrinsic and a builtin is that a builtin is a first class function that can be used like any other Julia function.  An intrinsic can operate only on unboxed data, and therefore its arguments must be statically typed."
},

{
    "location": "devdocs/llvm.html#Alias-Analysis-1",
    "title": "Alias Analysis",
    "category": "Section",
    "text": "Julia currently uses LLVM's Type Based Alias Analysis. To find the comments that document the inclusion relationships, look for static MDNode* in src/codegen.cpp.The -O option enables LLVM's Basic Alias Analysis."
},

{
    "location": "devdocs/llvm.html#Building-Julia-with-a-different-version-of-LLVM-1",
    "title": "Building Julia with a different version of LLVM",
    "category": "Section",
    "text": "The default version of LLVM is specified in deps/Versions.make. You can override it by creating a file called Make.user in the top-level directory and adding a line to it such as:LLVM_VER = 3.5.0Besides the LLVM release numerals, you can also use LLVM_VER = svn to bulid against the latest development version of LLVM."
},

{
    "location": "devdocs/llvm.html#Passing-options-to-LLVM-1",
    "title": "Passing options to LLVM",
    "category": "Section",
    "text": "You can pass options to LLVM using debug builds of Julia.  To create a debug build, run make debug.  The resulting executable is usr/bin/julia-debug. You can pass LLVM options to this executable via the environment variable JULIA_LLVM_ARGS. Here are example settings using bash syntax:export JULIA_LLVM_ARGS = -print-after-all dumps IR after each pass.\nnexport JULIA_LLVM_ARGS = -debug-only=loop-vectorize dumps LLVM DEBUG(...) diagnostics for loop vectorizer if you built Julia with LLVM_ASSERTIONS=1. Otherwise you will get warnings about \"Unknown command line argument\". Counter-intuitively, building Julia with LLVM_DEBUG=1 is not enough to dump DEBUG diagnostics from a pass."
},

{
    "location": "devdocs/locks.html",
    "title": "Proper maintenance and care of multi-threading locks",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/locks.html#Proper-maintenance-and-care-of-multi-threading-locks-1",
    "title": "Proper maintenance and care of multi-threading locks",
    "category": "Section",
    "text": "The following strategies are used to ensure that the code is dead-lock free (generally by addressing the 4th Coffman condition: circular wait).structure code such that only one lock will need to be acquired at a time\nnalways acquire shared locks in the same order, as given by the table below\nnavoid constructs that expect to need unrestricted recursion"
},

{
    "location": "devdocs/locks.html#Locks-1",
    "title": "Locks",
    "category": "Section",
    "text": "Below are all of the locks that exist in the system and the mechanisms for using them that avoid the potential for deadlocks (no Ostrich algorithm allowed here):The following are definitely leaf locks (level 1), and must not try to acquire any other lock:safepoint\nnNote that this lock is acquired implicitly by JL_LOCK and JL_UNLOCK. use the _NOGC variants to avoid that for level 1 locks.While holding this lock, the code must not do any allocation or hit any safepoints. Note that there are safepoints when doing allocation, enabling / disabling GC, entering / restoring exception frames, and taking / releasing locks.\nnshared_map\nnfinalizers\nnpagealloc\nngc_perm_lock\nnflisp\nnflisp itself is already threadsafe, this lock only protects the jl_ast_context_list_t poolThe following is a leaf lock (level 2), and only acquires level 1 locks (safepoint) internally:typecacheThe following is a level 3 lock, which can only acquire level 1 or level 2 locks internally:Method->writelock\nnbut note that this is violated by staged functions!The following is a level 4 lock, which can only recurse to acquire level 1, 2, or 3 locks:MethodTable->writelock\nnbut note that this is violated by staged functions!The following is a proposed level 5 lock, which can only recurse to acquire locks at lower levels:staged\nnthis theoretical lock would create a priority inversion from the method->writelock (level 3), but only prohibiting running any staging function in parallel (thus allowing temporary release of the MethodTable and Method locks)The following is a level 6 lock, which can only recurse to acquire locks at lower levels:codegenThe following is an almost root lock (level end-1), meaning only the root look may be held when trying to acquire it:typeinf\nnthis one is perhaps one of the most tricky ones, since type-inference can be invoked from many pointsThe following is the root lock, meaning no other lock shall be held when trying to acquire it:toplevel\nnthis should be held while attempting a top-level action (such as making a new type or defining a new method): trying to obtain this lock inside a staged function will cause a deadlock condition!additionally, it's unclear if any code can safely run in parallel with an arbitrary toplevel expression, so it may require all threads to get to a safepoint first"
},

{
    "location": "devdocs/locks.html#Broken-Locks-1",
    "title": "Broken Locks",
    "category": "Section",
    "text": "The following locks are broken:toplevel\nndoesn't exist right nowfix: create it\nncodegen\nnrecursive (through static_eval), but caller might also be holding locks (due to staged functions)other issues?fix: prohibit codegen while holding any other lock (possibly by checking ptls->current_task->locks.len != 0 & explicitly check the locks that are OK to hold simultaneously)?\nntypeinf\nnnot certain of whether there are issues here or what they are. staging functions, of course, are a source of deadlocks here.fix: unknown\nnstaged\nnpossible solution to prevent staged functions from causing deadlock.this theoretical lock would create a priority inversion such that the Method and MethodTable write locks could be released by ensuring that no staging functions can run in parallel allow this level 5 lock to protect staged function conflicts (a level 3 operation)fix: create it\nntypecache\nnthis only protects cache lookup and insertion but it doesn't make the lookup-and-construct atomicfix: lock for apply_type / global (level 2?)"
},

{
    "location": "devdocs/meta.html",
    "title": "Talking to the compiler (the :meta mechanism)",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/object.html",
    "title": "Memory layout of Julia Objects",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/object.html#Memory-layout-of-Julia-Objects-1",
    "title": "Memory layout of Julia Objects",
    "category": "Section",
    "text": ""
},

{
    "location": "devdocs/object.html#Object-layout-(jl_value_t)-1",
    "title": "Object layout (jl_value_t)",
    "category": "Section",
    "text": "The jl_value_t struct is the name for a block of memory owned by the Julia Garbage Collector, representing the data associated with a Julia object in memory. Absent any type information, it is simply an opaque pointer:typedef struct jl_value_t* jl_pvalue_t;Each jl_value_t struct is contained in a jl_typetag_t struct that contains metadata information about the Julia object, such as its type and garbage collector (gc) reachability:typedef struct {\nn    opaque metadata;\nn    jl_value_t value;\nn} jl_typetag_t;The type of any Julia object is an instance of a leaf jl_datatype_t object. The jl_typeof() function can be used to query for it:jl_value_t *jl_typeof(jl_value_t *v);The layout of the object depends on its type. Reflection methods can be used to inspect that layout. A field can be accessed by calling one of the get-field methods:jl_value_t *jl_get_nth_field_checked(jl_value_t *v, size_t i);\nnjl_value_t *jl_get_field(jl_value_t *o, char *fld);If the field types are known, a priori, to be all pointers, the values can also be extracted directly as an array access:jl_value_t *v = value->fieldptr[n];As an example, a \"boxed\" uint16_t is stored as follows:struct {\nn    oqaque metadata;\nn    struct {\nn      uint16_t data;            -- 2 bytes\nn    } jl_value_t;\nn};This object is created by jl_box_uint16(). Note that the jl_value_t pointer references the data portion, not the metadata at the top of the struct.A value may be stored \"unboxed\" in many circumstances (just the data, without the metadata, and possibly not even stored but just kept in registers), so it is unsafe to assume that the address of a box is a unique identifier. The \"egal\" test (corresponding to the is() function in Julia), should instead be used to compare two unknown objects for equivalence:int jl_egal(jl_value_t *a, jl_value_t *b);This optimization should be relatively transparent to the API, since the object will be \"boxed\" on-demand, whenever a jl_value_t pointer is needed.Note that modification of a jl_value_t pointer in memory is permitted only if the object is mutable. Otherwise, modification of the value may corrupt the program and the result will be undefined. The mutability property of a value can be queried for with:int jl_is_mutable(jl_value_t *v);If the object being stored is a jl_value_t, the Julia garbage collector must be notified also:void jl_gc_wb(jl_value_t *parent, jl_value_t *ptr);However, the Embedding Julia section of the manual is also required reading at this point,for covering other details of boxing and unboxing various types, and understanding the gc interactions.Mirror structs for some of the built-in types are defined in julia.h. The corresponding global jl_datatype_t objects are created by jl_init_types in jltypes.c."
},

{
    "location": "devdocs/object.html#Garbage-collector-mark-bits-1",
    "title": "Garbage collector mark bits",
    "category": "Section",
    "text": "The garbage collector uses several bits from the metadata portion of the jl_typetag_t to track each object in the system. Further details about this algorithm can be found in the comments of the garbage collector implementation in gc.c."
},

{
    "location": "devdocs/offset-arrays.html",
    "title": "Arrays with custom indices",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/offset-arrays.html#Arrays-with-custom-indices-1",
    "title": "Arrays with custom indices",
    "category": "Section",
    "text": "Julia 0.5 adds experimental support for arrays with arbitrary indices. Conventionally, Julia's arrays are indexed starting at 1, whereas some other languages start numbering at 0, and yet others (e.g., Fortran) allow you to specify arbitrary starting indices.  While there is much merit in picking a standard (i.e., 1 for Julia), there are some algorithms which simplify considerably if you can index outside the range 1:size(A,d) (and not just 0:size(A,d)-1, either). Such array types are expected to be supplied through packages.The purpose of this page is to address the question, \"what do I have to do to support such arrays in my own code?\"  First, let's address the simplest case: if you know that your code will never need to handle arrays with unconventional indexing, hopefully the answer is \"nothing.\" Old code, on conventional arrays, should function essentially without alteration as long as it was using the exported interfaces of Julia."
},

{
    "location": "devdocs/offset-arrays.html#Generalizing-existing-code-1",
    "title": "Generalizing existing code",
    "category": "Section",
    "text": "As an overview, the steps are:replace many uses of size with indices\nnreplace 1:length(A) with linearindices(A), and length(A) with length(linearindices(A))\nnreplace explicit allocations like Array{Int}(size(B)) with similar(Array{Int}, indices(B))These are described in more detail below."
},

{
    "location": "devdocs/offset-arrays.html#Background-1",
    "title": "Background",
    "category": "Section",
    "text": "Because unconventional indexing breaks deeply-held assumptions throughout the Julia ecosystem, early adopters running code that has not been updated are likely to experience errors.  The most frustrating bugs would be incorrect results or segfaults (total crashes of Julia).  For example, consider the following function:function mycopy!(dest::AbstractVector, src::AbstractVector)\nn    length(dest) == length(src) || throw(DimensionMismatch(\"vectors must match\"))\nn    # OK, now we're safe to use @inbounds, right? (not anymore!)\nn    for i = 1:length(src)\nn        @inbounds dest[i] = src[i]\nn    end\nn    dest\nnendThis code implicitly assumes that vectors are indexed from 1. Previously that was a safe assumption, so this code was fine, but (depending on what types the user passes to this function) it may no longer be safe.  If this code continued to work when passed a vector with non-1 indices, it would either produce an incorrect answer or it would segfault.  (If you do get segfaults, to help locate the cause try running julia with the option --check-bounds=yes.)To ensure that such errors are caught, in Julia 0.5 both length and sizeshould throw an error when passed an array with non-1 indexing.  This is designed to force users of such arrays to check the code, and inspect it for whether it needs to be generalized."
},

{
    "location": "devdocs/offset-arrays.html#Using-indices-for-bounds-checks-and-loop-iteration-1",
    "title": "Using indices for bounds checks and loop iteration",
    "category": "Section",
    "text": "indices(A) (reminiscent of size(A)) returns a tuple of AbstractUnitRange objects, specifying the range of valid indices along each dimension of A.  When A has unconventional indexing, the ranges may not start at 1.  If you just want the range for a particular dimension d, there is indices(A, d).Base implements a custom range type, OneTo, where OneTo(n) means the same thing as 1:n but in a form that guarantees (via the type system) that the lower index is 1.  For any new AbstractArray type, this is the default returned by indices, and it indicates that this array type uses \"conventional\" 1-based indexing.  Note that if you don't want to be bothered supporting arrays with non-1 indexing, you can add the following line:@assert all(x->isa(x, Base.OneTo), indices(A))at the top of any function.For bounds checking, note that there are dedicated functions checkbounds and checkindex which can sometimes simplify such tests."
},

{
    "location": "devdocs/offset-arrays.html#Linear-indexing-(linearindices)-1",
    "title": "Linear indexing (linearindices)",
    "category": "Section",
    "text": "Some algorithms are most conveniently (or efficiently) written in terms of a single linear index, A[i] even if A is multi-dimensional.  In \"true\" linear indexing, the indices always range from 1:length(A). However, this raises an ambiguity for one-dimensional arrays (a.k.a., AbstractVector): does v[i] mean linear indexing, or Cartesian indexing with the array's native indices?For this reason, if you want to use linear indexing in an algorithm, your best option is to get the index range by calling linearindices(A).  This will return indices(A, 1) if A is an AbstractVector, and the equivalent of 1:length(A) otherwise.In a sense, one can say that 1-dimensional arrays always use Cartesian indexing. To help enforce this, it's worth noting that sub2ind(shape, i...) and ind2sub(shape, ind) will throw an error if shape indicates a 1-dimensional array with unconventional indexing (i.e., is a Tuple{UnitRange} rather than a tuple of OneTo).  For arrays with conventional indexing, these functions continue to work the same as always.Using indices and linearindices, here is one way you could rewrite mycopy!:function mycopy!(dest::AbstractVector, src::AbstractVector)\nn    indices(dest) == indices(src) || throw(DimensionMismatch(\"vectors must match\"))\nn    for i in linearindices(src)\nn        @inbounds dest[i] = src[i]\nn    end\nn    dest\nnend"
},

{
    "location": "devdocs/offset-arrays.html#Allocating-storage-using-generalizations-of-similar-1",
    "title": "Allocating storage using generalizations of similar",
    "category": "Section",
    "text": "Storage is often allocated with Array{Int}(dims) or similar(A, args...). When the result needs to match the indices of some other array, this may not always suffice. The generic replacement for such patterns is to use similar(storagetype, shape).  storagetype indicates the kind of underlying \"conventional\" behavior you'd like, e.g., Array{Int} or BitArray or even dims->zeros(Float32, dims) (which would allocate an all-zeros array). shape is a tuple of Integer or AbstractUnitRange values, specifying the indices that you want the result to use.Let's walk through a couple of explicit examples. First, if A has conventional indices, then similar(Array{Int}, indices(A)) would end up calling Array{Int}(size(A)), and thus return an array.  If A is an AbstractArray type with unconventional indexing, then similar(Array{Int}, indices(A)) should return something that \"behaves like\" an Array{Int} but with a shape (including indices) that matches A.  (The most obvious implementation is to allocate an Array{Int}(size(A)) and then \"wrap\" it in a type that shifts the indices.)Note also that similar(Array{Int}, (indices(A, 2),)) would allocate an AbstractVector{Int} (i.e., 1-dimensional array) that matches the indices of the columns of A."
},

{
    "location": "devdocs/offset-arrays.html#Deprecations-1",
    "title": "Deprecations",
    "category": "Section",
    "text": "In generalizing Julia's code base, at least one deprecation was unavoidable: earlier versions of Julia defined first(::Colon) = 1, meaning that the first index along a dimension indexed by : is 1. This definition can no longer be justified, so it was deprecated. There is no provided replacement, because the proper replacement depends on what you are doing and might need to know more about the array. However, it appears that many uses of first(::Colon) are really about computing an index offset; when that is the case, a candidate replacement is:indexoffset(r::AbstractVector) = first(r) - 1\nnindexoffset(::Colon) = 0In other words, while first(:) does not itself make sense, in general you can say that the offset associated with a colon-index is zero."
},

{
    "location": "devdocs/offset-arrays.html#Writing-custom-array-types-with-non-1-indexing-1",
    "title": "Writing custom array types with non-1 indexing",
    "category": "Section",
    "text": "Most of the methods you'll need to define are standard for any AbstractArray type, see Abstract Arrays. This page focuses on the steps needed to define unconventional indexing."
},

{
    "location": "devdocs/offset-arrays.html#Do-**not**-implement-size-or-length-1",
    "title": "Do not implement size or length",
    "category": "Section",
    "text": "Perhaps the majority of pre-existing code that uses size will not work properly for arrays with non-1 indices.  For that reason, it is much better to avoid implementing these methods, and use the resulting MethodError to identify code that needs to be audited and perhaps generalized."
},

{
    "location": "devdocs/offset-arrays.html#Do-**not**-annotate-bounds-checks-1",
    "title": "Do not annotate bounds checks",
    "category": "Section",
    "text": "Julia 0.5 includes @boundscheck to annotate code that can be removed for callers that exploit @inbounds. Initially, it seems far preferable to run with bounds checking always enabled (i.e., omit the @boundscheck annotation so the check always runs)."
},

{
    "location": "devdocs/offset-arrays.html#Custom-AbstractUnitRange-types-1",
    "title": "Custom AbstractUnitRange types",
    "category": "Section",
    "text": "If you're writing a non-1 indexed array type, you will want to specialize indices so it returns a UnitRange, or (perhaps better) a custom AbstractUnitRange.  The advantage of a custom type is that it \"signals\" the allocation type for functions like similar. If we're writing an array type for which indexing will start at 0, we likely want to begin by creating a new AbstractUnitRange, ZeroRange, where ZeroRange(n) is equivalent to 0:n-1.In general, you should probably not export ZeroRange from your package: there may be other packages that implement their own ZeroRange, and having multiple distinct ZeroRange types is (perhaps counterintuitively) an advantage: ModuleA.ZeroRange indicates that similar should create a ModuleA.ZeroArray, whereas ModuleB.ZeroRange indicates a ModuleB.ZeroArray type.  This design allows peaceful coexistence among many different custom array types.Note that the Julia package CustomUnitRanges.jl can sometimes be used to avoid the need to write your own ZeroRange type."
},

{
    "location": "devdocs/offset-arrays.html#Specializing-indices-1",
    "title": "Specializing indices",
    "category": "Section",
    "text": "Once you have your AbstractUnitRange type, then specialize indices:Base.indices(A::ZeroArray) = map(n->ZeroRange(n), A.size)where here we imagine that ZeroArray has a field called size (there would be other ways to implement this).In some cases, the fallback definition for indices(A, d):indices{T,N}(A::AbstractArray{T,N}, d) = d <= N ? indices(A)[d] : OneTo(1)may not be what you want: you may need to specialize it to return something other than OneTo(1) when d > ndims(A).  Likewise, in Base there is a dedicated function indices1 which is equivalent to indices(A, 1) but which avoids checking (at runtime) whether ndims(A) > 0. (This is purely a performance optimization.)  It is defined as:indices1{T}(A::AbstractArray{T,0}) = OneTo(1)\nnindices1{T}(A::AbstractArray{T})   = indices(A)[1]If the first of these (the zero-dimensional case) is problematic for your custom array type, be sure to specialize it appropriately."
},

{
    "location": "devdocs/offset-arrays.html#Specializing-similar-1",
    "title": "Specializing similar",
    "category": "Section",
    "text": "Given your custom ZeroRange type, then you should also add the following two specializations for similar:function Base.similar(A::AbstractArray, T::Type, shape::Tuple{ZeroRange,Vararg{ZeroRange}})\nn    # body\nnend\nn\nnfunction Base.similar(f::Union{Function,DataType}, shape::Tuple{ZeroRange,Vararg{ZeroRange}})\nn    # body\nnendBoth of these should allocate your custom array type."
},

{
    "location": "devdocs/offset-arrays.html#Specializing-reshape-1",
    "title": "Specializing reshape",
    "category": "Section",
    "text": "Optionally, define a methodBase.reshape(A::AbstractArray, shape::Tuple{ZeroRange,Vararg{ZeroRange}}) = ...and you can reshape an array so that the result has custom indices."
},

{
    "location": "devdocs/promote-op.html",
    "title": "Operator-sensitive promotion",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/reflection.html",
    "title": "Reflection and introspection",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/stdio.html",
    "title": "printf() and stdio in the Julia runtime",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/stdio.html#printf()-and-stdio-in-the-Julia-runtime-1",
    "title": "printf() and stdio in the Julia runtime",
    "category": "Section",
    "text": ""
},

{
    "location": "devdocs/stdio.html#Libuv-wrappers-for-stdio-1",
    "title": "Libuv wrappers for stdio",
    "category": "Section",
    "text": "julia.h defines libuv wrappers for the stdio.h streams:uv_stream_t *JL_STDIN;\nnuv_stream_t *JL_STDOUT;\nnuv_stream_t *JL_STDERR;... and corresponding output functions:int jl_printf(uv_stream_t *s, const char *format, ...);\nnint jl_vprintf(uv_stream_t *s, const char *format, va_list args);These printf functions are used by julia/{src,ui}/*.c wherever stdio is needed to ensure that output buffering is handled in a unified way.In special cases, like signal handlers, where the full libuv infrastructure is too heavy, jl_safe_printf() can be used to write(2) directly to STDERR_FILENO:void jl_safe_printf(const char *str, ...);"
},

{
    "location": "devdocs/stdio.html#Interface-between-JL_STD*-and-Julia-code-1",
    "title": "Interface between JL_STD* and Julia code",
    "category": "Section",
    "text": "Base.STDIN, Base.STDOUT and Base.STDERR are bound to the JL_STD*libuv streams defined in the runtime.Julia's __init__() function (in base/sysimg.jl) calls reinit_stdio() (in base/stream.jl) to create Julia objects for Base.STDIN, Base.STDOUT and Base.STDERR.reinit_stdio() uses ccall() to retrieve pointers to JL_STD* and calls jl_uv_handle_type() to inspect the type of each stream.  It then creates a Julia Base.IOStream, Base.TTY or Base.PipeEndpoint object to represent each stream, e.g.:$ julia -e 'println(typeof((STDIN, STDOUT, STDERR)))'\nnTuple{Base.TTY,Base.TTY,Base.TTY}\nn\nn$ julia -e 'println(typeof((STDIN, STDOUT, STDERR)))' < /dev/null 2>/dev/null\nnTuple{IOStream,Base.TTY,IOStream}\nn\nn$ echo hello | julia -e 'println(typeof((STDIN, STDOUT, STDERR)))' | cat\nnTuple{Base.PipeEndpoint,Base.PipeEndpoint,Base.TTY}The Base.read() and Base.write() methods for these streams use ccall() to call libuv wrappers in src/jl_uv.c, e.g.:stream.jl: function write(s::AsyncStream, p::Ptr, nb::Integer)\nn               -> ccall(:jl_uv_write, ...)\nn  jl_uv.c:          -> int jl_uv_write(uv_stream_t *stream, ...)\nn                        -> uv_write(uvw, stream, buf, ...)"
},

{
    "location": "devdocs/stdio.html#printf()-during-initialisation-1",
    "title": "printf() during initialisation",
    "category": "Section",
    "text": "The libuv streams relied upon by jl_printf() etc., are not available until midway through initialisation of the runtime (see init.c, init_stdio()).  Error messages or warnings that need to be printed before this are routed to the standard C library fwrite() function by the following mechanism:In sys.c, the JL_STD* stream pointers are statically initialised to integer constants: STD*_FILENO (0, 1 and 2). In jl_uv.c the jl_uv_puts() function checks its uv_stream_t* stream argument and calls fwrite() if stream is set to STDOUT_FILENO or STDERR_FILENO.This allows for uniform use of jl_printf() throughout the runtime regardless of whether or not any particular piece of code is reachable before initialisation is complete."
},

{
    "location": "devdocs/subarrays.html",
    "title": "SubArrays",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/subarrays.html#SubArrays-1",
    "title": "SubArrays",
    "category": "Section",
    "text": "Julia's SubArray type is a container encoding a \"view\" of a parent AbstractArray.  This page documents some of the design principles and implementation of SubArrays."
},

{
    "location": "devdocs/subarrays.html#Indexing:-cartesian-vs.-linear-indexing-1",
    "title": "Indexing: cartesian vs. linear indexing",
    "category": "Section",
    "text": "Broadly speaking, there are two main ways to access data in an array. The first, often called cartesian indexing, uses N indexes for an N -dimensional AbstractArray.  For example, a matrix A (2-dimensional) can be indexed in cartesian style as A[i,j].  The second indexing method, referred to as linear indexing, uses a single index even for higher-dimensional objects.  For example, if A = reshape(1:12, 3, 4), then the expression A[5] returns the value 5.  Julia allows you to combine these styles of indexing: for example, a 3d array A3 can be indexed as A3[i,j], in which case i is interpreted as a cartesian index for the first dimension, and j is a linear index over dimensions 2 and 3.For Arrays, linear indexing appeals to the underlying storage format: an array is laid out as a contiguous block of memory, and hence the linear index is just the offset (+1) of the corresponding entry relative to the beginning of the array.  However, this is not true for many other AbstractArray types: examples include SparseMatrixCSC, arrays that require some kind of computation (such as interpolation), and the type under discussion here, SubArray.  For these types, the underlying information is more naturally described in terms of cartesian indexes.You can manually convert from a cartesian index to a linear index with sub2ind, and vice versa using ind2sub.  getindex and setindex! functions for AbstractArray types may include similar operations.While converting from a cartesian index to a linear index is fast (it's just multiplication and addition), converting from a linear index to a cartesian index is very slow: it relies on the div operation, which is one of the slowest low-level operations you can perform with a CPU.  For this reason, any code that deals with AbstractArray types is best designed in terms of cartesian, rather than linear, indexing."
},

{
    "location": "devdocs/subarrays.html#Index-replacement-1",
    "title": "Index replacement",
    "category": "Section",
    "text": "Consider making 2d slices of a 3d array:S1 = slice(A, :, 5, 2:6)\nnS2 = slice(A, 5, :, 2:6)slice drops \"singleton\" dimensions (ones that are specified by an Int), so both S1 and S2 are two-dimensional SubArrays. Consequently, the natural way to index these is with S1[i,j].  To extract the value from the parent array A, the natural approach is to replace S1[i,j] with A[i,5,(2:6)[j]] and S2[i,j] with A[5,i,(2:6)[j]].The key feature of the design of SubArrays is that this index replacement can be performed without any runtime overhead."
},

{
    "location": "devdocs/subarrays.html#SubArray-design-1",
    "title": "SubArray design",
    "category": "Section",
    "text": ""
},

{
    "location": "devdocs/subarrays.html#Type-parameters-and-fields-1",
    "title": "Type parameters and fields",
    "category": "Section",
    "text": "The strategy adopted is first and foremost expressed in the definition of the type:type SubArray{T,N,P<:AbstractArray,I<:(ViewIndex...),LD} <: AbstractArray{T,N}\nn    parent::P\nn    indexes::I\nn    dims::NTuple{N,Int}\nn    first_index::Int   # for linear indexing and pointer\nn    stride1::Int       # used only for linear indexing\nnendSubArray has 5 type parameters.  The first two are the standard element type and dimensionality.  The next is the type of the parent AbstractArray.  The most heavily-used is the fourth parameter, a tuple of the types of the indexes for each dimension. The final one, LD, is used only in special circumstances, to implement efficient linear indexing for those types that can support it.If in our example above A is a Array{Float64, 3}, our S1 case above would be a SubArray{Float64,2,Array{Float64,3},(Colon,Int64,UnitRange{Int64}),2}. Note in particular the tuple parameter, which stores the types of the indexes used to create S1.  Likewise,julia> S1.indexes\nn(Colon(),5,2:6)Storing these values allows index replacement, and having the types encoded as parameters allows one to dispatch to efficient algorithms.An Int index is used to represent a parent dimension that should be dropped.  The distinction between the sub and slice commands is that sub converts interiorInt indices into ranges at the time of construction.  For example:S3 = sub(A, :, 5, 2:6)\nn\nnjulia> S3.indexes\nn(Colon(),5:5,2:6)Because of this conversion, S3 is three-dimensional."
},

{
    "location": "devdocs/subarrays.html#getindex-and-setindex!-(index-translation)-1",
    "title": "getindex and setindex! (index translation)",
    "category": "Section",
    "text": "Performing index translation requires that you do different things for different concrete SubArray types.  For example, for S1, one needs to apply the i,j indexes to the first and third dimensions of the parent array, whereas for S2 one needs to apply them to the second and third.  The simplest approach to indexing would be to do the type-analysis at runtime:parentindexes = Array{Any}(0)\nnfor i = 1:ndims(S.parent)\nn    ...\nn    if isa(thisindex, Int)\nn        # Don't consume one of the input indexes\nn        push!(parentindexes, thisindex)\nn    else\nn        # Consume an input index\nn        push!(parentindexes, thisindex[inputindex[j]])\nn        j += 1\nn    end\nnend\nnS.parent[parentindexes...]Unfortunately, this would be disastrous in terms of performance: each element access would allocate memory, and involves the running of a lot of poorly-typed code.The better approach is to dispatch to specific methods to handle each type of input.  Note, however, that the number of distinct methods needed grows exponentially in the number of dimensions, and since Julia supports arrays of any dimension the number of methods required is in fact infinite.  Fortunately, @generated functions allow one to generate the necessary methods quite straightforwardly.  The resulting code looks quite a lot like the runtime approach above, but all of the type analysis is performed at the time of method instantiation.  For a SubArray of the type of S1, the method executed at runtime is literallygetindex(S::<type of S1>, i, j) = S.parent[i, S.indexes[2], S.indexes[3][j]]"
},

{
    "location": "devdocs/subarrays.html#Linear-indexing-1",
    "title": "Linear indexing",
    "category": "Section",
    "text": "Linear indexing can be implemented efficiently when the entire array has a single stride that separates successive elements.  For SubArray types, the availability of efficient linear indexing is based purely on the types of the indexes, and does not depend on values like the size of the array.  It therefore can miss some cases in which the stride happens to be uniform:julia> A = reshape(1:4*2, 4, 2)\nn4×2 Array{Int64,2}:\nn 1  5\nn 2  6\nn 3  7\nn 4  8\nn\nnjulia> diff(A[2:2:4,:][:])\nn3-element Array{Int64,1}:\nn 2\nn 2\nn 2A view constructed as sub(A, 2:2:4, :) happens to have uniform stride, and therefore linear indexing indeed could be performed efficiently.  However, success in this case depends on the size of the array: if the first dimension instead were odd,julia> A = reshape(1:5*2, 5, 2)\nn5×2 Array{Int64,2}:\nn 1   6\nn 2   7\nn 3   8\nn 4   9\nn 5  10\nn\nnjulia> diff(A[2:2:4,:][:])\nn3-element Array{Int64,1}:\nn 2\nn 3\nn 2then A[2:2:4,:] does not have uniform stride, so we cannot guarantee efficient linear indexing.  Since we have to base this decision based purely on types encoded in the parameters of the SubArray, S = sub(A, 2:2:4, :) cannot implement efficient linear indexing.The last parameter of SubArray, LD, encodes the highest dimension up to which elements are guaranteed to have uniform stride. When LD == length(I), the length of the indexes tuple, efficient linear indexing becomes possible.An example might help clarify what this means:For S1 above, the Colon along the first dimension is uniformly spaced (all elements are displaced by 1 from the previous value), so this dimension does not \"break\" linear indexing. Consequently LD has a value of at least 1.\nnThe second dimension of the parent, sliced out as 5, does not not by itself break linear indexing:  if all of the remaining indexes were Int, the entire SubArray would have efficient linear indexing.  Consequently, LD is at least 2.\nnThe last dimension is a Range.  This would by itself break linear indexing (even though it is a UnitRange, the fact that it might not start at 1 means that there might be gaps).  Additionally, given the preceding indexes any choice other than Int would also have truncated LD at 2.Consequently, as a whole S1 does not have efficient linear indexing.However, if we were to later say S1a = slice(S1, 2:2:7, 3), S1a would have an LD of 3 (its indexes tuple has type (Colon, Int, Int)) and would have efficient linear indexing.  This ability to re-slice is the main motivation to use an integer LD rather than a boolean flag to encode the applicability of linear indexing.The main reason LD cannot always be inferred from the indexes tuple is because sub converts internal Int indexes into UnitRanges.  Consequently it is important to encode \"safe\" dimensions of size 1 prior to conversion.  Up to the LDth entry, we can be sure that any UnitRange was, in fact, an Integer prior to conversion."
},

{
    "location": "devdocs/sysimg.html",
    "title": "System Image Building",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/sysimg.html#System-Image-Building-1",
    "title": "System Image Building",
    "category": "Section",
    "text": ""
},

{
    "location": "devdocs/types.html",
    "title": "More about types",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/types.html#More-about-types-1",
    "title": "More about types",
    "category": "Section",
    "text": "If you've used Julia for a while, you understand the fundamental role that types play.  Here we try to get under the hood, focusing particularly on parametric types."
},

{
    "location": "devdocs/types.html#Types-and-sets-(and-Any-and-Union{}/Bottom)-1",
    "title": "Types and sets (and Any and Union{}/Bottom)",
    "category": "Section",
    "text": "It's perhaps easiest to conceive of Julia's type system in terms of sets.  A concrete type corresponds to a single entity in the space of all possible types; an abstract type refers to a collection (set) of concrete types.  Any is a type that describes the entire universe of possible types; Integer is a subset of Any that includes Int, Int8, and other concrete types.  Internally, Julia also makes heavy use of another type known as Bottom, or equivalently, Union{}.  This corresponds to the empty set.Julia's types support the standard operations of set theory: you can ask whether T1 is a \"subset\" (subtype) of T2 with T1 <: T2.  Likewise, you intersect two types using typeintersect, take their union with Union, and compute a type that contains their union with typejoin:julia> typeintersect(Int, Float64)\nnUnion{}\nn\nnjulia> Union{Int, Float64}\nnUnion{Float64,Int64}\nn\nnjulia> typejoin(Int, Float64)\nnReal\nn\nnjulia> typeintersect(Signed, Union{UInt8, Int8})\nnInt8\nn\nnjulia> Union{Signed, Union{UInt8, Int8}}\nnUnion{Signed,UInt8}\nn\nnjulia> typejoin(Signed, Union{UInt8, Int8})\nnInteger\nn\nnjulia> typeintersect(Tuple{Integer,Float64}, Tuple{Int,Real})\nnTuple{Int64,Float64}\nn\nnjulia> Union{Tuple{Integer,Float64}, Tuple{Int,Real}}\nnUnion{Tuple{Int64,Real},Tuple{Integer,Float64}}\nn\nnjulia> typejoin(Tuple{Integer,Float64}, Tuple{Int,Real})\nnTuple{Integer,Real}While these operations may seem abstract, they lie at the heart of Julia.  For example, method dispatch is implemented by stepping through the items in a method list until reaching one for which typeintersect(args, sig) is not Union{}.  (Here, args is a tuple-type describing the types of the arguments, and sig is a tuple-type specifying the types in the function's signature.)  For this algorithm to work, it's important that methods be sorted by their specificity, and that the search begins with the most specific methods.  Consequently, Julia also implements a partial order on types; this is achieved by functionality that is similar to <:, but with differences that will be discussed below."
},

{
    "location": "devdocs/types.html#TypeVars-1",
    "title": "TypeVars",
    "category": "Section",
    "text": "Many types take parameters; an easy example is Array, which takes two parameters often written as Array{T,N}.  Let's compare the following methods:f1(A::Array) = 1\nnf2(A::Array{Int}) = 2\nnf3{T}(A::Array{T}) = 3\nnf4(A::Array{Any}) = 4\nnf5{T<:Any}(A::Array{T}) = 5All but f4 can be called with a = [1,2]; all but f2 can be called with b = Any[1,2].Let's look at these types a little more closely:julia> Array\nnArray{T,N}\nn\nnjulia> dump(Array)\nnArray{T,N} <: DenseArray{T,N}This indicates that Array is a shorthand for Array{T,N}.  If you type this at the REPL prompt–on its own, not while defining a function or type–you get an error T not defined. So what, exactly, are T and N? You can learn more by extracting these parameters:julia> T,N = Array.parameters\nnsvec(T,N)\nn\nnjulia> dump(T)\nnTypeVar\nn  name: Symbol T\nn  lb: Union{}\nn  ub: Any\nn  bound: Bool falseA TypeVar is one of Julia's built-in types–it's defined in jltypes.c, although you can find a commented-out version in boot.jl.  The name field is straightforward: it's what's printed when showing the object.  lb and ub stand for \"lower bound\" and \"upper bound,\" respectively: these are the sets that constrain what types the TypeVar may represent.  In this case, T's lower bound is Union{} (i.e., Bottom or the empty set); in other words, this TypeVar is not constrained from below.  The upper bound is Any, so neither is it constrained from above.In a method definition like:g{S<:Integer}(x::S) = 0one can extract the underlying TypeVar:g{S<:Integer}(x::S) = 0\nnm = first(methods(g))\nnp = m.sig.parameters\nntv = p[2]\nndump(tv)TypeVar\nn  name: Symbol S\nn  lb: Union{}\nn  ub: Integer <: Real\nn  bound: Bool trueHere ub is Integer, as specified in the function definition.The last field of a TypeVar is bound.  This boolean value specifies whether the TypeVar is defined as one of the function parameters. For example:julia> h1(A::Array, b::Real) = 1\nnh1 (generic function with 1 method)\nn\nnjulia> h2{T<:Real}(A::Array, b::T) = 1\nnh2 (generic function with 1 method)\nn\nnjulia> h3{T<:Real}(A::Array{T}, b::T) = 1\nnh3 (generic function with 1 method)\nn\nnjulia> p1 = first(methods(h1)).sig.parameters\nnsvec(#h1,Array{T,N},Real)\nn\nnjulia> p2 = first(methods(h2)).sig.parameters\nnsvec(#h2,Array{T,N},T<:Real)\nn\nnjulia> p3 = first(methods(h3)).sig.parameters\nnsvec(#h3,Array{T<:Real,N},T<:Real)\nn\nnjulia> dump(p1[2].parameters[1])\nnTypeVar\nn  name: Symbol T\nn  lb: Union{}\nn  ub: Any\nn  bound: Bool false\nn\nnjulia> dump(p3[2].parameters[1])\nnTypeVar\nn  name: Symbol T\nn  lb: Union{}\nn  ub: Real <: Number\nn  bound: Bool trueNote that p2 shows two objects called T, but only one of them has the upper bound Real; in contrast, p3 shows both of them bounded.  This is because in h3, the same type T is used in both places, whereas for h2 the T inside the array is simply the default symbol used for the first parameter of Array.One can construct TypeVars manually:julia> TypeVar(:V, Signed, Real, false)\nnSigned<:V<:RealThere are convenience versions that allow you to omit any of these arguments except the name symbol.Armed with this information, we can do some sneaky things that reveal a lot about how Julia does dispatch:julia> TV = TypeVar(:T, false)   # bound = false\nnT\nn\nnjulia> candid{T}(A::Array{T}, x::T) = 0\nncandid (generic function with 1 method)\nn\nnjulia> @eval sneaky{T}(A::Array{T}, x::$TV) = 1\nnsneaky (generic function with 1 method)\nn\nnjulia> methods(candid)\nn# 1 method for generic function \"candid\":\nncandid{T}(A::Array{T,N<:Any}, x::T) at none:1\nn\nnjulia> methods(sneaky)\nn# 1 method for generic function \"sneaky\":\nnsneaky{T}(A::Array{T,N<:Any}, x::T<:Any) at none:1These therefore print identically, but they have very different behavior:julia> candid([1],3.2)\nnERROR: MethodError: no method matching candid(::Array{Int64,1}, ::Float64)\nnClosest candidates are:\nn  candid{T}(::Array{T,N}, !Matched::T)\nn ...\nn\nnjulia> sneaky([1],3.2)\nn1To see what's happening, it's helpful to use Julia's internal jl_() function (defined in builtins.c) for display, because it prints bound TypeVar objects with a hash (#T instead of T):julia> jl_(x) = ccall(:jl_, Void, (Any,), x)\nnjl_ (generic function with 1 method)julia> jl_(first(methods(candid)))\nnMethod(sig=Tuple{Main.#candid, Array{#T<:Any, N<:Any}, #T<:Any}, va=false, isstaged=false, tvars=#T<:Any, func=Main.candid(?), invokes=nothing, next=nothing)\nn\nnjulia> jl_(first(methods(sneaky)))\nnMethod(sig=Tuple{Main.#sneaky, Array{#T<:Any, N<:Any}, T<:Any}, va=false, isstaged=false, tvars=#T<:Any, func=Main.sneaky(?), invokes=nothing, next=nothing)Even though both print as T, in sneaky the second T is not bound, and hence it isn't constrained to be the same type as the element type of the Array.Some TypeVar interactions depend on the bound state, even when there are not two or more uses of the same TypeVar. For example:julia> S = TypeVar(:S, false); T = TypeVar(:T, true)\nnT\nn\nn# These would be the same no matter whether we used S or T\nnjulia> Array{Array{S}} <: Array{Array}\nntrue\nn\nnjulia> Array{Array{S}} <: Array{Array{S}}\nntrue\nn\nnjulia> Array{Array} <: Array{Array{S}}\nntrue\nn\nn# For these cases, it matters\nnjulia> Array{Array{Int}} <: Array{Array}\nnfalse\nn\nnjulia> Array{Array{Int}} <: Array{Array{S}}\nnfalse\nn\nnjulia> Array{Array{Int}} <: Array{Array{T}}\nntrueIt's this latter construction that allows function declarations likefoo{T,N}(A::Array{Array{T,N}}) = T,Nto match despite the invariance of Julia's type parameters."
},

{
    "location": "devdocs/types.html#TypeNames-1",
    "title": "TypeNames",
    "category": "Section",
    "text": "The following two Array types are functionally equivalent, yet print differently via jl_():julia> TV, NV = TypeVar(:T), TypeVar(:N)\nn(T,N)\nn\nnjulia> jl_(Array)\nnArray\nn\nnjulia> jl_(Array{TV,NV})\nnArray{T<:Any, N<:Any}These can be distinguished by examining the name field of the type, which is an object of type TypeName:julia> dump(Array.name)\nnTypeName\nn  name: Symbol Array\nn  module: Module Core\nn  names: empty SimpleVector\nn  primary: Array{T,N} <: DenseArray{T,N}\nn  cache: SimpleVector\nn    ...\nn  linearcache: SimpleVector\nn    ...\nn  uid: Int64 47\nn  mt: MethodTable\nn    name: Symbol Array\nn    defs: Void nothing\nn    cache: Void nothing\nn    max_args: Int64 0\nn    kwsorter: #undef\nn    module: Module Core\nn    : Int64 0\nn    : Int64 0In this case, the relevant field is primary, which holds a reference to the \"primary\" instance of the type:julia> pointer_from_objref(Array)\nnPtr{Void} @0x00007fcc7de64850\nn\nnjulia> pointer_from_objref(Array.name.primary)\nnPtr{Void} @0x00007fcc7de64850\nn\nnjulia> pointer_from_objref(Array{TV,NV})\nnPtr{Void} @0x00007fcc80c4d930\nn\nnjulia> pointer_from_objref(Array{TV,NV}.name.primary)\nnPtr{Void} @0x00007fcc7de64850The primary field of Array points to itself, but for Array{TV,NV} it points back to the default definition of the type.What about the other fields? uid assigns a unique integer to each type.  To examine the cache field, it's helpful to pick a type that is less heavily used than Array. Let's first create our own type:julia> type MyType{T,N} end\nn\nnjulia> MyType{Int,2}\nnMyType{Int64,2}\nn\nnjulia> MyType{Float32, 5}\nnMyType{Float32,5}\nn\nnjulia> MyType.name.cache\nnsvec(MyType{Float32,5},MyType{Int64,2},#undef,#undef,#undef,#undef,#undef,#undef)(The cache is pre-allocated to have length 8, but only the first two entries are populated.) Consequently, when you instantiate a parametric type, each concrete type gets saved in a type-cache.  However, instances with TypeVar parameters are not cached."
},

{
    "location": "devdocs/types.html#Tuple-types-1",
    "title": "Tuple-types",
    "category": "Section",
    "text": "Tuple-types constitute an interesting special case.  For dispatch to work on declarations like x::Tuple, the type has to be able to be able to accommodate any tuple.  Let's check the parameters:julia> Tuple\nnTuple\nn\nnjulia> Tuple.parameters\nnsvec(Vararg{Any,N})It's worth noting that the parameter is a type, Any, rather than a TypeVar T<:Any: comparejulia> jl_(Tuple.parameters)\nnsvec(Vararg{Any, N<:Any})\nn\nnjulia> jl_(Array.parameters)\nnsvec(T<:Any, N<:Any)Unlike other types, tuple-types are covariant in their parameters, so this definition permits Tuple to match any type of tuple.  This is therefore equivalent to having an unbound TypeVar but distinct from a bound TypeVarjulia> typeintersect(Tuple, Tuple{Int,Float64})\nnTuple{Int64,Float64}\nn\nnjulia> typeintersect(Tuple{Vararg{Any}}, Tuple{Int,Float64})\nnTuple{Int64,Float64}\nn\nnjulia> T = TypeVar(:T,false)\nnT\nn\nnjulia> typeintersect(Tuple{Vararg{T}}, Tuple{Int,Float64})\nnTuple{Int64,Float64}\nn\nnjulia> T = TypeVar(:T,true)\nnT\nn\nnjulia> typeintersect(Tuple{Vararg{T}}, Tuple{Int,Float64})\nnUnion{}Finally, it's worth noting that Tuple{} is distinctjulia> Tuple{}\nnTuple{}\nn\nnjulia> Tuple{}.parameters\nnsvec()\nn\nnjulia> typeintersect(Tuple{}, Tuple{Int})\nnUnion{}What is the \"primary\" tuple-type?julia> pointer_from_objref(Tuple)\nnPtr{Void} @0x00007f5998a04370\nn\nnjulia> pointer_from_objref(Tuple{})\nnPtr{Void} @0x00007f5998a570d0\nn\nnjulia> pointer_from_objref(Tuple.name.primary)\nnPtr{Void} @0x00007f5998a04370\nn\nnjulia> pointer_from_objref(Tuple{}.name.primary)\nnPtr{Void} @0x00007f5998a04370so Tuple == Tuple{Vararg{Any}} is indeed the primary type."
},

{
    "location": "devdocs/types.html#Introduction-to-the-internal-machinery:-jltypes.c-1",
    "title": "Introduction to the internal machinery: jltypes.c",
    "category": "Section",
    "text": "Many operations for dealing with types are found in the file jltypes.c. A good way to start is to watch type intersection in action.  Build Julia with make debug and fire up Julia within a debugger. gdb debugging tips has some tips which may be useful.Because the type intersection and matching code is used heavily in the REPL itself–and hence breakpoints in this code get triggered often–it will be easiest if you make the following definition:julia> function myintersect(a,b)\nn           ccall(:jl_breakpoint, Void, (Any,), nothing)\nn           typeintersect(a, b)\nn       endand then set a breakpoint in jl_breakpoint.  Once this breakpoint gets triggered, you can set breakpoints in other functions.As a warm-up, try the following:myintersect(Tuple{Integer,Float64}, Tuple{Int,Real})Set a breakpoint in intersect_tuple and continue until it enters this function.  You should be able to see something like this:Breakpoint 2, intersect_tuple (a=0x7ffdf7409150, b=0x7ffdf74091b0, penv=0x7fffffffcc90, eqc=0x7fffffffcc70, var=covariant) at jltypes.c:405\nn405     {\nn(gdb) call jl_(a)\nnTuple{Integer, Float64}\nn(gdb) call jl_(b)\nnTuple{Int64, Real}The var argument is either covariant or invariant, the latter being used if you're matching the type parameters of Array{T1} against Array{T2}.  The other two inputs to this function (penv and eqc) may be currently mysterious, but we'll discuss them in a moment.  For now, step through the code until you get into the loop over the different entries in the tuple types a and b.  The key call is:ce = jl_type_intersect(ae,be,penv,eqc,var);which, if you examine ae, be, and ce, you'll see is just type intersection performed on these entries.We can make it more interesting by trying a more complex case:julia> T = TypeVar(:T, true)\nnT\nn\nnjulia> myintersect(Tuple{Array{T}, T}, Tuple{Array{Int,2}, Int8})\nn\nnBreakpoint 1, jl_breakpoint (v=0x7ffdf35e8010) at builtins.c:1559\nn1559    {\nn(gdb) b intersect_tuple\nnBreakpoint 3 at 0x7ffff6dcb07d: file jltypes.c, line 405.\nn(gdb) c\nnContinuing.\nn\nnBreakpoint 3, intersect_tuple (a=0x7ffdf74d7a90, b=0x7ffdf74d7af0, penv=0x7fffffffcc90, eqc=0x7fffffffcc70, var=covariant) at jltypes.c:405\nn405     {\nn(gdb) call jl_(a)\nnTuple{Array{＃T<:Any, N<:Any}, ＃T<:Any}\nn(gdb) call jl_(b)\nnTuple{Array{Int64, 2}, Int8}Let's watch how this bound TypeVar gets handled.  To follow this, you'll need to examine the variables penv and eqc, which are defined as:typedef struct {\nn    jl_value_t **data;\nn    size_t n;\nn    jl_svec_t *tvars;\nn} cenv_t;These start out empty (with penv->n == eqc->n == 0).  Once we get into the loop and make the first call to jl_type_intersect, eqc (which stands for \"equality constraints\") has the following value:(gdb) p eqc->n\nn$4 = 2\nn(gdb) call jl_(eqc->data[0])\nn＃T<:Any\nn(gdb) call jl_(eqc->data[1])\nnInt64This is just a var, value list of pairs, indicating that T now has the value Int64.  If you now allow intersect_tuple to finish and keep progressing, you'll eventually get to type_intersection_matching.  This function contains a call to solve_tvar_constraints.  Roughly speaking, eqc defines T = Int64, but env defines it as Int8; this conflict is detected in solve_tvar_constraints and the resulting return is jl_bottom_type, aka Union{}."
},

{
    "location": "devdocs/valgrind.html",
    "title": "Using Valgrind with Julia",
    "category": "Page",
    "text": ""
},

{
    "location": "devdocs/valgrind.html#Using-Valgrind-with-Julia-1",
    "title": "Using Valgrind with Julia",
    "category": "Section",
    "text": "Valgrind is a tool for memory debugging, memory leak detection, and profiling.  This section describes things to keep in mind when using Valgrind to debug memory issues with Julia."
},

{
    "location": "devdocs/valgrind.html#General-considerations-1",
    "title": "General considerations",
    "category": "Section",
    "text": "By default, Valgrind assumes that there is no self modifying code in the programs it runs.  This assumption works fine in most instances but fails miserably for a just-in-time compiler like julia.  For this reason it is crucial to pass --smc-check=all-non-file to valgrind, else code may crash or behave unexpectedly (often in subtle ways).In some cases, to better detect memory errors using Valgrind it can help to compile julia with memory pools disabled.  The compile-time flag MEMDEBUG disables memory pools in Julia, and MEMDEBUG2 disables memory pools in FemtoLisp.  To build julia with both flags, add the following line to Make.user:CFLAGS = -DMEMDEBUG -DMEMDEBUG2Another thing to note: if your program uses multiple workers processes, it is likely that you want all such worker processes to run under Valgrind, not just the parent process.  To do this, pass --trace-children=yes to valgrind."
},

{
    "location": "devdocs/valgrind.html#Suppressions-1",
    "title": "Suppressions",
    "category": "Section",
    "text": "Valgrind will typically display spurious warnings as it runs.  To reduce the number of such warnings, it helps to provide a suppressions file to Valgrind.  A sample suppressions file is included in the Julia source distribution at contrib/valgrind-julia.supp.The suppressions file can be used from the julia/ source directory as follows:$ valgrind --smc-check=all-non-file --suppressions=contrib/valgrind-julia.supp ./julia progname.jlAny memory errors that are displayed should either be reported as bugs or contributed as additional suppressions.  Note that some versions of Valgrind are shipped with insufficient default suppressions, so that may be one thing to consider before submitting any bugs."
},

{
    "location": "devdocs/valgrind.html#Running-the-Julia-test-suite-under-Valgrind-1",
    "title": "Running the Julia test suite under Valgrind",
    "category": "Section",
    "text": "It is possible to run the entire Julia test suite under Valgrind, but it does take quite some time (typically several hours).  To do so, run the following command from the julia/test/ directory:valgrind --smc-check=all-non-file --trace-children=yes --suppressions=$PWD/../contrib/valgrind-julia.supp ../julia runtests.jl allIf you would like to see a report of \"definite\" memory leaks, pass the flags --leak-check=full --show-leak-kinds=definite to valgrind as well."
},

]}
