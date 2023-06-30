import React from 'react';
function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  } 

  function likeClick() {
    props.onCardLike(props.card);
  } 

  function openConfirm(){
    props.onConfirm(props.card)
  }

  return (
    <li className="element">
      <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleClick}/>
      {props.isOwn && <button className="element__remove" type ="button" onClick={openConfirm}/>} 
      <div className="element__group">
        <p className="element__title">{props.card.name}</p>
        <div>
          <button className={`element__like-button ${props.isLiked && 'element__like-button_status_active'}`} type ="button" onClick={likeClick}></button>
          <p className="element__counter">{props.card.likes.length}</p>
        </div>  
      </div>
    </li>
  )
}

export default Card