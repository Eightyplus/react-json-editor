import React, { PropTypes, Component } from 'react';

import {is_container, get_options, text2value} from './Helpers'

class AddInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.type || 'string',
      value: props.value,
      show: true
    }
  }

  static propTypes = {
    type: PropTypes.string,
    multiple: PropTypes.bool.isRequired,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired
  };

  static contextTypes = {
    styling: React.PropTypes.object
  };

  select() {
    const input = get_options().map(function(option) {
      return <option value={option}>{option}</option>
    }, this);
    return (
      <select onChange={this.handleSelectChange}
              defaultValue={this.state.type}>
        {input}
      </select>
    );
  }

  input() {
    const {defaultValue, placeholder} = this.props;
    return <input className='add-input'
                  style={this.getStyle()}
                  type='text'
                  autoFocus={false}
                  defaultValue={defaultValue}
                  placeholder={placeholder}
                  onBlur={this.finishEdit}
                  onChange={this.handleInputChange}
                  onKeyPress={this.checkEnter}/>;
  }

  doneButton() {
    return <button className="add-button" onClick={this.onDone}>{'\u221A'}</button>
  }

  getStyle() {
    return this.context.styling['input'];
  }

  render() {
    const { multiple } = this.props;

    return (<div>
      {multiple && this.select()}
      {this.state.show ? this.input() : this.doneButton()}
    </div>);
  }

  handleInputChange = (event) => {
    const value = text2value(this.state.type, event.target.value);
    this.props.onChange(this.props.index, value);
    this.setState({value: value});
  };

  handleSelectChange = (event) => {
    var options = event.target.options;
    var type = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        type = options[i].value;
        break;
      }
    }
    const isContainer = is_container(type);
    const value = (isContainer) ? text2value(type, this.state.value) : this.state.value;

    this.setState({type: type, show: !isContainer});
    this.props.onChange(this.props.index, value);
  };

  checkEnter = (event) => {
    if(event.key === 'Enter') {
      this.finishEdit(event);
    }
  };

  finishEdit = (event) => {
    const value = text2value(this.state.type, event.target.value);
    this.props.onDone(this.props.index, value)
  };

  onDone = () => {
    const value = text2value(this.state.type, this.state.value);
    this.props.onDone(this.props.index, value)
  };
}

export default AddInput;
