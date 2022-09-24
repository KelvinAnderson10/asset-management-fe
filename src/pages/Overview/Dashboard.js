import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/UseAuth";
import Loading from "../../shared/components/Loading/Loading";
import { useDeps } from "../../shared/context/DependencyContext";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import "./Dashboard.css";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import { TableAssetDeprecated } from "./components/TableAssetDeprecated";
import { useNavigate } from "react-router-dom";


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
  const [chartData2, setChartData2] = useState({ labels: [], datasets: [{}] });
  const [unitClusterData, setUnitClusterData] = useState({
    labels: [],
    datasets: [{}],
  });
  const [unitClusterData2, setUnitClusterData2] = useState({
    labels: [],
    datasets: [{}],
  });
  const [POData, setPOData] = useState({
    labels: [],
    datasets: [{}],
  });
  const [subproduct, setSubproduct] = useState([]);
  const [viewDetailSpending, setViewDetailSpending] = useState(false);
  const [viewDetailUnit, setViewDetailUnit] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const[viewAssetDep, setViewAssetDep] = useState(false)

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
      tap: savedUser.tap,
      cluster: savedUser.cluster,
      department: savedUser.department,
    }));
  };

  const getAllEventLog = async () => {
    try {
      if (user.role !== "Regular") {
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
    onGetTotalSpenCluster2();
    onGetTotalUniCluster2();
  }, [user.role]);

  const onGetTotalSpenCluster = async () => {
    try {
      const response = await dashboardService.getTotalSpendingCluster();
      console.log("ini response spending cluster", response);

      if (response.status === "SUCCESS") {
        const chartData = {
          labels: response.data.slice(0, 5).map((data) => data.Cluster),
          datasets: [
            {
              label: "Total Asset Spending By Cluster",
              data: response.data.map((data) => data.Total),
              backgroundColor: ["#B70621", "#ff7b7b"],
            },
          ],
        };
        setChartData(chartData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onGetTotalSpenCluster2 = async () => {
    try {
      const response = await dashboardService.getTotalSpendingCluster();
      console.log("ini response spending cluster", response);

      if (response.status === "SUCCESS") {
        const chartData = {
          labels: response.data.map((data) => data.Cluster),
          datasets: [
            {
              label: "Total Asset Spending By Cluster",
              data: response.data.map((data) => data.Total),
              backgroundColor: ["#B70621", "#ff7b7b"],
            },
          ],
        };
        setChartData2(chartData);
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
          labels: response.data.map((data) => data.Status),
          datasets: [
            {
              data: response.data.map((data) => data.Total),
              backgroundColor: [
                "rgb(255, 178, 0)",
                "rgb(183, 6, 33)",
                "rgb(92, 184, 92, 0.75)",
                "rgba(7, 124, 234, 0.714)",
              ],
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
              label: "Total Asset Units By Cluster",
              data: response.data.map((data) => data.Total),
              backgroundColor: ["#2d85c5", "#a5d3eb "],
            },
          ],
        };
        setUnitClusterData(chartData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onGetTotalUniCluster2 = async () => {
    try {
      const response = await dashboardService.getTotalUnitAssetCluster();
      console.log("ini response unit", response);

      if (response.status === "SUCCESS") {
        const chartData = {
          labels: response.data.slice(0, 5).map((data) => data.Cluster),
          datasets: [
            {
              label: "Total Asset Units By Cluster",
              data: response.data.map((data) => data.Total),
              backgroundColor: ["#2d85c5", "#a5d3eb "],
            },
          ],
        };
        setUnitClusterData2(chartData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onGetTotalAsset = async () => {
    try {
      const response = await dashboardService.getAllCountAsset();
      response.data = formatCash(response.data);
      setCountAsset(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onGetAssetAlmostDeprecated = async (page) => {
    try {
      const response = await dashboardService.getAssetAlmostDeprecated(page);
      console.log('response asset deprecated',response)
      response.count = formatCash(response.count);
      setCountAssetDeprecated(response.count);
      setPageCount(Math.ceil(response.count / 10));
    } catch (e) {
      console.log(e);
    }
  };

  const onGetTotalPO = async () => {
    try {
      const response = await dashboardService.getTotalPO();
      response.data = formatCash(response.data);
      setTotalPO(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  let format;
  const onGetSumAssetValue = async () => {
    try {
      const response = await dashboardService.getSumAssetValue();
      console.log("ini sum", response);
      if (response.data < 0) {
        format = "-" + formatCash(-1 * response.data);
      } else {
        format = formatCash(response.data);
      }
      format = "Rp" + " " + format;
      setsumAssetValue(format);
    } catch (e) {
      console.log(e);
    }
  };

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  const onClickViewSpending = () => {
    setViewDetailSpending(true);
  };

  const onClickCloseViewSpending = () => {
    setViewDetailSpending(false);
  };
  const onClickViewUnit = () => {
    setViewDetailUnit(true);
  };

  const onClickCloseViewUnit = () => {
    setViewDetailUnit(false);
  };

  const navigate = useNavigate()
  const onClickViewAssetDep = ()=>{
    navigate('/main/tableassetdeprecated', {replace: false})

  }
  document.querySelector("body").style.overflow = "auto";
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
                <a style={{ color: "white", fontSize: "20px" }}>Total Asset</a>
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
                <i class="fa fa-archive" style={{ color: "white" }}></i>
              </div>
              
              <div onClick={onClickViewAssetDep} title='Click to View Detail' className="content-non-icon" style={{cursor: "pointer"}}>
                <a className="count-number">{countAssetDeprecated}</a>
                <a  style={{ color: "white", fontSize: "20px" }}>
                  Total Asset Deprecated
                </a>
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
                <i class="fa fa-shopping-bag" style={{ color: "white" }}></i>
              </div>
              <div className="content-non-icon">
                <a className="count-number">{totalPO} </a>
                <a style={{ color: "white", fontSize: "20px" }}>
                  Total Purchase Order
                </a>
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
                <FaIcons.FaCoins color="white" />
              </div>
              <div className="content-non-icon">
                <a className="count-number">{sumAssetValue} </a>
                <a style={{ color: "white", fontSize: "20px" }}>
                  Sum Asset Value
                </a>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="content-dashboard-center">
            <div className="piechart">
              <div className="title-piechart">
                <p>Status Purchase Request</p>
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
                    {subproduct ? (
                      subproduct.map((item) => (
                        <tr>
                          <td>{item.Subproduct_Name}</td>
                          <td>{item.Total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <th>No Data</th>
                      </tr>
                    )}
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
            <div className="grafik-box" onClick={onClickViewSpending}>
              <BarChart index={"x"} chartData={chartData} />
            </div>
            <div className="grafik-box" onClick={onClickViewUnit}>
              <BarChart index={"x"} chartData={unitClusterData2} />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}

      {viewDetailSpending && (
        <div className="view-spending-container">
          <div className="box-spending-cluster-detail">
            <div className="close-spending">
              <CgIcons.CgClose
                size={"2em"}
                onClick={onClickCloseViewSpending}
              />
            </div>
            <div>
              <BarChart index={"y"} chartData={chartData2} />
            </div>
          </div>
        </div>
      )}
      {viewDetailUnit && (
        <div className="view-spending-container">
          <div className="box-spending-cluster-detail">
            <div className="close-spending">
              <CgIcons.CgClose size={"2em"} onClick={onClickCloseViewUnit} />
            </div>
            <div>
              <BarChart index={"y"} chartData={unitClusterData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
