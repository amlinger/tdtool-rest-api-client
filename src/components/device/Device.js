'use strict'

import React, {
  Component,
  AlertIOS,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native'

import Swipeout from 'react-native-swipeout'

import {
  on,
  off,
  learn,
  update,
  remove,
} from '../../actions/deviceActions'

import styles, {swipeoutStyles} from './DeviceStyles'

export default class Device extends React.Component {
  constructor(props) {
    super(props)

    this.toggleDevice = this.toggleDevice.bind(this)
    this.learnDevice = this.learnDevice.bind(this)
    this.editDevice = this.editDevice.bind(this)
    this.deleteDevice = this.deleteDevice.bind(this)
  }

  toggleDevice() {
    const {dispatch, device} = this.props

    if (device.lastsentcommand === 'OFF')
      dispatch(on(device))

    if (device.lastsentcommand === 'ON')
      dispatch(off(device))
  }

  learnDevice() {this.props.dispatch(learn(this.props.device)) }

  editDevice() {
    console.error("NOT implemented yet.")
  }

  deleteDevice() {
    const {device} = this.props
    AlertIOS.prompt(
      'Confirm deletion',
      `Are you sure you want to delete "${device.name}"?`,
      [{
        text: 'Cancel',
        style: 'cancel',
      }, {
        text: 'Delete',
        onPress: () => this.props.dispatch(remove(device)),
        style: 'destructive',
      }],
      'default'
    )
  }

  render() {
    const {device} = this.props

    return (
      <Swipeout right={[
        {onPress: this.editDevice,   ...swipeoutStyles.edit},
        {onPress: this.learnDevice,  ...swipeoutStyles.learn},
        {onPress: this.deleteDevice, ...swipeoutStyles.delete},
      ]}>
        <View style={styles.listItem}>
          <TouchableHighlight
            onPress={this.toggleDevice}
            underlayColor='#F5FCFF'>
            <Image
              source={require('../../assets/img/lightbulb.png')}
              style={[
                styles.icon,
                device.lastsentcommand === 'ON' ? styles.iconOn : styles.iconOff
              ]}
            />
          </TouchableHighlight>
          <Text style={styles.name}>{device.name}</Text>
        </View>
      </Swipeout>
    )
  }
}
