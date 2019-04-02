import React, { Component } from 'react'
import styled from 'react-emotion'
import imageUrlBuilder from '../sanity/imageUrlBuilder'

const Container = styled('div')`
  width: 5000px;
  cursor: grab;

  :active {
    cursor: grabbing;
  }
`

const Image = styled('img')`
  max-width: 400px;
`

export default class Snapshots extends Component {
  onMouseDown = event => {
    event.preventDefault()

    let offset = [
      event.clientX,
      event.clientY
    ]

    function onMouseMove (event) {
      const delta = [
        event.clientX - offset[0],
        event.clientY - offset[1]
      ]

      window.scrollTo(
        window.scrollX - delta[0],
        window.scrollY - delta[1]
      )

      offset = [
        event.clientX,
        event.clientY
      ]
    }

    function onMouseUp () {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  render () {
    const { snapshots } = this.props

    const images = snapshots
      .map(snapshot => snapshot.assets.filter(asset => asset._type === 'image'))
      .reduce((result, array) => result.concat(array), [])
      .sort(() => 0.5 - Math.random())
      .slice(0, 20)

    return (
      <Container onMouseDown={this.onMouseDown}>
        {images.map(image => {
          const { _key } = image
          const src = imageUrlBuilder(image).width(400).quality(90).url()

          return (
            <Image key={_key} src={src} />
          )
        })}
      </Container>
    )
  }
}
