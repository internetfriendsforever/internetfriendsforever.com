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

  // const resolutionQueryString = scale => `((min-resolution: ${scale}x) or (-webkit-min-device-pixel-ratio: ${scale}x))`
  // const resolutionQueryString = scale => `(min-resolution: ${scale}x)`

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

  // for (let scale = 1; scale <= 4; scale++) {
  //   formats.push({
  //     query: `${resolutionQueryString(scale)}`,
  //     layout: getImageSize(250, 1),
  //     image: getImageSize(250, scale)
  //   }, {
  //     query: `${resolutionQueryString(scale)} and (min-width: 800px)`,
  //     layout: getImageSize(500, 1),
  //     image: getImageSize(500, scale)
  //   }, {
  //     query: `${resolutionQueryString(scale)} and (min-width: 1600px)`,
  //     layout: getImageSize(1000, 1),
  //     image: getImageSize(1000, scale)
  //   })
  // }

  const formatsReversed = [...formats].reverse()

  const getImageUrl = (width, height) => sanity.image(item)
    .width(width)
    .height(height)
    .quality(85)
    .auto('format')
    .url()

  // return `<pre>${JSON.stringify(formats, null, 2)}</pre>`

  const defaultFormat = formats[0]
  const defaultSrc = getImageUrl(defaultFormat.size.width, defaultFormat.size.height)

  return `
    <picture class="${css.container} image">
      ${Array(4).fill().flatMap((_, i) => {
        const scale = 4 - i

        return formatsReversed.map(format => {
          const query = [
            `${format.query || 'all'} and (min-resolution: ${scale}x)`,
            `${format.query || 'all'} and (-webkit-min-device-pixel-ratio: ${scale}x)`
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

  // return `
  //   <picture class="${css.container} image">
  //     ${Array(5).fill().map((_, i) => {
  //       const scale = 6 - i
  //       return `<source media="(min-resolution: ${scale}x), (-webkit-min-device-pixel-ratio: ${scale}x)" srcset="${getImageUrl(scale)} " />`
  //     }).join('')}

  //     <img
  //       id="${asset._id}"
  //       src="${getImageUrl()}"
  //       width="${width}"
  //       height="${height}"
  //       alt="${description.replace(/"/g, '&quot;')}"
  //       style="background-image: url(${lqip})"
  //       loading="lazy"
  //     >

  //     <style>
  //       @media (min-width: 600px) {
  //         #${id} {
  //           width: 
  //         }
  //       }
  //     </style>
  //   </picture>
  // `
}
