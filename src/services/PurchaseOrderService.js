import React from 'react'

export const purchaseOrderService = ({doGet,doPost,doPut,doDelete}) => {

    const createPO = async (newAsset) => {
        try {
            return await doPost({
                url: '/api/po', data: newAsset
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deletePO = async (id) => {
        try {
            return await doDelete({url: `/api/po/${id}`
         })
        } catch (e) {
            throw e;
        }
    }

    const getPOByUserName = async (name) => {
        try {
            return await doGet({url: `/api/po/name/${name}`})
        } catch (e) {
            throw e;
        }
    }

    const getPOById = async (id) => {
        try {
            return await doGet({url: `/api/po/id/${id}`})
        } catch (e) {
            throw e;
        }
    }

    const getPOByRequester = async (name) => {
        try {
            return await doGet({url: `/api/po/requester/${name}`})
        } catch (e) {
            throw e
        }
    }

    const getPODetailById = async (id) => {
        try {
            return await doGet({url: `api/po/detail/${id}`})
        } catch (e) {
            throw e
        }
    }

    const getPOListByApproval = async (name) => {
        try {
            return await doGet({url: `api/po/approval/${name}`})
        } catch (e) {
            throw e
        }
    }

    const approvedByLevel1 = async (id) => {
        try {
            return await doPut({url: `api/po/level1/${id}`})
        } catch (e) {
            throw e
        }
    }

    const approvedByLevel2 = async (id) => {
        try {
            return await doPut({url: `api/po/level2/${id}`})
        } catch (e) {
            throw e
        }
    }

    const approvedByLevel3 = async (id) => {
        try {
            return await doPut({url: `api/po/level3/${id}`})
        } catch (e) {
            throw e
        }
    }
    const  updatePODetail = async (id,newData) => {
        try {
            return await doPut({
                url: `/api/po/detail/${id}`, data: newData
                
            })
        } catch (e) {
            throw e;
        }
    }
    const updatePO = async (id, newData) => {
        try {
            return await doPut({
                url: `/api/po/status/${id}`, data: newData
                
            })
        } catch (e) {
            throw e;
        }
    }
   

  return {updatePO, updatePODetail,getPOById,getPOByUserName,deletePO,createPO, getPOByRequester, getPODetailById, getPOListByApproval, approvedByLevel1, approvedByLevel2, approvedByLevel3}
}
