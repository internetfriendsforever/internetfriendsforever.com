const blocksToHTML = require('@sanity/block-content-to-html')
const styles = require('@cyberspace/styles')
const html = require('../html')
const sanity = require('../sanity')
const { localize } = require('../i18n')
const project = require('../partials/project')

const css = {
  privacy: styles.add(`
    margin-bottom: 1em;
  `),
  index: styles.add(`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: max-content;
    max-width: 85vw;
    max-height: 100vh;
    margin: 0rem;

    summary {
      cursor: pointer;
      padding: 0.75rem;
      outline-color: inherit;
      white-space: nowrap;
      color: blue;
    }

    h1 {
      font-weight: normal;
      margin: 0;
      display: inline-block;
    }

    h2 {
      font-size: 1em;
    }

    &[open] {
      min-height: 100vh;
      background: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      overflow: auto;

      summary {
        ::before {
          content: '✕';
          display: inline-block;
          position: absolute;
          top: 0;
          right: 0;
          padding: 0.8rem 1rem;
        }
      }
    }

    nav,
    article,
    footer {
      padding: 0 3rem 0 0.75rem;
      margin: 2.5rem 0;
    }

    nav {
      margin-top: 1.5rem;
    }

    footer,
    article {
      max-width: 33em;
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

  const about = await sanity.client.fetch(`
    *[_id == "7990f0a2-63e3-4c5c-bb67-f366837d36cc"]{ body }[0]
  `)

  const privacy = await sanity.client.fetch(`
    *[_id == "privacy"]{ body }[0]
  `)

  const aboutHTML = sanity.html(about.body)
  const privacyHTML = sanity.html(privacy.body)

  const { items } = catalogue

  return html({
    title: 'internetfriendsforever — design · research · communication',
    description: 'Daniel and Seb working today for your better tomorrow',
    content: `
      <details class="${css.index}" id="index">
        <summary><span>internetfriendsforever</span></summary>

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

        <article>
          ${aboutHTML}
        </article>

        <footer>
          ${sanity.html(catalogue.colophon, {
            serializers: {
              marks: {
                location: props => {
                  const { lat, lng } = props.mark
                  return blocksToHTML.h('a', {
                    href: `https://www.openstreetmap.org/#map=14/${lat}/${lng}`,
                    target: '_blank',
                    rel: 'noopener'
                  }, props.children)
                }
              }
            }
          })}
        </footer>

        <details class="${css.privacy}">
          <summary>Personvererklæring</summary>

          <article>
            ${privacyHTML}
          </article>
        </details>
      </details>

      ${items.map(project).join('')}
    `
  })
}
