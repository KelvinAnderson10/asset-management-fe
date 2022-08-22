import React from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { AssetCategoryList } from './AssetCategoryList'
import { AssetCategoryForm } from './AssetCategoryForm'

export const AssetCategory = () => {
    return (
        <>
            <Sidebar/>
            <div>
                <AssetCategoryForm/>
                <AssetCategoryList/>
            </div>
        </>

    )
}