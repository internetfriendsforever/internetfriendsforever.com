// Scroll to _center_ of item on click
const index = document.getElementById('index')

function navigateTo (link, centerX, centerY) {
  const target = document.getElementById(link.getAttribute('href').substring(1))
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = target

  window.scrollTo(
    centerX ? ((offsetLeft + offsetWidth / 2) - window.innerWidth / 2) : 0,
    centerY ? ((offsetTop + offsetHeight / 2) - window.innerHeight / 2) : 0
  )

  window.history.pushState(null, null, link.href)

  index.removeAttribute('open')
}

// Scroll to left center of project links
Array.from(index.querySelectorAll('nav > ul > li > a')).forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    navigateTo(link, false, true)
  })
})

// Scroll to center center of slide links
Array.from(index.querySelectorAll('nav > ul > li > ul > li > a')).forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    navigateTo(link, true, true)
  })
})

// Highlight in viewport items in navigation
const figures = document.querySelectorAll('figure')

const figureNavMap = {}

figures.forEach(figure => {
  figureNavMap[figure.id] = document.querySelector(`a[href="#${figure.id}"]`)
})

const observer = new window.IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    window.requestAnimationFrame(() => {
      figureNavMap[entry.target.id].classList.toggle('in-viewport', entry.intersectionRatio > 0.25)
    })
  })
}, {
  threshold: 0.25
})

Array.from(figures).forEach(figure => {
  observer.observe(figure)
})

// Remove thumbnail images
const pictures = document.querySelectorAll('figure picture')

Array.from(pictures).forEach(picture => {
  picture.querySelector('img').addEventListener('load', () => {
    picture.removeAttribute('style')
  })
})

// Keyboard navigation
// window.addEventListener('keydown', event => {
//   if (!event.metaKey && !event.ctrlKey && !event.altKey) {
//     switch (event.key) {
//       case 'Right':

//       break
//       case 'Left':

//       break
//       case 'Up':

//       break
//       case 'Down':

//       break
//     }
//   }
// })
