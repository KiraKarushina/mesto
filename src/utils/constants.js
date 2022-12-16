//Buttons
export const profileEditButton = document.querySelector(".profile__info-edit");
export const buttonAddCard = document.querySelector("#addCardButton");
export const buttonAvatar = document.querySelector("#profileImageId");
export const previewPictureAvatar = document.querySelector("#imageCoverId");

// картинки для webpack
export const altay = new URL("../images/altay.jpg", import.meta.url);
export const baikal = new URL("../images/baikal.jpg", import.meta.url);
export const baltiiskoemore = new URL(
  "../images/baltiiskoemore.jpg",
  import.meta.url
);
export const adigeya = new URL("../images/adigeya.jpg", import.meta.url);
export const krasnayapolyana = new URL(
  "../images/krasnayapolyana.jpg",
  import.meta.url
);
export const uralskiegori = new URL(
  "../images/uralskiegori.jpg",
  import.meta.url
);

//Объект с названиями селекторов необходимых для валидации

export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
};

// Все валидаторы форм в одном месте
export const formValidators = {};

export const myID = "de4b4af5-28f7-4745-a92a-098774d4c53a";
