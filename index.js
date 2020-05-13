import { registerRootComponent } from 'expo';
import { UIManager } from 'react-native';
import App from './App';
// import * as WeChat from 'react-native-wechat-lib';

// WeChat.registerApp('appid', 'universalLink');

// WeChat.isWXAppInstalled()
// .then(r => console.log(r, '=========='));

// console.log(WeChat.ShareMiniProgram, 'WeChat.ShareMiniProgram')

// WeChat.ShareMiniProgram({
//   title: '123',
//   description: '123'
// })
// .then(r => console.log(r, '***********'));

import './src/utils/share'


UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
