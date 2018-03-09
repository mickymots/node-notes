import { ActionReducer, Action } from '@ngrx/store';

export const ADD_OPT_LOCK = 'ADD_OPT_LOCK';

export function OptLockReducer(state = {}, action: Action) {
  switch (action.type) {
    case ADD_OPT_LOCK:
      return Object.assign({}, action.payload);

    default:
      return state;
  }
}
