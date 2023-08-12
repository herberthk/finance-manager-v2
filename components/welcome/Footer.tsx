import Link from "next/link";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  border-top: 1px solid #fff;
  padding: 20px;
  /* background-color: red; */
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    li {
      a {
        font-size: 1.5rem;
        color: #fff;
        &:hover {
          color: orange;
          text-decoration: underline;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const Footer = (): React.ReactNode => {
  return (
    <Container data-testid="footer">
      <ul>
        <li>
          <Link href="/">Faq</Link>
        </li>
        <li>
          <Link href="/">Terms of Use</Link>
        </li>
        <li>
          <Link href="/">Privacy Notice</Link>
        </li>
        <li>
          <Link href="/">Contact Us</Link>
        </li>
        <li>
          <Link href="/">About Us</Link>
        </li>
      </ul>
    </Container>
  );
};

export default Footer;
