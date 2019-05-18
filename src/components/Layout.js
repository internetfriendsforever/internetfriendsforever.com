import React from 'react'
import { injectGlobal } from 'emotion'
import styled from 'react-emotion'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Lyon';
    font-style: normal;
    font-weight: 400;
    src: url('${require('../assets/fonts/LyonText-RegularNo2-Web.woff2')}') format('woff2'),
      url('${require('../assets/fonts/LyonText-RegularNo2-Web.woff')}') format('woff');
  }

  body {
    font-family: Lyon, serif;
    line-height: 1.1;
    background: #c6c6d2;
    margin: 0;
    color: white;

    @media (min-width: 680px) {
      font-size: 0.875em;
      line-height: 1.25;
    }
  }

  a {
    color: inherit;
    opacity: 0.8;
    text-decoration: none;

    &:hover {
      opacity: 1;
    }
  }

  ::selection {
    background: white;
  }
  ::-moz-selection {
    background: black;
  }
`

const Container = styled('div')`
`

const Header = styled('header')`
  position: relative;
  z-index: 10;
  padding: 0.5em;

  h1, h2, h3, p {
    font-size: 1em;
    font-weight: normal;
    margin: 0.5em 0;

    &:first-child {
      margin-top: 0;
    }
  }

  address {
    font-style: normal;
  }

  @media (min-width: 680px) {
    width: 20%;
    position: fixed;
    border-right: 1px solid rgb(255, 255, 255, 0.3);
    top: 0;
    left: 0;
    bottom: 0;
    max-width: 14rem;
    // mix-blend-mode: exclusion;
  }
`

const Main = styled('main')``

export default function Layout ({ path, user, site, children }) {
  return (
    <Container>
      <Header>
        <h1>internet<wbr />friends<wbr />forever</h1>

        <address>
          <p>
            <a href='http://danielmahal.com/'>Daniel</a> and <a href='http://s-g-k.org/'>Seb</a> working today for our better tomorrow
          </p>
          <p>
            <a title='send us an email' href='mailto:anyone@internetfriendsforever.com'>
              anyone@internet<wbr />friends<wbr />forever.com
            </a>
          </p>

          <p>
            <a title='open map' href='https://www.openstreetmap.org/node/2785466073'>
              Grønlandsleiret 39<br />
              0190 Oslo
            </a>
          </p>
        </address>
      </Header>

      <Main>
        {children}
      </Main>
    </Container>
  )
}
