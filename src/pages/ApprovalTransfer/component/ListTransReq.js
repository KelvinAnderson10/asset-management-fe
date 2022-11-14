import React from 'react'
import Loading from '../../../shared/components/Loading/Loading'
import { UseAppTrans } from '../UseAppTrans'
import { NoData } from "../../../shared/components/NoData/NoData";
import { Modal} from "react-bootstrap";
import { STATUS } from '../../../shared/constants';

export const ListTransReq = ({listData = [], showButton = true}) => {
    const {
        loading,
        handleApproveRequest,
        handleRejectRequest,
        detailRequest,
        detailAsset,
        handleShowModalRequest,
        setShowModalReq,
        showModalReq
    } = UseAppTrans()

  return (
    <>
            { listData.length === 0 ?(
                <NoData />
            ) : (
                listData.map((data) => (
                    <div
                      className="container-fluid bg-light shadow-sm rounded-2 p-2 mb-3"
                      style={{cursor : "pointer"}}
                      key={data.to_id}
                      onClick={() => {handleShowModalRequest(data)}}
                    >
                      <div className="d-flex flex-row justify-content-between px-5">
                        <div className="text-white rounded-2 mb-2 fw-bold" style={{backgroundColor : "rgb(183, 6, 33)", width: "2.5vw"}}>{data.to_id}</div>
                        <div
                          className="text-white rounded-2 mb-2 fw-bold"
                          style={{backgroundColor: data.status === STATUS.CREATE_PO ? "rgb(255, 178, 0)" : data.status === STATUS.TRANSFERRED ? 'rgb(92, 184, 92)' :  'rgb(183, 6, 33)', width: "8vw" }}
                        >
                          {data.status}
                        </div>
                      </div>
                      <div className="mx-5 text-start fw-semibold fs-6">
                        <div className="row">
                            <div className="col">
                              <a>Requester</a>
                              <a>: {data.requester}</a>
                            </div>
                            <div className="col">
                              <a>Target Location</a>
                              <a>: {data.TAPDestination}</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                              <a>To</a>
                              <a>: {data.ToUser}</a>
                            </div>
                            <div className="col">
                              <a>Asset Number</a>
                              <a>: {data["Nomor Asset"]}</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                              <a>Request Date</a>
                              <a>: {new Date(data.CreatedAt).toLocaleDateString('in-ID')}</a>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                      </div>
                    </div>
                ))
            )}

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
                    className="btn btn-danger button-cancel"
                    onClick={() => {
                      handleRejectRequest(detailRequest["to_id"]);
                    }}
                    style={{marginRight : "8px"}}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary button-submit"
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