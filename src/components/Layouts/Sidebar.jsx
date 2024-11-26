import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { useState, useEffect } from 'react';
import logoutAdmin from '../../utils/logoutAdmin';

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState('');
  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (value) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add('active');
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  return (
    <div className="dark">
      <nav className="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] bg-gray-900 text-white shadow-lg z-50 transition-all duration-300">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-800 shadow-md">
            <NavLink to="/" className="main-logo flex items-center">
              <img
                className="w-8 h-8"
                src="/assets/images/logo192.png"
                alt="logo"
              />
              <span className="text-xl font-semibold ml-3">Chelsfield</span>
            </NavLink>

            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400 transition duration-300"
              onClick={() =>{
                
               dispatch(toggleSidebar())}}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M13 19L7 12L13 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.5"
                  d="M17 19L11 12L17 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Content */}
          <PerfectScrollbar className="flex-1 overflow-y-auto">
            <ul className="font-medium space-y-1 p-4">
              {/* Main Section */}
              <h2 className="text-gray-400 text-xs uppercase font-semibold mb-2">
                Main
              </h2>
              <li>
                <NavLink
                  to="/"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 text-white"
                  >
                    <path
                      d="M10 16L5 12L10 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      opacity="0.5"
                      d="M14 16L9 12L14 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Dashboard
                </NavLink>
              </li>

              {/* Lists Section */}
              <h2 className="text-gray-400 text-xs uppercase font-semibold mb-2 mt-4">
                Lists
              </h2>
              <li>
                <NavLink
                  to="/update-article"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  <span>News Articles</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add_SliderImages"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  <span>Slider Images</span>
                </NavLink>
              </li>
              <li>
              <NavLink
                  to="/teamManagement"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  <span>Team Management</span>
                </NavLink>
              </li>

              {/* User Section */}
              <h2 className="text-gray-400 text-xs uppercase font-semibold mb-2 mt-4">
                User
              </h2>
              <li>
                <NavLink
                  to="/user-profile"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => logoutAdmin(navigate)}
                  className="w-full text-left flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
