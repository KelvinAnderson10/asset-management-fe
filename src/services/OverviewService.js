export const overviewService = ({doGet, doPut}) => {
    const getAllAsset = async () => {
        try {
            return await doGet({
                url: '/asset'
            })
        } catch (e) {
            throw e
        }
    }

    const getAssetByAssetName = async (name) => {
        try {
            return await doGet({
                url: `/asset/${name}`
            })
        } catch (e) {
            throw e
        }
    }

    const updateAsset = async (id, newData) => {
        try {
            return await doPut({
                url: `/asset/${id}`, data:newData
            })
        } catch (e) {
            throw e
        }
    }

    return {getAllAsset, getAssetByAssetName, updateAsset}
}
