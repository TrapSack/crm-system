import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";

import { DropDownArrow } from "@/assets/svg/arrows";

import { INavbarItem } from "../Navbar/interfaces";

export default function NavbarItem({ item = null }: { item: INavbarItem }) {
  const [isHover, setIshover] = useState(false);

  return (
    <NavbarItemContainer
      onMouseEnter={() => setIshover(true)}
      onMouseLeave={() => setIshover(false)}
    >
      <Link passHref href={item.to}>
        <ItemContainer>
          <ItemText>{item.title}</ItemText>
          {!!item?.subLinks?.length && <DropDownArrow width={15} />}
        </ItemContainer>
      </Link>
      {item?.subLinks && isHover && (
        <NavDropDown>
          {item.subLinks.map((subItem) => (
            <Link key={subItem.title} passHref href={subItem.to}>
              <DropDownItem>{subItem.title}</DropDownItem>
            </Link>
          ))}
        </NavDropDown>
      )}
    </NavbarItemContainer>
  );
}

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: 40px;
  cursor: pointer;
  transform: translateY(2px);

  & svg {
    margin-left: 5px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.pageColor};
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor3};
  }
`;

const ItemText = styled.span`
  font-size: 14px;
`;

const NavDropDown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translateY(42px);
  background: ${({ theme }) => theme.colors.pageColor};
  border-radius: 6px;
  box-shadow: 0px 5px 10px -1px rgba(34, 60, 80, 0.2);
`;

const DropDownItem = styled.div`
  padding: 5px 20px;
  cursor: pointer;

  font-size: 15px;

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray2};
  }
`;

const NavbarItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
