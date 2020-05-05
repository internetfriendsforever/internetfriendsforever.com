const styles = require('@cyberspace/styles')
const sanity = require('../sanity')
const { localize } = require('../i18n')

const css = {
  container: styles.add(`
    img {
      display: block;
    }
  `)
}

module.exports = item => {
  const { asset } = item
  const { dimensions, lqip } = asset.metadata
  const { aspectRatio } = dimensions
  const description = localize(item.description) || ''

  const sizeFromArea = area => ({
    width: Math.round(Math.sqrt(area * aspectRatio)),
    height: Math.round(Math.sqrt(area / aspectRatio))
  })

  const formats = [{
    size: sizeFromArea(250 * 250)
  }, {
    query: '(min-width: 800px)',
    size: sizeFromArea(500 * 500)
  }, {
    query: '(min-width: 1600px)',
    size: sizeFromArea(1000 * 1000)
  }]

  const formatsReversed = [...formats].reverse()

  const getImageUrl = (width, height) => sanity.image(item)
    .width(width)
    .height(height)
    .quality(85)
    .auto('format')
    .url()

  const defaultFormat = formats[0]
  const defaultSrc = getImageUrl(defaultFormat.size.width, defaultFormat.size.height)

  return `
    <picture class="${css.container} image">
      ${Array(4).fill().flatMap((_, i) => {
        const scale = 4 - i

        return formatsReversed.map(format => {
          const query = [
            `${format.query || 'all'} and (min-resolution: ${scale}x)`,
            `${format.query || 'all'} and (-webkit-min-device-pixel-ratio: ${scale})`
          ].join(',')

          const width = format.size.width * scale
          const height = format.size.height * scale
          const src = getImageUrl(width, height)

          return `<source media="${query}" srcset="${src}" />`
        })
      }).join('')}

      <img
        id="${asset._id}"
        src="${defaultSrc}"
        width="${defaultFormat.size.width}"
        height="${defaultFormat.size.height}"
        alt="${description.replace(/"/g, '&quot;')}"
        style="background-image: url(${lqip})"
        loading="lazy"
      >

      <style>
        ${formats.filter(format => format.query).map(format => `
          @media ${format.query} {
            #${asset._id} {
              width: ${format.size.width}px;
              height: ${format.size.height}px;
            }
          }
        `).join('')}
      </style>
    </picture>
  `
}
