import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Failed } from "../../shared/components/Notification/Failed";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import "./Settings.css";
export const Settings = () => {
  const [data, setData] = useState({});
  const { generalSettingService } = useDeps();

  useEffect(() => {
    onGetGeneralSetting();
  }, []);
  const onGetGeneralSetting = async () => {
    try {
      const response = await generalSettingService.getGeneralSetting();
      setData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      data.ppn = Number(data.ppn)
      data.minimum_asset = Number(data.minimum_asset)
      const response = await generalSettingService.updateGeneralSetting(data);
      setData(response);
      console.log('ini response edit',response)
      if (response.status === "SUCCESS") {
        swal({
          title: "Success!",
          text: "Your data has been saved!",
          icon: "success",
          button: "OK!",
        });
      }
    } catch (e) {
      Failed("Your data failed to save");
    } finally{
      onGetGeneralSetting()
    }
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  return (
    <div>
      <Sidebar>
        <div className="setting-container">
          <div className="setting-card">
            <h3>General Settings</h3>
            <form onSubmit={handleEdit}>
              <div className="inputBox">
                <span> PPN :</span>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  name="ppn"
                  defaultValue={data.ppn}
                  style={{ width: "95%" }}
                />
              </div>
              <div className="inputBox">
                <span> Initial:</span>
                <input
                 onChange={handleChange}
                  type="text"
                  required
                  name="initisal"
                  defaultValue={data.initisal}
                  style={{ width: "95%" }}
                />
              </div>
              <div className="inputBox">
                <span> Minimum Asset Price :</span>
                <input
                 onChange={handleChange}
                  type="text"
                  required
                  name="minimum_asset"
                  defaultValue={data["minimum_asset"]}
                  style={{ width: "95%" }}
                />
              </div>
              <div className="button-setting">
                <button className="btn btn-primary float-end">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};
