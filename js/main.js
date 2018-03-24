
'use strict';

var WIDTH_CANVAS = 500;
var HEIGHT_CANVAS = 420;
var dragOK = false;
var canvas;
var ctx;


var gcurrTextDragIdx;
var gCurrImg = {};
var gKeywordCountMap;
var textLength;
var gImgs = [{
    id: 1,
    url: 'img/meme1.jpg',
    keywords: ['matrix', 'funny']
},
{
    id: 2,
    url: 'img/meme2.jpg',
    keywords: ['angry', 'funny']
},
{
    id: 3,
    url: 'img/meme3.jpg',
    keywords: ['angry']
},
{
    id: 4,
    url: 'img/meme4.jpg',
    keywords: ['creepy']
},
{
    id: 5,
    url: 'img/meme5.jpg',
    keywords: ['sad', 'toys']
},
{
    id: 6,
    url: 'img/meme6.jpg',
    keywords: ['confused']
},
{
    id: 7,
    url: 'img/meme7.jpg',
    keywords: ['ridiclous']
},
{
    id: 8,
    url: 'img/meme8.jpg',
    keywords: ['cartoon']
},
{
    id: 9,
    url: 'img/meme9.jpg',
    keywords: ['cartoon', 'angry', 'spiderman']
},
{
    id: 10,
    url: 'img/meme10.jpg',
    keywords: ['happy']
}
]

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: '',
            size: 60,
            width: 210,
            height: 50,
            align: 'center',
            color: 'black',
            x: 210,
            y: 50,
            isShadow: false,
            font: 'eurofbold',
        },
        {
            line: '',
            size: 60,
            height: 400,
            width: 210,
            align: 'center',
            color: 'black',
            x: 210,
            y: 400,
            isShadow: false,
            font: 'Calibri',
        },

    ]
}


function init() {
    initCanvas();
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;
    var flatened = flatten(gImgs);
    gKeywordCountMap = findModes(flatened);
    renderImgs(gImgs);
    renderKeyords();
}
//##################################################3
// ######for dragging txts on the canvas######


function renderCanvas() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.src = gCurrImg.url;
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
    renderLines();
}

function renderLines() {
    var txts = gMeme.txts;
    txts.forEach(function renderLine(txt) {
        ctx.font = txt.size + 'px ' + txt.font;
        var align;
        ctx.shadowColor = "black";
        (txt.isShadow) ? ctx.shadowBlur = 15 : ctx.shadowBlur = 0;
        ctx.fillStyle = txt.color;
        textLength = (txt.line.length * txt.size) / 2;
        ctx.fillText(txt.line, txt.x, txt.y);
    })

}





function clear() {
    ctx.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
}

function initCanvas() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext('2d');
    console.log('toto');
    return setInterval(draw, 10);
}

function draw() {

    clear();

    //  ctx.fillStyle = "#FAF7F8";
    //  ctx.fillStyle = "#444444";
    var imageObj = new Image();
    imageObj.src = gCurrImg.url;
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

    renderLines();
    // ctx.fillText("Hey there im a movin!!", x, y);

}

function myMove(e) {
    if (dragOK) {
        var txts = gMeme.txts;
        txts[gcurrTextDragIdx].x = e.pageX - canvas.offsetLeft;
        txts[gcurrTextDragIdx].y = e.pageY - canvas.offsetTop;
    }
}

function myDown(e) {
    var txts = gMeme.txts;
    for (var i = 0; i < txts.length; i++) {
        var txt = txts[i];
        var textLength = (txt.line.length * txt.size) / 2;
        //check if the mouse is on the word
        if (e.pageX + 20 < txt.x + textLength + canvas.offsetLeft && e.pageX + 20 > txt.x - textLength + canvas.offsetLeft && e.pageY + 20 < txt.y + 15 + canvas.offsetTop &&
            e.pageY + 20 > txt.y - 15 + canvas.offsetTop) {

            gcurrTextDragIdx = i;
            dragOK = true;
            canvas.onmousemove = myMove;
            break;
        }
    }
}

function myUp() {
    console.log('myup');
    dragOK = false;
    canvas.onmousemove = null;
}

// ###############################################################


function renderImgs(imgs) {

    var elImgsContainer = document.querySelector('.imgs-container');
    console.log('imgcon', elImgsContainer);
    var strHtml = '';
    console.log('gimgs2', imgs);
    imgs.forEach(function (img) {
        strHtml += '<div onclick="imgSelected(' + img.id + ')" ><a href="#meme-page-id"><img src="' + img.url + '"></a></div>'
        console.log('img.url', img['url']);
        // strHtml += '<div style="background: url(/img/meme1.jpg);
    })
    console.log('strHtml', strHtml);
    console.log('elImgsContainer', elImgsContainer);
    elImgsContainer.innerHTML = strHtml;
    console.log('elImgsContainer2', elImgsContainer);
}

