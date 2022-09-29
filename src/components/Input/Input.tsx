import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLProps } from "react";
import styled, { css } from "styled-components";

import theme from "@/config/styles/theme";

const StyledInput = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <InputContainer>
      <Input {...props} />
      <FontAwesomeIcon icon={faSearch} color={theme.colors.lightGray3} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.pageColor};
  border-radius: 4px;
  margin: 0 40px;
  padding: 0 10px;
  min-width: 300px;
  width: 100%;

  &:hover {
    & > input {
      &::placeholder {
        color: ${({ theme }) => theme.colors.lightGray3};
      }
    }
  }
`;

const Input = styled.input`
  background: transparent;
  outline: none;
  width: 100%;
  /* max-width: 600px; */
`;

export default StyledInput;
