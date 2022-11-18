import React from 'react'

export const logisticService = ({doGet,doPost,doPut,doDelete}) => {
    const getAllLogistic = async () => {
        try {
            return await doGet({url: '/api/logistic'})
        } catch (e) {
            throw e;
        }
    }

    const createLogistic = async (newLocation) => {
        try {
            return await doPost({
                url: '/api/logistic', data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const updateLogistic = async (id,newLocation) => {
        try {
            return await doPut({
                url: `/api/logistic/${id}`, data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deleteLogistic = async (name) => {
        try {
            return await doDelete({url: `/api/logistic/${name}`
         })
        } catch (e) {
            throw e;
        }
    }
    const getLogisticById = async (id) => {
        try {
            return await doGet({url: `/api/logistic/${id}`})
        } catch (e) {
            throw e;
        }
    }

    const getLogisticByNameLike = async (title) => {
        try {
            return await doGet({url: `/api/logistic/filter?name=${title}`})
        } catch (e) {
            throw e;
        }
    }

    const getLogisticByName = async (title) => {
        try {
            return await doGet({url: `/api/logistic/${title}`})
        } catch (e) {
            throw e;
        }
    }
    


  return {getAllLogistic, createLogistic,updateLogistic,deleteLogistic,getLogisticById,getLogisticByName, getLogisticByNameLike}
}
