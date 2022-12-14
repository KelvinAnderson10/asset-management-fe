import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SubMenu";
import * as GoIcons from "react-icons/go";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr"
import "./Sidebar.css";
import * as AiIcons from "react-icons/ai";
import { useAuth } from "../../../services/UseAuth";
import { CgProfile } from "react-icons/cg";
import logo from "../../../assets/images/default.png";
import { Noty } from "../Noty/Noty";
import { useDeps } from "../../context/DependencyContext";
import moment from "moment";
import { NOTIF, PATH } from "../../constants";
import 'moment/locale/en-sg'
import * as TbIcons from "react-icons/tb"

const routesAdmin = [
  {
    path: "/main",
    name: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/data-management",
    name: "Data Management",
    icon: <GoIcons.GoDatabase />,
    subRoutes: [
      {
        path: "/data-management/asset-item",
        name: "Asset Item",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        path: "/data-management/asset-category",
        name: "Asset Category",
        icon: <BiIcons.BiCategoryAlt />,
      },
      {
        path: "/data-management/vendor",
        name: "Vendor",
        icon: <FaIcons.FaStore />,
      },
      {
        path: "/data-management/location",
        name: "Location",
        icon: <GoIcons.GoLocation />,
      },
      {
        path: "/data-management/user",
        name: "User",
        icon: <BsIcons.BsPeople />,
      },
      {
        path: "/data-management/additional-cost",
        name: "Additional Cost",
        icon: <FaIcons.FaCoins />,
      },
      {
        path: "/data-management/expedition",
        name: "Expedition",
        icon: <TbIcons.TbTruckDelivery/>,
      },
    ],
  },
  {
    path: "/upload-data",
    name: "Import Data",
    icon: <FaIcons.FaFileUpload />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <AiIcons.AiFillSetting />,
  },
];

const routesGA = [
  {
    path: "/main",
    name: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/data-management",
    name: "Data Management",
    icon: <GoIcons.GoDatabase />,
    subRoutes: [
      {
        path: "/data-management/asset-item",
        name: "Asset Item",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        path: "/data-management/asset-category",
        name: "Asset Category",
        icon: <BiIcons.BiCategoryAlt />,
      },
      {
        path: "/data-management/vendor",
        name: "Vendor",
        icon: <FaIcons.FaStore />,
      },
      {
        path: "/data-management/location",
        name: "Location",
        icon: <GoIcons.GoLocation />,
      },
      {
        path: "/data-management/user",
        name: "User",
        icon: <BsIcons.BsPeople />,
      },
      {
        path: "/data-management/additional-cost",
        name: "Additional Cost",
        icon: <FaIcons.FaCoins />,
      },
      {
        path: "/data-management/expedition",
        name: "Expedition",
        icon: <TbIcons.TbTruckDelivery/>,
      },
    ],
  },
  {
    path: "/approval-data",
    name: "Approval Data",
    icon: <BsIcons.BsFillFileEarmarkCheckFill />,
    subRoutes: [
      {
        path: "/approval-data/inventory",
        name: "Inventory",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        path: "/approval-data/maintenance",
        name: "Maintenance",
        icon: <BiIcons.BiCategoryAlt />,
      },
      {
        path: "/approval-data/transfer",
        name: "Transfer",
        icon: <BiIcons.BiTransferAlt />,
      },
      {
        path: "/approval-data/rent",
        name: "Rent",
        icon: <FaIcons.FaStore />,
      },
    ],
  },
];

const routesIT = [
  {
    path: "/main",
    name: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/approval-data",
    name: "Approval Data",
    icon: <BsIcons.BsFillFileEarmarkCheckFill />,
    subRoutes: [
      {
        path: "/approval-data/inventory",
        name: "Inventory",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        path: "/approval-data/maintenance",
        name: "Maintenance",
        icon: <BiIcons.BiCategoryAlt />,
      },
    ],
  },
];

const routesUserRegular = [
  {
    path: "/main",
    name: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/purchase-request",
    name: "Purchase Request",
    icon: <AiIcons.AiFillShopping />,
    subRoutes: [
      {
        path: "/purchase-request/inventory",
        name: "Inventory",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        path: "/purchase-request/maintenance",
        name: "Maintenance",
        icon: <BiIcons.BiCategoryAlt />,
      },
      {
        path: "/purchase-request/rent",
        name: "Rent",
        icon: <FaIcons.FaStore />,
      },
    ],
  },
];

const routesUserGMSPVVP = [
  {
    path: "/main",
    name: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/approval-data/rent",
    name: "Rent",
    icon: <FaIcons.FaStore />,
  },
  {
    path: "/approval-data/transfer",
    name: "Transfer",
    icon: <BiIcons.BiTransferAlt />,
  },
];

