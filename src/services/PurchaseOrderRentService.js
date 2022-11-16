import React from 'react'

export const purchaseOrderRentService = ({doGet,doPost,doPut,doDelete}) => {

    const createPO = async (newAsset) => {
        try {
            return await doPost({
                url: '/api/rent', data: newAsset,headers:{'Content-Type':'multipart/form-data'}
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deletePO = async (id) => {
        try {
            return await doDelete({url: `/api/rent/${id}`
         })
        } catch (e) {
            throw e;
        }
    }

    const getPOByUserName = async (name) => {
        try {
            return await doGet({url: `/api/rent/name/${name}`})
        } catch (e) {
            throw e;
        }
    }

    const getPOById = async (id) => {
        try {
            return await doGet({url: `/api/rent/id/${id}`})
        } catch (e) {
            throw e;
        }
    }

   

  return {getPOById,getPOByUserName,deletePO,createPO}
}
