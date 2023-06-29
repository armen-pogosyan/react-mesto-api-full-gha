function InfoTooltip(props) {
  
  return (
    <div className={`popup popup_type_${props.name}${props.isOpen ? " popup_opened":""}`}>
        <div className="popup__content">
          <button className="popup__close-button" type ="button"  onClick={props.onClose}></button>
          <img className="popup__tooltip-image" src={props.imgSrc}/>
          <p className="popup__tooltip-label">{props.tooltipText}</p>
        </div>
    </div>
  )
}

export default InfoTooltip