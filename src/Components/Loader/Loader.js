import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { SyncLoader } from 'react-spinners';
// Another way to import. This is recommended to reduce bundle size
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <SyncLoader
          css={override}
          sizeUnit={"px"}
          size={25}
          color={'#1C2331'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}


export default Loader