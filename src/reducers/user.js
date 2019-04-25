import { USER_LOGIN } from '../constants';

export default function user(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
