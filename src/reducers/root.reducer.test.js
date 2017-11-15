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

  expect(rootReducer(state, {
    type: SOURCE.KEYBOARD,
    mode: MODES.INSERT_NORMAL,
    command: { key: '1', keyCode: 1 }
  })).toEqual({'mode':'insert','layout':{'type':'row','value':[{'type':'column','value':[{'type':'pane','index':[0,0,0],'text':[{'index':0,'value':[{'index':0,'value':'W'},{'index':1,'value':'e'},{'index':2,'value':'l'},{'index':3,'value':'c'},{'index':4,'value':'o'},{'index':5,'value':'m'},{'index':6,'value':'e'},{'index':7,'value':' '},{'index':8,'value':'t'},{'index':9,'value':'o'},{'index':10,'value':' '},{'index':11,'value':'W'},{'index':12,'value':'e'},{'index':13,'value':'b'},{'index':14,'value':' '},{'index':15,'value':'V'},{'index':16,'value':'i'},{'index':17,'value':'m'},{'index':18,'value':'!'}]},{'index':1,'value':[{'index':0,'value':'A'},{'index':1,'value':' '},{'index':2,'value':'v'},{'index':3,'value':'i'},{'index':4,'value':'m'},{'index':5,'value':' '},{'index':6,'value':'b'},{'index':7,'value':'a'},{'index':8,'value':'s'},{'index':9,'value':'e'},{'index':10,'value':'d'},{'index':11,'value':' '},{'index':12,'value':'w'},{'index':13,'value':'e'},{'index':14,'value':'b'},{'index':15,'value':' '},{'index':16,'value':'t'},{'index':17,'value':'e'},{'index':18,'value':'x'},{'index':19,'value':'t'},{'index':20,'value':' '},{'index':21,'value':'e'},{'index':22,'value':'d'},{'index':23,'value':'i'},{'index':24,'value':'t'},{'index':25,'value':'o'},{'index':26,'value':'r'},{'index':27,'value':','},{'index':28,'value':' '},{'index':29,'value':'w'},{'index':30,'value':'h'},{'index':31,'value':'e'},{'index':32,'value':'r'},{'index':33,'value':'e'},{'index':34,'value':' '},{'index':35,'value':'y'},{'index':36,'value':'o'},{'index':37,'value':'u'},{'index':38,'value':' '},{'index':39,'value':'c'},{'index':40,'value':'a'},{'index':41,'value':'n'},{'index':42,'value':' '},{'index':43,'value':'s'},{'index':44,'value':'a'},{'index':45,'value':'v'},{'index':46,'value':'e'},{'index':47,'value':' '},{'index':48,'value':'y'},{'index':49,'value':'o'},{'index':50,'value':'u'},{'index':51,'value':'r'},{'index':52,'value':' '},{'index':53,'value':'n'},{'index':54,'value':'o'},{'index':55,'value':'t'},{'index':56,'value':'e'},{'index':57,'value':'s'},{'index':58,'value':' '},{'index':59,'value':'a'},{'index':60,'value':'n'},{'index':61,'value':'d'},{'index':62,'value':' '},{'index':63,'value':'s'},{'index':64,'value':'t'},{'index':65,'value':'u'},{'index':66,'value':'f'},{'index':67,'value':'f'},{'index':68,'value':'!'}]},{'index':2,'value':[{'index':0,'value':'S'},{'index':1,'value':'t'},{'index':2,'value':'a'},{'index':3,'value':'y'},{'index':4,'value':' '},{'index':5,'value':'t'},{'index':6,'value':'u'},{'index':7,'value':'n'},{'index':8,'value':'e'},{'index':9,'value':'d'},{'index':10,'value':' '},{'index':11,'value':'f'},{'index':12,'value':'o'},{'index':13,'value':'r'},{'index':14,'value':' '},{'index':15,'value':'f'},{'index':16,'value':'e'},{'index':17,'value':'a'},{'index':18,'value':'t'},{'index':19,'value':'u'},{'index':20,'value':'r'},{'index':21,'value':'e'},{'index':22,'value':'s'},{'index':23,'value':' '},{'index':24,'value':'t'},{'index':25,'value':'o'},{'index':26,'value':' '},{'index':27,'value':'c'},{'index':28,'value':'o'},{'index':29,'value':'m'},{'index':30,'value':'e'},{'index':31,'value':':'}]},{'index':3,'value':[{'index':0,'value':'-'},{'index':1,'value':' '},{'index':2,'value':'['},{'index':3,'value':' '},{'index':4,'value':']'},{'index':5,'value':' '},{'index':6,'value':'S'},{'index':7,'value':'p'},{'index':8,'value':'l'},{'index':9,'value':'i'},{'index':10,'value':'t'},{'index':11,'value':' '},{'index':12,'value':'p'},{'index':13,'value':'a'},{'index':14,'value':'n'},{'index':15,'value':'e'},{'index':16,'value':'s'}]},{'index':4,'value':[{'index':0,'value':'-'},{'index':1,'value':' '},{'index':2,'value':'['},{'index':3,'value':' '},{'index':4,'value':']'},{'index':5,'value':' '},{'index':6,'value':'S'},{'index':7,'value':'a'},{'index':8,'value':'v'},{'index':9,'value':'e'},{'index':10,'value':' '},{'index':11,'value':'f'},{'index':12,'value':'i'},{'index':13,'value':'l'},{'index':14,'value':'e'},{'index':15,'value':'s'},{'index':16,'value':' '},{'index':17,'value':'i'},{'index':18,'value':'n'},{'index':19,'value':' '},{'index':20,'value':'a'},{'index':21,'value':' '},{'index':22,'value':'d'},{'index':23,'value':'i'},{'index':24,'value':'r'},{'index':25,'value':'e'},{'index':26,'value':'c'},{'index':27,'value':'t'},{'index':28,'value':'o'},{'index':29,'value':'r'},{'index':30,'value':'y'},{'index':31,'value':' '},{'index':32,'value':'t'},{'index':33,'value':'r'},{'index':34,'value':'e'},{'index':35,'value':'e'},{'index':36,'value':' '},{'index':37,'value':'s'},{'index':38,'value':'t'},{'index':39,'value':'y'},{'index':40,'value':'l'},{'index':41,'value':'e'}]},{'index':5,'value':[{'index':0,'value':'-'},{'index':1,'value':' '},{'index':2,'value':'['},{'index':3,'value':' '},{'index':4,'value':']'},{'index':5,'value':' '},{'index':6,'value':'H'},{'index':7,'value':'a'},{'index':8,'value':'v'},{'index':9,'value':'e'},{'index':10,'value':' '},{'index':11,'value':'a'},{'index':12,'value':' '},{'index':13,'value':'w'},{'index':14,'value':'a'},{'index':15,'value':'y'},{'index':16,'value':' '},{'index':17,'value':'t'},{'index':18,'value':'o'},{'index':19,'value':' '},{'index':20,'value':'s'},{'index':21,'value':'i'},{'index':22,'value':'g'},{'index':23,'value':'n'},{'index':24,'value':'-'},{'index':25,'value':'i'},{'index':26,'value':'n'},{'index':27,'value':' '},{'index':28,'value':'u'},{'index':29,'value':'s'},{'index':30,'value':'i'},{'index':31,'value':'n'},{'index':32,'value':'g'},{'index':33,'value':' '},{'index':34,'value':'a'},{'index':35,'value':' '},{'index':36,'value':'c'},{'index':37,'value':'o'},{'index':38,'value':'m'},{'index':39,'value':'m'},{'index':40,'value':'a'},{'index':41,'value':'n'},{'index':42,'value':'d'},{'index':43,'value':' '},{'index':44,'value':'l'},{'index':45,'value':'i'},{'index':46,'value':'k'},{'index':47,'value':'e'},{'index':48,'value':' '},{'index':49,'value':':'},{'index':50,'value':'l'},{'index':51,'value':'o'},{'index':52,'value':'g'},{'index':53,'value':'i'},{'index':54,'value':'n'},{'index':55,'value':' '},{'index':56,'value':'-'},{'index':57,'value':'u'},{'index':58,'value':' '},{'index':59,'value':'s'},{'index':60,'value':'a'},{'index':61,'value':'u'},{'index':62,'value':'l'},{'index':63,'value':'o'},{'index':64,'value':' '},{'index':65,'value':'-'},{'index':66,'value':'p'},{'index':67,'value':' '},{'index':68,'value':'*'},{'index':69,'value':'*'},{'index':70,'value':'*'},{'index':71,'value':'*'},{'index':72,'value':'*'}]}],'cursor':{'x':0,'y':0},'active':false},{'type':'pane','index':[0,0,1],'text':[{'index':0,'value':[{'index':0,'value':'p'},{'index':1,'value':'a'},{'index':2,'value':'n'},{'index':3,'value':'e'},{'index':4,'value':' '},{'index':5,'value':'2'}]}],'cursor':{'x':0,'y':0},'active':false}]},{'type':'row','value':[{'type':'pane','index':[0,1,0],'text':[{'index':0,'value':[{'index':0,'value':'p'},{'index':1,'value':'a'},{'index':2,'value':'n'},{'index':3,'value':'e'},{'index':4,'value':' '},{'index':5,'value':'3'}]}],'cursor':{'x':0,'y':0},'active':false}]},{'type':'row','value':[{'type':'column','value':[{'type':'pane','index':[2,0,0],'text':[{'index':0,'value':[{'index':0,'value':'p'},{'index':1,'value':'a'},{'index':2,'value':'n'},{'index':3,'value':'e'},{'index':4,'value':' '},{'index':5,'value':'4'}]}],'cursor':{'x':0,'y':0},'active':false}]},{'type':'row','value':[{'type':'pane','index':[2,1,0],'text':[{'index':0,'value':[{'value':'1','index':0},{'index':1,'value':'p'},{'index':2,'value':'a'},{'index':3,'value':'n'},{'index':4,'value':'e'},{'index':5,'value':' '},{'index':6,'value':'5'}]}],'cursor':{'x':1,'y':0},'active':true}]}]}]}})
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