const searchIcon = document.querySelector('.nav__icon')
const container = document.querySelector('.container')

searchIcon.addEventListener('click', () => {
  toggleClass(container, 'container--toggle')
})

function toggleClass(element, cssClass) {
  if(!element.classList.contains(cssClass)) {
    element.classList.add(cssClass)
  } else {
    element.classList.remove(cssClass)
  }
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
const testimonialBtns = document.querySelector('.testimonials__slider-btn')
const testCard = document.querySelector('.card--oversize')

const users = [
  {
    id: '002',
    img: '../img/client-portrait-2.jpg',
    name: 'Amanda Brooks',
    tags: 'Architect | Company Name',
    txt: 'Lorem ipsum...'
  },

  {
    id: '003',
    img: '../img/client-portrait-3.jpg',
    name: 'Leyla Lee',
    tags: 'Designer | Company Name',
    txt: 'Lorem ipsum...'
  }
]
const reviewCard = duplicateElement(testCard, testimonialSection)
modifyCard(reviewCard,users,'002')

const newReviewCard = duplicateElement(testCard, testimonialSection)
modifyCard(newReviewCard,users,'003')

function duplicateElement(el, parent) {
  const newElement = el.cloneNode(true)
  parent.appendChild(newElement)
  return newElement
}

function modifyCard(card, users, id) {
  const img = card.children[0]
  const name = card.children[1]
  const tags = card.children[2]
  const txt = card.children[3]

  const findUser = users.find(user => user.id === id)
  
  if(findUser) {
    img.src = findUser.img
    name.innerText = findUser.name
    tags.innerText = findUser.tags
    txt.innerText = findUser.txt
  }
}

/* testimonialBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    //Slide to the next div()
  })
}) */