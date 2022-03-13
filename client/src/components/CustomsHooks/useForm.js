import React, {useEffect, useState} from "react";
import {RegisterValidation} from "../Util/Validations";

const useForm = (callback) => {
  const [values, setValues] = useState({fullname: "", email: "", password: ""});
  const [errors, setErrors] = useState({});

  const [submitForm, setSubmitForm] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors(RegisterValidation(values));
    setSubmitForm(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitForm) {
      callback();
    } else {
      setSubmitForm(false);
    }
  }, [errors]);

  return {values, errors, handleChange, handleFormSubmit};
};
export default useForm;
