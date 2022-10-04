import React from "react";
import styled from "styled-components";

import WallPaper from "@/assets/images/wall.webp";
import { CRMWidget } from "@/src/components";

export default function KanBanPage() {
  const pageStyle = {
    backgroundImage: `url(${WallPaper.src})`,
  };

  return (
    <PageContainer style={pageStyle}>
      <CRMWidget />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-size: cover;
  height: 100vh;
`;
