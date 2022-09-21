import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/UseAuth";
import Loading from "../../shared/components/Loading/Loading";
import { useDeps } from "../../shared/context/DependencyContext";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import "./Dashboard.css";

export const Dashboard = () => {
  const { eventLogService, dashboardService } = useDeps();
  const [event, setEvent] = useState([]);
  const [countAsset, setCountAsset] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const { getCookie } = useAuth();
  const [countAssetDeprecated, setCountAssetDeprecated] = useState(0);
  const [totalPO, setTotalPO] = useState(0);
  const [sumAssetValue, setsumAssetValue] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [unitClusterData, setUnitClusterData] = useState({
    labels: [],
    datasets: [{}],
  });
  const [POData, setPOData] = useState({
    labels: [],
    datasets: [{}],
  });
  const [subproduct, setSubproduct] = useState([]);

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
    onGetAssetAlmostDeprecated();
    onGetTotalPO();
    onGetSumAssetValue();
    onGetTotalSpenCluster();
    onGetTotalUniCluster();
    onGetTotalSubproduct();
    onGetPODataByStatus();
  }, [user.role]);

  const onGetTotalSpenCluster = async () => {
    try {
      const response = await dashboardService.getTotalSpendingCluster();
      console.log("ini response spending cluster", response);

      if (response.status === "SUCCESS") {
        const chartData = {
          labels: response.data.map((data) => data.Cluster),
          datasets: [
            {
              label: "Total Spending Cluster",
              data: response.data.map((data) => data.Total),
              backgroundColor: ["#B70621"],
              
            },
          ],
        };
        setChartData(chartData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onGetPODataByStatus = async () => {
    try {
      const response = await dashboardService.getTotalPOByStatus();
      console.log("ini response spending cluster", response);

      if (response.status === "SUCCESS") {
        const chartData = {
          labels:response.data.map((data) => data.Status),
          datasets: [
            {
              label: "Total Spending Cluster",
              data: response.data.map((data) => data.Total),
              backgroundColor: ['rgb(255, 178, 0)',"rgb(183, 6, 33)",'rgb(92, 184, 92, 0.75)','rgba(7, 124, 234, 0.714)',],
            },
          ],
        };
        setPOData(chartData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onGetTotalSubproduct = async () => {
    try {
      const response = await dashboardService.getTotalAssetBySubProduct();
      console.log("ini response subproduct ", response);
      setSubproduct(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onGetTotalUniCluster = async () => {
    try {
      const response = await dashboardService.getTotalUnitAssetCluster();
      console.log("ini response unit", response);

      if (response.status === "SUCCESS") {
        const chartData = {
          labels: response.data.map((data) => data.Cluster),
          datasets: [
            {
              label: "Total Unit By Cluster",
              data: response.data.map((data) => data.Total),
              backgroundColor: ["#B70621"],
            },
          ],
        };
        setUnitClusterData(chartData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onGetTotalAsset = async () => {
    try {
      const response = await dashboardService.getAllCountAsset();
      setCountAsset(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onGetAssetAlmostDeprecated = async () => {
    try {
      const response = await dashboardService.getAssetAlmostDeprecated();
      setCountAssetDeprecated(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onGetTotalPO = async () => {
    try {
      const response = await dashboardService.getTotalPO();
      setTotalPO(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onGetSumAssetValue = async () => {
    try {
      const response = await dashboardService.getSumAssetValue();
      setsumAssetValue(response.data);
    } catch (e) {
      console.log(e);
    }
  };

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
                <a className="count-number">{countAssetDeprecated}</a>
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
                <a className="count-number">{totalPO} </a>
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
                <a className="count-number">{sumAssetValue} </a>
                <a style={{ color: "white" }}>Total Asset</a>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="content-dashboard-center">
            <div className="piechart">
              <div className="title-piechart" >
              <p>Status Purchase Order</p>
              </div>
              <div>
              <PieChart chartData={POData} />
              </div>
              
            </div>
            <div className="linechart">
              <div className="table-subproduct ">
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Subproduct Name</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subproduct.map((item) => (
                      <tr>
                        <td>{item.Subproduct_Name}</td>
                        <td>{item.Total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              <BarChart chartData={chartData} />
            </div>
            <div className="grafik-box">
              <BarChart chartData={unitClusterData} />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
};
