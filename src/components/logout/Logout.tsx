import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

type LogoutState = {
  shouldRedirectLogin: boolean,
}

class Logout extends Component<any, LogoutState> {
  state: LogoutState = {
    shouldRedirectLogin: false,
  }

  async componentDidMount() {
    try {
      await axios.get(
        '/auth/logout',
        {
          headers: {
            Authorization: window.sessionStorage.getItem('token'),
          },
        },
      );

      sessionStorage.removeItem('token');

      this.setState({
        shouldRedirectLogin: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { shouldRedirectLogin } = this.state;

    if (shouldRedirectLogin) {
      return (
        <Redirect to="/login" />
      );
    }

    return null;
  }
}

export default Logout;
