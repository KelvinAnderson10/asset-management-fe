import React from 'react'

export const eventLogService = ({doGet,doPost}) => {
    const getEventLog = async () => {
        try {
            return await doGet({url: `/api/eventlog`})
        } catch (e) {
            throw e;
        }
    }

    const addEventLog = async (data) => {
        try {
            return await doPost({
                url: `/api/eventlog`, data: data})
        } catch (e) {
            throw e;            
        }
    }
    


    return {getEventLog, addEventLog}
}
