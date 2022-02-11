const defaultState = {
    isLoggedIn : false,
    username: 'user1',
    displayName: 'display1',
    image: null,
    password: 'P4ssword'
  };
  const authReducer = (state = {... defaultState}, action) => {
      //console.log(action);
      if(action.type === "logout-success"){
          return defaultState;
      }
      return state;
  };

  export default authReducer;