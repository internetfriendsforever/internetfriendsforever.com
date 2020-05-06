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
  const { asset, imageType } = item
  const { dimensions, lqip } = asset.metadata
  const { aspectRatio } = dimensions
  const description = localize(item.description) || ''

  let scale = 1

  if (imageType === 'screenshotMobile') {
    scale = 0.5
  }

  const sizeFromArea = area => ({
    width: Math.round(Math.sqrt(area * aspectRatio)),
    height: Math.round(Math.sqrt(area / aspectRatio))
  })

  const formats = [{
    size: sizeFromArea(250 * 250 * scale)
  }, {
    query: '(min-width: 800px)',
    size: sizeFromArea(500 * 500 * scale)
  }, {
    query: '(min-width: 1600px)',
    size: sizeFromArea(1000 * 1000 * scale)
  }]

  const formatsReversed = [...formats].reverse()

  const getImageUrl = (size, scale = 1) => sanity.image(item)
    .width(size.width)
    .height(size.height)
    .quality(85)
    .auto('format')
    .dpr(scale)
    .url()

  const defaultFormat = formats[0]
  const defaultSrc = getImageUrl(defaultFormat.size)

  return `
    <picture class="${css.container} image">
      ${Array(3).fill().flatMap((_, i) => {
        const scale = 3 - i

        return formatsReversed.map(format => {
          const query = [
            `${format.query || 'all'} and (min-resolution: ${scale}x)`,
            `${format.query || 'all'} and (-webkit-min-device-pixel-ratio: ${scale})`
          ].join(',')

          const src = getImageUrl(format.size, scale)

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
