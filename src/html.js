const pretty = require('pretty')

module.exports = ({
  title = '',
  description = '',
  content
}) => pretty(`
  <!DOCTYPE html>
  <html lang="nb">
    <head>
      <title>${title}</title>
      <meta name="description" content="${description}">
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000" />
      <link rel="icon" type="image/jpg" href="assets/favicon-2020.png">
      <meta property="og:description" content="${description}" />
      <meta property="og:url" content="https://internetfriendsforever.com/" />
      <meta property="og:image" content="https://internetfriendsforever.com/assets/favicon.jpg" />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <link rel="stylesheet" type="text/css" href="styles.css" />
      <style>
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #f8f7f8;
          min-width: min-content;
          margin: 0;
          font-size: 14px;
          line-height: 1.3;
          font-family: sans-serif;
          color: #a8a8a8;
        }

        figure {
          margin: 0;
        }
      </style>
    </head>
    <body>
      ${content}
      <script src="assets/index.js"></script>
    </body>
  </html>
`, {
  ocd: true
})
