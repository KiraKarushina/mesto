import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(containerSelector) {
    super(containerSelector);
    this._picture = this._container.querySelector("#previewImage");
    this._pictureDescriptionPopup = this._container.querySelector(
      "#previewDescription"
    );
  }

  open(name, link) {
    this._picture.src = link;
    this._picture.alt = name;
    this._pictureDescriptionPopup.innerText = name;
    super.open();
  }
}
