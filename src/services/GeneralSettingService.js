import React from 'react'

export const generalSettingService = ({doGet,doPut}) => {
    const getGeneralSetting = async () => {
        try {
            return await doGet({url: '/api/'})
        } catch (e) {
            throw e;
        }
    }
    const updateGeneralSetting = async (newSetting) => {
        try {
            return await doPut({
                url: `/api/setting`, data: newSetting
                
            })
        } catch (e) {
            throw e;
        }
    }

    return{getGeneralSetting,updateGeneralSetting}


}
