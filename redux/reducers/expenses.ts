import { Reducer, Action } from 'redux';
import { actionTypes } from '../actions';
import { DataArray } from '../interface';

export interface expenseState {
  expenses: DataArray[];
}
interface ReducerAction extends Action {
  type: actionTypes;
  payload: any;
}

const init: expenseState = {
  expenses: [],
};

const expenseReducer: Reducer<expenseState, ReducerAction> = (
  state = init,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GET_EXPENSES:
      return {
        ...state,
        expenses: payload.data,
        // set: true,
      };

    default:
      return state;
  }
};

export default expenseReducer;
