import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { UserRound, X, Handbag, Heart } from "lucide-react";

const Navbar = ({ onCartClick, cartActive }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const activePaths = ["/checkout", "/cart", "/place-order"];
  const isActive = activePaths.includes(location.pathname);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };
  const handleCartClick = () => {
    onCartClick();
  };
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("token"));
    if (auth) {
      setIsAuth(true);
    }
  }, []);

  return (
    <nav className="top-0 w-full py-2 bg-white flex items-center justify-between font-poppins relative">
      {/* Logo */}
      <div className="">
        <img
          src={logo}
          alt="Om Kudrat Logo"
          className="w-28 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      {/* Navigation Links (only show on LG and up) */}
      <div className="hidden lg:flex gap-10 ml-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold border-b border-black" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "font-semibold border-b border-black" : ""
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "font-semibold border-b border-black" : ""
          }
        >
          About
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "font-semibold border-b border-black" : ""
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "font-semibold border-b border-black" : ""
          }
        >
          Contact Us
        </NavLink>
      </div>
      {/* Icons & Login/Register */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex ">
          <button className="w-10 h-10 border border-grayish-blue rounded-full flex items-center cursor-pointer justify-center">
            <Heart size={18} className="text-Chinese-Black" />
          </button>
          <button
            onClick={handleCartClick}
            className={`w-10 h-10 border border-grayish-blue ${
              cartActive && "border-text-green"
            }  rounded-full flex items-center cursor-pointer justify-center ${
              isActive
                ? "border-text-green text-text-green"
                : "border-grayish-blue text-Chinese-Black"
            }`}
          >
            <Handbag
              size={18}
              className={`text-Chinese-Black ${
                cartActive && "text-text-green"
              }${
                isActive
                  ? "border-text-green text-text-green"
                  : "border-grayish-blue text-Chinese-Black"
              }`}
            />
          </button>
        </div>
        <div className="hidden md:flex items-center rounded-full bg-[#EFEFEF] p-1 overflow-hidden">
          {isAuth ? (
            <>
              <Button
                variant="ghost"
                className="px-5 py-5 rounded-full bg-[#EFEFEF]  text-black cursor-pointer"
              >
                <UserRound />
              </Button>
              <Button
                variant="outline"
                onClick={handleLogOut}
                className="px-5 py-5 rounded-full bg-white text-black cursor-pointer"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/auth")}
                className="px-5 py-5 rounded-full bg-[#EFEFEF]  text-black cursor-pointer"
              >
                Login
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/auth/register")}
                className="px-5 py-5 rounded-full bg-white text-black cursor-pointer"
              >
                Register
              </Button>
            </>
          )}
        </div>
        {/* Hamburger menu: show on MD and below */}
        {menuOpen ? (
          <button
            className="flex lg:hidden ml-auto bg-[#EFEFEF] rounded-full p-3 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <X size={20} />
          </button>
        ) : (
          <button
            className="flex lg:hidden ml-auto bg-[#EFEFEF] rounded-full p-3 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <RxHamburgerMenu size={20} />
          </button>
        )}
      </div>
      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white z-20 flex flex-col gap-6 py-4 items-center md:flex lg:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            About
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            Contact Us
          </NavLink>
          <div className="block md:hidden">
            <div className="flex gap-2 justify-center mt-2">
              <button className="w-10 h-10 border border-grayish-blue rounded-full flex items-center cursor-pointer justify-center">
                <Heart size={18} className="text-Chinese-Black" />
              </button>
              <button
                onClick={handleCartClick}
                className={`w-10 h-10 border border-grayish-blue ${
                  cartActive && "border-text-green"
                }  rounded-full flex items-center cursor-pointer justify-center ${
                  isActive
                    ? "border-text-green text-text-green"
                    : "border-grayish-blue text-Chinese-Black"
                }`}
              >
                <Handbag
                  size={18}
                  className={`text-Chinese-Black ${
                    cartActive && "text-text-green"
                  } ${
                    isActive
                      ? "border-text-green text-text-green"
                      : "border-grayish-blue text-Chinese-Black"
                  }`}
                />
              </button>
            </div>
            <div className="flex rounded-full bg-[#EFEFEF] p-1 mt-2">
              {isAuth ? (
                <>
                  <Button
                    variant="ghost"
                    className="px-5 py-5 rounded-full bg-[#EFEFEF]  text-black cursor-pointer"
                  >
                    <UserRound />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogOut}
                    className="px-5 py-5 rounded-full bg-white text-black cursor-pointer"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/auth")}
                    className="px-5 py-5 rounded-full bg-[#EFEFEF]  text-black cursor-pointer"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/auth/register")}
                    className="px-5 py-5 rounded-full bg-white text-black cursor-pointer"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
