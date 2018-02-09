import { SELECT_CITY, UPDATE_WEATHER, UPDATE_CITIES } from "./types";

class CityStats {
    constructor (cityName, state, imageUrl, id) {
        this.cityName = cityName;
        this.state = state;
        this.imageUrl = imageUrl;
        this.id = id;
    }
}

class WeatherData {
    constructor(humidity, avgTemp, highTemp, lowTemp, status){
        this.humidity = humidity;
        this.avgTemp = avgTemp;
        this.highTemp = highTemp;
        this.lowTemp = lowTemp;
        this.status = status;
    }
}

let city = new CityStats('Seattle', 'WA', 'https://images.pexels.com/photos/656195/pexels-photo-656195.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb', 1)

const initialState = {
    cities: [city],
    selectedCity: undefined,
    weatherData: undefined
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SELECT_CITY: 
            return {
                ...state, 
                selectedCity: action.payload
            }
        case UPDATE_WEATHER: 
            return {
                ...state,
                weatherData: action.payload
            }
        case UPDATE_CITIES:
            return {
                ...state,
                cities: action.payload
            }
        default: 
            return state;
    }
}


export default reducer;
export { WeatherData, CityStats };