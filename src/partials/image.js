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
  const resolutionQueryString = scale => `(min-resolution: ${scale}x)`

  const scaleFit = (maxWidth, maxHeight, scale) => {
    let width = maxWidth
    let height = width / aspectRatio

    if (aspectRatio < maxWidth / maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }

    return {
      width: Math.round(width * scale),
      height: Math.round(height * scale)
    }
  }

  // Formats ordered by specificity ascending (least specific first)
  const formats = []

  for (let scale = 1; scale <= 1; scale++) {
    formats.push({
      query: `${resolutionQueryString(scale)}`,
      ...scaleFit(250, 250, scale)
    }
    , {
      query: `${resolutionQueryString(scale)} and (max-aspect-ratio: 2/3)`,
      ...scaleFit(250, 500, scale)
    }
    , {
      query: `${resolutionQueryString(scale)} and (min-aspect-ratio: 3/2)`,
      ...scaleFit(500, 250, scale)
    }
    )
  }

  const formatsReversed = [...formats].reverse()

  const getImageUrl = (width, height) => sanity.image(item)
    .width(width)
    .height(height)
    .quality(85)
    .auto('format')
    .url()

  // return `<pre>${JSON.stringify(formats, null, 2)}</pre>`

  const defaultFormat = formats[0]
  const defaultWidth = defaultFormat.width
  const defaultHeight = defaultFormat.height
  const defaultSrc = getImageUrl(defaultWidth, defaultHeight)

  return `
    <picture class="${css.container} image">
      ${formatsReversed.map(format => `
        <source media="${format.query}" srcset="${getImageUrl(format.width, format.height)}" />
      `).join('')}

      <img
        id="${asset._id}"
        src="${defaultSrc}"
        alt="${description.replace(/"/g, '&quot;')}"
        style="background-image: url(${lqip})"
        loading="lazy"
      >

      <style>
        @media (min-width: 600px) {
          #${asset._id} {
          }
        }
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
