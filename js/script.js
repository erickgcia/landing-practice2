const searchIcon = document.querySelector('.nav__icon')
const container = document.querySelector('.container')

searchIcon.addEventListener('click', () => {
  toggleClass(container, 'container--toggle')
})

function createElement(el) {
  const element = document.createElement(el)
  document.body.append(element)
  return element
}

function toggleClass(element, cssClass) {
  if(!element.classList.contains(cssClass)) {
    element.classList.add(cssClass)
  } else {
    element.classList.remove(cssClass)
  }
}