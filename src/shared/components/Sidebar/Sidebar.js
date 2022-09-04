import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SubMenu";
import * as GoIcons from 'react-icons/go';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import './Sidebar.css'
import * as AiIcons from 'react-icons/ai';
import { useAuth } from "../../../services/UseAuth";

const routes = [
  {
    path: "/main",
    name: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/data-management",
    name: "Data Management",
    icon: <GoIcons.GoDatabase/>,
    subRoutes: [
        {
          path: "/data-management/asset-item",
          name: "Asset Item",
          icon: <IoIcons.IoIosPaper/>,
        },
        {
          path: "/data-management/asset-category",
          name: "Asset Category",
          icon: <BiIcons.BiCategoryAlt/>,
        },
        {
          path: "/data-management/vendor",
          name: "Vendor",
          icon: <FaIcons.FaStore/>,
        },
        {
            path: "/data-management/location",
            name: "Location",
            icon: <GoIcons.GoLocation/>,
          },
      ],
  },
  {
    path: "/upload-data",
    name: "Import Data",
    icon: <FaIcons.FaFileUpload/>,
  },
];

const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const { eraseCookie } = useAuth()

  const navigate = useNavigate();
  const onLogout = () => {
  eraseCookie("OTP")
  navigate('/', {replace: true})
  } 

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "300px" : "50px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar`}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Narindo
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }
     
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className='footer-main'
                >
                  <p>Copyright © by Group 6, All Rights Reserved</p>
                </motion.h1>
              )}
            </AnimatePresence>          
        </motion.div>

        <main>
          <nav class="navbar navbar-expand-lg header-main">
          <AiIcons.AiOutlineLogout className='logout' onClick={onLogout}/>
          </nav>
          {children}
          </main>
      </div>
    </>
  );
};

export default Sidebar;