'use strict'

/*
 * React Native imports.
 */
import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

/*
 * Third-party imports
 */
import RefreshableListView from 'react-native-refreshable-listview'
import Swipeout from 'react-native-swipeout'

/*
 * Settings declarations
 */
import settings from './settings'

const SERVER = settings.server

import DeviceForm from './components/device-form/DeviceForm'

class tdtoolRestApiClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2,
      }),
      devices: null,
      addDevice: false,
    }
  }

  componentDidMount() {
     this.fetchData();
  }

  toggleAddDevice() {
    this.setState({addDevice: !this.state.addDevice})
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderDevice.bind(this)}
          loadData={this.fetchData.bind(this)}
          style={styles.listView}
        />
        {this.renderAddDevice()}
      </View>
    );
  }

  renderAddDevice() {
    return (
      <View style={styles.addDevice}>
        <TouchableHighlight
          onPress={this.toggleAddDevice.bind(this)}
          underlayColor='#ECFFD1'>
          <View style={styles.addDeviceHeader}>
            <Text style={{textAlign: 'center'}}>
              ADD{this.state.addDevice && 'ING'} DEVICE
           </Text>
          </View>
        </TouchableHighlight>
        {this.state.addDevice && (
          <DeviceForm onSubmit={device => {
            this.setState({addDevice: false})
            this.addDevice(device)
          }} />
        )}
      </View>
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

  addDevice(device) {
    console.log(device)
    fetch(`${SERVER}/devices/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(device)
    })
    .then(data => {
      //if (data.status === 201)
        this.fetchData()
    })
    .done();
  }

  deleteDevice(device) {
    fetch(`${SERVER}/devices/${device.id}/`, {method: 'DELETE'})
    .then(data => {
      this.fetchData()
    })
    .done();
  }

  toggleLight(device) {
    const action = device.lastsentcommand === 'ON' ? 'off' : 'on'
    fetch(`${SERVER}/devices/${device.id}/${action}`, {
      method: 'POST'
    })
    .then(data => {
      if (data.status === 200)
        this.fetchData()
    })
    .done();
  }

  learnDevice(device) {
    fetch(`${SERVER}/devices/${device.id}/learn/`, {method: 'POST'})
  }

  fetchData() {
    fetch(`${SERVER}/devices/`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true,
        })
    })
    .done();
  }

  renderDevice(device) {
    return (
      <Swipeout right={[{
        text: 'EDIT',
        color: '#676767',
        backgroundColor: '#E7E7E7'
      }, {
        text: 'LEARN',
        color: '#676767',
        backgroundColor: '#D6F6FF',
        onPress: this.learnDevice.bind(this, device),
      }, {
        text: 'DELETE',
        color: '#676767',
        backgroundColor: '#FFD4C1',
        onPress: () => {
          AlertIOS.prompt(
            'Confirm deletion',
            `Are you sure you want to delete "${device.name}"?`,
            [{
              text: 'Cancel',
              style: 'cancel',
            }, {
              text: 'Delete',
              onPress: this.deleteDevice.bind(this, device),
              style: 'destructive',
            }],
            'default'
          )
          //this.deleteDevice.bind(this.device),
        }
      }]}>
        <View style={styles.listItem}>
          <TouchableHighlight
            onPress={this.toggleLight.bind(this, device)}
            underlayColor='#F5FCFF'>
            <Image
              source={require('./img/lightbulb.png')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listView: {
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
    paddingBottom: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'left',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
  },
  iconOff: {
    backgroundColor: '#FFFFFF',
  },
  iconOn: {
    backgroundColor: '#FFFBC6',
  },
  addDevice: {
    alignSelf: 'flex-end',
    width: Dimensions.get('window').width,
  },
  addDeviceHeader: {
    backgroundColor: '#E7E7E7',
    paddingBottom: 15,
    paddingTop: 15,
  },
  // ECFFD1
})

AppRegistry.registerComponent('tdtoolRestApiClient', () => tdtoolRestApiClient);
