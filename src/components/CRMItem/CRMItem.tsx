import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd-next";
import styled, { css, keyframes } from "styled-components";

import { getDate } from "@/features/helpers/getDate";
import { IDeal } from "@/models/single-deal";

import DealInfoModal from "../DealInfoModal";

const CRMItemMemo = ({
  item,
  index,
  color,
}: {
  item: IDeal;
  index: number;
  color: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => {
          if (snapshot.isDragging) setShowModal(false);

          return (
            <ColItemContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              onClick={() => setShowModal(!showModal)}
              color={color}
              style={{
                ...provided.draggableProps.style,
                transitionDuration: `0.001s`,
              }}
            >
              <div>
                <ItemName>{item.name}</ItemName>
                <UpperContainer>
                  <PriceContainer>
                    {item.price} {item.currency}
                  </PriceContainer>
                </UpperContainer>
                <DateContainer>{getDate(item.date)}</DateContainer>
              </div>
            </ColItemContainer>
          );
        }}
      </Draggable>
      <DealInfoModal
        currency={item.currency}
        customers={item.client}
        id={item.id}
        price={item.price}
        show={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};
const ColItem = React.memo(CRMItemMemo);

export default ColItem;

const ColItemContainer = styled.div<{ isDragging: boolean; color: string }>`
  margin: 10px 0;
  width: 100%;
  padding: 10px;
  border-left: 5px solid ${({ color }) => color};
  border-radius: 3px;
  background: ${({ theme, isDragging }) =>
    isDragging ? theme.colors.pageColor : theme.colors.transparentItem};
  cursor: default !important;

  &:hover {
    transition: 100ms ease-in;
    background: ${({ theme }) => theme.colors.pageColor};
  }

  ${({ isDragging }) =>
    isDragging &&
    css`
      margin: 0;
    `}

  &:first-child {
    margin-top: 0;
  }
`;

const UpperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const PriceContainer = styled.div`
  color: ${({ theme }) => theme.colors.mainColor4};
  font-weight: 500;
`;

const DateContainer = styled.div`
  color: ${({ theme }) => theme.colors.dateGray};
  font-size: 12px;
`;
