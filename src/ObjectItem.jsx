import React, { PropTypes, Component } from 'react';

import {render_item} from './Helpers'
import AddButton from './AddButton'
import KeyItem from './KeyItem'

const propTypes = {
  jkey: PropTypes.string.isRequired,
  doc: PropTypes.object.isRequired,
  propagateChanges: PropTypes.func.isRequired
};

class ObjectItem extends Component {

  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind();
    this.propagateChanges = this.propagateChanges.bind();
    this.propagateKeyChange = this.propagateKeyChange.bind();
  }

  addButtonSetup() {
    return [
      {
        type: 'text',
        placeholder: 'key',
        multiple: false
      },
      {
        type: 'text',
        placeholder: 'value',
        multiple: true
      }
    ];
  }

  addItem(values) {
    const doc = this.props.doc;
    doc[values[0]] = values[1];
    this.props.propagateChanges('add', this.props.jkey, doc);
  };

  propagateChanges(change, key, value) {
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

  propagateKeyChange(change, oldKey, key) {
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

  render() {
    const keys = Object.keys(this.props.doc);
    const rows = keys.map(function(jkey) {
      return <div className="row">
        <KeyItem key={this.props.jkey + ".key"} jkey={jkey} propagateKeyChange={this.propagateKeyChange} />
        {render_item(this.props.jkey +  jkey, jkey, this.props.doc[jkey], this.propagateChanges)}
      </div>
    }, this);

    return (<div className="object">
      {rows}
      <AddButton key={this.props.jkey + ".add"} onDone={this.addItem} setup={this.addButtonSetup()} />
    </div>);
  }
}

ObjectItem.propTypes = propTypes;

export default ObjectItem;
