import { async } from "@firebase/util";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, ButtonGroup, Dropdown, Form, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../services/UseAuth";
import { Failed } from "../../shared/components/Notification/Failed";
import { useDeps } from "../../shared/context/DependencyContext";

export const ViewRent = () => {
  const [datas, setDatas] = useState([]);
  const { overviewService, rentService } = useDeps();
  const [pageCount, setPageCount] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected);
  };
  const [loading, setLoading] = useState(false)

  const [searchCluster, setSearchCluster] = useState("");
  const [searchTAP, setSearchTAP] = useState("");
  const [searchStatusActv, setSearchStatusActv] = useState("");
  const [searchJnsTmpt, setSearchJnsTmpt] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [iom, setIom] = useState('');
  const [idUser, setIdUser] = useState()

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Get User
  const { getCookie } = useAuth();
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

  useEffect(() => {
    onGetCookie();
  }, []);

  const getRentPagination = async (currentPage) => {
    try {
      const response = await overviewService.getAssetRentPagination(
        currentPage
      );
      for (let i in response.data){
        response.data[i].tanggal_jatuh_tempo = moment(response.data[i].tanggal_jatuh_tempo).format("YYYY-MM-DD");
      }
      console.log("ini data rent", response.data);
      setDatas(response.data);
      setTotalAsset(response.count);
      setPageCount(Math.ceil(response.count / 10));
    } catch (error) {}
  };

  useEffect(() => {
    if (user.role == "Admin" || user.role == "GA") {
      getRentPagination(1);
    }
  }, [user.role]);

  useEffect(() => {
    if (
      searchCluster == "" &&
      searchTAP == "" &&
      searchStatusActv == "" &&
      searchJnsTmpt == ""
    ) {
      if (user.role == "Admin" || user.role == "GA") {
        getRentPagination(currentPage + 1);
      }
    } else {
      onFilterMultiple(
        searchCluster,
        searchTAP,
        searchStatusActv,
        searchJnsTmpt,
        currentPage + 1
      );
    }
  }, [currentPage]);

  const onFilterMultiple = async (cluster, tap, statusActv, jnsTmpt, page) => {
    if (user.role == "Admin" || user.role == "GA") {
      try {
        const response = await overviewService.filterPORentByMultipleCondition(
          cluster,
          tap,
          statusActv,
          jnsTmpt,
          page
        );
        setDatas(response.data);
        setTotalAsset(response.count);
        setPageCount(Math.ceil(response.count / 10));
      } catch (e) {
        throw e;
      }
    }
  };

  const onClearFormFilter = () => {
    setSearchCluster("");
    setSearchTAP("");
    setSearchStatusActv("");
    setSearchJnsTmpt("");
    if (user.role == "Admin" || user.role == "GA") {
      getRentPagination(1);
    }
    setCurrentPage(0);
  };

  const updateStatusAndIom = async (id, status, iom) => {
    try {
      const response = await rentService.updateStatusRentAndIom(id, status, iom);
      if (response.status === "SUCCESS") {
        Swal.fire("Success!", "Status has been updated.", "success");
      }
    } catch (e) {
      console.log(e.response);
      Failed("Failed to approved");
    } finally{
      getRentPagination(1)
    }
  };

  const onDeliveredRent = async (e, id, iom) => {
    e.preventDefault(e);
    setShowModal(true)
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to update status active this rent",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want!",
      }).then((result) => {
        if (result.isConfirmed) {
          updateStatusAndIom(id, 'Active', iom);
        }
      });      
    } catch (error) {
      console.log(error)
    } finally {
      setShowModal(false)
    }
    
  };

  const openModal = (id) => {
    setShowModal(true)
    handleGetRentById(id)
  }

  const handleGetRentById = async(id) => {
    try {
      const response = await rentService.getRentById(id)
      // console.log('ini id user', response.data);
      setIdUser(response.data.po_id)
    } catch (e) {
      throw e;
    }
  }

  const onViewDetail = async(id)=>{
    try {
      const response = await rentService.getRentById(id)
     
        response.data.periode_sewa_awal = moment(response.data.periode_sewa_awal).format("YYYY-MM-DD");
        response.data.periode_sewa_akhir = moment(response.data.periode_sewa_akhir).format("YYYY-MM-DD");
        response.data.tanggal_jatuh_tempo = moment(response.data.tanggal_jatuh_tempo).format("YYYY-MM-DD");
 
      navigate("/main/rent", {state: { detail: response.data }})

    } catch (error) {
      console.log(error)
    }
  }

  // useEffect (()=>{
  //   if (rowData.length != 0){
  //     navigate("/main/rent", {state: { detail: rowData }})
  //   }
  // },[rowData])

  return (
    <div className="overview-container">
      <div className="overview-card">
        <div className="search-container">
          <div className="box-search-container">
            <div className="search-box-item">
              <div className="title-search">
                <a>Cluster:</a>
              </div>
              <input
                value={searchCluster}
                type="text"
                className="input-search"
                placeholder="Cluster"
                onChange={(e) => setSearchCluster(e.target.value)}
              />
            </div>
            <div className="search-box-item">
              <div className="title-search">
                <a>TAP:</a>
              </div>
              <input
                value={searchTAP}
                type="text"
                className="input-search"
                placeholder="TAP"
                onChange={(e) => setSearchTAP(e.target.value)}
              />
            </div>
          </div>
          <div className="box-search-container">
            <div className="search-box-item">
              <div className="title-search">
                <a>Status:</a>
              </div>
              <input
                value={searchStatusActv}
                type="text"
                className="input-search"
                placeholder="Status"
                onChange={(e) => setSearchStatusActv(e.target.value)}
              />
            </div>
            <div className="search-box-item">
              <div className="title-search">
                <a>Type of Place:</a>
              </div>
              <input
                value={searchJnsTmpt}
                type="text"
                className="input-search"
                placeholder="Type of Place"
                onChange={(e) => setSearchJnsTmpt(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="button-search-container">
          <button
            value="submit"
            className="btn btn-primary btn-sm"
            style={{ marginRight: "15px" }}
            onClick={() => {
              setCurrentPage(0);
              onFilterMultiple(
                searchCluster,
                searchTAP,
                searchStatusActv,
                searchJnsTmpt,
                1
              );
            }}
          >
            Search
          </button>
          <button
            onClick={onClearFormFilter}
            value="submit"
            className="btn btn-warning btn-sm"
            style={{ backgroundColor: "rgb(255, 178, 0)" }}
          >
            Clear
          </button>
          <div className="clearfix">
            <a style={{ fontSize: "12px" }}>
              Showing {datas.length} out of {totalAsset}{" "}
            </a>
          </div>
          <div key={pageCount} style={{ marginRight: "2vw", marginTop: "1vh" }}>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
              forcePage={currentPage}
            />
          </div>
        </div>
        <div className="table-container">
          <div className="table-box">
            <table className="table table-bordered table-striped table-responsive table-hover">
              <thead className="table-header">
                <tr>
                  <th>No</th>
                  <th style={{ minWidth: "150px" }}>Action</th>
                  <th style={{ minWidth: "200px" }}>Item Name</th>
                  <th>Status</th>
                  <th style={{ minWidth: "150px" }}>Cluster</th>
                  <th style={{ minWidth: "200px" }}>TAP</th>
                  <th style={{ minWidth: "150px" }}>Type of Place</th>
                  <th style={{ minWidth: "200px", textAlign: 'left' }}>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {datas.length === 0 ? (
                  <tr>
                    <th colSpan="8">Data is not found</th>
                  </tr>
                ) : (
                  datas.map((data, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <th style={{ fontSize: "14px", fontWeight: "normal" }}>
                        <Dropdown as={ButtonGroup}>
                          <Button variant="light">
                            <a
                              onClick={() =>onViewDetail(data.po_id)
                              }
                              className="view"
                              data-toggle="modal"
                              style={{
                                cursor: "pointer",
                                width: "50%",
                                textDecoration: "none",
                                display: "flex",
                                marginTop: "3px",
                              }}
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="View"
                                style={{ fontSize: "24px", color: "darkblue" }}
                              >
                                &#xe8f4;
                              </i>
                              <p>Detail</p>
                            </a>
                          </Button>
                          {(user.level_approval == "GA" ||
                              user.role == "Admin") && data.rent_status=='-' && (
                          <>
                          <Dropdown.Toggle
                            split
                            variant="light"
                            id="dropdown-split-basic"
                          />
                          <Dropdown.Menu>
                           
                              <Dropdown.Item>
                                <a
                                  onClick={() => openModal(data.po_id)}
                                  className="edit"
                                  data-toggle="modal"
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    display: "flex",
                                    marginTop: "3px",
                                  }}
                                >
                                  <i
                                    className="material-icons"
                                    data-toggle="tooltip"
                                    title="Edit"
                                    style={{ fontSize: "25px" }}
                                  >
                                    &#xe3c9;
                                  </i>
                                  <p style={{ color: "black" }}>Active</p>
                                </a>
                              </Dropdown.Item>
                            
                          </Dropdown.Menu>
                          </>
                          )}
                        </Dropdown>
                      </th>
                      <td>{data["Nama Barang"]}</td>
                      <td>
                        {" "}
                        <Badge
                          bg={data.rent_status == 'Active' ? "success" : "danger"}
                        >
                          {data.rent_status == '-'
                            ? "-"
                            : data.rent_status == 'Expired'
                            ? "Expired"
                            : "Active"}
                        </Badge>{" "}
                      </td>
                      <td>{data.Cluster}</td>
                      <td>{data.TAP}</td>
                      <td>{data.jenis_tempat}</td>
                      <td>{data.tanggal_jatuh_tempo}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* VIEW MODAL */}
      <div className="model-box-view">
        <Modal
          // dialogClassName="view-modal"
          show={showModal}
          onHide={handleCloseModal}
          centered
          // backdrop="static"
          // keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Input Internal Office Memo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Internal Office Memo</Form.Label>
              <Form.Control
                type="Internal Office Memo"
                placeholder="Internal Office Memo"
                autoFocus
                required
                onChange={(e)=>setIom(e.target.value)}
                value={iom}
              />
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="button-asset">
                  <button
                    className="btn btn-outline-danger button-cancel"
                    onClick={() => {
                      setShowModal(false)
                    }}
                    style={{marginRight : "8px"}}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary float-end"
                    onClick={(e) => onDeliveredRent(e, idUser, iom)}
                    // disabled={disableSubmit}
                  >
                    Activated
                  </button>
                </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
