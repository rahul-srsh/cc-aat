import axios from "axios";
import { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import LoginForm from "../components/Login/LoginForm";
import AuthContext from "../stored/auth-context";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authCxt = useContext(AuthContext);

  const histroy = useHistory();

  const submitRequest = async (email, password) => {
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL+"/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        console.log(res.data.expiresIn);
        const date = new Date(res.data.expiresIn);
        console.log(date.toISOString());
        authCxt.login(res.data.token, date.toISOString());
        histroy.replace("/list");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response);
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Error with Database");
        }
      });
  };
  return (
    <Fragment>
      {error && <p className="centered error">{error}</p>}
      <LoginForm submitRequest={submitRequest} loading={isLoading} />
    </Fragment>
  );
};

export default LoginPage;
