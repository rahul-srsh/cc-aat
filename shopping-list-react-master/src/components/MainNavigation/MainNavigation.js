import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../stored/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCxt = useContext(AuthContext);

  const isLoggedIn = authCxt.isLoggedIn;

  const logoutHandler = () => {
    authCxt.logout();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Heart Disease</div>
      <nav className={classes.nav}>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/login" activeClassName={classes.active}>
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <Fragment>
              <li>
                <NavLink to="/list" activeClassName={classes.active}>
                  List
                </NavLink>
              </li>
              <li>
                <NavLink to="/addItem" activeClassName={classes.active}>
                  Add Item
                </NavLink>
              </li>
              <li>
                <button className={classes.btn} onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
