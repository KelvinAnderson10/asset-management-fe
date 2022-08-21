import React, { useState } from 'react'
import { Success } from '../../shared/components/alert/Success'

export const AssetCategoryForm = ({id, label, button, action}) => {
    const[data, setData] = useState({
        assetCategory:'',
        usefulLife:'',
        productCode: '',
        productName: '',
        subproductName:''
    })

    const handleChange = (e) => {
        const newData = {...data}
        newData[e.target.name] = e.target.value
        setData(newData)
        console.log(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Success(action);
        clearForm();
    }

    const clearForm = () => {
        setData({
        assetCategory:'',
        usefulLife:0,
        productCode: '',
        productName: '',
        subproductName:''
        })
    }

    return (
        <div>
            <div className='modal fade' id={id} tabIndex='-1' aria-hidden='true'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='exampleModallabel'>{label}</h5>
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
                                            value={data.assetCategory}
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
                                            value={data.usefulLife}
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
                                            value={data.productCode}
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
                                            value={data.productName}
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
                                            value={data.subproductName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='modal-footer d-block'>
                                        <button type='submit' dat-bs-dismiss='modal' className='btn btn-warning float-end'>{button}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}