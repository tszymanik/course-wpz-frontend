import axios from 'axios';
import React, {
  ChangeEvent,
  Component,
  FormEvent,
} from 'react';
import {
  Redirect,
  Link,
} from 'react-router-dom';

import styles from './Login.module.scss';

type LoginState = {
  formSubmitted: boolean;
  shouldRedirectHome: boolean;
  email: string;
  password: string;
};

class Login extends Component<any, LoginState> {
  state: LoginState = {
    formSubmitted: false,
    shouldRedirectHome: false,
    email: '',
    password: '',
  }

  render() {
    const {
      formSubmitted,
      shouldRedirectHome,
      email,
      password,
    } = this.state;

    if (shouldRedirectHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.background}>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-6">
              <div className={styles.contentWrapper}>
                <div className={styles.header}>
                  <h1>Hello</h1>
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
                    className="btn btn-primary d-block w-100"
                  >
                    Log in
                  </button>
                </form>
                <hr />
                <Link to="/register">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
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
      this.setState({
        formSubmitted: true,
      });

      const promise = await axios.post(
        '/auth/login',
        {
          email,
          password,
        }
      );

      const response = promise.data;
      const token = response['auth_token'];

      window.sessionStorage.setItem('token', token);

      this.setState({
        formSubmitted: false,
        shouldRedirectHome: true,
      });
    } catch (error) {
      console.log(error);

      this.setState({
        formSubmitted: false,
      });
    }
  }
}

export default Login;
