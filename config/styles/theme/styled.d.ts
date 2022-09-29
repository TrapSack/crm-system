import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      pageColor: string;
      mainColor: string;
      mainColor2: string;
      mainColor3: string;
      mainColor4: string;
      lightGray1: string;
      lightGray2: string;
      lightGray3: string;
      white: string;
      dateGray: string;
      textColor: string;
      transparentItem: string;
      danger: string;
      lightGreen1: string;
      lightGreen1Hover: string;
    };
  }
  export type LightTheme = {
    body: string;
    text: string;
  };
  export type DarkTheme = {
    body: string;
    text: string;
  };
}
