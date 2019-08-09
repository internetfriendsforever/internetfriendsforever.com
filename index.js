const path = require('path')
const router = require('@cyberspace/run-router')
const file = require('@cyberspace/run-file')
const styles = require('@cyberspace/styles')

exports.handler = router({
  GET: {
    '/': require('./src/pages/index'),
    '/assets/(.*)': assetsHandler,
    '/styles.css': stylesHandler,
    '/(.*)': require('./src/pages/404')
  }
})

function assetsHandler ({ params }) {
  return file(path.join(__dirname, 'src/assets', params[0]))
}

function stylesHandler () {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/css' },
    body: styles.toString()
  }
}
