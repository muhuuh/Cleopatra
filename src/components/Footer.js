import { NavLink } from "react-router-dom";
import HomeIcon from "./UI/Icons/HomeIcon";
import Magnifier from "./UI/Icons/MagnifierIcon";
import UserIcon from "./UI/Icons/UserIcon";
import ShareIcon from "./UI/Icons/ShareIcon";
import MenuIcon from "./UI/Icons/MenuIcon";
import MoreIcon from "./UI/Icons/MoreIcon";

const Footer = () => {
  //TODO change to NavLink links
  return (
    <div className="flex flex-row justify-between items-center gap-x-6 fixed bottom-0 left-0 right-0 bg-gray-200 py-6 px-12">
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
      <div className="bg-brownGoldish w-16 h-16 flex justify-center rounded-full items-center">
        <NavLink
          to="/main_landing_page"
          activeClassName="underline"
          className="text-xl scale-110 hover:underline hover:scale-125"
        >
          <MenuIcon />
        </NavLink>
      </div>
      <NavLink
        to="/my_profil"
        className="text-xl hover:underline hover:scale-110"
      >
        <UserIcon />
      </NavLink>
      <NavLink to="/signup" className="text-xl hover:underline hover:scale-110">
        <ShareIcon />
      </NavLink>
      <NavLink to="/signup" className="text-xl hover:underline hover:scale-110">
        <MoreIcon />
      </NavLink>
    </div>
  );
};

export default Footer;
