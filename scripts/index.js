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
/*=============================================
=            Buttons            =
=============================================*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = document.querySelector("#profile-close-button");
const addModalBtn = document.querySelector(".profile__add-button");
const addCloseButton = document.querySelector("#add-close-button");
/////////////////////////////////////////////////////////////////
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInputValue = document.querySelector("#profile-title-input");
const descriptionInputValue = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");

/*=============================================
=            Functions            =
=============================================*/

function toggleModalWindow(modal) {
  modal.classList.toggle("modal__opened");
}
/*=============================================
=            Templates            =
=============================================*/
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__tlist");

function formSubmitHandler(evt) {
  e.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  toggleModalWindow();
}

function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = card.link;
  cardImageEl.alt = card.name;

  cardImageEl.addEventListener("click", function () {
    previewImageElement.src = card.link;
    console.log(previewImageModalWindow);
    toggleModalWindow(previewImageModalWindow);
  });

  return cardElement;
}

function renderCard(card, container) {
  container.append(card);
}

/*=============================================
=            Event Listener            =
=============================================*/
editForm.addEventListener("submit", formSubmitHandler);
profileEditButton.addEventListener("click", () =>
  toggleModalWindow(editModalWindow)
);

profileEditCloseButton.addEventListener("click", () =>
  toggleModalWindow(editModalWindow)
);
addModalBtn.addEventListener("click", () => toggleModalWindow(addModalWindow));
addCloseButton.addEventListener("click", () =>
  toggleModalWindow(addModalWindow)
);

initialCards.forEach(function (card) {
  const newCard = generateCard(card);
  renderCard(newCard, placesList);
});
