import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useForm from "../../CustomsHooks/useForm";
import {useNavigate} from "react-router-dom";
import {login} from "../../store/calls/Auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const loginUser = async () => {
    try {
      let body = {
        email: values.email,
        password: values.password,
      };
      const response = await login({body});

      handleNavigationToDashboardTodo();
    } catch (err) {
      console.error(err.message);
    }
  };
  const {handleChange, handleFormSubmit, values, errors} = useForm(loginUser);

  const handleNavigationToDashboardTodo = () => {
    navigate("/TodoDashboard");
  };

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
