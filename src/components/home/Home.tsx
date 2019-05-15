import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';
import Menu from '../menu/Menu';

type HomeState = {
  authenticated: boolean;
  email: string;
};

class Home extends Component<any, HomeState> {
  state: HomeState = {
    authenticated: false,
    email: '',
  };

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    const email = window.sessionStorage.getItem('email');

    if (token !== null && email !== null) {
      this.setState({
        authenticated: true,
        email,
      });
    }
  }

  render() {
    const { authenticated, email } = this.state;
    if (authenticated) {
      return (
        <div>
          <h1>Hello, {email}</h1>
          <Menu />
        </div>
      );
    }
    return null;
  }
}

export default Home;
