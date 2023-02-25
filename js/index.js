const swiper = new Swiper('.swiper-fade', {
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },

  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 5000,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const openModalWindow = () => {
  const modalBtn = document.querySelector('.sign-up-btn');
  const bodyElem = document.getElementsByTagName('body')[0];
  const modalElem = document.querySelector('.innerModal');

  modalBtn.addEventListener('click', (e) => {
    bodyElem.classList.toggle('active');
    modalElem.classList.toggle('active');
    const form = document.querySelector('.modal-form');

    form.addEventListener('submit', validate);

    // маска для поля вводу телефону у форматі (код оператора) ххх - хх - хх

    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', function (e) {
      let x = e.target.value
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      e.target.value = !x[2]
        ? x[1]
        : '( ' +
          x[1] +
          ' ) ' +
          x[2] +
          (!x[3] ? '' : ' - ' + x[3]) +
          (!x[4] ? '' : ' - ' + x[4]);
    });
  });
};

openModalWindow();

const closeModalWindow = () => {
  const submitBtn = document.getElementById('submit');
  const modalElem = document.querySelector('.innerModal');
  const bodyElem = document.getElementsByTagName('body')[0];
  const spanElem = document.querySelector('.span-close');
  submitBtn.addEventListener('click', () => {
    modalElem.classList.toggle('active');
    bodyElem.classList.toggle('active');
  });

  spanElem.addEventListener('click', () => {
    modalElem.classList.toggle('active');
    bodyElem.classList.toggle('active');
  });
};

closeModalWindow();

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', () => {
  const pElem = document.querySelector('.success');
  const dateField = document.getElementById('date');
  const mounth = dateField.value.slice(5, 7);
  const day = dateField.value.slice(8, 10);
  const time = dateField.value.slice(11, 16);
  const message = `Ви успішно записалися на ${day}.${mounth}<span>До зустрічі об ${time}</span><button class="close-message">Добре</button>`;
  pElem.innerHTML = message;
  const pElemBtn = document.querySelector('.close-message');
  pElemBtn.addEventListener('click', () => {
    pElem.innerHTML = '';
  });
});

// функція для валідації (перевірки) на введення даних користувачем

function validate(e) {
  const nameField = document.getElementById('name');
  const phonelField = document.getElementById('phone');
  const dateField = document.getElementById('date');
  if (!nameField.value) {
    // якщо не заповнено
    document.querySelector('.input-name').className =
      'input-name validation-error';
    valid = false;
  }
  if (!phonelField.value) {
    // якщо не заповнено
    document.querySelector('.input-tel').className =
      'input-tel validation-error';
    valid = false;
  }
  if (!dateField.value) {
    // якщо не заповнено
    document.querySelector('.input-date').className =
      'input-date validation-error';
    valid = false;
  }
}
