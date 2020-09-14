const styles = require('@cyberspace/styles')
const html = require('../html')
const sanity = require('../sanity')
const { localize } = require('../i18n')
const project = require('../partials/project')

const css = {
  index: styles.add(`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: max-content;
    max-width: 100vw;
    margin: 0rem;

    summary {
      cursor: pointer;
      padding: 0.75rem;
      outline-color: inherit;
      width: min-content;
      white-space: nowrap;
    }

    h1 {
      font-size: 1em;
      font-weight: normal;
      margin: 0;
      display: inline-block;
      transform: translate(-0.25em, 0);
    }

    &[open] {
      min-height: 100vh;
      background: linear-gradient(90deg, #f8f7f8, #f8f7f8, rgba(255,255,255,0.0), rgba(255,255,255,0.0), rgba(255,255,255,0.0));
      background-size: 200% 100%;
    }

    nav, footer {
      padding: 0.75rem;
    }

    footer {
      max-width: 36em;
    }

    ul {
      padding: 0;
      list-style: none;

      > li {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-end;
        margin-right: 1px;

        > a {
          display: block;
          flex-basis: 75%;
          flex-grow: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        > ul {
          display: flex;
          flex-basis: 25%;
          flex-grow: 1;
          flex-shrink: 0;

          > li {
            > a {
              position: relative;
              display: block;
              flex: 1;
              background: currentColor;
              opacity: 0.25;

              :hover,
              &.in-viewport {
                opacity: 1;
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
      colophon,
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
              imageType,
              credits[]{
                relation->{
                  name,
                  websiteUrl
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
                _id,
                url,
                metadata{
                  lqip,
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
              name,
              websiteUrl
            },
            roles[]->{
              _id,
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
        <summary><h1>internetfriendsforever</h1></summary>
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
                  <ul>
                    ${documentation.map((item, i) => `
                      <li>
                        <a href="#${slug}-${i}">
                          ${i}
                        </a>
                      </li>
                    `).join('')}
                  </ul>
                </li>
              `
            }).join('')}
          </ul>
        </nav>

        <footer>
          ${sanity.html(catalogue.colophon)}
        </footer>
      </details>

      ${items.map(project).join('')}
    `
  })
}
