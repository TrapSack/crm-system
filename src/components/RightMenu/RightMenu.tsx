import disableScroll from "disable-scroll";
import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import styled, { keyframes } from "styled-components";

/**
 * @param showRightMenu - "open" | "hide" | ""
 */
export default function RightMenu({
  showRightMenu,
  setShowRightMenu,
  children,
}: {
  showRightMenu: string;
  children?: ReactNode[];
  setShowRightMenu: Dispatch<SetStateAction<string>>;
}) {
  useEffect(() => {
    if (showRightMenu === "open") {
      disableScroll.on();
      return () => null;
    }
    disableScroll.off();
    return () => null;
  }, [showRightMenu]);

  if (!showRightMenu) return null;

  return (
    <>
      {showRightMenu === "open" && (
        <OuterClickContainer
          onClick={() => setShowRightMenu("hide")}
        ></OuterClickContainer>
      )}
      <RightMenuContainer className={showRightMenu}>
        <ContentWrapper>{children}</ContentWrapper>
      </RightMenuContainer>
    </>
  );
}

const showRightMenuFrame = keyframes`
    from {
        transform: translateX(300px);
    }

    to {
        transform: translateX(0);
    }
`;

const hideRightMenuFrame = keyframes`
    from {
        display: block;
        transform: translateX(0);
    }
    to {
        transform: translateX(310px);
    }
`;

const RightMenuContainer = styled.div`
  position: fixed;
  right: 0;
  width: 300px;
  height: 100%;
  background: ${({ theme }) => theme.colors.pageColor};
  border-left: 3px solid ${({ theme }) => theme.colors.mainColor2};
  box-shadow: -9px 0px 8px 0px rgba(34, 60, 80, 0.2);

  &.open {
    animation: ${showRightMenuFrame} 1s alternate;
  }

  &.hide {
    transform: translateX(310px);
    animation: ${hideRightMenuFrame} 1s alternate;
  }
`;

const OuterClickContainer = styled.div`
  position: fixed;
  height: 100%;
  width: calc(100% - 300px);
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  margin-top: 42px;
`;
