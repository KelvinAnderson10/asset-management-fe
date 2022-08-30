export const overviewService = ({doGet, doPut}) => {
    const getAllAsset = async () => {
        try {
            return await doGet({
                url: '/api/asset'
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetByAssetName = async (name) => {
        try {
            return await doGet({
                url: `/api/asset/${name}`
            })
        } catch (e) {
            throw e
        }
    }

    const updateAsset = async (id, newData) => {
        try {
            return await doPut({
                url: `/api/asset/${id}`, data:newData
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetByVendor = async (vendor) => {
        try {
            return await doGet({
                url: `/api/asset/filter?vendor=${vendor}`
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetByLocation = async (location) => {
        try {
            return await doGet({
                url: `/api/asset/filter?location=${location}`
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetByCondition = async (condition) => {
        try {
            return await doGet({
                url: `/api/asset/filter?condition=${condition}`
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetByPagination = async (page) => {
        try {
            return await doGet({
                url: `/api/asset/pagination/${page}`
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetBySubproduct = async (subproduct) => {
        try {
            return await doGet({
                url: `/api/asset/filter?subproduct=${subproduct}`
            })
        } catch (e) {
            throw e
        }
    }
    
    const getAssetByItemName = async (name) => {
        try {
            return await doGet({
                url: `/asset/filter?name=${name}`
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetByProduct = async (product) => {
        try {
            return await doGet({
                url: `/asset/filter?product=${product}`
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetByCategory = async (category) => {
        try {
            return await doGet({
                url: `/asset/filter?category=${category}`
            })
        } catch (e) {
            throw e
        }
    }


    return {getAllAsset, getAssetByAssetName, updateAsset,getAssetByVendor,getAssetByCondition,getAssetByLocation, getAssetByPagination, getAssetBySubproduct, getAssetByItemName, getAssetByProduct, getAssetByCategory}
}
