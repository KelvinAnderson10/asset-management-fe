import React from 'react'

export const purchaseOrderService = ({doGet,doPost,doPut,doDelete}) => {

    const createPO = async (newAsset) => {
        try {
            return await doPost({
                url: '/api/purchaseOrder', data: newAsset
                
            })
        } catch (e) {
            throw e;
        }
    }

    const updatePO = async (id,newLocation) => {
        try {
            return await doPut({
                url: `/api/purchaseOrder/${id}`, data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deletePO = async (id) => {
        try {
            return await doDelete({url: `/api/purchaseOrder/${id}`
         })
        } catch (e) {
            throw e;
        }
    }

    const getPOByUserName = async (name) => {
        try {
            return await doGet({url: `/api/purchaseOrder/name/${name}`})
        } catch (e) {
            throw e;
        }
    }

    const getPOById = async (id) => {
        try {
            return await doGet({url: `/api/purchaseOrder/id/${id}`})
        } catch (e) {
            throw e;
        }
    }

    


  return {getPOById,getPOByUserName,deletePO,updatePO,createPO}
}
