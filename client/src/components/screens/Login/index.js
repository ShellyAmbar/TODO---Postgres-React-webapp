import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useForm from "../../CustomsHooks/useForm";

import "./Login.css";

function Login() {
  const loginUser = async () => {
    handleNavigationToDashboardTodo();
  };
  const {handleChange, handleFormSubmit, values, errors} = useForm(loginUser);

  const handleNavigationToSignup = () => {};
  const handleNavigationToDashboardTodo = () => {};

  return (
    <div className="container-signup">
      <div className="form-signup">
        <h2 className="text-center title-signup mt-5">Login</h2>
        <form className="form-signup">
          <div className="email">
            <label className="lable">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="password">
            <label className="lable">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <button className="submit" onClick={() => handleFormSubmit()}>
              Login
            </button>
          </div>
          <div className="container mt-5">
            <p className="text-center">
              Don't have an account?
              <Link to="/signup"> Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
