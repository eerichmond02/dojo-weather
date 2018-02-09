import reducer from './reducer';
import {createStore} from 'redux';
import {compose} from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore (reducer, composeEnhancers());