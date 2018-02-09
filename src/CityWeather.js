import React, { Component } from "react";

class CityWeather extends Component {
  render() {
    return (
      <div className="card">
        <h2>City Name</h2>
        <p>Humidity</p>
        <p>Average Temperature</p>
        <p>High Temperature</p>
        <p>Low Temperature</p>
        <p>Status</p>
        <form>
            <div className="md-multi-ctrl-field">
                <input id="fahrenheit" name="units" type="radio" value="imperial" />
                <label htmlFor="fahrenheit">Fahrenheit</label>
                <input id="celsius" type="radio" name="units" value="metric" />
                <label htmlFor="celsius">Celsius</label>
            </div>
        </form>
      </div>
    );
  }
}
export default CityWeather;
