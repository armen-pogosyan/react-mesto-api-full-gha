
import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 
  
  function nameChange(e) {
    setName(e.target.value);
  }

  function descriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      >
      <input className="popup__input" type="text" value={name ?? ''} onChange={nameChange} id="name-text" name="popup-name-text" placeholder="Введите текст" minLength="2" maxLength="20" required />
      <span className="popup__input-error popup__input-error_field_name-text" ></span>
      <input className="popup__input" type="text" value={description ?? ''} onChange={descriptionChange} id="description-text" name="popup-description-text" placeholder="Введите текст" minLength="2" maxLength="200" required />
      <span className="popup__input-error popup__input-error_field_description-text"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
