console.log("documenter.js loaded")
//require("lunr")

$(function(){
    console.log("documenter.js: prepend")
    $('article').prepend('<div id="dynamic"> </div>')
    $('#dynamic').css('border', '1px dashed')
})

$('nav.toc input').change(function(){
    $('#dynamic').append($('<p>').text($('nav.toc input').val()))
})
