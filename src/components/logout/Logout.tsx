import axios from 'axios';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link, Redirect } from 'react-router-dom';

type LogoutState = {
  completed: boolean,
}

class Logout extends Component<any, LogoutState> {
  state: LogoutState = {
    completed: false,
  }

  async componentDidMount() {
    try {
      const logoutResponse =  await axios.get(
        '/auth/logout',
        {
          headers: {
            Authorization: window.sessionStorage.getItem('token'),
          },
        },
      );

      console.log(logoutResponse);

      this.setState({
        completed: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { completed } = this.state;
    if (completed) {
      return (
        <Redirect to="/" />
      );
    }
    return <div></div>;
  }
}

export default Logout;
