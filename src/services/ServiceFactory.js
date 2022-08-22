import React from 'react'
import { locationService } from './LocationService'
import { vendorService } from './VendorService'

export const ServiceFactory = (apiClient) => {
  return {
    locationService: locationService(apiClient),
    vendorService: vendorService(apiClient)
  }
}
