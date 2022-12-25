export const fieldsCategorizer = (fields) => {
  return Object.keys(fields).map(field => {
    if (field === "deck" || field === "deckId") {
      return {
        type: "translatedSelect",
        nameField: field
      }
    }
    return {
      type: 'smallText',
      nameField: field
    }
  })
}