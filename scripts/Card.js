export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._element = null;
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
    }


    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const image = this._element.querySelector('img');
        image.alt = this._name;
        image.src = this._link;
        this._element.querySelector('.elements__card-text').innerText = this._name;
        return this._element;
    }
}
