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
const addModalTitle = document.querySelector("#profile-add-title-input");
const addModalUrl = document.querySelector("#profile-url-input");
const modalInput = document.querySelector(".modal__input");
const editTitleInput = document.querySelector("#profile-title-input");
const editDescriptionInput = document.querySelector(
  "#profile-description-input"
);
//=======================================================================
const editForm = document.querySelector(".modal__form");
const addModalSubmitBtn = document.querySelector(".modal__button_submit");
const placesList = document.querySelector(".cards__list");
//=======================================================================
const previewImageModalWindow = document.querySelector(".preview-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewModal = document.querySelector(".modal__preview");
const previewCaption = document.querySelector(".modal__preview-caption");

/*=============================================
=            Buttons            =
=============================================*/

const profileEditButton = document.querySelector("#profile-edit-button");
const editSaveBtn = document.querySelector(".modal__edit-save-button");
const addModalBtn = document.querySelector(".profile__add-button");
//=====================================================================
const profileEditCloseButton = document.querySelector(".modal__close");
const addCloseButton = document.querySelector(".modal__close");
const previewCloseButton = document.querySelector(".modal__close");
//=====================================================================
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInputValue = document.querySelector("#profile-title-input");
const descriptionInputValue = document.querySelector(
  "#profile-description-input"
);

/*=============================================
=            Templates            =
=============================================*/
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__tlist");

/*=============================================
=            Functions            =
=============================================*/

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = generateCard(cardData);
  wrapper.prepend(cardElement);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = addModalTitle.value;
  const link = addModalUrl.value;
  renderCard({ name, link }, placesList);
  closePopup(addModalWindow);
  evt.target.reset();
}

function handleProfileEditSubmit(evt) {
  openPopup(editModalWindow);
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closePopup(editModalWindow);
}

function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
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
  cardElement.querySelector(".card__title").textContent = card.name;
  cardImageEl.src = card.link;
  cardImageEl.alt = card.name;

  cardImageEl.addEventListener("click", function () {
    previewImageElement.src = card.link;
    previewImageElement.alt = card.name;
    previewCaption.textContent = cardTitleEl.textContent;
    // previewImageElement.alt = cardTitleEl.textContent;
    openPopup(previewImageModalWindow);
  });

  return cardElement;
}

/*=============================================
=            Event Listener            =
=============================================*/
addModalBtn.addEventListener("click", () => openPopup(addModalWindow));

addModalWindow.addEventListener("submit", handleAddFormSubmit);

profileEditButton.addEventListener("click", () => {
  openPopup(editModalWindow);
  editTitleInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;
});

editForm.addEventListener("submit", handleProfileEditSubmit);

/*=============================================
=            Close buttons  - Event Listeners          =
=============================================*/
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// closeButtons.addEventListener("click", () => closePopup(editModalWindow));

// closeButtons.addEventListener("click", () => closePopup(addModalWindow));

// closeButtons.addEventListener("click", () =>
//   closePopup(previewImageModalWindow)
// );

initialCards.forEach((cardData) => renderCard(cardData, placesList));
