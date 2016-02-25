import React, { PropTypes, Component } from 'react';

import ValueItem from './ValueItem'

const propTypes = {
  jkey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  propagateChanges: PropTypes.array.isRequired
};

class KeyItem extends ValueItem {

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

KeyItem.propTypes = propTypes;

export default KeyItem;
