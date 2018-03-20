
'use strict';
console.log('koko');


var gCurrImg = '';
var gKeywordCount;


var gImgs = [{
    id: 1,
    url: 'img/meme1.jpg',
    keywords: ['happy', 'cat']
},
{
    id: 2,
    url: 'img/meme2.jpg',
    keywords: ['happy']
}
]
console.log('gImgs', gImgs);

//for canvas 
var ctx;
// This is the same as <body onload="">


renderImgs();
var flatened = flatten(gImgs);
gKeywordCount = findModes(flatened);




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
    setCanvasImage();
}

function setCanvasImage() {
    var elCanvas = document.querySelector('canvas');
     ctx = elCanvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
        drawImage(this);
    };
    imageObj.src = gCurrImg.url;
}
function drawImage(imageObj) {
    var x = 0;//69;
    var y = 0;//50;

    ctx.drawImage(imageObj, x, y);
}


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
    return valueRepeatsMap;
}