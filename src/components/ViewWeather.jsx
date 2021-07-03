import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCity } from "./Redux/actions";
import { FaLocationArrow, FaCompass } from "react-icons/fa";
import styles from "./ViewWeather.module.css";

function ViewWeather({ cities }) {
  const changeTemp = (kelvin) => {
    return kelvin - 273.15;
  };
  const visibilityConverter = (value) => {
    return value / 1000;
  };
  return (
    <Carousel>
      <div>
        {cities.map((item) => {
          return (
            <div key={item.cityName} className={styles.viewWeatherDiv}>
              <div className={styles.titleBox}>
                <h1 className={styles.title}>
                  {item.cityName} , {item.country}
                </h1>

                <Link to="/manage-cities">
                  <MdSettings className={styles.settingIcon} />
                </Link>
              </div>
              <div className={styles.tempratureBox}>
                <div className={styles.combinedTempBox}>
                  <div>
                    <img
                      src={`http://openweathermap.org/img/w/${item.icon}.png`}
                      className={styles.tempIcon}
                      alt={item.cityName}
                    />
                  </div>
                  <p className={styles.temp}>
                    {Math.floor(changeTemp(item.temp))}
                    <sup>&#8451;</sup>
                  </p>
                </div>
              </div>
              <p className={styles.weatherStatus}>
                Feels like
                <span className={styles.feelsLike}>
                  {Math.floor(changeTemp(item.feels_like))} <sup>&#8451;</sup>
                </span>
                <span className={styles.weatherStatusNow}>
                  {item.weatherStatus}
                </span>
              </p>
              <div className={styles.windStatusBox}>
                <div className={styles.windNow}>
                  <FaLocationArrow className={styles.locationIcon} />
                  <p className={styles.windDetail}>{item.windSpeed}m/s SSE</p>
                </div>
                <div className={styles.windNow}>
                  <FaCompass className={styles.locationIcon} />
                  <p className={styles.windDetail}>{item.pressure} hPa</p>
                </div>
              </div>
              <div>
                <div className={styles.humidityDiv}>
                  <div className={styles.humidity}>
                    Humidity : <span>{item.humidity} %</span>
                  </div>
                  <div className={styles.humidity}>
                    Visibility :{" "}
                    <span>{visibilityConverter(item.visibility)} /km</span>
                  </div>
                </div>
              </div>
              {/* <button
              onClick={() => {
                addCity(weather);
              }}
            >
              submit
            </button> */}
            </div>
          );
        })}
      </div>
    </Carousel>
  );
}
const mapStateToProps = (state) => {
  return { cities: state.cities };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addCity: addCity }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewWeather);
