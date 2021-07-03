import WeatherWidget from "../src/components/WeatherWidget";
import ManageCities from "../src/components/ManageCities";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./globalStyle.css";
import store from "../src/components/Redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    // Connecting App component to store to provide state to components
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={WeatherWidget} />
          <Route exact path="/manage-cities" component={ManageCities} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
