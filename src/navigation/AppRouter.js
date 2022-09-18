import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomeView } from "../pages/HomePage/HomeView";
import { Location } from "../pages/Location/Location";
import { VendorManage } from "../pages/Vendor/Vendor";
import { ImportData } from "../pages/Import Data/ImportData";

import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { AssetCategory } from "../pages/AssetCategory/AssetCategory";

import { AssetItem } from "../pages/AssetItem/AssetItem";
import { Login } from "../pages/Login/Login";
import { ProtectedPage } from "../services/ProtectedPage";

import { UserManage } from "../pages/User/User";
import { Main } from "../pages/Overview/Main";
import { Settings } from "../pages/Settings/Settings";
import { POMaintenance } from "../pages/PurchaseOrderMtnc/POMaintenance";
import { POInventory } from "../pages/PurchaseOrderInv/POInventory";
import { FormApprovalInventory } from "../pages/ApprovalInventory/components/FormApprovalInventory";
import { AppInv } from "../pages/ApprovalInventory/AppInv";



export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Login/>}></Route>
      <Route element={<ProtectedPage></ProtectedPage>}>
        <Route path="/home" element={<HomeView />} />
        <Route path="/main" element={<Main/>} />
        <Route path="/data-management/asset-item" element={<AssetItem />} />
        <Route path="/data-management/asset-category" element={<AssetCategory />}/>
        <Route path="/data-management/vendor" element={<VendorManage />} />
        <Route path="/data-management/location" element={<Location />} />
        <Route path="/data-management/user" element={<UserManage />} />
        <Route path="/upload-data" element={<ImportData />} />
        <Route path="/purchase-request/inventory" element={<POInventory/>} />
        <Route path="/purchase-request/maintenance" element={<POMaintenance/>}/>
        <Route path="/approval-data/inventory" element={<AppInv/>} />
        <Route path="/approval-data/inventory/form" element={<FormApprovalInventory/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
