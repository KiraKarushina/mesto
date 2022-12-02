export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._element = null;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__card')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like').addEventListener('click', (event) => {
            const className = 'elements__like_active';
            const classList = event.target.classList;
            classList.toggle(className);
        });

        this._element.querySelector('.elements__delete').addEventListener('click', (event) => {
            event.target.closest('.elements__card').remove();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('img');
        this._setEventListeners();
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._element.querySelector('.elements__card-text').innerText = this._name;
        return this._element;
    }
}

