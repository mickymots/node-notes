import { ActionReducer, Action } from '@ngrx/store';

/**
 * List of Actions that are available on the reducer function
 */
export const ADD_AUTH = 'ADD_AUTH';
export const UPDATE_ROUTE = 'UPDATE_ROUTE';

/**
 * This reducer function defines the initial state of Authentication
 * information and list of actions that are available on the reducer function
 */
export function AuthReducer(state = [], action: Action) {
  switch (action.type) {
    case ADD_AUTH:
      return [
        Object.assign({}, {
          pid: action.payload.pid,
          roles: action.payload.roles,
          displayName: action.payload.displayName,
          orgID: action.payload.orgID,
          modules: action.payload.modules,
          hostname: action.payload.host,
          departmentName: action.payload.department,
          locationAddress: action.payload.location
        })
      ]
    case UPDATE_ROUTE:
      return [
        Object.assign({}, {
          pid: action.payload.pid,
          roles: action.payload.roles,
          displayName: action.payload.displayName,
          orgID: action.payload.orgID,
          modules: action.payload.modules,
          hostname: action.payload.host,
          departmentName: action.payload.department,
          locationAddress: action.payload.location
        })
      ]
    default:
      return state;
  }
}
