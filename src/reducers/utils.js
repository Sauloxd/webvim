/*eslint no-mixed-operators: off*/
import { clone, isFunction, isEmpty, flatten } from 'lodash'

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
  const layoutWithoutActivePanes = paneModifierOnLayout({ layout, currentPane: findLayoutLeaves(layout).find(pane => pane.active), paneModifier: pane => ({ ...pane, active: false }) })
  return paneModifierOnLayout({ layout: layoutWithoutActivePanes, currentPane: targetPane, paneModifier: pane => ({ ...pane, active: true }) })
}