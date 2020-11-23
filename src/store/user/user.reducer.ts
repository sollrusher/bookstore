import {LOGIN_USER, LoginType} from '../actionTypes'

const initialState = {
  user: []
}

const login = (state = initialState, action:LoginType )=> {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
          user: [
            ...state.user,
            {
              id: action.id,
              email: action.email,
              password: action.password,
              token: action.token,
            },
          ],
            
      };
      default:
        return state;
    }
  }

  export default login;