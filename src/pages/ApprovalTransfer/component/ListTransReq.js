import React from 'react'
import Loading from '../../../shared/components/Loading/Loading'
import { UseAppTrans } from '../UseAppTrans'
import { NoData } from "../../../shared/components/NoData/NoData";
import { Modal} from "react-bootstrap";
import { STATUS } from '../../../shared/constants';
import ReactPaginate from 'react-paginate';

export const ListTransReq = ({listData = [], showButton = true}) => {
    const {
        loading,
        handleApproveRequest,
        handleRejectRequest,
        detailRequest,
        detailAsset,
        handleShowModalRequest,
        setShowModalReq,
        showModalReq,
        handlePageClick,
        handlePageClick2,
        totalPage,
        totalPageApp,
        currentPage
    } = UseAppTrans()

  return (
    <>
          <div className="approval-inv-list-container">
          <div className="approval-inv-box-container">
          <div className="approval-inv-list-card">

            { listData.length === 0 ?(
              <NoData />
              ) : (
                listData.map((data) => (
                  <div
                  className="approval-inv-box-item"
                  style={{cursor : "pointer"}}
                  key={data.to_id}
                  onClick={() => {handleShowModalRequest(data)}}
                  >
                      <div  className="header-list-approval">
                      <a className="approval-num">{data.to_id}</a>
                        <div
                          className="text-white rounded-2 mb-2"
                          style={{backgroundColor: data.status === STATUS.CREATE_PO ? "rgb(255, 178, 0)" : data.status === STATUS.TRANSFERRED ? 'rgb(92, 184, 92)' :  'rgb(183, 6, 33)', width: "8vw" }}
                          >
                          {data.status}
                        </div>
                      </div>
                      <div className="approval-content-container">
                        <div className="box-content-approval">
                            <div className="row-content-approval">
                              <div className="sub-title-content" >
                              <a className="text">Requester</a>
                              </div>
                              <div className="sub-title-content">
                              <a className="text">: {data.requester}</a>
                              </div>
                            </div>
                            <div className="row-content-approval">
                              <div className="sub-title-content" >
                              <a className="text">Target Location</a>
                              </div>
                              <div className="sub-title-content">
                              <a className="text">: {data.TAPDestination}</a>
                              </div>
                            </div>
                        </div>

                        <div className="box-content-approval">
                            <div className="row-content-approval">
                              <div className="sub-title-content">
                              <a className="text">To</a>
                              </div>
                              <div className="sub-title-content">
                              <a className="text">: {data.ToUser}</a>
                              </div>
                            </div>
                            <div className="row-content-approval">
                              <div className="sub-title-content">
                              <a className="text" >Asset Number</a>
                              </div>
                              <div className="sub-title-content">

                              <a className="text">: {data["Nomor Asset"]}</a>
                              </div>
                            </div>
                        </div>
                      </div>
                      <div className="date-approval">
                      <a className="text">{data.CreatedAt}</a>

                      </div>
                    </div>
                ))
                )}
                <div
              key={totalPageApp}
              style={{ marginRight: "2vw", marginTop: "1vh" }}
            >
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={totalPageApp}
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
                // forcePage={currentPage}
              />
            </div>
                </div>
                </div>
          </div>

        {
          <div className="model-box-view">
            <Modal
              dialogClassName="view-modal"
              show={showModalReq}
              onHide={() => {
                setShowModalReq(false)
              }}
              backdrop="static"
              keyboard={false}
              size='lg'
            >
              <Modal.Header closeButton>
                <Modal.Title>Transfer Asset Request</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                    <div className="form-group">
                    <div className="image-view">
                        <img src={detailAsset["Asset Image"]}></img>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3 mt-3">
                          <label>No Asset</label>
                          <input
                            type="text"
                            className="form-control"
                            value={detailAsset["Nomor Asset"]}
                            readOnly
                          />
                        </div>
                        <div className="col-md-6 mb-3 mt-3">
                          <label>Asset Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={detailAsset["Nama Barang"]}
                            readOnly
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Asset Category</label>
                          <input
                            type="text"
                            className="form-control"
                            value={detailAsset["Kategori Aset Tetap"]}
                            readOnly
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Original Location</label>
                          <input
                            type="text"
                            className="form-control"
                            value={detailAsset["Lokasi"]}
                            readOnly
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Target User<span style={{color : "red"}}>*</span> </label>
                          <input
                            type="text"
                            className="form-control"
                            value={detailRequest["ToUser"]}
                            readOnly
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Target User Position<span style={{color : "red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            value={detailRequest["Jabatan"]}
                            readOnly
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Target Location<span style={{color : "red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            value={detailRequest["TAPDestination"]}
                            readOnly
                          />
                        </div>
                    </div>
                    </div>
                </div>
            </Modal.Body>
            { (detailAsset["Nomor Asset"] && showButton) &&
              <Modal.Footer>
                <div className="">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleRejectRequest(detailRequest["to_id"]);
                    }}
                    style={{marginRight : "8px"}}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary "
                    onClick={() => {
                      handleApproveRequest(detailRequest["to_id"]);
                    }}
                  >
                    Approve
                  </button>
                </div>
              </Modal.Footer>
            }
          </Modal>
        </div>  
        }
        {loading && <Loading />}
    </>
  )
}
