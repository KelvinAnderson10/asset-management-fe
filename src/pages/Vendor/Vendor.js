import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar';
export const Vendor = () => {
  const url = 'http://localhost:3002/location'
  const[data, setData] = useState({
    name:"",
    address:"",
    phone:"",
    accountNumber:""
  });
  const handleChange = (e) => {
    const newData = {...data}
    newData[e.target.name] = e.target.value
    setData(newData)
    console.log(newData);
  }
 
  //Add Data To Table
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Success')
  }
  return (
    <>
    <Sidebar/>
    <div>
      <div className="d-flex flex-row">
        <button type="button" className="me-3 mt-4 btn btn-primary ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#addModalForm">
          Add Vendor +
        </button>
      </div>

      {/*Add Modal */}
      <div className="modal fade" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Vendor</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label className="form-label">Vendor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Vendor Name"
                    required
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    required
                    name='address'
                    value={data.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    required
                    name='phone'
                    value={data.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account Number"
                    required
                    name='accountNumber'
                    value={data.accountNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-footer d-block">
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-warning float-end">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

