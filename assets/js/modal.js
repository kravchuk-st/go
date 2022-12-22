const body = document.querySelector('body');
const header = document.querySelector('header');
const showModalBtns = document.querySelectorAll('.modal-btn');
const modalForm = document.querySelector('#modal-form');
const modalFormContent = modalForm.querySelector('.modal__content');
const modalVideo = document.querySelector('#modal-video');
const modalVideoContent = modalVideo.querySelector('.modal__content');
const showModalVideoBtn = document.querySelector('.info__video .video-btn');

const openModal = (modal, modalContent) => {
  const lockPaddingValue = `${window.innerWidth - body.offsetWidth}px`;
  body.classList.add('disable-scroll');
  body.style.paddingRight = lockPaddingValue;
  header.style.paddingRight = lockPaddingValue;
  modal.classList.add('active');
  modalContent.classList.add('active');
};

const closeModal = (modal, modalContent) => {
  body.classList.remove('disable-scroll');
  body.style.paddingRight = 0;
  header.style.paddingRight = 0;
  modal.classList.remove('active');
  modalContent.classList.remove('active');
};

showModalBtns.forEach((el) => {
  el.addEventListener('click', () => {
    openModal(modalForm, modalFormContent);
  });
});

modalForm.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal(modalForm, modalFormContent);
  }
});

showModalVideoBtn.addEventListener('click', () => {
  openModal(modalVideo, modalVideoContent);
});

modalVideo.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal(modalVideo, modalVideoContent);
  }
});
