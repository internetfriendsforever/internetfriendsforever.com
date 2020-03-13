const styles = require('@cyberspace/styles')
const sanity = require('../sanity')

const min = 320
const interval = 320

const css = styles.add(`
  display: block;
  max-height: 70vh;
  max-width: 90vw;
`)

module.exports = item => {
  const { asset } = item
  const { width } = asset.metadata.dimensions
  const max = width
  const range = max - min
  const steps = Math.floor(range / interval)
  const widths = [...Array(steps).fill().map((_, i) => min + i * interval), width]
  const sources = widths.map(width => sanity.image(item).width(width).auto('format').url())
  const set = sources.map((src, i) => `${src} ${widths[i]}w`)
  const smallest = sources[0]

  return `
    <img
      class="${css}"
      src="${smallest}"
      srcSet="${set}"
      sizes="100vw"
    />`
}
