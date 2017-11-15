import { MODES, TUTORIAL_TEXT } from '../constants'
import { flatten, clone, isEmpty } from 'lodash'
import normalMode from './normal-mode.reducer.js'
import insertMode from './insert-mode.reducer.js'
const formatText = text => text.split('\n')
  .filter(Boolean) // This removes empty lines. @TODO add empty space!
  .map((line, index) =>
    ({ index, value: line.split('').map((char, index) =>
      ({ index, value: char })) }))
const layout = {
  type: 'row',
  index: [0],
  value: [{
    type: 'column',
    index: [0, 0],
    value: [{
      type: 'pane',
      index: [0, 0, 0],
      text: formatText(TUTORIAL_TEXT),
      cursor: { x: 0, y: 0 },
      active: false
    }, {
      type: 'pane',
      index: [0, 0, 1],
      text: formatText('pane 2'),
      cursor: { x: 0, y: 0 },
      active: false
    }]
  }, {
    type: 'row',
    index: [0, 1],
    value: [{
      type: 'pane',
      index: [0, 1, 0],
      text: formatText('pane 3'),
      cursor: { x: 0, y: 0 },
      active: false
    }]
  }, {
    type: 'row',
    index: [0, 2],
    value: [{
      type: 'column',
      index: [0, 2, 0],
      value: [{
        type: 'pane',
        index: [2, 0, 0],
        text: formatText('pane 4'),
        cursor: { x: 0, y: 0 },
        active: false
      }]
    }, {
      type: 'row',
      index: [0, 2, 1],
      value: [{
        type: 'pane',
        index: [2, 1, 0],
        text: formatText('pane 5'),
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
  console.log(state.mode)

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
}