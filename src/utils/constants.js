//Buttons
export const profileEditButton = document.querySelector(".profile__info-edit");
export const buttonAddCard = document.querySelector('#addCardButton');

//Profile Popup
export const profilePopup = document.querySelector("#profile");
export const nameInputElement = profilePopup.querySelector(".popup__input_type_author");
export const jobInputElement = profilePopup.querySelector(".popup__input_type_job");
// //Profile Selector
export const profileInfoName = document.querySelector(".profile__info-name");
export const profileInfoJob = document.querySelector(".profile__info-job");

//Picture Popup
export const picturePopup = document.querySelector('#previewPopup');

// картинки для webpack
export const altay = new URL('../images/altay.jpg', import.meta.url);
export const baikal = new URL('../images/baikal.jpg', import.meta.url);
export const baltiiskoemore = new URL('../images/baltiiskoemore.jpg', import.meta.url)
export const adigeya = new URL('../images/adigeya.jpg', import.meta.url);
export const krasnayapolyana = new URL('../images/krasnayapolyana.jpg', import.meta.url);
export const uralskiegori = new URL('../images/uralskiegori.jpg', import.meta.url)


//Объект с названиями селекторов необходимых для валидации

export const selectors = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
}

// Все валидаторы форм в одном месте
export const formValidators = {};

// Список карточек по умолчанию.
export const defaultCards = [
    {
        name: 'Алтай',
        link: altay
    },
    {
        name: 'Байкал',
        link: baikal
    },
    {
        name: 'Балтийское море',
        link: baltiiskoemore
    },
    {
        name: 'Адыгея',
        link: adigeya
    },
    {
        name: 'Красная Поляна',
        link: krasnayapolyana
    },
    {
        name: 'Уральские горы',
        link: uralskiegori
    }
];
