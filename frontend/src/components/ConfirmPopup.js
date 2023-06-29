import React from 'react';
import PopupWithForm from './PopupWithForm';


function PopupConfirm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm 
    name='confirm'
    title='Вы уверены'
    buttonText='Да'
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
  </PopupWithForm>
  )
}

export default PopupConfirm