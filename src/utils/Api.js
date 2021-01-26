class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResponseData(res) {
        if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getProfile() {
        return fetch(`${this._url}users/me`, {
            headers: this._headers
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    updateProfile(data) {
        return fetch(`${this._url}users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(data)
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    changeAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(data)
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    postCard(data) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: `${isLiked ? "PUT" : "DELETE"}`,
            headers: this._headers,
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    removeCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            return this._getResponseData(res);
        })
    }
}

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        authorization: "e879a6b8-e74b-4471-9f27-351cc1bff765",
        "content-type": "application/json",
    }
});

export default api;