import React, { Component } from "react";
import { connect } from "react-redux";
import { addCity } from "./State/actions";
import axios from "axios";
import { Toast, showToast } from "./toast";

class AddCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
      stateInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <form>
        <h1>Add a City</h1>
        <input
          onChange={this.handleChange}
          value={this.state.cityInput}
          placeholder="Enter a city"
          type="text"
          id="cityInput"
        />
        <input
          onChange={this.handleChange}
          value={this.state.stateInput}
          placeholder="Enter a state abbreviation for US city"
          maxLength="2"
          type="text"
          id="stateInput"
        />
        <button
          onClick={e => {
            let city = toTitleCase(this.state.cityInput);
            e.preventDefault();
            axios
              .get(
                "http://openweathermap.org/data/2.5/weather?q=" +
                  city +
                  "&units=imperial" +
                  "&appid=b6907d289e10d714a6e88b30761fae22"
              )
              .then(response => {
                console.log(response);
                this.props.addCity(city, this.state.stateInput.toUpperCase());
              })
              .catch(error => showToast());
           }}
        >
          Add a city
        </button>

        <Toast message="not a valid city" />
      </form>
    );
  }
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addCity: (cityName, state) => {
      dispatch(addCity(cityName, state));
    }
  };
};
const WrapperAddCity = connect(mapStateToProps, mapDispatchToProps)(AddCity);

export default WrapperAddCity;
