'use strict'

import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
} from 'react-native'

import {connect} from 'react-redux'
import {add} from '../../actions/deviceActions'
import DeviceForm from '../../components/device-form/DeviceForm'
import styles from './AddDeviceStyles'

class AddDevice extends Component {
  constructor(props) {
    super(props)

    this.state = {visible: false}
  }

  addDevice(device) {
    this.setState({visible: false})
    this.props.dispatch(add(device))
  }

  render() {
    const {visible} = this.state
    return (
      <View style={styles.addDevice}>
        <TouchableHighlight
          onPress={() => this.setState({visible: !this.state.visible})}
          underlayColor='#ECFFD1'>
          <View style={styles.addDeviceHeader}>
            <Text style={{textAlign: 'center'}}>
              ADD{visible && 'ING'} DEVICE
           </Text>
          </View>
        </TouchableHighlight>
        {visible && (<DeviceForm onSubmit={this.addDevice.bind(this)} />)}
      </View>
    )
  }
}

export default connect(state => ({
  devices: state.devices
}))(AddDevice);
