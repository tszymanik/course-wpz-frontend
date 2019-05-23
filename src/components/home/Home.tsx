import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';

import Header from '../header/Header';
import styles from './Home.module.scss';

type User = {
  id: string;
  userName: string;
  email: string;
  createdDate: Date | null,
  lastLogin: Date | null;
};

type HomeState = {
  authenticated: boolean;
  user: User;
};

class Home extends Component<any, HomeState> {
  state: HomeState = {
    authenticated: false,
    user: {
      id: '',
      userName: '',
      email: '',
      createdDate: null,
      lastLogin: null,
    },
  };

  async componentDidMount() {
    const token = window.sessionStorage.getItem('token');

    if (token !== null) {
      this.setState({
        authenticated: true,
      });

      const response = await axios.get(
        '/auth/status',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      const data = response.data.data;

      const user: User = {
        id: data.id,
        userName: data['username'],
        email: data.email,
        createdDate: moment(data['created_date']).toDate(),
        lastLogin: moment(data['last_login_date']).toDate(),
      };

      this.setState({
        user,
      });
    }
  }

  render() {
    const {
      authenticated,
      user,
    } = this.state;
    if (authenticated) {
      return (
        <>
          <Header />
          <div className="container">
            <div className={styles.content}>
              <h1 className={styles.heading}>Hello, {user.userName}</h1>
              <div className={styles.account}>
                <p>Your account:</p>
                <ul>
                  <li>Id: {user.id}</li>
                  <li>Email: {user.email}</li>
                  <li>Created: {user.createdDate !== null &&
                    moment(user.createdDate).format('YYYY-MM-DD HH:mm')}</li>
                  <li>Last login: {user.lastLogin !== null &&
                    moment(user.lastLogin).format('YYYY-MM-DD HH:mm')}</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      );
    }
    return null;
  }
}

export default Home;
