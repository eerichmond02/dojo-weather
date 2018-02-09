import { SELECT_CITY, UPDATE_WEATHER, UPDATE_CITIES } from './types';
import { WeatherData, CityStats } from './reducer';
import axios from 'axios';

export const selectCity = (city) => {
    return {type: SELECT_CITY, payload: city};
}

export const fetchWeatherData = (cityName, units) => {
    return (dispatch, getState) => {
      axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=' + units + '&appid=dd438c01c49d8b94b360b49a94fe760f').then(({data}) => {
      	console.log(data);
      	let weather = new WeatherData(data.main.humidity, data.main.temp, data.main.temp_max, data.main.temp_min, data.weather[0].description)
        dispatch(updateWeatherData(weather));
      });
    };
  };

export const updateWeatherData = (weather) => {
	return {type: UPDATE_WEATHER, payload: weather};
}

export const fetchCityData = () => {
    return (dispatch, getState) => {
      axios.get('http://5a7de35350403e0012036338.mockapi.io/api/cities').then(response => {
        let newArray = response.data.map(city => {
          return new CityStats(city.cityName, city.state, city.imageURL, city.id);
        });
        dispatch(updateCities(newArray));
      });
    };
  };

export const updateCities = (cities) => {
	return {type: UPDATE_CITIES, payload: cities};
}