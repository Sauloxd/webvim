/*eslint no-mixed-operators: off*/
import { clone, isFunction, isEmpty, isUndefined, flatten } from 'lodash'

export const getCurrentLine = state => state.text.find(({ index }) => index === state.cursor.y)
export const getLineBellow = state => state.text.find(({ index }) => index === state.cursor.y + 1)
export const getLineAbove = state => state.text.find(({ index }) => index === state.cursor.y - 1)
export const checkIfHasLineOn = (type, state) => {
  if (!['previous', 'next'].includes(type)) throw new Error('Invalid cursor position type')

  const response = {
    previous: state.text[state.cursor.y - 1],
    next: state.text[state.cursor.y + 1]
  }[type]
  return response
}

export const formatText = text => text.split('\n')
  .filter(Boolean) // This removes empty lines. @TODO add empty space!
  .map((line, index) =>
    ({ index, value: line.split('').map((char, index) =>
      ({ index, value: char })) }))

export const findLayoutLeaves = node => {
  if (node.type !== 'pane' && isEmpty(node.value)) throw new Error('Error when trying to find leaves on layout tree!', node)
  if (node.type === 'pane') return [node]

  return flatten(node.value.map(findLayoutLeaves))
}

export const paneModifierOnLayout = ({ layout, currentPane, paneModifier }) => {
  const clonedLayout = clone(layout, true)

  const paneReference = currentPane.index
    .reduce((paneReference, panePosition) =>
      paneReference.value[panePosition], clonedLayout)

  /* This has side effects :( */
  Object.assign(paneReference, {...(isFunction(paneModifier) && paneModifier(paneReference) || currentPane)})

  return clonedLayout
}

export const activatePane = ({ layout, targetPane }) => {
  const allPanes = findLayoutLeaves(layout)
  const activePane = allPanes.find(pane => pane.active)
  const layoutWithoutActivePanes = (isUndefined(activePane) || activePane.length === 0)
    ? layout
    : paneModifierOnLayout({ layout, currentPane: activePane, paneModifier: pane => ({ ...pane, active: false }) })

  const layoutWithActivePane = paneModifierOnLayout({ layout: layoutWithoutActivePanes, currentPane: targetPane, paneModifier: pane => ({ ...pane, active: true }) })

  return layoutWithActivePane
}

export const activateChar = ({ layout, target }) => {
  const allPanes = findLayoutLeaves(layout)
  const activePane = allPanes.find(pane => pane.active)

  return paneModifierOnLayout({ layout, currentPane: activePane, paneModifier: pane => ({ ...pane, cursor: {
    x: target.char.index,
    y: target.line.index
  } }) })
}

export const addPane = direction => ({ layout, currentPane }) => {
  const clonedLayout = clone(layout, true)

  const paneParentReference = currentPane.index.slice(0, -1)
    .reduce((paneReference, panePosition) =>
      paneReference.value[panePosition], clonedLayout)

  if (paneParentReference.type === direction) {
    /* This has side effects :( */
    paneParentReference.value = paneParentReference.value
      .reduce((reorderedPanes, pane) => {
        const panePositionInList = pane.index.slice(-1)[0]
        const currentPanePositionInList = currentPane.index.slice(-1)[0]

        if (panePositionInList < currentPanePositionInList) return reorderedPanes.concat(pane)
        if (panePositionInList === currentPanePositionInList)
          return reorderedPanes.concat([{...currentPane, active: false}, {
            type: 'pane',
            index: paneParentReference.index.concat(currentPane.index.slice(-1)[0] + 1),
            text: formatText(' '),
            cursor: { x: 0, y: 0 },
            active: true
          }])

        return reorderedPanes.concat({...pane, index: pane.index.map((level, index, array) => index === array.length - 1 ? Number(level) + 1 : level)})
      }, [])

    return clonedLayout
  }

  const newPane = {
    type: 'pane',
    index: currentPane.index,
    text: formatText(' '),
    cursor: { x: 0, y: 0 },
    active: false
  }

  /* This has side effects :( */
  Object.assign(paneParentReference.value, {
    [currentPane.index.slice(-1)]: {
      type: direction,
      index: currentPane.index,
      value: [{...currentPane, active: false}, {...newPane, active: true}].map((pane, i) => ({...pane, index: pane.index.concat(i)}))
    }
  })

  return clonedLayout
}

export const removePane = ({ layout, currentPane }) => {
  const clonedLayout = clone(layout, true)

  const paneParentReference = currentPane.index.slice(0, -1).length === 0
    ? clonedLayout
    : currentPane.index.slice(0, -1)
      .reduce((paneReference, panePosition) =>
        paneReference.value[panePosition], clonedLayout)

  // if there is more than 1 pane in the same layout, just pop the pane
  if (paneParentReference.value.length > 1) {
    paneParentReference.value =  paneParentReference.value.reduce((newChildren, child, index) => {
      const currentPanePositionInList = currentPane.index.slice(-1)[0]

      if (currentPanePositionInList > index) return newChildren.concat(child)
      if (currentPanePositionInList === index) return newChildren

      return newChildren.concat({
        ...child,
        index: child.index.map((value, index, array) => index === array.length - 1 ? value - 1 : value)
      })
    }, [])

    paneParentReference.value[0].active = true

    return clonedLayout
  }

  // if there is just 1, we can't have empty layout, so we detroy the layout
  if (paneParentReference.value.length === 1) {
    // this is a weak validation... there is a problem, how to know if the pane is the last alive?
    if (findLayoutLeaves(layout).length === 1) return clonedLayout // if its child from root, cant leave empty! Do nothing

    const grandPaneParentReference = currentPane.index.slice(0, -2).length === 0
      ? clonedLayout
      : currentPane.index.slice(0, -2)
        .reduce((paneReference, panePosition) =>
          paneReference.value[panePosition], clonedLayout)

    grandPaneParentReference.value = grandPaneParentReference.value.reduce((newChildren, child, index) => {
      if (index < currentPane.index.slice(-2)[0]) return newChildren.concat(child)
      if (index === currentPane.index.slice(-2)[0]) return newChildren
      return newChildren.concat({
        ...child,
        index: child.index.map((value, index, array) => index === array.length - 1 ? value - 1 : value),
        value: recUpdateIndex(child)
      })
    }, [])

    //@todo sauloxd this is a huge mistake @update: why though? 😂
    return activatePane({ layout: clonedLayout, targetPane: findLayoutLeaves(clonedLayout)[0] })
  }


  return clonedLayout
}

const recUpdateIndex = child => {
  return child.value.map(pane => {
    return {
      ...pane,
      index: pane.index.map((value, index, array) => index === array.length - 2 ? value - 1 : value),
      ...(!isUndefined(pane.value) ? {
        value: recUpdateIndex(pane)
      } : {})
    }
  })
}
