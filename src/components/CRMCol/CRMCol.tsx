import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd-next";
import styled, { css } from "styled-components";

import { AddItemComponent, CRMItem } from "@/src/components";

import { ICRMColProps } from "./interfaces";

export default function CRMCol({
  board = null,
  items = null,
  index = null,
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
            <ColTitle {...provided.dragHandleProps}>
              <TitleText
                isDragging={snapshot.isDragging}
                titleColor={board.titleColor}
              >
                {board.title}
              </TitleText>
              <Triangle
                isDragging={snapshot.isDragging}
                titleColor={board.titleColor}
              />
            </ColTitle>
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

                    {snapshot.isDraggingOver && (
                      <ItemSkeleton isDoubleMargin={items.length >= 1} />
                    )}
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

const ItemSkeleton = styled.div<{ isDoubleMargin: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  background: ${({ theme }) => theme.colors.transparentItem};
  opacity: 0.8;
  animation: open 0.2s alternate;
  border-radius: 3px;
  ${({ isDoubleMargin }) =>
    isDoubleMargin &&
    css`
      margin-top: 125px;
    `}

  @keyframes open {
    0% {
      height: 10px;
    }

    100% {
      height: 100px;
    }
  }
`;

const ColTitle = styled.div`
  display: flex;
  position: relative;
  width: calc(100% + 10px);
  height: 30px;
  transition: background-color 0.1s ease-in;
  border-radius: 4px;
`;

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
      /* background: #ffffff22; */
    `}
`;

const Triangle = styled.div<{ isDragging: boolean; titleColor: string }>`
  position: relative;
  width: 10px;
  height: 0;
  border-style: solid;
  border-radius: 0 0 0 0;
  border-width: 15px 10px 15px 10px;
  border-color: transparent transparent transparent
    ${({ titleColor }) => titleColor};
  transition: opacity 0.2s ease-in;
  opacity: ${({ isDragging }) => (isDragging ? 0.8 : 1)};
`;

const TitleText = styled.div<{ isDragging: boolean; titleColor: string }>`
  display: flex;
  align-items: center;
  background-color: ${({ titleColor }) => titleColor};
  transition: opacity 0.2s ease-in;
  opacity: ${({ isDragging }) => (isDragging ? 0.8 : 1)};
  height: 100%;
  padding-left: 10px;
  width: calc(100%);
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
