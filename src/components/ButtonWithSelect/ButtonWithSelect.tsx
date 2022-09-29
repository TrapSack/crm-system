import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

export default function ButtonWithSelect() {
  return (
    <Container>
      <LeftContent>
        <FontAwesomeIcon icon={faPlus} />

        <span>Добавить</span>
      </LeftContent>
      <RightContent />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  width: 170px;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray1};
  background: ${({ theme }) => theme.colors.lightGreen1};
  padding: 5px 10px 5px 10px;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  &:hover {
    transition: 200ms ease;
    background: ${({ theme }) => theme.colors.lightGreen1Hover};
  }
`;

const RightContent = styled.div`
  background: ${({ theme }) => theme.colors.lightGreen1};
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  &:hover {
    transition: 200ms ease;
    background: ${({ theme }) => theme.colors.lightGreen1Hover};
  }
`;
