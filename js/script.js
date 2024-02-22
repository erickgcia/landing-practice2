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