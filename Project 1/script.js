
const workoutForm = document.querySelector("#workout-form");
const exerciseList = document.querySelector("#exercise-list");
const workoutHistory = document.querySelector("#workout-history");
const workoutCount = document.querySelector("#workout-count");
const totalMinutes = document.querySelector("#total-minutes");
const emptyMessage = document.querySelector("#empty-message");
const addExerciseButton = document.querySelector("#add-exercise");

const workoutTypeSelect = document.querySelector("#workout-type");
const customTypeContainer = document.querySelector("#custom-type-container");
const customTypeInput = document.querySelector("#custom-type");
const historyFilter = document.querySelector("#history-filter");

const STORAGE_KEY = "gymTrackerWorkouts";

// Haetaan aiemmin tallennetut treenit selaimesta.
let workouts = [];

try {
    const savedWorkouts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    workouts = Array.isArray(savedWorkouts) ? savedWorkouts : [];
} catch (error) {
    workouts = [];
}

// Tallennetaan treenit selaimen localStorageen.
function saveWorkouts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

// Näytetään oma tekstikenttä, jos treenityypiksi valitaan Muu.
workoutTypeSelect.addEventListener("change", function() {
    const isOther = workoutTypeSelect.value === "Muu";

    customTypeContainer.hidden = !isOther;
    customTypeInput.required = isOther;

    if (!isOther) {
        customTypeInput.value = "";
    }
});

// Luodaan lomakkeeseen uusi liike.
function addExerciseRow() {
    const row = document.createElement("div");
    row.classList.add("exercise-row");

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Liikkeen nimi";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Esim. Pull-ups";
    nameInput.classList.add("exercise-name");
    nameInput.required = true;

    const weightLabel = document.createElement("label");
    weightLabel.textContent = "Paino (kg)";

    const weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.min = "0";
    weightInput.max = "1000";
    weightInput.step = "0.5";
    weightInput.value = "0";
    weightInput.classList.add("exercise-weight");
    weightInput.required = true;

    const repsLabel = document.createElement("label");
    repsLabel.textContent = "Toistot sarjoittain";

    const repsInput = document.createElement("input");
    repsInput.type = "text";
    repsInput.placeholder = "Esim. 8, 7, 6";
    repsInput.classList.add("exercise-reps");
    repsInput.required = true;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Poista liike";
    removeButton.classList.add("delete-button");

    removeButton.addEventListener("click", function() {
        row.remove();
    });

    row.append(
        nameLabel,
        nameInput,
        weightLabel,
        weightInput,
        repsLabel,
        repsInput,
        removeButton
    );

    exerciseList.appendChild(row);
}

// Näytetään tallennetut treenit.
function displayWorkouts() {
    workoutHistory.replaceChildren();

    const filterValue = historyFilter.value;

    const filteredWorkouts = workouts
        .map(function(workout, index) {
            return { workout: workout, index: index };
        })
        .filter(function(entry) {
            if (filterValue === "all") {
                return true;
            }

            // Omalla nimellä tallennetut treenit kuuluvat Muu-suodattimeen.
            if (filterValue === "Muu") {
                return ![
                    "Pull",
                    "Push",
                    "Legs",
                    "Upper body",
                    "Lower body",
                    "Full body",
                    "Cardio"
                ].includes(entry.workout.type);
            }

            return entry.workout.type === filterValue;
        });

    workoutCount.textContent = workouts.length;
    totalMinutes.textContent = workouts.reduce(function(total, workout) {
        return total + Number(workout.duration || 0);
    }, 0);

    emptyMessage.hidden = filteredWorkouts.length > 0;

    if (filteredWorkouts.length === 0) {
        emptyMessage.textContent = workouts.length === 0
            ? "Et ole vielä tallentanut treenejä."
            : "Tällä suodattimella ei löytynyt treenejä.";
    }

    filteredWorkouts.forEach(function(entry) {
        const workout = entry.workout;
        const index = entry.index;

        const item = document.createElement("li");
        item.classList.add("workout-item");

        const heading = document.createElement("h3");
        heading.textContent = `${workout.type} – ${workout.date}`;

        const duration = document.createElement("p");
        duration.textContent = `Kesto: ${workout.duration} min`;

        item.append(heading, duration);

        if (workout.notes) {
            const notes = document.createElement("p");
            notes.textContent = `Lisätiedot: ${workout.notes}`;
            item.appendChild(notes);
        }

        const exercisesHeading = document.createElement("h4");
        exercisesHeading.textContent = "Liikkeet";
        item.appendChild(exercisesHeading);

        workout.exercises.forEach(function(exercise) {
            const exerciseBox = document.createElement("div");
            exerciseBox.classList.add("saved-exercise");

            const exerciseName = document.createElement("h4");
            exerciseName.textContent = exercise.name;

            const weight = document.createElement("p");
            weight.textContent = `Paino: ${exercise.weight} kg`;

            const reps = document.createElement("p");
            reps.textContent = `Sarjojen toistot: ${exercise.reps.join(", ")}`;

            const setCount = document.createElement("p");
            setCount.textContent = `Sarjoja yhteensä: ${exercise.reps.length}`;

            exerciseBox.append(
                exerciseName,
                weight,
                reps,
                setCount
            );

            item.appendChild(exerciseBox);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Poista treeni";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function() {
            const confirmed = confirm("Haluatko varmasti poistaa tämän treenin?");

            if (confirmed) {
                workouts.splice(index, 1);
                saveWorkouts();
                displayWorkouts();
            }
        });

        item.appendChild(deleteButton);
        workoutHistory.appendChild(item);
    });
}

