const pretty = require('pretty')

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
      <body>
        ${content}
      </body>
    </html>
  `, {
    ocd: true
  })
})
