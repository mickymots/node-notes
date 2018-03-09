import { ActionReducer, Action } from '@ngrx/store';

/**
 * List of Actions that are available on the reducer function
 */
export const RESET = 'RESET';
export const UPDATE = 'UPDATE';


/**
 * This reducer function defines the initial state of Session timeout information and
 * list of actions that are available on the reducer function
 */
export function SessionStateReducer(state: number = 0, action: Action) {
  switch (action.type) {
    case RESET:
      return  action.payload.timeout

    case UPDATE:
      return  state - action.payload.factor

     default:
      return state;
  }
}
