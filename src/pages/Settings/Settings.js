import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useAuth } from "../../services/UseAuth";
import { Failed } from "../../shared/components/Notification/Failed";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { EVENT } from "../../shared/constants";
import { useDeps } from "../../shared/context/DependencyContext";
import "./Settings.css";
export const Settings = () => {
  const [data, setData] = useState({});
  const { eventLogService, generalSettingService } = useDeps();

  useEffect(() => {
    onGetGeneralSetting();
    onGetCookie()
  }, []);

  const onGetGeneralSetting = async () => {
    try {
      const response = await generalSettingService.getGeneralSetting();
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const createEventLogSetting = async (eventLog) => {
    try {
      await eventLogService.createEventLog(eventLog)
    } catch (e) {
      console.log(e);
    }
  }

  const { getCookie } = useAuth();
  const [user, setUser] = useState({
    name: "",
    position: "",
    role: "",
  });
  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      name: savedUser.name,
      position: savedUser.position,
      role: savedUser.role,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      data.ppn = Number(data.ppn)
      data.minimum_asset = Number(data.minimum_asset)
      const response = await generalSettingService.updateGeneralSetting(data);
      setData(response);
      let event = {
        event: EVENT.UPDATE_SETTING,
        user: user.name
      }
      createEventLogSetting(event);
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
