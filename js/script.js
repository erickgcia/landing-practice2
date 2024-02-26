const searchIcons = document.querySelectorAll('.nav__icon');
const containers = document.querySelectorAll('.container');

searchIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    toggleClass(containers[index], 'container--toggle');
  });
});

function toggleClass(element, cssClass) {
  element.classList.toggle(cssClass);
}

const arrayLinks = ['Living Rooms', 'Discounts', 'Reviews'];

function listCreator(container, arr) {
  const ul = document.createElement('ul');
  
  arr.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = `#${item.toLowerCase()}`;
    a.innerText = item;
    li.appendChild(a);
    ul.appendChild(li);
  });

  container.appendChild(ul);

  return ul;
}

containers.forEach(container => {
  const recList = listCreator(container, arrayLinks);
  recList.classList.add('recommendations');

  const recItems = Array.from(recList.children);
  recItems.forEach(item => {
    item.classList.add('recommendations__item');
    const recLink = item.firstChild;
    recLink.classList.add('recommendations__link');
  });
});

const searchInputs = document.querySelectorAll('.container__input');
const removeIcons = document.querySelectorAll('.container__icon--remove');

searchInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    const icon = removeIcons[index];
    if (input.value) {
      icon.classList.add('icon--show');
    } else {
      icon.classList.remove('icon--show');
    }
  });
});

removeIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    const input = searchInputs[index];
    input.value = '';
    icon.classList.remove('icon--show');
  });
});

const testimonialSection = document.querySelector('.testimonials__section')
const testimonialBtns = document.querySelectorAll('.testimonials__slider-btn')
let testCards = document.querySelectorAll('.card--oversize')

const usersData = [
  {
    id: '002',
    cardNum: '2',
    img: '../img/client-portrait-2.jpg',
    name: 'Amanda Brooks',
    tags: 'Architect | Company Name',
    txt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni, officia magnam ad odit alias unde temporibus veniam sit totam exercitationem nam ipsa fugiat non eaque doloremque quibusdam, debitis nobis reprehenderit eveniet. Enim fugiat mollitia voluptatem quisquam assumenda ad animi.'
  },

  {
    id: '003',
    cardNum: '3',
    img: '../img/client-portrait-3.jpg',
    name: 'Leyla Lee',
    tags: 'Designer | Company Name',
    txt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni, officia magnam ad odit alias unde temporibus veniam sit totam exercitationem nam ipsa fugiat non eaque doloremque quibusdam, debitis nobis reprehenderit eveniet. Enim fugiat mollitia voluptatem quisquam assumenda ad animi.'
  }
]

function duplicateElement(el, parent) {
  return new Promise((resolve, reject) => {
    if(el) {
      const newElement = el.cloneNode(true);
      parent.appendChild(newElement);
      newElement.style.display = 'none'
      resolve(newElement)
    } else {
      reject('Funcion no ejecutada debido a no estar en la página principal.')
    }
  })
}

async function setUpNewCards() {
  try {
    const cardTwo = await duplicateElement(testCards[0], testimonialSection);
    modifyCard(cardTwo, usersData, '002');    
    const cardThree = await duplicateElement(testCards[0], testimonialSection);
    modifyCard(cardThree, usersData, '003');
    testCards = [...testCards, cardTwo, cardThree]
  } catch(error) {
    console.warn(error)
  }
}

setUpNewCards()

function modifyCard(card, data, id) {
  const img = card.children[0]
  const name = card.children[1]
  const tags = card.children[2]
  const txt = card.children[3]

  const findUserData = data.find(user => user.id === id)
  
  if(findUserData) {
    img.src = findUserData.img
    name.innerText = findUserData.name
    tags.innerText = findUserData.tags
    txt.innerText = findUserData.txt
    cardNum = findUserData.cardNum
    card.setAttribute('data-card', findUserData.cardNum)
  }
}

function updateActiveBtn(newActiveBtn) {
  const activeBtn = document.querySelector(".testimonials__slider-btn--active");

  if (activeBtn) {
    activeBtn.classList.remove("testimonials__slider-btn--active");
    activeBtn.disabled = false;
  }

  if (newActiveBtn) {
    newActiveBtn.classList.add("testimonials__slider-btn--active");
    newActiveBtn.disabled = true;
  }
};

function changeCard(btnData) {
  testCards.forEach((card) => {
    const cardData = card.getAttribute('data-card')
    if(btnData !== cardData) {
      card.style.display = 'none'
    } else {
      card.style.display = 'flex'
    }
  });
}

testimonialBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const btnData = btn.getAttribute('data-button');

    if (!document.startViewTransition) {
      updateActiveBtn(e.target);
      changeCard(btnData);
    }

    document.startViewTransition(() => {
      updateActiveBtn(e.target);
      changeCard(btnData);
    });
  });
});