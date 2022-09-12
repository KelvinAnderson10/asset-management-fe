export const eventLogService = ({doGet, doPost}) => {
    const getEventLog = async () => {
        try {
            return await doGet({url: '/api/eventlog'})
        } catch (e) {
            throw e
        }
    }

    const createEventLog = async (newEvent) => {
        try {
            return await doPost({
                url:'/api/eventlog', data: newEvent
            })
        } catch (e) {
            throw e
        }
    }

    return {getEventLog, createEventLog}
}