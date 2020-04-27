import React from 'react';

export type attachmentType = React.ReactElement | null | false

const withAttachment = (Component: React.FC | any, attachment?: React.ReactElement | null | false) => {
  return (props: any): React.ReactElement => {
    return (
      <>
        <Component
          {...props}
        />
        {attachment ? attachment : null}
      </>
    ) 
  }
}

export default withAttachment;
