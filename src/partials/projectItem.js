const styles = require('@cyberspace/styles')
const { localize } = require('../i18n')
const image = require('./image')
const video = require('./video')
const sanity = require('../sanity')

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
  `),

  figures: styles.add(`
    display: flex;
    width: max-content;
    align-items: flex-end;
  `),

  figure: styles.add(`
    margin-right: 1em;
    max-width: 90vw;
  `)
}

module.exports = ({ project }) => {
  const {
    title,
    outcomes = [],
    roles = [],
    relations = []
  } = project

  const slug = localize(project.slug).current

  let documentationIndex = 0

  return `
    <section id="${slug}" class="${css.container}">
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
                ${documentation.map(item => {
                  const { _type, credits = [], caption } = item
                  return `
                    <figure class="${css.figure}" id="${slug}-${documentationIndex++}">
                      ${_type === 'video' ? video(item) : ''}
                      ${_type === 'image' ? image(item) : ''}
                      ${caption || credits.length ? `
                        <figcaption>
                          ${caption ? sanity.html(caption) : ''}
                          ${credits.length ? `
                            <p>
                              ${credits.map(({ relation, roles = [] }) => `
                                ${roles.length ? `
                                  ${roles.map(role => localize(role.name)).join(', ')}: 
                                ` : ''}
                                ${localize(relation.name)}
                              `.trim()).join(', ')}
                            </p>
                          ` : ''}
                        </figcaption>
                      ` : ''}
                    </figure>
                  `
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </section>
  `
}
