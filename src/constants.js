export const MODES = {
  INSERT_MODE: 'insert',
  NORMAL_MODE: 'normal'
}

export const SOURCE = {
  KEYBOARD: 'keyboard'
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