import {Colors} from './src/constants/Theme'

/**
 * react-native-normalization-text 配置文件
 */
const sizes = {
  huge: 36,
  xHuge: 32,
  xxxLarge: 24,
  xxLarge: 20,
  xLarge: 18,
  large: 16,
  normal: 14,
  small: 12,
  tiny: 10,
};

const colors = {
  theme: Colors.basicColor,
  title: "#000",
  primary: "#333",
  secondary: "#666",
  white: "rgb(255,255,255)",
  grey: "#999",
  // success: "#52c41a",
  // warning: "#faad14",
  // error: "#ff190c",
};

const config = {
  /**
   * scale 为字体缩放方法
   */
  // scale: (size) => (),

  /**
   * scalableItems Array<string>
   * 接受scale方法缩放的样式属性
   */
  // scalableItems: ['fontSize', 'lineHeight'],

  /**
   *  sizes中定义的尺寸可在Text组件中使用该props：
   *  <Text size="large"></Text.H1>
   *  <Text.H1 size="small"></Text.H1>
   */
  sizes,
  /**
   *  colors字段中定义的颜色可在Text组件中使用该props：
   *  <Text color="dark"></Text.H1>
   *  <Text.H1 color="error"></Text.H1>
   */
  colors,
  /**
   *  categories 下定义H1、H2，及可在书写组件时使用H1、H2
   */
  categories: {
    H1: {
      style: {
        fontSize: sizes.huge,
        color: colors.title,
        // lineHeight: 40
      }
    },
    H2: {
      style: {
        fontSize: sizes.xHuge,
        color: colors.title,
        // lineHeight: 40
      }
    },
    T1: {
      style: {
        fontSize: sizes.xxxLarge,
        color: colors.title,
        // lineHeight: 40
      }
    },
    T2: {
      style: {
        fontSize: sizes.xxLarge,
        color: colors.title,
        // lineHeight: 32
      }
    },
    T3: {
      style: {
        fontSize: sizes.xLarge,
        color: colors.title,
        // lineHeight: 28
      }
    },
    T4: {
      style: {
        fontSize: sizes.large,
        color: colors.title,
        // lineHeight: 24
      }
    },
    PrimaryText: {
      style: {
        fontSize: sizes.normal,
        color: colors.primary,
        // lineHeight: 22
      }
    },
    SmallText: {
      style: {
        fontSize: sizes.small,
        color: colors.secondary,
        // lineHeight: 20
      }
    },
    TinyText: {
      style: {
        fontSize: sizes.tiny,
        color: colors.grey,
        // lineHeight: 18
      }
    }
  }
};

export default config;
