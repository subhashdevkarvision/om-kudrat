import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { UserRound, X, Handbag, Heart } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserCart, fetchUserWishlist } from "@/api";
import { Badge } from "./ui/badge";

const Navbar = ({ onCartClick, cartActive }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const activePaths = ["/checkout", "/cart", "/place-order"];
  const isActive = activePaths.includes(location.pathname);
  const activeWishlistPath = ["/wishlist"];
  const isActiveWishlist = activeWishlistPath.includes(location.pathname);
  const menuRef = useRef(null);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["userCart"],
    queryFn: fetchUserCart,
  });
  const cartCount = data?.cartData?.length || null;
  const wishList = useQuery({
    queryKey: ["userWishlist"],
    queryFn: fetchUserWishlist,
  });
  const wishlistCount = wishList?.data?.wishlistData?.length || null;
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    queryClient.removeQueries(["userCart"]);
    queryClient.removeQueries(["userWishlist"]);
    navigate("/");
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="px-4  container max-w-7xl xl:px-0 mx-auto fixed top-0 left-0 right-0 z-50 py-2 bg-white flex items-center justify-between font-poppins border-b border-gray-100">
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
          <button
            className={`w-10 h-10 border border-grayish-blue rounded-full flex items-center cursor-pointer justify-center relative ${
              isActiveWishlist
                ? "border-text-green text-text-green"
                : "border-grayish-blue text-Chinese-Black"
            }`}
            onClick={() => {
              navigate("/wishlist");
              setMenuOpen(false);
            }}
          >
            <Heart
              size={18}
              className={`text-Chinese-Black ${
                isActiveWishlist ? "text-text-green" : "text-Chinese-Black"
              }`}
            />

            {wishlistCount > 0 && (
              <Badge className="absolute -top-2.5 -right-1 text-xs px-1.5 bg-text-green text-white">
                {wishlistCount}
              </Badge>
            )}
          </button>
          <button
            onClick={() => {
              handleCartClick();
              setMenuOpen(false);
            }}
            className={`w-10 h-10 border relative border-grayish-blue ${
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
            {cartCount && (
              <Badge className="absolute -top-2.5 -right-2 text-xs px-1.5 bg-text-green text-white">
                {cartCount}
              </Badge>
            )}
          </button>
        </div>
        <div className="hidden md:flex items-center rounded-full bg-[#EFEFEF] p-1 overflow-hidden">
          {isAuth ? (
            <>
              <Button
                variant="ghost"
                className="px-5 py-5 rounded-full bg-[#EFEFEF]  text-black cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                <UserRound />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
                className="px-5 py-5 rounded-full bg-white text-black cursor-pointer"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/auth");
                  setMenuOpen(false);
                }}
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
        <div
          ref={menuRef}
          className="absolute top-20 left-0 w-full bg-white z-20 flex flex-col gap-6 py-4 items-center md:flex lg:hidden"
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            About
          </NavLink>
          <NavLink
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "font-semibold border-b border-black" : ""
            }
          >
            Contact Us
          </NavLink>
          <div className="block md:hidden">
            <div className="flex gap-2 justify-center mt-2">
              <button
                className={`w-10 h-10 border border-grayish-blue rounded-full flex items-center cursor-pointer justify-center relative ${
                  isActiveWishlist
                    ? "border-text-green text-text-green"
                    : "border-grayish-blue text-Chinese-Black"
                }`}
                onClick={() => {
                  navigate("/wishlist");
                  setMenuOpen(false);
                }}
              >
                <Heart
                  size={18}
                  className={`text-Chinese-Black ${
                    isActiveWishlist ? "text-text-green" : "text-Chinese-Black"
                  }`}
                />

                {/* ✅ Wishlist Badge Added Here */}
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2.5 -right-2 text-xs px-1.5 bg-text-green text-white">
                    {wishlistCount}
                  </Badge>
                )}
              </button>
              <button
                onClick={() => {
                  handleCartClick();
                  setMenuOpen(false);
                }}
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
                    onClick={() => {
                      handleLogOut();
                      setMenuOpen(false);
                    }}
                    className="px-5 py-5 rounded-full bg-white text-black cursor-pointer"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/auth");
                      setMenuOpen(false);
                    }}
                    className="px-5 py-5 rounded-full bg-[#EFEFEF]  text-black cursor-pointer"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/auth/register");
                      setMenuOpen(false);
                    }}
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
