const popup = document.querySelector('.popup'); // Весь попап
const closePopupButton = document.querySelector('.popup__close'); //Кнопка закрытия попапа
// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); //Форма с кнопками. мы берем не кнопки, тк правило не действует на них
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_title');
let jobInput = document.querySelector('.popup__input_type_subtitle');
const openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
let editName = document.querySelector('.profile__title');
let editJob = document.querySelector('.profile__subtitle');


function openPopup() {
  popup.classList.add('popup__opened'); //классы которых нет в HTML мы добавляем без точки.
  nameInput.value = editName.textContent;
  jobInput.value = editJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup__opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

   editName.textContent = nameInput.value;
   editJob.textContent = jobInput.value;
   closePopup();
  }

  openPopupButton.addEventListener('click', openPopup);

  closePopupButton.addEventListener('click', closePopup);

  formElement.addEventListener('submit', handleFormSubmit); // нужно добавлять именно к форме, а не к инпутам.
