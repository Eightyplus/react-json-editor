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

  render () {
    return (
      <div>
        <div>
          <textarea type="text"
                    placeholder="Paste json here"
                    onChange={this.onTextAreaChange}/>
          <button onClick={this.loadJson}>Load typed json</button>
          {this.state.errorText && <div>{this.state.errorText}</div>}
        </div>
        <JsonEditor json={this.state.json} tableLike={true} propagateChanges={this.update}/>
      </div>
    );
  }
}

export default App;