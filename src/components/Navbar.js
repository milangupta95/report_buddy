import React from 'react';
import { NavLink } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  },[location]);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">
            <h1>Reportbuddy</h1>
          </div>
          {
            !isAuthenticated ? <div className="flex space-x-4">
              <NavLink to={"/login"} className="text-gray-800 hover:text-blue-600">
                Login
              </NavLink>
              <NavLink to={"/signup"} className="text-gray-800 hover:text-blue-600">
                Signup
              </NavLink>
            </div> : <div>
              <Avatar className='cursor-pointer' onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}/>
              <div className={!isMenuOpen ? "hidden" : "bg-white shadow-lg absolute top-16 z-[10001] right-16 rounded-lg w-64"}>
                <h1 className="py-2 px-6 text-3xl text-black font-semibold border-b border-white">Welcome!</h1>
                <ul className="p-4 list-none space-y-2">
                  <Link to="/report">
                    <li className="bg-white text-blue-700 hover:bg-blue-100 transition duration-300 ease-in-out px-4 py-2 rounded-lg">
                      Generate a Report
                    </li>
                  </Link>
                  <Link to="/history">
                    <li className="bg-white text-blue-700 hover:bg-blue-100 transition duration-300 ease-in-out px-4 py-2 rounded-lg">
                      See Patient History
                    </li>
                  </Link>
                  <button className={"bg-white text-blue-700 hover:bg-blue-100 transition duration-300 ease-in-out px-4 py-2 rounded-lg"} onClick={() => {
                    signOut();
                    navigate("/login");
                  }}>
                    Sign out
                  </button>
                </ul>
              </div>

            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
