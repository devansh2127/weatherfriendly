const apiKey = "f0a8ed32e043cfb6d8a1adbf52ae4245"
const sumbit = document.getElementById("sumbit")
const weather = document.getElementById("currentWeather")
const baseCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${apiKey}&units=metric`
const temp = document.getElementById("Temp")
const feelsLike = document.getElementById("Feelslike")


async function putTime(data1) {

    const timeData1 = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=CGX69QJROCBO&format=json&by=position&lat=${data1.coord.lat}&lng=${data1.coord.lon}`).then((response) => response.json()).then((timeRaw) => {
        return timeRaw;
      })
    const timetime = timeData1.formatted.slice(11)
    const timeToDisplay = (timetime.slice(0,-3))
    document.getElementById('time').innerHTML = `| ${timeToDisplay}`

}

function checkPress(eve){
    if(eve.keyCode === 13){
    	document.getElementById('done').click()
    }
}

async function onLoad() {
    const response = await fetch(baseCurrentURL);
    const data = await response.json();
    putTime(data)
    document.getElementById('box1').style.backgroundImage = `url(./Data/${data.weather[0].main}.jpg)`
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?Delhi+landscape)`
    document.getElementById("currentWeather").innerHTML = `${data.weather[0].description}`
    document.getElementById("Temp").innerHTML = ` ${parseInt(data.main.temp)}° C`
    document.getElementById("Feelslike").innerHTML = `Feels like ${parseInt(data.main.feels_like)}° C`
    document.getElementById("minTemp").innerHTML = `Minimum Temp: ${parseInt(data.main.temp_min)}° C`
    document.getElementById("wind").innerHTML = `Wind Speed: ${parseInt(data.wind.speed)} m/s`
    document.getElementById("hum").innerHTML = `Humidity: ${data.main.humidity}%`
    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?delhi')"
    
}
window.onload = onLoad()

async function sendReq(loc) {
    if (document.getElementById("search").value == '') {
        window.alert("Search box cannot be empty.");
        return
    }
    const baseCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`
    const response = await fetch(baseCurrentURL);
    const data = await response.json();
    console.log(data)
    if (data.weather == undefined)  {
        window.alert("Please enter an actual location.")
        return
    }
    putTime(data)
    document.getElementById("Delhi").innerHTML = data.name
    document.getElementById("currentWeather").innerHTML = `${data.weather[0].description}`
    document.getElementById("Temp").innerHTML = ` ${parseInt(data.main.temp)}° C`
    document.getElementById("Feelslike").innerHTML = `Feels like ${parseInt(data.main.feels_like)}° C`
    document.getElementById("minTemp").innerHTML = `Minimum Temp: ${parseInt(data.main.temp_min)}° C`
    document.getElementById("wind").innerHTML = `Wind Speed: ${parseInt(data.wind.speed)} m/s`
    document.getElementById("hum").innerHTML = `Humidity: ${data.main.humidity}%`
    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${data.name}+landscape)`
    document.getElementById('box1').style.backgroundImage = `url(./Data/${data.weather[0].main}.jpg)`
}

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");
    }
)
