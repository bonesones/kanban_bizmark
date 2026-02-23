import React from "react";

export const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      width={props.width}
      height={props.height}
      transform="matrix(0 1 -1 0 24 0)"
      fill="white"
    />
    <path
      d="M4.95179 11.7831C4.98354 11.9259 4.98354 12.0741 4.95179 12.2169L3.45576 18.9491C3.2731 19.771 4.12603 20.437 4.87917 20.0604L19.2111 12.8944C19.9482 12.5259 19.9482 11.4741 19.2111 11.1056L4.87916 3.93958C4.12603 3.56301 3.2731 4.22896 3.45576 5.05094L4.95179 11.7831Z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
