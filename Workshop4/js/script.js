// Workshop 04 - DOM Scripting


// TASK 1 - Changing content

const taskOneHeading = document.querySelector("#taskOneHeading");
const animalText = document.querySelector("#animalText");

const changeHeadingButton = document.querySelector("#changeHeadingButton");
const changeStyleButton = document.querySelector("#changeStyleButton");
const changeTextButton = document.querySelector("#changeTextButton");

changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "Updated heading!";
});

changeStyleButton.addEventListener("click", function () {
    taskOneHeading.classList.toggle("highlight");
});

changeTextButton.addEventListener("click", function () {
    animalText.textContent =
        "Elephants are intelligent and social animals.";
});


// Show / hide table

const animalButton = document.querySelector("#animalButton");
const animalTable = document.querySelector("#animalTable");

animalButton.addEventListener("click", function () {
    animalTable.classList.toggle("hidden");
});


// TASK 2 - Creating elements with JavaScript

const animalContent = document.querySelector("#animalContent");

const animalHeading = document.createElement("h3");
animalHeading.textContent = "Animal of the Day";
animalHeading.classList.add("animal-heading");

const animalParagraph = document.createElement("p");
animalParagraph.textContent =
    "Pandas are peaceful animals that mainly eat bamboo.";

const animalImage = document.createElement("img");
animalImage.src = "img/panda.jpeg";
animalImage.alt = "Panda";

animalContent.append(
    animalHeading,
    animalParagraph,
    animalImage
);


// Hide and show animal

const hideAnimalButton = document.querySelector("#hideAnimalButton");
const showAnimalButton = document.querySelector("#showAnimalButton");

hideAnimalButton.addEventListener("click", function () {
    animalContent.style.display = "none";
});

showAnimalButton.addEventListener("click", function () {
    animalContent.style.display = "block";
});


// TASK 3 - Selecting an animal

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImageElement = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");

animalSelect.addEventListener("change", function () {
    const selectedAnimal = animalSelect.value;

    if (selectedAnimal === "elephant") {
        animalName.textContent = "Elephant";
        animalImageElement.src = "img/elephant.jpg";
        animalImageElement.alt = "Elephant";
        animalDescription.textContent =
            "Elephants are the world's largest land animals.";
    }

    if (selectedAnimal === "tiger") {
        animalName.textContent = "Tiger";
        animalImageElement.src = "img/tiger.jpg";
        animalImageElement.alt = "Tiger";
        animalDescription.textContent =
            "Tigers are large cats known for their stripes.";
    }

    if (selectedAnimal === "penguin") {
        animalName.textContent = "Penguin";
        animalImageElement.src = "img/penguing.jpg";
        animalImageElement.alt = "Penguin";
        animalDescription.textContent =
            "Penguins are birds that cannot fly and live mainly in the Southern Hemisphere.";
    }

    if (selectedAnimal === "panda") {
        animalName.textContent = "Panda";
        animalImageElement.src = "img/panda.jpeg";
        animalImageElement.alt = "Panda";
        animalDescription.textContent =
            "Pandas mainly eat bamboo and spend a lot of time eating.";
    }
});

animalImageElement.addEventListener("mouseenter", function () {
    animalImageElement.classList.add("image-highlight");
});

animalImageElement.addEventListener("mouseleave", function () {
    animalImageElement.classList.remove("image-highlight");
});


// TASK 4 - Adding animal observations

const animalForm = document.querySelector("#animalForm");

const observationAnimal =
    document.querySelector("#observationAnimal");

const observationLocation =
    document.querySelector("#observationLocation");

const observationDate =
    document.querySelector("#observationDate");

const observationTableBody =
    document.querySelector("#observationTableBody");


animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const animal = observationAnimal.value.trim();
    const location = observationLocation.value.trim();
    const date = observationDate.value;

    if (animal === "" || location === "" || date === "") {
        alert("Please fill in all fields.");
        return;
    }

    const newRow = document.createElement("tr");

    const animalCell = document.createElement("td");
    animalCell.textContent = animal;

    const locationCell = document.createElement("td");
    locationCell.textContent = location;

    const dateCell = document.createElement("td");
    dateCell.textContent = date;

    newRow.append(
        animalCell,
        locationCell,
        dateCell
    );

    observationTableBody.append(newRow);

    animalForm.reset();
});