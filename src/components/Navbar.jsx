import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import { IoHeartOutline } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";

import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  //console.log(cartItems)
  //console.log(isDropDownOpen)

  const {currentUser, logout} = useAuth();

  const handleLogOut = () => {
    logout()
  }

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between item-center">
        {/*left side*/}
        <div className="flex item-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>

          {/*search input*/}
          <div className="relative sm:w-72 w-40 space-x-2">
            <FaSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="search here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md 
                     focus:outline-none"
            />
          </div>
        </div>

        {/*right side*/}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setisDropDownOpen(!isDropDownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full $ {currentUser} ? 'ring-2 ring-blue-500' : ''}`}
                  />
                </button>
                {/*show dropdowns*/}
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setisDropDownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button 
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <LuUserRound className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <IoHeartOutline className="size-6" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <CgShoppingCart className="size-6" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
