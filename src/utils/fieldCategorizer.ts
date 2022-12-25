export const fieldsCategorizer = (fields) => {
  const translatedFields = [
    "deck", "deckId", "combinationTypeId", "combinationSubjectId", "combinationId", "cardSequenceList", "combinationInfoId"
  ]
  const bigFields = [
    "textOne", "textTwo", "textThree", "textFour"
  ]
  return Object.keys(fields).map(field => {
    if  (translatedFields.includes(field)) {
      return {
        type: "translatedSelect",
        nameField: field
      }
    }
    if  (bigFields.includes(field)) {
      return {
        type: "bigText",
        nameField: field
      }
    }
    return {
      type: 'smallText',
      nameField: field
    }
  })
}