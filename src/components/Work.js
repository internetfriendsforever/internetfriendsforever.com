import React from 'react'
import styled from 'react-emotion'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '../sanity/imageUrlBuilder'

const Figure = styled('figure')`
  margin: 1em 0;
`

export default function Work ({ media, description }) {
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
          default:
            return null
        }
      })}

      <figcaption>
        <BlockContent blocks={description} />
      </figcaption>
    </Figure>
  )
}
