/**
 * @author: Xu Ke
 * @date: 2020/2/3 12:34 PM
 * @Description: 弹窗队列, 所有涉及Modal的组件集中管理, 互斥, 同一时间只能显示一个
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */

import {Actions, MaskContentTypes as ContentTypes} from './reducer';
import context from './MaskContext';
import Provider from './Provider';

export default {
  Actions,
  context,
  Provider,
  ContentTypes,
}