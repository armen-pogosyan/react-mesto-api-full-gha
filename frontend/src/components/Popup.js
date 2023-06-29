import { useEffect } from "react";
  const Popup = ({isOpen, onClose, name, children }) => {

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)

  }, [isOpen, onClose])

// создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
      <div className={`popup popup_type_${name}${isOpen ? " popup_opened":""}`} onClick={handleOverlay}>
        {children}     
    </div>
  );
};

export default Popup;