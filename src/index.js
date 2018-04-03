require("babel-polyfill");
import 'react-dates/initialize';
import React from 'react';
import {render} from 'react-dom';
import './common/app.scss';
import configureStore from './configureStore';
import Root from './Root.jsx';

window.jQuery = window.$ = require('jquery/dist/jquery.min');
require('bootstrap/dist/js/bootstrap.min');
require('./theme-assets/index');

if (module.hot) {
  module.hot.accept();
}

const store = configureStore();

window.store = store;

render(
  <Root store={store}/>, document.getElementById('root')
);
