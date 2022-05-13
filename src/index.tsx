import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import App from './App';
// import AppWithReducers from './AppWithReducers';
import { AppWithRedux } from './AppWithRedux';

import { store } from './store';

import './index.css';

ReactDOM.render(
    <Provider store={ store }>
        <AppWithRedux />
    </Provider>, document.getElementById('root'));

