export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userID
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._element = null;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._ownerID = data.owner._id;
    this._userID = userID;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeElement.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteElement.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setLikeState() {
    if (this._likes.some((el) => el._id === this._userID)) {
      this._likeElement.classList.add("elements__like_active");
    } else {
      this._likeElement.classList.remove("elements__like_active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeElement = this._element.querySelector(".elements__like");
    this._deleteElement = this._element.querySelector(".elements__delete");
    if (this._ownerID !== this._userID) {
      this._deleteElement.classList.add("elements__delete_hidden");
    }
    this._cardImage = this._element.querySelector(".elements__card-image");
    this._likesScore = this._element.querySelector(".elements__score");
    this._setLikeState();
    this._setEventListeners();
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._likesScore.innerText = this._likes.length;
    this._element.querySelector(".elements__card-text").innerText = this._name;
    return this._element;
  }

  setLike(likes) {
    this._likes = likes;
    this._likesScore.innerText = this._likes.length;
    this._setLikeState();
  }

  getID() {
    return this._id;
  }

  delete() {
    this._element.remove();
  }
}
