import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd-next";
import styled from "styled-components";

import { useAppDispatch, useSelector } from "@/features/hooks";
import { updateBoards } from "@/features/Redux/slices/boardsSlice";
import { CRMCol } from "@/src/components";

export default function CRMTable() {
  const boards = useSelector((state) => state.boards);

  const dispatch = useAppDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newboardsOrder = [...boards.boardsOrder];

      newboardsOrder.splice(source.index, 1);
      newboardsOrder.splice(destination.index, 0, draggableId);

      dispatch(
        updateBoards({
          ...boards,
          boardsOrder: newboardsOrder,
        })
      );

      return;
    }

    const start = boards.boards.find(
      (board) => board.id === source.droppableId
    );

    const finish = boards.boards.find(
      (board) => board.id === destination.droppableId
    );

    if (start === finish) {
      const newTaskIds = Array.from(start.items);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        items: newTaskIds,
      };

      dispatch(
        updateBoards({
          ...boards,
          boards: boards.boards.map((board) =>
            board.id === newColumn.id ? newColumn : board
          ),
        })
      );

      return;
    }

    const startItems = Array.from(start.items);
    startItems.splice(source.index, 1);

    const newStart = {
      ...start,
      items: startItems,
    };

    const finishItems = Array.from(finish.items);

    finishItems.splice(destination.index, 0, draggableId);

    const newfinish = {
      ...finish,
      items: finishItems,
    };

    dispatch(
      updateBoards({
        ...boards,
        boards: boards.boards.map((board) =>
          board.id === newStart.id
            ? newStart
            : board.id === newfinish.id
            ? newfinish
            : board
        ),
        items: boards.items.map((item) =>
          newfinish.items.some((boardItem) => boardItem === item.id)
            ? { ...item, status: newfinish.type }
            : item
        ),
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-cols" direction="horizontal" type="column">
        {(provided) => (
          <TableContainer {...provided.droppableProps} ref={provided.innerRef}>
            {boards.boardsOrder.map((boardId, index) => {
              const brd = boards.boards.find((board) => board.id === boardId);

              const items = brd.items.map((itemId) => ({
                ...boards.items.find((item) => item.id === itemId),
              }));

              return (
                <CRMCol key={boardId} board={brd} items={items} index={index} />
              );
            })}
            {provided.placeholder}
          </TableContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const TableContainer = styled.div`
  display: flex;
  margin-top: 20px;
  height: 90%;
  overflow-x: auto;
`;
