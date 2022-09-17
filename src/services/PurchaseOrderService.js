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

  return {getPOById,getPOByUserName,deletePO,createPO, getPOByRequester, getPODetailById, getPOListByApproval}
}
