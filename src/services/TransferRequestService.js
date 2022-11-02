export const transferRequestService = ({doPost, doGet, doDelete, doPut}) => {
  
    const createTransferRequest = async (newRequest) => {
        console.log(newRequest);
        try {
            return await doPost({
                url: '/api/to', data: newRequest
            })
        } catch (e) {
            throw e
        }
    }

    return {createTransferRequest}
}
