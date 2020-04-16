import React from 'react';
import { compose } from 'redux';
import withErrorBound, {optionTypes as fbOpsTypes} from './withErrorBound';
import withSafeArea from './withSafeArea';

interface optionTypes extends fbOpsTypes {
}

const withPage = (pageComponent: (props: any) => React.ReactElement, options?: optionTypes) => {
  const fallbackOptions = options && options.fallbackomponent && {fallbackomponent: options.fallbackomponent}
  // return withSafeArea(pageComponent)
  return compose(
    withSafeArea,
    (c: React.FC) => withErrorBound(c, fallbackOptions)
  )(pageComponent)
}

export default withPage;
