import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './App';
import reducer from './store/reducer';
import sagas from './store/sagas';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

registerServiceWorker();
