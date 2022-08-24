import React from 'react'

export const assetItemService = ({doGet,doPost,doPut,doDelete}) => {
    const getAllAsset = async () => {
        try {
            return await doGet({url: '/asset-category'})
        } catch (e) {
            throw e;
        }
    }

    const createAsset = async (newAsset) => {
        try {
            return await doPost({
                url: '/asset', data: newAsset
                
            })
        } catch (e) {
            throw e;
        }
    }

    const updateAsset = async (id,newLocation) => {
        try {
            return await doPut({
                url: `/asset/${id}`, data: newLocation
                
            })
        } catch (e) {
            throw e;
        }
    }

    const deleteAsset = async (name) => {
        try {
            return await doDelete({url: `/asset/${name}`
         })
        } catch (e) {
            throw e;
        }
    }

    const getAssetByName = async (name) => {
        try {
            return await doGet({url: `/asset/${name}`})
        } catch (e) {
            throw e;
        }
    }
    


  return {getAllAsset,createAsset,updateAsset,deleteAsset,getAssetByName}
}
