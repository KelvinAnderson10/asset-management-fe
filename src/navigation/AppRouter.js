import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomeView } from "../pages/HomePage/HomeView";
import { Overview } from "../pages/Overview/Overview";
import { Location } from "../pages/Location/Location";
import { VendorManage } from "../pages/Vendor/Vendor";
import { ImportData } from "../pages/Import Data/ImportData";

import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { AssetCategory } from "../pages/AssetCategory/AssetCategory";

import { AssetItem } from "../pages/AssetItem/AssetItem";
import { Login } from "../pages/Login/Login";
import { ProtectedPage } from "../services/ProtectedPage";
import { FormPO } from "../pages/PurchaseOrderInv/FormPO";
import { UserManage } from "../pages/User/User";
import { Main } from "../pages/Overview/Main";
import { Approval } from "../pages/Approval/Approval";
import { Settings } from "../pages/Settings/Settings";
import { POMaintenance } from "../pages/PurchaseOrderMtnc/POMaintenance";
import { POInventory } from "../pages/PurchaseOrderInv/POInventory";



export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Login/>}></Route>
      <Route path="/po" element={<FormPO/>} ></Route>
      <Route element={<ProtectedPage></ProtectedPage>}>
        <Route path="/home" element={<HomeView />} />
        <Route path="/main" element={<Main/>} />
        {/* <Route path="/main" element={<Overview />} /> */}
        <Route path="/data-management/asset-item" element={<AssetItem />} />
        <Route path="/data-management/asset-category" element={<AssetCategory />}/>
        <Route path="/data-management/vendor" element={<VendorManage />} />
        <Route path="/data-management/location" element={<Location />} />
        <Route path="/data-management/user" element={<UserManage />} />
        <Route path="/upload-data" element={<ImportData />} />
        {/* <Route path="/purchase-request/inventory" element={<FormPO/>} /> */}
        <Route path="/purchase-request/inventory" element={<POInventory/>} />
        <Route path="/purchase-request/maintenance" element={<POMaintenance/>}/>
        <Route path="/approval-data" element={<Approval/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
