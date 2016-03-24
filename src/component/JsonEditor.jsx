import React, { PropTypes, Component } from 'react';
import merge from 'merge';

import {render_item, verify_structure} from './../tools/Helpers'
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
    minWidth: 10,
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
  const border = props.border || '1px solid #414141';
  const changes = (props.tableLike) ? {
    root: {
      display: 'table',
      border: border,
      borderCollapse: 'collapse'
    },
    array: {
      display: 'table-cell',
      border: border
    },
    object: {
      display: 'table-cell',
      border: border
    },
    'array-row': {
      display: 'table-cell',
      border: border,
      marginLeft: 0
    },
    'object-row': {
      display: 'table-row',
      border: border,
      marginLeft: 0
    },
    key: {
      display: 'table-cell',
      border: border
    },
    value: {
      display: 'table-cell',
      marginLeft: 0
    },
    'add-button': {
      display: 'table-cell'
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
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    structure: PropTypes.object,
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
    verify_structure(props.structure);
    this.state = {
      defaultKey: props.defaultKey || 'json.',
      defaultJsonKey: props.defaultJsonKey || 'root',
      styling: setupStyle(props)
    };
  }

  getChildContext() {
    return {
      styling: this.state.styling,
      setup: {tableLike: this.props.tableLike, structure: this.props.structure || {}}
    };
  }

  propagateChanges = (change, key, value) => {
    this.setState({value: value});
    if (this.props.propagateChanges) {
      this.props.propagateChanges(value);
    }
  };

  getStyle() {
    return this.state.styling['root'];
  }

  render() {
    const value = this.props.value || this.props.defaultValue || {};
    const children = render_item(this.state.defaultKey, this.state.defaultJsonKey, value, this.propagateChanges, false, 0);
    return <div className="JsonEditor" style={this.getStyle()}>{children}</div>
  }
}

export default JsonEditor;
