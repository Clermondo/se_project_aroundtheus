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

//Declarations
const modalWindow = document.querySelector("#profile-edit-modal");
const editForm = document.querySelector(".modal__form");
////////////////////////////////////////////////////////
const profileEditButton = document.querySelector("#profile-edit-button");
const modalCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
/////////////////////////////////////////////////////////
const titleInputValue = document.querySelector("#profile-title-input");
const descriptionInputValue = document.querySelector(
  "#profile-description-input"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

//Card add////////////////////////////////////////////////
const cardAddModal = document.querySelector("#profile-add-modal");
const cardAddButton = document.querySelector("#add-button");
const addCloseButton = document.querySelector("#add-close-button");

//Functions///////////////////////////////////////////////

function toggleModalWindow() {
  if (!modalWindow.classList.contains("modal__opened")) {
    titleInputValue.value = profileTitle.textContent;
    descriptionInputValue.value = profileDescription.textContent;
  }
  modalWindow.classList.toggle("modal__opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = cardData.link;
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("alt", cardData.name);

  //Like//////////////////////////////////////////////
  cardLikeButton.addEventListener("click", (e) => {
    e.target.classList.toggle("card__like-button_active");
    console.log("clicked");
  });
  cardLikeButton = cardElement.querySelector(".card__like-button");

  //Delete////////////////////////////////////////////
  cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
  });
  return cardElement;
}

function formSubmitHandler(evt) {
  e.preventDefault();

  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  toggleModalWindow(profileEditModal);
}

//Event Listeners/////////////////////////////////////////////
editForm.addEventListener("submit", formSubmitHandler);
profileEditButton.addEventListener("click", toggleModalWindow);
modalCloseButton.addEventListener("click", toggleModalWindow);
