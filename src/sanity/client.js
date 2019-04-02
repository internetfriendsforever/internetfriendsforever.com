import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'z0424935',
  dataset: 'depot',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})
