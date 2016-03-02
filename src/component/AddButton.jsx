import React, { PropTypes, Component } from 'react';

import AddInput from './AddInput'

class AddButton extends Component {

  static propTypes = {
    onDone: PropTypes.func.isRequired,
    setup: PropTypes.array.isRequired
  };

  static contextTypes = {
    styling: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      values: []
    }
  }

  add = () => {
    this.setState({adding: true});
  };

  next = (index) => {
    /* TODO
     var child = this.refs['child' + index];
     if (!child) return;
     var input = child.refs.input;
     ReactDOM.findDOMNode(child).input.focus();
     */
  };

  onDone = (index, value) => {
    this.onChange(index, value);

    if (index < this.props.setup.length - 1 ) {
      this.next(index + 1);
    } else {
      this.save();
    }
  };

  onChange = (index, value) => {
    const values = this.state.values;
    values[index] = value;
    this.setState({values: values})
  };

  cancel = () => {
    this.setState({adding: false});
  };

  save = () => {
    this.setState({adding: false});
    this.props.onDone(this.state.values);
  };

  getStyle() {
    return this.context.styling['add-group']
  }

  getButtonStyle(style) {
    return this.context.styling[style]
  }

  input() {
    const {setup} = this.props;
    const inputs = setup.map(function(settings, index) {
      return <AddInput key={'ab' + index} index={index} onChange={this.onChange} onDone={this.onDone} {...settings}/>
    }, this);

    return <div className='AddButton' style={this.getStyle()}>
      {inputs}
      <button className='save-button' style={this.getButtonStyle('save-button')} onClick={this.save}>Save</button>
      <button className='cancel-button' style={this.getButtonStyle('cancel-button')} onClick={this.cancel}>Cancel</button>
    </div>
  }

  render() {
    if (this.state.adding) {
      return this.input();
    } else {
      return <button className='add-button' style={this.getButtonStyle('add-button')} onClick={this.add}>+</button>
    }
  }
}

export default AddButton;
