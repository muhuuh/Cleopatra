import { NavLink } from "react-router-dom";
import HomeIcon from "./UI/Icons/HomeIcon";
import Magnifier from "./UI/Icons/MagnifierIcon";
import UserIcon from "./UI/Icons/UserIcon";
import ShareIcon from "./UI/Icons/ShareIcon";
import MenuIcon from "./UI/Icons/MenuIcon";

const Footer = () => {
  //TODO change to NavLink links
  return (
    <div className="flex flex-row justify-between gap-x-6 fixed bottom-0 left-0 right-0 bg-gray-200 py-6 px-12">
      <NavLink
        to="/main_landing_page"
        activeClassName="underline"
        className="text-xl hover:underline hover:scale-110"
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        to="/lists/create"
        activeClassName="underline"
        className="text-xl hover:underline hover:scale-110"
      >
        <Magnifier />
      </NavLink>
      <NavLink
        to="/main_landing_page"
        activeClassName="underline"
        className="text-xl hover:underline hover:scale-110"
      >
        <MenuIcon />
      </NavLink>
      <NavLink
        to="/my_profil"
        className="text-xl hover:underline hover:scale-110"
      >
        <UserIcon />
      </NavLink>
      <NavLink to="/signup" className="text-xl hover:underline hover:scale-110">
        <ShareIcon />
      </NavLink>
    </div>
  );
};

export default Footer;
