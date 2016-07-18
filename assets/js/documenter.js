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

    documenterSearchIndex['docs'].forEach(function(e) {
        console.log("Indexing: " + e.title)
        index.add(e)
    })

    console.log("setting up jQuery.")
    $(function(){
        console.log("documenter.js: prepend")
        $('article').prepend('<div id="dynamic"> </div>')
        $('#dynamic').css('border', '1px dashed')
    })

    $('nav.toc input').change(function(){
        query = $('nav.toc input').val()
        results = index.search(query)
        $('#dynamic').empty()
        $('#dynamic').append($('<p>').text("Number of results: " + results.length))
        results.forEach(function(result) {
            link = $('<a>')
            link.text(result.ref + " (" + result.score + ")")
            link.attr("href", result.ref)
            $('#dynamic').append($('<p>').html(link))
        })
    })
})
