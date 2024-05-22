import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editModalWindow = document.querySelector("#profile-edit-modal");
const addModalWindow = document.querySelector("#profile-add-modal");
const addModalTitle = document.querySelector("#profile-add-title-input");
const addModalUrl = document.querySelector("#profile-url-input");
const editTitleInput = document.querySelector("#profile-title-input");
const editDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const previewImageModalWindow = document.querySelector(".preview-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewCaption = document.querySelector(".modal__preview-caption");
const placesList = document.querySelector(".cards__list");
const addModalBtn = document.querySelector("#add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const editForm = document.querySelector("#profile-edit-modal .modal__form");
const addCardForm = document.querySelector("#profile-add-modal .modal__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const closeButtons = document.querySelectorAll(".modal__close");

// Functions
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

const handleCardClick = (data) => {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewCaption.textContent = data.name;
  openPopup(previewImageModalWindow);
};

const createCard = (data) => {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.getView();
};

const renderInitialCards = () => {
  initialCards.forEach((data) => {
    const cardElement = createCard(data);
    placesList.append(cardElement);
  });
};

const handleAddCardFormSubmit = (event) => {
  event.preventDefault();
  const cardData = {
    name: addModalTitle.value,
    link: addModalUrl.value,
  };
  const cardElement = createCard(cardData);
  placesList.prepend(cardElement);
  closePopup(addModalWindow);
  addCardFormValidator.resetValidation();
};

const handleEditProfileFormSubmit = (event) => {
  event.preventDefault();
  profileTitle.textContent = editTitleInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  closePopup(editModalWindow);
};

// Event Listeners
profileEditButton.addEventListener("click", () => {
  editTitleInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;
  openPopup(editModalWindow);
});

addModalBtn.addEventListener("click", () => {
  openPopup(addModalWindow);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

editForm.addEventListener("submit", handleEditProfileFormSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

document.querySelectorAll(".modal").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// Enable Validation
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(config, editForm);
editProfileFormValidator.enableValidation();

// Initial Setup
renderInitialCards();
