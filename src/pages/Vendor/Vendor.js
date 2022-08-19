import React, { useState } from 'react'

export const Vendor = () => {
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

  return (
    <div> 
        <div>
      <div className="d-flex flex-row">
        <button type="button" className="me-3 btn btn-primary ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#addModalForm">
          Add Vendor +
        </button>
      </div>
      <table className="table table-bordered border-primary table-responsive">
        <thead>
          <tr>
            <th scope="col">Vendor Name </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>

      {/*Add Modal */}
      <div className="modal fade" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Location</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label className="form-label">Vendor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location Name"
                    required
                    onChange={handleVendor}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vendor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location Name"
                    required
                    onChange={handleVendor}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vendor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location Name"
                    required
                    onChange={handleVendor}
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
     
   </div>
      
   
  )
}
