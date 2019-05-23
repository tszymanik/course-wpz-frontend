import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.root}>
      <div className="container">
        <div className="d-flex">
          <ul className={styles.menu}>
          <li className={styles.menuItem}>
              <NavLink to="/" activeClassName={styles.active}>Home</NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink to="/add-task" activeClassName={styles.active}>Add task</NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink to="/tasks" activeClassName={styles.active}>Tasks</NavLink>
            </li>
          </ul>
          <ul className={styles.rightMenu}>
            <li className={styles.menuItem}>
              <NavLink to="/logout" activeClassName={styles.active}>Log out</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;