import './style/login.css'
import {Link} from 'react-router-dom';

function AuthForm ({handleSubmit, title, handleChange, values, loggedIn, errors, buttonText}) {

  return (
    <>
    <div className="login">
      <h2 className="login__title">{title}</h2>
      <form onSubmit={handleSubmit} className="login__form" name="form-register" noValidate>
        <input className="login__input" placeholder="Email" required id="email" name="email" type="text" value={values.email} onChange={handleChange} minLength={3}/>
        <span className="login__input-error">{errors.email}</span>
        <input className="login__input" placeholder="Пароль" required  id="password" name="password" type="password" value={values.password} onChange={handleChange} minLength={3}/>
        <span className="login__input-error">{errors.password}</span>
        <button type="submit" className="login__button-submit">{buttonText}</button> 
      </form>
     {loggedIn&&<Link to="/register" className="signup__link">Уже зарегистрированы? Войти</Link>}
    </div>
    </>

  )
}

export default AuthForm