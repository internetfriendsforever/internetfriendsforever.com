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

      > li {
        > ul {
          display: flex;
          order: 0;

          > li {
            > a {
              position: relative;
              display: block;
              flex: 1;
              width: 0.75em;
              height: 0.75em;
              color: transparent;
              overflow: hidden;

              ::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                bottom: 1px;
                right: 1px;
                background: white;
                border: 1px solid black;
              }

              :hover::after,
              &.in-viewport::after {
                background: black;
              }
            }
          }
        }
      }
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
              crop,
              hotspot,
              caption,
              description,
              credits[]{
                relation->{
                  name
                },
                roles[]->{
                  name
                }
              },
              poster{
                asset->{
                  url
                }
              },
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
            ${items.map(item => {
              const { project } = item
              const { outcomes = [] } = project
              const slug = localize(project.slug).current

              const documentation = outcomes.flatMap(outcome => (
                outcome.documentation
              )).filter(Boolean)

              return `
                <li>
                  <a href="#${slug}">
                    ${localize(item.project.title)}
                  </a>
                  ${documentation.length ? `
                    <ul>
                      ${documentation.map((item, i) => `
                        <li>
                          <a href="#${slug}-${i}">
                            ${i}
                          </a>
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
                </li>
              `
            }).join('')}
          </ul>
        </nav>
      </details>
      
      ${items.map(projectItem).join('')}
    `
  })
}
