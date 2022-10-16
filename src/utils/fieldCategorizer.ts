export const fieldsCategorizer = (fields) => {
  return Object.keys(fields).map(field => {
    return {
      type: 'smallText',
      nameField: field
    }
  })
}