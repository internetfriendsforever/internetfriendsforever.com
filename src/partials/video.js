const styles = require('@cyberspace/styles')

const css = styles.add(`
  display: block;
  max-height: 70vh;
  max-width: 90vw;
`)

module.exports = item => {
  const { poster } = item

  return `
    <video
      class="${css}"
      src="${item.asset.url}"
      ${poster ? `poster="${poster.asset.url}"` : ''}
      controls
      loop
    ></video>
  `
}
