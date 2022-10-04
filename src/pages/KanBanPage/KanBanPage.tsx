import React from "react";
import styled from "styled-components";

import { CRMWidget } from "@/src/components";

export default function KanBanPage() {
  return (
    <PageContainer>
      <CRMWidget />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: #5888b3;
  height: 100vh;
`;
