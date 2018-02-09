import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './State/store';
import { Provider } from 'react-redux';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));