import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

type LogoutState = {
  shouldRedirectHome: boolean,
}

class Logout extends Component<any, LogoutState> {
  state: LogoutState = {
    shouldRedirectHome: false,
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

      this.setState({
        shouldRedirectHome: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { shouldRedirectHome } = this.state;

    if (shouldRedirectHome) {
      return (
        <Redirect to="/" />
      );
    }

    return null;
  }
}

export default Logout;
