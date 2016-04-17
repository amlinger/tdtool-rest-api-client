'use strict'
import QuickActions  from 'react-native-quick-actions'

import * as types from '../actions/actionTypes'

const initialState = {
  count: 0,
}

function computeState(state, action) {
  switch (action.type) {
    case types.SYNC:
      return {count: action.devices.length}
    case types.ADD:
      return {count: state.count + 1}
    case types.REMOVE:
      return {count: state.count - 1}
    default:
      return state
  }
}

function refreshQuickActions(state) {
  QuickActions.clearShortcutItems()
  QuickActions.setShortcutItems([{
    type: 'LightsOff',
    title: 'Lights Off',
    subtitle: `Turn all ${state.count} lights off.`,
    icon: 'Pause',
    userInfo: {
      action: 'off'
    }
  }, {
    type: 'LightsOn',
    title: 'Lights On',
    subtitle: `Turn all ${state.count} lights on.`,
    icon: 'Play',
    userInfo: {
      action: 'on'
    }
  }])
}

export default function quickActions(state = initialState, action) {
  const newState = computeState(state, action)
    refreshQuickActions(newState)

  return newState
}
