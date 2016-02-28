import React, { PropTypes, Component } from 'react';
import merge from 'merge';

import ValueItem from './ValueItem'

const style = {
  'fontFamily': 'bold'
};

class KeyItem extends ValueItem {

  static propTypes = {
    jkey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    propagateChanges: PropTypes.array.isRequired
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

  getStyle() {
    return merge(true, super.getStyle(), style);
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
