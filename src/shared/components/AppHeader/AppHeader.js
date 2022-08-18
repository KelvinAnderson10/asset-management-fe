import React from 'react'

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import './AppHeader.css'
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logonarindo.svg';

export const AppHeader = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate('/', {replace: true})
  }
  return (
    <header className="w-100 p-3 border-bottom header-container">
        <div className="container-fluid">
          <div className="d-flex flex-wrap justify-content-between">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              <h4> <img src={logo} alt='logo'/> Dashboard</h4>
            </a>
            <Dropdown as={ButtonGroup} align="end">
                <Dropdown.Toggle variant='' id="dropdown-split-basic"> 
                    <img src={logo} alt='logo' width="32" height="32" className="rounded-circle"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
    </header>
  )
}
