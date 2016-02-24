import React, { PropTypes, Component } from 'react';

import ValueItem from './ValueItem'

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
