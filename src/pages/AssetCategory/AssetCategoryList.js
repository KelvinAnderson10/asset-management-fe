import React from 'react'
import { AssetCategoryForm } from './AssetCategoryForm'

export const AssetCategoryList = () => {
  return (
    <div>
        <table className='table table-bordered border-primary table-responsive'>
            <thead>
                <tr>
                    <th scope='col'>Asset Category</th>
                    <th scope='col'>Useful Life</th>
                    <th scope='col'>Product Code</th>
                    <th scope='col'>Product Name</th>
                    <th scope='col'>Subproduct Name</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td>
                  <div className="d-flex flex-row">
                    <button type="button" className="me-3 mt-4 btn btn-success ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#updateModalForm">
                    Update
                    </button>
                </div>
                  </td>
                </tr>
            </tbody>
        </table>
        <AssetCategoryForm id='updateModalForm' label='Update Asset Category' button='Update' action='updated'/>
    </div>
  )
}
