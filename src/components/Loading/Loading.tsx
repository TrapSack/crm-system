import React from "react";
import styled from "styled-components";

export default function Loading() {
  return (
    <LoadingContainer>
      <Rotate>
        <LoadingPart id="block-1" />
        <LoadingPart id="block-2" />
        <LoadingPart id="block-3" />
        <LoadingPart id="block-4" />
      </Rotate>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LoadingPart = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border-radius: 50%;
  animation: fadeInOut 2s infinite;

  &#block-2 {
    animation-delay: 0.5s;
  }

  &#block-3 {
    animation-delay: 0.5s;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 1;
      transform: scale(0.5);
    }

    50% {
      transform: scale(1);
    }

    100% {
      opacity: 0.4;
      transform: scale(0.5);
    }
  }
`;

const Rotate = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  animation: rotate 2s infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
