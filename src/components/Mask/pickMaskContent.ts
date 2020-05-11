import MaskContents from './MaskContents/Normal';
import MaskWithAvatar from './MaskContents/WithAvatar';
import MaskWithBorderTop from './MaskContents/WithBorderTop';
import {MaskContentTypes} from './reducer';

const pickMaskContent = (type: MaskContentTypes) => {
  switch (type) {
    case MaskContentTypes.Normal:
      return MaskContents;
    case MaskContentTypes.WithAvatar:
      return MaskWithAvatar;
    case MaskContentTypes.WithBorderTop:
      return MaskWithBorderTop;
    default:
      throw `pickMaskContent: 未知MaskContentTypes "${type}"`;
  }
}

export default pickMaskContent;