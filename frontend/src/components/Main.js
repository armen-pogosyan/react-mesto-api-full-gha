import React from 'react';
import Footer from './Footer.js'
import Card from './Card.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import {CardsContext} from '../contexts/CardsContext.js'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards =  React.useContext(CardsContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар пользователя"/>
          <div className="profile__edit-avatar"></div>
          <div className="profile__background"></div>
        </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-button" type ="button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__text">{currentUser.about}</p> 
          </div>
          <button className="profile__add-button" type ="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements-list"> 
            {cards.map(card => {
              const isOwn = card.owner._id === currentUser._id;
              const isLiked = card.likes.some(i => i._id === currentUser._id);
              return(<Card key={card._id} card={card} onCardClick={props.onCardClick} isOwn={isOwn} isLiked={isLiked} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onConfirm={props.onConfirm}/>)
            })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main