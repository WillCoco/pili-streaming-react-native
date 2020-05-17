import { compose } from 'redux';
import {get, post, uploadWorkMedia, liveUpload, FileType, UpdateParams} from './fetchOrigin';
import * as RS from './responseHandlers';

type ParamsType = Array<any>
/**
 * 原商城部分处理方式(只返回resonse.data)
 * 按顺序处理:
 *  超时
 *  token认证
 *  未知code错误toast
 *  提取result.data
 * @param params 
 */
const get1 = (...p: ParamsType) => compose(
  RS.dataFormatHandler,
  RS.restErrorHandler,
  RS.authInvalidHandler,
  RS.timeoutHandler,
  get,
)(...p);

const post1 = (...p: ParamsType) => compose(
  RS.dataFormatHandler,
  RS.restErrorHandler,
  RS.authInvalidHandler,
  RS.timeoutHandler,
  post,
)(...p);

/**
 * 不处理方式data
 * 按顺序处理:
 *  超时
 *  token认证
 *  未知code错误toast
 * @param params 
 */
const get2 = (...p: ParamsType) => compose(
  RS.restErrorHandler,
  RS.authInvalidHandler,
  RS.timeoutHandler,
  get,
)(...p);

const post2 = (...p: ParamsType) => compose(
  RS.restErrorHandler,
  RS.authInvalidHandler,
  RS.timeoutHandler,
  post,
)(...p);

export {
  get,
  get1,
  get2,
  post,
  post1,
  post2,
  liveUpload,
  uploadWorkMedia,
  ParamsType,
  FileType,
  UpdateParams,
}