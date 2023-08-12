import axios from "axios";
import M from "materialize-css";
import React, { useState } from "react";

import { actionTypes } from "@/redux/actions";
import { useThunkDispatch, useTypedSelector } from "@/redux/stateTypes";
import type { CompanyResponse } from "@/types";
import { numberWithCommas } from "@/utils/helpers";
import { useCompanyStore } from "@/zustand/store";

import { Collapsible } from "../common/comps";

const Preview = (): React.ReactNode => {
  const prevStep = useCompanyStore((state) => state.prevStep);
  const resetData = useCompanyStore((state) => state.resetCompanyData);
  const fb = useCompanyStore((state) => state.facebook);
  const twt = useCompanyStore((state) => state.twitter);
  const yt = useCompanyStore((state) => state.youtube);
  const cashBal = useCompanyStore((state) => state.cashBalance);
  const bankBal = useCompanyStore((state) => state.bankBalance);
  const email = useCompanyStore((state) => state.email);
  const location = useCompanyStore((state) => state.location);
  const tel = useCompanyStore((state) => state.telephone);
  const name = useCompanyStore((state) => state.name);
  const desc = useCompanyStore((state) => state.description);
  const account = useCompanyStore((state) => state.accountNumber);
  const dispatch = useThunkDispatch();
  const { token } = useTypedSelector((state) => state.auth);
  axios.defaults.headers.common["Authorization"] = token;
  const [loading, setLoading] = useState(false);

  const wizardDirection = useCompanyStore((state) => state.wizardDirection);
  const setWizardDirection = useCompanyStore(
    (state) => state.setWizardDirection,
  );
  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/company/create", {
        name,
        email,
        location,
        desc,
        fb,
        yt,
        twt,
        tel,
        bank: account,
        bankBal,
        cashBal,
      });
      const { success, error, data } = res.data as CompanyResponse;
      setLoading(false);
      if (success) {
        M.toast({ html: error, classes: "rounded red" });
      } else {
        dispatch({
          type: actionTypes.CREATE_COMPANY,
          payload: { data },
        });
        resetData();
        M.toast({ html: "Success", classes: "rounded green" });
        // M.toast({ html: 'Account created', classes: 'rounded green' });
      }
    } catch (error) {
      M.toast({ html: "Network error", classes: "rounded red" });
      setLoading(false);
    }
  };
  const back = () => {
    if (wizardDirection !== "previous") {
      setWizardDirection("previous");
    }
    prevStep();
  };
  return (
    <>
      <ul className="collection">
        <li className="collection-item collection_item_overide">
          <Collapsible>
            <div>
              <i className="fas fa-2x fa-address-card teal-text"></i>
            </div>
            <div>{name}</div>
          </Collapsible>
        </li>
        <li className="collection-item collection_item_overide">
          <Collapsible>
            <div>
              <i className="material-icons teal-text">info_outline</i>
            </div>
            <div>{desc}</div>
          </Collapsible>
        </li>
        {account && (
          <li className="collection-item collection_item_overide">
            <Collapsible>
              <div>
                <i className="material-icons teal-text">account_balance</i>
              </div>
              <div>{account}</div>
            </Collapsible>
          </li>
        )}
        {tel && (
          <li className="collection-item collection_item_overide">
            <Collapsible>
              <div>
                <i className="material-icons teal-text">phone</i>
              </div>
              <div>{tel}</div>
            </Collapsible>
          </li>
        )}
        <li className="collection-item collection_item_overide">
          <Collapsible>
            <div>
              <i className="material-icons teal-text">email</i>
            </div>
            <div>{email}</div>
          </Collapsible>
        </li>
        {bankBal && (
          <li className="collection-item collection_item_overide">
            <Collapsible>
              <div>
                <i className="material-icons teal-text">attach_money</i>
              </div>
              <div>{numberWithCommas(+bankBal)}</div>
            </Collapsible>
          </li>
        )}
        {cashBal && (
          <li className="collection-item collection_item_overide">
            <Collapsible>
              <div>
                <i className="material-icons teal-text">attach_money</i>
              </div>
              <div>{numberWithCommas(+cashBal)}</div>
            </Collapsible>
          </li>
        )}
        {location && (
          <li className="collection-item collection_item_overide">
            <Collapsible>
              <div>
                <i className="material-icons teal-text">location_on</i>
              </div>
              <div>{location}</div>
            </Collapsible>
          </li>
        )}
        {fb && (
          <li className="collection-item collection_item_overide">
            <Collapsible>
              <div>
                <i className="fab fa-2x fa-facebook teal-text"></i>
              </div>
              <div>{fb}</div>
            </Collapsible>
          </li>
        )}
        {twt && (
          <li className="collection-item collection_item_overide">
            <Collapsible>
              <div>
                <i className="fab fa-2x fa-twitter teal-text"></i>
              </div>
              <div>{twt}</div>
            </Collapsible>
          </li>
        )}
        {yt && (
          <li className="collection-item collection_item_overide">
            <Collapsible>
              <div>
                <i className="fab fa-2x fa-youtube teal-text"></i>
              </div>
              <div>{yt}</div>
            </Collapsible>
          </li>
        )}
      </ul>
      <button onClick={back} className="btn white black-text shadow">
        <b>Back</b>
        <i className="material-icons left">navigate_before</i>
      </button>
      {!loading ? (
        <button onClick={submit} className="btn white black-text shadow right">
          <b>SEND</b>
          <i className="material-icons right">send</i>
        </button>
      ) : (
        <button className="btn white black-text shadow right">
          <b>Please wait</b>
          {/* <i className="material-icons right">send</i> */}
        </button>
      )}
    </>
  );
};

export default Preview;
