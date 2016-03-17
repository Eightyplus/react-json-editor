import React, { PropTypes, Component } from 'react';

import {render_item} from './../tools/Helpers'
import AddButton from './AddButton'

class ArrayItem  extends Component {

  static contextTypes = {
    styling: PropTypes.object,
    setup: PropTypes.object
  };

  static propTypes = {
    jkey: PropTypes.string.isRequired,
    doc: PropTypes.array.isRequired,
    level: PropTypes.number.isRequired,
    propagateChanges: PropTypes.func.isRequired
  };

  addButtonSetup() {
    const setup = (this.props.level < this.context.setup.structure.levels) ?
      true : ['string', 'number', 'boolean', 'whitespace', 'null'];

    return [
      {
        type: 'String',
        placeholder: 'value',
        multiple: setup
      }
    ];
  }

  addItem = (values) => {
    const doc = this.props.doc;
    doc.push(values[0]);
    this.props.propagateChanges('add', this.props.jkey, doc);
  };

  propagateChanges = (change, index, value) => {
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
  };

  getStyle() {
    return this.context.styling['array'];
  }

  getRowStyle() {
    return this.context.styling['array-row'];
  }

  render() {
    const lastIndex = this.props.doc.length - 1;
    const items = this.props.doc.map(function(item, index) {
      const key = this.props.jkey + index;
      const isLast = index == lastIndex;

      return(<div className='ArrayRow' style={this.getRowStyle()}>
        {render_item(key, index, item, this.propagateChanges, isLast, this.props.level)}
      </div> );
    }, this);

    return <div className="ArrayItem" style={this.getStyle()}>
      {this.context.setup.tableLike ? null : '[' }
      {items}
      <div className='ArrayRow' style={this.getRowStyle()}>
        <AddButton onDone={this.addItem} setup={this.addButtonSetup()} />
      </div>
      {this.context.setup.tableLike ? null : ']' }
    </div>
  }
}

export default ArrayItem;
