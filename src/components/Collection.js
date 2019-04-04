import React from 'react'
import Work from './Work'

export default function Collection ({ collection }) {
  return collection.items.map(item => {
    switch (item._type) {
      case 'work':
        return <Work key={item._id} {...item} />
      default:
        return null
    }
  })
}
