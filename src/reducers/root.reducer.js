import { MODES, TUTORIAL_TEXT } from '../constants'
import { flatten, clone, isEmpty } from 'lodash'
import movement from './movement.reducer.js'
import insertMode from './insert-mode.reducer.js'
const formatText = text => text.split('\n').filter(Boolean).map((line, index) =>
  ({ index, value: line.split('').map((char, index) =>
    ({ index, value: char })) }))
const layout = {
  type: 'row',
  value: [{
    type: 'column',
    value: [{
      type: 'pane',
      index: [0, 0, 0],
      text: formatText(TUTORIAL_TEXT),
      cursor: { x: 0, y: 0 },
      active: false
    }, {
      type: 'pane',
      index: [0, 0, 1],
      text: formatText(TUTORIAL_TEXT),
      cursor: { x: 0, y: 0 },
      active: false
    }]
  }, {
    type: 'row',
    value: [{
      type: 'pane',
      index: [0, 1, 0],
      text: formatText(TUTORIAL_TEXT),
      cursor: { x: 0, y: 0 },
      active: false
    }]
  }, {
    type: 'row',
    value: [{
      type: 'column',
      value: [{
        type: 'pane',
        index: [2, 0, 0],
        text: formatText(TUTORIAL_TEXT),
        cursor: { x: 0, y: 0 },
        active: false
      }, {
        type: 'pane',
        index: 4,
        text: formatText(TUTORIAL_TEXT),
        cursor: { x: 0, y: 0 },
        active: false
      }]
    }, {
      type: 'row',
      value: [{
        type: 'pane',
        index: [2, 1, 0],
        text: formatText(TUTORIAL_TEXT),
        cursor: { x: 0, y: 0 },
        active: true
      }]
    }]
  }]
}

export const findLayoutLeaves = node => {
  if (node.type !== 'pane' && isEmpty(node.value)) throw new Error('Error when trying to find leaves on layout tree!', node)
  if (node.type === 'pane') return [node]

  return flatten(node.value.map(findLayoutLeaves))
}

export const paneModifierOnLayout = ({ layout, paneIndex, paneModifier }) => {
  const clonedLayout = clone(layout, true)
  const paneReference = paneIndex
    .reduce((paneReference, panePosition) => paneReference.value[panePosition], clonedLayout)

  /* This has side effects :( */
  Object.assign(paneReference, {...paneModifier(paneReference)})

  return clonedLayout
}

export default (state = {
  mode: MODES.NORMAL_MODE,
  layout
}, action) => {
  const currentPane = findLayoutLeaves(layout).find(pane => pane.active)

  switch(state.mode) {
  case MODES.NORMAL_MODE:
    return {
      ...state,
      layout: paneModifierOnLayout({ layout, paneIndex: currentPane.index, paneModifier: movement.bind(null, action) })
    }
  case MODES.INSERT_MODE:
    return {
      ...state,
      layout: paneModifierOnLayout({ layout, paneIndex: currentPane.index, paneModifier: insertMode.bind(null, action) })
    }
  default:
    return state
  }
}