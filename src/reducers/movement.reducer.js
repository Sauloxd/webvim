/*eslint no-mixed-operators: off*/
import { MODES } from '../constants'
import {
  getCurrentLine,
  getLineAbove,
  checkIfHasLineOn,
  getLineBellow } from './utils'

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
  return lastChar && lastChar.index < x ? lastChar.index : x || 0
}

const movement = (action, pane) => {
  const { cursor, text } =pane
  const { command } = action

  const handlerMapper = {
    l: () => ({...pane, cursor: { ...cursor, x: cursor.x === getCurrentLine(pane).value.length - 1 ? cursor.x : cursor.x + 1 }}),
    h: () => ({...pane, cursor: { ...cursor, x: cursor.x === 0 ? cursor.x  : cursor.x - 1 }}),
    k: () => checkIfHasLineOn('previous', pane) && {...pane, cursor: { y: cursor.y - 1, x: getLastCharIndex(getLineAbove(pane), cursor.x) }},
    j: () => checkIfHasLineOn('next', pane) && {...pane, cursor: { y: cursor.y + 1 , x: getLastCharIndex(getLineBellow(pane), cursor.x)} },
    o: () => ({...pane, mode: MODES.INSERT_MODE, text: addLineBellow({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y + 1, x: 0 } }),
    O: () => ({...pane, mode: MODES.INSERT_MODE, text: addLineAbove({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y, x: 0 } }),
    a: () => ({...pane, mode: MODES.INSERT_MODE, cursor: { ...cursor, x: cursor.x + 1 } }),
    A: () => ({...pane, mode: MODES.INSERT_MODE, cursor: { ...cursor, x: getCurrentLine(pane).value.length } }),
    i: () => ({...pane, mode: MODES.INSERT_MODE }),
    0: () => ({...pane, cursor: {...cursor, x: 0}}),
    '$': () => ({...pane, cursor: { ...cursor, x: getCurrentLine(pane).value.length }})
  }

  return command && handlerMapper[command.key] && handlerMapper[command.key]() || pane
}

export default movement