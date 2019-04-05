import { hydrate } from 'react-dom'
import queryString from 'query-string'
import router from '@cyberspace/router'
import apiClient from '@cyberspace/api-client'
import routes from './routes'

const api = apiClient('/api')()

api.hydrate(window.dehydrated)

const seed = window.seed

router.listen(async (path, navigate) => {
  const query = queryString.parse(window.location.search)

  try {
    const { key, params } = router.resolve(routes, path)
    const route = await routes[key || '404']({ path, params, query, navigate, api, seed })

    document.title = route.title

    await new Promise(resolve => {
      hydrate(route.component, document.getElementById('root'), resolve)
    })
  } catch (error) {
    console.log(error)
  }
})
