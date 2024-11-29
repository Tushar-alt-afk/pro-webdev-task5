const apiKey = "e77f740c60c5c6998bec8ff2bd044071";
async function getWeather() {
    const location = document.getElementById("location").value;
    const output = document.getElementById("output");

    if (!location) {
        output.innerHTML = "<p>Please enter a location or use your current location.</p>";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Location not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        output.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
function getWeatherByLocation() {
    const output = document.getElementById("output");
    const info = document.getElementById("info");

    if (!navigator.geolocation) {
        info.innerHTML = "Geolocation is not supported by your browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
            );

            if (!response.ok) {
                throw new Error("Could not fetch weather for your location");
            }

            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            output.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }, () => {
        info.innerHTML = "Unable to retrieve your location.";
    });
}


function displayWeather(data) {
    const { name, main, weather } = data;
    const output = document.getElementById("output");

    output.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels Like: ${main.feels_like}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}
