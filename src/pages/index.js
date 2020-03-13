const styles = require('@cyberspace/styles')
const html = require('../html')
const sanity = require('../sanity')
const { localize } = require('../i18n')
const projectItem = require('../partials/projectItem')

const css = {
  index: styles.add(`
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
    width: max-content;
    margin: 1em 0;

    summary {
      cursor: pointer;
    }

    ul {
      padding: 0;
      list-style: none;
    }
  `)
}

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
            },
            documentation[]{
              _type,
              asset->{
                url,
                metadata{
                  dimensions
                }
              }
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
      <h1>internetfriendsforever</h1>
      
      <details class="${css.index}">
        <summary>Index</summary>
        <nav>
          <ul>
            ${items.map(item => `
              <li>
                <a href="#${localize(item.project.slug).current}">
                  ${localize(item.project.title)}
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>
      </details>
      
      ${items.map(projectItem).join('')}
    `
  })
}
