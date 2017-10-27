/*eslint no-mixed-operators: off*/
import { MODES } from '../constants'

const KEY = {
  ESCAPE: { value: 'Escape', code: 27 },
  SHIFT: { value: 'Shift', code: 16 },
  META: { value: 'Meta', code: 91 },

}

const insertMode = (state , action) => {
  const { cursor, text } = state
  const { key } = action.command

  switch(action.command.key) {
  case KEY.ESCAPE.value:
    return { ...state, mode: MODES.NORMAL_MODE, cursor: { ...cursor, x: cursor.x - 1 } }
  case KEY.SHIFT.value:
  case KEY.META.value:
    return state
  default:
    return { ...state, text: updateLine(text, cursor, key), cursor: { ...cursor, x: cursor.x + 1 } }
  }
}

/*
I think it's bad to manipulate the whole text.
Maybe i should index by line?
*/
const updateLine = (text, cursor, newChar) => {
  const charBehindCursorIndex = cursor.x - 1 < 0 ? 0 : cursor.x - 1
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

export default insertMode