import * as ACTIONS from './Constants';

const defaultState = {
    isLoggedIn : false,
    username: '',
    displayName: 'display1',
    image: null,
    password: 'P4ssword'
  };
  const authReducer = (state = {... defaultState}, action) => {
      //console.log(action);
      if(action.type === ACTIONS.LOGOUT_SUCCESS){
          return defaultState;
      } else if(action.type === ACTIONS.LOGIN_SUCCESS){
          return {
              ...action.payload,
              isLoggedIn : true
          };
      }
      return state;
  };

  export default authReducer;