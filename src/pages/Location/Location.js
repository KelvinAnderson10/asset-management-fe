import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'



const Location = () => {
    const url = 'http://localhost:3002/location'
  const[location, setLocation] = useState('');
    
  const handleLocation = (e)=>{
    const location = e.target.value;
    setLocation(location);
    console.log(location);
  }
  //Add Data To Table
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Success')
    // axios.post(url,{
    //     location:location
    // })
    // .then(res=>{
    //     console.log(res.location);
    // })

  }

  


  return (
    <div>
      <div className="d-flex flex-row">
        <button type="button" className="me-3 btn btn-primary ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#addModalForm">
          Add Location +
        </button>
      </div>
      <table className="table table-bordered border-primary table-responsive">
        <thead>
          <tr>
            <th scope="col">Location</th>
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
                  <label className="form-label">Location Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location Name"
                    required
                    onChange={handleLocation}
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
  )
}

export default Location