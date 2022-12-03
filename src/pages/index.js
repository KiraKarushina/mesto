// imports
import '../pages/index.css'
import Card  from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import Popup from '../components/Popup';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section  from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
    profileEditButton,
    profileInfoName,
    profileInfoJob,
    buttonAddCard,
    selectors,
    formValidators,
    defaultCards
} from '../utils/constants.js';


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
    userInfo.setUserInfo(data._name, data._job);
    const info = userInfo.getUserInfo();
    fillProfileOnPage(info) 
})


// экземпляр с попапом формы карты

const popupWithCardForm = new PopupWithForm('#addCardPopup',
(data) => {
    const card = createCard({name: data.name, link: data.link});
    defaultCardList.addItemUp(card);
})

// экземпляр с попопам preview картинки

const popupWithImage = new PopupWithImage('#previewPopup');

// Обработчики событий на кнопки

profileEditButton.addEventListener("click", () => { 
    popupWithProfileForm.setInputValues(userInfo);
    popupWithProfileForm.open() } );

buttonAddCard.addEventListener('click',() => { 
    popupWithCardForm.open();
    formValidators['popup__content-card'].resetValidation();
 });


//обработчики событий на формы

popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithImage.setEventListeners();


function fillProfileOnPage(data) {
     profileInfoName.textContent = data.name;
     profileInfoJob.textContent = data.job;
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