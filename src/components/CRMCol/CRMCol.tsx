import React, { memo, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd-next";
import styled, { css } from "styled-components";

import { AddItemComponent, CRMItem } from "@/src/components";

import ColumnTitle from "./components/ColumnTitle";
import { ICRMColProps } from "./interfaces";

function CRMColMemo({
  board = null,
  items = null,
  index = null,
  onChangeColTitle = null,
  addNewBoard = null,
  onRemoveCol = null,
}: ICRMColProps) {
  return (
    <Draggable draggableId={board.id} index={index}>
      {(provided, snapshot) => {
        return (
          <ColContainer
            className="container"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <ColumnTitle
              addNewBoard={addNewBoard}
              board={board}
              provided={provided}
              snapshot={snapshot}
              onChangeColTitle={onChangeColTitle}
              onRemoveCol={onRemoveCol}
            />
            <TotalPrice>
              {items.reduce((acc, item) => acc + item.price, 0)} BYN
            </TotalPrice>

            <MainContainer>
              <AddItemContainer boardType={board.type} />

              <Droppable droppableId={board.id} type="task">
                {(provided, snapshot) => (
                  <ItemsContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {!!items?.length &&
                      items.map((item, index) => (
                        <CRMItem
                          item={item}
                          key={item.id}
                          index={index}
                          color={board.titleColor}
                        />
                      ))}
                    {provided.placeholder}
                  </ItemsContainer>
                )}
              </Droppable>
            </MainContainer>
          </ColContainer>
        );
      }}
    </Draggable>
  );
}

const CrmCol = memo(CRMColMemo);

export default CrmCol;

const AddItemContainer = ({ boardType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddItemButton
        className="add-button"
        onClick={() => setIsOpen(true)}
        isOpen={isOpen}
      >
        +
      </AddItemButton>
      <AddItemComponent
        boardType={boardType}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  max-width: 350px;
  height: 100%;
  margin-right: 2px;
`;

const ItemsContainer = styled.div<{ isDraggingOver: boolean }>`
  flex-grow: 1;
  padding-right: 5px;
  border-left: 1px dashed ${({ theme }) => theme.colors.textColor};
  width: 100%;
  ${({ isDraggingOver }) =>
    isDraggingOver &&
    css`
      background: #ffffff22;
    `}
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.pageColor};
`;

const AddItemButton = styled.div<{ isOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: ${({ theme, isOpen }) =>
    isOpen ? theme.colors.blue1 : theme.colors.transparentItem};
  opacity: 0.8;
  height: 30px;
  width: 95%;
  color: ${({ theme }) => theme.colors.white};
  transition: 0.1s ease-in;
  cursor: pointer;
`;

const MainContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;

  &:hover {
    & > .add-button {
      opacity: 1;
    }
  }
`;
