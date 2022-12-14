export const assetCategoryService = ({doPost, doGet, doDelete, doPut}) => {
  
    const createAssetCategory = async (newData) => {
        try {
            return await doPost({
                url: '/api/asset-category', data: newData
            })
        } catch (e) {
            throw e
        }
    }

    const getAllAssetCategory = async () => {
        try {
            return await doGet({
                url: '/api/asset-category'
            })
        } catch (e) {
            throw e
        }
    }

    const deleteAssetCategory = async (name) => {
        try {
            return await doDelete({
                url:`/api/asset-category/${name}`
            })
        } catch (e) {
            throw e
        }
    }

    const getDetailAssetCategory = async (name) => {
        try {
            return await doGet({
                url: `/api/asset-category/subproduct/${name}`
            })
        } catch (e) {
            throw e
        }
    }

    const updateAssetCategory = async (name, newData) => {
        try {
            return await doPut({
                url: `/api/asset-category/${name}`, data:newData
            })
        } catch (e) {
            throw e
        }
    }

    const getDataBySubproductLike = async (name) => {
        try {
            return await doGet({
                url: `/api/asset-category/subproduct/filter?name=${name}`,
            })
        } catch (e) {
            throw e
        }
    }

    const getDataByProductLike = async (name) => {
        try {
            return await doGet({
                url: `/api/asset-category/product/filter?name=${name}`
            })
        } catch (e) {
            throw e
        }
    }

    const getDataByAssetCategoryLike = async (name) => {
        try {
            return await doGet({
                url: `/api/asset-category/filter?name=${name}`
            })
        } catch (e) {
            throw e
        }
    }

    return {createAssetCategory, getAllAssetCategory, deleteAssetCategory, getDetailAssetCategory, updateAssetCategory, getDataByAssetCategoryLike, getDataByProductLike, getDataBySubproductLike}
}
