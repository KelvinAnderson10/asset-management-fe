

export const dashboardService = ({doGet}) => {
    const getAllCountAsset = async () => {
        try {
            return await doGet({
                url: '/api/asset/total/count'
            })
        } catch (e) {
            throw e
        }
    }

    const getTotalSpendingCluster = async () => {
        try {
            return await doGet({
                url: '/api/asset/dashboard/spending/cluster'
            })
        } catch (e) {
            throw e
        }
    }

    return{getAllCountAsset,getTotalSpendingCluster}
}
