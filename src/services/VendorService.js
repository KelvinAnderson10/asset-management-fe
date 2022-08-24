import React from 'react'

export const vendorService = ({doGet,doPost,doPut,doDelete}) => {
    const getAllVendor = async () => {
        try {
            return await doGet({url: '/vendor'})
        } catch (e) {
            throw e;
        }
    }

    const createVendor = async (newLocation) => {
        try {
            return await doPost({
                url: '/vendor', data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const updateVendor = async (id,newLocation) => {
        try {
            return await doPut({
                url: `/vendor/${id}`, data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deleteVendor = async (name) => {
        try {
            return await doDelete({url: `/vendor/${name}`
         })
        } catch (e) {
            throw e;
        }
    }
    const getVendorById = async (id) => {
        try {
            return await doGet({url: `/vendor/${id}`})
        } catch (e) {
            throw e;
        }
    }

    const getVendorByNameLike = async (title) => {
        try {
            return await doGet({url: `/vendor/filter?name=${title}`})
        } catch (e) {
            throw e;
        }
    }

    const getVendorByName = async (title) => {
        try {
            return await doGet({url: `/vendor/${title}`})
        } catch (e) {
            throw e;
        }
    }
    


  return {getAllVendor, createVendor,updateVendor,deleteVendor,getVendorById,getVendorByName, getVendorByNameLike}
}
