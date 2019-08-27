const path = require('path')
const router = require('@cyberspace/run-router')
const file = require('@cyberspace/run-file')
const styles = require('@cyberspace/styles')
const cache = require('@cyberspace/run-cache')

exports.handler = router({
  GET: {
    '/assets/(.*)': assetHandler,
    '/styles.css': styleHandler,
    '/': require('./src/pages/index'),
    '/(.*)': require('./src/pages/404')
  },

  POST: {
    '/invalidate': invalidateHandler
  }
})

function assetHandler ({ params }) {
  const source = path.join(__dirname, 'src/assets', params[0])

  return file(source, {
    headers: {
      'Cache-Control': 'max-age=31557600'
    }
  })
}

function styleHandler () {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'max-age=31557600'
    },
    body: styles.toString()
  }
}

async function invalidateHandler () {
  await cache.invalidate()

  return {
    statusCode: 204
  }
}
