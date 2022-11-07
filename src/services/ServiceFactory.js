import React from 'react'
import { assetCategoryService } from './AssetCategoryService'
import { assetItemService } from './AssetItemService'
import { dashboardService } from './DashboardService'
import { eventLogService } from './EventLogService'
import { generalSettingService } from './GeneralSettingService'
import { locationService } from './LocationService'
import { notificationService } from './NotificationService'
import { overviewService } from './OverviewService'
import { purchaseOrderRentService } from './PurchaseOrderRentService'
import { purchaseOrderService } from './PurchaseOrderService'
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
    eventLogService: eventLogService(apiClient),
    purchaseOrderService: purchaseOrderService(apiClient),
    generalSettingService: generalSettingService(apiClient),
    dashboardService: dashboardService(apiClient),
    notificationService: notificationService(apiClient),
    purchaseOrderRentService : purchaseOrderRentService(apiClient),
 
  }
}
