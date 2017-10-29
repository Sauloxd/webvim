export const getCurrentLine = state => state.text.find(({ index }) => index === state.cursor.y)
export const getLineBellow = state => state.text.find(({ index }) => index === state.cursor.y + 1)
export const getLineAbove = state => state.text.find(({ index }) => index === state.cursor.y - 1)
export const checkIfHasLineOn = (type, state) => {
  if (!['previous', 'next'].includes(type)) throw new Error('Invalid cursor position type')

  const response = {
    previous: state.text[state.cursor.y - 1],
    next: state.text[state.cursor.y + 1]
  }[type]
  return response
}
