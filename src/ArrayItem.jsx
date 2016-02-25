import React, { PropTypes, Component } from 'react';

import {render_item} from './Helpers'
import AddButton from './AddButton'

const propTypes = {
  jkey: PropTypes.string.isRequired,
  doc: PropTypes.array.isRequired,
  propagateChanges: PropTypes.func.isRequired
};

class ArrayItem  extends Component {

  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind();
    this.propagateChanges = this.propagateChanges.bind();
  }

  addButtonSetup() {
    return [
      {
        type: 'String',
        placeholder: 'value',
        multiple: true
      }
    ];
  }

  addItem (values) {
    const doc = this.props.doc;
    doc.push(values[0]);
    this.props.propagateChanges('add', this.props.jkey, doc);
  }

  propagateChanges (change, index, value) {
    const doc = this.props.doc;
    switch(change) {
      case 'delete':
        doc.splice(index, 1);
        break;
      case 'add':
      case 'update':
      default:
        doc[index] = value;
    }

    this.props.propagateChanges('update', this.props.jkey, doc);
  }

  render() {
    const items = this.props.doc.map(function(item, index) {
      const key = this.props.jkey + index;
      return <div>{render_item(key, index, item, this.propagateChanges)}</div>
    }, this);

    return <div className="array">
      {items}
      <AddButton key={this.props.jkey + ".add"} onDone={this.addItem} setup={this.addButtonSetup()} />
    </div>
  }
}

ArrayItem.propTypes = propTypes;

export default ArrayItem;
