import {LOGIN_USER} from '../actionTypes'



const user = (state = [], action: { type: string; email: string; password: string; token: string; }) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
            email: action.email,
            password: action.password,
            token: action.token,
      };
      default:
        return state;
    }
  }

  export default user;