import React from 'react';

import ArrayItem from './ArrayItem'
import ObjectItem from './ObjectItem'
import ValueItem from './ValueItem'

// how to import:
// import { render_item, get_options, is_container, text2value, value2text } from 'Helpers';


export function render_item(key, jkey, value, propagateChanges) {
  if (value instanceof Array) {
    return <ArrayItem key={key} jkey={jkey} doc={value} propagateChanges={propagateChanges}/>;
  } else if (value instanceof Object) {
    return <ObjectItem key={key} jkey={jkey} doc={value} propagateChanges={propagateChanges}/>
  } else {
    return <ValueItem key={key} index={jkey} value={value} propagateChanges={propagateChanges} />;
  }
}

export function get_options() {
  return ['string', 'number', 'boolean', 'object', 'array']; // TODO Value, Whitespace, null
}

export function is_container(type) {
  switch (type) {
    case 'array':
    case 'object':
      return true;
    default:
      return false;
  }
}

export function text2value(type, value) {
  switch (type) {
    case 'boolean':
      const indexOf = ['true', '1', 'yes', 'on'].indexOf(value.toLowerCase());
      return Boolean(0 <= indexOf);
    case 'number':
      return Number(value);
    case 'array':
      return [];
    case 'object':
      return {};
    case 'string':
    default:
      return value;
  }
}

export function value2text(value) {
  const type = typeof value;
  switch(type) {
    case 'boolean':
    case 'number':
      value = value.toString();
      break;
    case 'undefined':
      value = undefined;
      break;
  }
  return value;
}

function add2text (text, index, add) {
  return text.substr(0, index) + add + text.substr(index);
}

function showError(error, text) {
  const start = error.indexOf(' at line ');
  const middle = error.indexOf(' column ');
  const end = error.indexOf(' of the JSON data');

  const at = parseInt(error.substr(start + 9, middle)) - 1;
  const column = parseInt(error.substr(middle + 8, end)) - 1;

  var lines = text.split('\n');
  for(var line = 0; line < lines.length; line++){
    if (at == line) {
      return add2text(lines[line], column, '\u02F0');
    }
  }
}

function isJson(text) {
  return /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
  replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
  replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
}

export function parse(text) {
  try {
    return {json: JSON.parse(text)};
  } catch (error) {
    const errorString = error.toString();
    const errorMessage = 'Pasted text is not valid json. Error: ' + errorString + ' - '
      + showError(errorString, text);

    return {json: undefined, errorText: errorMessage};
  }
}
