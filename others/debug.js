console.log("debug.js loaded")

var logging = true

requirejs.config({
    paths: {
        'jquery': 'https://code.jquery.com/jquery-3.1.0.js?',
        'jqueryui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min',
    }
});

// debugging matters
require(["jquery", "jqueryui"], function($) {
    console.log("Debug matters..")
    $('head').append($('<link rel="stylesheet">').attr('href', documenterBaseURL + "/assets/debug.css"))

    $("body").append("<div id='options'><div id='options-title'>Options</div><ul id='options-list'></ul></div>")
    $("#options-title").click(function() {
        $("#options-list").toggle()
    })

    // page width
    $("#options-list").append("<li>Page <code>max-width</code>: <span id='options-page-width' class='value'>48em</span><div id='options-page-width-slider'></div></li>")
    $("#options-page-width-slider").slider({
        min: 20, max: 60, value: 48,
        slide: function( event, ui ) {
            $("body > article").css("max-width", ui.value + "em")
            $("#options-page-width").text(ui.value + "em")
        }
    })

    // search box
    $("#options-list").append("<li><input id='options-search' type='checkbox' checked>Rounded search box?</input></li>")
    $("#options-search").change(function() {
        if($('#options-search').prop('checked')) {
            $('#search-query').css('border-radius', '')
        } else {
            $('#search-query').css('border-radius', '3px')
        }
    })

    // admonition borders
    $("#options-list").append("<li><input id='options-admonition' type='checkbox' checked>Rounded admonitions?</input></li>")
    $("#options-admonition").change(function() {
        if($('#options-admonition').prop('checked')) {
            $('.admonition').css('border-radius', '')
            $('.admonition-title').css('border-radius', '')
        } else {
            $('.admonition').css('border-radius', '0')
            $('.admonition-title').css('border-radius', '0')
        }
    })

    // general sans-serif fonts
    $("#options-list").append("<li>Sans-serif: <select id='options-fonts'><option /></select></li>")
    $("#options-fonts").append("<option>Arial</option>")
    $("#options-fonts").append("<option>Lato</option>")
    $("#options-fonts").append("<option>Merriweather Sans</option>")
    $("#options-fonts").append("<option>Open Sans</option>")
    $("#options-fonts").append("<option>Ubuntu</option>")
    $("#options-fonts").change(function(event) {
        $('body, input').css('font-family', $('#options-fonts').val())
    })

    $("#options-list").append("<li>Font weight: <select id='options-font-weight'><option /></select></li>")
    $("#options-font-weight").append("<option>lighter</option>")
    $("#options-font-weight").append("<option>normal</option>")
    $("#options-font-weight").append("<option>bold</option>")
    $("#options-font-weight").append("<option>bolder</option>")
    $("#options-font-weight").change(function(event) {
        $('body, input').css('font-weight', $('#options-font-weight').val())
    })

    // monospace fonts
    $("#options-list").append("<li>Monospace fonts: <select id='options-fonts-monospace'><option /></select></li>")
    $("#options-fonts-monospace").append("<option>Courier New</option>")
    $("#options-fonts-monospace").append("<option>Ubuntu Mono</option>")
    $("#options-fonts-monospace").append("<option>Fantasque Sans Mono</option>")
    $("#options-fonts-monospace").append("<option>DejaVu Sans Mono</option>")
    $("#options-fonts-monospace").append("<option>Source Code Pro</option>")
    $("#options-fonts-monospace").change(function(event) {
        $('code').css('font-family', $('#options-fonts-monospace').val())
    })

    // text body fonts
    $("#options-list").append("<li>Text body font: <select id='options-fonts-body'><option /></select></li>")
    $("#options-fonts-body").append("<option>Arial</option>")
    $("#options-fonts-body").append("<option>Georgia</option>")
    $("#options-fonts-body").append("<option>Times</option>")
    $("#options-fonts-body").append("<option>Merriweather</option>")
    $("#options-fonts-body").append("<option>Merriweather Sans</option>")
    $("#options-fonts-body").append("<option>Lato</option>")
    $("#options-fonts-body").append("<option>Open Sans</option>")
    $("#options-fonts-body").append("<option>Ubuntu</option>")
    $("#options-fonts-body").change(function(event) {
        $('body > article').css('font-family', $('#options-fonts-body').val())
    })

    // font color
    $("#options-list").append("<li>Text body color: <select id='options-font-color'><option /></select></li>")
    $("#options-font-color").append("<option>black</option>")
    $("#options-font-color").append("<option>#111</option>")
    $("#options-font-color").append("<option>#222</option>")
    $("#options-font-color").append("<option>#333</option>")
    $("#options-font-color").append("<option>orange</option>")
    $("#options-font-color").change(function(event) {
        $('body').css('color', $('#options-font-color').val())
    })
})
