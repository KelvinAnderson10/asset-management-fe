import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Loading from "../../../shared/components/Loading/Loading";
import { NoData } from "../../../shared/components/NoData/NoData";
import { useDeps } from "../../../shared/context/DependencyContext";
import { UseApprovalRent } from "../UseApprovalRent";

export const ListApprovedRent = () => {
  const { appData1, user, isLoading, handleClickApproval,handlePageClick,
  totalPageApp } = UseApprovalRent();
  
 

  return (
    <div>
      <div className="approval-inv-list-container">
        <div className="approval-inv-box-container">
          <div className="approval-inv-list-card">
            {appData1.length === 0 ? (
              <NoData />
            ) : (
              appData1.map((data) => (
                <div
                  className="approval-inv-box-item"
                  key={data.po_id}
                  onClick={() => handleClickApproval(data.po_id)}
                >
                  <div className="header-list-approval">
                    <a className="approval-num">{data.po_id}</a>
                    <a
                      className="status-approval"
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
                  <div className="approval-content-container">
                    <div className="box-content-approval">
                      <div className="row-content-approval">
                        <div className="sub-title-content">
                          <a>Requester</a>
                        </div>
                        <div className="sub-title-content">
                          <a>: {data.requester}</a>
                        </div>
                      </div>
                      <div className="row-content-approval">
                        <div className="sub-title-content">
                          <a>To</a>
                        </div>
                        <div className="sub-title-content">
                          <a>: {data.User}</a>
                        </div>
                      </div>
                    </div>
                    <div className="box-content-approval">
                      <div className="row-content-approval">
                        <div className="sub-title-content">
                          <a>Location</a>
                        </div>
                        <div className="sub-title-content">
                          <a>: {data.TAP}</a>
                        </div>
                      </div>
                      <div className="row-content-approval">
                        <div className="sub-title-content">
                          <a>Item Name</a>
                        </div>
                        <div className="sub-title-content">
                          <a>: {data["Nama Barang"]}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="date-approval">
                    <a>{data.CreatedAt}</a>
                  </div>
                </div>
              ))
            )}
            <div
              key={totalPageApp}
              style={{ marginRight: "2vw", marginTop: "1vh" }}
            >
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
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
      {isLoading && <Loading />}
    </div>
  );
};
