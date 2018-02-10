import React, { Component } from "react";
import "./ui-toolkit/css/nm-cx/main.css";
import "./App.css";
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

class App extends Component {

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
              //this.props.selectCity(city);
              return(<CityWeather city={city}/>)
            })} /> 
/*           <Route key={city.id} exact={true} path={`/${city.cityName}`} render={(renderProps => {
              return(<CityWeather city={city}/>)
            })} />*/
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

const WrappedCustomLink = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLink));
const WrapperApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default WrapperApp;
