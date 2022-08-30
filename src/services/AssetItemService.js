import React from 'react'

export const assetItemService = ({doGet,doPost,doPut,doDelete}) => {
    const getAllAsset = async () => {
        try {
            return await doGet({url: '/api/asset-category'})
        } catch (e) {
            throw e;
        }
    }

    const createAsset = async (newAsset) => {
        try {
            return await doPost({
                url: '/api/asset', data: newAsset
                
            })
        } catch (e) {
            throw e;
        }
    }

    const updateAsset = async (id,newLocation) => {
        try {
            return await doPut({
                url: `/api/asset/${id}`, data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deleteAsset = async (name) => {
        try {
            return await doDelete({url: `/api/asset/${name}`
         })
        } catch (e) {
            throw e;
        }
    }

    const getAssetByName = async (name) => {
        try {
            return await doGet({url: `/api/asset/${name}`})
        } catch (e) {
            throw e;
        }
    }

    const batchInsert = async (batchData) => {
        try {
            return await doPost({
                url: `/api/asset/batch`, data: batchData})
        } catch (e) {
            throw e;            
        }
    }
    


  return {getAllAsset,createAsset,updateAsset,deleteAsset,getAssetByName, batchInsert}
}
