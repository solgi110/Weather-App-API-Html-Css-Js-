
const Api_key = '2d9b02e907d46e99373f635b91a4e69b';
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${Api_key}&units=metric&q=`

//Elements
const firstForm = document.querySelector('.firstFormContainer')
const errorText = document.querySelector('.errorText')
const arrowBtn = document.querySelector('.fa-arrow-left')
const inputAnime = document.querySelector('.inputAnimation')
const searchInput = document.querySelector('.searchInp')
const seprator = document.querySelector('.seprator')
const locationButton = document.querySelector('.locButton')
const wheatherIcon = document.querySelector('.wheatherIcon')


firstForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const value = searchInput.value.trim()

  if (value) {
    getWeatherofApi(baseUrl + value)
  }
})

const getWeatherofApi = async (data) => {
  inputAnime.classList.add('loading')
  errorText.style.display = "none";
  

  try {
    const rep = await fetch(`./${data}`);
    const res = await rep.text();
    console.log(res);

    if (res.cod === "404") {
      errorText.textContent = res.message + " ! please try again";
      errorText.style.display = 'block';
    }
    else {
      showState(res)
    }
  }
  catch (err) {
    errorMessage("An error occurred while fetching !")
  }
  finally {
    inputAnime.classList.remove('loading')
  }

}

//Elements

const tempratoar = document.querySelector('.tempratoar')
const discriptionweather = document.querySelector('.descriptionText')
const landName = document.querySelector('.cityLand')
const feelsLike = document.querySelector('.feelslikenumber')
const Humidity = document.querySelector('.humiditynumber')


const showState = (data) => {

  const { temp, feels_like, humidity } = data.main;
  const { description, id } = data.weather[0];

  if (id >= 200 && id <= 232) {
    wheatherIcon.src = "/assets/thunder-stormy.png";
  }
  else if (id >= 500 && id <= 531) {
    wheatherIcon.src = "/assets/rainy.png";
  }
  else if (id >= 600 && id <= 622) {
    wheatherIcon.src = "/assets/snowy.png";
  }
  else if (id >= 700 && id <= 781) {
    wheatherIcon.src = "/assets/windy.png";
  }
  else if (id === 800) {
    wheatherIcon.src = "/assets/suny.png";
  }
  else if (id >= 801 && id <= 804) {
    wheatherIcon.src = "/assets/cloudy.png";
  }


  tempratoar.innerHTML = ` ${temp}°`;
  discriptionweather.innerHTML = description;
  landName.innerHTML = `${data.name}, ${data.sys.country} `;
  feelsLike.innerHTML = `${feels_like}°`;
  Humidity.innerHTML = ` ${humidity}%`;

  //  Elents 
  const firstSection = document.getElementById('firstSection')
  const seconSection = document.getElementById('seconSection')

  firstSection.style.display = 'none';
  seconSection.style.display = 'block';
  arrowBtn.style.display = 'flex';

}

arrowBtn.addEventListener('click', () => {

  seconSection.style.display = "none";
  firstSection.style.display = 'block';
  arrowBtn.style.display = "none"
  searchInput.value = "";
  searchInput.focus()

})

const errorMessage = (error) => {

  errorText.textContent = error
  errorText.style.display = 'block';
}

locationButton.addEventListener('click', (e) => {

  e.preventDefault()

  if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(OnSucces, OnError) }

})

const OnSucces = (positions) => {
  console.log(positions);

  const { latitude, longitude } = positions.coords;
  getWeatherofApi(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Api_key}`)

}

const OnError = (error) => {
  errorMessage(error.message)
}


document.addEventListener('DOMContentLoaded', () => {
  arrowBtn.style.display = 'none';
})
