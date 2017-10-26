export const getCurrentLine = state => state.text.find(({ index }) => index === state.cursor.y)
export const getLineBellow = state => state.text.find(({ index }) => index === state.cursor.y + 1)
export const getLineAbove = state => state.text.find(({ index }) => index === state.cursor.y - 1)