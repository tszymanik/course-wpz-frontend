import axios from 'axios';
import React, { ChangeEvent, Component, FormEvent } from 'react';

import styles from './Login.module.scss';

type LoginState = {
  email: string;
  password: string;
};

class Login extends Component<any, LoginState> {
  state: LoginState = {
    email: '',
    password: '',
  }

  render() {
    const {
      email,
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
    } catch (error) {
      console.log(error);
    }
  }
}

export default Login;
