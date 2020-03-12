const html = require('../html')
const sanity = require('../sanity')
const { localize } = require('../i18n')
const item = require('../partials/item')
const header = require('../partials/header')

module.exports = async () => {
  const catalogue = await sanity.client.fetch(`
    *[_id == "9c2b5dbf-5447-4d2d-ae5a-a84b660cd536"]{
      _id,
      items[_type match 'projectItem']{
        project->{
          title,
          slug,
          outcomes[]{
            type->{
              name
            }
          },
          roles[]->{
            name
          },
          relations[]{
            relation->{
              name
            },
            roles[]->{
              name
            }
          }
        }
      }
    }[0]
  `)

  const { items } = catalogue

  return html({
    title: 'internetfriendsforever — design · research · communication',
    description: 'Daniel and Seb working today for your better tomorrow',
    content: `
      ${header()}
      
      <details>
        <summary>Index</summary>
        <ul>
          ${items.map(item => `
            <li>
              <a href="#${localize(item.project.slug).current}">
                ${localize(item.project.title)}
              </a>
            </li>
          `).join('')}
        </ul>
      </details>
      
      ${items.map(item).join('')}
    `
  })
}
