import React from "react";
import { useState } from "react";
import MoreIcon from "../Icons/MoreIcon";

const ItemMenuDropdown = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuIsFocused, setMenuIsFocused] = useState(false);

  const onHideMenu = () => {
    if (!menuIsFocused) {
      setShowMenu(false);
    }
  };
  const onChangeMenu = () => {
    setShowMenu(!showMenu);
  };
  const onFocusDropdown = () => {
    setMenuIsFocused(true);
  };
  const onBlurDropdown = () => {
    setMenuIsFocused(false);
  };

  return (
    <div className="flex justify-center">
      <div className="relative ">
        <button
          type="button"
          //onFocus={onShowMenu}
          onBlur={onHideMenu}
          onClick={onChangeMenu}
          className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md "
        >
          <MoreIcon />
        </button>
        {showMenu && (
          <div
            onMouseOver={onFocusDropdown}
            onMouseOut={onBlurDropdown}
            id="dropdown"
            className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md  shadow-xl dark:bg-gray-800"
          >
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
            >
              View Details
            </a>

            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100 "
            >
              Settings
            </a>
            <hr className="border-gray-200 " />
            <button
              onClick={props.onRemove}
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemMenuDropdown;
