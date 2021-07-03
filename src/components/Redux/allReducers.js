// function for setting item in local storage
const Storage = (cities) => {
  localStorage.setItem("city", JSON.stringify(cities.length > 0 ? cities : []));
};
// function for Getting item from local storage

const storage = localStorage.getItem("city")
  ? JSON.parse(localStorage.getItem("city"))
  : [];

// Initializing initiial state of the application
const initialState = {
  weatherData: [],
  cities: [...storage],
  errorMsg: false,
};

// defining reducers

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WEATHER":
      return {
        ...state,
        weatherData: action.payload,
      };
    case "ADD_CITY":
      console.log(state.cities, "state.cities");
      if (
        !state.cities.find((item) => item.cityName === action.payload.cityName)
      ) {
        state.cities.push(action.payload);
        Storage(state.cities);
      }

      return {
        ...state,
        cities: [...state.cities],
      };
    case "REMOVE_CITY":
      return {
        ...state,
        cities: [
          ...state.cities.filter(
            (item) => item.cityName !== action.payload.cityName
          ),
        ],
      };

    case "CLEAR":
      return {
        cities: [],
      };
    case "ERROR_404":
      return {
        ...state,
        errorMsg: true,
      };
    //defalut state if no reducers called
    default:
      return state;
  }
};
