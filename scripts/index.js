// imports
import * as validate from './validate.js';


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
  errorClass: 'form__error_active'
}

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

function resetForm(element) {
    const currentForm = element.querySelector('.form');
     if (currentForm) {
        currentForm.reset();
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

function handleFormSubmit (evt) {
    evt.preventDefault();

    const nameInput = nameInputElement.value;
    const jobInput = jobInputElement.value;

    profileInfoName.textContent = nameInput;
    profileInfoJob.textContent = jobInput;
    closePopup(profilePopup);
    resetForm(profilePopup);
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();

    renderCard(inputNameElementAddCard.value, inputLinkElementAddCard.value, true);
    closePopup(popupAddCard);
    inputNameElementAddCard.value = '';
    inputLinkElementAddCard.value = '';
    resetForm(popupAddCard);
}

function renderCard(name, link, prepend = false) {
    const card = createCard(name, link);
        if (prepend) {
            cardsContainer.prepend(card);
        } else {
            cardsContainer.append(card);
        }
}

function openAddCardPopup () {
    openPopup(popupAddCard);
    setButttonStateForAddCardForm();
}



function createCard(name, link) {
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);

    const image = card.querySelector('img');
    image.alt = name;
    image.src = link;

    image.addEventListener('click', (event) => {
        const clickedPicture = event.target;
        picture.src = clickedPicture.src;
        picture.alt = name;
        pictureDescriptionPopup.innerText = clickedPicture.alt;
        openPopup(picturePopup);
    });

    const cardText = card.querySelector('.elements__card-text');
    cardText.innerText = name;


    card.querySelector('.elements__like').addEventListener('click', (event) => {
        const className = 'elements__like_active';
        const classList = event.target.classList;
        classList.toggle(className);
    });

    card.querySelector('.elements__delete').addEventListener('click', (event) => {
        event.target.closest('.elements__card').remove();
    });

    return card;
}

function setButttonStateForAddCardForm() {
    const inputList = Array.from(formElementAddCard.querySelectorAll('.popup__input'));
    const buttonElement = formElementAddCard.querySelector('.popup__submit');
    validate.toggleButtonState(inputList, buttonElement, selectors);
}


defaultCards.forEach((card)=> {
    renderCard(card.name, card.link);
})

fillProfilePopup();
validate.enableValidation(selectors);

