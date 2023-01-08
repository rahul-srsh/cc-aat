import SignUpForm from "../components/SignUp/SignUpForm";
import axios from "axios";
import { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../stored/auth-context";

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authCxt = useContext(AuthContext);

  const histroy = useHistory();

  const submitRequest = async (name, email, password) => {
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL+"/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        const date = new Date(res.data.expiresIn);
        console.log(date.toISOString());
        authCxt.login(res.data.token, date.toISOString());
        histroy.replace("/list");
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.message) {
          setIsLoading(false);
          setError(error.response.data.message);
        } else {
          setError("Error with Database");
        }
      });
  };
  return (
    <Fragment>
      {error && <p className="error centered">{error}</p>}
      <SignUpForm submitRequest={submitRequest} loading={isLoading} />
    </Fragment>
  );
};

export default SignUpPage;
