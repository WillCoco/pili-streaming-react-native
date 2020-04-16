import React from 'react';
import withFallback, {optionTypes as fbOpsTypes} from './withFallback';
import withErrorBound from './withErrorBound';

interface optionTypes extends fbOpsTypes {
}

const withPage = (pageComponent: (props: any) => any, options?: optionTypes) => {
  const fallbackOptions = options && options.fallbackomponent && {fallbackomponent: options.fallbackomponent}
  return withErrorBound(pageComponent);
}

export default withPage;
