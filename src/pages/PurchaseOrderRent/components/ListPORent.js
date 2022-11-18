import React from 'react'
import Loading from '../../../shared/components/Loading/Loading';
import { NoData } from '../../../shared/components/NoData/NoData';
import { UsePORent } from './UsePORent'
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import ReactPaginate from 'react-paginate';
export const ListPORent = () => {
    const {handleClickDetailRent, currentPage, handlePageClick, rentData,user,totalPage} = UsePORent();

  return (
    <div className="po-mtnc-list-container">
        <div className="po-mtnc-box-container">
          <div className="po-mtnc-list-card">
            {rentData.length === 0 ? (
              <NoData />
            ) : (
              rentData.map((data) => (
                <div
                  className="po-mtnc-list-box-item"
                  key={data.po_id}
                  onClick={() => handleClickDetailRent(data.po_id)}
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
                          <a className="text">To</a>
                        </div>
                        <div className="sub-title-content">
                          <a className="text">: {data.User}</a>
                        </div>
                      </div>
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          <a className="text">Position</a>
                        </div>
                        <div className="sub-title-content">
                          <a className="text">: {data.Jabatan}</a>
                        </div>
                      </div>
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          <a className="text">Item Name</a>
                        </div>
                        <div className="sub-title-content">
                          <a className="text">: {data["Nama Barang"]}</a>
                        </div>
                      </div>
                    </div>
                    <div className="box-content-po">
                      <div className="row-content-po">
                        <div className="sub-title-content">
                          {user.cluster != "HO" && <a className="text">Approved By GM </a>}
                          
                        </div>
                        <div className="sub-title-content">
                          {data.approved_level1 == true && (
                            <a className="text">
                              <BsIcons.BsCheckCircleFill
                                color="rgb(92, 184, 92)"
                                size="1.2em"
                              />{" "}
                            </a>
                          )}
                          {data.approved_level1 == false && (
                            <a className="text">
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
                          {user.cluster != "HO" && <a className="text">Approved By VP Trade</a>}
                          
                        </div>
                        <div className="sub-title-content">
                          {data.approved_level2 == true && (
                            <a className="text">
                              <BsIcons.BsCheckCircleFill
                                color="rgb(92, 184, 92)"
                                size="1.2em"
                              />{" "}
                            </a>
                          )}
                          {data.approved_level2 == false && (
                            <a className="text">
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
                          {user.cluster != "HO" && <a className="text">Approved By GA/IT</a>}
                        </div>
                        <div className="sub-title-content">
                          {data.approved_level3 == true && (
                              <a className="text">
                                <BsIcons.BsCheckCircleFill
                                  color="rgb(92, 184, 92)"
                                  size="1.2em"
                                />{" "}
                              </a>
                            )}
                          {data.approved_level3 == false && (
                              <a className="text">
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
                      <a style={{ fontSize: "14px" }}>{data.CreatedAt}</a>
                    </div>
                </div>
              ))
            )}
            <div
              key={totalPage}
              style={{ marginRight: "2vw", marginTop: "1vh" }}
            >
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={totalPage}
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
  )
}
