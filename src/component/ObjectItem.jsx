import React, { PropTypes, Component } from 'react';

import { render_item, get_options } from './../tools/Helpers'
import AddButton from './AddButton'
import KeyItem from './KeyItem'

class ObjectItem extends Component {

  static contextTypes = {
    styling: PropTypes.object,
    setup: PropTypes.object
  };

  static propTypes = {
    jkey: PropTypes.string.isRequired,
    doc: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    propagateChanges: PropTypes.func.isRequired
  };

  addButtonSetup() {
    return [
      {
        type: 'text',
        placeholder: 'key',
        multiple: []
      },
      {
        type: 'text',
        placeholder: 'value',
        multiple: get_options(this.context.setup.structure, this.props.level)
      }
    ];
  }

  addItem = (values) => {
    const doc = this.props.doc;
    doc[values[0]] = values[1];
    this.props.propagateChanges('add', this.props.jkey, doc);
  };

  propagateChanges = (change, key, value) => {
    const doc = this.props.doc;
    switch(change) {
      case 'delete':
        delete doc[key];
        break;
      case 'add':
      case 'update':
      default:
        doc[key] = value;
    }
    this.props.propagateChanges('update', this.props.jkey, doc);
  };

  propagateKeyChange = (change, oldKey, key) => {
    const entry = this.props.doc[oldKey];
    const doc = this.props.doc;
    switch(change) {
      case 'delete':
        break;
      case 'add':
      case 'update':
      default:
        doc[key] = entry;
    }
    delete doc[oldKey];

    this.props.propagateChanges('update', this.props.jkey, doc);
  };

  getStyle() {
    return this.context.styling['object'];
  }

  getRowStyle() {
    return this.context.styling['object-row'];
  }

  render() {
    const keys = Object.keys(this.props.doc);
    const rows = keys.map(function(jkey, i) {
      const key = this.props.jkey + '.' + jkey + i;
      const isLast = i == keys.length - 1;

      return <div key={this.props.jkey + '.r' + i} className='ObjectRow' style={this.getRowStyle()}>
        <KeyItem key={this.props.jkey + '.k' + i} jkey={jkey} propagateKeyChange={this.propagateKeyChange} />
        {render_item(key, jkey, this.props.doc[jkey], this.propagateChanges, isLast, this.props.level)}
      </div>
    }, this);

    return (<div className='ObjectItem' style={this.getStyle()}>
      {this.context.setup.tableLike ? null : '{'}
      {rows}
      <AddButton onDone={this.addItem} setup={this.addButtonSetup()} />
      {this.context.setup.tableLike ? null : '}'}
    </div>);
  }
}

export default ObjectItem;
