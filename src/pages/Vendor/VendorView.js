import React, { useState } from "react";
import "./VendorView.css";
import axios from "axios";


export const VendorView = () => {
    const[vendorName, setVendorName] = useState('');
    const[address, setAddress] = useState('');
    const[phone, setPhone] = useState('');
    const[accountNumber, setAccountNumber] = useState('');
    const [isShown, setIsShown] = useState(false);
    const [message, setMessage] = useState("");
  const handleVendor = (e)=>{
    const name = e.target.value;
    setVendorName(name);
    console.log(name);
  }

  const handleaddress = (e)=>{
    const address = e.target.value;
    setAddress(address);
    console.log(address);
  }

  const handlephone = (e)=>{
    const phone = e.target.value;
    setPhone(phone);
    console.log(phone);
  }

  const handleaccount = (e)=>{
    const account_number = e.target.value;
    setAccountNumber(account_number);
    console.log(account_number);
  }

  const handleClick = () => {
    setIsShown((current) => !current);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata ={name:vendorName,address:address, phone:phone,account_number:accountNumber}
    await axios
      .post(
        "http://localhost/devopsdeveloper/user/adduser",
        JSON.stringify(userdata)
      )
      .then((result) => {
        setMessage(result.data.msg);
        console.log(result.data);
        console.log(result.data.msg);
      });
  };

  const handleFormValidation = ()=>{

  }
  return (
    <div>
      <div className="button-input">
        <button className="btn btn-primary" onClick={handleClick}>Add Vendor</button>
        </div>    
        {isShown && (
          <div>
            <form onSubmit={handleSubmit} >
      <div className="vendor-container">
        <h1>
          Vendor
          <span>Please fill all the texts in the fields.</span>
        </h1>
        <label>
          <span>Vendor Name</span>
          <input autoFocus name="name" type="text" onChange={(e)=> handleVendor(e)} />
        </label>
        <label>
          <span>Address</span>
          <input name="address" type="text"  onChange={(e)=> handleaddress(e)}  />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="text"  onChange={(e)=> handlephone(e)} />
        </label>
        <label>
          <span>AccountNumber</span>
          <input name="account_number" type="text"  onChange={(e)=> handleaccount(e)} />
        </label>
        <div className="button-container">
            
            <button className="btn btn-secondary me-4 " onClick={() => {handleClick(false)}}>Cancel</button>
            <button className="btn btn-primary">Save</button>
            </div>
    </div>
    </form>
    </div>)}
    </div>
  );
};
