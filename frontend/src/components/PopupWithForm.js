import Popup from './Popup'

function PopupWithForm({name, title, buttonText, isOpen, onClose, onSubmit, children}) {
  
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__content">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close-button" type ="button"  onClick={onClose}></button>
        <form className="popup__form popup__form-edit" name={`form-${name}`} onSubmit={onSubmit} noValidate> 
          {children}
        <button className="popup__button-save" type ="submit">{buttonText}</button>
        </form>
      </div> 
    </Popup>
  )
}

export default PopupWithForm