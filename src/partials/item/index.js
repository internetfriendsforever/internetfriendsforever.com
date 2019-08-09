const styles = require('@cyberspace/styles')
const image = require('./image')
const video = require('./video')
const sanity = require('../../sanity')

const css = {
  figure: styles.add(`
    position: relative;
    margin: 6em 0;

    video {
      display: block;
      max-width: 90vw;
      margin: 0 auto;
    }
  `),

  caption: styles.add(`
    max-width: 32em;
    padding: 0 1em;
    margin: 0 auto;
    text-align: center;
  `)
}

module.exports = ({ media, description }) => `
  <figure class="${css.figure}">
    ${media.map(item => {
      switch (item._type) {
      case 'image':
        return image(item)
      case 'video':
        return video(item)
      default:
        return ''
      }
    })}

    ${description ? `
      <figcaption class="${css.caption}">
        ${sanity.html(description)}
      </figcaption>
    ` : ''}
  </figure>
`
