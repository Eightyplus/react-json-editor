//TODO import './style.css';

import React, { PropTypes, Component } from 'react';

import {render_item} from './Helpers'
import AddButton from './AddButton'

class Json extends Component {

  static propTypes = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).optional,
    defaultKey: PropTypes.string.optional,
    defaultJsonKey: PropTypes.string.optional,
    propagateChanges: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.state = {
      defaultValue: props.defaultValue || {},
      defaultKey: props.defaultKey || 'json.',
      defaultJsonKey: props.defaultJsonKey || 'root'
    }
  }

  propagateChanges = (change, key, value) => {
    if (this.props.propagateChanges) {
      this.props.propagateChanges({json: value});
    }
  };

  render() {
    const children = render_item(this.state.defaultKey, this.state.defaultJsonKey,
      this.props.json || this.state.defaultValue, this.propagateChanges);
    return <div className="root">{children}</div>
  }
}

export default Json;
