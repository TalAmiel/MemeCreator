
'use strict';

var gCurrImg = '';
var gKeywordCount;

var gImgs = [{
    id: 1,
    url: 'img/meme1.jpg',
    keywords: ['happy', 'koko']
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

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: '',
            size: 20,
            height:40,
            align: 'right',
            color: 'black'
        },
        {
            line: '',
            size: 20,
            height: 400,
            align: 'left',
            color: 'black'
        },

    ]
}

console.log('txts', gMeme.txts[0].line);
//for canvas 
var canvas;
var ctx;
// This is the same as <body onload="">
function init() {
    var flatened = flatten(gImgs);
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

function changeText(evt, id) {
    gMeme.txts[id].line = evt.target.value;
    renderCanvas();
}
function changeColor(evt,id){
    gMeme.txts[id].color = evt.target.value;
    console.log ('color 1' ,gMeme.txts[id].color );
    console.log ('txt' ,gMeme.txts)
    renderCanvas();
}

function changeAlign(align,id){
    console.log ('koko');
    gMeme.txts[id].align = align;
    renderCanvas();
}
function increaseFont (id){
    gMeme.txts[id].size += 2;
    renderCanvas();

}
function decreaseFont (id){
    gMeme.txts[id].size -= 2;
    console.log ('moshe');
    renderCanvas();
}


function renderCanvas() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    var imageObj = new Image();
    imageObj.src = gCurrImg.url;
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
    renderMeme();
}

function renderMeme() {
    ctx.font = 'italic 40pt Calibri';
    // console.log('gMeme.txts[0].line', gMeme.txts[id].line);
    // console.log('id ', id);
    renderLines();
}
function renderLines(){
    var txts = gMeme.txts;
    txts.forEach (function renderLine(txt){
        ctx.font = txt.size+'px Calibri';
        // console.log ('ctx font', ctx.font);
        var align;
        if (txt.align === 'left') align = -100;
        else if (txt.align === 'right') align = 100;
        else align=0;
        console.log ('align' , align);
        ctx.fillStyle =  txt.color;
        console.log ('colorddddddd' , txt.color);
        ctx.fillText(txt.line,canvas.width / 2 +align, txt.height);
        console.log ('txt.line' , txt.line);
        
    })
}



// ctx.fillText(gMeme.txts[id].line,canvas.width / 2, 40);
//     ctx.fillText(gMeme.txts[id].line,canvas.width/2 , canvas.height-20);


function filterImgs(elWord) {
    var inputText = elWord.value;
    console.log('elWord', elWord.value);
    var shownImgs = gImgs.filter(function (img) {
        var isShowImg = img.keywords.some(function (keyword) {
            var res = true;
            var findIndex = (keyword.indexOf(inputText));
            if (findIndex === -1) res = false;
            return res;
        })
        return isShowImg
    })
    console.log('shownImgs', shownImgs);
    renderImgs(shownImgs);
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

function updateMeme() {

}

function showMemePage() {
    //add class
    renderCanvas();
}


// function deleteMemeText(idx) {
//     console.log ('koko');
//     var txts = gMeme.txts;
    
//     txts.splice(idx, 1);
//     console.log (txts);
//     renderCanvas();
// }

//TODO: create init
var flatened = flatten(gImgs);
findModes(flatened);


//flattens the object by keywords only
function flatten(values) {
    var valuesMap = values.reduce(function (acc, value) {
        return acc.concat(value.keywords);
    }, []);
    return valuesMap;
}

//find modes by key and value
function findModes(values) {
    var valueRepeatsMap = values.reduce(function (acc, value) {
        if (!acc[value]) acc[value] = 1;
        else acc[value]++;
        return acc;
    }, {})

    var max = -Infinity;
    for (var key in valueRepeatsMap) {
        if (valueRepeatsMap[key] > max) {
            max = valueRepeatsMap[key];
        }
    }
    var modes = []
    for (var key in valueRepeatsMap) {
        if (valueRepeatsMap[key] === max) {
            modes.push(+key);
        }
    }
    gKeywordCount = valueRepeatsMap;
}
console.log('gKeywordCount', gKeywordCount);






// function drawImage(imageObj) {
//     var x = 0;
//     var y = 0;
//     console.log('canvas',canvas.width);
//     ctx.drawImage(imageObj, 0, 0,canvas.width,canvas.height);
// }






