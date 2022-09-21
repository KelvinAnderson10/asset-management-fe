import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/UseAuth";
import Loading from "../../shared/components/Loading/Loading";
import { useDeps } from "../../shared/context/DependencyContext";
import BarChart from "./components/BarChart";
import "./Dashboard.css";

export const Dashboard = () => {
  const { eventLogService, dashboardService } = useDeps();
  const [event, setEvent] = useState([]);
  const [countAsset, setCountAsset] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const { getCookie } = useAuth();
  const [spendCluster, setSpendCluster] = useState([])
  const [user, setUser] = useState({
    name: "",
    role: "",
    level_approval: "",
    location_id: "",
    tap: "",
    cluster: "",
    department: "",
  });
  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      name: savedUser.name,
      role: savedUser.role,
      level_approval: savedUser.level_approval,
      location_id: savedUser.location_id,
      tap: savedUser.TAP,
      cluster: savedUser.Cluster,
      department: savedUser.department,
    }));
  };

  const getAllEventLog = async () => {
    try {
      if (user.role === "GA" || user.role === "Admin") {
        const response = await eventLogService.getEventLog();
        for (let i in response.data) {
          response.data[i]["CreatedAt"] = moment(
            response.data[i]["CreatedAt"]
          ).format("YYYY-MM-DDTHH:MM");
        }
        setEvent(response.data);
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    onGetCookie();
    getAllEventLog();
    onGetTotalAsset();
    onGetTotalSpenCluster();
  }, [user.role]);

  // const [clusterData, setClusterData] = useState({
  //   labels: spendCluster.map((data) => data.Cluster),
  //   datasets: [
  //     {
  //       label: "Total Spending Cluster",
  //       data: spendCluster.map((data) => data.Total),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  // console.log('ini spend',spendCluster)
  // console.log('ini cluster',clusterData)
 
  const onGetTotalAsset = async () => {
    try {
      const response = await dashboardService.getAllCountAsset();
      setCountAsset(response.data);
    } catch (e) {
      console.log(e)
    }
  };

  const onGetTotalSpenCluster = async ()=>{
    try {
      const response = await dashboardService.getTotalSpendingCluster();
      setSpendCluster(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-card">
          {/* <div className="content-dashboard"> */}
          <div className="content-dashboard-top">
            <div
              className="count-dashboard"
              style={{
                backgroundImage:
                  "linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )",
              }}
            >
              <div className="content-icon">
                <i className="fa fa-building-o" style={{ color: "white" }} />
              </div>
              <div className="content-non-icon">
                <a className="count-number">{countAsset} </a>
                <a style={{ color: "white" }}>Total Asset</a>
              </div>
            </div>
            <div
              className="count-dashboard"
              style={{
                backgroundImage:
                  "radial-gradient( circle farthest-corner at 14.2% 24%,  rgba(239,61,78,1) 0%, rgba(239,61,78,0.81) 51.8%, rgba(239,61,78,0.63) 84.6% )",
              }}
            >
              <div className="content-icon">
                <i className="fa fa-building-o" style={{ color: "white" }} />
              </div>
              <div className="content-non-icon">
                <a className="count-number">{countAsset}</a>
                <a style={{ color: "white" }}>Total Asset</a>
              </div>
            </div>
            <div
              className="count-dashboard"
              style={{
                backgroundImage:
                  "radial-gradient( circle farthest-corner at 14.2% 24%, rgba(246,191,13,1) 0%, rgba(246,191,13,0.85) 51.8%,rgba(246,191,13,0.66) 91.6% )",
              }}
            >
              <div className="content-icon">
                <i className="fa fa-building-o" style={{ color: "white" }} />
              </div>
              <div className="content-non-icon">
                <a className="count-number">{countAsset} </a>
                <a style={{ color: "white" }}>Total Asset</a>
              </div>
            </div>
            <div
              className="count-dashboard"
              style={{
                backgroundImage:
                  "radial-gradient( circle farthest-corner at 14.2% 24%,rgb(32, 108, 221,1) 0%,rgba(32, 108, 221, 0.85) 51.8%,rgb(32, 108, 221,0.63) 84.6% )",
              }}
            >
              <div className="content-icon">
                <i className="fa fa-building-o" style={{ color: "white" }} />
              </div>
              <div className="content-non-icon">
                <a className="count-number">{countAsset} </a>
                <a style={{ color: "white" }}>Total Asset</a>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="content-dashboard-center">
            <div className="linechart">
              {/* <BarChart chartData={userData} /> */}
            </div>
            <div className="eventlog-container">
              <div className="title-recent">
                <h5>Recent Activity</h5>
              </div>

              <div className="eventlog-box">
                {event.length === 0 ? (
                  <p></p>
                ) : (
                  event.map((data) => (
                    <div className="eventlog-box-content">
                      <a>{data.user}</a>
                      <a> : </a>
                      <a>{data.event}</a>
                      <br />
                      <a style={{ color: "white" }}>{data.CreatedAt}</a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="content-dashboard-bottom">
            <div className="grafik-box">
              {/* <BarChart chartData={clusterData} /> */}
            </div>

            <div className="grafik-box">
              {/* <BarChart chartData={userData} /> */}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
};
