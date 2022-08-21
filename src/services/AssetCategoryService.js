export const assetCategoryService = ({doPost, doGet}) => {
  
    const createAssetCategory = async (newData) => {
        try {
            return await doPost({
                url: '/asset-category', data: newData
            })
        } catch (e) {
            throw e
        }
    }

    const getAllAssetCategory = async () => {
        try {
            return await doGet({
                url: '/asset-category'
            })
        } catch (e) {
            throw e
        }
    }

    return {createAssetCategory, getAllAssetCategory}
}
