import React from "react";
import styled from "styled-components";

import ButtonWithSelect from "../ButtonWithSelect";
import CRMTable from "../CRMTable";
import Input from "../Input";

export default function CRMWidget() {
  return (
    <WidgetContainer>
      <WidgetHeader>
        <Title>Сделки</Title>
        <HeaderBar>
          <ButtonWithSelect />
          <Input type="white" placeholder="Фильтр + поиск" />
        </HeaderBar>
      </WidgetHeader>
      <CRMTable />
    </WidgetContainer>
  );
}

const WidgetContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  top: 42px;
`;

const WidgetHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  border-bottom: 2px solid ${({ theme }) => theme.colors.pageColor};
  padding: 15px 0;
`;

const HeaderBar = styled.div`
  display: flex;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;
