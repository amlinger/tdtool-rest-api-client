
import settings from '../../settings'

const SERVER = settings.server

import * as types from './actionTypes';

export const fetchAll = () => {
  return dispatch => {
    return fetch(`${SERVER}/devices/`)
      .then(response => response.json())
      .then(devices => {
        dispatch({
          type: types.SYNC,
          devices,
        })
        return devices
      })
  }
}

export const on = device => {
  return dispatch => {
    dispatch({
      type: types.REPLACE,
      device: Object.assign({}, device, {lastsentcommand: 'ON'}),
    })

    fetch(`${SERVER}/devices/${device.id}/on`, {method: 'POST'})
    .then(data => {
      if (data.status !== 200)
        dispatch({
          type: types.REPLACE,
          device: Object.assign({}, device, {lastsentcommand: 'OFF'}),
        })
    })
  }
}

export const off = device => {
  return dispatch => {
    dispatch({
      type: types.REPLACE,
      device: Object.assign({}, device, {lastsentcommand: 'OFF'}),
    })

    fetch(`${SERVER}/devices/${device.id}/off`, {method: 'POST'})
    .then(data => {
      if (data.status !== 200)
        dispatch({
          type: types.REPLACE,
          device: Object.assign({}, device, {lastsentcommand: 'ON'}),
        })
    })
  }
}

export const learn = device => {
  return dispatch => {
    fetch(`${SERVER}/devices/${device.id}/learn`, {method: 'POST'})
  }
}

export const add = newDevice => {
  return dispatch => {
    dispatch({
      type: types.ADD,
      device: Object.assign({
        id: 'newDeviceCandidate',
        loading: true,
      }, newDevice),
    })

    fetch(`${SERVER}/devices/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDevice)
    })
    .then(response => response.json())
    .then(device => {
      dispatch({
        id: 'newDeviceCandidate',
        type: types.REPLACE,
        device: device,
      })
    })
  }
}

export const remove = device => {
  return dispatch => {
    dispatch({
      type: types.REMOVE,
      device: device,
    })

    fetch(`${SERVER}/devices/${device.id}/`, {method: 'DELETE'})
    .then(data => {
      if (data.status !== 200)
        dispatch({
          type: types.ADD,
          device: device,
        })
    })
  }
}
