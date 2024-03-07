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

/*=============================================
=            Declarations           =
=============================================*/

const editModalWindow = document.querySelector("#profile-edit-modal");
const addModalWindow = document.querySelector("#profile-add-modal");
const previewImageModalWindow = document.querySelector(".profile-add-modal");
const editForm = document.querySelector(".modal__form");
const placesList = document.querySelector(".cards__list");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewModal = document.querySelector(".modal__preview");
const addModalTitle = document.querySelector("#profile-add-title-input");
const addModalUrl = document.querySelector("#profile-url-input");
const previewCaption = document.querySelector(".modal__preview-caption");
const addModalSubmitBtn = document.querySelector(".modal__button_submit");
/*=============================================
=            Buttons            =
=============================================*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = document.querySelector("#profile-close-button");
const addModalBtn = document.querySelector(".profile__add-button");
const addCloseButton = document.querySelector("#add-close-button");
const previewCloseButton = document.querySelector(".modal__preview_close");
/////////////////////////////////////////////////////////////////
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInputValue = document.querySelector("#profile-title-input");
const descriptionInputValue = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");
const editSaveBtn = document.querySelector(".modal__edit-save-button");

/*=============================================
=            Templates            =
=============================================*/
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__tlist");

/*=============================================
=            Functions            =
=============================================*/

// const closeButtons = document.querySelector(".popup__close");
// closeButtons.forEach((button) => {
//   const popup = button.closest(".popup");
//   button.addEventListener('click', () => closePopup(popup));
// });

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardE = generateCard(cardData);
  wrapper.prepend(cardE);
}

// function handleProfileFormSubmit(evt) {
//   e.preventDefault();
//   profileTitle.textContent = titleInputValue.value;
//   profileDescription.textContent = descriptionInputValue.value;
//   toggleModalWindow(editModalWindow);
// }

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  const name = addModalTitle.value;
  const link = addModalUrl.value;
  renderCard({ name, link }, placesList);
  closePopup(editModalWindow);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closePopup(editForm);
}

function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = card.link;
  cardImageEl.alt = card.name;

  cardImageEl.addEventListener("click", function () {
    previewImageElement.src = card.link;
    previewCaption.textContent = cardTitleEl.textContent;
    openPopup(previewImageModalWindow);
  });

  return cardElement;
}

/*=============================================
=            Event Listener            =
=============================================*/

addModalWindow.addEventListener("submit", handleAddFormSubmit);
addModalSubmitBtn.addEventListener("click", () => {
  closePopup(addModalWindow);
});

profileEditButton.addEventListener("click", () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
  editForm.addEventListener("submit", handleProfileEditSubmit);
  openPopup(editModalWindow);
  editSaveBtn.addEventListener("click", () => closePopup(editModalWindow));
});

profileEditCloseButton.addEventListener("click", () =>
  closePopup(editModalWindow)
);

addModalBtn.addEventListener("click", () => openPopup(addModalWindow));

addCloseButton.addEventListener("click", () => closePopup(addModalWindow));

previewCloseButton.addEventListener("click", () =>
  closePopup(previewImageModalWindow)
);

initialCards.forEach((cardData) => renderCard(cardData, placesList));
