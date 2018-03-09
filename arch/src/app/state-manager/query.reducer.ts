import { ActionReducer, Action } from '@ngrx/store';

export const ADD_SEARCH_QUERY = 'ADD_SEARCH_QUERY';
export const RESET_SEARCH_QUERY = 'ADD_SEARCH_QUERY';

export function QueryReducer(state = {}, action: Action) {
  switch (action.type) {
    case ADD_SEARCH_QUERY:
      return action.payload;
    case RESET_SEARCH_QUERY:
      return {};
    default:
      return state;
  }
}
