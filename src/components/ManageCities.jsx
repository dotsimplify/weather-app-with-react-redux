import React from "react";
import { Input } from "antd";
import styles from "./ManageCities.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WeatherDetail from "./WeatherDetail";
import Drag from "./Drag";
import { fetchWeather, addCity } from "./Redux/actions";
const { Search } = Input;
function ManageCities({ fetchWeather, weather, errorMsg }) {
  const onSearch = (value) => {
    if (value !== "") {
      fetchWeather(value);
    }
  };

  return (
    <div className={styles.ManageCitiesDiv}>
      <Search
        className={styles.inputBox}
        defaultValue=""
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        loading={false}
      />
      {errorMsg ? (
        <div
          style={{
            textAlign: "center",
            padding: ".5rem",
            fontSize: "1rem",
            fontWeight: "700",
          }}
        >
          No results
        </div>
      ) : null}
      {weather.cityName ? (
        <WeatherDetail errorMsg={errorMsg} weather={weather} />
      ) : null}
      <Drag />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    weather: state.weatherData,
    errorMsg: state.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { fetchWeather: fetchWeather, addCity: addCity },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageCities);
