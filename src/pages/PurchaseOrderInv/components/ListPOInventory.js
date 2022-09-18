import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../services/UseAuth'
import { useDeps } from '../../../shared/context/DependencyContext'
import './ListPOInventory.css'
import * as CgIcons from 'react-icons/cg'

export const ListPOInventory = () => {
    const [poData, setPOData] = useState([])
    const [poDetailData, setPODetailData] = useState([])
    const {purchaseOrderService} = useDeps()
    
    //Get All PO Inventory
    const onGetAllPOByRequester = async (name) => {
        try{
        const response = await purchaseOrderService.getPOByRequester(name)
        console.log(name);
        setPOData(response.data)
        console.log('ini response', response);
        } catch (e) {
        console.log(e.response);
        }
    }

    useEffect(() => {
        onGetCookie()
    }, [])

    //Get User
    const { getCookie } = useAuth();
    const[user,setUser]= useState({
        name:'',
        role:'',
        level_po:'',
        location_id:'',
        tap:'',
        cluster:'',
        department: ''
    })
    const onGetCookie = ()=>{
        let savedUserJsonString = getCookie("user")
        let savedUser = JSON.parse(savedUserJsonString)
        setUser(prevObj=>({...prevObj,name:(savedUser.name), role:(savedUser.role), level_po:(savedUser.level_po), location_id:(savedUser.location_id), tap:(savedUser.TAP), cluster:(savedUser.Cluster), department:(savedUser.department)}))
    }

    useEffect(() => {
        onGetAllPOByRequester(user.name);
    }, [user.name])

    //Get PO Detail 
    const onGetPODetailById = async (id) => {
        try {
            const response = await purchaseOrderService.getPODetailById(id)
            console.log(id);
            for (let i in response.data) {
                if (response.data[i].ppn === true){
                    response.data[i].ppn = 'Yes'
                } else {
                    response.data[i].ppn = 'No'
                }
            }
            setPODetailData(response.data)
            console.log(response);
        } catch (e) {
            console.log(e.response);
        }
    }

    const [viewDetail, setViewDetail] = useState(false)
    const onClickPODetail = (id) => {
        setViewDetail(true)
        onGetPODetailById(id)
    }

    const onClickClocePODetail = () => {
        setViewDetail(false)
    }

    //Pagination Detail PO
    const [currentModal, setcurrentModal] = useState(1);
    const [itemsPerModal, setitemsPerModal] = useState(1);
    const [modalNumberLimit, setModalNumberLimit] = useState(5);
    const [maxModalNumberLimit, setmaxModalNumberLimit] = useState(5);
    const [minModalNumberLimit, setminModalNumberLimit] = useState(0);
    const [indexModal, setIndexModal] = useState(1)

    const handleClickModal = (event) => {
        setcurrentModal(Number(event.target.id));
        setIndexModal(event.target.id)
      };
    
      const modals = [];
      for (let i = 1; i <= Math.ceil(poDetailData.length / itemsPerModal); i++) {
        modals.push(i);
      }
    
      const indexOfLastItemDetail = currentModal * itemsPerModal;
      const indexOfFirstItemDetail = indexOfLastItemDetail - itemsPerModal;
      const currentItemsDetail = poDetailData.slice(indexOfFirstItemDetail, indexOfLastItemDetail);

      const renderModalNumbers = modals.map((number) => {
        if (number < maxModalNumberLimit + 1 && number > minModalNumberLimit) {
          return (
            <li
              key={number}
              id={number}
              onClick={handleClickModal}
              className={currentModal == number ? "active" : null}
            >
              {number}
            </li>
          );
        } else {
          return null;
        }
      });
    
      const handleNextbtnModal = () => {
        setcurrentModal(currentModal + 1);
        setIndexModal(indexModal + 1)
        if (currentModal + 1 > maxModalNumberLimit) {
          setmaxModalNumberLimit(maxModalNumberLimit + modalNumberLimit);
          setminModalNumberLimit(minModalNumberLimit + modalNumberLimit);
        }
      };
    
      const handlePrevbtnModal = () => {
        setcurrentModal(currentModal - 1);
        setIndexModal(indexModal - 1)
        if ((currentModal - 1) % modalNumberLimit == 0) {
          setmaxModalNumberLimit(maxModalNumberLimit - modalNumberLimit);
          setminModalNumberLimit(minModalNumberLimit - modalNumberLimit);
        }
      };
    
      let modalIncrementBtn = null;
      if (modals.length > maxModalNumberLimit) {
        modalIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
      }
    
      let modalDecrementBtn = null;
      if (minModalNumberLimit >= 1) {
        modalDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
      }    
    
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
      
    return (
        <>
            <div className='po-inv-list-container'>
                <div className='po-inv-box-container'>
                <div className='po-inv-list-card'>
                        {poData.length === 0 ? (
                            <p>Not request</p>
                        ): (
                            currentItems.map((data) => (
                                <div className='po-inv-list-box-item' key={data.po_id} onClick={()=>onClickPODetail(data.po_id)}>
                                    <div className='header-list-po'>
                                        <a className='po-num'>{data.po_id}</a>
                                        <a className='status-po'>{data.status}</a>
                                    </div>
                                    <div className='po-content-container'>
                                        <div className='box-content-po'>
                                            <div className='row-content-po'>
                                                <div className='sub-title-content'>
                                                    <a>To</a>
                                                </div>
                                                <div className='sub-title-content'>
                                                    <a>: {data.ToUser}</a>
                                                </div>
                                            </div>
                                            <div className='row-content-po'>
                                                <div className='sub-title-content'>
                                                <a>Location</a>
                                                </div>
                                                <div className='sub-title-content'>
                                                <a>: {data.TAP}</a>
                                                </div>                             
                                            </div>
                                            <div className='row-content-po'>
                                                <div className='sub-title-content'>
                                                <a>Product Type</a>
                                                </div>
                                                <div className='sub-title-content'>
                                                <a>: {data['Jenis Produk']}</a>
                                                </div>                             
                                            </div>
                                    </div>
                                    <div className='box-content-po'>
                                            <div className='row-content-po'>
                                                <div className='sub-title-content'>
                                                    <a>Approver 1</a>
                                                </div>
                                                <div className='sub-title-content'>
                                                    <a>: {data.approver_level1}</a>
                                                </div>
                                            </div>
                                            <div className='row-content-po'>
                                                <div className='sub-title-content'>
                                                <a>Approver 2</a>
                                                </div>
                                                <div className='sub-title-content'>
                                                <a>: {data.approver_level2}</a>
                                                </div>                             
                                            </div>
                                            <div className='row-content-po'>
                                                <div className='sub-title-content'>
                                                <a>Approver 3</a>
                                                </div>
                                                <div className='sub-title-content'>
                                                <a>: {data.approver_level3}</a>
                                                </div>                             
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            ))
                        )}
                </div>
                <div className='pagination-list'>
                <ul className="listNumbers">
                    <li style={{ borderRadius:  '1vh 0vh 0vh 1vh'}}>
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
                    <li style={{ borderRadius:  '0px 1vh 1vh 0px'}}>
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
            {viewDetail &&
            <div className='view-po-inv-container'>
                <div className='box-po-inv-detail'>
                    <div className='close'>
                        <CgIcons.CgClose size={'2em'} onClick={onClickClocePODetail}/>
                    </div>
                    <form>
                <div className="formPOInput">
                  <div className="row">
                    { poDetailData.length === 0 ? (
                            <p>Not request</p>
                        ): (
                    currentItemsDetail.map((data, index) => {
                      return (
                        <div className='list-detail-po-container' key={index}>
                            <div className='header-item-add'>
                            <h3 style={{textAlign:'center'}}>Item {indexModal} </h3>
                            </div>
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
                                1<span className="subscript">st</span>{" "}
                                Vendor
                              </label>
                              <input
                                readOnly
                                name="vendor_1"
                                defaultValue={data.vendor_1}
                              />
                            </div>
                            <div className="inputBoxPO mb-3 col-md-6">
                              <label>
                                1<span className="subscript">st</span> Item
                                Price
                              </label>
                              <input
                                readOnly
                                type='number'
                                name="item_price_1"
                                defaultValue={data.item_price_1}
                              />
                            </div>
                            <div className="inputBoxPO mb-3 col-md-6 ">
                              <label>
                                2<span className="subscript">nd</span>{" "}
                                Vendor
                              </label>
                              <input
                                readOnly
                                name="vendor_2"
                                defaultValue={data.vendor_2}
                              />
                            </div>
                            <div className="inputBoxPO mb-3 col-md-6">
                              <label>
                                2<span className="subscript">nd</span> Item
                                Price
                              </label>
                              <input
                                readOnly
                                type='number'
                                name="item_price_2"
                                defaultValue={data.item_price_2}
                              />
                            </div>
                            <div className="inputBoxPO mb-3 col-md-6 ">
                              <label>
                                3<span className="subscript">st</span>{" "}
                                Vendor
                              </label>
                              <input
                                readOnly
                                name="vendor_3"
                                defaultValue={data.vendor_3}
                              />
                            </div>
                            <div className="inputBoxPO mb-3 col-md-6">
                              <label>
                                3<span className="subscript">rd</span> Item
                                Price
                              </label>
                              <input
                              type='number'
                                name="item_price_3"
                                readOnly
                                defaultValue={data.item_price_3}
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
              <div className='pagination-modal'>
              <ul className="modalNumbers">
                    <li style={{ borderRadius:  '1vh 0vh 0vh 1vh'}}>
                      <button
                        onClick={handlePrevbtnModal}
                        disabled={currentModal == modals[0] ? true : false}
                      >
                        <span class="material-icons">chevron_left</span>
                      </button>
                    </li>
                    {modalDecrementBtn}
                    {renderModalNumbers}
                    {modalIncrementBtn}

                    <li style={{ borderRadius:  '0px 1vh 1vh 0px'}}>
                      <button
                        onClick={handleNextbtnModal}
                        disabled={
                          currentModal == modals[modals.length - 1] ? true : false
                        }
                      >
                        <span class="material-icons">chevron_right</span>
                      </button>
                    </li>
                  </ul>
                  </div>
                </div>
            </div>}
        </>
    )
}
