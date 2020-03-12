const { localize } = require('../../i18n')

module.exports = ({ project }) => {
  const {
    title,
    slug,
    outcomes = [],
    roles = [],
    relations = []
  } = project

  return `
    <section id="${localize(slug).current}">
      <h2>${localize(title)}</h2>

      ${outcomes.length ? `
        <h3>${localize('Outcomes')}</h3>
        <ul>
          ${outcomes.map(outcome => `
            <li>${localize(outcome.type.name)}</li>
          `).join('')}
        </ul>
      ` : ''}

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
                (${roles.map(role => localize(role.name)).join(', ')})
              ` : ''}
            </li>
          `).join('')}
        </ul>
      ` : ''}
    </section>
  `
}
