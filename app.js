const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

/*
Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне. Превью результата посмотри по ссылке https://take.ms/ZvBD0E
Разбей задание на несколько подзадач:
+Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
+Открытие модального окна по клику на элементе галереи.
+Подмена значения атрибута src элемента img.lightbox__image.
+Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
+Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
Стартовые файлы
В папке src ты найдешь стартовые файлы проекта с базовой разметкой и готовыми стилями.
В файле app.js есть массив galleryItems, который содержит объекты с информацией о изображениях: маленькое изображение, оригинальное и описание.
Разметка элемента галереи
Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>
Дополнительно
Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.
+Закрытие модального окна по клику на div.lightbox__overlay.
+Закрытие модального окна по нажатию клавиши ESC.
Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
*/

//refs

const galleryEl = document.querySelector('.js-gallery');
const modalWindowEl = document.querySelector('.js-lightbox');
const modalPictureEl = document.querySelector('.lightbox__image');
const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector('.lightbox__overlay');

// callback functions

const createMarkUp = ({ original, preview, description }) => {
  return `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`;
};

const closeModalWindowHandler = () => {
  modalPictureEl.src = '';
  modalPictureEl.alt = '';
  modalWindowEl.classList.remove('is-open');

  closeBtnEl.removeEventListener('click', closeModalWindowHandler);
  overlayEl.removeEventListener('click', closeModalWindowHandler);
  window.removeEventListener('keydown', escapeKeyPressHandler);
  window.removeEventListener('keydown', arrowKeysPressHandler);
};

const escapeKeyPressHandler = event => {
  if (event.code === 'Escape') {
    closeModalWindowHandler();
  }
};

const arrowKeysPressHandler = event => {
  const currentIndex = galleryItems.findIndex(image => image.original === modalPictureEl.src);

  if (event.code === 'ArrowLeft') {
    onLeftArrowClick(currentIndex);
  } else if (event.code === 'ArrowRight') {
    onRightArrowClick(currentIndex);
  }
};

const onLeftArrowClick = currentIndex => {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = galleryItems.length - 1;
  }
  modalPictureEl.src = galleryItems[nextIndex].original;
  modalPictureEl.alt = galleryItems[nextIndex].description;
};

const onRightArrowClick = currentIndex => {
  let nextIndex = currentIndex + 1;
  if (nextIndex === galleryItems.length) {
    nextIndex = 0;
  }
  modalPictureEl.src = galleryItems[nextIndex].original;
  modalPictureEl.alt = galleryItems[nextIndex].description;
};

// create markUp

const markUp = galleryItems.map(createMarkUp).join('');
galleryEl.insertAdjacentHTML('beforeend', markUp);

// add eventListeners

galleryEl.addEventListener('click', event => {
  event.preventDefault();

  if (event.target === event.currentTarget) return;

  modalPictureEl.src = event.target.dataset.source;
  modalPictureEl.alt = event.target.alt;
  modalWindowEl.classList.add('is-open');

  closeBtnEl.addEventListener('click', closeModalWindowHandler);
  overlayEl.addEventListener('click', closeModalWindowHandler);
  window.addEventListener('keydown', escapeKeyPressHandler);
  window.addEventListener('keydown', arrowKeysPressHandler);
});