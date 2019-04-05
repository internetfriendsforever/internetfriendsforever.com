import React from 'react'
import Layout from './components/Layout'
import Catalogue from './components/Catalogue'
import NotFound from './components/NotFound'

const site = {
  name: 'internetfriendsforever'
}

export default {
  '/': async ({ path, api }) => {
    const catalogue = await api.get('/catalogue')

    return {
      title: `${site.name}`,
      component: (
        <Layout path={path}>
          <Catalogue catalogue={catalogue} />
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
