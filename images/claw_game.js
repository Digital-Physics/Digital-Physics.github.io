let square = document.getElementById("square");
let glass = document.getElementById("front")
let homePos = { x: 0, y: 0 };
let isDropped = false;
// console.log("square check", square.style.left);
var images = ['./front_glass0.png', './front_glass1.png', './front_glass2.png', './front_glass3.png'];
var currentIndex = 0;
var interval = 2000; // Change image every 2 seconds
//
var images2 = [
    { src: "./img1.png", depth: -155 },
    { src: "./img2.png", depth: -255 },
    { src: "./img3.png", depth: -200 },
    { src: "./img4.png", depth: -144 },
    { src: "./img5.png", depth: -140 },
    { src: "./img6.png", depth: -150 },
    { src: "./img7.png", depth: -146 },
    { src: "./img8.png", depth: -141 }
  ];
var container = document.getElementById('container');


function moveUp() {
	if (!isDropped && parseInt(square.style.top) > 0) {
		square.style.top = parseInt(square.style.top) - 1 + "px";
	}
}

function moveDown() {
	if (!isDropped && parseInt(square.style.top) < 50) {
		square.style.top = parseInt(square.style.top) + 1 + "px";
	}
}

function moveLeft() {
	if (!isDropped && parseInt(square.style.left) > 0) {
		square.style.left = parseInt(square.style.left) - 7 + "px";
	}
}

function moveRight() {
    console.log("moved right", square.style.left);
	if (!isDropped && parseInt(square.style.left) < 450) {
		square.style.left = parseInt(square.style.left) + 7 + "px";
	}
}

function drop() {
    if (!isDropped) {
        isDropped = true;
        let currPos = { x: parseInt(square.style.left), y: parseInt(square.style.top) };
        let startPos = currPos.y;
        let startPosX = currPos.x;
        let i = 0;
        let max_distance = Math.max(currPos.x, currPos.y);
        console.log("max dist", max_distance);
        const interval = setInterval(function() {
            if (i < 300) {
                square.style.top = startPos + i + "px";
            } else if (i < 600) {
                square.style.top = startPos + (600 - i) + "px";
                // set background image for the way back up
                square.style.backgroundImage = "url('./claw.png')";
            } else if (i < (600 + max_distance)) {
                square.style.top = Math.max(0, startPos - (i - 600)) + "px";
                square.style.left = Math.max(0, startPosX - (i - 600)) + "px";
            } else {
                square.style.top = "0px";
                square.style.left = "0px";
                isDropped = false;
                clearInterval(interval);
                // set background image back to the original image
                square.style.backgroundImage = "url('./claw_open.png')";
            }
            i += 5;
        }, 50);
    }
}

for (var i = 0; i < images2.length; i++) {
    var image = document.createElement('img');
    image.src = images2[i].src;
    image.style.transform = 'translateX(' + Math.random()*500 + 'px) translateY(' + 50 + 'px) translateZ(' + images2[i].depth/4 + 'px)';
    image.style.width = '50%';
    image.style.height = '50%';
    container.appendChild(image);
    console.log(image);
  }

// iterate through front glass images to give blinking color effect
function changeImage() {
  glass.style.backgroundImage = 'url(' + images[currentIndex] + ')';
  currentIndex = (currentIndex + 1) % images.length; // Cycle through images
}

setInterval(changeImage, interval);
  

