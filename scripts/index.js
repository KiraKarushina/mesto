// imports
import Card  from './Card.js';
import FormValidator  from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section  from './Section.js';
import UserInfo from './UserInfo.js';


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
// const cardsContainer = document.querySelector('#cards');
const popupAddCard = document.querySelector('#addCardPopup');
const formElementAddCard = document.querySelector('#addCardForm');
const inputNameElementAddCard = document.querySelector('#addCardInputName');
const inputLinkElementAddCard = document.querySelector('#addCardInputLink');
const cardTemplate = document.querySelector('#cardTemplate').content;

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

// Все cards здесь

const defaultCardList = new Section({
  data: defaultCards,
  renderer: (card) => {
      const cardElement = createCard(card);
      defaultCardList.addItem(cardElement);
  }
}, '#cards');

// экземпляр класса user

const userInfo = new UserInfo({
    name: profileInfoName.textContent,
    job: profileInfoJob.textContent
})

// экземпляр с попапом формы юзера

const popupWithProfileForm = new PopupWithForm('#profile',
(data) => {
     userInfo.setUserInfo(data.popup__input_name, data.popup__input_job);
     profileInfoName.textContent = data.popup__input_name;
     profileInfoJob.textContent = data.popup__input_job;
})

// экземпляр с попапом формы карты

const popupWithCardForm = new PopupWithForm('#addCardPopup',
(data) => {
    const card = new Card({name: data.name, link: data.link}, '#cardTemplate', handleCardClick);
    const cardElement = card.generateCard();
    defaultCardList.addItemUp(cardElement);
})

// экземпляр с попопам preview картинки

const popupWithImage = new PopupWithImage('#previewPopup')

// Обработчики событий на кнопки

profileEditButton.addEventListener("click", () => { 
    fillProfilePopup(userInfo.getUserInfo().name, userInfo.getUserInfo().job);
    popupWithProfileForm.open() } );

buttonAddCard.addEventListener('click',() => { popupWithCardForm.open() });


//обработчики событий на формы

popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithImage.setEventListeners();


function fillProfilePopup(name, job) {
    nameInputElement.value = name;
    jobInputElement.value = job;
}

function createCard(item) {
    const card = new Card(item, '#cardTemplate', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
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
    popupWithImage.open(name, link);
}

defaultCardList.renderer();
enableValidation(selectors);