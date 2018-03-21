
'use strict';
console.log('koko');


var gCurrImg = '';


var gImgs = [{
    id: 1,
    url: 'img/meme1.jpg',
    keywords: ['happy' ,'koko']
},
{
    id: 2,
    url: 'img/meme2.jpg',
    keywords: ['happy', 'momo']
},
{
    id: 3,
    url: 'img/meme3.jpg',
    keywords: ['happy']
},
{
    id: 4,
    url: 'img/meme4.jpg',
    keywords: ['sad']
},
{
    id: 5,
    url: 'img/meme3.jpg',
    keywords: ['sad']
},
{
    id: 6,
    url: 'img/meme4.jpg',
    keywords: ['sad']
}
]
console.log('gImgs', gImgs);

var gMeme ={
    selectedImgId: 5,
    txts:[
        {
            line:'yoyo',
            size: 20 ,
            align:'left',
            color: 'red'
        }
    ]
}

console.log ('txts' , gMeme.txts[0].line);
//for canvas 
var canvas;
var ctx;
// This is the same as <body onload="">
function init (){
renderImgs(gImgs);
}

function renderKeywords() {
}

function renderImgs(imgs) {
       
    var elImgsContainer = document.querySelector('.imgs-container');
    console.log('imgcon', elImgsContainer);
    var strHtml = '';
    console.log('gimgs2', imgs);
    imgs.forEach(function (img) {
        strHtml += '<div onclick="imgSelected(' + img.id + ')" ><img src="' + img.url + '"></div>'
        console.log('img.url', img['url']);
        // strHtml += '<div style="background: url(/img/meme1.jpg);
    })
    console.log('strHtml', strHtml);
    console.log('elImgsContainer', elImgsContainer);
    elImgsContainer.innerHTML = strHtml;
    console.log('elImgsContainer2', elImgsContainer);

}

function filterImgs(elWord){
    var inputText = elWord.value;
    console.log ('elWord' ,elWord.value);
     var shownImgs = gImgs.filter (function(img){
       var isShowImg= img.keywords.some (function(keyword){
            var res=true;
            var findIndex = (keyword.indexOf(inputText));
            if  (findIndex === -1) res= false;
            return res;
        })
        return isShowImg
     })
     console.log ('shownImgs' , shownImgs);
     renderImgs (shownImgs);
}

function imgSelected(id) {
    // var elMain = document.querySelector('main');
    // elMain.classList.add('hide');
   
    // console.log(elMain);
    gCurrImg = gImgs.find(function (img) {
        console.log('img', img.id);
        console.log('id', id);
        return img.id === id;
    })
    showMemePage();
    var elMemePage = document.querySelector('.meme-page');
    elMemePage.classList.add('show');
}

function updateMeme(){
    
}

function showMemePage() {
    //add class
    renderCanvas();
}
function renderCanvas(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    
    var imageObj = new Image();
    imageObj.src = gCurrImg.url;
        ctx.drawImage(imageObj, 0, 0,canvas.width,canvas.height);
        ctx.font = 'italic 40pt Calibri';
      ctx.fillText('hello',canvas.width / 2, 70);
    //   debugger;
    //   var dataURL = canvas.toDataURL();
    //   document.getElementById('canvasImg').src = dataURL;     
}

function deleteMemeText(idx){
    var txts = gMeme.txts;
    txts.splice(idx,1);
}




// function drawImage(imageObj) {
//     var x = 0;
//     var y = 0;
//     console.log('canvas',canvas.width);
//     ctx.drawImage(imageObj, 0, 0,canvas.width,canvas.height);
// }

    




