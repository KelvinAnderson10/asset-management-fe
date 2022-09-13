import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { Failed } from '../../shared/components/Notification/Failed'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { useDeps } from '../../shared/context/DependencyContext'
import "./Settings.css"
export const Settings = () => {
    const [data,setData] = useState({})
    const {generalSettingService} = useDeps()

    useEffect(() => {
        onGetGeneralSetting()
      }, [])
    const onGetGeneralSetting = async () =>{
        try {
            const response = await generalSettingService.getGeneralSetting();
            setData(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleEdit = async ()=>{
        try{
            const response = await generalSettingService.updateGeneralSetting(data)
            setData(response)
            if (response.status === "SUCCESS") {
                swal({
                  title: "Success!",
                  text: "Your data has been saved!",
                  icon: "success",
                  button: "OK!",
                });
              }
        }catch(e){
            Failed('Your data failed to save')
        }
    
    }

  return (
    <div>
        <Sidebar>
            <div className='setting-container' >
                <div  className='setting-card' >
                    <h3>General Settings</h3>
                    <form onSubmit={handleEdit} >
                    <div className="inputBox">
                  <span> PPN :</span>
                  <input
                    type="text"
                    required
                    name="PPN"
                    // defaultValue={data.PPN}
                    style={{width:'95%'}}
                  />
                </div>
                <div className="inputBox">
                  <span> Initial:</span>
                  <input
                    type="text"
                    required
                    name="Initisal"
                    // defaultValue={data.PPN}
                    style={{width:'95%'}}
                  />
                </div>
                <div className="inputBox">
                  <span> Minimum Asset Price :</span>
                  <input
                    type="text"
                    required
                    name="Minimum Asset"
                    // defaultValue={data.PPN}
                    style={{width:'95%'}}
                  />
                </div>
                <div className='button-setting' >
                <button className="btn btn-primary float-end">
                            Submit
                          </button>
                          {/* <button className="btn btn-warning float-end">
                            Cancel
                          </button> */}
                </div>
                
                    </form>
                </div>

            </div>
        </Sidebar>
    </div>
  )
}
