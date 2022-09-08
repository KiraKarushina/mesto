//Buttons
const profileEditButton = document.querySelector(".profile__info-edit");
const profileCloseButton = document.querySelector(".popup__close");
const popupPictureCloseButton = document.querySelector('#popupPictureClose');
const addCardButton = document.querySelector('#addCardButton');
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
const addCardPopup = document.querySelector('#addCardPopup');
const addCardFormElement = document.querySelector('#addCardForm');
const addCardInputNameElement = document.querySelector('#addCardInputName');
const addCardInputLinkElement = document.querySelector('#addCardInputLink');
const cardTemplate = document.querySelector('#cardTemplate').content;



profileEditButton.addEventListener("click", openProfilePopup);
profileCloseButton.addEventListener("click", closeProfilePopup);
profileFormElement.addEventListener("submit", formSubmitHandler);
popupPictureCloseButton.addEventListener('click',closePicturePopup);
addCardButton.addEventListener('click', openAddCardPopup);
popupAddCardCloseButton.addEventListener('click', closeAddCardPopup);
addCardFormElement.addEventListener('submit',addCardFormSubmitHandler);


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

// Profile popup methods

function openProfilePopup () {
    profilePopup.classList.add("popup_opened");
    fillProfilePopup();
}

function closeProfilePopup () {
    profilePopup.classList.remove("popup_opened");
}

function fillProfilePopup() {
    nameInputElement.value = profileInfoName.textContent;
    jobInputElement.value = profileInfoJob.textContent;
}


// Picture popup methods

function openPicturePopup () {
    picturePopup.classList.add("popup_opened");
}

function closePicturePopup () {
    picturePopup.classList.remove("popup_opened");

}


// Card popup methods

function openAddCardPopup () {
    addCardPopup.classList.add("popup_opened");
}

function closeAddCardPopup() {
    addCardPopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInput = nameInputElement.value;
    const jobInput = jobInputElement.value;

    profileInfoName.textContent = nameInput;
    profileInfoJob.textContent = jobInput;
    closeProfilePopup();
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();

    addCard(addCardInputNameElement.value, addCardInputLinkElement.value, true);
    closeAddCardPopup();
    addCardInputNameElement.value = '';
    addCardInputLinkElement.value = '';
}

function addCard(name, link, prepend = false) {
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);

    const image = card.querySelector('img');
    image.alt = name;
    image.src = link;

    image.addEventListener('click', (event) => {
        const picture = picturePopup.querySelector('#previewImage');
        const clickedPicture = event.target;
        picture.src = clickedPicture.src;
        pictureDescriptionPopup.innerText = clickedPicture.alt;
        picturePopup.classList.add('popup_opened');
    });

    const h2 = card.querySelector('h2');
    h2.innerText = name;


    card.querySelector('.elements__like').addEventListener('click', (event) => {

        const className = 'elements__like_active';
        const classList = event.target.classList;

        if (classList.contains(className)) {
            classList.remove(className);
        } else {
            classList.add(className);
        }

    });

    card.querySelector('.elements__delete').addEventListener('click', (event) => {
        event.target.parentElement.remove();
    });


    if (prepend) {
        cardsContainer.prepend(card);
    } else {
        cardsContainer.append(card);
    }
}


defaultCards.forEach((card)=> {
    addCard(card.name, card.link);
})

