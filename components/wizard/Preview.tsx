import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import M from "materialize-css";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import React, { useState } from "react";

import type { Database } from "@/types";
import {
  manageLand,
  manageMachine,
  manageOpeningBalance,
  manageVehicle,
  numberWithCommas,
} from "@/utils";
import { useCreateCompanyStore } from "@/zustand";

import { Collapsible } from "../common/comps";

interface Props {
  user: Database["public"]["Tables"]["users"]["Row"];
}

const Preview: FC<Props> = ({ user }) => {
  const prevStep = useCreateCompanyStore((state) => state.prevStep);
  const resetData = useCreateCompanyStore((state) => state.resetProgressData);
  const fb = useCreateCompanyStore((state) => state.facebook);
  const twt = useCreateCompanyStore((state) => state.twitter);
  const yt = useCreateCompanyStore((state) => state.youtube);
  const cashBal = useCreateCompanyStore((state) => state.cashBalance);
  const bankBal = useCreateCompanyStore((state) => state.bankBalance);
  const email = useCreateCompanyStore((state) => state.email);
  const location = useCreateCompanyStore((state) => state.location);
  const tel = useCreateCompanyStore((state) => state.telephone);
  const name = useCreateCompanyStore((state) => state.name);
  const desc = useCreateCompanyStore((state) => state.description);
  const account = useCreateCompanyStore((state) => state.accountNumber);
  const assets = useCreateCompanyStore((state) => state.assets);
  const landValue = useCreateCompanyStore((state) => state.landValue);
  const machineValue = useCreateCompanyStore((state) => state.machineValue);
  const vehicleValue = useCreateCompanyStore((state) => state.vehicleValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const wizardDirection = useCreateCompanyStore(
    (state) => state.wizardDirection,
  );
  const setWizardDirection = useCreateCompanyStore(
    (state) => state.setWizardDirection,
  );
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const socialLinks = {
    facebook: fb ?? null,
    twitter: twt ?? null,
    youtube: yt ?? null,
  };
  const submit = async (): Promise<void> => {
    setLoading(true);
    try {
      const employeeIds = [user.user_id];
      const { data: companyData, error } = await supabase
        .from("company")
        .insert([
          {
            name,
            description: desc,
            account_number: account,
            phone: tel,
            email,
            location,
            assets: [...assets],
            employee_ids: [...employeeIds],
            social_links: { ...socialLinks },
          },
        ])
        .select("id")
        .single();
      if (error) {
        M.toast({ html: error.message, classes: "rounded red" });
      } else {
        // Insert transaction related to land
        const { errors: err1 } = await manageLand({
          assets,
          companyId: companyData.id,
          landValue,
        });
        err1 && setErrors((prev) => [...prev, ...err1]);

        // Insert transaction related to machine
        const { errors: err2 } = await manageMachine({
          assets,
          companyId: companyData.id,
          machineValue,
        });
        err2 && setErrors((prev) => [...prev, ...err2]);

        // Insert transaction related to machine
        const { errors: err3 } = await manageVehicle({
          assets,
          companyId: companyData.id,
          vehicleValue,
        });
        err3 && setErrors((prev) => [...prev, ...err3]);

        // Insert opening cash and bank balances if available
        const { errors: err4 } = await manageOpeningBalance({
          bankBalance: bankBal,
          cashBalance: cashBal,
          companyId: companyData.id,
        });
        err4 && setErrors((prev) => [...prev, ...err4]);

        setLoading(false);

        // Check if there is any captured error in the process above
        if (errors.length > 0) {
          errors.forEach((err) =>
            M.toast({ html: err, classes: "rounded red" }),
          );
          return;
        }

        M.toast({ html: "Success", classes: "rounded green" });
        M.toast({ html: "Company created", classes: "rounded green" });
        router.refresh();
        // console.log("success company created");
        resetData();
      }
    } catch (error) {
      M.toast({ html: "Network error", classes: "rounded red" });
      setLoading(false);
    } finally {
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
