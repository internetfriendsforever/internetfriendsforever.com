const styles = require('@cyberspace/styles')
const { localize } = require('../i18n')
const { sentenceCase, getYear } = require('../utils')
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
    padding: 0 0.75rem;
    box-sizing: border-box;

    @media (min-width: 40em) {
      display: flex;
      flex-wrap: wrap;

      > div {
        flex: 1;
        width: 50%;
        max-width: 30em;
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
    // border-bottom: 3px solid #1fc743;
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
      font-size: 0.8em;
      flex: 0;
      width: min-content;
      min-width: 7rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-left: 0.75rem;

      p {
        margin-bottom: 0;

        &:first-child {
          ::before {
            font-size: 0.7em;
            vertical-align: middle;
            content: '◀ ';
            margin-right: 0.3em;
          }
        }
      }
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
    margin-top: 0.75em;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;
      margin-right: 0.75em;
      margin-top: 0.2em;

      b {
        font-weight: normal;
        color: gray;
      }
    }
  `),

  us: styles.add(`
    font-size: 1em;
    line-height: 1.1em;

    h2 {
      margin: 0.75rem 0 0 0;
      font-size: 1em;
      font-weight: normal;
      color: dimgray;
    }
  `)
}

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

        ${relations.length ? `
          <div>
            <ul class="${css.relations}" title="${localize('Relations')}">
              ${relations.map(({ relation, roles = [] }) => `
                ${roles.length ? `
                  <li>
                    ${sentenceCase(roles.map(role => localize(role.name)).join(', '))}
                    <b>${localize(relation.name)}</b>
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
                    <figure class="${css.figure} ${caption || credits.length ? css.figureWithCaption : ''}" id="${slug}-${documentationIndex++}">
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
