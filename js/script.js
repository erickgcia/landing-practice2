const searchIcon = document.querySelector('.nav__icon')
const container = document.querySelector('.container')

searchIcon.addEventListener('click', () => {
  toggleClass(container, 'container--toggle')
})

function toggleClass(element, cssClass) {
  element.classList.toggle(cssClass)
}

const arrayLinks = ['Living Rooms', 'Discounts', 'Reviews']

function listCreator(arr) {
  const ul = document.createElement('ul')
  
  arr.forEach(item => {
    const li = document.createElement('li')
    const a = document.createElement('a')

    a.href = `#${item.toLowerCase()}`
    a.innerText = item;
    li.appendChild(a)
    ul.appendChild(li)
  })

  container.appendChild(ul)

  return ul
}

const recList = listCreator(arrayLinks)
recList.classList.add('recommendations')

const recItems = Array.from(recList.children)
recItems.forEach(item => {
  item.classList.add('recommendations__item')
  const recLink = item.firstChild
  recLink.classList.add('recommendations__link')
})

const searchInput = document.querySelector('.container__input')
const removeIcon = document.querySelector('.container__icon--remove')

searchInput.addEventListener('input', () => {
  if(searchInput.value) {
    removeIcon.classList.add('icon--show')
  } else {
    removeIcon.classList.remove('icon--show')
  }
})

removeIcon.addEventListener('click', () => {
  searchInput.value = ''
  removeIcon.classList.remove('icon--show')
})

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

const cardTwo = duplicateElement(testCards[0], testimonialSection);
modifyCard(cardTwo, usersData, '002');

const cardThree = duplicateElement(testCards[0], testimonialSection);
modifyCard(cardThree, usersData, '003');
testCards = [...testCards, cardTwo, cardThree]

function duplicateElement(el, parent) {
  const newElement = el.cloneNode(true);
  parent.appendChild(newElement);
  newElement.style.display = 'none'
  return newElement
}


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