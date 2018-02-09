import React, { Component } from "react";
import "./App.css";
import "./ui-toolkit/css/nm-cx/main.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CityWeather from "./CityWeather";
import { selectCity } from "./State/actions";
import { connect } from "react-redux";

const CustomLink = ({ label, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <li onClick={() => props.selectCity(props.cities[0])} className={match ? "active tab-title" : "tab-title"}>
        <Link to={to}>{label}</Link>
      </li>
    )}
  />
);
const WrappedCustomLink = connect(mapStateToProps, mapDispatchToProps)(CustomLink);

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Dojo Weather Forecast</h1>
          <ul className="tabs">
            <CustomLink label="Seattle, WA" to="/seattle" />
            <CustomLink label="Dallas, TX" to="/dallas" />
            <CustomLink label="Burbank, CA" to="/burbank" />
          </ul>
          <Route path="/seattle" component={CityWeather} />
          <Route path="/dallas" component={CityWeather} />
          <Route path="/burbank" component={CityWeather} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state)  => {
  return {
      cities: state.cities,
      selectedCity: state.selectedCity
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      selectCity: (payload) => {
          dispatch(selectCity(payload))
      }
  }
}
const WrapperApp = connect (mapStateToProps, mapDispatchToProps)(App);

export default WrapperApp;
