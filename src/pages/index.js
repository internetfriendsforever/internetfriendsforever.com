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
    max-width: 100vw;
    margin: 0rem;

    summary {
      cursor: pointer;
      padding: 0.75rem;
      color: #1fc743;
      outline-color: inherit;
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

      h1 {
        ::after {
          content: '✕';
          float: right;
          display: inline-block;
          padding-right: 0.75rem;
        }
      }
    }

    nav, footer {
      padding: 0.75rem;
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
              min-width: 0.6rem;
              height: 0.6rem;
              font-size: 0.65em;
              line-height: 0.7rem;
              text-align: center;
              vertical-align: top;
              color: inherit;
              z-index: 1;
              background: white;
              border: 1px solid;
              border-radius: 50%;
              margin-right: 0.05em;


              :hover,
              &.in-viewport {
                background: #1fc743;
                color: white;
                border-color: transparent;
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

        <footer>
          <p>
            Grønlandsleiret 39, 0190 Oslo <br />
            anyone@internetfriendsforever.com
          </p>
        </footer>
      </details>

      ${items.map(projectItem).join('')}
    `
  })
}
