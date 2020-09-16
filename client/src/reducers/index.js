import { combineReducers } from 'redux';
import todos from './todos';
import currTab from './currentTab';

export default combineReducers({
  todos,
  currTab
});
