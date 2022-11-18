export const expeditionService = ({doGet, doPost}) => {
    const getListExpedition = async () => {
        try {
            return await doGet({url: '/api/expedition-list'})
        } catch (e) {
            throw e
        }
    }

    return {getListExpedition}
}