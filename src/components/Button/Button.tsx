import styled, { css } from "styled-components";
export type ButtonProps = {
  backgroundColor?: string;
  buttonType?: "transparent" | "blue";
  preloaderSize?: number;
  ml?: number;
  mt?: number;
  mr?: number;
  mb?: number;
};

const Button = styled.button<ButtonProps>`
  padding: 5px 15px;
  color: ${({ theme }) => theme.colors.textColor};
  background: ${({ theme }) => theme.colors.lightGreen1};
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 14px;
  margin-left: ${({ ml }) => ml ?? 0}px;
  margin-bottom: ${({ mb }) => mb ?? 0};
  margin-top: ${({ mt }) => mt ?? 0};
  margin-right: ${({ mr }) => mr ?? 0};
  cursor: pointer;
  font-weight: 500;

  ${({ buttonType }) =>
    buttonType === "transparent" &&
    css`
      padding: 0;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textColor};

      &:hover {
        color: ${({ theme }) => theme.colors.lightGray3};
      }
    `}

  ${({ buttonType }) =>
    buttonType === "blue" &&
    css`
      padding: 5px 15px;
      background-color: ${({ theme }) => theme.colors.blue1};
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        background-color: ${({ theme }) => theme.colors.blue1Hover};
      }
    `}
`;

export default Button;
