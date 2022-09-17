import React, { useEffect, useState } from 'react'
import { useAuth } from '../../services/UseAuth'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { useDeps } from '../../shared/context/DependencyContext'
import './ApprovalInventory.css'

export const ApprovalInventory = () => {
  const [appData, setAppData] = useState([])
  const [poDetailData, setPODetailData] = useState({})
  const {purchaseOrderService} = useDeps()

  //Get PO List By Approval
  const onGetPOListByApproval = async (name) => {
    try {
      const response = await purchaseOrderService.getPOListByApproval(name)
      console.log(name);
      setAppData(response.data)
      console.log(appData);
    } catch (e) {
      console.log(e.response);
    }
  }

  //Get User
  const { getCookie } = useAuth();
  const[user,setUser]= useState({
      name:'',
      role:'',
      level_approval:'',
      location_id:'',
      tap:'',
      cluster:'',
      department: ''
  })
  const onGetCookie = ()=>{
      let savedUserJsonString = getCookie("user")
      let savedUser = JSON.parse(savedUserJsonString)
      setUser(prevObj=>({...prevObj,name:(savedUser.name), role:(savedUser.role), level_approval:(savedUser.level_approval), location_id:(savedUser.location_id), tap:(savedUser.TAP), cluster:(savedUser.Cluster), department:(savedUser.department)}))
  }

  useEffect(() => {
    onGetCookie()
  }, [])

  useEffect(() => {
    onGetPOListByApproval(user.name);
  }, [user.name])


   //Get PO Detail 
   const onGetPODetailById = async (id) => {
    try {
        const response = await purchaseOrderService.getPODetailById(id)
        console.log(id);
        setPODetailData(response.data)
        console.log(response);
    } catch (e) {
        console.log(e.response);
    }
  }

  const [id, setId] = useState()
  const handleClickApproval = (id) => {
    setId(id)
    console.log('ini id', id);
    return [id]
  }

  return (
    <div>
        <Sidebar>
            <div className='approval-inv-list-container'>
              <div className='approval-inv-list-card'>
                {appData.length === 0 ? (
                  <p>Not request</p>
                ) : (
                    appData.map((data) => (
                        <div className='approval-inv-list-box-item' key={data.po_id} onClick={()=>handleClickApproval(data.po_id)}>
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
