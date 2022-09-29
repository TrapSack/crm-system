import styled from "styled-components";
export type ButtonProps = {
  backgroundColor?: string;
  buttonType?: "transparent";
  preloaderSize?: number;
};

const Button = styled.button<ButtonProps>`
  padding: 5px 15px;
  color: ${({ theme }) => theme.colors.textColor};
  background: ${({ theme }) => theme.colors.lightGreen1};
  border: none;
`;

export default Button;
