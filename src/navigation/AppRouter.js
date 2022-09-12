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
import { Main } from "../pages/Overview/Main";



export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Login/>}></Route>
      {/* <Route element={<ProtectedPage></ProtectedPage>}> */}
        <Route path="/home" element={<HomeView />} />
        <Route path="/main" element={<Main/>} />
        {/* <Route path="/main" element={<Overview />} /> */}
        <Route path="/data-management/asset-item" element={<AssetItem />} />
        <Route path="/data-management/asset-category" element={<AssetCategory />}/>
        <Route path="/data-management/vendor" element={<VendorManage />} />
        <Route path="/data-management/location" element={<Location />} />
        <Route path="/upload-data" element={<ImportData />} />
        <Route path="*" element={<PageNotFound />} />
      {/* </Route> */}
    </Routes>
  );
};
