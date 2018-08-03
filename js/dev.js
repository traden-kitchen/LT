'use strict';

require('../lib/js/jquery-3.3.1.min')();
require('../lib/js/head.min')();
const WebFont = require('../lib/js/webfont');

$('head').append($(`<link rel="stylesheet" type="text/css" href="${window.location.search.match( /print-pdf/gi ) ? 'css/print/pdf.css' : 'css/print/paper.css'}">`));

let logoLeft = 0;
$('.logo').each(function(){
  $(this).attr('style', `width: ${Math.floor(12+Math.random()*9)}%;left:${logoLeft+Math.floor(Math.random()*11)}%;`);
  $(this).css('animation-delay', `-${Math.floor(Math.random()*61)}s`);
  logoLeft+=20;
});

const fonts = ['851H-kktt_004', 'GLT-GonunneObsolete', 'GenEiAntique_v4', 'fontopoSunnyDay-Regular', 'PixelMplus10-Regular', 'PixelMplus12-Regular', 'nicokaku_v1'];
for(let font of fonts) $('#fontStatus').append(`<tr><td>${font}</td><td>in preparation</td></tr>`);
$('#fontStatus > tr').eq($('#fontStatus > tr').length-1).children('td').css('border-bottom', '0px');

const displayFontState = (font_family, msg) => { $('#fontStatus > tr').eq(fonts.indexOf(font_family)).children('td').eq(1).text(msg); };

WebFont.load({
  custom: { families: fonts, urls: ['css/main.css'] },
  fontloading: (font_family) => { displayFontState(font_family, 'Loading...') },
  fontactive: (font_family) => {
    displayFontState(font_family, 'Available!');
    $('#fontStatus > tr').eq(fonts.indexOf(font_family)).children('td').eq(1).css('font-family', `'${font_family}'`);
  },
  fontinactive: (font_family) => { displayFontState(font_family, 'Failed! please reload.'); }
});

Reveal.initialize({
  history: true,
  dependencies: [
    { src: 'plugin/markdown/marked.js' },
    { src: 'plugin/markdown/markdown.js' },
    { src: 'plugin/notes/notes.js', async: true },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
  ]
});
