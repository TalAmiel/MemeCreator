
'use strict';
console.log('koko');


var gCurrImg = '';


var gImgs = [{
    id: 1,
    url: 'img/meme1.jpg',
    keywords: ['happy']
},
{
    id: 2,
    url: 'img/meme2.jpg',
    keywords: ['happy']
},
{
    id: 3,
    url: 'img/meme3.jpg',
    keywords: ['happy']
},
{
    id: 4,
    url: 'img/meme4.jpg',
    keywords: ['happy']
},
{
    id: 5,
    url: 'img/meme3.jpg',
    keywords: ['happy']
},
{
    id: 6,
    url: 'img/meme4.jpg',
    keywords: ['happy']
}
]
console.log('gImgs', gImgs);

//for canvas 
var canvas;
var ctx;
// This is the same as <body onload="">


renderImgs();




function renderKeywords() {
}

function renderImgs() {
    var elImgsContainer = document.querySelector('.imgs-container');
    console.log('imgcon', elImgsContainer);
    var strHtml = '';
    console.log('gimgs2', gImgs);
    gImgs.forEach(function (img) {
        strHtml += '<div onclick="imgSelected(' + img.id + ')" ><img src="' + img.url + '"></div>'
        console.log('img.url', img['url']);
        // strHtml += '<div style="background: url(/img/meme1.jpg);
    })
    console.log('strHtml', strHtml);
    console.log('elImgsContainer', elImgsContainer);
    elImgsContainer.innerHTML = strHtml;
    console.log('elImgsContainer2', elImgsContainer);

}

function imgSelected(id) {
    var elMain = document.querySelector('main');
    elMain.classList.add('hide');
    console.log(elMain);
    gCurrImg = gImgs.find(function (img) {
        console.log('img', img.id);
        console.log('id', id);
        return img.id === id;
    })
    showMemePage();
}

function updateMeme(this){
    //update things
    renderCanvas();
}

function showMemePage() {
    //add class
    renderCanvas();
}
function renderCanvas(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
        drawImage(this);
    };
    imageObj.src = gCurrImg.url;
}

function drawImage(imageObj) {
    var x = 0;
    var y = 0;
    console.log('canvas',canvas.width);
    ctx.drawImage(imageObj, 0, 0,canvas.width,canvas.height);
}

    




