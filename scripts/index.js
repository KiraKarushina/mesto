//Buttons
const profileEditButton = document.querySelector(".profile__info-editbutton");
const profileCloseButton = document.querySelector(".popup__close");

//Profile Popup
const profilePopup = document.querySelector("#profile");
const nameInputElement = profilePopup.querySelector(".popup__input_name");
const jobInputElement = profilePopup.querySelector(".popup__input_text");
const profileFormElement = profilePopup.querySelector(".popup__content-name");

//Profile Selector
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoJob = document.querySelector(".profile__info-job");


profileEditButton.addEventListener("click", openProfilePopup);
profileCloseButton.addEventListener("click", closeProfilePopup);
profileFormElement.addEventListener("submit", formSubmitHandler);

function openProfilePopup () {
    profilePopup.classList.add("popup_opened");
    fillProfilePopup();
}

function closeProfilePopup () {
    profilePopup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInput = nameInputElement.value;
    const jobInput = jobInputElement.value;

    profileInfoName.textContent = nameInput;
    profileInfoJob.textContent = jobInput;
    closeProfilePopup();
}

function fillProfilePopup() {
    nameInputElement.value = profileInfoName.textContent;
    jobInputElement.value = profileInfoJob.textContent;
}
