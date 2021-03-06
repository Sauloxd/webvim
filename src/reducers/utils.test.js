import {
  findLayoutLeaves,
  paneModifierOnLayout,
  activatePane,
  addPane,
  removePane
} from './utils'
import {
  formatText,
  TUTORIAL_TEXT
} from '../constants'

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

it('Should find pane given index, apply a function on the pane, and return all layout', () => {
  expect(
    findLayoutLeaves(
      paneModifierOnLayout({
        layout, currentPane: {
          type: 'pane',
          index: [2, 1, 0],
          active: true
        }, paneModifier: (pane) => ({ ...pane, funnyAttribute: true })
      })
    ).find(pane => pane.funnyAttribute)
  ).toBeDefined()
})

it('Should deactivate the current pane, and activate a given pane', () => {
  const targetPane = {
    type: 'pane',
    index: [0],
    active: false
  }
  const layout = {
    type: 'row',
    index: [],
    value: [{
      type: 'pane',
      index: [0],
      active: false
    }, {
      type: 'pane',
      index: [1],
      active: true
    }]
  }

  expect(activatePane({ layout, targetPane }))
    .toEqual({
      type: 'row',
      index: [],
      value: [{
        type: 'pane',
        index: [0],
        active: true
      }, {
        type: 'pane',
        index: [1],
        active: false
      }]
    })
})

it('Should add a new column pane', () => {
  const currentPane = {
    type: 'pane',
    index: [1],
    active: true
  }
  const layout = {
    type: 'row',
    index: [],
    value: [{
      type: 'pane',
      index: [0],
      active: false
    }, {
      type: 'pane',
      index: [1],
      active: true
    }]
  }

  expect(addPane('column')({ layout, currentPane }))
    .toEqual({
      type: 'row',
      index: [],
      value: [{
        type: 'pane',
        index: [0],
        active: false
      }, {
        type: 'column',
        index: [1],
        value: [{
          type: 'pane',
          index: [1, 0],
          active: false
        }, {
          type: 'pane',
          index: [1, 1],
          text: [{
            index: 0,
            value: [{
              index: 0,
              value: ' ',
            }]
          }],
          cursor: {x: 0, y:0},
          active: true
        }]
      }]
    })
})

it('Should add a new column pane, in a column parent pane', () => {
  const currentPane = {
    type: 'pane',
    index: [1],
    active: true
  }
  const layout = {
    type: 'column',
    index: [],
    value: [{
      type: 'pane',
      index: [0],
      active: false
    }, {
      type: 'pane',
      index: [1],
      active: true
    }]
  }

  expect(addPane('column')({ layout, currentPane }))
    .toEqual({
      type: 'column',
      index: [],
      value: [{
        type: 'pane',
        index: [0],
        active: false
      }, {
        type: 'pane',
        index: [1],
        active: false
      }, {
        type: 'pane',
        index: [2],
        text: [{
          index: 0,
          value: [{
            index: 0,
            value: ' ',
          }]
        }],
        cursor: {x: 0, y:0},
        active: true
      }]
    })
})

it('Should add a new row pane, in a column parent pane', () => {
  const currentPane = {
    type: 'pane',
    index: [1],
    active: true
  }
  const layout = {
    type: 'column',
    index: [],
    value: [{
      type: 'pane',
      index: [0],
      active: false
    }, {
      type: 'pane',
      index: [1],
      active: true
    }]
  }

  expect(addPane('column')({ layout, currentPane }))
    .toEqual({
      type: 'column',
      index: [],
      value: [{
        type: 'pane',
        index: [0],
        active: false
      }, {
        type: 'pane',
        index: [1],
        active: false
      }, {
        type: 'pane',
        index: [2],
        text: [{
          index: 0,
          value: [{
            index: 0,
            value: ' ',
          }]
        }],
        cursor: {x: 0, y:0},
        active: true
      }]
    })
})

it('Should remove a pane from layout, that is not the root, and its not last of its layout child', () => {
  const currentPane = {
    type: 'pane',
    index: [0, 0],
    active: true
  }

  const layout = {
    type: 'row',
    index: [],
    value: [{
      type: 'column',
      index: [0],
      value: [{
        type: 'pane',
        index: [0, 0],
        text: formatText('1'),
        cursor: { x: 0, y: 0 },
        active: true
      }, {
        type: 'pane',
        index: [0, 1],
        text: formatText('2'),
        cursor: { x: 0, y: 0 },
        active: false
      }]
    }, {
      type: 'row',
      index: [1],
      value: [{
        type: 'pane',
        index: [1, 0],
        text: formatText('3'),
        cursor: { x: 0, y: 0 },
        active: false
      }]
    }]
  }

  expect(removePane({ layout, currentPane }))
    .toEqual({
      type: 'row',
      index: [],
      value: [{
        type: 'column',
        index: [0],
        value: [{
          type: 'pane',
          index: [0, 0],
          text: formatText('2'),
          cursor: { x: 0, y: 0 },
          active: true
        }]
      }, {
        type: 'row',
        index: [1],
        value: [{
          type: 'pane',
          index: [1, 0],
          text: formatText('3'),
          cursor: { x: 0, y: 0 },
          active: false
        }]
      }]
    })
})

it.skip('Should remove a pane from layout, that is not the root, and its last of its layout child', () => {
  const currentPane = {
    type: 'pane',
    index: [0, 0],
    active: true
  }

  const layout = {
    type: 'row',
    index: [],
    value: [{
      type: 'column',
      index: [0],
      value: [{
        type: 'pane',
        index: [0, 0],
        text: formatText('2'),
        cursor: { x: 0, y: 0 },
        active: true
      }]
    }, {
      type: 'row',
      index: [1],
      value: [{
        type: 'pane',
        index: [1, 0],
        text: formatText('3'),
        cursor: { x: 0, y: 0 },
        active: false
      }]
    }]
  }


  expect(removePane({ layout, currentPane }))
    .toEqual({
      type: 'row',
      index: [],
      value: [{
        type: 'row',
        index: [0],
        value: [{
          type: 'pane',
          index: [0, 0],
          text: formatText('3'),
          cursor: { x: 0, y: 0 },
          active: false
        }]
      }]
    })
})

it.skip('Should remove a pane from layout, that is not the root, and its last of its layout child, hardcore', () => {
  const currentPane = {
    type: 'pane',
    index: [0, 0, 0, 0],
    active: true
  }

  const layout = {
    type: 'row',
    index: [],
    value: [{
      type: 'column',
      index: [0],
      value: [{
        type: 'row',
        index: [0, 0],
        value: [{
          type: 'column',
          index: [0, 0, 0],
          value: [{
            type: 'pane',
            index: [0, 0, 0, 0],
            text: formatText('2'),
            cursor: { x: 0, y: 0 },
            active: true
          }]
        }]
      }]
    }, {
      type: 'row',
      index: [1],
      value: [{
        type: 'pane',
        index: [1, 0],
        text: formatText('3'),
        cursor: { x: 0, y: 0 },
        active: false
      }]
    }]
  }


  expect(removePane({ layout, currentPane }))
    .toEqual({
      type: 'row',
      index: [],
      value: [{
        type: 'row',
        index: [0],
        value: [{
          type: 'pane',
          index: [0, 0],
          text: formatText('3'),
          cursor: { x: 0, y: 0 },
          active: false
        }]
      }]
    })
})
