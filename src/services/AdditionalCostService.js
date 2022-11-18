import React from 'react'

export const additionalCostService = ({doGet,doPost,doPut,doDelete}) => {
     const createAddCost = async (newData) => {
        try {
            return await doPost({
                url: '/api/cost', data: newData
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deleteAddCost = async (id) => {
        try {
            return await doDelete({url: `/api/cost/${id}`
         })
        } catch (e) {
            throw e;
        }
    }

    const getAllAddCost = async () => {
        try {
            return await doGet({url: '/api/cost'})
        } catch (e) {
            throw e;
        }
    }

    return{createAddCost,deleteAddCost,getAllAddCost}
}
