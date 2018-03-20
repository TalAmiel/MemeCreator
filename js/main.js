
'use strict';


var gImgs = [{
    id: 1,
    url: 'img/meme1.jpg',
    keywords: ['happy']
},
{
    id: 2,
    url: 'img/meme2.jpg',
    keywords: ['happy']
}
]

// This is the same as <body onload="">



function init() {
    renderImgs();
}



function renderKeywords() {
}

function renderImages(gImgs) {
    var elImgsContainer = document.querySelector('.imgs-container');
    var strHtml = '';
    gImgs.forEach(function (img) {
        strHtml += `
                <div><img src="${'gImgs.url'}" </div>
        `
    })
    elTBody.html(strHtml);
}

