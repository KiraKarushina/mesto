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
  profileInfoName,
  profileInfoJob,
  buttonAddCard,
  selectors,
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

let serverCards = [];
let currentCardForDelete;

// экземпляр класса user
// Получаем данные о profile  с сервера и обновляем страницу

let userInfo;
api
  .getProfile()
  .then((res) => {
    userInfo = new UserInfo({
      name: res.name,
      job: res.about,
      id: res._id,
    });
    fillProfileOnPage(userInfo.getUserInfo());
    buttonAvatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

// экземпляр с попапом формы юзера

const popupWithProfileForm = new PopupWithForm("#profile", (data) => {
  api
    .updateProfile(data._name, data._job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      const info = userInfo.getUserInfo();
      fillProfileOnPage(info);
    })
    .catch((err) => {
      console.log(err);
    });
});

//экземпляр с попапом обновления аватара
const popupUpdatePicture = new PopupWithForm("#updateAvatarPopup", (data) => {
  api
    .updateAvatar(data.link)
    .then((res) => {
      buttonAvatar.src = res.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
});

// экземпляр с попапом формы карты

const popupWithCardForm = new PopupWithForm("#addCardPopup", (data) => {
  api
    .addCard(data.name, data.link)
    .then((res) => {
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        owner: res.owner,
        _id: res._id,
      });
      serverCards.addItemUp(card);
    })
    .catch((err) => {
      console.log(err);
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

function fillProfileOnPage(data) {
  profileInfoName.textContent = data.name;
  profileInfoJob.textContent = data.job;
}

function createCard(item) {
  const card = new Card(
    item,
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

function getCardsFromServer() {
  api
    .getCards()
    .then((res) => {
      console.log(res);
      serverCards = new Section(
        {
          data: res,
          renderer: (card) => {
            const cardElement = createCard(card);
            serverCards.addItem(cardElement);
          },
        },
        "#cards"
      );
      serverCards.renderer();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleLikeClick(card) {
  if (card._likes.some((element) => element._id === userInfo.getID())) {
    deleteLike(card);
  } else {
    addLike(card);
  }
}

function addLike(card) {
  api
    .addLike(card.getID())
    .then((res) => {
      card.setLike(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteLike(card) {
  api
    .deleteLike(card.getID())
    .then((res) => {
      card.setLike(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteClick(card) {
  currentCardForDelete = card;
  popupWithDeleteConfirmation.open();
}

enableValidation(selectors);
getCardsFromServer();
