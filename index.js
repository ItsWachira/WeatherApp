const wrapper= document.querySelector(".wrapper");
inputpart = wrapper.querySelector(".input-part");
infoTxt = inputpart.querySelector(".info-txt");
inputField = inputpart.querySelector("input");
locationBtn= inputpart.querySelector(".btn");
weatherIcon = document.querySelector(".weather-part img");
arrowBack = document.querySelector("header i");


const API_KEY = "2434f642b76a8d347466d12c0e45829f";
let API;


//adding an even listener to the input field to catch the city name
inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != "") {
        let userLocation = inputField.value;
        requestAPI(userLocation);
    }

   
});

//adding an event listener to the location button to get the current location of the user
locationBtn.addEventListener("click", () => { // if broweser supports geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser doesn't support geolocation!");
    }
});

//getting weather details by current location
function onSuccess(position){
    const{latitude, longitude} = position.coords;
    API= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    
    fetchData();
}

//user denied the request for current location
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

//Getting weather details by city name
function requestAPI(city) {
   API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
   fetchData();
};

//function to make api call
function fetchData(){
    infoTxt.innerText = "Getting weather detials...";
    infoTxt.classList.add("pending");
    fetch(API).then(response => response.json()).then(data => weatherDetails(data))

};

function weatherDetails(info){
    infoTxt.classList.replace("pending", "error");
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} is not valid city!`;
    } else {
          //getting the required data from the info object from the api response
        let city = info.name;
        let country = info.sys.country;
        let {description, id}= info.weather[0];
        let {feels_like, humidity, temp}= info.main;

        //making the weather icon visible

        // if(id == 800){
        //     weatherIcon.src = "icons\icons8-sun-64.png";
        // } else if(id >= 200 && id <= 232){
        //     weatherIcon.src = "icons\icons8-sun-64.png";
        // } else if(id >= 300 && id <= 499){
        //     weatherIcon.src = "icons\icons8-sun-64.png";
        // } else if(id >= 500 && id <= 531){
        //     weatherIcon.src = "icons\icons8-rain-64.png";
        // } else if(id >= 600 && id <= 622){
        //     weatherIcon.src = "icons\icons8-snow-64.png";
       
        // } else if(id >= 801 && id <= 804){
        //     weatherIcon.src = "icons\icons8-sad-sun-64.png";
        // }
        // pass the data to the partuculart html elements to display the weather details
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = humidity;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
};

};


arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});