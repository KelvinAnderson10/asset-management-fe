import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import '../Sidebar/Sidebar.css'
import {useAuth} from '../../hook/UseAuth'

const SidebarNav = styled.nav`
  background: #383838;
  width: 350px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  // const onLogout = useAuth()
  const onLogout = () => {
    navigate('/', {replace: true})
  }

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
 

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='Nav'>
          <div className='NavIcon' to='#'>
            <FaIcons.FaBars onClick={showSidebar}/>
            <AiIcons.AiOutlineLogout className='logout' onClick={onLogout}/>
          </div> 
        </div>
        <SidebarNav sidebar={sidebar}>
          <div className='SidebarWrap'>
            <div className='NavIcon' to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar}/>
            </div>
            {/* <img src='../src/assets/images/narindo_logo_black.svg'/> */}
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </SidebarNav>
        <div className='AppFooter'>
          <p>Copyright © by Kelompok 6, All Rights Reserved</p>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;