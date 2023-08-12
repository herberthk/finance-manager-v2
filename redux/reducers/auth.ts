import type { Reducer, Action } from "redux";
import { actionTypes } from "../actions";

interface Payload {
  id: string;
  token: string;
  uid: string;
  type: string;
  firstTime: boolean;
  email: string;
}

export interface AuthState {
  loggedIn: boolean;
  online: boolean;
  pid: string;
  resetData: string;
  id: string;
  token: string;
  //   uid: string;
  type: string;
  firstTime: boolean;
  email: string;
  name: string;
  pending: Boolean;
}

interface ReducerAction extends Action {
  type: actionTypes;
  payload: Payload | any;
}

const init: AuthState = {
  loggedIn: false,
  online: false,
  pid: "",
  resetData: "",
  id: "",
  token: "",
  name: "",
  type: "",
  firstTime: true,
  email: "",
  pending: false,
};

const authReducer: Reducer<AuthState, ReducerAction> = (
  state = init,
  { type, payload },
) => {
  switch (type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        id: payload.id,
        token: payload.token,
        name: payload.name,
        // type: payload.type,
        // firstTime: payload.firstTime,
        email: payload.email,
        pending: true,
      };
    case actionTypes.CONFIRM:
      return {
        ...state,
        loggedIn: true,
      };

    default:
      return state;
  }
};

export default authReducer;
