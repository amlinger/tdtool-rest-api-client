import React, {
  Text,
  View,
  Image,
  AlertIOS,
  ListView,
  Component,
  TouchableHighlight,
  DeviceEventEmitter
} from 'react-native'

import {connect} from 'react-redux'
import styles from './DeviceListStyles'
import QuickActions  from 'react-native-quick-actions'
import RefreshableListView from 'react-native-refreshable-listview'

import {fetchAll, on, off} from '../../actions/deviceActions'
import Device from '../../components/device/Device'

class DeviceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2,
      })
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchAll())

    this.subscription = DeviceEventEmitter.addListener('quickActionShortcut', action => {
      console.error(action)
      if (action && action.type === 'LightsOn') {
        this.props.devices.devices.forEach(device => {
          this.props.dispatch(on(device))
        })
      }

      if (action && action.type === 'LightsOff') {
        this.props.devices.devices.forEach(device => {
          this.props.dispatch(off(device))
        })
      }
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  componentWillReceiveProps(props) {
    const action = QuickActions.popInitialAction()

    if (action && action.type === 'LightsOn') {
      props.devices.devices.forEach(device => {
        props.dispatch(on(device))
      })
    }

    if (action && action.type === 'LightsOff') {
      props.devices.devices.forEach(device => {
        props.dispatch(off(device))
      })
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.devices.devices),
    })
  }

  render() {
    const {dispatch} = this.props

    return (
      <RefreshableListView
        dataSource={this.state.dataSource}
        renderRow={device => (<Device dispatch={dispatch} device={device} />)}
        loadData={() => dispatch(fetchAll())}
        style={styles.listView}
        refreshDescription="Fetching Device States"
      />
    )
  }
}

export default connect(state => ({
  devices: state.devices
}))(DeviceList);
