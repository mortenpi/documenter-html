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
    "location": "lib/internals.html#Documenter.Utilities.DOM.MarkdownConverter",
    "title": "Documenter.Utilities.DOM.MarkdownConverter",
    "category": "Module",
    "text": "Provides support for conversion from Markdown.MD to DOM.Node objects.\nn\nn\nn\nn"
},

{
    "location": "lib/internals.html#Documenter.Utilities.DOM.MarkdownConverter.mdconvert-Tuple{Any}",
    "title": "Documenter.Utilities.DOM.MarkdownConverter.mdconvert",
    "category": "Method",
    "text": "Convert a markdown object to a DOM.Node object.\nn\nnThe parent argument is passed to allow for context-dependant conversions.\nn\nn\nn\nn"
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
    "text": ""
},

{
    "location": "dynamic/bugs.html#Titles-for-links-and-images.-1",
    "title": "Titles for links and images.",
    "category": "Section",
    "text": "[image: Ducks! (alt-text) (http://www.freedigitalphotos.net/images/img/homepage/87357.jpg \"Title text? About ducks?\")]About ducks."
},

]}
