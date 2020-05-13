import MaskContents from './MaskContents/Normal';
import MaskWithAvatar from './MaskContents/WithAvatar';
import MaskWithBorderTop from './MaskContents/WithBorderTop';
import Prompt from './MaskContents/Prompt';
import IOSDatePicker from './MaskContents/IOSDatePicker';
import {MaskContentTypes} from './reducer';

const pickMaskContent = (type: MaskContentTypes) => {
  switch (type) {
    case MaskContentTypes.Normal:
      return MaskContents;
    case MaskContentTypes.WithAvatar:
      return MaskWithAvatar;
    case MaskContentTypes.WithBorderTop:
      return MaskWithBorderTop;
    case MaskContentTypes.Prompt:
      return Prompt;
    case MaskContentTypes.IOSDatePicker:
      return IOSDatePicker;
    default:
      throw `pickMaskContent: 未知MaskContentTypes "${type}"`;
  }
}

export default pickMaskContent;