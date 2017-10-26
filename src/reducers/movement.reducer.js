/*eslint no-mixed-operators: off*/
import { MODES } from '../constants'

const getCurrentLine = state => state.text.find(({ index }) => state.cursor.y === index)
const checkIfHasLineOn = (type, state) => {
  if (!['previous', 'next'].includes(type)) throw new Error('Invalid cursor position type')

  return {
    previous: state.text[state.cursor.y - 1],
    next: state.text[state.cursor.y + 1]
  }[type]
}

const addLineBellow = ({ text, currentCursor: { y } }) => {
  if (text.length - 1 === y) return text.concat({ value: '¬', index: y + 1 })

  return text.reduce((updatedText, line) => {
    if (line.index < y) return updatedText.concat(line)
    if (line.index > y) return updatedText.concat({ ...line, index: line.index + 1 })
    if (line.index === y) return updatedText.concat([line, { value: '¬', index: y + 1 }])
    return updatedText
  }, [])
}

const addLineAbove = ({ text, currentCursor: { y } }) =>
  text.reduce((updatedText, line) => {
    if (line.index < y) return updatedText.concat(line)
    if (line.index > y) return updatedText.concat({ ...line, index: line.index + 1 })
    if (line.index === y) return updatedText.concat([{ value: '¬', index: y }, { ...line, index: y + 1 }])

    return updatedText
  }, [])

const checkIfCharIs = (type, state) => {
  const currentLine = getCurrentLine(state)
  if (!currentLine) return false
  if (!['first', 'last'].includes(type)) throw new Error('Invalid cursor position type')

  return {
    first: !currentLine.value[state.cursor.x - 1],
    last: !currentLine.value[state.cursor.x + 1],
  }[type]
}

const movement = (state , action) => {
  const { cursor, text } = state
  const { mode, command } = action

  const handlerMapper = {
    [MODES.NORMAL_MODE]: {
      l: {...state, cursor: { ...cursor, x: checkIfCharIs('last', state) ? getCurrentLine(state).value.length - 1 : cursor.x + 1 }},
      h: {...state, cursor: { ...cursor, x: checkIfCharIs('first', state) ? 0 : cursor.x - 1 }},
      k: checkIfHasLineOn('previous', state) && {...state, cursor: { ...cursor, y: cursor.y - 1 }},
      j: checkIfHasLineOn('next', state) && {...state, cursor: { ...cursor, y: cursor.y + 1 }},
      o: {...state, text: addLineBellow({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y + 1 } },
      O: {...state, text: addLineAbove({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y } }
    }
  }

  return handlerMapper[mode] && handlerMapper[mode][command.key] || state
}

export default movement