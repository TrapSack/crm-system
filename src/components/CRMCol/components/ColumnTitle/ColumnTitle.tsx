import {
  faCircleArrowRight,
  faMinus,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

export default function ColumnTitle({
  provided,
  snapshot,
  board,
  addNewBoard,
  onChangeColTitle,
  onRemoveCol,
}) {
  const [showRenameColTitle, setShowRenameColTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);

  return (
    <ColTitle {...provided.dragHandleProps}>
      <TitleTextContainer
        isDragging={snapshot.isDragging}
        titleColor={board.titleColor}
      >
        {!showRenameColTitle ? (
          <TitleText onClick={() => setShowRenameColTitle(true)}>
            {board.title}
            <FontAwesomeIcon icon={faPen} />
          </TitleText>
        ) : (
          <TitleChangeForm
            onSubmit={(e) => {
              e.preventDefault();

              if (newTitle.trim()) {
                onChangeColTitle(board.id, newTitle);
              } else {
                setNewTitle(board.title);
              }

              setShowRenameColTitle(false);
            }}
          >
            <TitleChangeInput
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={() => setShowRenameColTitle(false)}
            />
            <button>
              <FontAwesomeIcon icon={faCircleArrowRight} />
            </button>
          </TitleChangeForm>
        )}
      </TitleTextContainer>
      <Triangle isDragging={snapshot.isDragging} titleColor={board.titleColor}>
        <TriangleBadge onClick={() => addNewBoard(board.id)}>
          <FontAwesomeIcon icon={faPlus} />
        </TriangleBadge>
        <TriangleBadge onClick={() => onRemoveCol(board)}>
          <FontAwesomeIcon icon={faMinus} />
        </TriangleBadge>
      </Triangle>
    </ColTitle>
  );
}

const ColTitle = styled.div`
  display: flex;
  position: relative;
  width: calc(100% + 10px);
  height: 30px;
  transition: background-color 0.1s ease-in;
  border-radius: 4px;
  cursor: default !important;
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

const TitleTextContainer = styled.div<{
  isDragging: boolean;
  titleColor: string;
}>`
  display: flex;
  align-items: center;
  background-color: ${({ titleColor }) => titleColor};
  transition: opacity 0.2s ease-in;
  opacity: ${({ isDragging }) => (isDragging ? 0.8 : 1)};
  height: 100%;
  padding-left: 10px;
  width: calc(100%);
`;

const TriangleBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  background: #fff;
  opacity: 0.7;
  font-weight: bold;
  height: 15px;
  width: 15px;
  cursor: pointer;
  transition: transform 0.2s ease;

  svg {
    height: 10px;
  }

  &:hover {
    opacity: 1;
    transition: opacity 0.2s ease;
  }

  &:first-child {
    transform: translate(-13px, -15px);
    &:hover {
      transform: scale(1.3) translate(-11px, -10px);
    }
  }
  &:last-child {
    transform: translateX(-13px);
    &:hover {
      transform: scale(1.3) translate(-11px, -2px);
    }
  }

  @keyframes scalePlus {
    100% {
      transform: translate(-19px, -15px);
      height: 21px;
      width: 21px;
    }
  }
`;

const TitleChangeInput = styled.input`
  padding-left: 10px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};
  margin-right: 15px;
`;

const TitleText = styled.span`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  svg {
    opacity: 0;
    margin-left: 10px;
    height: 10px;
  }

  &:hover {
    svg {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }
`;

const TitleChangeForm = styled.form`
  width: 80%;

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }

    svg {
      color: ${({ theme }) => theme.colors.textColor};
    }
  }
`;
