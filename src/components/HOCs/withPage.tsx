/**
 * 页面hoc插件
 * 1. 错误边界
 * 2. statusbar
 * 3. 安全区域
*/
import React from 'react';
import { compose } from 'redux';
import withErrorBound, {optionTypes as fbOpsTypes} from './withErrorBound';
import withSafeArea from './withSafeArea';
import withStatusBar, {optionTypes as statusBarOps} from './withStatusBar';
import withNavBack, {optionTypes as navBackOpsTypes} from './withNavBack';

interface optionTypes {
  statusBarOptions?: statusBarOps,
  fallbackOptions?: fbOpsTypes,
  navBackOptions?: navBackOpsTypes,
}

const withPage = (pageComponent: React.FC, options?: optionTypes) => {
  return compose(
    (c: React.FC) => withNavBack(c, options?.navBackOptions),
    withSafeArea,
    (c: React.FC) => withStatusBar(c, options?.statusBarOptions),
    (c: React.FC) => withErrorBound(c, options?.fallbackOptions),
  )(pageComponent)
}

export default withPage;
