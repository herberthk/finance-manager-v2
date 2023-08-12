import type { Reducer, Action } from "redux";
import { actionTypes } from "../actions";
import { DataArray } from "../interface";

export interface salesState {
  sales: DataArray[];
}
interface ReducerAction extends Action {
  type: actionTypes;
  payload: any;
}

const init: salesState = {
  sales: [],
};

const salesReducer: Reducer<salesState, ReducerAction> = (
  state = init,
  { type, payload },
) => {
  switch (type) {
    case actionTypes.GET_SALES:
      return {
        ...state,
        sales: payload.data,
        // set: true,
      };

    default:
      return state;
  }
};

export default salesReducer;
