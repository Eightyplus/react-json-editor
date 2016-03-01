import React, { PropTypes, Component } from 'react';
import merge from 'merge';

import {render_item} from './../tools/Helpers'
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

function setupStyle(props) {
  const changes = (props.tableLike) ? {
    array: {
      border: '1px solid #414141'
    },
    object: {
      border: '1px solid #414141'
    },
    'array-row': {
      display: 'table-cell',
      borderRight: '1px solid #414141'
    },
    'object-row': {
      borderBottom: '1px solid #414141'
    }
  } : {};

  return merge(merge(styling, changes), props.styling);
}

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
    styling: PropTypes.object,
    setup: PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      defaultValue: props.defaultValue || {},
      defaultKey: props.defaultKey || 'json.',
      defaultJsonKey: props.defaultJsonKey || 'root',
      styling: setupStyle(props),
      json: props.json
    };
  }

  getChildContext() {
    return {
      styling: this.state.styling,
      setup: {tableLike: this.props.tableLike}
    };
  }

  propagateChanges = (change, key, value) => {
    this.setState({json: value});
    if (this.props.propagateChanges) {
      this.props.propagateChanges({json: value});
    }
  };

  getStyle() {
    return this.state.styling['root'];
  }

  render() {
    const children = render_item(this.state.defaultKey, this.state.defaultJsonKey,
      this.state.json || this.state.defaultValue, this.propagateChanges, true);
    return <div className="JsonEditor" style={this.getStyle()}>{children}</div>
  }
}

export default JsonEditor;
