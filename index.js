// we want to load the database conent when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // fetch('https://arcade-backend-jdk4.onrender.com:10000/getAll')
    fetch('https://arcade-backend-jdk4.onrender.com/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data["data"]));
});

// add date
const date = new Date();
// const dateString = date.toLocaleDateString();
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const dateString = date.toLocaleDateString('en-US', options);
const leaderboardDate = document.querySelector('#leaderboard-date');
leaderboardDate.innerHTML = "~~~~~~" +"&nbsp;"  + dateString + "&nbsp;&nbsp;" + "~~~~~~";

// const addBtn = document.querySelector('#add-name-btn');
const updateBtn = document.querySelector('#update-row-btn');
// const cancelBtn = document.querySelector('#cancel-btn');
const cashOutBtn = document.querySelector('#cash-out');
const toggleImage = document.getElementById('toggle-image');
// Set a flag variable to keep track of the current state of the button
let isOn = false;

function loadHTMLTable(data) {
    // console.log("load html")
    // console.log("got a response, then turned it to json, then took that result's data field and ran it through load HTML table function...")
    // const table = document.querySelector('table tbody');
    const ul = document.querySelector('.two-column-list');
    // console.log("table tbody", table);
    // console.log("data that we got back from the /insert fetch", data)

    let ulHtml = "";

    if (data.length === 0) {
        // console.log("data.length is 0");
        ulHtml += "<li id='first'>Khatchig</li>";
        ulHtml += "<li id='second'>Alice</li>";
        ulHtml += "<li id='third'>Bob</li>";
        ulHtml += "<li id='first_score'>1,000,000</li>";
        ulHtml += "<li id='second_score'>1,000</li>";
        ulHtml += "<li id='third_score'>100</li>";
        ul.innerHTML = ulHtml;
        return;
    }

    ulHtml_col1 = "";
    ulHtml_col2 = "";

    data.forEach(function ({name, score}, index) {
        if (index == 0) {
            ulHtml_col1 += `<li id='first'>${name}</li>`;
            ulHtml_col2 += `<li id='first_score'>${score}</li>`;
        } else if (index == 1) {
            ulHtml_col1 += `<li id='second'>${name}</li>`;
            ulHtml_col2 += `<li id='second_score'>${score}</li>`;
        } else if (index == 2) {
            ulHtml_col1 += `<li id='third'>${name}</li>`;
            ulHtml_col2 += `<li id='third_score'>${score}</li>`;
        }
    });

    ul.innerHTML = ulHtml_col1 + ulHtml_col2;
}