const Sidebar = ({ children }) => {
  const { getCookie } = useAuth();
  const [user, setUser] = useState({
    name: "",
    role: "",
    level_approval: "",
    location_id: "",
    tap: "",
    cluster: "",
    department: "",
  });

  const [viewNotif, setViewNotif] = useState([]);
  const [countNotif, setCountNotif] = useState('0');
  const { notificationService } = useDeps();
  const [notif, setNotif] = useState(false);

  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      name: savedUser.name,
      role: savedUser.role,
      level_approval: savedUser.level_approval,
      location_id: savedUser.location_id,
      tap: savedUser.TAP,
      cluster: savedUser.Cluster,
      department: savedUser.department,
    }));

    console.log(user.name);
  };

  useEffect(() => {
    onGetCookie();
  }, []);

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

  // Notif
  const onGetCountNotification = async (name) => {
    try {
      const response = await notificationService.countNotificationByUser(name);
      if (response.data > 99){
        setCountNotif('99+')
      }else{
        setCountNotif(String(response.data));
      }
    } catch (e) {
      console.log(e);
    } 
  };

  useEffect(() => {
    if (user.name != ''){
      onGetCountNotification(user.name);
    }
  }, [user.name,countNotif]);

  const onReadNotification = async (name) => {
    try {
      const response = await notificationService.getNotif(name);
      for (let i in response.data){
        response.data[i].CreatedAt = moment(response.data[i].CreatedAt).locale("en-sg").format("LLL")
      }
    
      setViewNotif(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickNotification = async (id, type) => {
    try {
      const response = await notificationService.readNotif(id);
      if (user.level_approval === 'Regular') {
        if (type === NOTIF.TYPE.PURCHASE_INVENTORY) {
          navigate(PATH.REQUEST_INVENTORY, {
            state : { list : true}
          })
          return
        } else if (type === NOTIF.TYPE.PURCHASE_MAINTENANCE) {
          navigate(PATH.REQUEST_MAINTENANCE, {
            state : { list : true}
          })
          return
        } else if (type === NOTIF.TYPE.RENT)  {
          navigate(PATH.REQUEST_RENT, {
            state : { list : true}
          })
          return
        }
      } else {
        if (type === NOTIF.TYPE.TRANSFER) {
          navigate(PATH.APPROVAL_TRANSFER)
          return
        } else if (type === NOTIF.TYPE.PURCHASE_INVENTORY) {
          navigate(PATH.APPROVAL_INVENTORY)
          return
        } else if (type === NOTIF.TYPE.PURCHASE_MAINTENANCE) {
          navigate(PATH.APPROVAL_MAINTENANCE)
          return
        }
      }
      navigate(PATH.OVERVIEW)
    } catch (e) {
      console.log(e);
    }
  }

  const onClearNotif = async () => {
    try {
      const response = await notificationService.clearNotif(user.name);
      if (response.status === 'SUCCESS'){
        onClickViewNotif();
        setCountNotif('0');
        setViewNotif([]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const { eraseCookie } = useAuth();

  const navigate = useNavigate();
  const onLogout = () => {
    eraseCookie();  
  };

  const onClickViewNotif = () => {
    if (notif == false) {
      setNotif(true);
      onReadNotification(user.name)
      setCountNotif('0')
    } else {
      setNotif(false);
    }
  };

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
                  <div className="title-menu-sidebar">
                    <b>MENU</b>
                  </div>
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {user.role === "Admin" && (
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
          {user.role === "GA" && (
            <section className="routes">
              {routesGA.map((route, index) => {
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
          {user.role === "IT" && (
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
          {user.role === "Regular" && user.level_approval === "Regular" && (
            <section className="routes">
              {routesUserRegular.map((route, index) => {
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
          {user.role === "Regular" &&
            (user.level_approval === "GM" ||
              user.level_approval === "SPV" ||
              user.level_approval === "VP_TRAD") && (
              <section className="routes">
                {routesUserGMSPVVP.map((route, index) => {
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
          {/* <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="footer-main"
              >
                <p>Copyright ?? by Group 6, All Rights Reserved</p>
              </motion.h1>
            )}
          </AnimatePresence> */}
        </motion.div>

        <main>
          <div className="">
          <nav className="navbar navbar-expand-lg header-main">
            <img src={logo} className="logo-nav"></img>
            <div className="nav-right">
              <div style={{cursor:'pointer'}} onClick={onClickViewNotif}>
                <Noty width={"30px"} color={"#122C34"} count={countNotif} />
                {notif && (
                  <div className="modalNotif shadow p-1">
                    {viewNotif.length !== 0 ?  (
                      <div className="modal-notif-items p-1">
                        {
                          viewNotif.map((d, index) => {
                            return (
                              <div 
                                className="card border-light p-2 my-1"
                                key={index}
                                onClick={() => {
                                  onClickNotification(d.ID, d.type);
                                }}
                              >
                                Hi {d.to}, {d.body} 
                                <div>
                                <a style={{ color: "#B70621"}} >{d.CreatedAt} </a>
                                </div> 
                              </div>
                            );
                          {/* </ul> */}
                          })
                        }
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center fw-bold p-4">
                        No Notification
                      </div>
                    )}
                    { viewNotif.length !== 0 &&
                      <div 
                        className="btn btn-light mt-2 shadow-sm"
                        onClick={onClearNotif}
                      > 
                        Clear Notification
                      </div>
                    }
                  </div>
                )}
              </div>

              <div className="nav-item dropdown">
                <a
                  href="#"
                  data-bs-toggle="dropdown"
                  className="nav-item nav-link dropdown-toggle user-action"
                >
                  <CgProfile style={{ fontSize: "28px", marginRight: "5%" }} />
                  {user.name} <b className="caret"></b>
                </a>
                <div className="dropdown-menu">
                  <a onClick={onLogout} className="dropdown-item" style={{cursor:'pointer'}}>
                    <i className="material-icons">&#xE8AC;</i> Logout
                  </a>
                </div>
              </div>
            </div>
          </nav>
          </div>
         
          {children}
        </main>
      </div>
    </>
  );
};

export default Sidebar;
