/*eslint no-mixed-operators: off*/
import { MODES, KEY } from '../constants'
import { paneModifierOnLayout } from './utils'

const positiveOrZero = x => x < 1 ? 0 : x - 1

const insertMode = ({ layout, currentPane }, action) => {
  const { command } = action

  const paneActions = {
    [KEY.ESCAPE.value]: ({ cursor, ...pane }) => ({ ...pane, mode: MODES.NORMAL_MODE, cursor: { ...cursor, x: positiveOrZero(cursor.x) } }),
    [KEY.BACKSPACE.value]: pane => handleBackspace(pane),
    [KEY.ENTER.value]: pane => handleEnter(pane),
    [KEY.SHIFT.value]: pane => pane,
    [KEY.META.value]: pane => pane,
    [KEY.ALT.value]: pane => pane,
    default: ({ pane, cursor, text }) => ({ ...pane, text: addCharOnCursorY(text, cursor, command.key), cursor: { ...cursor, x: cursor.x + 1 } })
  }

  const changeModeKeys = {
    [KEY.ESCAPE.value]: MODES.NORMAL_MODE
  }

  return {
    mode: command && changeModeKeys[command.key] || MODES.INSERT_MODE,
    layout: paneModifierOnLayout({ layout, currentPane, paneModifier: command && paneActions[command.key] || paneActions.default })
  }
}

/*
I think it's bad to manipulate the whole text.
Maybe i should index by line?
*/
const addCharOnCursorY = (text, cursor, newChar) => {
  const charBehindCursorIndex = positiveOrZero(cursor.x)
  return text.map(line => {
    if(line.index !== cursor.y) return line

    return {
      ...line,
      value: line.value.reduce((newLine, char) => {
        if (char.index < charBehindCursorIndex) return newLine.concat(char)
        if (char.index > charBehindCursorIndex) return newLine.concat({ ...char, index: char.index + 1 })
        if (char.index === charBehindCursorIndex) {
          if (cursor.x === 0) {
            /* Corner case, when adding on first char, it wont keep last char on index, but add it and push all others */
            return newLine.concat({ value: newChar, index: char.index }, { ...char, index: char.index + 1 })
          } else {
            return newLine.concat({ ...char, index: char.index }, { value: newChar, index: char.index + 1 })
          }
        }

        return newLine
      }, [])
    }
  })
}

const joinCurrentLineWithAboveLine = pane => {
  const { text, cursor } = pane;
  const previousLine = text.find(line => line.index === cursor.y - 1)
  const currentLine = text.find(line => line.index === cursor.y)

  if (!previousLine) return pane

  return ({
    ...pane,
    cursor: { ...cursor, x: previousLine.value.length, y: cursor.y - 1 },
    text: text.filter(line => line.index !== cursor.y).map(line => {
      if (line.index < cursor.y - 1) return line
      if (line.index === cursor.y - 1) return ({
        ...line,
        value: line.value.concat(currentLine.value.map(char => ({ ...char, index: char.index + line.value.length })))
      })
      if (line.index > cursor.y - 1) return ({ ...line, index: line.index - 1 })

      return
    })
  })
}

const handleBackspace = pane => {
  const { text, cursor } = pane
  if (cursor.x === 0) return joinCurrentLineWithAboveLine(pane)

  return ({
    ...pane,
    cursor: { ...cursor, x: cursor.x - 1 },
    text: text.map(line => {
      if (line.index !== cursor.y) return line
      return {
        ...line,
        value: line.value.reduce((newLine, char) => {
          if (char.index < cursor.x - 1) return newLine.concat(char)
          if (char.index > cursor.x - 1) return newLine.concat({ ...char, index: char.index - 1 })
          if (char.index === cursor.x - 1) return newLine

          return newLine
        }, [])
      }
    })
  })
}

const handleEnter = pane => ({
  ...pane,
  cursor: { ...pane.cursor, x: 0, y: pane.cursor.y + 1 },
  text: pane.text.reduce((newText, line) => {
    if (line.index < pane.cursor.y) return newText.concat(line)
    if (line.index === pane.cursor.y) return newText.concat({
      ...line,
      value: line.value.slice(0, pane.cursor.x)
    }, {
      index: line.index + 1,
      value: line.value.slice(pane.cursor.x).map(char => ({ ...char, index: char.index - pane.cursor.x }))
    })
    if (line.index > pane.cursor.y) return newText.concat({ ...line, index: line.index + 1 })

    return
  }, [])
})

export default insertMode