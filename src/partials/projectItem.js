const styles = require('@cyberspace/styles')
const { localize } = require('../i18n')
const { getYear } = require('../utils')
const image = require('./image')
const video = require('./video')
const sanity = require('../sanity')

const css = {
  container: styles.add(`
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: 6rem 0;

    &:first-of-type {
      margin-top: 3rem;
    }
  `),

  description: styles.add(`
    order: 2;
    position: sticky;
    left: 0;
    width: 100vw;
    padding: 0 0.25rem;
    box-sizing: border-box;
    line-height: 1.2;

    @media (min-width: 40em) {
      display: flex;
      flex-wrap: wrap;

      > div {
        flex: 1;
        width: 50%;
        max-width: 36em;
      }
    }
  `),

  outcomes: styles.add(`
    display: flex;
    width: max-content;
    align-items: flex-end;
    padding: 0 0.75rem;
  `),

  figures: styles.add(`
    display: flex;
    width: max-content;
    align-items: flex-end;
    // border-bottom: 3px solid hsla(133, 73%, 45%, 1);
    // padding-bottom: 4px;
  `),

  figure: styles.add(`
    display: flex;
    margin-right: 1.5em;
    max-width: 85vw;

    img, video {
      box-shadow: 0px 0px 1px lightgray;
    }
  `),

  figureWithCaption: styles.add(`
    max-width: calc(85vw + 7rem);

    img, video {
      max-width: 85vw;
    }

    figcaption {
      font-size: 0.75em;
      flex: 0;
      width: min-content;
      min-width: 7rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-left: 0.75rem;
      line-height: 1.4;

      p {
        margin-bottom: 0;

        &:first-child {
          ::before {
            display: block;
            font-size: 0.7em;
            vertical-align: middle;
            content: '◀ ';
            margin-bottom: 0.3rem;
          }
        }
      }
    }
  `),

  screenshotMobile: styles.add(`
    background: #111;
    padding: 2rem 0.75rem;
    border-radius: 1.5rem;

    img {
      box-shadow: 0px 0px 1px #444;
    }
  `),

  roles: styles.add(`
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;

      &:not(:first-child) {
        text-transform: lowercase;
      }

      &:not(:last-child) {
        ::after {
          content: ',';
        }
      }
    }
  `),

  relations: styles.add(`
    margin-top: 1rem;
    padding: 0;
    list-style: none;

    > li {
      border-top: 1px solid;
      margin-bottom: 0.25rem;
      display: flex;

      b {
        font-weight: normal;
        width: 33.333%;
        max-width: 10em;
      }

      > ul {
        list-style: none;
        padding: 0;
        width: 66.666%;
      }
    }
  `),

  us: styles.add(`
    padding: 0 0.5rem;

    h2 {
      border-top: 1px solid;
      margin: 1rem 0 0 0;
      font-size: 1em;
      font-weight: normal;
      color: dimgray;
    }
  `),

  them: styles.add(`
    padding: 0 0.5rem;
  `)
}

const renderRelation = ({ name, websiteUrl }) => websiteUrl ? (
  `<a href="${websiteUrl}" target="_blank" rel="noopener">${localize(name)}</a>`
) : localize(name)

const sortByName = (a, b) => (localize(a.name) > localize(b.name)) ? 1 : -1

module.exports = ({ project }) => {
  const {
    title,
    startDate,
    endDate,
    outcomes = [],
    roles = [],
    relations = []
  } = project

  const dateString = getYear(startDate) === getYear(endDate)
    ? getYear(endDate) : startDate && endDate
      ? `${getYear(startDate)}–${getYear(endDate)}` : !startDate && endDate
        ? getYear(endDate) : startDate && !endDate
          ? `${getYear(startDate)}–ongoing` : ''

  const slug = localize(project.slug).current

  let documentationIndex = 0

  const relationsByRole = relations.reduce((groups, { relation, roles }) => {
    roles.forEach(role => {
      let group = groups.find(({ _id }) => _id === role._id)

      if (!group) {
        group = { ...role, relations: [] }
        groups.push(group)
      }

      group.relations.push(relation)
    })

    return groups
  }, [])

  return `
    <section id="${slug}" class="${css.container}">
      <div class="${css.description}">
        <div class="${css.us}">
          <h2>
            ${localize(title)}
          </h2>

          ${roles.length ? `
            <ul class="roles ${css.roles}" title="${localize('Roles')}">
              ${roles.map(role => `
                <li>${localize(role.name)}</li>
              `).join('')}
            </ul>
          ` : ''}

          ${dateString ? `
            <div>
              ${dateString}
            </div>
          ` : ''}
        </div>

        ${relationsByRole.length ? `
          <div class="${css.them}">
            <ul class="${css.relations}" title="${localize('Relations')}">
              ${relationsByRole.sort(sortByName).map(role => `
                ${roles.length ? `
                  <li>
                    <b>${localize(role.name)}</b>

                    <ul>
                      ${role.relations.sort(sortByName).map(renderRelation).map(r => `<li>${r}</li>`).join('')}
                    </ul>
                  </li>
                ` : ''}
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>

      ${outcomes.length ? `
        <div class="${css.outcomes}">
          ${outcomes.map(({ type, documentation = [] }) => `
            <div title="${localize(type.name)}">
              <div class="${css.figures}">
                ${documentation.map(item => {
                  const { _type, credits = [] } = item
                  const caption = localize(item.caption)

                  return `
                    <figure class="${css.figure} ${caption || credits.length ? css.figureWithCaption : ''} ${item.imageType === 'screenshotMobile' ? css.screenshotMobile : ''}" id="${slug}-${documentationIndex++}">
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
                                ${renderRelation(relation)}
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
