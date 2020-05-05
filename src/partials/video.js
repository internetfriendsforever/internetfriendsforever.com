const styles = require('@cyberspace/styles')
const sanity = require('../sanity')

const css = styles.add(`
  display: block;

  @media (min-width: 800px) {
    width: 600px;
  }

  @media (min-width: 1600px) {
    width: 1000px;
  }
`)

module.exports = item => {
  let poster

  if (item.poster) {
    poster = sanity.image(item.poster)
      .quality(85)
      .auto('format')
      .url()
  }

  return `
    <video
      width="300"
      class="${css}"
      src="${item.asset.url}"
      ${poster ? `poster="${poster}"` : ''}
      controls
      loop
      preload="metadata"
    ></video>
  `
}
