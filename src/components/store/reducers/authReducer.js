import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

const initState = {
    loginError: null,
    signupError: null
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      
      case actionTypes.LOGIN_SUCCESS:
        return updateObject(state, {loginError: 'null'});

      case actionTypes.LOGIN_ERROR:
        return updateObject(state, {loginError: 'login failed'});

      case actionTypes.SIGNUP_SUCCESS:
        return updateObject(state, {signupError: null});

      case actionTypes.SIGNUP_ERROR:
          return updateObject(state, {signupError: action.err.message});

      case actionTypes.SIGNOUT_SUCCESS:
        return updateObject(state);
          
      default:
        return state;
    }
  };
  
  export default authReducer;