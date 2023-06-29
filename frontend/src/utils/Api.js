class Api {
  constructor(BASE_URL) {
    this.BASE_URL = BASE_URL
  }
  
  _getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      authorization: `Bearer ${token}`,
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
    return fetch(`${this.BASE_URL}/cards/${cardId}/likes`, {
      method: methodRequest, 
      headers: this._getHeaders()
    })
    .then(this._getJson)
  }

//добавление новой карточки
  addNewCard(data) {
    return fetch(`${this.BASE_URL}/cards`, {
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
    return fetch(`${this.BASE_URL}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._getHeaders()
      })
    .then(this._getJson)
  }
//Получение начального массива карт
  getInitialCards() {
    return fetch(`${this.BASE_URL}/cards`, {
      headers: this._getHeaders()
      })
    .then(this._getJson)
}
//Загрузка информации о пользователе
  getCurrentUser() {
    return fetch(`${this.BASE_URL}/users/me`, {
      headers: this._getHeaders()
      })
      .then(this._getJson)   
  }

//Обновление информации о пользователе на сервере
setUserInfo(data) {
  return fetch(`${this.BASE_URL}/users/me`, {
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
  return fetch(`${this.BASE_URL}/users/me/avatar`,{
    method: 'PATCH',
    headers: this._getHeaders(),
    body: JSON.stringify({
      avatar: data.avatar,
    })
  })
  .then(this._getJson)
  }
}
export const api = new Api('http://education-project.nomoreparties.sbs/api');