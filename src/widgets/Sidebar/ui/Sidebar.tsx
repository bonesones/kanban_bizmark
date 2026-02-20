import {
  FavoriteItem,
  type FavoriteItemProps,
} from "@/widgets/Sidebar/ui/FavoriteItem";
import { NavLink, type NavLinkProps } from "@/widgets/Sidebar/ui/NavLink";
import { TeamItem, type TeamItemProps } from "@/widgets/Sidebar/ui/TeamItem";

import {
  ArrowDownIcon,
  BurgerIcon,
  CheckpointIcon,
  HomeIcon,
  StatsIcon,
} from "@/shared/icons";

import { logo } from "@/assets";

export const Sidebar = () => (
  <aside className="w-72">
    <div className="flex justify-between items-center">
      <img src={logo} className="h-9 w-24" alt="logo" />

      <button type="button" className="cursor-pointer">
        <BurgerIcon className="h-3.5 text-lightGray" />
      </button>
    </div>

    <nav className="mt-7">
      <ul className="text-sm font-medium flex flex-col gap-6">
        {navLinks.map((props, i) => (
          <li key={i}>
            <NavLink {...props} />
          </li>
        ))}
      </ul>
    </nav>

    <div className="mt-7">
      <span className="text-xs font-bold text-lightGray">Избранное</span>

      <ul className="flex flex-col gap-4 mt-2">
        {favorites.map((props, i) => (
          <li key={i}>
            <FavoriteItem {...props} />
          </li>
        ))}
      </ul>

      <button className="text-lightGray flex items-center gap-2 cursor-pointer mt-3">
        <span className="text-xs leading-none">Раскрыть весь список</span>
        <ArrowDownIcon className="h-1" />
      </button>
    </div>

    <div className="mt-5">
      <span className="text-xs font-bold text-lightGray">Команды</span>

      <ul className="flex flex-col gap-4 font-semibold mt-2">
        {teams.map((props, i) => (
          <li key={i}>
            <TeamItem {...props} />
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

// ----------------- Mock data -----------------

const favorites = [
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
] satisfies FavoriteItemProps[];

const navLinks = [
  {
    icon: <HomeIcon className="h-4" />,
    text: "Дашборд",
    href: "#",
  },
  {
    icon: <CheckpointIcon className="h-4 fill-none" />,
    text: "Мои задачи",
    href: "#",
  },
  {
    icon: <StatsIcon className="h-4" />,
    text: "Проекты",
    href: "#",
  },
] satisfies NavLinkProps[];

const teams = [
  {
    title: "Программисты",
  },
  {
    title: "Маркетологи",
  },
  {
    title: "Дизайнеры",
  },
] satisfies TeamItemProps[];
