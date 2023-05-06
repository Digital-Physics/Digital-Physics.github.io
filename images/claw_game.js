// let square = document.getElementById("square");
// let homePos = { x: 0, y: 0 };
// let isDropped = false;

// function moveUp() {
// 	if (!isDropped) {
// 		square.style.top = parseInt(square.style.top) - 50 + "px";
// 	}
// }

// function moveDown() {
// 	if (!isDropped) {
// 		square.style.top = parseInt(square.style.top) + 50 + "px";
// 	}
// }

// function moveLeft() {
// 	if (!isDropped) {
// 		square.style.left = parseInt(square.style.left) - 50 + "px";
// 	}
// }

// function moveRight() {
// 	if (!isDropped) {
// 		square.style.left = parseInt(square.style.left) + 50 + "px";
// 	}
// }

// function drop() {
// 	if (!isDropped) {
// 		isDropped = true;
// 		let currPos = { x: parseInt(square.style.left), y: parseInt(square.style.top) };
// 		square.style.top = currPos.y + 200 + "px";
// 		setTimeout(function() {
// 			square.style.top = currPos.y + "px";
// 			setTimeout(function() {
// 				square.style.top = homePos.y + "px";
// 				square.style.left = homePos.x + "px";
// 				isDropped = false;
// 			}, 500);
// 		}, 500);
// 	}
// }


let square = document.getElementById("square");
let homePos = { x: 0, y: 0 };
let isDropped = false;

function moveUp() {
	if (!isDropped && parseInt(square.style.top) > 0) {
		square.style.top = parseInt(square.style.top) - 50 + "px";
	}
}

function moveDown() {
	if (!isDropped && parseInt(square.style.top) < 450) {
		square.style.top = parseInt(square.style.top) + 50 + "px";
        // console.log("test square.style", square.style);
	}
}

function moveLeft() {
	if (!isDropped && parseInt(square.style.left) > 0) {
		square.style.left = parseInt(square.style.left) - 50 + "px";
	}
}

function moveRight() {
	if (!isDropped && parseInt(square.style.left) < 450) {
		square.style.left = parseInt(square.style.left) + 50 + "px";
	}
}

function drop() {
	if (!isDropped) {
		isDropped = true;
		let currPos = { x: parseInt(square.style.left), y: parseInt(square.style.top) };
		square.style.top = currPos.y + 200 + "px";
		setTimeout(function() {
			square.style.top = currPos.y + "px";
			setTimeout(function() {
				square.style.top = homePos.y + "px";
				square.style.left = homePos.x + "px";
				isDropped = false;
			}, 500);
		}, 500);
	}
}
