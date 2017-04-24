import { combineReducers } from 'redux';
import EmailReducer from './EmailReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  EmailReducer,
  form: formReducer
});