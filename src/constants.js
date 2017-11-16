export const MODES = {
  INSERT_MODE: 'insert',
  NORMAL_MODE: 'normal'
}

export const SOURCE = {
  KEYBOARD: 'keyboard',
  MOUSE: 'mouse'
}

export const KEY = {
  ESCAPE: { value: 'Escape', code: 27 },
  SHIFT: { value: 'Shift', code: 16 },
  META: { value: 'Meta', code: 91 },
  ALT: { value: 'Alt', code: 18 },
  ENTER: { value: 'Enter', code: 13 },
  BACKSPACE: { value : 'Backspace', code: 8 },
  CTRL: { value: 'Control', code: 17 }
}

export const TUTORIAL_TEXT = `Welcome to Web Vim!\n
A vim based web text editor, where you can save your notes and stuff!\n
\n
Stay tuned for features to come:\n
- [ ] Split panes\n
- [ ] Save files in a directory tree style\n
- [ ] Have a way to sign-in using a command like :login -u saulo -p *****\n
`

export const formatText = text => text.split('\n')
  .filter(Boolean) // This removes empty lines. @TODO add empty space!
  .map((line, index) =>
    ({ index, value: line.split('').map((char, index) =>
      ({ index, value: char })) }))

export const layout = {
  type: 'row',
  index: [],
  value: [{
    type: 'column',
    index: [0],
    value: [{
      type: 'pane',
      index: [0, 0],
      text: formatText(TUTORIAL_TEXT),
      cursor: { x: 0, y: 0 },
      active: true
    }, {
      type: 'pane',
      index: [0, 1],
      text: formatText('pane 2'),
      cursor: { x: 0, y: 0 },
      active: false
    }]
  }, {
    type: 'row',
    index: [1],
    value: [{
      type: 'pane',
      index: [1, 0],
      text: formatText('pane 3'),
      cursor: { x: 0, y: 0 },
      active: false
    }]
  }]
}