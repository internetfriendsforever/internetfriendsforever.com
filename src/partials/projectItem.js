const styles = require('@cyberspace/styles')
const { localize } = require('../i18n')
const image = require('./image')
const video = require('./video')

const css = {
  container: styles.add(`
    display: flex;
    flex-direction: column;
    width: max-content;
  `),

  description: styles.add(`
    order: 2;
    position: sticky;
    left: 0;
    width: max-content;
  `),

  outcomes: styles.add(`
    display: flex;
    width: max-content;
    align-items: flex-end;

    h3 {
      display: none;
    }
  `),

  figures: styles.add(`
    display: flex;
    width: max-content;
    align-items: flex-end;
  `),

  figure: styles.add(`
    margin-right: 1em;
  `)
}

module.exports = ({ project }) => {
  const {
    title,
    slug,
    outcomes = [],
    roles = [],
    relations = []
  } = project

  return `
    <section id="${localize(slug).current}" class="${css.container}">
      <div class="${css.description}">
        <h2>
          ${localize(title)}
        </h2>

        ${roles.length ? `
          <h3>${localize('Roles')}</h3>
          <ul>
            ${roles.map(role => `
              <li>${localize(role.name)}</li>
            `).join('')}
          </ul>
        ` : ''}

        ${relations.length ? `
          <h3>${localize('Relations')}</h3>
          <ul>
            ${relations.map(({ relation, roles = [] }) => `
              <li>
                ${localize(relation.name)}
                ${roles.length ? `
                  – ${roles.map(role => localize(role.name)).join(', ')}
                ` : ''}
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </div>

      ${outcomes.length ? `
        <div class="${css.outcomes}">
          ${outcomes.map(({ type, documentation = [] }) => `
            <div>
              <h3>${localize(type.name)}</h3>
              <div class="${css.figures}">
                ${documentation.map(item => `
                  <figure class="${css.figure}">
                    ${item._type === 'video' ? video(item) : ''}
                    ${item._type === 'image' ? image(item) : ''}
                  </figure>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </section>
  `
}
