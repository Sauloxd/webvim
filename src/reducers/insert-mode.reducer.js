/*eslint no-mixed-operators: off*/
import { MODES } from '../constants'

const KEY = {
  ESCAPE: { value: 'Escape', code: 27 },
  SHIFT: { value: 'Shift', code: 16 },
  META: { value: 'Meta', code: 91 },
  ALT: { value: 'Alt', code: 18 },
  ENTER: { value: 'Enter', code: 13 },
  BACKSPACE: { value : 'Backspace', code: 8 }
}

const positiveOrZero = x => x < 1 ? 0 : x - 1

const insertMode = (action, pane) => {
  const { cursor, text } = pane
  const { key } = action.command

  switch(action.command.key) {
  case KEY.ESCAPE.value:
    return { ...pane, mode: MODES.NORMAL_MODE, cursor: { ...cursor, x: positiveOrZero(cursor.x) } }
  case KEY.BACKSPACE.value:
    return handleBackspace(pane)
  case KEY.ENTER.value:
    return handleEnter(pane)
  case KEY.SHIFT.value:
  case KEY.META.value:
  case KEY.ALT.value:
    return pane
  default:
    return { ...pane, text: addCharOnCursorY(text, cursor, key), cursor: { ...cursor, x: cursor.x + 1 } }
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

const joinCurrentLineWithAboveLine = state => {
  const { text, cursor } = state;
  const previousLine = text.find(line => line.index === cursor.y - 1)
  const currentLine = text.find(line => line.index === cursor.y)

  if (!previousLine) return state

  return ({
    ...state,
    cursor: { ...cursor, x: previousLine.value.length - 1, y: cursor.y - 1 },
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

const handleBackspace = state => {
  const { text, cursor } = state
  if (cursor.x === 0) return joinCurrentLineWithAboveLine(state)

  return ({
    ...state,
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

const handleEnter = state => ({
  ...state,
  cursor: { ...state.cursor, x: 0, y: state.cursor.y + 1 },
  text: state.text.reduce((newText, line) => {
    if (line.index < state.cursor.y) return newText.concat(line)
    if (line.index === state.cursor.y) return newText.concat({
      ...line,
      value: line.value.slice(0, state.cursor.x)
    }, {
      index: line.index + 1,
      value: line.value.slice(state.cursor.x).map(char => ({ ...char, index: char.index - state.cursor.x }))
    })
    if (line.index > state.cursor.y) return newText.concat({ ...line, index: line.index + 1 })

    return
  }, [])
})

export default insertMode