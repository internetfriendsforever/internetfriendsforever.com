const html = require('../html')
const sanity = require('../sanity')
const item = require('../partials/item')
const header = require('../partials/header')

module.exports = async () => {
  const catalogue = await sanity.client.fetch(`
    *[_id == "fe864f54-661c-4904-9545-0b99d6b99747"]{
      _id,
      items[]{
        _key,
        description,
        media[]{
          ...,
          allowUpscaling,
          asset->{
            mimeType,
            url,
            metadata{
              dimensions
            }
          }
        }
      },
      meta
    }[0]
  `)

  return html({
    content: `
      ${header()}
      ${catalogue.items.map(item).join('\n')}
    `
  })
}
