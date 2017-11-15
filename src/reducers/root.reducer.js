import { createStore } from 'redux'
import { MODES, layout } from '../constants'
import normalMode from './normal-mode.reducer.js'
import insertMode from './insert-mode.reducer.js'
import {
  findLayoutLeaves
} from './utils'


export const rootReducer =  (state = {
  mode: MODES.NORMAL_MODE,
  layout
}, action) => {
  const currentPane = findLayoutLeaves(layout).find(pane => pane.active)

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
    console.log('heer?')
    return state
  }
}

export const store = createStore(rootReducer)
