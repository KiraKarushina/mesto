import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(containerSelector, submitForm) {
    super(containerSelector);
    this._form = this._container.querySelector(".form");
    this._submitForm = submitForm;
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitForm);
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
