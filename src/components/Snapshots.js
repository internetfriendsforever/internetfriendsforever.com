import React, { Component } from 'react'
import styled from 'react-emotion'
import seedrandom from 'seedrandom'
import imageUrlBuilder from '../sanity/imageUrlBuilder'

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  transform: translateZ(0);
`

const Item = styled('div')`
  position: relative;
  flex-basis: 200px;
  padding-top: 200px;
  flex-grow: 1;
`

const Image = styled('img')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export default class Snapshots extends Component {
  render () {
    const { snapshots, seed } = this.props
    const random = seedrandom(seed)

    const images = snapshots
      .map(snapshot => snapshot.assets.filter(asset => asset._type === 'image'))
      .reduce((result, array) => result.concat(array), [])

    const shuffled = shuffle(images, random)

    const top = shuffled

    return (
      <Container onMouseDown={this.onMouseDown}>
        {top.map(image => {
          const { _key } = image

          const src = imageUrlBuilder(image)
            .width(400)
            .height(400)
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
      </Container>
    )
  }
}

function shuffle (a, random) {
  let j, x, i

  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }

  return a
}
