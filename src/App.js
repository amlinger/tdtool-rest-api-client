'use strict'

import React, {
  View,
  Component,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native'

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

import DeviceList from './containers/device-list/DeviceList'
import AddDevice from './containers/add-device/AddDevice'

export default class tdtoolRestApiClient extends Component {

  render() {
    //if (!this.state.loaded) {
    //  return this.renderLoadingView();
    //}

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeviceList />
          <AddDevice />
        </View>
      </Provider>
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.listItem}>
        <Text>
          Loading Devices...
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
