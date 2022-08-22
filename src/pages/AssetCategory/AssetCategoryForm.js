import React, { useState } from 'react'
import { Success } from '../../shared/components/alert/Success'
import { useDeps } from '../../shared/context/DependencyContext';

export const AssetCategoryForm = () => {
    const[assetCategory, setAssetCategory] = useState({})
    const {assetCategoryService} = useDeps();
    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        const newData = {...assetCategory}
        newData[e.target.name] = e.target.value
        setAssetCategory(newData)
        console.log(newData);
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        try { 
            e.preventDefault();
            clearForm();
            const response = await assetCategoryService.createAssetCategory(assetCategory);
            setAssetCategory(response.data)
            console.log(response);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    const clearForm = () => {
        setAssetCategory({
        assetCategory:'',
        usefulLife:0,
        productCode: '',
        productName: '',
        subproductName:''
        })
    }

    return (
        <div>
            <div className="d-flex flex-row">
                    <button type="button" className="me-3 mt-4 btn btn-primary ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#addModalForm">
                    Add Asset Category +
                    </button>
            </div>
            <div className='modal fade' id='addModalForm' tabIndex='-1' aria-hidden='true'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='exampleModallabel'>Add New Asset Category</h5>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div className='modal-body'>
                                <form onSubmit={handleSubmit}>

                                    <div className='mb-3'>
                                        <div className='form-label'>Asset Category</div>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Asset Category'
                                            required
                                            name='assetCategory'
                                            value={assetCategory.assetCategory}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <div className='form-label'>Useful Life</div>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Useful Life'
                                            required
                                            name='usefulLife'
                                            value={assetCategory.usefulLife}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <div className='form-label'>Product Code</div>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Product Code'
                                            required
                                            name='productCode'
                                            value={assetCategory.productCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <div className='form-label'>Product Name</div>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Product Name'
                                            required
                                            name='productName'
                                            value={assetCategory.productName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <div className='form-label'>Subproduct Name</div>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Subproduct Name'
                                            required
                                            name='subproductName'
                                            value={assetCategory.subproductName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='modal-footer d-block'>
                                        <button type='submit' dat-bs-dismiss='modal' className='btn btn-warning float-end'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}