import React from 'react'
import { assetItemService } from './AssetItemService'
import { locationService } from './LocationService'
import { userService } from './UserService'
import { vendorService } from './VendorService'

export const ServiceFactory = (apiClient) => {
  return {
    locationService: locationService(apiClient),
    vendorService: vendorService(apiClient),
    assetItemService: assetItemService(apiClient),
    userService: userService(apiClient)
  }
}
