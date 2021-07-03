import styles from "./WeatherDetail.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCity } from "./Redux/actions";
import { BiPlusCircle } from "react-icons/bi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
function WeatherDetail({ weather, addCity }) {
  const changeTemp = (k) => {
    return k - 273.15;
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleDiv}>
        <h2
          className={styles.title}
        >{`${weather.cityName} , ${weather.country}`}</h2>
        <img
          src={`http://openweathermap.org/img/w/${weather.icon}.png`}
          alt=""
        />
        <button
          className={styles.addCityButton}
          onClick={() => addCity(weather)}
        >
          <BiPlusCircle className={styles.plusIcon} />
        </button>
      </div>
      <div className={styles.temprtureDiv}>
        <p>
          <span className={styles.feelsLike}> Real Feel :</span>{" "}
          <span className={styles.tempData}>
            {" "}
            {Math.floor(changeTemp(weather.feels_like))}
          </span>
          <sup>&#8451;</sup>
        </p>
        <p className={styles.feelsLike}>{weather.weatherDescription}</p>
      </div>
      <div className={styles.highLowTempDiv}>
        <div>
          <FaTemperatureLow className={styles.weatherIcon} />
          <span className={styles.tempData}>
            {Math.floor(changeTemp(weather.minTemp))} <sup>&#8451;</sup>
          </span>
        </div>

        <div>
          <FaTemperatureHigh className={styles.weatherIcon} />
          <span className={styles.tempData}>
            {Math.floor(changeTemp(weather.maxTemp))} <sup>&#8451;</sup>
          </span>
        </div>

        <div>
          <span className={styles.humidity}>Humidity : </span>
          <span className={styles.tempData}>{weather.humidity}%</span>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addCity: addCity }, dispatch);
};
export default connect(null, mapDispatchToProps)(WeatherDetail);
