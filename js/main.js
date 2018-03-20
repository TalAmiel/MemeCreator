
'use strict';
console.log ('koko');


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
console.log ('gImgs' , gImgs);

// This is the same as <body onload="">


renderImgs();




function renderKeywords() {
}

function renderImgs() {
    var elImgsContainer = document.querySelector('.imgs-container');
    console.log ('imgcon' , elImgsContainer );
    var strHtml = '';
    console.log ('gimgs2' ,gImgs);
    gImgs.forEach(function (img) {
        strHtml += '<div ><img src="'+img.url+'"></div>'
        console.log ('img.url' , img['url']);
    })
    console.log ('strHtml' , strHtml);
    console.log ('elImgsContainer', elImgsContainer);
    elImgsContainer.innerHTML= strHtml;
    console.log ('elImgsContainer2', elImgsContainer);
}

