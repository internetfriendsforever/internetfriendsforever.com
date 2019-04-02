import express from 'express'
import client from './sanity/client'

const api = express.Router()

api.get('/snapshots', (req, res) => {
  const query = `
    *[_type == "snapshot"]{
      assets[]{..., asset->}
    }
  `

  promiseResponse((
    client.fetch(query)
  ), req, res)
})

export default api

function promiseResponse (promise, req, res) {
  return promise
    .then(result => handleSuccess(result, req, res))
    .catch(error => handleError(error, req, res))
}

function handleSuccess (result, req, res) {
  res.status(200).json(result)
}

function handleError (error, req, res) {
  res.status(500).text(error.message)
}
