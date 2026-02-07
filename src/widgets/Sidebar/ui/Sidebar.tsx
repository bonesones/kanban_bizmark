import {
  ArrowDownIcon,
  BurgerIcon,
  CheckpointIcon,
  HomeIcon,
  StatsIcon,
} from "@/shared/icons";

import { logo } from "@/assets";

import { FavoriteItem, type FavoriteItemProps } from "./FavoriteItem";
import { NavLink, type NavLinkProps } from "./NavLink";
import { TeamItem, type TeamItemProps } from "./TeamItem";

export const Sidebar = () => {
  return (
    <aside className="w-80">
      <div className="flex justify-between items-center">
        <img src={logo} className="h-9 w-24" alt="logo" />
        <BurgerIcon className="h-3.5 text-lightGray" />
      </div>

      <nav className="mt-7">
        <ul className="text-sm font-medium flex flex-col gap-6">
          {navLinks.map((props, i) => {
            return (
              <li key={i}>
                <NavLink {...props} />
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-7">
        <span className="text-xs font-bold text-lightGray">Избранное</span>

        <ul className="flex flex-col gap-4 mt-2">
          {favorites.map((props, i) => {
            return (
              <li key={i}>
                <FavoriteItem {...props} />
              </li>
            );
          })}
        </ul>

        <button className="text-lightGray flex items-center gap-2 cursor-pointer mt-3">
          <span className="text-xs leading-none">Раскрыть весь список</span>

          <ArrowDownIcon className="h-1" />
        </button>
      </div>

      <div className="mt-5">
        <span className="text-xs font-bold text-lightGray">Команды</span>

        <ul className="flex flex-col gap-3 font-semibold mt-2">
          {teams.map((props, i) => {
            return (
              <li key={i}>
                <TeamItem {...props} />
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

// ----------------- Mock data -----------------

const favorites: FavoriteItemProps[] = [
  {
    title: "Электротовары",
    color: "green",
  },
  {
    title: "Лесхозснаб",
    color: "green",
  },
  {
    title: "Посуда-Сити",
    color: "green",
  },
  {
    title: "Автошкола “Автолицей”",
    color: "blue",
  },
];

const navLinks: NavLinkProps[] = [
  {
    icon: <HomeIcon className="h-4" />,
    text: "Дашборд",
    href: "#",
  },
  {
    icon: <CheckpointIcon className="h-4" />,
    text: "Мои задачи",
    href: "#",
  },
  {
    icon: <StatsIcon className="h-4" />,
    text: "Проекты",
    href: "#",
  },
];

const teams: TeamItemProps[] = [
  {
    title: "Программисты",
  },
  {
    title: "Маркетологи",
  },
  {
    title: "Дизайнеры",
  },
];
