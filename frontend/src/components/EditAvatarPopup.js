import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm 
      name='edit-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input" ref={inputRef} id="link-image-avatar" name="popup-link-image" placeholder="Ссылка на картинку" type="url" required />
      <span className="popup__input-error popup__input-error_field_link-image-avatar" ></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup