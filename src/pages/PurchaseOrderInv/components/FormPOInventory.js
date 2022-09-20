import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../services/UseAuth';
import { useDeps } from '../../../shared/context/DependencyContext';
import './FormPOInventory.css'
import * as BsIcons from 'react-icons/bs'
import swal from "sweetalert";

export const FormPOInventory = () => {
    const [POdata, setPOData] = useState(
        [    
        {
          ["Nama Barang"]: "",
          vendor_1: "",
          vendor_2: "",
          vendor_3: "",
          item_price_1: "",
          item_price_2: "",
          item_price_3: "",
          quantity: "",
          ppn: "",
          
          ["Biaya Lain-Lain"]: "",
        },
    ]);

    const [POHeader, setPOHeader] = useState({
        PurchaseOrderDetail :[],
        tipe:"Inventory",
      });
    
    const [data, setData] = useState([]);
    const [subProductName, setSubProductName] = useState([]);
    const { assetItemService, vendorService, locationService, userService, purchaseOrderService } = useDeps();


    useEffect(() => {
        onGetAllSubProduct();
        onGetAllVendor();
        onGetCookie();
    }, []);

    const handleChange = (e) => {
        const newData = { ...POHeader };
        newData[e.target.name] = e.target.value;
        setPOHeader(newData);
        console.log(newData);
    };
    
    const handleFormChange = (event, index) => {
        let data = [...POdata];
        data[index][event.target.name] = event.target.value;
        setPOData(data);
        console.log(POdata);
    };

    const addFields = (e) => {
        e.preventDefault();
        let object = {
          ["Nama Barang"]: "",
          vendor_1: "",
          vendor_2: "",
          vendor_3: "",
          item_price_1: "",
          item_price_2: "",
          item_price_3: "",
          quantity: "",
          ppn: "",
          ["Biaya Lain-Lain"]: "",
        };
        setPOData([...POdata, object]);
    };

    const removeFields = (index) => {
        let data = [...POdata];
        data.splice(index, 1);
        setPOData(data);
    };

    const onSubmitPO = async (e) => {
        e.preventDefault()
        try {
          POHeader['Kode Wilayah'] = user.location_id
          POHeader['requester']= user.name
          POHeader.status = 'Pending'
          for (let i in POdata) {
          POdata[i].item_price_1= Number(POdata[i].item_price_1)
          POdata[i].item_price_2= Number(POdata[i].item_price_2)
          POdata[i].item_price_3= Number(POdata[i].item_price_3)
          POdata[i].quantity= Number(POdata[i].quantity)
          POdata[i].ppn= Number(POdata[i].ppn)
          POdata[i].ppn= Boolean(POdata[i].ppn)
          POdata[i]["Biaya Lain-Lain"]= Number(POdata[i]["Biaya Lain-Lain"])
          }    
          POHeader.PurchaseOrderDetail= [...POdata]
          console.log('ini merge',POHeader)
          const response = await purchaseOrderService.createPO(POHeader)
          console.log('ini response',response)
          handleClearForm()
          if (response.status === "SUCCESS") {
            swal({
              title: "Success!",
              text: "Your data has been saved!",
              icon: "success",
              button: "OK!",
            });
          }

        } catch (error) {
          console.log(error)
        } finally{
          e.target.reset()
        }
    };

    // GET ALL SUBPRODUCT NAME
    const onGetAllSubProduct = async () => {
        try {
        const response = await assetItemService.getAllAsset();
        setSubProductName(response.data);
        } catch (e) {
        console.log(e);
        } finally {
        }
    };

    // GET ALL VENDOR
    const [vendor, setVendor] = useState([]);

    const onGetAllVendor = async () => {
        try {
        const response = await vendorService.getAllVendor();
        setVendor(response.data);
        } catch (e) {
        console.log(e);
        } finally {
        }
    };

    //Get User
    const { getCookie } = useAuth();
    const [user, setUser] = useState({
        name: "",
        role: "",
        level_approval: "",
        location_id: "",
        tap: "",
        cluster: "",
        department: "",
    });
    const onGetCookie = () => {
        let savedUserJsonString = getCookie("user");
        let savedUser = JSON.parse(savedUserJsonString);
        setUser((prevObj) => ({
        ...prevObj,
        name: savedUser.name,
        role: savedUser.role,
        level_approval: savedUser.level_approval,
        location_id: savedUser.location_id,
        tap: savedUser.tap,
        cluster: savedUser.cluster,
        department: savedUser.department,
        }));
    };

    const handleClearForm = () => {
        setPOHeader({})
        setPOData([0])
    }

    return (
        <>
            <div className='po-inv-form-container'>
                <div className='po-inv-form-card'>
                <form  onSubmit={onSubmitPO} >
                    <h4 className="mb-5 text-danger">
                      Purchase Order Request Form
                    </h4>
                    <div className="formPOInput">
                      <div className="row">
                        <div className="mb-3 col-md-4">
                          <label>
                            Area Code<span className="text-danger">*</span>
                          </label>
                          <input
                            readOnly
                            defaultValue={user.location_id}
                            type="text"
                            name="Kode Wilayah"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label>
                            To User<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="ToUser"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label>
                            Position<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="Jabatan"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-6 ">
                          <label>
                            Subproduct Name
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            required
                            name="Jenis Produk"
                            value={data["Jenis Produk"]}
                            onChange={handleChange}
                          >
                            <option value="">Select Subproduct</option>
                            {subProductName.map((item) => (
                              <option
                                key={item.subproduct_name}
                                value={item.subproduct_name}
                              >
                                {item.subproduct_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 col-md-6 ">
                          <label>
                            Type
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            readOnly
                            value="Inventory"
                            type="text"
                            name="tipe"
                            className="form-control"
                          />
                        </div>
                        
                        {POdata.map((form, index) => {
                          return (
                            <div key={index}>
                                <div className='header-item-add'>
                                <h3 style={{textAlign:'center'}}>Item {index+1} </h3>
                                {index > 0 && 
                                        <a onClick={() => removeFields(index)}><BsIcons.BsTrash size='2em' color='red'/></a>
                                    }
                                </div>
                              <div className="row">
                                <div className="inputBoxPO mb-3">  
                                <label>
                                    Item Name
                                    <span className="text-danger">*</span>{" "}
                                </label>          
                                  <input
                                    name="Nama Barang"
                                    placeholder="Item Name"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form["Nama Barang"]}
                                  />
                                </div>

                                <div className="inputBoxPO mb-3 col-md-6 ">
                                  <label>
                                    1<span className="subscript">st</span>{" "}
                                    Vendor
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    required
                                    name="vendor_1"
                                    value={form.vendor_1}
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                  >
                                    <option value="">Select Vendor</option>
                                    {vendor.map((item) => (
                                      <option key={item.name} value={item.name}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="inputBoxPO mb-3 col-md-6">
                                  <label>
                                    1<span className="subscript">st</span> Item
                                    Price
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                  type='number'
                                    name="item_price_1"
                                    placeholder="item_price_1"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form.item_price_1}
                                  />
                                </div>

                                <div className="inputBoxPO mb-3 col-md-6 ">
                                  <label>
                                    2<span className="subscript">nd</span>{" "}
                                    Vendor
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    required
                                    name="vendor_2"
                                    value={form.vendor_2}
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                  >
                                    <option value="">Select Vendor</option>
                    
                                    {vendor.map((item) => (
                                      <option key={item.name} value={item.name}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="inputBoxPO mb-3 col-md-6">
                                  <label>
                                    2<span className="subscript">nd</span> Item
                                    Price
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                  type='number'
                                    name="item_price_2"
                                    placeholder="item_price_2"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form.item_price_2}
                                  />
                                </div>

                                <div className="inputBoxPO mb-3 col-md-6 ">
                                  <label>
                                    3<span className="subscript">st</span>{" "}
                                    Vendor
                                  </label>
                                  <select
                                    name="vendor_3"
                                    value={form.vendor_3}
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                  >
                                    <option value="">Select Vendor</option>

                                    {vendor.map((item) => (
                                      <option key={item.name} value={item.name}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="inputBoxPO mb-3 col-md-6">
                                  <label>
                                    3<span className="subscript">rd</span> Item
                                    Price
                                  </label>
                                  <input
                                  type='number'
                                    name="item_price_3"
                                    placeholder="item_price_3"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form.item_price_3}
                                  />
                                </div>
                                <div className="inputBoxPO mb-3 col-md-4">
                                <label>
                                    Quantity
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                  type='number'
                                    name="quantity"
                                    placeholder="Quantity"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form.quantity}
                                  />
                                </div>
                                <div className="inputBoxPO mb-3 col-md-4">
                                <label>
                                    PPN
                                    <span className="text-danger">*</span>
                                  </label>
                                <select
                                  required
                                  name="ppn"
                                  value={form.ppn}
                                  onChange={(event) =>
                                    handleFormChange(event, index)
                                  }
                                  style={{ width: "95%" }}
                                >
                                  <option value="">Select Condition</option>
                                  <option value='1'>Yes</option>
                                  <option value='0'>No</option>
                                </select>
                                </div>
                                <div className="inputBoxPO mb-3 col-md-4">
                                <label>
                                    Additional Cost
                                    <span className="text-danger">*</span>
                                  </label>
                                <input
                                  type='number'
                                  name="Biaya Lain-Lain"
                                  placeholder="Additional Cost"
                                  onChange={(event) =>
                                    handleFormChange(event, index)
                                  }
                                  value={form["Biaya Lain-Lain"]}
                                />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className='col-md-12'>
                            <button className='btn btn-success float-start' onClick={addFields}>Add More..</button>
                        </div>
                        <div className="col-md-12">
                          <button className="btn btn-primary float-end" style={{marginLeft:'20px', marginRight:'20px'}}>
                            Submit
                          </button>
                          <button
                            onClick={handleClearForm}
                            className="btn btn-warning float-end"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
            </div>
        </>
    )
}
