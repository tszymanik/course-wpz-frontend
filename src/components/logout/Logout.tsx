import axios from 'axios';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link, Redirect } from 'react-router-dom';

import styles from './Login.module.scss';

type Status = {
    completed: Boolean,
    error: any
}

class Logout extends Component<any, Status> {

    state: Status = {
        completed: false,
        error: null
    }

    render() {
        if (this.state.completed && !this.state.error) {
            return (
                <div>
                    <Redirect to="/" />
                </div>
            );
        } else {
            return (
                <div>
                    {this.state.error}
                </div>
            )
        }
    }

    async componentDidMount() {

        try {
            const response = await axios.post(`/auth/logout`, {}, {
                headers: {
                    'Authorization': window.sessionStorage.getItem('token')
                }
            })

            console.log(response);
            if (response.status != 200)
                throw response;
        } catch (err) {
            console.error(err);
            this.setState({
                error: err
            })
        } finally {
            this.setState({
                completed: true
            })
        }

    }
}

export default Logout;
