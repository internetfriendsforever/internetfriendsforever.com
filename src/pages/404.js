const html = require('../html')

module.exports = () => html({
  title: 'Page not found – internetfriendsforever',
  content: `
    <p>
      Sorry, page not found. Go to <a href="/">internetfriendsforever.com</a>
    </p>
  `
})
