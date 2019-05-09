import React, {
  Component,
  ChangeEvent,
  FormEvent,
} from 'react';

import styles from './App.module.scss';

import { BACKEND_URL } from './STATIC.js';

type AppState = {
  login: string;
  password: string;
};

class App extends Component<any, AppState> {
  state: AppState = {
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

    fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: login,
        password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
        if (!response.ok)
          throw response;
        return response.json();
      })
      .then(json => {
        const { auth_token } = json;
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

export default App;
