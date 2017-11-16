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

export const TUTORIAL_TEXT = `
 /***************\\ \n
  *   ACTIONS   *
 /***************\\ \n
 - h => cursor left\n
 - j => cursor down\n
 - k => cursor up\n
 - l => cursor right\n
 - 0 => move to start of line\n
 - $ => move to end of line\n
 - ctrl-d => split pane vertical\n
 - ctrl-D => split pane horizontal\n
 - ctrl-x => closes pane\n
 - o => new line bellow\n
 - O => new line above\n
 - a => insert mode ahead\n
 - A => insert mode end of line\n
 - i => insert mode under\n
 - <ESC> => return to normal mode\n
`

export const ABOUT_ME = `
# Who am I\n
My name is Saulo Toshiichi Furuta, 23 years old!\n
Nice to meet y'all ;)\n
I currently live in São Paulo - Brazil.\n
But I wasn't born there. I'm actually from a small town in the surrounding of the metropolis, named Mogi das Cruzes, where I spent most of my youth.\n
After I enrolled in my College - Escola Politécnica da Universidade de São Paulo (USP) - I moved to São Paulo, to ease my daily commute\n

#### TL;DR\n

\`\`\`\n
var me = {\n
  name: "Saulo Toshiichi Furuta",\n
  age: 23,\n
  maritalStatus: "Single",\n
  country: "Brazil",\n
  state: "São Paulo",\n
  address: "SP - São Paulo, Rua M.M.D.C, 539",\n
  contact: "(11) 99613-5335"\n
};\n
\`\`\`\n
## Background\n
Living in Brazil, my highschool didn't offer much programming opportunities, so sadly I've began only to program only in College.\n
Even so, during my early years of College, I never knew I would love to program.\n
Luckly, I was able to do an internship on a lovely "mobile app boutique" named Taqtile, where I've began to understand the beauty in so many lines of white text in black screen.\n
Since then, I've been able to work on many projects, mobile and web, helping companies, such as Certsys and Qulture.Rocks, to deliver the most beautiful of experiences.
#\n
#### TL;DR\n
\`\`\`\n
var background = [\n
    {\n
      company: "Taqtile",\n
      Period: "May 01/2015 ~ September 01/2015",\n
      role: "Intern",\n
      activities: "Frontend mobile/web developper",\n
      stack: ["Android Dev (Java)", "Angular 1.x", "nodeJS", "HTML5/CSS3", "Jade", "Stylus"]\n
    },\n
    {\n
      company: "Certsys",\n
      Period: "Jan 01/2016 ~ May 01/2016",\n
      role: "Intern",\n
      activities: "System requirements gathering and webdevelopping",\n
      stack: ["Angular 1.x", "nodeJS", "HTML5/CSS3", "mongoDB", "Gulp"]\n
    },\n
    {\n
      company: "Qulture.Rocks",\n
      Period: "Sep 01/2016 ~ Jan 01/2017",\n
      role: "Intern",\n
      activities: "Webdevelopping, UX/UI designer",\n
      stack: ["Angular 1.x", "HTML5/CSS3", "rails", "Sketch (design)"]\n
    },\n
];\n
\`\`\`\n

##### Why you always did only 4 months in each internship?\n

Due to my college policy, from the third year, every year is now divided in quarters.\n
Sacrificing(?) our summer vacations, we are able to work full time during the quarter of internship, but we are limited to the companies willing to hire us.\n
The third year starts with a quarter of classes (from Jan 1, 201X to May 01, 201X), and intercalates with working quarters from then till the end of graduation, summing 4 quarters of wokring, and 5 of classes.\n
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
      text: formatText(' '),
      cursor: { x: 0, y: 0 },
      active: false
    }]
  }, {
    type: 'row',
    index: [1],
    value: [{
      type: 'pane',
      index: [1, 0],
      text: formatText(ABOUT_ME),
      cursor: { x: 0, y: 0 },
      active: false
    }]
  }]
}