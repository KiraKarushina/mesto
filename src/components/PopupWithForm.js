import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(containerSelector, handleSubmit) {
    super(containerSelector);
    this._form = this._container.querySelector(".form");
    this._submitButton = this._container.querySelector(".popup__submit");
    this._handleSubmit = handleSubmit;
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
    this._handleSubmit(this._getInputValues());
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

  changeSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
