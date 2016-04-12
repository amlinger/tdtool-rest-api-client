'use strict'

/*
 * React Native imports.
 */
import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  PickerIOS,
} from 'react-native';

import styles from './DeviceFormStyles'

const MODELS = [{
  label: 'NEXA Selflearning Switch',
  value: 'selflearning-switch:nexa',
}, {
  label: 'NEXA Selflearning Dimmer',
  value: 'selflearning-dimmer:nexa',
}]

export default class DeviceForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      device: Object.assign({
        name: '',
        model: 'self-learning-switch:nexa',
      }, props.device || {})
    }
  }

  onChangeText(text) {
    this.setState({
      device: Object.assign({}, this.state.device, {name: text})
    })
  }

  render() {
    console.log(this.state.device)
    return (
      <View style={styles.addDeviceForm}>
        <Text style={styles.addDeviceFormComponent}>
          NAME:
        </Text>
        <TextInput
          style={styles.addDeviceFormComponent, {
            height: 40,
            borderColor: '#E7E7E7',
            borderWidth: 1,
            paddingLeft: 10,
          }}
          onChangeText={this.onChangeText.bind(this)}
          placeholder='Device Name'
          value={this.state.name}/>
        <Text style={styles.addDeviceFormComponent}>
          MODEL:
        </Text>
        <PickerIOS
          selectedValue={this.state.device.model}
          onValueChange={model => this.setState({
            device: Object.assign({}, this.state.device, {model: model})
          })}>
          {MODELS.map(model => (
            <PickerIOS.Item
              key={model.value}
              value={model.value}
              label={model.label}/>
          ))}
        </PickerIOS>
        <TouchableHighlight
          onPress={() => this.props.onSubmit(this.state.device)}
          underlayColor='#ECFFD1'>
          <View style={styles.addDeviceButton}>
            <Text style={{textAlign: 'center'}}>
              ADD{this.state.addDevice && 'ING'} DEVICE
           </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
