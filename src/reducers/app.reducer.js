import { combineReducers } from 'redux'
import  editor from './editor.reducer'
import  movement from './movement.reducer'

export default combineReducers({
  editor,
  movement
})