import React, { PropTypes, Component } from 'react';
import merge from 'merge';

import { capitalize } from './Helpers'
import AddInput from './AddInput'

class ValueItem extends Component {

  static propTypes = {
    index: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.boolean
    ]),
    propagateChanges: PropTypes.func.isRequired
  };

  static contextTypes = {
    styling: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      hover: false
    };
  };

  mouseOver = () => {
    this.setState({hover: true});
  };

  mouseOut = () => {
    this.setState({hover: false});
  };

  onChange = (index, value) => {
    // ignore
  };

  onDone = (index, value) => {
    this.propagateChanges(value)
  };

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

  onDelete = (event) => {
    event.stopPropagation();
    this.propagateDelete();
  };

  activateEdit = (event) => {
    this.setState({editing: true});
  };

  value() {
    return this.props.value.toString();
  }

  getClass() {
    return typeof this.props.value;
  }

  getClassName() {
    return capitalize(this.getClass()) + 'Item';
  }

  getStyle() {
    if (this.context.styling.hasOwnProperty(this.getClass())) {
      const classStyling = this.context.styling[this.getClass()];
      return merge(true, this.context.styling['value'], classStyling);
    }
    return this.context.styling['value'];
  }

  getSuffix() {
    return null;
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
      <div className={this.getClassName()} style={this.getStyle()} onClick={this.activateEdit}
      onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
      <span>{this.value()}{this.getSuffix()}</span>
        {this.renderDelete()}
      </div>
    );
  }

  renderDelete() {
    const visible = {'visibility': this.state.hover ? 'visible' : 'hidden'};
    const style = merge(true, this.context.styling['delete-button'], visible) ;
    return <button className='delete-button' onClick={this.onDelete} style={style}>{'\u232B'}</button>;
  }

  render() {
    return this.state.editing ? this.renderEdit() : this.renderValue();
  }
}

export default ValueItem;
