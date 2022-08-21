import React from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { AssetCategoryList } from './AssetCategoryList'
import { AssetCategoryForm } from './AssetCategoryForm'

export const AssetCategory = () => {
    return (
        <>
            <Sidebar/>
            <div>
                <div className="d-flex flex-row">
                    <button type="button" className="me-3 mt-4 btn btn-primary ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#addModalForm">
                    Add Asset Category +
                    </button>
                </div>
                <AssetCategoryList/>
                <AssetCategoryForm id='addModalForm' label= 'Add New Asset Category' button='Submit' action='added'/>
            </div>
        </>

    )
}