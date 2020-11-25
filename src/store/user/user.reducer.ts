/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { LOGIN_USER, LoginType, INIT_USER } from '../actionTypes';
import { getProfileData } from '../../api/user';
import { loginUser } from './user.action';
import store from '../store';

const getInitialState = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {
      user: {},
      initialized: false,
    };
  }

  return {
    user: {},
    initialized: true,
  };
};

// type TypeState = {
//   user: {},
//   initialized: boolean,
// };

const login = (state = getInitialState(), action:LoginType) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log(state);
      return {
        ...state,
        user: {
          ...state.user as object | null,
          id: action.id,
          email: action.email,
          fullname: action.fullname,
          age: action.age,
          about: action.about,
        },
        initialized: true,
      };
    case INIT_USER:
    {
      const data = getProfileData().then((userdata) => {
        const {
          id, email, fullname, age, about,
        } = userdata;
        console.log(id, email, fullname, age, about);
        store.dispatch(loginUser(id, email, fullname, age, about));
      });
      console.log(data);
      return state;
    }
    default:
      return state;
  }
};

export default login;
