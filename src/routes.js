import React from 'react'
import styled from 'react-emotion'
import Layout from './components/Layout'
import Snapshots from './components/Snapshots'
import NotFound from './components/NotFound'

const site = {
  name: 'internetfriendsforever'
}

const TextCenter = styled('div')`
  position: fixed;
  top: 0.5em;
  left: 0.5em;
  font-size: 1em;
  mix-blend-mode: difference;
  color: white;
  user-select: none;
  text-transform: uppercase;
`

// const TextCenter = styled('div')`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 7.5vw;
//   text-align: center;
//   background: black;
//   color: white;
//   mix-blend-mode: multiply;
//   user-select: none;
// `

export default {
  '/': async ({ path, seed, api }) => {
    const snapshots = await api.get(`/snapshots`)

    return {
      title: `${site.name}`,
      component: (
        <Layout path={path}>
          <Snapshots
            seed={seed}
            snapshots={snapshots}
          />

          <TextCenter>
            internetfriendsforever
          </TextCenter>
        </Layout>
      )
    }
  },

  '404': async ({ api }) => ({
    statusCode: 404,
    title: 'Not found',
    component: (
      <Layout>
        <NotFound />
      </Layout>
    )
  })
}
