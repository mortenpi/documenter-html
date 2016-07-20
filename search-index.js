var documenterSearchIndex = {"docs": [

{
    "location": "index.html",
    "title": "Documenter.jl",
    "text": ""
},

{
    "location": "index.html#Documenter.jl-1",
    "title": "Documenter.jl",
    "text": "A documentation generator for Julia.A package for building documentation from docstrings and markdown files.note: Note\nnPlease read through the Documentation section of the main Julia manual if this is your first time using Julia's documentation system. Once you've read through how to write documentation for your code then come back here."
},

{
    "location": "index.html#Package-Features-1",
    "title": "Package Features",
    "text": "Write all your documentation in Markdown.\nnMinimal configuration.\nnSupports Julia 0.4 and 0.5-dev.\nnDoctests Julia code blocks.\nnCross references for docs and section headers.\nn[latex: m.formula] syntax support.\nnChecks for missing docstrings and incorrect cross references.\nnGenerates tables of contents and docstring indexes.\nnUse git push to automatically build and deploy docs from Travis to GitHub Pages.The Package Guide provides a tutorial explaining how to get started using Documenter.Some examples of packages using Documenter can be found on the Examples page.See the Index for the complete list of documented functions and types."
},

{
    "location": "index.html#Manual-Outline-1",
    "title": "Manual Outline",
    "text": "Pages = [\nn    \"man/guide.md\",\nn    \"man/examples.md\",\nn    \"man/syntax.md\",\nn    \"man/doctests.md\",\nn    \"man/hosting.md\",\nn    \"man/latex.md\",\nn]\nnDepth = 2"
},

{
    "location": "index.html#Library-Outline-1",
    "title": "Library Outline",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nnDepth = 2"
},

{
    "location": "index.html#main-index-1",
    "title": "Index",
    "text": ""
},

{
    "location": "index.html#Modules-1",
    "title": "Modules",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nnOrder = [:module]"
},

{
    "location": "index.html#Functions-1",
    "title": "Functions",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nnOrder = [:function]"
},

{
    "location": "man/guide.html",
    "title": "Package Guide",
    "text": ""
},

{
    "location": "man/guide.html#Package-Guide-1",
    "title": "Package Guide",
    "text": ""
},

{
    "location": "man/guide.html#Installation-1",
    "title": "Installation",
    "text": "Documenter is a registered package and so can be installed via Pkg.add.Pkg.add(\"Documenter\")This package supports Julia 0.4 and 0.5."
},

{
    "location": "man/guide.html#Usage-1",
    "title": "Usage",
    "text": "Documenter is designed to do one thing – combine markdown files and inline docstrings from Julia's docsystem into a single inter-linked document. What follows is a step-by-step guide to creating a simple document."
},

{
    "location": "man/guide.html#Setting-up-the-folder-structure-1",
    "title": "Setting up the folder structure",
    "text": "Firstly, we need a Julia module to document. This could be a package generated via PkgDev.generate or a single .jl script. For this guide we'll be using a package called Example.jl that has the following directory layout:Example/\nn    src/\nn        Example.jl\nn    ...Note that the ... just represent unimportant files and folders.We must decide on a location where we'd like to store the documentation for this package. It's recommended to use a folder named docs/ in the toplevel of the package, like soExample/\nn    docs/\nn        ...\nn    src/\nn        Example.jl\nn    ...Inside the docs/ folder we need to add two things. A source folder which will contain the markdown files that will be used to build the finished document and a Julia script that will be used to control the build process. The following names are recommendeddocs/\nn    src/\nn    make.jl"
},

{
    "location": "man/guide.html#Building-an-empty-document-1",
    "title": "Building an empty document",
    "text": "With our docs/ directory now setup we're going to build our first document. It'll just be a single empty file at the moment, but we'll be adding to it later on.Add the following to your make.jl fileusing Documenter, Example\nn\nnmakedocs()This assumes you've installed Documenter as discussed in Installation and that your Examples package can be found by Julia.Now add an index.md file to the src/ directory. The name has no particular significance though and you may name it whatever you like. We'll stick to index.md for this guide.Leave the newly added file empty and then run the following command from the docs/ directory$ julia make.jlNote that $ just represents the prompt character. You don't need to type that.If you'd like to see the output from this command in color use$ julia --color=yes make.jlWhen you run that you should see the following outputDocumenter: setting up build directory.\nnDocumenter: redirecting output streams.\nnDocumenter: expanding markdown templates.\nnDocumenter: building cross-references.\nnDocumenter: running document checks.\nnDocumenter: restoring output streams.\nnDocumenter: rendering document.\nnDocumenter: populating indices.\nnDocumenter: copying assets to build directory.The docs/ folder should contain a new directory – called build/. It's structure should look like the followingbuild/\nn    assets/\nn        Documenter.css\nn        mathjaxhelper.js\nn    index.mdAt the moment build/index.md should be empty since src/index.md is empty.At this point you can add some text to src/index.md and rerun the make.jl file to see the changes if you'd like to."
},

{
    "location": "man/guide.html#Adding-some-docstrings-1",
    "title": "Adding some docstrings",
    "text": "Next we'll splice a docstring defined in the Example module into the index.md file. To do this first document a function in that module:module Example\nn\nnexport func\nn\nn\"\"\"\nn    func(x)\nn\nnReturns double the number `x` plus `1`.\nn\"\"\"\nnfunc(x) = 2x + 1\nn\nnendThen in the src/index.md file add the following# Example.jl Documentation\nn\nn```@docs\nnfunc(x)\nn```When we next run make.jl the docstring for Example.func(x) should appear in place of the @docs block in build/index.md. Note that more than one object can be referenced inside a @docs block – just place each one on a separate line.Note that the module in which a @docs block is evaluated is determined by current_module() and so will more than likely be Main. This means that each object listed in the block must be visible there. The module can be changed to something else on a per-page basis with a @meta block as in the following# Example.jl Documentation\nn\nn```@meta\nnCurrentModule = Documenter\nn```\nn\nn```@docs\nnfunc(x)\nn```"
},

{
    "location": "man/guide.html#Filtering-Included-Docstrings-1",
    "title": "Filtering Included Docstrings",
    "text": "In some cases you may want to include a docstring for a Method that extends a Function from a different module – such as Base. In the following example we extend Base.length with a new definition for type T and also add a docstring:type T\nn    # ...\nnend\nn\nn\"\"\"\nnCustom `length` docs for `T`.\nn\"\"\"\nnBase.length(::T) = 1When trying to include this docstring with```@docs\nnlength\nn```all the docs for length will be included – even those from other modules. There are two ways to solve this problem. Either include the type in the signature with```@docs\nnlength(::T)\nn```or declare the specific modules that makedocs should include withmakedocs(\nn    # options\nn    modules = [MyModule]\nn)"
},

{
    "location": "man/guide.html#Cross-Referencing-1",
    "title": "Cross Referencing",
    "text": "It may be necessary to refer to a particular docstring or section of your document from elsewhere in the document. To do this we can make use of Documenter's cross-referencing syntax which looks pretty similar to normal markdown link syntax. Replace the contents of src/index.md with the following# Example.jl Documentation\nn\nn```@docs\nnfunc(x)\nn```\nn\nn- link to [Example.jl Documentation](@ref)\nn- link to [`func(x)`](@ref)So we just have to replace each link's url with @ref and write the name of the thing we'd link to cross-reference. For document headers it's just plain text that matches the name of the header and for docstrings enclose the object in backticks.This also works across different pages in the same way. Note that these sections and docstrings must be unique within a document."
},

{
    "location": "man/examples.html",
    "title": "Examples",
    "text": ""
},

{
    "location": "man/examples.html#Examples-1",
    "title": "Examples",
    "text": "Sometimes the best way to learn how to use a new package is to look for examples of what others have already built with it.The following packages use Documenter to build their documentation and so should give a good overview of what this package is currently able to do.note: Note\nnPackages are listed alphabetically. If you have a package that uses Documenter then please open a PR that adds it to the appropriate list below.The make.jl file for all listed packages will be tested to check for potential regressions prior to tagging new Documenter releases whenever possible."
},

{
    "location": "man/examples.html#Registered-1",
    "title": "Registered",
    "text": "Packages that have tagged versions available in METADATA.jl.ControlSystems.jl\nnCurrencies.jl\nnDifferentialEquations.jl\nnDocumenter.jl\nnExtractMacro.jl\nnMergedMethods.jl\nnNumericSuffixes.jl\nnOptim.jl\nnPhyloNetworks.jl\nnPOMDPs.jl\nnPrivateModules.jl\nnTaylorSeries.jl\nnWeave.jl"
},

{
    "location": "man/syntax.html",
    "title": "Syntax",
    "text": ""
},

{
    "location": "man/syntax.html#Syntax-1",
    "title": "Syntax",
    "text": "This section of the manual describes the syntax used by Documenter to build documentation.Pages = [\"syntax.md\"]"
},

{
    "location": "man/syntax.html#@docs-block-1",
    "title": "@docs block",
    "text": "Splice one or more docstrings into a document in place of the code block, i.e.```@docs\nnDocumenter\nnmakedocs\nndeploydocs\nn```This block type is evaluated within the CurrentModule module if defined, otherwise within current_module(), and so each object listed in the block should be visible from that module. Undefined objects will raise warnings during documentation generation and cause the code block to be rendered in the final document unchanged.Objects may not be listed more than once within the document. When duplicate objects are detected an error will be raised and the build process will be terminated.To ensure that all docstrings from a module are included in the final document the modules keyword for makedocs can be set to the desired module or modules, i.e.makedocs(\nn    modules = [Documenter],\nn)which will cause any unlisted docstrings to raise warnings when makedocs is called. If modules is not defined then no warnings are printed, even if a document has missing docstrings."
},

{
    "location": "man/syntax.html#@autodocs-block-1",
    "title": "@autodocs block",
    "text": "Automatically splices all docstrings from the provided modules in place of the code block. This is equivalent to manually adding all the docstrings in a @docs block.```@autodocs\nnModules = [Foo, Bar]\nnOrder   = [:function, :type]\nn```The above @autodocs block adds all the docstrings found in modules Foo and Bar that refer to functions or types to the document.Each module is added in order and so all docs from Foo will appear before those of Bar. Possible values for the Order vector are:module\nn:constant\nn:type\nn:function\nn:macroIf no Order is provided then the order listed above is used.When a potential docstring is found in one of the listed modules, but does not match any value from Order then it will be omitted from the document. Hence Order acts as a basic filter as well as sorter.In addition to Order, a Pages vector may be included in @autodocs to filter docstrings based on the source file in which they are defined:```@autodocs\nnModules = [Foo]\nnPages   = [\"a.jl\", \"b.jl\"]\nn```In the above example docstrings from module Foo found in source files that end in a.jl and b.jl are included. The page order provided by Pages is also used to sort the docstrings. Note that page matching is done using the end of the provided strings and so a.jl will be matched by any source file that ends in a.jl, i.e. src/a.jl or src/foo/a.jl.note: Note\nnWhen more complex sorting and filtering is needed then use @docs to define it explicitly."
},

{
    "location": "man/syntax.html#@ref-link-1",
    "title": "@ref link",
    "text": "Used in markdown links as the URL to tell Documenter to generate a cross-reference automatically. The text part of the link can be a docstring, header name, or GitHub PR/Issue number.# Syntax\nn\nn... [`makedocs`](@ref) ...\nn\nn# Functions\nn\nn```@docs\nnmakedocs\nn```\nn\nn... [Syntax](@ref) ...\nn\nn... [#42](@ref) ...Plain text in the \"text\" part of a link will either cross-reference a header, or, when it is a number preceded by a #, a GitHub issue/pull request. Text wrapped in backticks will cross-reference a docstring from a @docs block.@refs may refer to docstrings or headers on different pages as well as the current page using the same syntax.Note that depending on what the CurrentModule is set to, a docstring @ref may need to be prefixed by the module which defines it.Duplicate HeadersIn some cases a document may contain multiple headers with the same name, but on different pages or of different levels. To allow @ref to cross-reference a duplicate header it must be given a name as in the following example# [Header](@id my_custom_header_name)\nn\nn...\nn\nn## Header\nn\nn... [Custom Header](@ref my_custom_header_name) ...The link that wraps the named header is removed in the final document. The text for a named @ref ... does not need to match the header that it references. Named @ref ...s may refer to headers on different pages in the same way as unnamed ones do.Duplicate docstring references do not occur since splicing the same docstring into a document more than once is disallowed."
},

{
    "location": "man/syntax.html#@meta-block-1",
    "title": "@meta block",
    "text": "This block type is used to define metadata key/value pairs that can be used elsewhere in the page. Currently CurrentModule and DocTestSetup are the only recognised keys.```@meta\nnCurrentModule = FooBar\nnDocTestSetup  = quote\nn    using MyPackage\nnend\nn```Note that @meta blocks are always evaluated with the current_module(), which is typically Main.See Setup Code section of the Doctests page for an explanation of DocTestSetup."
},

{
    "location": "man/syntax.html#@index-block-1",
    "title": "@index block",
    "text": "Generates a list of links to docstrings that have been spliced into a document. Valid settings are Pages, Modules, and Order. For example:```@index\nnPages   = [\"foo.md\"]\nnModules = [Foo, Bar]\nnOrder   = [:function, :type]\nn```When Pages or Modules are not provided then all pages or modules are included. Order defaults to[:module, :constant, :type, :function, :macro]if not specified. Order and Modules behave the same way as in @autodocs blocks and filter out docstrings that do not match one of the modules or categories specified.Note that the values assigned to Pages, Modules, and Order may be any valid Julia code and thus can be something more complex that an array literal if required, i.e.```@index\nnPages = map(file -> joinpath(\"man\", file), readdir(\"man\"))\nn```It should be noted though that in this case Pages may not be sorted in the order that is expected by the user. Try to stick to array literals as much as possible."
},

{
    "location": "man/syntax.html#@contents-block-1",
    "title": "@contents block",
    "text": "Generates a nested list of links to document sections. Valid settings are Pages and Depth.```@contents\nnPages = [\"foo.md\"]\nnDepth = 5\nn```As with @index if Pages is not provided then all pages are included. The default Depth value is 2."
},

{
    "location": "man/syntax.html#@example-block-1",
    "title": "@example block",
    "text": "Evaluates the code block and inserts the result into the final document along with the original source code.```@example\nna = 1\nnb = 2\nna + b\nn```The above @example block will splice the following into the final document```julia\nna = 1\nnb = 2\nna + b\nn```\nn\nn```\nn3\nn```Leading and trailing newlines are removed from the rendered code blocks. Trailing whitespace on each line is also removed.Hiding Source CodeCode blocks may have some content that does not need to be displayed in the final document. # hide comments can be appended to lines that should not be rendered, i.e.```@example\nnsrand(1) # hide\nnA = rand(3, 3)\nnb = [1, 2, 3]\nnA \ b\nn```Note that appending # hide to every line in an @example block will result in the block being hidden in the rendered document. The results block will still be rendered though.STDOUT and STDERRThe Julia output streams are redirected to the results block when evaluating @example blocks in the same way as when running doctest code blocks.nothing ResultsWhen the @example block evaluates to nothing then the second block is not displayed. Only the source code block will be shown in the rendered document. Note that if any output from either STDOUT or STDERR is captured then the results block will be displayed even if nothing is returned.Named @example BlocksBy default @example blocks are run in their own anonymous Modules to avoid side-effects between blocks. To share the same module between different blocks on a page the @example can be named with the following syntax```@example 1\nna = 1\nn```\nn\nn```@example 1\nnprintln(a)\nn```The name can be any text, not just integers as in the example above, i.e. @example foo.Named @example blocks can be useful when generating documentation that requires intermediate explanation or multimedia such as plots as illustrated in the following exampleFirst we define some functions\nn\nn```@example 1\nnusing PyPlot # hide\nnf(x) = sin(2x) + 1\nng(x) = cos(x) - x\nn```\nn\nnand then we plot `f` over the interval from ``-π`` to ``π``\nn\nn```@example 1\nnx = linspace(-π, π)\nnplot(x, f(x), color = \"red\")\nnsavefig(\"f-plot.svg\"); nothing # hide\nn```\nn\nn![](f-plot.svg)\nn\nnand then we do the same with `g`\nn\nn```@example 1\nnplot(x, g(x), color = \"blue\")\nnsavefig(\"g-plot.svg\"); nothing # hide\nn```\nn\nn![](g-plot.svg)Note that @example blocks are evaluated within the directory of build where the file will be rendered . This means than in the above example savefig will output the .svg files into that directory. This allows the images to be easily referenced without needing to worry about relative paths.@example blocks automatically define ans which, as in the Julia REPL, is bound to the value of the last evaluated expression. This can be useful in situations such as the following one where where binding the object returned by plot to a named variable would look out of place in the final rendered documentation:```@example\nnusing Gadfly # hide\nnplot([sin, x -> 2sin(x) + x], -2π, 2π)\nndraw(SVG(\"plot.svg\", 6inch, 4inch), ans); nothing # hide\nn```\nn\nn![](plot.svg)"
},

{
    "location": "man/syntax.html#@repl-block-1",
    "title": "@repl block",
    "text": "These are similar to @example blocks, but adds a julia> prompt before each toplevel expression. ; and # hide syntax may be used in @repl blocks in the same way as in the Julia REPL and @example blocks.```@repl\nna = 1\nnb = 2\nna + b\nn```will generate```julia\nnjulia> a = 1\nn1\nn\nnjulia> b = 2\nn2\nn\nnjulia> a + b\nn3\nn```Named @repl <name> blocks behave in the same way as named @example <name> blocks."
},

{
    "location": "man/doctests.html",
    "title": "Doctests",
    "text": ""
},

{
    "location": "man/doctests.html#Doctests-1",
    "title": "Doctests",
    "text": "Documenter will, by default, try to run Julia code blocks that it finds in the generated documentation. This can help to avoid documentation examples from becoming outdated, incorrect, or misleading. It's recommended that as many of a package's examples be runnable by Documenter's doctest.This section of the manual outlines how to go about enabling doctests for code blocks in your package's documentation."
},

{
    "location": "man/doctests.html#\"Script\"-Examples-1",
    "title": "\"Script\" Examples",
    "text": "The first, of two, types of doctests is the \"script\" code block. To make Documenter detect this kind of code block the following format must be used:```julia\nna = 1\nnb = 2\nna + b\nn\nn# output\nn\nn3\nn```The code block's \"language\" must be julia and must include a line containing the text # output. The text before this line is the contents of the script which is run. The text that appears after # output is the textual representation that would be shown in the Julia REPL if the script had been included.The actual output produced by running the \"script\" is compared to the expected result and any difference will result in makedocs throwing an error and terminating.Note that the amount of whitespace appearing above and below the # output line is not significant and can be increased or decreased if desired."
},

{
    "location": "man/doctests.html#REPL-Examples-1",
    "title": "REPL Examples",
    "text": "The other kind of doctest is a simulated Julia REPL session. The following format is detected by Documenter as a REPL doctest:```julia\nnjulia> a = 1\nn1\nn\nnjulia> b = 2;\nn\nnjulia> c = 3;  # comment\nn\nnjulia> a + b + c\nn6\nn\nn```As with script doctests, the code block must have it's language set to julia. When a code block contains one or more julia> at the start of a line then it is assumed to be a REPL doctest. Semi-colons, ;, at the end of a line works in the same way as in the Julia REPL and will suppress the output, although the line is still evaluated.Note that not all features of the REPL are supported such as shell and help modes."
},

{
    "location": "man/doctests.html#Skipping-Doctests-1",
    "title": "Skipping Doctests",
    "text": "Doctesting can be disabled by setting the makedocs keyword doctest = false. This should only be done when initially laying out the structure of a package's documentation, after which it's encouraged to always run doctests when building docs."
},

{
    "location": "man/hosting.html",
    "title": "Hosting Documentation",
    "text": ""
},

{
    "location": "man/hosting.html#Hosting-Documentation-1",
    "title": "Hosting Documentation",
    "text": "After going through the Package Guide and Doctests page you will need to host the generated documentation somewhere for potential users to read. This guide will describe how to setup automatic updates for your package docs using the Travis build service and GitHub Pages. This is the same approach used by this package to host it's own docs – the docs you're currently reading.note: Note\nnFollowing this guide should be the final step you take after you are comfortable with the syntax and build process used by Documenter.jl. Only proceed with the steps outlined on this page once you have successfully used mkdocs locally to build your documentation.  mkdocs can typically be installed using pip install mkdocs in your terminal.This guide assumes that you already have GitHub and Travis accounts setup. If not then go set those up first and then return here."
},

{
    "location": "man/hosting.html#Overview-1",
    "title": "Overview",
    "text": "Once setup correctly the following will happen each time you push new updates to your package repository:travis buildbots startup and run your tests;\nneach buildbot will build the package docs using your docs/make.jl script;\nna single buildbot will then try to push the generated docs back the github.The following sections outline how to enable this for your own package."
},

{
    "location": "man/hosting.html#Deploy-Keys-1",
    "title": "Deploy Keys",
    "text": "Two methods are available for securely deploying generated documentation from Travis to GitHub. The first method listed below is the preferred approach. The second, and original, method should be avoided whenever possible."
},

{
    "location": "man/hosting.html#SSH-Deploy-Keys-1",
    "title": "SSH Deploy Keys",
    "text": "Deploy keys provide push access to a single repository.note: Note\nnYou will need several command line programs installed for the following steps to work. They are which, git, ssh-keygen, and travis.  Make sure these are installed before you begin.Open a Julia REPL and import Documenter.julia> using DocumenterThen call the Travis.genkeys function as follows:julia> Travis.genkeys(\"MyPackage\")where \"MyPackage\" is the name of the package you would like to create deploy keys for.You may be asked to enter your password for Travis during this process. Once complete you will need to add the public key displayed in the REPL to your repository – just follow the instructions displayed in the REPL.Then close the REPL and commit the docs/.documenter.enc file that was generated by Travis.genkeys to the repository. You can skip the GitHub Security Tokens section and move straight on to Travis Environment Settings now."
},

{
    "location": "man/hosting.html#GitHub-Security-Tokens-1",
    "title": "GitHub Security Tokens",
    "text": "These tokens provide push access to every repository owned by the user.Firstly, generate a new personal access token.Enter a description for this new token. We'll be calling ours \"Travis\", but any other name will do. For the \"Select scopes\" option choose \"public_repo\" only. Then generate the token and save it somewhere safe. We'll be needing it during the next section."
},

{
    "location": "man/hosting.html#Travis-Environment-Settings-1",
    "title": "Travis Environment Settings",
    "text": ""
},

{
    "location": "man/hosting.html#SSH-Keys-1",
    "title": "SSH Keys",
    "text": "If you used Travis.genkeys in the previous step then you should go to your Travis settings page and check that two new keys have been added with names similar to the followingencrypted_e6b49e69746a_key\nnencrypted_e6b49e69746a_iv"
},

{
    "location": "man/hosting.html#Tokens-1",
    "title": "Tokens",
    "text": "If you generated a GitHub token during the previous step then we'll add the token to our repository's Travis page. Go to the settings page for the repository and under the \"Environment Variables\" section add a new variable called GITHUB_API_KEY. Copy the generated key from the GitHub Security Tokens section as the value and make sure that \"Display value in build log\" is off. Be careful to remove any leading white-space from the key. Then add the key."
},

{
    "location": "man/hosting.html#.travis.yml-Configuration-1",
    "title": ".travis.yml Configuration",
    "text": "In the after_success section of the .travis.yml file, where code coverage is processed, run your docs/make.jl file:after_success:\nn  - julia -e 'Pkg.add(\"Documenter\")'\nn  - julia -e 'cd(Pkg.dir(\"PACKAGE_NAME\")); include(joinpath(\"docs\", \"make.jl\"))'"
},

{
    "location": "man/hosting.html#The-deploydocs-Function-1",
    "title": "The deploydocs Function",
    "text": "At the moment your docs/make.jl file probably only containsusing Documenter, PACKAGE_NAME\nn\nnmakedocs()We'll need to add an additional call to this file after makedocs. Add the following at the end of the file:deploydocs(\nn    repo = \"github.com/USER_NAME/PACKAGE_NAME.jl.git\"\nn)where USER_NAME and PACKAGE_NAME must be set to the appropriate names.By default deploydocs will deploy the documentation from the nightly Julia build for Linux. This can be changed using the julia and osname keywords as follows:deploydocs(\nn    deps   = Deps.pip(\"mkdocs\", \"python-markdown-math\"),\nn    repo   = \"github.com/USER_NAME/PACKAGE_NAME.jl.git\",\nn    julia  = \"0.4\",\nn    osname = \"osx\"\nn)This will deploy the docs from the OSX Julia 0.4 Travis build bot.The keyword deps serves to provide the required dependencies to deploy the documentation. In the example above we include the dependencies mkdocs and python-markdown-math. The former makes sure that MkDocs is installed to deploy the documentation, and the latter provides the mdx_math markdown extension to exploit MathJax rendering of latex equations in markdown. Other dependencies should be included here.See the deploydocs function documentation for more details."
},

{
    "location": "man/hosting.html#The-MkDocs-mkdocs.yml-File-1",
    "title": "The MkDocs mkdocs.yml File",
    "text": "We'll be using MkDocs to convert the markdown files generated by Documenter to HTML. (This, of course, is not the only option you have for this step. Any markdown to HTML converter should work fine with some amount of setting up.)Add an mkdocs.yml file to your docs/ directory with the following content:site_name:        PACKAGE_NAME.jl\nnrepo_url:         https://github.com/USER_NAME/PACKAGE_NAME.jl\nnsite_description: Description...\nnsite_author:      USER_NAME\nn\nntheme: readthedocs\nn\nnextra_css:\nn  - assets/Documenter.css\nn\nnextra_javascript:\nn  - https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML\nn  - assets/mathjaxhelper.js\nn\nnmarkdown_extensions:\nn  - extra\nn  - tables\nn  - fenced_code\nn  - mdx_math\nn\nndocs_dir: 'build'\nn\nnpages:\nn  - Home: index.mdThis is only a basic skeleton. Read through the MkDocs documentation if you would like to know more about the available settings."
},

{
    "location": "man/hosting.html#.gitignore-1",
    "title": ".gitignore",
    "text": "Add the following to your package's .gitignore filedocs/build/\nndocs/site/These are needed to avoid committing generated content to your repository."
},

{
    "location": "man/hosting.html#gh-pages-Branch-1",
    "title": "gh-pages Branch",
    "text": "Create a new branch called gh-pages and push it to GitHub. If this branch already exists then you can skip this step, but do note that the generated content is automatically pushed to this branch from Travis."
},

{
    "location": "man/latex.html",
    "title": "[latex: m.formula] syntax",
    "text": ""
},

{
    "location": "man/latex.html#latex_syntax-1",
    "title": "[latex: m.formula] syntax",
    "text": "The following section describes how to add equations written using [latex: m.formula] to your documentation. There are some differences between Julia 0.4 and 0.5 that need to be taken into account when reading this section of the manual. These differences are outlined in the next two sections."
},

{
    "location": "man/latex.html#Julia-0.4-1",
    "title": "Julia 0.4",
    "text": ""
},

{
    "location": "man/latex.html#Inline-equations-1",
    "title": "Inline equations",
    "text": "Surround inline equations and mathematical symbols in $ characters, i.e.Here's some inline maths: $\sqrt[n]{1 + x + x^2 + \ldots}$.which will be displayed asHere's some inline maths: [latex: m.formula]."
},

{
    "location": "man/latex.html#Display-equations-1",
    "title": "Display equations",
    "text": "Use the same single $ characters to wrap the equation, but also add a newline above and below it, i.e.Here's an equation:\nn\nn$\frac{n!}{k!(n - k)!} = \binom{n}{k}$\nn\nnThis is the binomial coefficient.which will be displayed asHere's an equation:[latex: m.formula]This is the binomial coefficient."
},

{
    "location": "man/latex.html#Escaping-characters-in-docstrings-1",
    "title": "Escaping characters in docstrings",
    "text": "Since some characters used in [latex: m.formula] syntax are treated differently in docstrings they need to be escaped using a \ character as in the following example:\"\"\"\nnHere's some inline maths: \$\\sqrt[n]{1 + x + x^2 + \\ldots}\$.\nn\nnHere's an equation:\nn\nn\$\\frac{n!}{k!(n - k)!} = \\binom{n}{k}\$\nn\nnThis is the binomial coefficient.\nn\"\"\"\nnfunc(x) = # ...To avoid needing to escape the special characters the doc\"\" string macro can be used:doc\"\"\"\nnHere's some inline maths: $\sqrt[n]{1 + x + x^2 + \ldots}$.\nn\nnHere's an equation:\nn\nn$\frac{n!}{k!(n - k)!} = \binom{n}{k}$\nn\nnThis is the binomial coefficient.\nn\"\"\"\nnfunc(x) = # ..."
},

{
    "location": "man/latex.html#Julia-0.5-1",
    "title": "Julia 0.5",
    "text": "The syntax from above, using $s, will still work in 0.5, but it is recommended, if possible, to use the following double backtick syntax instead since it avoids overloading the meaning of the $ character within docstrings."
},

{
    "location": "man/latex.html#Inline-equations-2",
    "title": "Inline equations",
    "text": "Here's some inline maths: ``\sqrt[n]{1 + x + x^2 + \ldots}``.which will be displayed asHere's some inline maths: [latex: m.formula]."
},

{
    "location": "man/latex.html#Display-equations-2",
    "title": "Display equations",
    "text": "Here's an equation:\nn\nn```math\nn\frac{n!}{k!(n - k)!} = \binom{n}{k}\nn```\nn\nnThis is the binomial coefficient.which will be displayed asHere's an equation:[latex: m.formula]This is the binomial coefficient."
},

{
    "location": "man/latex.html#Escaping-characters-in-docstrings-2",
    "title": "Escaping characters in docstrings",
    "text": "In the same way as in Julia 0.4 \ characters in docstrings must be escaped using a \."
},

{
    "location": "man/internals.html",
    "title": "Package Internals",
    "text": ""
},

{
    "location": "lib/public.html",
    "title": "Public Documentation",
    "text": ""
},

{
    "location": "lib/public.html#Public-Documentation-1",
    "title": "Public Documentation",
    "text": "Documentation for Documenter.jl's public interface.See Internal Documentation for internal package docs covering all submodules."
},

{
    "location": "lib/public.html#Contents-1",
    "title": "Contents",
    "text": "Pages = [\"public.md\"]"
},

{
    "location": "lib/public.html#Index-1",
    "title": "Index",
    "text": "Pages = [\"public.md\"]"
},

{
    "location": "lib/internals.html",
    "title": "Internal Documentation",
    "text": "CurrentModule = Documenter"
},

{
    "location": "lib/internals.html#Internal-Documentation-1",
    "title": "Internal Documentation",
    "text": ""
},

{
    "location": "lib/internals.html#Contents-1",
    "title": "Contents",
    "text": "Pages = [\"internals.md\"]"
},

{
    "location": "lib/internals.html#Index-1",
    "title": "Index",
    "text": "Pages = [\"internals.md\"]"
},

{
    "location": "lib/internals.html#Anchors-1",
    "title": "Anchors",
    "text": "Anchors\nnAnchors.Anchor\nnAnchors.AnchorMap\nnAnchors.add!\nnAnchors.anchor\nnAnchors.exists\nnAnchors.isunique"
},

{
    "location": "lib/internals.html#Builder-1",
    "title": "Builder",
    "text": "Builder\nnBuilder.DocumentPipeline\nnBuilder.SetupBuildDirectory\nnBuilder.RedirectOutputStreams\nnBuilder.ExpandTemplates\nnBuilder.CrossReferences\nnBuilder.CheckDocument\nnBuilder.RestoreOutputStreams\nnBuilder.Populate\nnBuilder.RenderDocument"
},

{
    "location": "lib/internals.html#CrossReferences-1",
    "title": "CrossReferences",
    "text": "CrossReferences\nnCrossReferences.crossref"
},

{
    "location": "lib/internals.html#DocChecks-1",
    "title": "DocChecks",
    "text": "DocChecks\nnDocChecks.missingdocs\nnDocChecks.doctest"
},

{
    "location": "lib/internals.html#DocSystem-1",
    "title": "DocSystem",
    "text": "DocSystem\nnDocSystem.getdocs\nnDocSystem.binding\nnDocSystem.docstr\nnDocSystem.multidoc\nnDocSystem.convertmeta"
},

{
    "location": "lib/internals.html#Documents-1",
    "title": "Documents",
    "text": "Documents\nnDocuments.Document\nnDocuments.Page\nnDocuments.User\nnDocuments.Internal\nnDocuments.Globals\nnDocuments.populate!"
},

{
    "location": "lib/internals.html#Expanders-1",
    "title": "Expanders",
    "text": "Expanders\nnExpanders.ExpanderPipeline\nnExpanders.TrackHeaders\nnExpanders.MetaBlocks\nnExpanders.DocsBlocks\nnExpanders.AutoDocsBlocks\nnExpanders.EvalBlocks\nnExpanders.IndexBlocks\nnExpanders.ContentsBlocks\nnExpanders.ExampleBlocks\nnExpanders.REPLBlocks\nnExpanders.docsnode_methodlist"
},

{
    "location": "lib/internals.html#Formats-1",
    "title": "Formats",
    "text": "Formats\nnFormats.Format\nnFormats.mimetype"
},

{
    "location": "lib/internals.html#Generator-1",
    "title": "Generator",
    "text": "Generator\nnGenerator.savefile\nnGenerator.make\nnGenerator.gitignore\nnGenerator.mkdocs\nnGenerator.index"
},

{
    "location": "lib/internals.html#Selectors-1",
    "title": "Selectors",
    "text": "Selectors\nnSelectors.AbstractSelector\nnSelectors.order\nnSelectors.matcher\nnSelectors.runner\nnSelectors.strict\nnSelectors.disable\nnSelectors.dispatch"
},

{
    "location": "lib/internals.html#Walkers-1",
    "title": "Walkers",
    "text": "Walkers\nnWalkers.walk"
},

{
    "location": "lib/internals.html#Writers-1",
    "title": "Writers",
    "text": "Writers\nnWriters.Writer\nnWriters.render\nnWriters.MarkdownWriter\nnWriters.MarkdownWriter.join_decl\nnWriters.MarkdownWriter.span\nnWriters.HTMLWriter\nnWriters.LaTeXWriter"
},

{
    "location": "lib/internals.html#Utilities-1",
    "title": "Utilities",
    "text": "Utilities\nnUtilities.currentdir\nnUtilities.assetsdir\nnUtilities.check_kwargs\nnUtilities.slugify\nnUtilities.parseblock\nnUtilities.log\nnUtilities.warn\nnUtilities.logging\nnUtilities.submodules\nnUtilities.filterdocs\nnUtilities.Object\nnUtilities.object\nnUtilities.docs\nnUtilities.doccat\nnUtilities.nodocs\nnUtilities.issubmodule"
},

{
    "location": "dynamic/code.html",
    "title": "Code examples",
    "text": ""
},

{
    "location": "dynamic/code.html#Code-examples-1",
    "title": "Code examples",
    "text": "Whee, showing off syntax highlighting."
},

{
    "location": "dynamic/code.html#Python-1",
    "title": "Python",
    "text": "def median(pool):\nn    '''Statistical median to demonstrate doctest.\nn    >>> median([2, 9, 9, 7, 9, 2, 4, 5, 8])\nn    7\nn    '''\nn    copy = sorted(pool)\nn    size = len(copy)\nn    if size % 2 == 1:\nn        return copy[(size - 1) / 2]\nn    else:\nn        return (copy[size/2 - 1] + copy[size/2]) / 2\nnif __name__ == '__main__':\nn    import doctest\nn    doctest.testmod()"
},

{
    "location": "dynamic/admonitions.html",
    "title": "Admonitions",
    "text": ""
},

{
    "location": "dynamic/styles.html",
    "title": "Demonstrating _styles_ of MD elements",
    "text": ""
},

{
    "location": "dynamic/styles.html#Demonstrating-_styles_-of-MD-elements-1",
    "title": "Demonstrating _styles_ of MD elements",
    "text": ""
},

{
    "location": "dynamic/styles.html#Headers-1",
    "title": "Headers",
    "text": "h1 and h2 ↑."
},

{
    "location": "dynamic/styles.html#Header-3-1",
    "title": "Header 3",
    "text": "This is h3."
},

{
    "location": "dynamic/styles.html#Header-4-1",
    "title": "Header 4",
    "text": "This is h4."
},

{
    "location": "dynamic/styles.html#Header-5-1",
    "title": "Header 5",
    "text": "This is h5."
},

{
    "location": "dynamic/styles.html#Header-6-1",
    "title": "Header 6",
    "text": "This is h6."
},

{
    "location": "dynamic/styles.html#Blocks-1",
    "title": "Blocks",
    "text": "This is a normal code block.\nnWith multiple lines."
},

{
    "location": "dynamic/styles.html#Tables-1",
    "title": "Tables",
    "text": "If you require... ... then use...\nnfeatures PyPlot, Plotly, GR\nnspeed GR\nninteractivity Plotly\nnbeauty Plotly, PGFPlots\nnREPL Plotting UnicodePlots\nn3D plots PyPlot, GR, Plotly\nna GUI Window GR, PyPlot, PlotlyJS\nna small footprint UnicodePlots, Plotly"
},

{
    "location": "dynamic/bugs.html",
    "title": "Some existing bugs",
    "text": ""
},

]}
