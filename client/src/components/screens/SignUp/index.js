import React, {useEffect, useState} from "react";
import "./SignUp.css";
import {RegisterValidation} from "../../Util/Validations";
import useForm from "../../CustomsHooks/useForm";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {signup} from "../../store/calls/Auth";

function SignUp() {
  const navigate = useNavigate();

  const handleNavigationToDashboardTodo = () => {
    navigate("/TodoDashboard");
  };
  const signupUser = async () => {
    try {
      let body = {
        name: values.fullname,
        email: values.email,
        password: values.password,
      };
      const response = await signup({body});

      handleNavigationToDashboardTodo();
    } catch (err) {
      console.error(err.message);
    }
  };
  const {values, errors, handleChange, handleFormSubmit} = useForm(signupUser);

  return (
    <div className="container-signup">
      <div className="form-signup">
        <h2 className="text-center title-signup mt-5">SignUp</h2>
        <form className="form-signup">
          <div className="name">
            <label className="lable">Full name</label>
            <input
              className="input"
              type="text"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <p className="error">{errors.fullname}</p>}
          </div>
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
            <button className="submit" onClick={handleFormSubmit}>
              Sign Up
            </button>
          </div>
          <div className="container mt-5">
            <p className="text-center">
              Already have an account? <Link to="/login"> Sign in</Link>
            </p>
            <p className="text-center mt-5">
              By creating an account you agree to our{" "}
              <a href="#">Terms & Privacy</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
