// Exercise 1 - Click events

function showTable() {
    const animal = "Lion";
    const habitat = "Savanna";
    const diet = "Meat";

    const table = `
        <table class="display">
            <tr>
                <th>Animal</th>
                <th>Habitat</th>
                <th>Diet</th>
            </tr>
            <tr>
                <td>${animal}</td>
                <td>${habitat}</td>
                <td>${diet}</td>
            </tr>
        </table>
    `;

    const tableContainer = document.querySelector("#tableContainer");
    tableContainer.innerHTML = table;
}


// Exercise 2 - Mouseover and click

const headings = document.querySelectorAll("h2");

const exercise1 = headings[0];
const exercise2 = headings[1];

exercise2.addEventListener("mouseover", function () {
    console.log("Stepped over me with a mouse!");
});

exercise1.addEventListener("click", function () {
    exercise1.style.color = "red";
    exercise1.innerHTML = "Bye bye mouse!";
});


// Exercise 3 - Input events

const feedback = document.querySelector("#feedback");
const charcount = document.querySelector("#charcount");
const status = document.querySelector("#status");
const preview = document.querySelector("#preview");

feedback.addEventListener("focus", function () {
    status.innerHTML = "You can write your feedback here.";
    feedback.style.backgroundColor = "#eeeeee";
});

feedback.addEventListener("blur", function () {
    status.innerHTML = "";
    feedback.style.backgroundColor = "";
});

feedback.addEventListener("input", function () {
    charcount.innerHTML = feedback.value.length + "/200";
    preview.innerHTML = feedback.value;
});


// Exercise 4 - Form submit

const form = document.querySelector("#feedbackForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = feedback.value.trim();

    if (text.length < 10 || text.length > 200) {
        status.innerHTML = "Feedback must be 10-200 characters.";
    } else {
        feedback.value = "";
        charcount.innerHTML = "0/200";
        preview.innerHTML = "(Esikatselu tulee tähän)";
        status.innerHTML = "Thank you for your feedback!";
    }
});


// Exercise 5 - Keyboard events

const keybox = document.querySelector("#keybox");
const keyinfo = document.querySelector("#keyinfo");

document.addEventListener("keydown", function (event) {
    console.log(event);

    keyinfo.innerHTML = "Key: " + event.key + " | Code: " + event.code;

    keybox.innerHTML = event.key;
});