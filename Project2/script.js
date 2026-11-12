
// Get the HTML elements
const stationSelect = document.getElementById("station");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const trainList = document.getElementById("train-list");
const message = document.getElementById("message");
const stationName = document.getElementById("station-name");

// Store the trains received from the API
let trains = [];

// Load trains from Digitraffic API
async function getTrains() {
    const stationCode = stationSelect.value;

    message.textContent = "Loading train information...";
    trainList.innerHTML = "";

    stationName.textContent = "Station: " +
        stationSelect.options[stationSelect.selectedIndex].text;

    // API address for the selected station
    const url = "https://rata.digitraffic.fi/api/v1/live-trains/station/"
        + stationCode
        + "?arrived_trains=5&arriving_trains=10"
        + "&departed_trains=5&departing_trains=10"
        + "&include_nonstopping=false"
        + "&train_categories=Commuter,Long-distance";

    try {
        // Make an AJAX request
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("API request failed");
        }

        // Convert the response into JSON
        const data = await response.json();

        // Save the API data into a variable
        trains = data;

        // Display the trains
        displayTrains();

    } catch (error) {
        message.textContent =
            "Could not load trains. Please try again later.";
        trainList.innerHTML = "";
        console.log(error);
    }
}

// Display trains on the page
function displayTrains() {
    trainList.innerHTML = "";

    // Get the search text
    const searchText = searchInput.value.toLowerCase().trim();

    // Filter trains by train number or commuter line
    const filteredTrains = trains.filter(function(train) {
        const number = String(train.trainNumber || "");
        const line = String(train.commuterLineID || "");

        return number.includes(searchText) ||
            line.toLowerCase().includes(searchText);
    });

    let displayedCount = 0;

    // Create a card for each train
    filteredTrains.forEach(function(train) {
        const stationCode = stationSelect.value;

        // Find this station's timetable rows
        const rows = train.timeTableRows || [];

        const stationRows = rows.filter(function(row) {
            return row.stationShortCode === stationCode &&
                (row.type === "DEPARTURE" || row.type === "ARRIVAL");
        });

        // Prefer the departure time when available
        const timetable = stationRows.find(function(row) {
            return row.type === "DEPARTURE";
        }) || stationRows[0];

        if (!timetable) {
            return;
        }

        // Format the scheduled time
        const time = new Date(timetable.scheduledTime);

        const formattedTime = time.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Europe/Helsinki"
        });

        // Create the train card
        const card = document.createElement("div");
        card.className = "train-card";

        const title = document.createElement("h3");
        title.textContent = "Train " + train.trainNumber;

        const line = document.createElement("p");
        line.textContent = "Train line: " +
            (train.commuterLineID || train.trainType || "Other");

        const type = document.createElement("p");
        type.textContent = timetable.type === "DEPARTURE"
            ? "Departure"
            : "Arrival";

        const timeText = document.createElement("p");
        timeText.textContent = "Scheduled time: " + formattedTime;

        const delay = document.createElement("p");

        // Show delay information when it is available
        if (timetable.differenceInMinutes !== undefined &&
            timetable.differenceInMinutes !== null) {

            const delayMinutes = timetable.differenceInMinutes;

            if (delayMinutes > 0) {
                delay.textContent = "Delay: " + delayMinutes + " minutes";
            } else if (delayMinutes < 0) {
                delay.textContent = "Early: " +
                    Math.abs(delayMinutes) + " minutes";
            } else {
                delay.textContent = "On time";
            }

        } else {
            delay.textContent = "Delay information unavailable";
        }

        delay.className = "delay";

        // Add information to the card
        card.appendChild(title);
        card.appendChild(line);
        card.appendChild(type);
        card.appendChild(timeText);
        card.appendChild(delay);

        trainList.appendChild(card);
        displayedCount++;
    });

    // Show a message if no trains were found
    if (displayedCount === 0) {
        message.textContent = "No trains found. Try another search.";
    } else {
        message.textContent = displayedCount + " trains found.";
    }
}

// Add event listeners dynamically
searchButton.addEventListener("click", getTrains);

stationSelect.addEventListener("change", getTrains);

searchInput.addEventListener("input", displayTrains);

// Load train information when the page opens
getTrains();
