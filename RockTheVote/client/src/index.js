import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import{BrowserRouter} from 'react-router-dom'
import UserProvider from './Context/UserContext'

ReactDOM.render(
  <BrowserRouter>
   <UserProvider/>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
