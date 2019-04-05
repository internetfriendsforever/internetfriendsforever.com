import React from 'react'
import styled from 'react-emotion'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '../sanity/imageUrlBuilder'

const Figure = styled('figure')`
  margin: 1em 0;
`

export default function Catalogue ({ catalogue }) {
  return catalogue.items.map(item => {
    const { media, description } = item

    return (
      <Figure>
        {media.map(item => {
          switch (item._type) {
            case 'image':
              const src = imageUrlBuilder(item)
                .width(400)
                .auto('format')
                .url()

              return (
                <img key={item._key} src={src} />
              )
            case 'video':
              return (
                <video
                  key={item._key}
                  src={item.asset.url}
                  width={400}
                  controls
                />
              )

            case 'iframe':
              return (
                <iframe
                  key={item._key}
                  src={item.url}
                  frameBorder={0}
                  allowFullScreen
                />
              )
            default:
              return null
          }
        })}

        {description && (
          <figcaption>
            <BlockContent blocks={description} />
          </figcaption>
        )}
      </Figure>
    )
  })
}
