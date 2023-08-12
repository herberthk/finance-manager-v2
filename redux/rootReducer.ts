import localforage from "localforage";
import { combineReducers } from "redux";

import { actionTypes } from "./actions";
import authReducer from "./reducers/auth";
import bankReducer from "./reducers/bank";
import capitalReducer from "./reducers/capital";
import cashReducer from "./reducers/cash";
import cashbookReducer from "./reducers/cashbook";
import companyReducer from "./reducers/companyReducer";
import expenseReducer from "./reducers/expenses";
import transactionReducer from "./reducers/journal";
import landReducer from "./reducers/land";
import machineReducer from "./reducers/machine";
import routeReducer from "./reducers/routes";
import salesReducer from "./reducers/sales";
import stockReducer from "./reducers/stock";
import vehicleReducer from "./reducers/vehicle";

const appReducer = combineReducers({
  routes: routeReducer,
  auth: authReducer,
  companies: companyReducer,
  journal: transactionReducer,
  cash: cashReducer,
  bank: bankReducer,
  capital: capitalReducer,
  land: landReducer,
  sales: salesReducer,
  expenses: expenseReducer,
  stock: stockReducer,
  cashbook: cashbookReducer,
  machine: machineReducer,
  vehicle: vehicleReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === actionTypes.USER_LOGOUT) {
    state = undefined;
    localforage.clear();
  }

  return appReducer(state, action);
};

export default rootReducer;
