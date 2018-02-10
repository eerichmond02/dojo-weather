import React, { Component } from "react";
import "./ui-toolkit/css/nm-cx/main.css";
import "./App.css";
import { BrowserRouter, Route, Link, withRouter, Switch } from "react-router-dom";
import CityWeather from "./CityWeather";
import { selectCity, fetchCityData } from "./State/actions";
import { connect } from "react-redux";
import CityNotFound from './CityNotFound'
import AddCity from "./AddCity";

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
          <Link to='/add'>Add a Weather Forecast</Link>
          <ul className="tabs">
            {this.props.cities.map((city) => (
              <WrappedCustomLink key={city.id} city={city} selectCity={this.props.selectCity} 
              label={city.cityName + ( city.state ? ', ' + city.state : '')} to={`/${city.cityName}`} />
            ))}
          </ul>
          <Switch>
          {this.props.cities.map((city) => (
          <Route key={city.id} exact={true} path={`/${city.cityName}`} onEnter={() => this.props.selectCity(city)} 
          render={(renderProps => {
              return(<CityWeather city={city}/>)
            })} /> 
          ))} 
          <Route path='/add' component={AddCity} />
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
