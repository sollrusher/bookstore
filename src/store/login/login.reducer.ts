import {LOGIN_USER, LoginType} from '../actionTypes'

const user = (state = [], action:LoginType )=> {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
            id: action.id,
            email: action.email,
            password: action.password,
            token: action.token,
      };
      default:
        return state;
    }
  }

  export default user;