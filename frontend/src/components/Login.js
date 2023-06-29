import React from 'react';
import './style/login.css'
import AuthForm from './AuthForm'
import {useFormAndValidation} from './hooks/useFormAndValidation'

function Login({loginUser, loggedIn}) {
  const {values, handleChange, errors} = useFormAndValidation({
    email: "",
    password: ""
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    loginUser(values);
  }
  

  return(
    <AuthForm 
      handleSubmit= {handleSubmit}
      title={"Войти"}
      handleChange={handleChange}
      values={values}
      loggedIn={loggedIn}
      errors={errors}
      buttonText={"Войти"}
    />
  )
}

export default Login