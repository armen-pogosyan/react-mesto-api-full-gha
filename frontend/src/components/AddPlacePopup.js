import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState("")
  const [link, setLink] = React.useState("")

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
    }, [props.isOpen]);

  return (
    <PopupWithForm 
    name='add-image'
    title='Новое место'
    buttonText='Сохранить'
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <input className="popup__input" value={name ?? ''} onChange={e => setName(e.target.value)} id="name-image" name="popup-name-image" placeholder="Название"  minLength="2" maxLength="30" required/>
    <span className="popup__input-error popup__input-error_field_name-image"></span>
    <input className="popup__input" value={link ?? ''} onChange={e => setLink(e.target.value)} id="link-image" name="popup-link-image" placeholder="Ссылка на картинку" type="url" required/>
    <span className="popup__input-error popup__input-error_field_link-image" ></span>
  </PopupWithForm>
  )
}

export default AddPlacePopup