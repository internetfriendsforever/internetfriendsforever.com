const html = require('../html')
const sanity = require('../sanity')
const item = require('../partials/item')

module.exports = async () => {
  const catalogue = await sanity.client.fetch(`
    *[_id == "fe864f54-661c-4904-9545-0b99d6b99747"]{
      _id,
      title,
      items[]{
        _key,
        description,
        media[]{
          ...,
          asset->{
            mimeType,
            url,
            metadata{
              dimensions
            }
          }
        }
      }
    }[0]
  `)

  return html({
    title: 'internetfriendsforever',
    content: catalogue.items.map(item).join('\n')
  })
}
