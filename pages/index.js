//Buttons
let profileEditButton = document.querySelector(".profile__info-EditButton");
let profileCloseButton = document.querySelector(".popup__close");

//Profile Popup
let profilePopup = document.querySelector("#profile");
let nameInputElement = profilePopup.querySelector(".popup__name");
let jobInputElement = profilePopup.querySelector(".popup__text");
let profileFormElement = profilePopup.querySelector(".popup__content");

//Profile Selector
let profileInfoName = document.querySelector(".profile__info-name");
let profileInfoJob = document.querySelector(".profile__info-job");

profileEditButton.addEventListener("click", () => { 
    openPopup(profilePopup);
    fillProfilePopup()
});
profileCloseButton.addEventListener("click", () => {
closePopup (profilePopup);
});
profileFormElement.addEventListener("submit", formSubmitHandler);

function openPopup (element) {
    element.classList.add("popup__opened")
}
function closePopup (element) {
    element.classList.remove("popup__opened")
}
function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInput = nameInputElement.value;
    const jobInput = jobInputElement.value;

    profileInfoName.textContent = nameInput;
    profileInfoJob.textContent = jobInput;

    closePopup (profilePopup);
}

function fillProfilePopup() {
    nameInputElement.value = profileInfoName.innerText;
    jobInputElement.value = profileInfoJob.innerText;
}
