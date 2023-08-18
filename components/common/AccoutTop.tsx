import dayjs from "dayjs";
import type { FC } from "react";
import React from "react";
import styled from "styled-components";

import { useCompanyStore } from "@/zustand";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: teal;
  text-align: center;
  h5 {
    text-transform: uppercase;
  }
  h6 {
    text-transform: capitalize;
    font-size: 1.7rem;
  }
  p {
    font-weight: bold;
    font-size: 1.2;
  }
`;
interface Props {
  account?: string;
}

const AccountTop: FC<Props> = ({ account }) => {
  const company = useCompanyStore((state) => state.company);
  return (
    <Container>
      <h5>{company?.name}</h5>
      <p>
        {company?.location}, {company?.email}
      </p>
      <h6>{account}</h6>
      <p>As of {dayjs().format("DD/MM/YYYY")}</p>
    </Container>
  );
};

export default AccountTop;
