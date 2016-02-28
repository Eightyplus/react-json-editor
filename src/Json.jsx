//TODO import './style.css';

import React, { PropTypes, Component } from 'react';

import {render_item} from './Helpers'
import AddButton from './AddButton'

const styling = {
  'root': {
    'clear': 'left'
  },
  'array': {
    'display': 'inline-table'
  },
  'object': {
    'display': 'inline-table'
  },
  'row': {
    'display': 'block',
    'marginLeft': '1rem'
  },
  'value': {
    'display': 'inline-block',
    'marginLeft': '0.1rem'
  },
  'key': {
      'fontFamily': 'bold'
  },
  'string': {
    'color': 'green'
  },
  'number': {
    'color': 'blue'
  },
  'undefined': {
    'color': 'violet'
  },
  'boolean': {
    'color': 'red'
  },
  'null': {
    'color': 'firebrick'
  },
  'button': {
    'display': 'inline-block'
  },
  'add': {
    'display': 'inline-flex'
  },
  'input': {
    'display': 'inline-block'
  }
};

class Json extends Component {

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
      styling: props.styling || styling // TODO merge styles
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
    return <div className="root" style={this.getStyle()}>{children}</div>
  }
}

export default Json;
