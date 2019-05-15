import axios from 'axios';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';

import styles from './Login.module.scss';

type LoginState = {
  email: string;
  password: string;
  authenticated: boolean;
};

class Login extends Component<any, LoginState> {
  state: LoginState = {
    email: '',
    password: '',
    authenticated: false,
  }

  render() {
    const {
      email,
      password,
      authenticated,
    } = this.state;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className={styles.header}>
          <h1>Panel logowania</h1>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
            </button>
        </form>
      </div>
    );
  }

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      email,
      password,
    } = this.state;

    try {
      const loginResponseData = await axios.post(
        '/auth/login',
        {
          email,
          password,
        }
      );
  
      const loginData = loginResponseData.data;
      const { auth_token } = loginData;
      window.sessionStorage.setItem('token', auth_token);
      window.sessionStorage.setItem('email', email);

      this.setState({
        authenticated: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Login;
