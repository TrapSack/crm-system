import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function SiteLogo() {
  return (
    <LogoContainer>
      <Link href="/">Site Name</Link>
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  width: 100px;
`;
