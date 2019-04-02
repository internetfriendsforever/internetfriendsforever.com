import React from 'react'
import Layout from './components/Layout'
import Snapshots from './components/Snapshots'
import NotFound from './components/NotFound'

const site = {
  name: 'internetfriendsforever'
}

export default {
  '/': async ({ path, api }) => {
    const snapshots = await api.get(`/snapshots`)

    return {
      title: `${site.name}`,
      component: (
        <Layout path={path}>
          <Snapshots snapshots={snapshots} />
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
