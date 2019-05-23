import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import AddTask from './components/add-task/AddTask';
import Tasks from './components/tasks/Tasks';

class App extends Component<any, any> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/add-task" component={AddTask} />
          <Route path="/tasks" component={Tasks} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
