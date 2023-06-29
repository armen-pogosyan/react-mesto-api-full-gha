const BASE_URL = 'http://education-project.nomoreparties.sbs/api';

class Api {
  constructor(token, cohort) {
    this._token = token;
    this._cohort = cohort;
  }
  
  _getHeaders() {
    return {
      authorization: this._token,
      'Content-Type': 'application/json'
    }   
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // Запрос установка/снятие лайка
  changeLikeCardStatus(cardId, liked) {
    let methodRequest;
    if (!liked) {
      methodRequest ='PUT';}
    else {
      methodRequest ='DELETE'
    }  
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: methodRequest, 
      headers: this._getHeaders()
    })
    .then(this._getJson)
  }

//добавление новой карточки
  addNewCard(data) {
    return fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._getJson)
    
  }

  //УдалениеКарточки
  deleteCard(idCard) {
    return fetch(`${BASE_URL}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._getHeaders()
      })
    .then(this._getJson)
  }
//Получение начального массива карт
  getInitialCards() {
    return fetch(`${BASE_URL}/cards`, {
      headers: this._getHeaders()
      })
    .then(this._getJson)
}
//Загрузка информации о пользователе
  getCurrentUser() {
    return fetch(`${BASE_URL}/users/me`, {
      headers: this._getHeaders()
      })
      .then(this._getJson)   
  }

//Обновление информации о пользователе на сервере
setUserInfo(data) {
  return fetch(`${BASE_URL}/users/me`, {
     method: 'PATCH',
     headers: this._getHeaders(),
     body: JSON.stringify({
       name: data.name,
       about: data.about
     })
   })
   .then(this._getJson)
 }

//Обновление аватара
setUserAvatar(data) {
  return fetch(`${BASE_URL}/users/me/avatar`,{
    method: 'PATCH',
    headers: this._getHeaders(),
    body: JSON.stringify({
      avatar: data.avatar,
    })
  })
  .then(this._getJson)
  }
}
export const api = new Api('c7bb59bd-fa7f-49d9-ae13-0f28841d7131', 'cohort-61');