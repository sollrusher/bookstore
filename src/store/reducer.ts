import {
  combineReducers,
} from 'redux';
import login from './user/user.reducer'


export const rootReducer = combineReducers({
  user: login
})

export type RootState = ReturnType<typeof rootReducer>