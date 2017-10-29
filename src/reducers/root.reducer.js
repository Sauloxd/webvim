import { MODES, TUTORIAL_TEXT } from '../constants'
import movement from './movement.reducer.js'
import insertMode from './insert-mode.reducer.js'

const formatText = text => text.split('\n').filter(Boolean).map((line, index) =>
  ({ index, value: line.split('').map((char, index) =>
    ({ index, value: char })) }))
export default (state = {
  text: formatText(TUTORIAL_TEXT),
  cursor: { x: 1, y: 0 },
  mode: MODES.NORMAL_MODE
}, action) => {
  switch(state.mode) {
  case MODES.NORMAL_MODE:
    return movement(state, action)
  case MODES.INSERT_MODE:
    return insertMode(state, action)
  default:
    return state
  }
}