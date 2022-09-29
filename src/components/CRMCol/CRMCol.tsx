import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd-next";
import styled, { css } from "styled-components";

import { CRMItem } from "@/src/components";

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
                  {snapshot.isDraggingOver && <ItemSceleton>+</ItemSceleton>}
                  {provided.placeholder}
                </ItemsContainer>
              )}
            </Droppable>
          </ColContainer>
        );
      }}
    </Draggable>
  );
}

const ItemSceleton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 36px;
  font-weight: bold;
  width: 100%;
  height: 100px;
  background: ${({ theme }) => theme.colors.transparentItem};
  opacity: 0.8;
  animation: open 0.2s alternate;
  border-radius: 3px;

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
  /* width: 250px; */
  min-width: 250px;
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
