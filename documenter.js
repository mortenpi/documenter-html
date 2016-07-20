console.log("documenter.js loaded")

requirejs.config({
    //appDir: ".",
    //baseUrl: "js",
    paths: {
        'jquery': 'https://code.jquery.com/jquery-3.1.0.js?',
        'mathjax': 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML'
    },
    shim: {
        'mathjax' : {
            exports: "MathJax"
        }
    }
});

// Load MathJax
require(['mathjax'], function(MathJax) {
    console.log("MathJax loaded.")
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


var currentScript = document.currentScript;

function setSearchIndex(index) {
    console.log("setSearchIndex called.")
    console.log(index)
}

require(["jquery", "lunr"], function($,lunr) {
    console.log("lunr loaded.")

    //data = $.getJSON((require.toUrl("search-index.json")))
    //console.log(data)

    console.log("Building lunr index...")
    var index = lunr(function () {
        this.ref('location')
        this.field('title', {boost: 10})
        this.field('text')
    })
    var store = {}

    documenterSearchIndex['docs'].forEach(function(e) {
        console.log("Indexing: " + e.location)
        index.add(e)
        store[e.location] = e
    })

    console.log("setting up jQuery.")
    $(function(){
        console.log("documenter.js: prepend")
        $('body').append('<article id="search"> </div>')
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
            query = $('nav.toc input').val()
            results = index.search(query)
            $('#search-meta').text("Number of results: " + results.length)
            $('#search-results').empty()
            results.forEach(function(result) {
                data = store[result.ref]
                link = $('<a>')
                link.text(data.title)
                link.attr('href', documenterBaseURL+'/'+result.ref)
                dgb = $('<span class="score debug">'+result.score+'</span>')
                li = $('<li>').append(link).append(dgb)
                $('#search-results').append(li)
            })
        }

        $('nav.toc input').keyup(update_search)
        $('nav.toc input').change(update_search)
    })
})
