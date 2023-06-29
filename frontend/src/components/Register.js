import React from 'react';
import './style/login.css'
import AuthForm from './AuthForm'
import {useFormAndValidation} from './hooks/useFormAndValidation'

function Register({registerUser, loggedIn}) {
  const {values, handleChange, errors} = useFormAndValidation({
    email: "",
   password: ""
 });

  const handleSubmit = (e)=>{
    e.preventDefault();
      registerUser(values)
  }

  return(
    <AuthForm 
    handleSubmit= {handleSubmit}
    title={"Регистрация"}
    handleChange={handleChange}
    values={values}
    loggedIn={loggedIn}
    errors={errors}
    buttonText={"Зарегистрироваться"}
  />
  )
}

export default Register