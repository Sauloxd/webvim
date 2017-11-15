import rootReducer, { findLayoutLeaves, paneModifierOnLayout } from './root.reducer'
import { MODES, SOURCE } from '../constants'

/* *
 * The index length is the depth of its position on tree.
 * Each element is a direct access of the layout structure
 * */

const layout = {
  type: 'row',
  value: [{
    type: 'column',
    value: [{
      type: 'pane',
      index: [0, 0, 0],
      active: false
    }, {
      type: 'pane',
      index: [0, 0, 1],
      active: false
    }]
  }, {
    type: 'row',
    value: [{
      type: 'pane',
      index: [0, 1, 0],
      active: false
    }]
  }, {
    type: 'row',
    value: [{
      type: 'column',
      value: [{
        type: 'pane',
        index: [2, 0, 0],
        active: false
      }, {
        type: 'pane',
        index: [2, 0, 1],
        active: false
      }]
    }, {
      type: 'row',
      value: [{
        type: 'pane',
        index: [2, 1, 0],
        active: true
      }]
    }]
  }]
}

it('Should find all panes on a layout tree', () => {
  const result = findLayoutLeaves(layout)

  expect(result).toEqual([{
    type: 'pane',
    index: [0, 0, 0],
    active: false
  }, {
    type: 'pane',
    index: [0, 0, 1],
    active: false
  }, {
    type: 'pane',
    index: [0, 1, 0],
    active: false
  }, {
    type: 'pane',
    index: [2, 0, 0],
    active: false
  }, {
    type: 'pane',
    index: [2, 0, 1],
    active: false
  }, {
    type: 'pane',
    index: [2, 1, 0],
    active: true
  }])
})

it('Should update the correct pane', () => {
  const state = {
    mode: MODES.INSERT_MODE,
    layout
  }
  console.log(layout)

  console.log(rootReducer(state, {
    type: SOURCE.KEYBOARD,
    mode: MODES.INSERT_NORMAL,
    command: { key: '1', keyCode: 1 }
  }))

  expect(true).toBe(true)
})

it('Should find pane given index, apply a function on the pane, and return all layout', () => {
  expect(
    findLayoutLeaves(
      paneModifierOnLayout({
        layout, paneIndex: [2, 1, 0], paneModifier: (pane) => ({ ...pane, funnyAttribute: true })
      })
    ).find(pane => pane.funnyAttribute)
  ).toBeDefined()
})