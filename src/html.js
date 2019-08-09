const styles = require('@cyberspace/styles')
const pretty = require('pretty')

const css = {
  body: styles.add(`
    @font-face {
      font-family: 'IFF Bruce'; /* Custom typeface by Ellmer Stefan */
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

    & ::selection {
      background-color: rgb(246, 199, 129);
      color: rgb(10, 9, 11);
    }

    a {
      color: rgb(246, 199, 129);
      text-decoration: none;

      :hover {
        text-decoration: underline;
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
        <link rel="icon" type="image/png" href="/assets/favicon.jpg">
        <link rel="stylesheet" type="text/css" href="/styles.css">
      </head>
      <body class="${css.body}">
        ${content}

        <script>
          Array.from(document.querySelectorAll('figure img')).forEach(image => {
            if (image.getAttribute('data-allow-upscaling') === "false") {
              image.style.maxWidth = parseInt(image.getAttribute('width'), 10) / window.devicePixelRatio + 'px'
            }
          })
        </script>
      </body>
    </html>
  `, {
    ocd: true
  })
})
