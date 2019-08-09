const sanityClient = require('@sanity/client')
const imageUrlBuilder = require('@sanity/image-url')
const blocksToHtml = require('@sanity/block-content-to-html')

const client = sanityClient({
  projectId: 'z0424935',
  dataset: 'depot',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

const image = source => imageUrlBuilder(client).image(source)

const html = blocks => blocksToHtml({ blocks: blocks })

module.exports = {
  client,
  image,
  html
}
