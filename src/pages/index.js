// imports
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButton,
  buttonAddCard,
  validationConfig,
  formValidators,
  buttonAvatar,
  myID,
} from "../utils/constants.js";
import { Api } from "../components/Api";

// экземпляр класса апи

const api = new Api({
  userID: myID,
  group: "cohort-55",
  url: "https://mesto.nomoreparties.co/v1",
});

// Все cards здесь

let cardsSection;
let currentCardForDelete;
let userInfo;

// экземпляр с попапом формы юзера

const popupWithProfileForm = new PopupWithForm("#profile", (data, popup) => {
  popupWithProfileForm.changeSubmitButtonText("Сохранение...");
  api
    .updateProfile(data._name, data._job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      userInfo.fillProfileOnPage();
      popupWithProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithProfileForm.changeSubmitButtonText("Сохранить");
    });
});

//экземпляр с попапом обновления аватара
const popupUpdatePicture = new PopupWithForm("#updateAvatarPopup", (data) => {
  popupUpdatePicture.changeSubmitButtonText("Сохранение...");
  api
    .updateAvatar(data.link)
    .then((res) => {
      userInfo.updateAvatar(res.avatar);
      popupUpdatePicture.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupUpdatePicture.changeSubmitButtonText("Сохранить");
    });
});

// экземпляр с попапом формы карты

const popupWithCardForm = new PopupWithForm("#addCardPopup", (data) => {
  popupWithCardForm.changeSubmitButtonText("Создание...");
  api
    .addCard(data.name, data.link)
    .then((res) => {
      const card = createCard(res);
      cardsSection.addItemUp(card);
      popupWithCardForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithCardForm.changeSubmitButtonText("Создать");
    });
});

// экземпляр с попопам preview картинки

const popupWithImage = new PopupWithImage("#previewPopup");

// экземпляр попапа удаление карточки

const popupWithDeleteConfirmation = new PopupWithForm(
  "#confirmPopup",
  (event) => {
    api
      .deleteCard(currentCardForDelete.getID())
      .then(() => {
        currentCardForDelete.delete();
        popupWithDeleteConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

// Обработчики событий на кнопки

profileEditButton.addEventListener("click", () => {
  popupWithProfileForm.setInputValues(userInfo);
  popupWithProfileForm.open();
});

buttonAddCard.addEventListener("click", () => {
  popupWithCardForm.open();
  formValidators["popup__content-card"].resetValidation();
});

buttonAvatar.addEventListener("click", () => {
  popupUpdatePicture.open();
});

//обработчики событий на формы

popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithImage.setEventListeners();
popupUpdatePicture.setEventListeners();
popupWithDeleteConfirmation.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#cardTemplate",
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userInfo.getID()
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    deleteLike(card);
  } else {
    addLike(card);
  }
}

function addLike(card) {
  api
    .addLike(card.getID())
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteLike(card) {
  api
    .deleteLike(card.getID())
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteClick(card) {
  currentCardForDelete = card;
  popupWithDeleteConfirmation.open();
}

Promise.all([api.getProfile(), api.getCards()])
  .then((res) => {
    userInfo = new UserInfo(
      res[0],
      ".profile__info-name",
      ".profile__info-job",
      "#profileImageId"
    );
    userInfo.fillProfileOnPage();
    userInfo.updateAvatar(res[0].avatar);
    cardsSection = new Section(
      {
        data: res[1],
        renderer: (card) => {
          const cardElement = createCard(card);
          cardsSection.addItem(cardElement);
        },
      },
      "#cards"
    );
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
