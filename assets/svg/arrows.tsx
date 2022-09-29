import { SVGProps } from "react";

export const DropDownArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M16.5 8.49v2.25L12 15.51l-4.5-4.77V8.49h9z"
      fill="currentColor"
    ></path>
  </svg>
);
