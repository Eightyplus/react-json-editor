//TODO import './style.css';

import React, { PropTypes, Component } from 'react';
import merge from 'merge';

import {render_item} from './Helpers'
import AddButton from './AddButton'

const styling = {
  root: {
    clear: 'left'
  },
  array: {
    display: 'inline-table'
  },
  object: {
    display: 'inline-table'
  },
  'object-row': {
    display: 'block',
    marginLeft: 1
  },
  'array-row': {
    display: 'block',
    marginLeft: 1
  },
  value: {
    display: 'inline-block',
    marginLeft: 0.1
  },
  key: {
    fontWeight: 'bold'
  },
  string: {
    color: 'green'
  },
  number: {
    color: 'blue'
  },
  'undefined': {
    color: 'violet'
  },
  boolean: {
    color: 'red'
  },
  'null': {
    color: 'firebrick'
  },
  'add-button': {
    display: 'inline-block'
  },
  'save-button': {
    display: 'inline-block'
  },
  'cancel-button': {
    display: 'inline-block'
  },
  'delete-button': {
    float: 'right',
    marginLeft: 0.5,
    display: 'inline-block'
  },
  'add-group': {
    display: 'inline-flex'
  },
  'add-input': {
    display: 'inline-block'
  }
};

class JsonEditor extends Component {

  static propTypes = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    defaultKey: PropTypes.string,
    defaultJsonKey: PropTypes.string,
    propagateChanges: PropTypes.func.isRequired
  };

  static childContextTypes = {
    styling: React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      defaultValue: props.defaultValue || {},
      defaultKey: props.defaultKey || 'json.',
      defaultJsonKey: props.defaultJsonKey || 'root',
      styling: merge(styling, props.styling)
    };
  }

  getChildContext() {
    return {styling: this.state.styling};
  }

  propagateChanges = (change, key, value) => {
    if (this.props.propagateChanges) {
      this.props.propagateChanges({json: value});
    }
  };

  getStyle() {
    return this.state.styling['root'];
  }

  render() {
    const children = render_item(this.state.defaultKey, this.state.defaultJsonKey,
      this.props.json || this.state.defaultValue, this.propagateChanges);
    return <div className="JsonEditor" style={this.getStyle()}>{children}</div>
  }
}

export default JsonEditor;
