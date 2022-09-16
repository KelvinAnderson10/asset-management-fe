import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../services/UseAuth'
import { useDeps } from '../../../shared/context/DependencyContext'
import './ListPOInventory.css'

export const ListPOInventory = () => {
    const [poData, setPOData] = useState([])
    const [poDetailData, setPODetailData] = useState({})
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
        onGetAllPOByRequester(user.name);
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

    return (
        <>
            <div className='po-inv-list-container'>
                <div className='po-inv-list-card'>
                        {poData.length === 0 ? (
                            <p>Not request</p>
                        ): (
                            poData.map((data) => (
                                <div className='po-inv-list-box-item' key={data.po_id}>
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
        </>
    )
}
