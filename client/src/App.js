import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import JokeList from './components/JokeList';

// Contexts
import { JokeContext } from '../src/contexts/JokeContext';
import { LoginContext } from '../src/contexts/LoginContext';

import './App.css';


function App() {
  const [jokes, setJokes] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  return (
    <Router>
      <div className="App">
        <LoginContext.Provider value={{ credentials, setCredentials }}>
          <JokeContext.Provider value={{ jokes, setJokes }}>
            <Route exact path="/" component={Login} />
            <Switch>
              <PrivateRoute exact path="/jokelist" component={JokeList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </JokeContext.Provider>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
