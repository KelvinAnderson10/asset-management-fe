import React, { useState } from "react";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { FormApprovalRent } from "./components/FormApprovalRent";
import { ListApprovedRent } from "./components/ListApprovedRent";
import { ListRentRequest } from "./components/ListRentRequest";
import '../ApprovalInventory/AppInv.css'

export const AppRent = () => {
  const [requestForm, setRequestForm] = useState(true);
  const [requestList, setRequestList] = useState(false);
  const [classNavbarForm, setClassNavbarForm] = useState("navbar-po-box");
  const [classNavbarList, setClassNavbarList] = useState("navbar-po-box2");

  const handleClickForm = () => {
    setRequestForm(true);
    setRequestList(false);
    setClassNavbarForm("navbar-po-box");
    setClassNavbarList("navbar-po-box2");
  };

  const handleClickList = () => {
    setRequestForm(false);
    setRequestList(true);
    setClassNavbarForm("navbar-po-box2");
    setClassNavbarList("navbar-po-box");
  };

  return (
    <>
      <Sidebar>
        <div className="po-rent-container">
          <div className="navbar-po-container">
            <div className="navbar-po-left">
              <div
                className={classNavbarForm}
                onClick={() => handleClickForm()}
              >
                <div className='text-inv'>List Rent Request</div>
              </div>
              <div
                className={classNavbarList}
                onClick={() => handleClickList()}
              >
                <div className='text-inv2'>Approved</div>
              </div>
            </div>
            <div className="title-right">
              <div className="title-box">
                Rent
              </div>
            </div>
          </div>
        </div>
        {requestForm && <ListRentRequest/>}
        {/* {requestForm && <FormApprovalRent/>} */}
        {requestList && <ListApprovedRent/>}
      </Sidebar>
    </>
  );
};
