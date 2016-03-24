import React, { Component } from 'react';

import JsonEditor from '../src/component/JsonEditor';
import { parse } from '../src/tools/Helpers';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      json: undefined,
      text: undefined,
      errorText: undefined
    }
  }

  onTextAreaChange = (event) => {
    this.setState({text: event.target.value})
  };

  loadJson = (event) => {
    this.setState(parse(this.state.text))
  };

  update = (json) => {
    this.setState({json: json, text: JSON.stringify(json)})
  };

  structure() {
    // levels
    // definitions: {type, value, children_allowed, children_max}
    // children_allowed, children_max

    return {
      definitions: {
        'etc.': {
          type: 'object',
          value: {levels: 0, arrayKey: [1, 2, 3], sKey: 'Batman'}
        },
        'misc': {
          type: 'string',
          value: 'miscellaneous'
        },
        'container': {
          type: 'object',
          children_allowed: ['misc', 'etc.'],
          children_max: {
            'misc': 1
          }
        }
      },
      levels: 3,
      children_allowed: ['object', 'array', 'container', 'etc.']
    };
  }

  render () {
    return (
      <div>
        <div>
          <textarea type="text"
                    value={this.state.text}
                    placeholder="Paste json here"
                    onChange={this.onTextAreaChange}/>
          <button onClick={this.loadJson}>Load typed json</button>
          {this.state.errorText && <div>{this.state.errorText}</div>}
        </div>
        <JsonEditor value={this.state.json} tableLike={true} structure={this.structure()} propagateChanges={this.update}/>
      </div>
    );
  }
}

export default App;