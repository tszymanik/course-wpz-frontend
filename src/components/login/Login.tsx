import axios from 'axios';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';

import styles from './Login.module.scss';

type LoginState = {
  login: string;
  password: string;
};

class Login extends Component<any, LoginState> {
  state: LoginState = {
    login: '',
    password: '',
  }

  render() {
    const {
      login,
      password,
    } = this.state;

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
              value={login}
              onChange={this.onChangeLogin}
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

  onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      login: e.target.value,
    });
  }

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const {
      login,
      password,
    } = this.state;

    axios.post(`/auth/login`, {
      email: login,
      password
    })
      .then(response => {
        console.log(response);
        if (response.status != 200)
          throw response;
        const { auth_token } = response.data;
        localStorage.setItem('token', auth_token);
      })
      .catch(err => {
        console.error(err);
      })

    console.log({
      login,
      password,
    });
  }
}

export default Login;
