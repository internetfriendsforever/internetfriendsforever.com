import React, { Fragment } from 'react'
import { injectGlobal } from 'emotion'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: #eee;
  }
`

export default function Layout ({ path, user, site, children }) {
  return (
    <Fragment>
      <h1>internetfriendsforever</h1>

      <address>
        <p>
          <a href='http://danielmahal.com/'>Daniel</a> and <a href='http://s-g-k.org/'>Seb</a> working today for our better tomorrow
        </p>
        <p>
          <a title='send us an email' href='mailto:anyone@internetfriendsforever.com'>
            anyone@internetfriendsforever.com
          </a>
        </p>

        <p>
          <a title='open map' href='https://www.openstreetmap.org/node/2785466073'>
            Grønlandsleiret 39<br />
            0190 Oslo
          </a>
        </p>
      </address>

      {children}
    </Fragment>
  )
}
