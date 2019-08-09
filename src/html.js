const styles = require('@cyberspace/styles')
const pretty = require('pretty')

const css = {
  body: styles.add(`
    @font-face {
      /* Custom typeface by Ellmer Stefan */
      font-family: 'IFF Bruce';
      src: url('assets/IFFBruce.ttf') format('truetype');
      font-weight: 0 100;
    }

    @supports (font-variation-settings: normal) {
      & {
        font-family: 'IFF Bruce', sans-serif;
        letter-spacing: -0.009em;
      }
    }

    margin: 0;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 1.3;
    font-feature-settings: 'ss02' 0, 'ss03' 1;
    font-variation-settings: 'wght' 43;
    background: rgb(10, 9, 11);
    color: white;

    @media (min-width: 600px) {
      font-size: 15px;
    }

    a {
      color: #1f9c76;
      text-decoration: none;

      :hover {
        text-decoration: underline;
      }
    }

    header {
      padding: 0 1em;
      margin-bottom: 2em;

      h1, p {
        font-weight: normal;
        font-size: 1em;
        margin: 0;
      }

      section {
        margin: 1em 0;
      }

      @media (min-width: 600px) {
        display: flex;

        section {
          flex-basis: 20em;
          margin-right: 1em;
        }
      }
    }
  `)
}

module.exports = ({
  statusCode = 200,
  title,
  content
}) => ({
  statusCode,
  headers: {
    'Content-Type': 'text/html'
  },
  body: pretty(`
    <!doctype html>
    <html lang="no">
      <head>
        <title>${title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000" />
        <link rel="icon" type="image/png" href="/assets/favicon.png">
        <link rel="stylesheet" type="text/css" href="/styles.css">
      </head>
      <body class="${css.body}">
        <header>
          <section>
            <h1>internetfriendsforever</h1>
            <p>
              <a href='http://danielmahal.com/'>Daniel</a> and
              <a href='http://s-g-k.org/'>Seb</a>
              working today for our better tomorrow
            </p>
          </section>

          <section>
            <p>
              <a title='Go to map' href='https://www.openstreetmap.org/node/2785466073'>
                Grønlandsleiret 39<br />
                0190 Oslo
              </a>
              <br />
              <a title='Send us an email' href='mailto:anyone@internetfriendsforever.com'>
                anyone [at] internetfriendsforever.com
              </a>
            </p>
          </section>
        </header>

        ${content}

        <script>
          Array.from(document.querySelectorAll('figure img')).forEach(img => {
            img.style.maxWidth = parseInt(img.getAttribute('width'), 10) / window.devicePixelRatio + 'px'
          })

          const observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
              const video = entry.target

              console.log(video, entry.isIntersecting)

              if (entry.isIntersecting) {
                video.play()
              } else {
                video.pause()
              }
            })
          })

          Array.from(document.querySelectorAll('figure video')).forEach(video => {
            observer.observe(video)
          })
        </script>
      </body>
    </html>
  `, {
    ocd: true
  })
})
