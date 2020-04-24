function sentenceCase (string) {
  if (string) {
    const lowerCase = string.toLowerCase()

    return `${lowerCase[0].toUpperCase()}${lowerCase.slice(1)}`
  }
}

function getYear (dateString) {
  if (dateString) {
    return new Date(dateString).getFullYear()
  }
}

module.exports = {
  sentenceCase,
  getYear
}
