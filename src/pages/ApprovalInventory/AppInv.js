import React from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { UseApprovalInventory } from './UseApprovalInventory'

export const AppInv = () => {
    const {handleClickApproval, onGetPOListByApproval,poDetail,appData} = UseApprovalInventory()

  
    return (
    <div>
        <Sidebar>
            <div className='approval-inv-list-container'>
              <div className='approval-inv-list-card'>
                {appData.length === 0 ? (
                  <p>Not request</p>
                ) : (
                    appData.map((data) => (
                        <div className='approval-inv-list-box-item' key={data.po_id} onClick={()=>handleClickApproval(data.po_id, data.ToUser, data.Jabatan, data['Kode Wilayah'], data['Jenis Produk'])}>
                            <div className='header-list-po'>
                                <a className='po-num'>{data.po_id}</a>
                                <a className='status-po'>{data.status}</a>
                            </div>
                            <div className='po-content-container'>
                            <div className='box-content-po'>
                                <a>To: {data.ToUser}</a>
                                <a>Location: {data.TAP}</a>
                                <a>Product Type: {data['Jenis Produk']}</a>
                            </div>
                            <div className='box-content-po'>
                                <a>Approval 1: {data.approver_level1}</a>
                                <a>Approval 2: {data.approver_level2}</a>
                                <a>Approval 3: {data.approver_level3}</a>
                            </div>
                            </div>
                        </div>
                    ))
                 )}
              </div>
            </div>
        </Sidebar>
    </div>
  )
}
