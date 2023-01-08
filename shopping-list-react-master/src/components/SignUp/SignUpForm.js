import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./SignUpForm.module.css";

const SignUpForm = (props) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(props.loading);
  }, [props.loading]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    console.log("Email " + enteredEmail);
    console.log("Password " + enteredPassword);
    console.log("Name " + enteredName);
    console.log("Confirm Password " + enteredConfirmPassword);
    if (
      enteredEmail === "" ||
      enteredPassword === "" ||
      enteredConfirmPassword === "" ||
      enteredName === ""
    ) {
      setError("Please enter all inputs!");
      return;
    }
    if (enteredConfirmPassword !== enteredPassword) {
      setError("Password and confirm passord do not match!");
      return;
    }
    if (enteredPassword.length < 6) {
      setError("Password is less than 6 characters!");
      return;
    }
    props.submitRequest(enteredName, enteredEmail, enteredPassword);
  };

  return (
    <Fragment>
      <div className={classes.card}>
        {error && <p className="error">{error}</p>}
        <form className={classes.form} onSubmit={formSubmitHandler}>
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <h2>Register</h2>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className={classes.nameInput}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordInputRef}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              ref={confirmPasswordInputRef}
              required
            />
          </div>
          <div className={classes.loginSpan}>
            <Link to="/login">Already have a account?</Link>
          </div>
          <div className={classes.actions}>
            <button className="btn">Register</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUpForm;
