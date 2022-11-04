import React from 'react'
import Loading from '../../../shared/components/Loading/Loading'
import { UseAppTrans } from '../UseAppTrans'
import { NoData } from "../../../shared/components/NoData/NoData";

export const ListTransReq = () => {
    const {reqList, loading} = UseAppTrans()

  return (
    <>
        <div className='container-fluid bg-secondary bg-opacity-10 rounded-2 mx-5 p-5'>
            { reqList.length === 0 ?(
                <NoData />
            ) : (
                reqList.map((data) => (
                    <div
                      className="container-fluid bg-light shadow-sm rounded-2 p-2"
                      style={{cursor : "pointer"}}
                      key={data.po_id}
                      onClick={() => {}}
                    >
                      <div className="d-flex flex-row justify-content-between px-5">
                        <div className="text-white rounded-2 mb-2 fw-bold" style={{backgroundColor : "rgb(183, 6, 33)", width: "2.5vw"}}>{data.to_id}</div>
                        <div
                          className="text-white rounded-2 mb-2 fw-bold"
                          style={{backgroundColor:"rgb(255, 178, 0)", width: "8vw" }}
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
                              <a>: {new Date(data.CreatedAt).toLocaleDateString()}</a>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                      </div>
                    </div>
                ))
            )}
        </div>
        {loading && <Loading />}
    </>
  )
}
