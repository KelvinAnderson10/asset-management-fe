import React from 'react'
import { assetCategoryService } from './AssetCategoryService'
import { locationService } from './LocationService'

export const ServiceFactory = (apiClient) => {
  return {
    locationService: locationService(apiClient),
    assetCategoryService: assetCategoryService(apiClient)
  }
}
