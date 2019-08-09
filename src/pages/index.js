const html = require('../html')
const sanity = require('../sanity')
const responsiveImage = require('../partials/responsiveImage')

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
            url
            url,
            metadata{
              dimensions{
                width
              }
            }
          }
        }
      }
    }[0]
  `)

  return html({
    title: 'internetfriendsforever',
    content: `
      <h1>internetfriendsforever</h1>

      <address>
        <p>
          <a href='http://danielmahal.com/'>Daniel</a> and <a href='http://s-g-k.org/'>Seb</a> working today for our better tomorrow
        </p>
        <p>
          <a title='send us an email' href='mailto:anyone@internetfriendsforever.com'>
            anyone@internetfriendsforever.com
          </a>
        </p>

        <p>
          <a title='open map' href='https://www.openstreetmap.org/node/2785466073'>
            Grønlandsleiret 39<br />
            0190 Oslo
          </a>
        </p>
      </address>

      ${catalogue.items.map(item => {
        const { media, description } = item

        const items = media.map(item => {
          switch (item._type) {
            case 'image':
              return responsiveImage(item, {
                max: item.asset.metadata.dimensions.width
              })
            case 'video':
              return `<video src="${item.asset.url}" width="400" controls></video>`
            case 'iframe':
              return `<iframe src="${item.url}" frameborder="0" allowfullscreen />`
            default:
              return null
          }
        })

        const caption = description ? `
          <figcaption>
            ${sanity.html(description)}
          </figcaption>
        ` : ''

        return `
          <figure>
            ${items.join('\n')}
            ${caption}
          </figure>
        `
      }).join('\n')}
    `
  })
}
