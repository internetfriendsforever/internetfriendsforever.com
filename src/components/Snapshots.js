import React, { Component } from 'react'
import styled from 'react-emotion'
import seedrandom from 'seedrandom'
import imageUrlBuilder from '../sanity/imageUrlBuilder'

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`

const Item = styled('div')`
  position: relative;
  flex-basis: 33.333%;
  flex-grow: 0;
  flex-shrink: 0;

  @media(min-width: 600px) {
    flex-basis: 200px;
  }
`

const Spacer = styled('div')`
  padding-top: 100%;
`

const Image = styled('img')`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
`

export default class Snapshots extends Component {
  render () {
    const { snapshots, seed } = this.props
    const random = seedrandom(seed)

    const images = snapshots
      .map(snapshot => snapshot.assets.filter(asset => asset._type === 'image'))
      .reduce((result, array) => result.concat(array), [])

    const shuffled = shuffle(images, random).slice(0, 200)

    const top = shuffled

    return (
      <Container onMouseDown={this.onMouseDown}>
        {top.map(image => {
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
              <Spacer>
                <Image src={src} />
              </Spacer>
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
