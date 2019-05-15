import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from './Menu.module.scss';

export default class Menu extends Component {
    render() {
        return (
            <div>
                <div className="list-group">
                    <Link className="list-group-item list-group-item-action menu-link" to="/new_job">Order new job</Link>
                    <Link className="list-group-item list-group-item-action menu-link" to="/pending_jobs">Pending jobs</Link>
                    <Link className="list-group-item list-group-item-action menu-link" to="/browser">Browse results</Link>
                    <Link className="list-group-item list-group-item-action menu-link" to="/logout">Logout</Link>
                </div>
            </div>
        )
    }
}