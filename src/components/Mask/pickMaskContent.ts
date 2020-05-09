import MaskContents from './MaskContents/Normal';
import {MaskContentTypes} from './reducer';

const pickMaskContent = (type: MaskContentTypes) => {
  switch (type) {
    case MaskContentTypes.Normal:
      return MaskContents;
    default:
      throw `pickMaskContent: 未知MaskContentTypes "${type}"`;
  }
}

export default pickMaskContent;