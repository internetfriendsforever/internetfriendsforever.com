// Scroll to _center_ of item on click
Array.from(document.querySelectorAll('nav ul li ul a')).forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()

    const target = document.getElementById(link.getAttribute('href').substring(1))

    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = target

    window.scrollTo(
      (offsetLeft + offsetWidth / 2) - window.innerWidth / 2,
      (offsetTop + offsetHeight / 2) - window.innerHeight / 2
    )

    window.history.pushState(null, null, link.href)
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
const images = document.querySelectorAll('figure img')

Array.from(images).forEach(image => {
  image.addEventListener('load', () => {
    image.removeAttribute('style')
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
