/*eslint no-mixed-operators: off*/
import { MODES } from '../constants'

const KEY = {
  ESCAPE: { value: 'Escape', code: 27 },
  SHIFT: { value: 'Shift', code: 16 },
  META: { value: 'Meta', code: 91 },
  ALT: { value: 'Alt', code: 18 },
  BACKSPACE: { value : 'Backspace', code: 8 }
}

const positiveOrZero = x => x < 1 ? 0 : x - 1

const insertMode = (state , action) => {
  const { cursor, text } = state
  const { key } = action.command

  switch(action.command.key) {
  case KEY.ESCAPE.value:
    return { ...state, mode: MODES.NORMAL_MODE, cursor: { ...cursor, x: positiveOrZero(cursor.x) } }
  case KEY.BACKSPACE.value:
    return { ...state, text: backspaceCharOnCursorY(text, cursor, key), cursor: { ...cursor, x: cursor.x - 1 } }
  case KEY.SHIFT.value:
  case KEY.META.value:
  case KEY.ALT.value:
    return state
  default:
    return { ...state, text: addCharOnCursorY(text, cursor, key), cursor: { ...cursor, x: cursor.x + 1 } }
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

const backspaceCharOnCursorY = (text, cursor) => {
  if (cursor.x === 0) return text //Cant remove backwards on index 0

  return text.map(line => {
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
}

export default insertMode