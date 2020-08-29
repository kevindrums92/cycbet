import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import event from './event';
import stage from './stage';

export default combineReducers({
  alert,
  auth,
  event,
  stage,
});
