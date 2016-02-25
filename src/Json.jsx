import './style.css';

import React, { PropTypes, Component } from 'react';

import {render_item} from './Helpers'
import AddButton from './AddButton'

const propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).optional,
  defaultKey: PropTypes.string.optional,
  defaultJsonKey: PropTypes.string.optional,
  propagateChanges: PropTypes.func.isRequired
};

class Json extends Component {

  constructor(props){
    super(props);
    this.state = {
      defaultValue: props.defaultValue || {},
      defaultKey: props.defaultKey || 'json.',
      defaultJsonKey: props.defaultJsonKey || 'root'
    };

    this.propagateChanges = this.propagateChanges.bind();
  }

  propagateChanges(change, key, value) {
    if (this.props.update) {
      this.props.update({doc: value});
    }
  };

  render() {
    const children = render_item(this.state.defaultKey, this.state.defaultJsonKey,
      this.props.doc || this.state.defaultValue, this.propagateChanges);
    return <div className="root">{children}</div>
  }
}

Json.propType = propTypes;

export default Json;
