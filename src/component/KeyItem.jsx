import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ValueItem from './ValueItem'

class KeyItem extends ValueItem {

  static propTypes = {
    jkey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    propagateKeyChange: PropTypes.func.isRequired
  };

  value() {
    return this.props.jkey;
  }

  getClass() {
    return 'key';
  }

  getSuffix() {
    return ':';
  }

  editSettings() {
    return {
      type: 'string',
      defaultValue: this.props.jkey,
      multiple: false
    };
  }

  propagateChanges(jkey){
    this.setState({editing: false});

    if(this.props.propagateKeyChange && this.props.jkey != jkey) {
      this.props.propagateKeyChange('update', this.props.jkey, jkey);
    }
  }

  propagateDelete() {
    if(this.props.propagateKeyChange) {
      this.props.propagateKeyChange('delete', this.props.jkey);
    }
  }
}

export default KeyItem;
