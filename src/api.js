import express from 'express'
import client from './sanity/client'

const api = express.Router()

api.get('/collection', (req, res) => {
  const query = `
    *[_id == "bc0b2070-b295-4c49-87e2-66d7a069c795"]{
      _id,
      title,
      items[]->{
        _id,
        _type,
        description,
        media
      }
    }[0]
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
