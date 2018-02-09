import { SELECT_CITY } from "./types";

class CityStats {
    constructor (cityName, state, imageUrl, id) {
        this.cityName = cityName;
        this.state = state;
        this.imageUrl = imageUrl;
        this.id = id;
    }
}

let city = new CityStats('Seattle', 'WA', 'https://images.pexels.com/photos/656195/pexels-photo-656195.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb', 1)

const initialState = {
    cities: [city],
    selectedCity: undefined
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SELECT_CITY: 
            return {
                ...state, 
                selectedCity: action.payload
            }
        default: 
            return state;
    }
}


export default reducer;