import React, { useState } from 'react'
import { UseApprovalMaintenance } from '../UseApprovalMaintenance'

export const ListPRMaintenance = () => {
    const {handleClickApproval,poDetail,appData} = UseApprovalMaintenance()
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
   for (let i = 1; i <= Math.ceil(appData.length / itemsPerPage); i++) {
     pages.push(i);
   }
 
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = appData.slice(indexOfFirstItem, indexOfLastItem);
 
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
 <div>   
         <div className='approval-inv-list-container'>
           <div className='approval-inv-box-container'>
           <div className='approval-inv-list-card'>
             {appData.length === 0 ? (
               <p>Not request</p>
             ) : (
                 appData.map((data) => (
                     <div className='approval-inv-box-item' key={data.po_id} onClick={()=>handleClickApproval(data.po_id, data.ToUser, data.Jabatan, data['Kode Wilayah'], data['Jenis Produk'], data.approver_level3, data.tipe, data.status)}>
                         <div className='header-list-approval'>
                             <a className='approval-num'>{data.po_id}</a>
                             <a className='status-approval' style={{backgroundColor: data.status == 'Denied' ? 'rgb(183, 6, 33)': 'rgb(255, 178, 0)' && data.status== 'Approved' ? 'rgb(92, 184, 92, 0.75)': 'rgb(255, 178, 0)' && data.status== 'Delivered' ? 'rgba(7, 124, 234, 0.714)': 'rgb(255, 178, 0)'}}>{data.status}</a>
                         </div>
                         <div className='approval-content-container'>
                         <div className='box-content-approval'>
                             <div className='row-content-approval'>
                                 <div className='sub-title-content'>
                                 <a>Requester</a>
                                 </div>
                                 <div className='sub-title-content'>
                                 <a>: {data.requester}</a>
                                 </div>                             
                             </div>
                             <div className='row-content-approval'>
                                 <div className='sub-title-content'>
                                 <a>To</a>
                                 </div>
                                 <div className='sub-title-content'>
                                 <a>: {data.ToUser}</a>
                                 </div>                             
                             </div>
                         </div>
                         <div className='box-content-approval'>
                                 <div className='row-content-approval'>
                                 <div className='sub-title-content'>
                                 <a>Location</a>
                                 </div>
                                 <div className='sub-title-content'>
                                 <a>: {data.TAP}</a>
                                 </div>                             
                             </div>
                             <div className='row-content-approval'>
                                 <div className='sub-title-content'>
                                 <a>Product Type</a>
                                 </div>
                                 <div className='sub-title-content'>
                                 <a>: {data['Jenis Produk']}</a>
                                 </div>                             
                             </div>
                         </div>
                         </div>
                         <div className='date-approval'>
                             <a>{data.CreatedAt}</a>
                         </div>
                     </div>
                 ))
              )}
           </div>
           <div className='pagination-list' style={{marginTop:'10px'}}>
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
 </div>
)
}
