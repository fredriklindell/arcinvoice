//Copyright (c) 2022 Panshak Solomon

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/'


const store = createStore(reducers, compose(applyMiddleware(thunk)))

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store} >
  <App />
</Provider>);
