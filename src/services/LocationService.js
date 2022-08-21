import React from 'react'

export const locationService = ({doGet}) => {
    const getAllLocation = async () => {
        try {
            return await doGet({url: '/location'})
        } catch (e) {
            throw e;
        }
    }
  return {getAllLocation}
}
