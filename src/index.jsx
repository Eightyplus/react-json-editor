
export { default as JsonEditor } from './JsonEditor';

if (process.env.NODE_ENV !== 'production') {
  Object.defineProperty(exports, 'default', {
    get() {
      console.error("Default export is not provided. You should use: import {Json} from 'react-json-edit''");
    }
  });
}