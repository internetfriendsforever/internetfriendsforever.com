const sanity = require('../sanity')

module.exports = (source, {
  min = 320,
  max = 4000,
  interval = 320
} = {}) => {
  const range = max - min
  const steps = Math.floor(range / interval)
  const widths = Array(steps).fill().map((_, i) => min + i * interval)
  const sources = widths.map(width => sanity.image(source).width(width).auto('format').url())
  const set = sources.map((src, i) => `${src} ${widths[i]}w`)
  const smallest = sources[0]
  return `<img src="${smallest}" srcSet="${set}" sizes="100vw" />`
}
