/*eslint no-mixed-operators: off*/
import { MODES } from '../constants'
import {
  getCurrentLine,
  getLineAbove,
  checkIfHasLineOn,
  getLineBellow,
  paneModifierOnLayout,
  addColumnPane
} from './utils'

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

const normalMode = ({ layout, currentPane }, action) => {
  const { command } = action

  const paneActions = {
    l: ({ cursor, ...pane }) => ({...pane, cursor: { ...cursor, x: cursor.x === getCurrentLine({...pane, cursor}).value.length - 1 ? cursor.x : cursor.x + 1 }}),
    h: ({ cursor, ...pane }) => ({...pane, cursor: { ...cursor, x: cursor.x === 0 ? cursor.x  : cursor.x - 1 }}),
    k: ({ cursor, ...pane }) => checkIfHasLineOn('previous', { ...pane, cursor }) && {...pane, cursor: { y: cursor.y - 1, x: getLastCharIndex(getLineAbove({ ...pane, cursor }), cursor.x) }},
    j: ({ cursor, ...pane }) => checkIfHasLineOn('next', { ...pane, cursor }) && {...pane, cursor: { y: cursor.y + 1 , x: getLastCharIndex(getLineBellow({ ...pane, cursor }), cursor.x)} },
    o: ({ cursor, text, ...pane }) => ({...pane, text: addLineBellow({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y + 1, x: 0 } }),
    O: ({ cursor, text, ...pane }) => ({...pane, text: addLineAbove({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y, x: 0 } }),
    a: ({ cursor, ...pane }) => ({...pane, cursor: { ...cursor, x: cursor.x + 1 } }),
    A: ({ cursor, ...pane }) => ({...pane, cursor: { ...cursor, x: getCurrentLine({ ...pane, cursor }).value.length } }),
    i: pane => pane,
    0: ({ cursor, ...pane }) => ({...pane, cursor: {...cursor, x: 0}}),
    '$': ({ cursor, ...pane }) => ({...pane, cursor: { ...cursor, x: getCurrentLine({ ...pane, cursor }).value.length }})
  }

  const changeModeKeys = {
    o: MODES.INSERT_MODE,
    O: MODES.INSERT_MODE,
    a: MODES.INSERT_MODE,
    A: MODES.INSERT_MODE,
    i: MODES.INSERT_MODE
  }

  const layoutActions = {
    ['C-d']: addColumnPane
  }

  return {
    mode: command && changeModeKeys[command.key] || MODES.NORMAL_MODE,
    layout: command && layoutActions[command.key] && layoutActions[command.key]({ layout, currentPane }) || paneModifierOnLayout({ layout, currentPane, paneModifier: command && paneActions[command.key] || (i => i) })
  }
}

export default normalMode