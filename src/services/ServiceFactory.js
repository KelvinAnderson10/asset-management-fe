import React from 'react'
import { assetCategoryService } from './AssetCategoryService'
import { locationService } from './LocationService'
import { overviewService } from './OverviewService'

export const ServiceFactory = (apiClient) => {
  return {
    locationService: locationService(apiClient),
    assetCategoryService: assetCategoryService(apiClient),
    overviewService: overviewService(apiClient)
  }
}
