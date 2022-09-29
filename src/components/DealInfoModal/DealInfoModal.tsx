import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { keyframes } from "styled-components";

export default function DealInfoModal({
  price = null,
  currency = null,
  id = null,
  customers = null,
  show = false,
  setShowModal = null,
}) {
  if (!show) return null;

  return (
    <OutsideClickHandler onOutsideClick={() => setShowModal(false)}>
      <ModalContainer>
        <ModalHeader>Deal Information</ModalHeader>
        <InfoContainer>
          <span>Price:</span>
          <span>{price}</span>
        </InfoContainer>
        <InfoContainer>
          <span>Currency:</span>
          <span>{currency}</span>
        </InfoContainer>
        <InfoContainer>
          <span>Customers</span>
          <div>
            {customers?.map((customer) => (
              <div key={customer.id}>Sasha</div>
            ))}
          </div>
        </InfoContainer>
        <ChangeInfoButton>Change Info {"----->"}</ChangeInfoButton>
      </ModalContainer>
    </OutsideClickHandler>
  );
}

const showItemKeyframe = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.lightGray1};
  width: 250px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray3};
  transform: translate(calc(95%), calc(-40%));
  z-index: 1000;
  animation: ${showItemKeyframe} 0.2s alternate;

  &:after,
  &:before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(136, 183, 213, 0);
    border-right-color: ${({ theme }) => theme.colors.lightGray1};
    border-width: 7px;
    margin-top: -47px;
  }

  &:before {
    border-color: rgba(194, 225, 245, 0);
    border-right-color: ${({ theme }) => theme.colors.lightGray3};
    border-width: 8px;
    margin-top: -48px;
  }
`;

const ModalHeader = styled.div`
  color: ${({ theme }) => theme.colors.lightGray3};
  font-weight: 500;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textColor};
  margin: 7px 0;
`;

const ChangeInfoButton = styled.div`
  float: right;
  color: ${({ theme }) => theme.colors.textColor};
`;
