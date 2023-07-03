const popup = document.querySelectorAll(".popup");
const popupEditCard = document.querySelector(".popup_type_edit-card");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupPhoto = document.querySelector(".popup_type_photo");
const buttonListClosePopup = document.querySelectorAll(".popup__close");
const formProfile = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_add");
const nameInput = document.querySelector(".popup__input_type_title");
const jobInput = document.querySelector(".popup__input_type_subtitle");
const buttonOpenPopupEdit = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const buttonOpenAddPopup = document.querySelector(".profile__add-button");
const cardListElement = document.querySelector(".elements__grid");
const popupImg = popupPhoto.querySelector(".popup__image");
const popupTitle = popupPhoto.querySelector(".popup__title-photo");
const templateElement = document
  .querySelector("#template-elements")
  .content.querySelector(".element");
const nameCard = document.querySelector(".popup__input_type_title-card");
const urlCard = document.querySelector(".popup__input_type_subtitle-card");
const buttonSubmitEdit = document.querySelector(".popup__save_type_edit");
const buttonSubmitAdd = document.querySelector(".popup__save_type_add");
const [closeEditCard, closepopupAddCard, closepopupPhoto] =
  buttonListClosePopup;

function openPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", handleKeydownPopupClose);
}

function handleKeydownPopupClose(evt) {
  if (evt.key === "Escape") {
    const item = document.querySelector(".popup_opened");
    closePopup(item);
  }
}

function openEditPopup() {
  disabledButton(buttonSubmitEdit, config);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditCard);
}

function openPopupAdd() {
  disabledButton(buttonSubmitAdd, config);
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
  document.removeEventListener("keydown", handleKeydownPopupClose);
}

function setProfile() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function closeOverlay() {
  popup.forEach((item) =>
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) {
        closePopup(e.target);
      }
    })
  );
}

function handleFormSubmitProfile(e) {
  e.preventDefault();
  setProfile();
  closePopup(popupEditCard);
}

function handleFormSubmitCard(e) {
  e.preventDefault();
  const valueName = nameCard.value;
  const valueUrl = urlCard.value;
  const cardElement = createCard(valueName, valueUrl);
  closePopup(popupAddCard);
  renderCard(cardElement);
  formAddCard.reset();
}

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

closeEditCard.addEventListener("click", () => closePopup(popupEditCard));
closepopupAddCard.addEventListener("click", () => closePopup(popupAddCard));
closepopupPhoto.addEventListener("click", () => closePopup(popupPhoto));
buttonOpenPopupEdit.addEventListener("click", openEditPopup);
formProfile.addEventListener("submit", handleFormSubmitProfile);
formAddCard.addEventListener("submit", handleFormSubmitCard);
buttonOpenAddPopup.addEventListener("click", openPopupAdd);
