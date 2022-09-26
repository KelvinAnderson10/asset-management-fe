import React, { useState } from 'react'
import { useDeps } from '../../../shared/context/DependencyContext';
import { UseApprovalMaintenance } from '../UseApprovalMaintenance';
import * as CgIcons from 'react-icons/cg'
import { NoData } from '../../../shared/components/NoData/NoData';
import Loading from '../../../shared/components/Loading/Loading';

export const ListApprovedMaintenance = () => {
    const {appData1,isLoading } = UseApprovalMaintenance();
    const [poDetail, setPODetail] = useState([])
    const {purchaseOrderService} = useDeps()
  
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
    for (let i = 1; i <= Math.ceil(appData1.length / itemsPerPage); i++) {
      pages.push(i);
    }
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = appData1.slice(indexOfFirstItem, indexOfLastItem);
  
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
  
    //Get PO Detail 
    const onGetPODetailById = async (id) => {
      try {
          const response = await purchaseOrderService.getPODetailById(id)
          
          for (let i in response.data) {
              if (response.data[i].ppn === true){
                  response.data[i].ppn = 'Yes'
              } else {
                  response.data[i].ppn = 'No'
              }
          }
          getPOById(id)
          setPODetail(response.data)
         
      } catch (e) {
          console.log(e.response);
      }
    }
  
    //Detail
    const [viewDetail, setViewDetail] = useState(false)
    const onClickPODetail = (id) => {
      setViewDetail(true)
      onGetPODetailById(id)
    }
  
    const onClickClocePODetail = () => {
        setViewDetail(false)
    }
  
    const [POById, setPOById] = useState({})
    const getPOById = async (id) => {
      try {
        const response = await purchaseOrderService.getPOById(id)
        setPOById(response.data)
        
    } catch (e) {
        console.log(e.response);
    }
    }
  
    return (
      <div>
        <div className='approval-inv-list-container'>
        <div className="approval-inv-box-container">
          <div className="approval-inv-list-card">
            {appData1.length === 0 ? (
              <NoData/>
            ) : (
              currentItems.map((data) => (
                <div
                  className="approval-inv-box-item"
                  key={data.po_id}
                  onClick={()=>onClickPODetail(data.po_id)}
                >
                  <div className="header-list-approval">
                    <a className="approval-num">{data.po_id}</a>
                    <a className="status-approval" style={{backgroundColor: data.status == 'Denied' ? 'rgb(183, 6, 33)': 'rgb(255, 178, 0)' && data.status== 'Approved' ? 'rgb(92, 184, 92, 0.75)': 'rgb(255, 178, 0)' && data.status== 'Delivered' ? 'rgba(7, 124, 234, 0.714)': 'rgb(255, 178, 0)'}}>{data.status}</a>
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
                          <a>: {data.ToUser}</a>
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
                          <a>Product Type</a>
                        </div>
                        <div className="sub-title-content">
                          <a>: {data["Jenis Produk"]}</a>
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
          </div>
          <div className="pagination-list" style={{ marginTop: "10px" }}>
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
                  disabled={currentPage == pages[pages.length - 1] ? true : false}
                >
                  <span class="material-icons">chevron_right</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        </div>
        {viewDetail &&
        <div className='view-po-inv-container'>
            <div className='box-po-inv-detail'>
                <div className='close'>
                    <CgIcons.CgClose size={'2em'} onClick={onClickClocePODetail}/>
                </div>
                <form>
            <div className="formPOInput">
              <div className="row" style={{textAlign:'left'}}>
              <h3 style={{textAlign:'left', color:'#B70621'}}>PO Number {POById.po_id} </h3>
              <div className="mb-3 col-md-4">
                      <label>
                        Area Code
                      </label>
                      <input
                        value={POById['Kode Wilayah']}
                        readOnly
                        type="text"
                        name="Kode Wilayah"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3 col-md-4">
                      <label>
                        To User
                      </label>
                      <input
                        type="text"
                        name="ToUser"
                        className="form-control"
                        value={POById.ToUser}
                        readOnly
                      />
                    </div>
                    <div className="mb-3 col-md-4">
                      <label>
                        Position
                      </label>
                      <input
                        type="text"
                        name="Jabatan"
                        className="form-control"
                        value={POById.Jabatan}
                        readOnly
                      />
                    </div>
                    <div className="inputBoxPO mb-3 col-md-6 ">
                      <label>
                        Subproduct Name
                      </label>
                      <input
                        value={POById['Jenis Produk']}
                        type="text"
                        name="Jenis Produk"
                        className="form-control"
                        readOnly
                      />
                    </div>
                    <div className="mb-3 col-md-6 ">
                      <label>
                        Type
                      </label>
                      <input
                        readOnly
                        value={POById.tipe}
                        type="text"
                        name="tipe"
                        className="form-control"
                      />
                    </div>
                { poDetail.length === 0 ? (
                        <p>Not request</p>
                    ): (
                poDetail.map((data, index) => {
                  return (
                    <div className='list-detail-po-container' key={data.po_id_detail}>
                      <div className="row" style={{textAlign:'left'}}>
                        <div className="inputBoxPO mb-3">  
                        <label>
                            Item Name
                        </label>          
                          <input
                            readOnly
                            name="Nama Barang"
                            defaultValue={data["Nama Barang"]}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-6 ">
                          <label>
                            Vendor
                          </label>
                          <input
                            readOnly
                            name="vendor_selected"
                            defaultValue={data.vendor_selected}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-6">
                          <label>
                            Price
                          </label>
                          <input
                          type='number'
                            name="item_price_selected"
                            readOnly
                            defaultValue={data.item_price_selected}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-4">
                        <label>
                            Quantity
                          </label>
                          <input
                            type='number'
                            name="quantity"
                            readOnly
                            defaultValue={data.quantity}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-4">
                        <label>
                            PPN
                          </label>
                          <input
                            name="ppn"
                            readOnly
                            defaultValue={data.ppn}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-4">
                        <label>
                            Additional Cost
                            <span className="text-danger">*</span>
                          </label>
                        <input
                          type='number'
                          name="Biaya Lain-Lain"
                          readOnly
                          defaultValue={data["Biaya Lain-Lain"]}
                        />
                        </div>
                      </div>
                    </div>
                  );
                }))}
              </div>
            </div>
          </form>
            </div>
        </div>}
        {isLoading && <Loading/>}
      </div>
      
    );
}
