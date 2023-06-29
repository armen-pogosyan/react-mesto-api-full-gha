import Popup from './Popup'

function ImagePopup({card, onClose}) {
  return (
    <Popup isOpen={card.link? true : false} onClose={onClose} name="view-img">
      <div className="popup__content popup__content_view_img">
        <button className="popup__close-button" type ="button" onClick={onClose}></button>
        <img src={card.link} className="popup__image" alt={card.name} />
        <h2 className="popup__title-image">{card.name}</h2>
      </div>
    </Popup>
  )
}

export default ImagePopup