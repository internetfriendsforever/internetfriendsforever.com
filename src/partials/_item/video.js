const styles = require('@cyberspace/styles')

const css = styles.add(`
  display: block;
  max-width: 90vw;
  margin: 0 auto;
`)

module.exports = item => `
  <video class="${css}" src="${item.asset.url}" controls loop></video>
`
