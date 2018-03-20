// console.log('im here');

// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// ctx.font = "18px Arial";

// var keyHistory = "";

// window.addEventListener("keyup", keyUpHandler, true);

// function addletter(letter) {
//     keyHistory += letter;
//     ctx.clearRect(0, 0, 300, 300);
//     ctx.fillText(keyHistory, 20, 20);
// }

// function keyUpHandler(event) {
//     var letters = "abcdefghijklmnopqrstuvwxyz";
//     var key = event.keyCode;
//     if (key > 64 && key < 91) {
//         var letter = letters.substring(key - 64, key - 65);
//         addletter(letter);
//     }
// }

var canvas = document.getElementById("my-canvas");
var context = canvas.getContext("2d");

context.fillStyle = "blue";
context.font = "bold 16px Arial";
context.fillText("Zibri", (canvas.width / 2) - 17, (canvas.height / 2) + 8);