export class Api {
  constructor({ userID, group, url }) {
    (this._userID = userID), (this._group = group), (this._url = url);
  }

  //'https://mesto.nomoreparties.co/v1/cohort-55/cards'

  getCards() {
    return fetch(`${this._url}/${this._group}/cards`, {
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }

  getProfile() {
    return fetch(`${this._url}/${this._group}/users/me`, {
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }

  updateProfile(name, about) {
    return fetch(`${this._url}/${this._group}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._userID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }

  addCard(name, link) {
    return fetch(`${this._url}/${this._group}/cards`, {
      method: "POST",
      headers: {
        authorization: this._userID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/${this._group}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }

  addLike(id) {
    return fetch(`${this._url}/${this._group}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}/${this._group}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }

  updateAvatar(link) {
    return fetch(`${this._url}/${this._group}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._userID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }
}
