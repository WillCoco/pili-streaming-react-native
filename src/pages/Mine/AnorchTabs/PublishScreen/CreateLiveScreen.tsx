import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import withPage from '../../../../components/HOCs/withPage'

const CreateLiveScreen = () =>  {
  return (
    <View style={styles.style}>
    </View>
  )
};

CreateLiveScreen.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default withPage(CreateLiveScreen, {
  navBackOptions: {
    navBackIcon: 'close',
    navBackTheme: 'light',
    navBackPosition: 'right',
  }
});