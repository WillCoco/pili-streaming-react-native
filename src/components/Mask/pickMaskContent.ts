import MaskContents from './MaskContents/Normal';
import Prompt from './MaskContents/Prompt';
import {MaskContentTypes} from './reducer';

const pickMaskContent = (type: MaskContentTypes) => {
  switch (type) {
    case MaskContentTypes.Normal:
      return MaskContents;
    case MaskContentTypes.Prompt:
      return Prompt;
    default:
      throw `pickMaskContent: 未知MaskContentTypes "${type}"`;
  }
}

export default pickMaskContent;