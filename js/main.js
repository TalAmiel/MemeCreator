
'use strict';

var gCurrImg = '';
var gKeywordCountMap;

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
            height: 40,
            align: 'right',
            color: 'black',
            isShadow: false,
            font: 'eurofbold',
        },
        {
            line: '',
            size: 20,
            height: 400,
            align: 'left',
            color: 'black',
            isShadow: false,
            font: 'Calibri',
        },

    ]
}

var canvas;
var ctx;

function init() {
    var flatened = flatten(gImgs);
    gKeywordCountMap = findModes(flatened);
    renderImgs(gImgs);
    renderKeyords();
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
function filterImgs(elWord) {
    var text = elWord.value? elWord.value:elWord.innerText;
    console.log ('text');
    //console.log('elWord', elWord.value);

    var shownImgs = gImgs.filter(function (img) {
        var isShowImg = img.keywords.some(function (keyword) {
            var res = true;
            var findIndex = (keyword.indexOf(text));
            if (findIndex === -1) res = false;
            return res;
        })
        return isShowImg
    })
    console.log('shownImgs', shownImgs);
    renderImgs(shownImgs);
}

function imgSelected(id) {
    gCurrImg = gImgs.find(function (img) {
        console.log('img', img.id);
        console.log('id', id);
        return img.id === id;
    })
    showMemePage();
    var elMemePage = document.querySelector('.meme-page');
    elMemePage.classList.add('show');
}
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
    return valueRepeatsMap;
}

function renderKeyords (gKeywordCount){
    var elKeywordsContainer = document.querySelector('.keywords-container');
    console.log('elKeywordsContainer', elKeywordsContainer);
    var strHtml = '';
    for (var key in gKeywordCountMap) {
        var fontSize = getFontSize (gKeywordCountMap[key]);
        console.log ('keyyyy' , key , 'gKeywordCount[key]' , gKeywordCountMap[key] );
        strHtml += '<a href="#" onclick="filterImgs(this)" style="font-size:'+fontSize+'px";>'+key+'</a>'
    }
    elKeywordsContainer.innerHTML = strHtml;
}

function getFontSize(num){
    return 20+6*num
}



function showMemePage() {
    //add class
    renderCanvas();
}


// function toggle_visibility(id) {
//     var e = document.getElementById(id);
//     if(e.style.border == '1px solid red';
//        e.style.display = 'none';
//     else
//        e.style.display = 'block';
//  }

function incHeight(id) {
    gMeme.txts[id].height -= 5;
    renderCanvas();
}

function decHeight(id) {
    gMeme.txts[id].height += 5;
    renderCanvas();
}

function changeText(evt, id) {
    gMeme.txts[id].line = evt.target.value;
    renderCanvas();
}

function changeFont(id, value) {
    gMeme.txts[id].font = value;
    renderCanvas();
}

//doesnt change color
function changeColor(evt, id) {
    gMeme.txts[id].color = evt.target.value;
    console.log('color 1', gMeme.txts[id].color);
    console.log('txt', gMeme.txts)
    renderCanvas();
}

function replaceMenuActive (elClickLink){
    console.log ('koko');
    var elLinks = document.querySelectorAll('.main-menu a');
    elLinks.forEach (function (elLink){
        console.log ('clicked' , elClickLink);
        console.log ('elLink' ,elLink);
        if (elLink === elClickLink) elLink.classList.add ('active');
        else elLink.classList.remove ('active'); 
    })
}

      

function changeAlign(align,id){
    var elAlignBtnLeft = document.querySelector('.align-left');
    var elAlignBtnCenter = document.querySelector('.align-center-box');
    var elAlignBtnRight = document.querySelector('.align-right');
    if (align === 'left') {
        elAlignBtnLeft.classList.add("clicked-btn-align");
        elAlignBtnCenter.classList.remove("clicked-btn-align");
        elAlignBtnRight.classList.remove("clicked-btn-align");
    }else if (align === 'right') {
        elAlignBtnRight.classList.add("clicked-btn-align");
        elAlignBtnCenter.classList.remove("clicked-btn-align");
        elAlignBtnLeft.classList.remove("clicked-btn-align");
    }else if (align === 'center') {
        elAlignBtnRight.classList.remove("clicked-btn-align");
        elAlignBtnCenter.classList.add("clicked-btn-align");
        elAlignBtnLeft.classList.remove("clicked-btn-align");
    }
    gMeme.txts[id].align = align;
    renderCanvas();
}
function increaseFont(id) {
    gMeme.txts[id].size += 2;
    renderCanvas();
}
function decreaseFont(id) {
    gMeme.txts[id].size -= 2;
    console.log('moshe');
    renderCanvas();
}

function textShadowToggle(id) {
    var elShadowBtn = document.querySelector('.text-shadow');
    console.log('show shdw btn',elShadowBtn);
    elShadowBtn.classList.toggle("clicked-btn-shadow");
    if (!gMeme.txts[id].isShadow) {
        gMeme.txts[id].isShadow = true
        
    } else {
        gMeme.txts[id].isShadow = false;
    } 
    renderCanvas();
}

function addLine() {
    var txt = {
        line: '',
        size: 20,
        height: 400,
        align: 'left',
        color: 'black',
        isShadow: false,
        font: 'Calibri',
    }
    gMeme.txts.push(txt);
    console.log ('gMeme.txts' , gMeme.txts);
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
    // ctx.font = 'italic 40pt Calibri';
    // console.log('gMeme.txts[0].line', gMeme.txts[id].line);
    // console.log('id ', id);
    renderLines();
}
function renderLines() {
    var txts = gMeme.txts;
    txts.forEach(function renderLine(txt) {
        ctx.font = txt.size + 'px ' + txt.font;
        // console.log ('ctx font', ctx.font);
        var align;
        ctx.shadowColor = "black";
        if (txt.align === 'left') align = -100;
        else if (txt.align === 'right') align = 100;
        else align = 0;
        console.log('align', align);
        (txt.isShadow) ? ctx.shadowBlur = 15 : ctx.shadowBlur = 0;
        ctx.fillStyle = txt.color;
        console.log('colorddddddd', txt.color);
        ctx.fillText(txt.line, canvas.width / 2 + align, txt.height);
        console.log('txt.line', txt.line);

    })

}


//download canvas
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});
// ctx.fillText(gMeme.txts[id].line,canvas.width / 2, 40);
//     ctx.fillText(gMeme.txts[id].line,canvas.width/2 , canvas.height-20);




// function deleteMemeText(idx) {
//     console.log ('koko');
//     var txts = gMeme.txts;

//     txts.splice(idx, 1);
//     console.log (txts);
//     renderCanvas();
// }

//TODO: create init




//flattens the object by keywords only







// function drawImage(imageObj) {
//     var x = 0;
//     var y = 0;
//     console.log('canvas',canvas.width);
//     ctx.drawImage(imageObj, 0, 0,canvas.width,canvas.height);
// }






