const styles = require('@cyberspace/styles')
const image = require('../partials/image')
const sanity = require('../sanity')

const css = {
  figure: styles.add(`
    position: relative;
    margin: 0 0 4em;

    video {
      display: block;
      max-width: 100%;
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

module.exports = item => {
  const { media, description } = item

  const items = media.map(item => {
    switch (item._type) {
    case 'image':
      return image(item, {
        dimensions: item.asset.metadata.dimensions
      })
    case 'video':
      return `<video src="${item.asset.url}" controls loop></video>`
    case 'iframe':
      return `<iframe src="${item.url}" frameborder="0" allowfullscreen />`
    default:
      return ''
    }
  })

  const caption = description ? `
    <figcaption class="${css.caption}">
      ${sanity.html(description)}
    </figcaption>
  ` : ''

  return `
    <figure class="${css.figure}">
      ${items.join('\n')}
      ${caption}
    </figure>
  `
}
