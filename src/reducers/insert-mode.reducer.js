/*eslint no-mixed-operators: off*/
import { MODES } from '../constants'

const KEY = {
  ESCAPE: { value: 'Escape', code: 27 }
}

const insertMode = (state , action) => {
  const { cursor, text } = state
  const { key, keyCode } = action.command

  switch(action.command.key) {
  case KEY.ESCAPE.value:
    return { ...state, mode: MODES.NORMAL_MODE }
  default:
    return { ...state, text: updateLine(text, cursor, key), cursor: { ...cursor, x: cursor.x + 1 } }
  }
}

/*
I think it's bad to manipulate the whole text.
Maybe i should index by line?
*/
const updateLine = (text, cursor, newChar) => {
  return text.map(line => {
    if(line.index !== cursor.y) return line

    return {
      ...line,
      value: line.value.reduce((newLine, char) => {
        if (char.index < cursor.x) return newLine.concat(char)
        if (char.index > cursor.x) return newLine.concat({ ...char, index: char.index + 1 })
        if (char.index === cursor.x) return newLine.concat({ ...char, index: char.index }, { value: newChar, index: char.index + 1 })

        return newLine
      }, [])
    }
  })
}

export default insertMode