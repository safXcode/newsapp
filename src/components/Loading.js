import React, { Component } from 'react'
import loading from '../loading.gif';

export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img  src={loading} style={{width: "100px", marginTop: "100px"}} alt="" />
        </div>
    )
  }
}
