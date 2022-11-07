import React, { useEffect, useState } from "react";
import { useAuth } from "../../../services/UseAuth";
import { useDeps } from "../../../shared/context/DependencyContext";
import "./ListPOMaintenance.css";
import * as CgIcons from "react-icons/cg";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import Loading from "../../../shared/components/Loading/Loading";
import { NoData } from "../../../shared/components/NoData/NoData";
import moment from "moment";
import { Modal } from "react-bootstrap";

export const ListPOMaintenance = () => {
  const [poData, setPOData] = useState([]);
  const [poDetailData, setPODetailData] = useState([]);
  const { purchaseOrderService } = useDeps();
  const [isLoading, setIsLoading] = useState(false);

  //Get All PO Maintenace
  const onGetAllPOByRequester = async (name) => {
    setIsLoading(true);
    try {
      const response = await purchaseOrderService.getPOByRequester(name);
      for (let i in response.data) {
        if (response.data[i].tipe == "Maintenance") {
          response.data[i].CreatedAt = moment(response.data[i].CreatedAt).format(
            "LL")
          setPOData((poData) => [...poData, response.data[i]]);
        }
      }
    } catch (e) {
      console.log(e.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetCookie();
  }, []);

  //Get User
  const { getCookie } = useAuth();
  const [user, setUser] = useState({
    name: "",
    role: "",
    level_po: "",
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
      level_po: savedUser.level_po,
      location_id: savedUser.location_id,
      tap: savedUser.tap,
      cluster: savedUser.cluster,
      department: savedUser.department,
    }));
  };

  useEffect(() => {
    onGetAllPOByRequester(user.name);
  }, [user.name]);

  //Get PO Detail
  const onGetPODetailById = async (id) => {
    try {
      const response = await purchaseOrderService.getPODetailById(id);
      for (let i in response.data) {
        if (response.data[i].ppn === true) {
          response.data[i].ppn = "Yes";
        } else {
          response.data[i].ppn = "No";
        }
      }
      getPOById(id);
      setPODetailData(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const [viewDetail, setViewDetail] = useState(false);
  const onClickPODetail = (id) => {
    setViewDetail(true);
    onGetPODetailById(id);
  };

  const onClickClocePODetail = () => {
    setViewDetail(false);
  };

  //Pagination PR
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(poData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = poData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const [POById, setPOById] = useState({});
  const getPOById = async (id) => {
    try {
      const response = await purchaseOrderService.getPOById(id);
      setPOById(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <>
      <div className="po-mtnc-list-container">
        <div className="po-mtnc-box-container">
          <div className="po-mtnc-list-card">
            {poData.length === 0 ? (
              <NoData />
            ) : (
              currentItems.map((data) => (
                <div
                  className="po-mtnc-list-box-item"
                  key={data.po_id}
                  onClick={() => onClickPODetail(data.po_id)}
                >
                  <div className="header-list-po">
                    <a className="po-num">{data.po_id}</a>
                    <a
                      className="status-po"
                      style={{
                        backgroundColor:
                          data.status == "Denied"
                            ? "rgb(183, 6, 33)"
                            : "rgb(255, 178, 0)" && data.status == "Approved"
                            ? "rgb(92, 184, 92, 0.75)"
                            : "rgb(255, 178, 0)" && data.status == "Delivered"
                            ? "rgba(7, 124, 234, 0.714)"
                            : "rgb(255, 178, 0)",
                      }}
                    >
                      {data.status}
                    </a>
                  </div>
                  <div className="po-content-container">
                    <div className="box-content-po">
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          <a>To</a>
                        </div>
                        <div className="sub-title-content">
                          <a>: {data.ToUser}</a>
                        </div>
                      </div>
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          <a>Location</a>
                        </div>
                        <div className="sub-title-content">
                          <a>: {data.TAP}</a>
                        </div>
                      </div>
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          <a>Product Type</a>
                        </div>
                        <div className="sub-title-content">
                          <a>: {data["Jenis Produk"]}</a>
                        </div>
                      </div>
                    </div>
                    <div className="box-content-po">
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          {user.cluster != "HO" && <a>Approved By GM </a>}
                          {user.cluster == "HO" && <a>Approved By SPV</a>}
                        </div>
                        <div className="sub-title-content">
                          {data.is_approved_level1 == true && (
                            <a>
                              <BsIcons.BsCheckCircleFill
                                color="rgb(92, 184, 92)"
                                size="1.2em"
                              />{" "}
                            </a>
                          )}
                          {data.is_approved_level1 == false && (
                            <a>
                              <AiIcons.AiFillCloseCircle
                                color="red"
                                size="1.2em"
                              />{" "}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          {user.cluster != "HO" && <a>Approved By VP Trade</a>}
                          {user.cluster == "HO" && <a>Approved By GA/IT</a>}
                        </div>
                        <div className="sub-title-content">
                          {data.is_approved_level2 == true && (
                            <a>
                              <BsIcons.BsCheckCircleFill
                                color="rgb(92, 184, 92)"
                                size="1.2em"
                              />{" "}
                            </a>
                          )}
                          {data.is_approved_level2 == false && (
                            <a>
                              <AiIcons.AiFillCloseCircle
                                color="red"
                                size="1.2em"
                              />{" "}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          {user.cluster != "HO" && <a>Approved By GA/IT</a>}
                        </div>
                        <div className="sub-title-content">
                          {data.is_approved_level3 == true &&
                            data.approver_level3 != "-" && (
                              <a>
                                <BsIcons.BsCheckCircleFill
                                  color="rgb(92, 184, 92)"
                                  size="1.2em"
                                />{" "}
                              </a>
                            )}
                          {data.is_approved_level3 == false &&
                            data.approver_level3 != "-" && (
                              <a>
                                <AiIcons.AiFillCloseCircle
                                  color="red"
                                  size="1.2em"
                                />{" "}
                              </a>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="date-request">
                      <a style={{ fontSize: "12px" }}>{data.CreatedAt}</a>
                    </div>
                </div>
              ))
            )}
          </div>
          <div className="pagination-list">
            <ul className="listNumbers">
              <li style={{ borderRadius: "1vh 0vh 0vh 1vh" }}>
                <button
                  onClick={handlePrevbtn}
                  disabled={currentPage == pages[0] ? true : false}
                >
                  <span class="material-icons">chevron_left</span>
                </button>
              </li>
              {pageDecrementBtn}
              {renderPageNumbers}
              {pageIncrementBtn}
              <li style={{ borderRadius: "0px 1vh 1vh 0px" }}>
                <button
                  onClick={handleNextbtn}
                  disabled={
                    currentPage == pages[pages.length - 1] ? true : false
                  }
                >
                  <span class="material-icons">chevron_right</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="model-box-view">
        <Modal
          dialogClassName="modal-90w"
          show={viewDetail}
          onHide={onClickClocePODetail}
          backdrop="static"
          keyboard={false}
          size='lg'
        >
          <Modal.Header closeButton>
          <Modal.Title style={{textAlign:'left', color:'#B70621'}} >PO Number {POById.po_id}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <div className="form-group">
            <div className="row">
            <div className="mb-2 col-md-4">
                    <label>Area Code</label>
                    <input
                      value={POById["Kode Wilayah"]}
                      readOnly
                      type="text"
                      name="Kode Wilayah"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2 col-md-4">
                    <label>To User</label>
                    <input
                      type="text"
                      name="ToUser"
                      className="form-control"
                      value={POById.ToUser}
                      readOnly
                    />
                  </div>
                  <div className="mb-2 col-md-4">
                    <label>Position</label>
                    <input
                      type="text"
                      name="Jabatan"
                      className="form-control"
                      value={POById.Jabatan}
                      readOnly
                    />
                  </div>
                  <div className="inputBoxPO mb-2 col-md-6 ">
                    <label>Subproduct Name</label>
                    <input
                      value={POById["Jenis Produk"]}
                      type="text"
                      name="Jenis Produk"
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="mb-2 col-md-6 ">
                    <label>Type</label>
                    <input
                      readOnly
                      value={POById.tipe}
                      type="text"
                      name="tipe"
                      className="form-control"
                    />
                  </div>
                  {poDetailData.length === 0 ? (
                    <p>Not request</p>
                  ) : (
                    poDetailData.map((data, index) => {
                      return (
                        <div
                          className="list-detail-po-container"
                          key={data.po_id_detail}
                        >
                          <div className="row" style={{ textAlign: "left" }}>
                            <div className="inputBoxPO mb-3">
                              <label>Item Name</label>
                              <input
                                readOnly
                                name="Nama Barang"
                                defaultValue={data["Nama Barang"]}
                              />
                            </div>

                            <div className="inputBoxPO mb-2 col-md-6 ">
                              <label>
                                1<span className="subscript">st</span> Vendor
                              </label>
                              <input
                                readOnly
                                name="vendor_1"
                                defaultValue={data.vendor_1}
                              />
                            </div>
                            <div className="inputBoxPO mb-2 col-md-6">
                              <label>
                                1<span className="subscript">st</span> Item
                                Price
                              </label>
                              <input
                                readOnly
                                type="number"
                                name="item_price_1"
                                defaultValue={data.item_price_1}
                              />
                            </div>
                            <div className="inputBoxPO mb-2 col-md-6 ">
                              <label>
                                2<span className="subscript">nd</span> Vendor
                              </label>
                              <input
                                readOnly
                                name="vendor_2"
                                defaultValue={data.vendor_2}
                              />
                            </div>
                            <div className="inputBoxPO mb-2 col-md-6">
                              <label>
                                2<span className="subscript">nd</span> Item
                                Price
                              </label>
                              <input
                                readOnly
                                type="number"
                                name="item_price_2"
                                defaultValue={data.item_price_2}
                              />
                            </div>
                            <div className="inputBoxPO mb-2 col-md-6 ">
                              <label>
                                3<span className="subscript">st</span> Vendor
                              </label>
                              <input
                                readOnly
                                name="vendor_3"
                                defaultValue={data.vendor_3}
                              />
                            </div>
                            <div className="inputBoxPO mb-2 col-md-6">
                              <label>
                                3<span className="subscript">rd</span> Item
                                Price
                              </label>
                              <input
                                type="number"
                                name="item_price_3"
                                readOnly
                                defaultValue={data.item_price_3}
                              />
                            </div>
                            <div className="inputBoxPO mb-2 col-md-4">
                              <label>Quantity</label>
                              <input
                                type="number"
                                name="quantity"
                                readOnly
                                defaultValue={data.quantity}
                              />
                            </div>
                            <div className="inputBoxPO mb-2 col-md-4">
                              <label>PPN</label>
                              <input
                                name="ppn"
                                readOnly
                                defaultValue={data.ppn}
                              />
                            </div>
                            <div className="inputBoxPO mb-2 col-md-4">
                              <label>
                                Additional Cost
                              </label>
                              <input
                                type="number"
                                name="Biaya Lain-Lain"
                                readOnly
                                defaultValue={data["Biaya Lain-Lain"]}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
            </div>

          </div>
         </Modal.Body>
        </Modal>
      </div>
      
      {isLoading && <Loading />}
    </>
  );
};
