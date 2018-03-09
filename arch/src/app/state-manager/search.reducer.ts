import { ActionReducer, Action } from '@ngrx/store';

export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';

export function SearchReducer(state = {}, action: Action) {
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
