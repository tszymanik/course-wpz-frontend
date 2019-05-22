import axios from 'axios';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import styles from './App.module.scss';
import TaskBrowser from './components/taskBrowser/TaskBrowser';

class App extends Component<any, any> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/new_job" component={Home} />
          <Route path="/pending_jobs" component={Home} />
          <Route path="/browser" component={TaskBrowser} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