// Lisätään uusi liike -painike.
addExerciseButton.addEventListener("click", addExerciseRow);

// Suodatetaan treenihistoriaa.
historyFilter.addEventListener("change", displayWorkouts);

// Tallennetaan treeni lomakkeelta.
workoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const date = document.querySelector("#workout-date").value;
    let type = workoutTypeSelect.value;
    const duration = Number(document.querySelector("#duration").value);
    const notes = document.querySelector("#workout-notes").value.trim();

    // Jos valitaan Muu, käytetään käyttäjän kirjoittamaa nimeä.
    if (type === "Muu") {
        type = customTypeInput.value.trim();

        if (!type) {
            alert("Kirjoita oma treenityyppi.");
            customTypeInput.focus();
            return;
        }
    }

    if (!date || !type || !Number.isInteger(duration) ||
        duration < 1 || duration > 600) {
        alert("Tarkista päivämäärä, treenityyppi ja treenin kesto.");
        return;
    }

    // Estetään tulevaisuuden päivämäärät paikallisen päivämäärän mukaan.
    const today = new Date();
    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    if (date > todayString) {
        alert("Päivämäärä ei voi olla tulevaisuudessa.");
        return;
    }

    const rows = document.querySelectorAll(".exercise-row");
    const exercises = [];

    if (rows.length === 0) {
        alert("Lisää treeniin vähintään yksi liike.");
        return;
    }

    for (const row of rows) {
        const name = row.querySelector(".exercise-name").value.trim();
        const weightInput = row.querySelector(".exercise-weight");
        const weight = Number(weightInput.value);
        const repsText = row.querySelector(".exercise-reps").value.trim();

        const reps = repsText.split(",").map(function(value) {
            return Number(value.trim());
        });

        const validReps = repsText !== "" &&
            reps.every(function(value) {
                return Number.isInteger(value) &&
                    value >= 1 &&
                    value <= 1000;
            });

        if (
            name.length < 2 ||
            weightInput.value === "" ||
            !Number.isFinite(weight) ||
            weight < 0 ||
            weight > 1000 ||
            !validReps
        ) {
            alert(
                "Tarkista jokaisen liikkeen nimi, paino ja toistot. " +
                "Kirjoita toistot esimerkiksi muodossa 8, 7, 6."
            );
            return;
        }

        exercises.push({
            name: name,
            weight: weight,
            reps: reps
        });
    }

    const newWorkout = {
        date: date,
        type: type,
        duration: duration,
        notes: notes,
        exercises: exercises
    };

    workouts.push(newWorkout);

    saveWorkouts();

    // Palataan kaikkiin treeneihin tallennuksen jälkeen.
    historyFilter.value = "all";
    displayWorkouts();

    workoutForm.reset();
    customTypeContainer.hidden = true;
    customTypeInput.required = false;

    exerciseList.replaceChildren();
    addExerciseRow();
});

// Näytetään yksi liikerivi ja aiemmin tallennetut treenit.
addExerciseRow();
displayWorkouts();
