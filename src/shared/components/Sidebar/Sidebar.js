import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SubMenu";
import * as GoIcons from 'react-icons/go';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import './Sidebar.css'
import * as AiIcons from 'react-icons/ai';
import { useAuth } from "../../../services/UseAuth";
import {CgProfile} from 'react-icons/cg'
import { fontSize } from "@mui/system";

const routesAdmin = [
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
          {
            path: "/data-management/user",
            name: "User",
            icon: <BsIcons.BsPeople/>,
          },
      ],
  },
  {
    path: "/upload-data",
    name: "Import Data",
    icon: <FaIcons.FaFileUpload/>,
  },
  {
    path: "/approval-data",
    name: "Approval Data",
    icon: <BsIcons.BsFillFileEarmarkCheckFill/>,
  },
];

const routesIT = [
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
      ],
  },
  {
    path: "/upload-data",
    name: "Import Data",
    icon: <FaIcons.FaFileUpload/>,
  },
  {
    path: "/approval-data",
    name: "Approval Data",
    icon: <BsIcons.BsFillFileEarmarkCheckFill/>,
  },
  
]

const routesUserStaff = [
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
      ],
  },
  {
    path: "/purchase-request",
    name: "Purchase Request",
    icon: <AiIcons.AiFillShopping/>, 
  },
  
]

const routesUserSpv = [
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
      ],
  },
  {
    path: "/approval-data",
    name: "Approval Data",
    icon: <BsIcons.BsFillFileEarmarkCheckFill/>,
  },
  
]

const Sidebar = ({children}) => {
  const { getCookie } = useAuth();
  const[user,setUser]= useState({
    name:'',
    position:'',
    role:'',
    NIK:''
  })

  useEffect(() => {
    onGetCookie();
  }, []);

const onGetCookie = ()=>{
  
  let savedUserJsonString = getCookie("user")
  let savedUser = JSON.parse(savedUserJsonString)
  setUser(prevObj=>({...prevObj,NIK:(savedUser.NIK),name:(savedUser.name),position:(savedUser.position), role:(savedUser.role)}))

  console.log(user.name)
}
  
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
  eraseCookie()
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
          {user.role==="GA" && (
          <section className="routes">
            {routesAdmin.map((route, index) => {
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
                  activeclassname="active"
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
          )}

{user.role==="IT" && (
          <section className="routes">
            {routesIT.map((route, index) => {
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
                  activeclassname="active"
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
          )}
          {user.role==="User Cabang" && user.position==="Staff" && (
          <section className="routes">
            {routesUserStaff.map((route, index) => {
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
                  activeclassname="active"
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
          )}
          {user.role==="User Cabang" && user.position==="Supervisor" && (
          <section className="routes">
            {routesUserSpv.map((route, index) => {
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
                  activeclassname="active"
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
          )}
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
          <nav className="navbar navbar-expand-lg header-main">
  <div class="nav-item dropdown">
				<a href="#" data-bs-toggle="dropdown" className="nav-item nav-link dropdown-toggle user-action"><CgProfile style={{fontSize:'28px', marginRight:"5%"}} />{user.name} <b class="caret"></b></a>
				<div class="dropdown-menu">
					{/* <a href="#" className="dropdown-item"><i class="fa fa-user-o"></i> Profile</a> */}
					<div className="divider dropdown-divider"></div>
					<a onClick={onLogout} className="dropdown-item"><i class="material-icons">&#xE8AC;</i> Logout</a>
				</div>
			</div>
          {/* <AiIcons.AiOutlineLogout className='logout' onClick={onLogout}/> */}
          </nav>
          {children}
          </main>
      </div>
    </>
  );
};

export default Sidebar;