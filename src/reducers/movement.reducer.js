/*eslint no-mixed-operators: off*/
import { MODES } from '../constants'
import { getCurrentLine, getLineAbove, getLineBellow } from './utils'

const checkIfHasLineOn = (type, state) => {
  if (!['previous', 'next'].includes(type)) throw new Error('Invalid cursor position type')

  const response = {
    previous: state.text[state.cursor.y - 1],
    next: state.text[state.cursor.y + 1]
  }[type]
  return response
}

/*
  Maybe create a class Char, and Line to keep the code understandable
*/
const addLineBellow = ({ text, currentCursor: { y } }) => {
  const newChar = [{ value: ' ', index: 0 }]
  if (text.length - 1 === y) return text.concat({ value: newChar, index: y + 1 })

  return text.reduce((updatedText, line) => {
    if (line.index < y) return updatedText.concat(line)
    if (line.index > y) return updatedText.concat({ ...line, index: line.index + 1 })
    if (line.index === y) return updatedText.concat([line, { value: newChar, index: y + 1 }])
    return updatedText
  }, [])
}

const addLineAbove = ({ text, currentCursor: { y } }) =>
  text.reduce((updatedText, line) => {
    if (line.index < y) return updatedText.concat(line)
    if (line.index > y) return updatedText.concat({ ...line, index: line.index + 1 })
    if (line.index === y) return updatedText.concat([{ value: [{ index: 0, value: ' ' }], index: y }, { ...line, index: y + 1 }])

    return updatedText
  }, [])

const getLastCharIndex = (line, x) => {
  const lastChar = line.value.slice(-1)[0]
  return lastChar.index < x ? lastChar.index : x
}

const movement = (state , action) => {
  const { cursor, text } = state
  const { mode, command } = action

  const handlerMapper = {
    [MODES.NORMAL_MODE]: {
      l: () => ({...state, cursor: { ...cursor, x: cursor.x === getCurrentLine(state).value.length - 1 ? cursor.x : cursor.x + 1 }}),
      h: () => ({...state, cursor: { ...cursor, x: cursor.x === 0 ? cursor.x  : cursor.x - 1 }}),
      k: () => checkIfHasLineOn('previous', state) && {...state, cursor: { y: cursor.y - 1, x: getLastCharIndex(getLineAbove(state), cursor.x) }},
      j: () => checkIfHasLineOn('next', state) && {...state, cursor: { y: cursor.y + 1 , x: getLastCharIndex(getLineBellow(state), cursor.x)} },
      o: () => ({...state, text: addLineBellow({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y + 1, x: 0 } }),
      O: () => ({...state, text: addLineAbove({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y, x: 0 } }),
      i: () => ({...state, mode: MODES.INSERT_MODE }),
    }
  }

  return handlerMapper[mode] && handlerMapper[mode][command.key] && handlerMapper[mode][command.key]() || state
}

export default movement