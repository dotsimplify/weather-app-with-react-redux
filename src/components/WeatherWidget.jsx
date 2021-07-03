import ManageCities from "./ManageCities";
import ViewWeather from "./ViewWeather";
import { connect } from "react-redux";
function WeatherWidget({ cities }) {
  return <>{cities.length > 0 ? <ViewWeather /> : <ManageCities />}</>;
}

const mapStateToProps = (state) => {
  return { cities: state.cities };
};

export default connect(mapStateToProps, null)(WeatherWidget);
