import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import { useAppDispatch, useSelector } from "@/features/hooks";
import { activateNotification } from "@/features/Redux/slices/notificationSlice";

export default function NotificationModal() {
  const { notifications } = useSelector((state) => state.notifications);

  if (!notifications.length) return null;

  return (
    <Modal>
      <ModalConent>
        {notifications.map((note) => (
          <Notification key={note.id} note={note} />
        ))}
      </ModalConent>
    </Modal>
  );
}

const Notification = ({ note }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(activateNotification({ delay: 3000, id: note.id }));
  }, []);

  return (
    <NotificationItem key={note.id} status={note.status}>
      {note?.title && (
        <NotificationTitle status={note.status}>{note.title}</NotificationTitle>
      )}
      {note?.description && (
        <NotificationDescription>{note.description}</NotificationDescription>
      )}
    </NotificationItem>
  );
};

const ModalConent = styled.div`
  display: flex;
  float: right;
  flex-direction: column;
`;

const NotificationItem = styled.div<{ status?: string }>`
  position: relative;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  max-width: 300px;
  animation: slideIn 0.2s alternate;

  @keyframes slideIn {
    0% {
      transform: translateX(200px);
    }

    100% {
      transform: translateX(0);
    }
  }

  ${({ status }) =>
    status === "success" &&
    css`
      background-color: ${({ theme }) => theme.colors.successNotification};
    `}
`;

const Modal = styled.div`
  position: fixed;
  right: 50px;
  z-index: 99999;
  margin-top: 40px;
`;

const NotificationTitle = styled.div<{ status?: string }>`
  font-size: 18px;
  font-weight: bold;
  ${({ status }) =>
    status === "success" &&
    css`
      color: ${({ theme }) => theme.colors.mainColor4};
    `}
`;

const NotificationDescription = styled.div`
  margin-top: 6px;
  font-size: 14px;
  word-spacing: 2px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray3};
`;
