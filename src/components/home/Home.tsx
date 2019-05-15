import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';

type HomeState = {
  authenticated: boolean;
};

class Home extends Component<any, HomeState> {
  state: HomeState = {
    authenticated: false,
  };

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');

    if (token !== null) {
      this.setState({
        authenticated: true,
      });
    }
  }

  render() {
    const { authenticated } = this.state;
    if (authenticated) {
      return (
        <div>
          <Link to='/logout'>
            Logout
          </Link>
        </div>
      );
    }
    return null;
  }
}

export default Home;
