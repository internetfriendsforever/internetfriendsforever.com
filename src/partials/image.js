const styles = require('@cyberspace/styles')
const sanity = require('../sanity')

const css = styles.add(`
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
`)

module.exports = (source, {
  min = 320,
  interval = 320,
  dimensions
} = {}) => {
  const max = dimensions.width
  const range = max - min
  const steps = Math.floor(range / interval)
  const widths = Array(steps).fill().map((_, i) => min + i * interval)
  const sources = widths.map(width => sanity.image(source).width(width).auto('format').url())
  const set = sources.map((src, i) => `${src} ${widths[i]}w`)
  const smallest = sources[0]
  return `
    <img
      class="${css}"
      width="${dimensions.width}"
      height="${dimensions.height}"
      src="${smallest}"
      srcSet="${set}"
      sizes="100vw"
    />`
}
