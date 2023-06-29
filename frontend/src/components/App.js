import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import ImagePopup from './ImagePopup.js'
import {api} from '../utils/Api.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import {CardsContext} from '../contexts/CardsContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ConfirmPopup from './ConfirmPopup.js'
import Login from './Login.js';
import InfoTooltip from './/InfoTooltip.js';
import Register from './Register.js';
import {Route, Routes, useNavigate} from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import  * as auth from '../utils/auth';
import errorImg from '../images/Error.png';
import successfullyImg  from'../images/Union.png'

function App() {
  const navigate = useNavigate()
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)

  const [InfoTooltipData, setInfoTooltipData] = React.useState({
    isInfoTooltip:false,
    imgSrc: "",
    tooltipText : ""
  })
  
  const [removeCard, setRemoveCard] = React.useState({})
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, getCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)

  function registerUser({email, password}) {
    auth.register(password, email)
    .then(() => {
      navigate('/sign-in', {replace: true})
      setInfoTooltipData({
        isInfoTooltip:true,
        imgSrc: successfullyImg,
        tooltipText : "Вы успешно зарегистрировались!"
      })
    })
    .catch(err => {
      console.log(err)
      setInfoTooltipData({
        isInfoTooltip:true,
        imgSrc: errorImg,
        tooltipText : "Что-то пошло не так! Попробуйте еще раз."
      })
    })
  }

  function loginUser({email, password}) {
   auth.authorize(password, email)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true)
        navigate('/', {replace: true});
      }
    })
    .catch(err => {
      console.log(err)
      setInfoTooltipData({
        isInfoTooltip:true,
        imgSrc: errorImg,
        tooltipText : "Что-то пошло не так! Попробуйте еще раз."
      })
    })
  }

  React.useEffect(() => {
    if (!localStorage.getItem('jwt')){
      setIsLoading(false)
      return
    }
    const jwt = localStorage.getItem('jwt');
    auth.checkToken(jwt)
    .then((res) => {
      if (res){
        setLoggedIn(true);
        navigate("/", {replace: true})
        setEmail(res.data.email)
      }
    })
    .catch(err => {
      console.log(err)
    })
    .finally(()=>{
      setIsLoading(false)
    } 
    );
  } ,[loggedIn])

  function signOut(){ //Выход из системы
    localStorage.removeItem('jwt');
    setLoggedIn(false)
    navigate("/sign-in", {replace: true})
  }

React.useEffect(() => {
  if (localStorage.getItem('jwt')) {
    Promise.all([
      api.getInitialCards(),
      api.getCurrentUser()
    ])
    .then(([result, user]) => {
      getCurrentUser(user)
      console.log(result)
      setCards(result)
    })
    .catch(err => {
      console.log(err)
    })
  }
}, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch(err => {
      console.log(err)
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(()=> {
      setCards((state) => state.filter((c) => c._id !== card._id))
      closeAllPopups()
    })
    .catch(err => {
      console.log(err)
    })
  }

  function handleConfirmOpen(card) {
    setIsConfirmPopupOpen(true)
    setRemoveCard(card)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard({})
    setRemoveCard({})
    setInfoTooltipData({
      isInfoTooltip:false,
      imgSrc:"",
      tooltipText : ""
    })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((user) => {
      getCurrentUser(user)
      closeAllPopups()
    })
    .catch(err => {
      console.log(err)
    })
    }

  function handleUpdateAvatar(data){ //обновление аватара
    api.setUserAvatar(data)
    .then((user) => {
      getCurrentUser(user)
      closeAllPopups()
    })
    .catch(err => {
      console.log(err)
    })
  }

  function handleAddPlaceSubmit(data) { //добавление новой карточки
    api.addNewCard(data)
    .then((newCard)=> {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch(err => {
      console.log(err)
    })
  }

  if (isLoading) {
    return (
      null
    )
  }

  return (
    <div className="page">
      <Header loggedIn={loggedIn}  signOut={signOut} email={email} />
      <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
      <Routes>
        <Route path="/sign-in" element={<Login loggedIn={loggedIn}loginUser={loginUser}/>} />
        <Route path="/sign-up" element={<Register loggedIn={loggedIn} registerUser={registerUser}/>} />
        <Route path="/" element={<ProtectedRouteElement element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onConfirm={handleConfirmOpen}
            onClose={closeAllPopups}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}/>}/>
       </Routes>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} card={removeCard}/>
        <InfoTooltip 
          isOpen={InfoTooltipData.isInfoTooltip} 
          onClose={closeAllPopups}
          name='infoTooltip'
          tooltipText={InfoTooltipData.tooltipText}
          imgSrc={InfoTooltipData.imgSrc}
        />
      </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
