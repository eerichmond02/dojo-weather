import React, { Component } from "react";
import "./App.css";
import "./ui-toolkit/css/nm-cx/main.css";
import { BrowserRouter, Route, Link, withRouter, Switch } from "react-router-dom";
import CityWeather from "./CityWeather";
import { selectCity, fetchCityData } from "./State/actions";
import { connect } from "react-redux";
import CityNotFound from './CityNotFound'

const CustomLink = (props) => {
  const {to, label, exact, city, selectCity} = props;
  return (
    <Route
      path={to}
      exact={exact}
      children={({match}) => (
        <li onClick={() => selectCity(city)} className={match ? "active tab-title" : "tab-title"}>
          <Link to={to}>{label}</Link>
        </li>
      )}
    />
  );
}

const WrappedCustomLink = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLink));

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCityData();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Dojo Weather Forecast</h1>
          <ul className="tabs">
            {this.props.cities.map((city) => (
              <WrappedCustomLink key={city.id} city={city} selectCity={this.props.selectCity} label={`${city.cityName}, ${city.state}`} to={`/${city.cityName}`} />
            ))}
          </ul>
          <Switch>
          {this.props.cities.map((city) => (
            <Route key={city.id} exact={true} path={`/${city.cityName}`} onEnter={() => this.props.selectCity(city)} render={(renderProps => {
              this.props.selectCity(city);
              return(<CityWeather />)
            })} />
          ))} 
          <Route path='/:city' component={CityNotFound} />
          </Switch>
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
      },
      fetchCityData: () => {
        dispatch(fetchCityData())
      }
  }
}
const WrapperApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default WrapperApp;
