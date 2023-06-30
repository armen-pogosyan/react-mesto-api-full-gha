import React from 'react';
import { useNavigate, useLocation} from 'react-router-dom'; 

function Header(props) {
  const navigate = useNavigate()
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__user-panel">
        {props.loggedIn && <p className="header__link">{props.email}</p>}
        <button className="header__link-exit" 
          onClick={props.loggedIn ? props.signOut: (location.pathname ==="/signup" ? () => {navigate("/signin")}: () => {navigate("/signup")} )}>
          {props.loggedIn ? "Выйти": location.pathname ==="/signup" ? "Войти" : "Регистрация"}
        </button>
      </div>
    </header>
  );
}
export default Header;

