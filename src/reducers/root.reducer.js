import { MODES } from '../constants'
import movement from './movement.reducer.js'

const formatText = text => text.split('\n').map((line, index) => ({ index, value: line }))
export default (state = {
  text: formatText('What are you doing here\nGo Away!'),
  cursor: { x: 1, y: 0 },
  mode: MODES.NORMAL_MODE
}, action) => {
  const { mode } = action

  switch(mode) {
  case MODES.NORMAL_MODE:
    return movement(state, action)
  default:
    return state
  }
}