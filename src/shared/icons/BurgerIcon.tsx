import React from "react";

export const BurgerIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2_336)">
        <rect width="20" height="2" fill="currentColor" />
        <rect y="6" width="20" height="2" fill="currentColor" />
        <rect y="12" width="20" height="2" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_2_336">
          <rect width="20" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
