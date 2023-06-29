const popupEditCard = document.querySelector(".popup_type_edit-card");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupPhoto = document.querySelector(".popup_type_photo");
const closePopupButtonList = document.querySelectorAll(".popup__close");
const formProfile = document.querySelector(".popup__form_edit");
const formCardAdd = document.querySelector(".popup__form_add");
const nameInput = document.querySelector(".popup__input_type_title");
const jobInput = document.querySelector(".popup__input_type_subtitle");
const openPopupEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const openAddPopupButton = document.querySelector(".profile__add-button");
const cardListElement = document.querySelector(".elements__grid");
const popupImg = popupPhoto.querySelector(".popup__image");
const popupTitle = popupPhoto.querySelector(".popup__title-photo");
const templateElement = document
  .querySelector("#template-elements")
  .content.querySelector(".element");
const nameCard = document.querySelector(".popup__input_type_title-card");
const urlCard = document.querySelector(".popup__input_type_subtitle-card");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", function handleKeydownPopupClose(evt) {
    if (evt.key === "Escape") {
      closePopup(item);
      document.removeEventListener("keydown", handleKeydownPopupClose);
    }
  });
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditCard);
}

function openPopupAdd() {
  openPopup(popupAddCard);
}
// открытие фотки с описанием
function openPopupCard(img, title) {
  popupImg.src = img;
  popupImg.alt = title;
  popupTitle.textContent = title;
  openPopup(popupPhoto);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function setProfile() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function closeOverlay() {
  document.querySelectorAll(".popup").forEach((item) =>
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) {
        closePopup(e.target);
      }
    })
  );
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handleFormSubmitProfile(e) {
  e.preventDefault();
  setProfile();
  closePopup(e.target.closest(".popup"));
}

function handleFormSubmitCard(e) {
  e.preventDefault();
  const valueName = nameCard.value;
  const valueUrl = urlCard.value;
  const cardElement = createCard(valueName, valueUrl);
  closePopup(e.target.closest(".popup"));
  renderCard(cardElement);
  nameCard.value = "";
  urlCard.value = "";
}

closePopupButtonList.forEach((item) => {
  item.addEventListener("click", function () {
    closePopup(item.closest(".popup"));
  });
});

function handlelikeACard(evt) {
  const like = evt.target;
  like.classList.toggle("element__heart_color_black");
}

function createCard(name, link) {
  const cardElement = templateElement.cloneNode(true);
  const textElement = cardElement.querySelector(".element__title");
  const imgElement = cardElement.querySelector(".element__image");
  textElement.textContent = name;
  imgElement.src = link;
  imgElement.alt = name;
  addEvent(imgElement, cardElement, name, link);
  return cardElement;
}

function renderCard(cardElement) {
  cardListElement.prepend(cardElement);
}

function addEvent(imgElement, cardElement, name, link) {
  const buttonDelElement = cardElement.querySelector(".element__delete");
  buttonDelElement.addEventListener("click", function () {
    cardElement.remove();
  });
  imgElement.addEventListener("click", () => openPopupCard(link, name));
  const cardLike = cardElement.querySelector(".element__heart");
  cardLike.addEventListener("click", handlelikeACard);
}

initialCards.reverse().forEach(function (item) {
  const card = createCard(item.name, item.link);
  renderCard(card);
});

closeOverlay();

openPopupEditButton.addEventListener("click", openEditPopup);
formProfile.addEventListener("submit", handleFormSubmitProfile);
formCardAdd.addEventListener("submit", handleFormSubmitCard);
openAddPopupButton.addEventListener("click", openPopupAdd);
