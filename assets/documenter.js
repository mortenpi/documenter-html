console.log("documenter.js loaded")

requirejs.config({
    paths: {
        'jquery': 'https://code.jquery.com/jquery-3.1.0.js?',
        'jqueryui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min',
        'mathjax': 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML',
        'highlight': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min',
        'highlight-julia': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/languages/julia.min',
        'lunr': 'https://cdnjs.cloudflare.com/ajax/libs/lunr.js/0.7.1/lunr.min'
    },
    shim: {
        'mathjax' : {
            exports: "MathJax"
        },
        'highlight-julia': ['highlight']
    }
});

// Load MathJax
require(['mathjax'], function(MathJax) {
    console.debug("MathJax loaded.")
    MathJax.Hub.Config({
      "tex2jax": {
        inlineMath: [['$','$'], ['\\(','\\)']],
        processEscapes: true
      }
    });
    MathJax.Hub.Config({
      config: ["MMLorHTML.js"],
      jax: [
        "input/TeX",
        "output/HTML-CSS",
        "output/NativeMML"
      ],
      extensions: [
        "MathMenu.js",
        "MathZoom.js",
        "TeX/AMSmath.js",
        "TeX/AMSsymbols.js",
        "TeX/autobold.js",
        "TeX/autoload-all.js"
      ]
    });
    MathJax.Hub.Config({
      TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
})

require(['jquery', 'highlight', 'highlight-julia'], function($, hljs) {
    console.debug("hljs loaded.")
    $(document).ready(function() {
        console.debug("DOM ready, initializing hljs.")
        hljs.initHighlighting();
    })

})

var currentScript = document.currentScript;

require(["jquery", "lunr"], function($,lunr) {
    console.debug("lunr loaded.")

    var index = lunr(function () {
        this.ref('location')
        this.field('title', {boost: 10})
        this.field('text')
    })
    var store = {}

    documenterSearchIndex['docs'].forEach(function(e) {
        index.add(e)
        store[e.location] = e
    })

    $(function(){
        $('body').append('<article id="search" class="overlay"> </div>')
        $('#search').append('<span id="search-close"></span>')
        $('#search').append('<h1 id="search-title">Search</h1>')
        $('#search').append('<p id="search-meta"></p>')
        $('#search').append('<ul id="search-results"></ul>')

        $('#search-close').click(function() {
            $('#search').hide()
            $('body').css('overflow', 'auto')
        })

        function update_search() {
            $('body').css('overflow', 'hidden')
            $('#search').show()
            query = $('#search-query').val()
            results = index.search(query)
            $('#search-meta').text("Number of results: " + results.length)
            $('#search-results').empty()
            results.forEach(function(result) {
                data = store[result.ref]
                link = $('<a>')
                link.text(data.title)
                link.attr('href', documenterBaseURL+'/'+result.ref)
                cat = $('<span class="category">('+data.category+')</span>')
                li = $('<li>').append(link).append(cat)
                $('#search-results').append(li)
            })
        }

        $('#search-query').keyup(update_search)
        $('#search-query').change(update_search)
    })
})
