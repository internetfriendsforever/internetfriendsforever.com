const styles = require('@cyberspace/styles')

const css = styles.add(`
  display: block;
  max-height: 70vh;
  max-width: 90vw;
`)

module.exports = item => `
  <video class="${css}" src="${item.asset.url}" controls loop></video>
`
