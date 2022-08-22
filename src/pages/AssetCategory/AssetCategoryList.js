import React, { useEffect, useState } from 'react'
import {useDeps} from '../../shared/context/DependencyContext'

export const AssetCategoryList = () => {
    const {assetCategoryService} = useDeps();
    const [isLoading, setLoading] = useState(false);
    const [assetCategory, setAssetCategory] = useState([]);

    const onGetAllAssetCategory = async () => {
        setLoading(true);
        try {
            const response = await assetCategoryService.getAllAssetCategory();
            setAssetCategory(response.data);
            console.log(response);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        onGetAllAssetCategory();
    }, []);

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
                    {assetCategory.map((data) => (
                        <tr>
                        <th scope='col'>{data.asset_category}</th>
                        <th scope='col'>{data.useful_life}</th>
                        <th scope='col'>{data.product_code}</th>
                        <th scope='col'>{data.product_name}</th>
                        <th scope='col'>{data.subproduct_name}</th>
                        <button type="button" className="me-3 mt-4 btn btn-success ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#updateModalForm">
                        Update
                        </button>
                    </tr>
                    ))}
              </tbody>
          </table>
          {/* <AssetCategoryForm id='updateModalForm' label='Update Asset Category' button='Update' action='updated'/> */}
      </div>
    )
}
