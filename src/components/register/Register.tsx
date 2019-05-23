import axios from 'axios';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { Redirect, Link } from 'react-router-dom';

import styles from './Register.module.scss';

type RegisterState = {
  formSubmitted: boolean;
  shouldRedirectLogin: boolean;
  userName: string;
  email: string;
  password: string;
};

class Register extends Component<any, RegisterState> {
  state: RegisterState = {
    formSubmitted: false,
    shouldRedirectLogin: false,
    userName: '',
    email: '',
    password: '',
  }

  render() {
    const {
      formSubmitted,
      shouldRedirectLogin,
      userName,
      email,
      password,
    } = this.state;

    if (shouldRedirectLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div className={styles.background}>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-6">
              <div className={styles.contentWrapper}>
                <div className={styles.header}>
                  <h1>Create an account</h1>
                </div>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User name"
                      value={userName}
                      onChange={this.onChangeUserName}
                    />
                  </div>
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
                    disabled={formSubmitted}
                  >
                    Sign up
                </button>
                </form>
                <hr />
                <Link to="/login">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      userName: e.target.value,
    });
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
      userName,
      email,
      password,
    } = this.state;

    try {
      this.setState({
        formSubmitted: true,
      });

      await axios.post(
        '/user',
        {
          username: userName,
          email,
          password,
        },
      );

      this.setState({
        formSubmitted: false,
        shouldRedirectLogin: true,
      });
    } catch (error) {
      console.log(error);

      this.setState({
        formSubmitted: false,
      });
    }
  }
}

export default Register;
