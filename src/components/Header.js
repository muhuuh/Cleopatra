import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row justify-between bg-teal-500 text-white font-bold py-6 px-12">
      <div className="text-3xl">Cleaopatra</div>
      <div className="flex flex-row justify-center gap-x-6 ">
        <NavLink
          to="/main_landing_page"
          activeClassName="underline"
          className="text-xl hover:underline hover:scale-110"
        >
          Lists
        </NavLink>
        <NavLink
          to="/lists/create"
          activeClassName="underline"
          className="text-xl hover:underline hover:scale-110"
        >
          Create
        </NavLink>
      </div>
      <div className="flex flex-row justify-center gap-x-6">
        <NavLink
          to="/my_profil"
          className="text-xl hover:underline hover:scale-110"
        >
          MyProfil
        </NavLink>
        <NavLink
          to="/signup"
          className="text-xl hover:underline hover:scale-110"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
