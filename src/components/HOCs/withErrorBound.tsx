import React, { Component } from 'react';
import FallbackUI from '../FallbackUI';

interface stateType {
  hasError: boolean
}

export interface optionTypes {
  fallbackComponent?: any
}

export default function withErrorBound(WrappingComponent: any, fallbackOptions?: optionTypes) {
  return class Wrapped extends Component<any, stateType> {
    constructor(props: any) {
      super(props);
      this.state = {
        hasError: false
      };
    }

    static getDerivedStateFromError(error: any) {
      console.log(error);
      return {
        hasError: true
      };
    }

    componentDidCatch(err: any) {
      console.log(err, 'catchErr');
      // 错误上报
    }

    render() {
      if (this.state.hasError) {
        const FBUI = fallbackOptions?.fallbackComponent || FallbackUI;
        return <FBUI {...this.props} />;
      }

      return <WrappingComponent {...this.props} />;
    }
  };
};
