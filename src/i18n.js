const languages = [
  { id: 'nb', title: 'Norwegian bokmål' },
  { id: 'en', title: 'English' }
]

const dictionary = {
  Outcomes: {
    nb: 'Utfall'
  },
  Roles: {
    nb: 'Roller'
  },
  Relations: {
    nb: 'Relasjoner'
  }
}

function localize (input) {
  switch (typeof input) {
  case 'string':
    return localize({
      en: input,
      ...dictionary[input]
    })
  case 'object':
    const availableLanguage = languages.find(language => (
      Object.prototype.hasOwnProperty.call(input, language.id)
    ))

    if (availableLanguage) {
      return input[availableLanguage.id]
    }

    return null
  }
}

module.exports = {
  languages,
  localize
}
