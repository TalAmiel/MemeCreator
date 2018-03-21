console.log('im here');

var canvas = document.getElementById('my-canvas');
var context = canvas.getContext('2d');
      var imageObj = new Image();

      imageObj.onload = function() {
        context.drawImage(imageObj, 69, 50);
      };
      imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
   