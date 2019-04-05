import express from 'express'
import client from './sanity/client'

const api = express.Router()

api.get('/catalogue', (req, res) => {
  const query = `
    *[_id == "fe864f54-661c-4904-9545-0b99d6b99747"]{
      _id,
      title,
      items[]{
        _key,
        description,
        media[]{
          ...,
          asset->{
            mimeType,
            url
          }
        }
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
