import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Search from './components/Search/Search';

import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


const routing = (
  <Router>
      <React.StrictMode>
          <Switch>
              <Route exact path="/" component={App} />           
              <Route exact path="/search" component={Search} />
          </Switch>        
      </React.StrictMode>
  </Router>
  );
  
  ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
