const styles = require('@cyberspace/styles')

const css = {
  header: styles.add(`
    padding: 0 1em;

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
  `)
}

module.exports = () => `
  <header class="${css.header}">
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
          Grønlandsleiret 39, 0190 Oslo
        </a>
        <br />
        <a title='Send us an email' href='mailto:anyone@internetfriendsforever.com'>
          anyone [at] internetfriendsforever.com
        </a>
      </p>
    </section>
  </header>
`
