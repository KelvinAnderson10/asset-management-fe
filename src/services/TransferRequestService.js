export const transferRequestService = ({doPost, doGet, doDelete, doPut}) => {
  
    const createTransferRequest = async (newRequest) => {
        try {
            return await doPost({
                url: '/api/to', data: newRequest
            })
        } catch (e) {
            throw e
        }
    }

    const getByAssetNumber = async (assetNumber) => {
        try {
            return await doGet({
                url: '/api/to/search/orders/' + String(assetNumber)
            })
        } catch (e) {
            throw e
        }
    }

    const getIncomingRequest = async (name, page) => {
        try {
            return await doGet({
                url: `/api/to/approver/incoming?name=${name}&page=${page}`
            })
        } catch (e) {
            throw e
        }
    }

    return {createTransferRequest, getByAssetNumber, getIncomingRequest}
}
