import * as types from '../actions/actionTypes';

const initialState = {
  loading: true,
  devices: [],
}

export default function devices(state = initialState, action = {}) {
  switch (action.type) {
    case types.SYNC:
      return {
        loading: false,
        devices: action.devices,
      }
    case types.REPLACE:
      return {
        devices: state.devices.map(d =>
          (action.id || action.device.id) === d.id ? action.device : d)
      }
    case types.ADD:
      return {
        devices: state.devices.concat([action.device])
      }
    case types.REMOVE:
      return {
        devices: state.devices.filter(d => d.id !== action.device.id)
      };
    default:
      return state;
  }
}
