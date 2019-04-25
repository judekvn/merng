/* eslint-disable import/prefer-default-export */

import { USER_LOGIN } from '../constants';

export function userLogin(user) {
  return {
    type: USER_LOGIN,
    payload: {
      ...user,
    },
  };
}
