import { createStore } from 'redux';
import authReducer from './authReducer';


const loggedInState = {
    isLoggedIn : false,
    username: '',
    displayName: 'display1',
    image: null,
    password: 'P4ssword'
  };

  const configureStore = () => {
      return createStore(authReducer, loggedInState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  export default configureStore;