import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
      constructor(containerSelector, submitForm ) {
          super(containerSelector);
          this._form = this._container.querySelector(".form");
          this._submitForm = submitForm;
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
         this._InputValues = {};
         this._inputList.forEach(input => {
         this._InputValues[input.name] = input.value;
        });

         return this._InputValues;
    }

    _handleSubmitForm = (evt) => {
        evt.preventDefault();
        this._submitForm(this._getInputValues());
        this.close();
    }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._handleSubmitForm)
    }

    close() {
        super.close();
        this._form.reset();
    }
}