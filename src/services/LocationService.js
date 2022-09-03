import React from 'react'

export const locationService = ({doGet,doPost,doPut,doDelete}) => {
    const getAllLocation = async () => {
        try {
            return await doGet({url: '/api/location'})
        } catch (e) {
            throw e;
        }
    }

    const createLocation = async (newLocation) => {
        try {
            return await doPost({
                url: '/api/location', data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const updateLocation = async (id,newLocation) => {
        try {
            return await doPut({
                url: `/api/location/${id}`, data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deleteLocation = async (id) => {
        try {
            return await doDelete({url: `/api/location/${id}`
         })
        } catch (e) {
            throw e;
        }
    }
    
    const getLocationById = async (id) => {
        try {
            return await doGet({url: `/api/location/${id}`})
        } catch (e) {
            throw e;
        }
    }

    const getLocationByName = async (title) => {
        try {
            return await doGet({url: `/api/location/filter?name=${title}`})
        } catch (e) {
            throw e;
        }
    }
    


  return {getAllLocation, createLocation,updateLocation,deleteLocation,getLocationById,getLocationByName}
}
