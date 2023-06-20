const popup = document.querySelector('.popup'); // Весь попап
const closePopupButton = document.querySelectorAll('.popup__close'); //Кнопка закрытия попапа
// Находим форму в DOM
let formElement = document.querySelectorAll('.popup__form'); //Форма с кнопками. мы берем не кнопки, тк правило не действует на них
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_title');
let jobInput = document.querySelector('.popup__input_type_subtitle');
const openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
let editName = document.querySelector('.profile__title');
let editJob = document.querySelector('.profile__subtitle');
const openAddPopupButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const cardListElement = document.querySelector('.elements__grid');
const templateElements = document.querySelector('#template-elements').content.querySelector('.element');
const heartButton = document.querySelector('.element__heart');
const modal = document.querySelector('.modal')
const closeModalButton = document.querySelector('.modal__close');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];




function openPopup() {
  popup.classList.add('popup_opened'); //классы которых нет в HTML мы добавляем без точки.
  nameInput.value = editName.textContent;
  jobInput.value = editJob.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function setProfile(){
  editName.textContent = nameInput.value;
  editJob.textContent = jobInput.value;
}



function handleFormSubmit (evt) {
  evt.preventDefault();
  if(evt.target.name ===  'inputProfile'){
    setProfile(evt)
  }else{
    const nameCard = evt.target.querySelector('.popup__input_type_title-card').value;
    const urlCard = evt.target.querySelector('.popup__input_type_subtitle-card').value;
    createTodo(nameCard, urlCard, true);
  }
   closePopup(evt.target.closest('.popup'));
  }


 openPopupButton.addEventListener('click', openPopup);



 formElement.forEach(item => item.addEventListener('submit', handleFormSubmit)); // нужно добавлять именно к форме, а не к инпутам.



closePopupButton.forEach((item) => {
  item.addEventListener('click', function () {
    closePopup(item.closest('.popup'));
});
});



 function openPopupAdd() {
  popupAddCard.classList.add('popup_opened'); //классы которых нет в HTML мы добавляем без точки.
}



openAddPopupButton.addEventListener('click', openPopupAdd);

function likeACard(evt){
  const like = evt.target
  like.classList.toggle('element__heart_color_black')
}

function openModalCard (img, title){
  modal.classList.remove('modal_none');
  const modalImg = modal.querySelector('.modal__img');
  const modalTitle = modal.querySelector('.modal__title');
  modalImg.src = img;
  modalTitle.textContent = title;
}

function closeModalCard (){
  modal.classList.add('modal_none');
}

closeModalButton.addEventListener('click', closeModalCard);



function createTodo(name, link, append = false){
  const todoElement = templateElements.cloneNode(true);
  const textElement = todoElement.querySelector('.element__title');
  const imgElement = todoElement.querySelector('.element__image');
  textElement.textContent = name;
  imgElement.src = link;
  imgElement.alt = name;
  const buttonDelElement = todoElement.querySelector('.element__delete');
  append ? cardListElement.prepend(todoElement) : cardListElement.append(todoElement);
  buttonDelElement.addEventListener('click', function () {
    todoElement.remove()
  });
  imgElement.addEventListener('click', () => openModalCard(link, name))

  const cardLike = todoElement.querySelector('.element__heart')

  cardLike.addEventListener('click', likeACard);

  return todoElement;
}

initialCards.map(function (item, index, arr){
  createTodo(item.name, item.link);
  return;
})
