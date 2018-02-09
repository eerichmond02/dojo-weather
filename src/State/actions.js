import { SELECT_CITY } from './types';

export const selectCity = (city) => {
    return {type: SELECT_CITY, payload: city};
}