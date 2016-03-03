
export { default as JsonEditor } from './component/JsonEditor';
export { parse } from './tools/Helpers';

if (process.env.NODE_ENV !== 'production') {
  Object.defineProperty(exports, 'default', {
    get() {
      console.error("Default export is not provided. You should use: import {Json} from 'react-json-edit''");
    }
  });
}