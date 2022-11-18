import React from 'react'

export const expeditionService = ({doGet,doPost,doPut,doDelete}) => {
    const getAllExpedition = async () => {
        try {
            return await doGet({url: '/api/expedition-list'})
        } catch (e) {
            throw e;
        }
    }

    const createExpedition = async (newLocation) => {
        try {
            return await doPost({
                url: '/api/expedition', data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const updateExpedition = async (id,newExpedition) => {
        try {
            return await doPut({
                url: `/api/expedition-update/${id}`, data: newExpedition
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deleteExpedition = async (id) => {
        try {
            return await doDelete({url: `/api/expedition/${id}`
         })
        } catch (e) {
            throw e;
        }
    }
    const getExpeditionById = async (id) => {
        try {
            return await doGet({url: `/api/expedition/${id}`})
        } catch (e) {
            throw e;
        }
    }

    const getExpeditionByNameLike = async (title) => {
        try {
            return await doGet({url: `/api/expedition-search/exp-name?name=${title}`})
        } catch (e) {
            throw e;
        }
    }

    // const getExpeditionByName = async (title) => {
    //     try {
    //         return await doGet({url: `/api/expedition/${title}`})
    //     } catch (e) {
    //         throw e;
    //     }
    // }

  return {getAllExpedition, updateExpedition, getExpeditionByNameLike, createExpedition,deleteExpedition, getExpeditionById}
}
