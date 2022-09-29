import { useMemo } from "react";
import styled from "styled-components";

import { INavbarItem } from "./interfaces";

import { NavbarItem, SiteLogo } from "@Components";

export default function Navbar() {
  const navbarItems: INavbarItem[] = useMemo(
    () => [
      {
        title: "FAQ",
        to: "/faq",
      },
      {
        title: "Security",
        to: "/security",
      },
      {
        title: "Institutions",
        to: "/institutions",
        subLinks: [
          {
            title: "Very long world",
            to: "/123",
          },
          {
            title: "Helddlo",
            to: "/123",
          },
          {
            title: "Helsslo",
            to: "/123",
          },
        ],
      },
      {
        title: "Developers",
        to: "/developers",
      },
      {
        title: "Docs",
        to: "/docs",
        subLinks: [
          {
            title: "Hellssssso",
            to: "/123",
          },
          {
            title: "He2llo",
            to: "/123",
          },
          {
            title: "Hell6yo",
            to: "/123",
          },
        ],
      },
    ],
    []
  );

  return (
    <Nav>
      <SiteLogo />
      <ItemsContainer>
        {navbarItems.map((item) => (
          <NavbarItem key={item.title} item={item} />
        ))}
      </ItemsContainer>
      <SideButtonsContainer>
        <SideButton>Buy crypto</SideButton>
        <SideButton>Buy crypto</SideButton>
      </SideButtonsContainer>
    </Nav>
  );
}

const Nav = styled.nav`
  position: relative;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  width: 100%;
  background: ${({ theme }) => theme.colors.pageColor};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
`;

const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10%;
`;

const SideButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10%;
`;

const SideButton = styled.div`
  padding: 0 10px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.mainColor2};
  color: ${({ theme }) => theme.colors.mainColor2};
  font-size: 16px;
  font-weight: bold;
  margin: 0 15px;
  white-space: nowrap;
`;
