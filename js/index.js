const swiperFade = new Swiper('.swiper-fade', {
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },

  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 4000,
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

const swiperComments = new Swiper('.swiper-comments', {
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 7000,
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
  const pElem = document.querySelector('.success');
  submitBtn.addEventListener('click', () => {
    modalElem.classList.toggle('active');
    bodyElem.classList.toggle('active');
  });
  pElem.classList.toggle('active');
  spanElem.addEventListener('click', () => {
    modalElem.classList.toggle('active');
    bodyElem.classList.toggle('active');
  });
};

closeModalWindow();

/* Обмежуємо час для запису, щоб не можна було обрати минулий час або поточний */
const dateField = document.getElementById('date');
const currentDate = new Date().toISOString().slice(0, 16);
dateField.setAttribute('min', currentDate);

/* Після кожного оновлення сторінки спрацьовує наступна функція */

document.addEventListener('DOMContentLoaded', () => {
  const nameField = document.getElementById('name');
  const phoneField = document.getElementById('phone');
  const dateField = document.getElementById('date');
  const tableOfRecord = document.getElementById('records');

  // Перевіряємо, чи є дані у localStorage
  if (localStorage.getItem('formData')) {
    const formData = JSON.parse(localStorage.getItem('formData'));
    nameField.value = formData.name || '';
    phoneField.value = formData.phone || '';
    dateField.value = formData.date || '';
  }

  function validate(event) {
    event.preventDefault();
    let valid = false;

    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const dateField = document.getElementById('date');

    if (!nameField.value) {
      document.querySelector('.input-name').className =
        'input-name validation-error';
      valid = false;
    } else {
      valid = true;
    }

    if (!phoneField.value) {
      document.querySelector('.input-tel').className =
        'input-tel validation-error';
      valid = false;
    } else {
      valid = true;
    }

    if (!dateField.value) {
      document.querySelector('.input-date').className =
        'input-date validation-error';
      valid = false;
    } else {
      valid = true;
    }

    if (valid) {
      // Розбиваємо на окремі функції для більшої зручності
      saveFormData();
      displayRecord();

      const pElem = document.querySelector('.success');
      const month = dateField.value.slice(5, 7);
      const day = dateField.value.slice(8, 10);
      const time = dateField.value.slice(11, 16);
      pElem.classList.add('active');
      const message = `Ви успішно записалися на ${day}.${month}<br>До зустрічі об ${time}<button class="close-message">Добре</button>`;
      pElem.innerHTML = message;
      const pElemBtn = document.querySelector('.close-message');
      pElemBtn.addEventListener('click', () => {
        pElem.innerHTML = '';
      });

      nameField.value = ''; // Очищення поля для імені
      phoneField.value = ''; // Очищення поля для номера телефону
      dateField.value = ''; // Очищення поля для дати та часу
    }
  }

  function saveFormData() {
    const formData = {
      name: nameField.value,
      phone: phoneField.value,
      date: dateField.value,
    };
    let savedData = [];
    if (localStorage.getItem('savedData')) {
      savedData = JSON.parse(localStorage.getItem('savedData'));
    }
    savedData.push(formData);
    localStorage.setItem('savedData', JSON.stringify(savedData));
  }

  function displayRecord() {
    const savedData = JSON.parse(localStorage.getItem('savedData'));
    tableOfRecord.innerHTML = '';
    if (savedData && savedData.length > 0) {
      savedData.forEach((data) => {
        const { name, phone, date } = data;
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        const time = date.slice(11, 16);
        const record = `<tr><td>${name}</td><td>${day}.${month}</td><td>${time}</td></tr>`;
        tableOfRecord.innerHTML += record;
      });
    }
  }

  const form = document.querySelector('.modal-form');
  form.addEventListener('submit', validate);

  displayRecord(); // Виведення списку при завантаженні сторінки
});

let docTitle = document.title;
window.addEventListener('blur', () => {
  document.title = 'Come Back ;(';
});

window.addEventListener('focus', () => {
  document.title = docTitle;
});
