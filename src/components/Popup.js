export default class Popup {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  open() {
    this._container.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._container.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._container.addEventListener(
      "mousedown",
      this._handleClickOutsideClose
    );
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClickOutsideClose = (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  };
}
