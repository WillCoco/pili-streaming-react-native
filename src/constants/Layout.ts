import { Dimensions } from 'react-native';

const width: number = Dimensions.get('window').width
const height: number = Dimensions.get('window').height

export const pad = 10;
export const radio = 2;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
