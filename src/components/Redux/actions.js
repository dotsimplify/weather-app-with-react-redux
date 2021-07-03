import axios from "axios";

// Action for gettting weather from https:openweather.org api, axios fetch request which triggeres from manage city component

export const fetchWeather = (inputVal) => {
  return (dispatch) => {
    // Initiate api Call
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${process.env.REACT_APP_APIKEY}`
      )
      .then((response) => {
        // on response fetching data
        const cityData = response.data;
        const cityDatails = {
          cityName: cityData.name,
          icon: cityData.weather[0].icon,
          temp: cityData.main.temp,
          feels_like: cityData.main.feels_like,
          weatherStatus: cityData.weather[0].main,
          weatherDescription: cityData.weather[0].description,
          humidity: cityData.main.humidity,
          maxTemp: cityData.main.temp_max,
          minTemp: cityData.main.temp_min,
          country: cityData.sys.country,
          visibility: cityData.visibility,
          windSpeed: cityData.wind.speed,
          pressure: cityData.main.pressure,
        };
        dispatch(getWeather(cityDatails));
      })
      .catch(function (error) {
        // Api error 404 which occurs on city not found input  error
        if (error.response.status === 404) {
          dispatch(errorFunc());
          console.clear();
        }
        return console.error;
      });
  };
};

// action for error spoting
export const errorFunc = () => {
  return {
    type: "ERROR_404",
  };
};

// get weather payload collector
export const getWeather = (weather) => {
  return {
    type: "GET_WEATHER",
    payload: weather,
  };
};

// adding city to state / local storage
export const addCity = (city) => {
  console.log(city, "city");
  return { type: "ADD_CITY", payload: city };
};
//  deleting city from local storage & state
export const removeCity = (city) => {
  return { type: "REMOVE_CITY", payload: city };
};
// did not used this function yet but it can be used for completely cleaning state
export const clear = () => {
  return { type: "CLEAR" };
};
