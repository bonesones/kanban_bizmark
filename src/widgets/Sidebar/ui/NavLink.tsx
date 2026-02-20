import type React from "react";

export const NavLink = ({ icon, text, href }: NavLinkProps) => (
  <a
    href={href}
    className="flex gap-3 items-center text-textMain font-semibold"
  >
    {icon}
    {text}
  </a>
);

export type NavLinkProps = {
  icon: React.ReactNode;
  text: string;
  href: string;
};
