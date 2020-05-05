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

// Size images
// const images = document.querySelectorAll('figure img')

// // const maxWidth = window.innerWidth * 0.75
// // const maxHeight = window.innerHeight * 0.75
// const maxArea = window.innerWidth * window.innerHeight * 0.4

// Array.from(images).forEach(image => {
//   const widths = image.getAttribute('data-widths').split(',').map(value => parseInt(value, 10))
//   const heights = image.getAttribute('data-heights').split(',').map(value => parseInt(value, 10))
//   const areas = widths.map((width, i) => width * heights[i])
//   const availableAreas = areas.filter((area, i) => i === 0 || area < maxArea)
//   const areaIndex = availableAreas.length - 1
//   const width = widths[areaIndex]
//   const height = heights[areaIndex]

//   // const availableWidths = widths.filter((width, i) => i === 0 || (width / window.devicePixelRatio) < maxWidth)
//   // const availableHeights = heights.filter((height, i) => i === 0 || (height / window.devicePixelRatio) < maxHeight)
//   // const sizeIndex = Math.min(availableWidths.length - 1, availableHeights.length - 1)
//   // const width = availableWidths[sizeIndex]
//   // const height = availableHeights[sizeIndex]

//   image.setAttribute('width', width)
//   image.setAttribute('height', height)

//   // image.setAttribute('src', '')

//   // console.log(widths)
//   // console.log(image)
// })

// window.visualViewport.addEventListener('resize', function (event) {
//   console.log(window.visualViewport.scale)
// })

// console.log(window.visualViewport)

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
