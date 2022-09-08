//Buttons
const profileEditButton = document.querySelector(".profile__info-edit");
const profileCloseButton = document.querySelector(".popup__close");
const popupPictureCloseButton = document.querySelector('#popupPictureClose');
const buttonAddCard = document.querySelector('#addCardButton');
const popupAddCardCloseButton = document.querySelector('#addCardPopupCloseButton');

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
const pictureDescriptionPopup = document.querySelector('#previewDescription');

//Cards
const cardsContainer = document.querySelector('#cards');
const popupAddCard = document.querySelector('#addCardPopup');
const formElementAddCard = document.querySelector('#addCardForm');
const inputNameElementAddCard = document.querySelector('#addCardInputName');
const inputLinkElementAddCard = document.querySelector('#addCardInputLink');
const cardTemplate = document.querySelector('#cardTemplate').content;



profileEditButton.addEventListener("click", openProfilePopup);
profileCloseButton.addEventListener("click", () => {closePopup(profilePopup)});
profileFormElement.addEventListener("submit", formSubmitHandler);
popupPictureCloseButton.addEventListener('click',() => {closePopup(picturePopup)});
buttonAddCard.addEventListener('click', () => {openPopup(popupAddCard)});
popupAddCardCloseButton.addEventListener('click', ()=> {closePopup(popupAddCard)});
formElementAddCard.addEventListener('submit',addCardFormSubmitHandler);


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
}

function closePopup(htmlPopupElement) {
    htmlPopupElement.classList.remove("popup_opened");
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

function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInput = nameInputElement.value;
    const jobInput = jobInputElement.value;

    profileInfoName.textContent = nameInput;
    profileInfoJob.textContent = jobInput;
    closePopup(profilePopup)
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();

    renderCard(inputNameElementAddCard.value, inputLinkElementAddCard.value, true);
    closePopup(popupAddCard);
    inputNameElementAddCard.value = '';
    inputLinkElementAddCard.value = '';
}

function renderCard(name, link, prepend = false) {
    const card = createCard(name, link);
        if (prepend) {
            cardsContainer.prepend(card);
        } else {
            cardsContainer.append(card);
        }
}



function createCard(name, link) {
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);

    const image = card.querySelector('img');
    image.alt = name;
    image.src = link;

    image.addEventListener('click', (event) => {
        const picture = picturePopup.querySelector('#previewImage');
        const clickedPicture = event.target;
        picture.src = clickedPicture.src;
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


defaultCards.forEach((card)=> {
    renderCard(card.name, card.link);
})

