/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { LOGIN_USER, LoginActionType, INIT_USER } from '../actionTypes';
import { getProfileData } from '../../api/user';
import { loginUser } from './user.action';
import store from '../store';
import { UserState } from '../storeTypes';

const getInitialState = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {
      user: {
        id: 0,
        email: '',
        fullname: '',
        age: 0,
        about: '',
      },
      initialized: false,
    };
  }
  return {
    user: {
      id: 0,
      email: '',
      fullname: '',
      age: 0,
      about: '',
    },
    initialized: true,
  };
};

const login = (state:UserState = getInitialState(), action:LoginActionType): UserState => {
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
      getProfileData().then((userdata) => {
        const {
          id, email, fullname, age, about,
        } = userdata;
        console.log(id, email, fullname, age, about);
        store.dispatch(loginUser(id, email, fullname, age, about));
      });
      return state;
    }
    default:
      return state;
  }
};

export default login;
