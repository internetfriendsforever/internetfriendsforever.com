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
    margin: 0rem;
    padding: 0.75rem;

    summary {
      cursor: pointer;
    }

    h1 {
      font-size: 1em;
      margin: 0;
      display: inline;
      font-weight: normal;
    }

    a {
      text-decoration: none;
      color: dimgray;

      :hover {
        color: black;
      }
    }

    &[open] {
      min-height: 100vh;
      background: linear-gradient(90deg, #f8f7f8, #f8f7f8, rgba(255,255,255,0.0), rgba(255,255,255,0.0), rgba(255,255,255,0.0));
      background-size: 200% 100%;
      animation: slideways 20s ease-in-out infinite;
    }

    @keyframes slideways {
      0% { background-position: 0% 0% }
      50% { background-position: 20% 0% }
      100% { background-position: 0% 0% }
    }

    ul {
      padding: 0;
      list-style: none;

      > li {
        margin-bottom: 0.25em;

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
          startDate,
          endDate,
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
      <details class="${css.index}">
        <summary><h1>index <b>internetfriendsforever</b></h1></summary>
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
