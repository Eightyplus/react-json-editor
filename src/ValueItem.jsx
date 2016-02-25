import React, { PropTypes, Component } from 'react';

import AddInput from './AddInput'

const propTypes = {
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.boolean
  ]).optional,
  propagateChanges: PropTypes.func.isRequired
};

class ValueItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.onChange = this.onChange.bind();
    this.onDone = this.onDone.bind();
    this.onDelete = this.onDelete.bind();
    this.activateEdit = this.activateEdit.bind();
  };

  getClass() {
    return typeof this.props.value;
  }

  onChange(index, value) {
    // ignore
  }

  onDone(index, value) {
    this.propagateChanges(value)
  }

  propagateChanges(value){
    this.setState({editing: false});

    if(this.props.propagateChanges && this.props.value != value) {
      this.props.propagateChanges('update', this.props.index, value);
    }
  }

  propagateDelete() {
    if(this.props.propagateChanges) {
      this.props.propagateChanges('delete', this.props.index);
    }
  }

  onDelete(event) {
    event.stopPropagation();
    this.propagateDelete();
  }

  activateEdit(event) {
    this.setState({editing: true});
  }

  value() {
    return this.props.value.toString();
  }

  editSettings() {
    return {
      type: typeof this.props.value,
      defaultValue: this.props.value,
      multiple: true
    };
  }

  renderEdit(){
    const settings = this.editSettings();
    return <AddInput index={0} autoFocus={false} onChange={this.onChange} onDone={this.onDone} {...settings}/>
  }

  renderValue(){
    return (
      <div className={this.getClass()} onClick={this.activateEdit}>
        <span>{this.value()}</span>
        {this.renderDelete()}
      </div>
    );
  }

  renderDelete() {
    return <button className="delete" onClick={this.onDelete}>{'\u232B'}</button>;
  }

  render() {
    return this.state.editing ? this.renderEdit() : this.renderValue();
  }
}

ValueItem.propTypes = propTypes;

export default ValueItem;
