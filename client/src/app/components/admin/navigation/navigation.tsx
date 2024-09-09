import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../../services/auth.service";
import useUser from "../../../context/user.context";

export const Navigation: FC = () => {
  const [isSneakersOpen, setIsSneakersOpen] = useState(false);
  const [isStocksOpen, setIsStocksOpen] = useState(false);
  const [isSizesOpen, setIsSizesOpen] = useState(false);
  const [isStripeOpen, setIsStripeOpen] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const pathname = window.location.pathname;
  const authService = new AuthService();

  const handleSignout = () => {
    setUser({ email: "", id: "", roles: "" });
    authService.signout();
    navigate("/");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col overflow-hidden">
      {/* Logo ou titre */}
      <div className="p-4 text-lg font-bold text-center bg-gray-900">
        Admin Dashboard
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-10 overflow-hidden">
        <ul>
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-4 py-2 hover:bg-gray-700 ${
                pathname === "/admin/dashboard" ? "bg-indigo-600" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 h-5 w-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to={"/admin/users"}
              className={`flex items-center px-4 py-2 hover:bg-gray-700 ${
                pathname === "/admin/users" ? "bg-indigo-600" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 w-5 h-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Users
            </Link>
          </li>

          <li>
            <button
              onClick={() => setIsSneakersOpen(!isSneakersOpen)}
              className="flex items-center px-4 py-2 hover:bg-gray-700 w-full text-left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 h-5 w-5 mr-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
              Sneakers
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-auto h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 9.75l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <ul className={`pl-4 mt-2 ${isSneakersOpen ? "block" : "hidden"}`}>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Sneaker List
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Add Sneaker
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Update Sneaker
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Delete Sneaker
                </a>
              </li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => setIsSizesOpen(!isSizesOpen)}
              className="flex items-center px-4 py-2 hover:bg-gray-700 w-full text-left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 w-5 h-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Sizes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-auto h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 9.75l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <ul className={`pl-4 mt-2 ${isSizesOpen ? "block" : "hidden"}`}>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Sizes List
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Add Size
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Update Size
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Delete Size
                </a>
              </li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => setIsStocksOpen(!isStocksOpen)}
              className="flex items-center px-4 py-2 hover:bg-gray-700 w-full text-left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 w-5 h-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              Stocks
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-auto h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 9.75l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <ul className={`pl-4 mt-2 ${isStocksOpen ? "block" : "hidden"}`}>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Stocks List
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Add Stock
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Update Stock
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Delete Stock
                </a>
              </li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => setIsStripeOpen(!isStripeOpen)}
              className="flex items-center px-4 py-2 hover:bg-gray-700 w-full text-left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 w-5 h-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Stripe
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-auto h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 9.75l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <ul className={`pl-4 mt-2 ${isStripeOpen ? "block" : "hidden"}`}>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Customers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Invoices
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-600"
                >
                  Product
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 h-5 w-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>
              Settings
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer ou déconnexion */}
      <div className="p-4 bg-gray-900 flex-shrink-0">
        <button
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded"
          onClick={handleSignout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 h-5 w-5 mr-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};
