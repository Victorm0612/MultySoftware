import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import NavBar from './Components/NavBar';

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar/>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>                    
          </Switch>
      </Router>
    </div>
  );
}

export default App;