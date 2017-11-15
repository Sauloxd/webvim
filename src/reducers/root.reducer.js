import { createStore } from 'redux'
import { PANE } from '../components/pane'
import { MODES, SOURCE, layout } from '../constants'
import normalMode from './normal-mode.reducer.js'
import insertMode from './insert-mode.reducer.js'
import {
  findLayoutLeaves,
  activatePane
} from './utils'


export const rootReducer =  (state = {
  mode: MODES.NORMAL_MODE,
  layout
}, action) => {
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
    default:
      return state;
    }
  default:
    return state;
  }
}

export const store = createStore(rootReducer)
