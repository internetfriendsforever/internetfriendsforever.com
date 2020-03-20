const styles = require('@cyberspace/styles')
const sanity = require('../sanity')

const min = 320
const interval = 320

const css = styles.add(`
  display: block;
  max-width: 100%;
`)

module.exports = item => {
  const { asset, description = '' } = item
  const { width, height } = asset.metadata.dimensions
  const max = width
  const range = max - min
  const steps = Math.floor(range / interval)
  const widths = [...Array(steps).fill().map((_, i) => min + i * interval), width]
  const sources = widths.map(width => sanity.image(item).width(width).auto('format').url())
  const set = sources.map((src, i) => `${src} ${widths[i]}w`)
  const smallest = sources[0]
  const aspect = height / width
  const maxHeight = 85 + (aspect - 1) * 30

  return `
    <img
      class="${css}"
      src="${smallest}"
      srcSet="${set}"
      sizes="100vw"
      alt="${description.replace(/"/g, '&quot;')}"
      style="max-height: ${maxHeight}vh;"
    />`
}
