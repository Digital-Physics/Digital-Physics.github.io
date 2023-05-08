let square = document.getElementById("square");
let homePos = { x: 0, y: 0 };
let isDropped = false;
// console.log("square check", square.style.left);

function moveUp() {
	if (!isDropped && parseInt(square.style.top) > 0) {
		square.style.top = parseInt(square.style.top) - 1 + "px";
	}
}

function moveDown() {
	if (!isDropped && parseInt(square.style.top) < 450) {
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
            if (i < 100) {
                square.style.top = startPos + i + "px";
            } else if (i < 200) {
                square.style.top = startPos + (200 - i) + "px";
            } else if (i < (200 + max_distance)) {
                square.style.top = Math.max(0, startPos - (i - 200)) + "px";
                square.style.left = Math.max(0, startPosX - (i - 200)) + "px";
            } else {
                square.style.top = "0px";
                square.style.left = "0px";
                isDropped = false;
                clearInterval(interval);
            }
            i += 2;
        }, 50);
    }
}


