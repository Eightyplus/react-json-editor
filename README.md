# react-json-editor
JSON editor for React

# Install 
[![NPM](https://nodei.co/npm/react-json-edit.png)](https://npmjs.org/package/react-json-edit)

# How to use

* import JsonEditor component

`import { JsonEditor } from 'react-json-edit';`

* Add to render method and supply a callback method


```javascript
class MyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      json: undefined /*  setup here or load elsewhere */
    }
  }
  
  callback = (changes) => {
    this.setState({json: changes.json});
  };

  render() {
    return (
      <div>
        <JsonEditor value={this.state.json} propagateChanges={this.callback}/>
      </div>
    );
  }
}
```

# Parse
It possible to parse and see errorMessage from parsing with the following helper method

```javascript
import { parse } from 'react-json-edit';

load_callback(text) {
   const parsed = parse(text);

   if(parsed.json === undefined) {
       this.setState({message: parsed.errorText});
   } else {
       this.setState({json: parsed.json, message: undefined});
   }
}

render() {
  return (
   <div>
     <JsonEditor value={this.state.json} propagateChanges={this.callback}/>
     <span>{this.state.message}</span>
   </div>
  );
}
```

# Styling
I decided to use inline styling, due to troubles with Isomorphic rendering. The styling can be changed with a props on JsonEditor or via css.

`<JsonEditor styling={ ... object }`
where the following keys can be set: `root, array, object, object-row, array-row, value, key, string, number, undefined, boolean, null, button, add-group (AddButton), add-input, add-button, save-button, cancel-button, delete-button`.
Remember that React uses different style names than css does.

or the css class names (which trumps inline style!):
`JsonEditor, ArrayItem, ObjectItem, ArrayRow, ObjectRow, KeyItem, StringItem, NumberItem, BooleanItem,` 

Editor elements:
`AddButton, AddInput, add-input, add-button, save-button, cancel-button, delete-button,`

# Table like style
Add props `tableLike={true}` to view json in a table.

```javascript
  render() {
    return (
      <div>
        <JsonEditor value={this.state.json} tableLike={true} propagateChanges={this.callback}/>
      </div>
    );
  }
```

# TODO
1. Test!
2. More setup options
  - Number of levels
  - Configure add buttons
  - Schema for adding stuff
3. Eventually built in text editor where result is parsed automatically