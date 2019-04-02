import React, { Component } from 'react'
import styled from 'react-emotion'
import imageUrlBuilder from '../sanity/imageUrlBuilder'

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
`

const Item = styled('div')`
  position: relative;
  flex-basis: 200px;
  flex-grow: 1;
  padding-top: 200px;
`

const Image = styled('img')`
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 400px;
  // transform: translate(-50%, -50%);
`

const TextCenter = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7.5vw;
  mix-blend-mode: difference;
  color: white;
`

const Contact = styled('div')`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  mix-blend-mode: difference;
  color: white;
  text-transform: uppercase;
  padding: 1em;

  a {
    text-decoration: none;
    color: white;
  }
`

export default class Snapshots extends Component {
  render () {
    const { snapshots } = this.props

    const images = snapshots
      .map(snapshot => snapshot.assets.filter(asset => asset._type === 'image'))
      .reduce((result, array) => result.concat(array), [])
      .sort(() => 0.5 - Math.random())

    return (
      <Container onMouseDown={this.onMouseDown}>
        {images.map(image => {
          const { _key } = image

          const src = imageUrlBuilder(image)
            .width(800)
            .height(800)
            .quality(90)
            .auto('format')
            .fit('crop')
            .crop('center')
            .url()

          return (
            <Item key={_key}>
              <Image src={src} />
            </Item>
          )
        })}

        <TextCenter>
          internetfriendsforever
        </TextCenter>

        <Contact>
          <p>
            <a href='mailto:anyone@internetfriendsforever.com'>
              anyone(at)<br />
              internetfriendsforever.com
            </a>
          </p>
          <p>
            <a href='https://www.google.no/maps/place/Gr%C3%B8nlandsleiret+39,+0190+Oslo/@59.9109657,10.7647865,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e5f5de2f969:0xdf681a6878135efa!8m2!3d59.910963!4d10.7669805'>
              Grønlandsleiret 39<br />
              0190 Oslo
            </a>
          </p>
        </Contact>
      </Container>
    )
  }
}
