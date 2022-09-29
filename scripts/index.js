// imports
import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";



//Buttons
const profileEditButton = document.querySelector(".profile__info-edit");
const buttonAddCard = document.querySelector('#addCardButton');

//Profile Popup
const profilePopup = document.querySelector("#profile");
const nameInputElement = profilePopup.querySelector(".popup__input_type_author");
const jobInputElement = profilePopup.querySelector(".popup__input_type_job");
const profileFormElement = profilePopup.querySelector(".popup__content-name");
//Profile Selector
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoJob = document.querySelector(".profile__info-job");

//Picture Popup
const picturePopup = document.querySelector('#previewPopup');
const picture = picturePopup.querySelector('#previewImage');
const pictureDescriptionPopup = document.querySelector('#previewDescription');

//Cards
const cardsContainer = document.querySelector('#cards');
const popupAddCard = document.querySelector('#addCardPopup');
const formElementAddCard = document.querySelector('#addCardForm');
const inputNameElementAddCard = document.querySelector('#addCardInputName');
const inputLinkElementAddCard = document.querySelector('#addCardInputLink');
const cardTemplate = document.querySelector('#cardTemplate').content;


// Обработчики событий

profileEditButton.addEventListener("click", openProfilePopup);
profileFormElement.addEventListener("submit", handleFormSubmit);
buttonAddCard.addEventListener('click',openAddCardPopup);
formElementAddCard.addEventListener('submit',addCardFormSubmitHandler);


//Объект с названиями селекторов необходимых для валидации

const selectors = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
}

// Все валидаторы форм в одном месте
const formValidators = {};

// Список карточек по умолчанию.
const defaultCards = [
    {
        name: 'Алтай',
        link: './images/altay.jpg'
    },
    {
        name: 'Байкал',
        link: './images/baikal.jpg'
    },
    {
        name: 'Балтийское море',
        link: './images/baltiiskoemore.jpg'
    },
    {
        name: 'Адыгея',
        link: './images/adigeya.jpg'
    },
    {
        name: 'Красная Поляна',
        link: './images/krasnayapolyana.jpg'
    },
    {
        name: 'Уральские горы',
        link: './images/uralskiegori.jpg'
    }
];

// Common moethods

function openPopup(htmlPopupElement) {
    htmlPopupElement.classList.add("popup_opened");
    htmlPopupElement.addEventListener("mousedown", handleClickOutsidePopup);
    document.addEventListener("keydown", handleEscapePressPopup);
}   

function closePopup(htmlPopupElement) {
    htmlPopupElement.classList.remove("popup_opened");
    htmlPopupElement.removeEventListener("mousedown", handleClickOutsidePopup);
    document.removeEventListener("keydown", handleEscapePressPopup);
}

function handleClickOutsidePopup(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) { 
      closePopup(evt.currentTarget); 
    }; 
}

function handleEscapePressPopup(evt) {
        if(evt.key === 'Escape') {
            const popup = document.querySelector('.popup_opened');
            closePopup(popup);
        }
}

// Profile popup methods

function openProfilePopup () {
    openPopup(profilePopup);
    fillProfilePopup();
}

function fillProfilePopup() {
    nameInputElement.value = profileInfoName.textContent;
    jobInputElement.value = profileInfoJob.textContent;
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameInput = nameInputElement.value;
    const jobInput = jobInputElement.value;

    profileInfoName.textContent = nameInput;
    profileInfoJob.textContent = jobInput;
    closePopup(profilePopup);
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();

    renderCard({name: inputNameElementAddCard.value, link: inputLinkElementAddCard.value}, true);
    closePopup(popupAddCard);
    evt.target.reset()
    formValidators['popup__content-card'].resetValidation();
}

function renderCard(item, prepend = false) {
    const cardElement = createCard(item);
    if (prepend) {
        cardsContainer.prepend(cardElement);
    } else {
        cardsContainer.append(cardElement);
    }
}

function createCard(item) {
    const card = new Card(item, '#cardTemplate', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}


function openAddCardPopup() {
    openPopup(popupAddCard);
}


function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

function handleCardClick(name, link) {
    this._cardImage.alt = name;
    this._cardImage.src = link;
    picture.src = link;
    picture.alt = name;
    pictureDescriptionPopup.innerText = name;
    openPopup(picturePopup);
}


defaultCards.forEach((card) => {
    renderCard(card);
})

fillProfilePopup();
enableValidation(selectors);