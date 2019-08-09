const html = require('../html')
const styles = require('@cyberspace/styles')

const css = styles.add(`
  padding: 0 1em;
`)

module.exports = () => html({
  title: 'Page not found – internetfriendsforever',
  content: `
    <p class=${css}>
      Sorry, page not found. Go to <a href="/">internetfriendsforever.com</a>
    </p>
  `
})
