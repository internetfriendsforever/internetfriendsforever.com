import React from 'react'
import Layout from './components/Layout'
import Collection from './components/Collection'
import NotFound from './components/NotFound'

const site = {
  name: 'internetfriendsforever'
}

export default {
  '/': async ({ path, api }) => {
    const collection = await api.get('/collection')

    return {
      title: `${site.name}`,
      component: (
        <Layout path={path}>
          <Collection collection={collection} />
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
