import React from 'react'
import styled from 'react-emotion'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '../sanity/imageUrlBuilder'

const Figure = styled('figure')`
  position: relative;
  margin: 1.5em 0 0 0;

  &:first-child {
    margin-top: 0;
  }

  img, video {
    max-width: 100%;
  }
`

const Figcaption = styled('figcaption')`
  font-size: 1em;

  :hover {
    background: #c6c6d2;
    box-shadow: 4px 0px 10px -10px rgba(0,0,0,0.4);
  }

  h1, h2, h3, p {
    font-size: 1em;
    font-weight: normal;
    margin: 0.5em 0;

    &:first-child {
      margin-top: 0;
    }
  }

  @media (min-width: 680px) {
    padding: 0.25rem 0.5rem;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    width: 40%;
    max-width: 28rem;
    border-right: 1px solid rgb(255, 255, 255, 0.3);
  }

  @media (min-width: 800px) {
    font-size: 1.4em;
  }
`

const Text = styled('div')`
  position: sticky;
  top: 0.25rem;
  left: 0;
  padding-bottom: 0.5rem;
  margin-left: 0.5em;

  @media (min-width: 680px) {
    margin-left: calc(50% + 0.5rem);
    letter-spacing: -0.02em;
  }
`

export default function Catalogue ({ catalogue }) {
  return catalogue.items.map(item => {
    const { media, description } = item

    return (
      <Figure key={item._key}>
        {media.map(item => {
          switch (item._type) {
            case 'image':
              const src = imageUrlBuilder(item)
                .width(1600)
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
                  width={1600}
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
          <Figcaption>
            <Text>
              <BlockContent blocks={description} />
            </Text>
          </Figcaption>
        )}
      </Figure>
    )
  })
}
