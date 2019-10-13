import React, { Component } from 'react';

export default class ErrorMessage extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div>
        <p>
          { msg }
        </p>
      </div>
    )
  }
}