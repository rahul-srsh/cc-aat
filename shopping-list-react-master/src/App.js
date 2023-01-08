import { Fragment, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Shopping from "./pages/Shopping";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AuthContext from "./stored/auth-context";

function App() {
  axios.interceptors.request.use(
    (config) => {
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Headers"] =
        "Origin, X-Requested-With, Content-Type, Accept";
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const authCxt = useContext(AuthContext);

  return (
    <Fragment>
      <MainNavigation />
      <main className="main-div">
        <Switch>
          <Route path="/" exact>
            {authCxt.isLoggedIn && <Redirect to="/list" />}
            {!authCxt.isLoggedIn && <Redirect to="/login" />}
          </Route>
          {authCxt.isLoggedIn && (
            <Route path="/list">
              <Shopping />
            </Route>
          )}
          {authCxt.isLoggedIn && (
            <Route path="/addItem">
              <AddItem />
            </Route>
          )}
          {authCxt.isLoggedIn && (
            <Route path="/edit/:id">
              <EditItem />
            </Route>
          )}
          {!authCxt.isLoggedIn && (
            <Route path="/login">
              <LoginPage />
            </Route>
          )}
          {!authCxt.isLoggedIn && (
            <Route path="/signUp">
              <SignUpPage />
            </Route>
          )}
          <Route path="*">
            {authCxt.isLoggedIn && <Redirect to="/list" />}
            {!authCxt.isLoggedIn && <Redirect to="/login" />}
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
