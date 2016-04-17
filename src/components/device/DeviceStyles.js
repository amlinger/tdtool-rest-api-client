
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
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
})

export const swipeoutStyles = {
  edit: {
    text: 'EDIT',
    color: '#676767',
    backgroundColor: '#E7E7E7'
  },
  learn: {
    text: 'LEARN',
    color: '#676767',
    backgroundColor: '#D6F6FF',
  },
  delete: {
    text: 'DELETE',
    color: '#676767',
    backgroundColor: '#FFD4C1',
}
}
