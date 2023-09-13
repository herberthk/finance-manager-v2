"use client";
import { motion } from "framer-motion";
import M from "materialize-css";
import React, { useLayoutEffect } from "react";

import { useCompanyStore } from "@/store";
import { routeVariants } from "@/utils";

import { Collapsible } from "../common/comps";

const About = (): React.ReactNode => {
  useLayoutEffect(() => {
    M.AutoInit();
  }, []);

  const company = useCompanyStore((state) => state.company);
  // const facebook = Object.values(company?.social_links)
  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={routeVariants}>
      <ul className="collapsible popout" data-collapsible="accordion">
        <li>
          <div className="collapsible-header black-text">
            <i className="fas fa-address-card"></i>
            {company?.name.toUpperCase()} BASIC INFORMATION
          </div>
          <div className="collapsible-body black-text collapsible_overide">
            <Collapsible>
              <div>
                <i className="material-icons">info</i>
              </div>
              <div>{company?.description}</div>
            </Collapsible>
            {company?.account_number ? (
              <Collapsible>
                <div>
                  <i className="material-icons">account_balance</i>
                </div>
                <div>{company.account_number}</div>
              </Collapsible>
            ) : null}
          </div>
        </li>
        <li>
          <div className="collapsible-header black-text">
            <i className="material-icons prefix">contact_mail</i>
            CONTACT INFORMATION
          </div>
          <div className="collapsible-body black-text collapsible_overide">
            {company?.phone ? (
              <Collapsible>
                <div>
                  <i className="material-icons">phone</i>
                </div>
                <div>{company?.phone}</div>
              </Collapsible>
            ) : null}

            <Collapsible>
              <div>
                <i className="material-icons">drafts</i>
              </div>
              <div>{company?.email}</div>
            </Collapsible>
            {location ? (
              <Collapsible>
                <div>
                  <i className="material-icons">location_on</i>
                </div>
                <div>{company?.location}</div>
              </Collapsible>
            ) : null}
          </div>
        </li>
        <li>
          <div className="collapsible-header black-text">
            <i className="material-icons">forum</i>SOCIAL MEDIA CONTACTS
          </div>
          <div className="collapsible-body black-text collapsible_overide">
            {/* {!Object.values(company?.social_links) && <p>Nothing Provided</p>} */}
            {/* {company ? (
              <Collapsible>
                <div>
                  <i className="fab fa-facebook"></i>
                </div>
                <div>{fb}</div>
              </Collapsible>
            ) : null}
            {twt ? (
              <Collapsible>
                <div>
                  <i className="fab fa-twitter"></i>
                </div>
                <div>{twt}</div>
              </Collapsible>
            ) : null}
            {yt ? (
              <Collapsible>
                <div>
                  <i className="fab fa-youtube"></i>
                </div>
                <div>{yt}</div>
              </Collapsible>
            ) : null} */}
          </div>
        </li>
      </ul>
    </motion.div>
  );
};

export default About;
