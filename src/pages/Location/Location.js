import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar';
import { LocationList } from './LocationList';
export const Location = () => {
  
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
    axios.post('https://62ff0fb5a85c52ee48401579.mockapi.io/location',{
      location
    })

  }

  return (
    <>
    
    <Sidebar/>
    <div>
      <div className="d-flex flex-row">
        <button type="button" className="me-3 mt-4 btn btn-primary ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#addModalForm">
          Add Location +
        </button>
      </div>
      <LocationList/>

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
    </>
  )
}

