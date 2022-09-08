import React from 'react'
import { assetCategoryService } from './AssetCategoryService'
import { assetItemService } from './AssetItemService'
import { eventLogService } from './EventLogService'
import { locationService } from './LocationService'
import { overviewService } from './OverviewService'
import { userService } from './UserService'
import { vendorService } from './VendorService'

export const ServiceFactory = (apiClient) => {
  return {
    locationService: locationService(apiClient),
    vendorService: vendorService(apiClient),
    assetItemService: assetItemService(apiClient),
    userService: userService(apiClient),
    assetCategoryService: assetCategoryService(apiClient),
    overviewService: overviewService(apiClient),
    eventLogService: eventLogService(apiClient)
  }
}
