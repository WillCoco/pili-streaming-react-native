/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import {Navigation} from 'react-native-navigation';

import {HomeScreen, SettingsScreen} from './HomeScreen';
import Steam from './Steam';

Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('Steam', () => Steam);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.dismissAllModals();
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
});