function filterImgs(elWord) {
    var text = elWord.value ? elWord.value : elWord.innerText;
    console.log('text');
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

function renderKeyords(gKeywordCount) {
    var elKeywordsContainer = document.querySelector('.keywords-container');
    console.log('elKeywordsContainer', elKeywordsContainer);
    var strHtml = '';
    for (var key in gKeywordCountMap) {
        var fontSize = getFontSize(gKeywordCountMap[key]);
        console.log('keyyyy', key, 'gKeywordCount[key]', gKeywordCountMap[key]);
        strHtml += '<a href="#" onclick="filterImgs(this)" style="font-size:' + fontSize + 'px";>' + key + '</a>'
    }
    elKeywordsContainer.innerHTML = strHtml;
}

function getFontSize(num) {
    return 20 + 20 * num
}


function incHeight(id) {
    gMeme.txts[id].y -= 5;
}

function decHeight(id) {
    gMeme.txts[id].y += 5;
}

function changeText(evt, id) {
    gMeme.txts[id].line = evt.target.value;
}

function changeFont(id, value) {
    gMeme.txts[id].font = value;
}

function changeColor(evt, id) {
    gMeme.txts[id].color = evt.target.value;
    console.log('color 1', gMeme.txts[id].color);
    console.log('txt', gMeme.txts)
}

function replaceMenuActive(elClickLink) {
    console.log('koko');
    var elLinks = document.querySelectorAll('.main-menu a');
    elLinks.forEach(function (elLink) {
        console.log('clicked', elClickLink);
        console.log('elLink', elLink);
        if (elLink === elClickLink) elLink.classList.add('active');
        else elLink.classList.remove('active');
    })
}
function takeImageAddress() {
    var elImageAddress = document.querySelector('#imageAddress');
    console.log('url', elImageAddress.value);
    addImgUrl(elImageAddress.value);
}

function addImgUrl(url) {
    var newObj =
        {
            url: url,
            keywords: []
        }
    newObj.id = getNewID();
    gImgs.push(newObj);
    console.log('gImgs', gImgs);
    renderImgs(gImgs);
    imgSelected(newObj.id)
}

function getNewID() {
    var max = 0;
    gImgs.forEach(function (img) {
        if (img.id > max) max = img.id;
    })
    return max + 1;
}

function changeAlign(align, id) {
    var elAlignBtnLeft = document.querySelector('.align-left');
    var elAlignBtnCenter = document.querySelector('.align-center-box');
    var elAlignBtnRight = document.querySelector('.align-right');
    if (align === 'left') {
        elAlignBtnLeft.classList.add("clicked-btn-align");
        elAlignBtnCenter.classList.remove("clicked-btn-align");
        elAlignBtnRight.classList.remove("clicked-btn-align");
    } else if (align === 'right') {
        elAlignBtnRight.classList.add("clicked-btn-align");
        elAlignBtnCenter.classList.remove("clicked-btn-align");
        elAlignBtnLeft.classList.remove("clicked-btn-align");
    } else if (align === 'center') {
        elAlignBtnRight.classList.remove("clicked-btn-align");
        elAlignBtnCenter.classList.add("clicked-btn-align");
        elAlignBtnLeft.classList.remove("clicked-btn-align");
    }
    gMeme.txts[id].align = align;
    console.log(gMeme.txts[id].align);
    // since we do iteration on render canvas  we do not need the rendercanvas
    // after each change 

    // renderCanvas();
}
function increaseFont(id) {
    gMeme.txts[id].size += 2;

}
function decreaseFont(id) {
    gMeme.txts[id].size -= 2;
    // since we do iteration on render canvas  we do not need the rendercanvas
    // after each change 

    // renderCanvas();
}

function textShadowToggle(elShadowBtn, id) {
    console.log('show shdw btn', elShadowBtn);
    elShadowBtn.classList.toggle("clicked-btn-shadow");
    if (!gMeme.txts[id].isShadow) {
        gMeme.txts[id].isShadow = true

    } else {
        gMeme.txts[id].isShadow = false;
    }
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
    console.log('gMeme.txts', gMeme.txts);
}


//old renderlines before we use drag method
// function renderLines() {
//     var txts = gMeme.txts;
//     txts.forEach(function renderLine(txt) {
//         ctx.font = txt.size + 'px ' + txt.font;
//         // console.log ('ctx font', ctx.font);
//         var align;
//         ctx.shadowColor = "black";
//         (txt.isShadow) ? ctx.shadowBlur = 15 : ctx.shadowBlur = 0;
//         ctx.fillStyle = txt.color;
//         if (txt.align === 'left') {
//             ctx.textAlign = 'left';
//             ctx.fillText(txt.line, 30, txt.height);
//         }
//         else if (txt.align === 'right') {
//             ctx.textAlign = 'right';
//             ctx.fillText(txt.line, 470, txt.height);
//         }
//         else {
//             ctx.textAlign = 'center';
//             ctx.fillText(txt.line, canvas.width / 2, txt.height);
//         }
//         console.log('align', align);

//         console.log('colorddddddd', txt.color);
//         console.log ('txt is shadow' , txt.isShadow);

//         console.log('txt.line', txt.line);

//     })

// }


//download canvas
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});
ctx.fillText(gMeme.txts[id].line, canvas.width / 2, canvas.height - 20);

function deleteMemeText(idx) {
    var txts = gMeme.txts;
    var elText = '';
    console.log('mmmmmmmm');
    if (idx === 0) elText = document.querySelector('.top-line-text');
    else elText = document.querySelector('.bottom-line-text');
    elText.value = '';
    txts[idx].line = '';
    gMeme.txts[idx].y = gMeme.txts[idx].height;
    gMeme.txts[idx].x = gMeme.txts[idx].width;
}

