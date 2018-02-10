import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchWeatherData, selectCity } from './State/actions'

class CityWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: 'imperial'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.selectedCity) {
      console.log('fetching data');
      this.props.fetchWeatherData(this.props.selectedCity.cityName, this.state.units);
    } else {
      console.log('selecting city');
      this.props.selectCity(this.props.city);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props, prevProps);
    if (this.props.selectedCity && (this.props.selectedCity !== prevProps.selectedCity)) {
      console.log('fetching data');
      this.props.fetchWeatherData(this.props.selectedCity.cityName, this.state.units);
    } 
  }

  handleClick() {
    this.state.units === 'imperial' ? 
      this.setState({units: 'metric'}, () => this.props.fetchWeatherData(this.props.selectedCity.cityName, this.state.units)) : 
      this.setState({units: 'imperial'}, () => this.props.fetchWeatherData(this.props.selectedCity.cityName, this.state.units))
  }

  render() {
    if (this.props.selectedCity) {
      return (
        <div className="card">
          <h2>{this.props.selectedCity.cityName + ( this.props.selectedCity.state ? ', ' + this.props.selectedCity.state : '')}</h2>
          <img src={this.props.selectedCity.imageUrl} alt='City'/> 
          {this.props.weatherData ? 
            <div>
              <p>Humidity: {this.props.weatherData.humidity}</p>
              <p>Average Temperature: {this.props.weatherData.avgTemp}</p>
              <p>High Temperature: {this.props.weatherData.highTemp}</p>
              <p>Low Temperature: {this.props.weatherData.lowTemp}</p>
              <p>Status: {this.props.weatherData.status}</p> 
            </div>
          : null}
          <form>
              <div className="md-multi-ctrl-field">
                  <input onClick={this.handleClick} id="fahrenheit" readOnly checked={this.state.units === 'imperial'} name="units" type="radio" value="imperial" />
                  <label htmlFor="fahrenheit">Fahrenheit</label>
                  <input onClick={this.handleClick} id="celsius" readOnly checked={this.state.units === 'metric'} type="radio" name="units" value="metric" />
                  <label htmlFor="celsius">Celsius</label>
              </div>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state)  => {
  return {
      selectedCity: state.selectedCity,
      weatherData: state.weatherData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchWeatherData: (cityName, units) => {
          dispatch(fetchWeatherData(cityName, units));
      },
      selectCity: (city) => {
          dispatch(selectCity(city));
      }
  }
}
const WrapperCityWeather = connect (mapStateToProps, mapDispatchToProps)(CityWeather);

export default WrapperCityWeather;
