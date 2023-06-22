const popupEditCard = document.querySelector(".popup_type_edit-card");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupPhoto = document.querySelector(".popup_type_photo");
const closePopupButtonList = document.querySelectorAll(".popup__close");
const formProfile = document.querySelector(".popup__form_edit");
const formCardAdd = document.querySelector(".popup__form_add");
const nameInput = document.querySelector(".popup__input_type_title");
const jobInput = document.querySelector(".popup__input_type_subtitle");
const openPopupEditButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
const openAddPopupButton = document.querySelector(".profile__add-button");
const cardListElement = document.querySelector(".elements__grid");
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

function popupOpened(item) {
  item.classList.add("popup_opened");
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpened(popupEditCard);
}

function openPopupAdd() {
  popupOpened(popupAddCard);
}

function openPopupCard(img, title) {
  const popupImg = popupPhoto.querySelector(".popup__image");
  const popupTitle = popupPhoto.querySelector(".popup__title-photo");
  popupImg.src = img;
  popupTitle.textContent = title;
  popupPhoto
    .querySelector(".popup__close")
    .addEventListener("click", (e) => closePopup(e.target.closest(".popup")));
  popupOpened(popupPhoto);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function setProfile() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
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
  createCard(valueName, valueUrl, true);
  closePopup(e.target.closest(".popup"));
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

function createCard(name, link, append = false) {
  const todoElement = templateElement.cloneNode(true);
  const textElement = todoElement.querySelector(".element__title");
  const imgElement = todoElement.querySelector(".element__image");
  textElement.textContent = name;
  imgElement.src = link;
  imgElement.alt = name;
  const buttonDelElement = todoElement.querySelector(".element__delete");
  cardListElement.prepend(todoElement);
  addEvent(imgElement, todoElement, buttonDelElement, name, link);
  return todoElement;
}

function addEvent(imgElement, todoElement, buttonDelElement, name, link) {
  buttonDelElement.addEventListener("click", function () {
    todoElement.remove();
  });
  imgElement.addEventListener("click", () => openPopupCard(link, name));
  const cardLike = todoElement.querySelector(".element__heart");
  cardLike.addEventListener("click", handlelikeACard);
}

initialCards.reverse().forEach(function (item, index, arr) {
  createCard(item.name, item.link);
});

openPopupEditButton.addEventListener("click", openEditPopup);
formProfile.addEventListener("submit", handleFormSubmitProfile);
formCardAdd.addEventListener("submit", handleFormSubmitCard);
openAddPopupButton.addEventListener("click", openPopupAdd);
