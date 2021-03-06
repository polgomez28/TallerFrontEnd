import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/Header'
import App from './App';
import './App.css';
import './index.css';

import loginReducer from './redux/loginReducer';
import ventasReducer from './redux/ventasReducer';


import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './redux/authReducer';
import paquetesReducer from './redux/paquetesReducer';
import cantidadReduce from './redux/cantidadReduce';
import promocionarReducer from './redux/promocionarReduce';
import Dashboard from './componentes/Dashboard';

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    ventasReducer: ventasReducer,
    authReducer: authReducer,
    cantidadReduce: cantidadReduce,
    paquetesReducer: paquetesReducer,
    promocionarReducer: promocionarReducer
});
  
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
  );

ReactDOM.render(
  <React.StrictMode>
    <Header></Header>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
