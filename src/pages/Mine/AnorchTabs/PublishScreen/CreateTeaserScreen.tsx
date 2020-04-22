import * as React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import withPage from '../../../../components/HOCs/withPage'

const CreateTraserScreen = () =>  {
  console.log(11111)
  return (
    <View style={styles.style}>
      <Text>123</Text>
    </View>
  )
};

CreateTraserScreen.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default withPage(CreateTraserScreen, {
  statusBarOptions: {
    barStyle: 'dark-content',
    backgroundColor: '#fff',
  }
});