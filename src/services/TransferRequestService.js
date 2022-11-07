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

    const getHistoryRequest = async (name, page) => {
        try {
            return await doGet({
                url: `/api/to/approver/history?name=${name}&page=${page}`
            })
        } catch (e) {
            throw e
        }
    }

    const updateApprovalToLevel1 = async (id) => {
        try {
            return await doPut({url: `api/to/level1/${id}`})
        } catch (e) {
            throw e
        }
    }

    const updateApprovalToLevel2 = async (id) => {
        try {
            return await doPut({url: `api/to/level2/${id}`})
        } catch (e) {
            throw e
        }
    }

    const rejectApprovalTo = async (id) => {
        try {
            return await doDelete({url: `api/to/${id}`})
        } catch (e) {
            throw e
        }
    }

    return {createTransferRequest, getByAssetNumber, getIncomingRequest, updateApprovalToLevel1, updateApprovalToLevel2, rejectApprovalTo, getHistoryRequest}
}
