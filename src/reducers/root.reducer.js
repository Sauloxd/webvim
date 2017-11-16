import { createStore } from 'redux'
import { PANE } from '../components/pane'
import { CHAR } from '../components/line'
import { MODES, SOURCE, layout as DEFAULT_LAYOUT } from '../constants'
import normalMode from './normal-mode.reducer.js'
import insertMode from './insert-mode.reducer.js'
import {
  findLayoutLeaves,
  activatePane,
  activateChar
} from './utils'

export const rootReducer = (state = {
  mode: MODES.NORMAL_MODE,
  layout: DEFAULT_LAYOUT
}, action) => {
  const { layout } = state
  const currentPane = findLayoutLeaves(layout).find(pane => pane.active)
  const { type, command } = action

  switch(type) {
  case SOURCE.KEYBOARD:
    switch(state.mode) {
    case MODES.NORMAL_MODE:
      return {
        ...state,
        ...normalMode({ layout, currentPane }, action)
      }
    case MODES.INSERT_MODE:
      return {
        ...state,
        ...insertMode({ layout, currentPane }, action)
      }
    default:
      return state
    }
  case SOURCE.MOUSE:
    switch(command) {
    case PANE.ACTIVATE:
      return {
        ...state,
        layout: activatePane({ layout, targetPane: action.on })
      };
    case CHAR.ACTIVATE:
      return {
        ...state,
        layout: activateChar({ layout, target: action.on })
      };
    default:
      return state;
    }
  default:
    return state;
  }
}

export const store = createStore(rootReducer)
