import React, { Component } from 'react'
import styled from 'react-emotion'
import imageUrlBuilder from '../sanity/imageUrlBuilder'

const Container = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: contain;
  background-position: center;
  image-rendering: pixelated;
`

export default class Snapshots extends Component {
  render () {
    const { snapshots } = this.props

    const [image] = snapshots
      .map(snapshot => snapshot.assets.filter(asset => asset._type === 'image'))
      .reduce((result, array) => result.concat(array), [])
      .sort(() => 0.5 - Math.random())
      .slice(0, 1)

    const src = imageUrlBuilder(image).quality(90).url()

    return (
      <Container
        onClick={() => this.forceUpdate()}
        style={{ backgroundImage: `url(${src})` }}
      />
    )
  }
}
