

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey ="d12587abd4ecef011e6beed39a3e11bc";

weatherForm.addEventListener("submit",async (event) => {

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }catch(error){
            console.error(error);
            displayError(error);
        }

    }else{
        displayError("Please Enter a city");
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=d12587abd4ecef011e6beed39a3e11bc&units=metric`

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city,
           main: {temp,humidity}, 
           weather:[{description, id}]}=data;

    card.textContent ="";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const desciDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    desciDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    desciDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desciDisplay);
    card.appendChild(weatherEmoji);

     
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 500):
            return "🌦️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId === 800):
            return "☀️"; // Clear
        case (weatherId > 800):
            return "☁️"; // Clouds
        default:
            return "❓";

}
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display="flex";
    card.appendChild(errorDisplay);

}