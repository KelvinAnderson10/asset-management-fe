import React from 'react'
import { locationService } from './LocationService'

export const ServiceFactory = (apiClient) => {
  return {
    locationService: locationService(apiClient)
  }
}
