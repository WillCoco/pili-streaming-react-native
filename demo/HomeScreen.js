import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';

import {Navigation} from 'react-native-navigation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});

export class HomeScreen extends Component {
  options(props) {
    return {
      topBar: {
        title: {
          text: props.name,
        },
      },
    };
  }

  render() {
    return (
      <View style={styles.root}>
        <Button
          title="Push Steam Steam"
          color="#710ce3"
          onPress={() =>
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Steam',
              },
            })
          }
        />
      </View>
    );
  }
}
