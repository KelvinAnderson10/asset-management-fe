import { Button, Form, Input, Select, Space} from 'antd';
import React, { useEffect, useState } from 'react'
import './FormCoba.css'
import { FiMinusCircle,FiPlus } from "react-icons/fi";
import { useAuth } from '../../services/UseAuth';

// const {  MinusCircleOutlined, PlusOutlined  } = icons;
// const {  Button, Form, Input, Select, Space  } = antd;

const { Option } = Select;
const areas = [
  {
    label: 'Beijing',
    value: 'Beijing',
  },
  {
    label: 'Shanghai',
    value: 'Shanghai',
  },
];
const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};

export const FormCoba = () => {

  const [formFields, setFormFields] = useState({
    location_id:'',
    User:'',
    Jabatan:'',
    jenis_produk:'',
    approver_level_1:'',
    status:'',
    tipe:'',
    PurchaseOrderDetail:[
      {
        nama_barang:'',
        vendor_1:'',
        vendor_2:'',
        vendor_3:'',
        item_price_1:'',
        item_price_2:'',
        item_price_3:'',
        quantity:'',
        ppn:'',
       biaya_lain_lain:'' 
      }
    ]
  })

  

  const handleFormChange = (event, index) => {
    let data = [...formFields.PurchaseOrderDetail];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {
      nama_barang:'',
        vendor_1:'',
        vendor_2:'',
        vendor_3:'',
        item_price_1:'',
        item_price_2:'',
        item_price_3:'',
        quantity:'',
        ppn:'',
        biaya_lain_lain:'' 
    }

    setFormFields([...formFields.PurchaseOrderDetail, object])
  }

  const removeFields = (index) => {
    let data = [...formFields.PurchaseOrderDetail];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        {formFields.PurchaseOrderDetail.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='nama_barang'
                placeholder='Item Name'
                onChange={event => handleFormChange(event, index)}
                value={form.nama_barang}
              />
              <input
                name='vendor_1'
                placeholder='Vendor 1'
                onChange={event => handleFormChange(event, index)}
                value={form.vendor_1}
              />
              <input
                name='item_price_1'
                placeholder='item_price_1'
                onChange={event => handleFormChange(event, index)}
                value={form.item_price_1}
              />
              <input
                name='vendor_2'
                placeholder='vendor_2'
                onChange={event => handleFormChange(event, index)}
                value={form.vendor_2}
              />
              <input
                name='item_price_2'
                placeholder='item_price_2'
                onChange={event => handleFormChange(event, index)}
                value={form.item_price_2}
              />
              <input
                name='vendor_3'
                placeholder='vendor_3'
                onChange={event => handleFormChange(event, index)}
                value={form.vendor_3}
              />
              <input
                name='item_price_3'
                placeholder='item_price_3'
                onChange={event => handleFormChange(event, index)}
                value={form.item_price_3}
              />
              <input
                name='quantity'
                placeholder='Quantity'
                onChange={event => handleFormChange(event, index)}
                value={form.quantity}
              />
              <input
                name='ppn'
                placeholder='ppn'
                onChange={event => handleFormChange(event, index)}
                value={form.ppn}
              />
              <input
                name='Biaya Lain-Lain'
                placeholder='Additional Cost'
                onChange={event => handleFormChange(event, index)}
                value={form.biaya_lain_lain}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <button onClick={addFields}>Add More..</button>
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

  // const [form] = Form.useForm();
  // useEffect(() => {
  //   // onGetAllSubProduct();
  //   // onGetAllVendor();
  //   // onGetAllLocation();
  //   onGetCookie();
  // }, []);

  // const onFinish = (values) => {
  //   console.log('Received values of form:', values);
  // };

  // const handleChange = () => {
  //   form.setFieldsValue({
  //     sights: [],
  //   });
  // };

  // const { getCookie } = useAuth();
  // const[user,setUser]= useState({
  //   name:'',
  //   role:'',
  //   level_approval:'',
  //   location_id:'',
  //   tap:'',
  //   cluster:'',
  //   department: ''
  // })
  // const onGetCookie = ()=>{
  //   let savedUserJsonString = getCookie("user")
  //   let savedUser = JSON.parse(savedUserJsonString)
  //   setUser(prevObj=>({...prevObj,name:(savedUser.name), role:(savedUser.role), level_approval:(savedUser.level_approval), location_id:(savedUser.location_id), tap:(savedUser.TAP), cluster:(savedUser.Cluster), department:(savedUser.department)}))
  // }
  // console.log(user)

  // return (
  //   <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        
  //       <Input label='Area Code' value={user.location_id} />
     
  //     <Form.Item
  //       name="area"
  //       label="Area"
  //       rules={[
  //         {
  //           required: true,
  //           message: 'Missing area',
  //         },
  //       ]}
  //     >
  //       <Select options={areas} onChange={handleChange} />
  //     </Form.Item>
  //     <Form.List name="sights">
  //       {(fields, { add, remove }) => (
  //         <>
  //           {fields.map((field) => (
  //             <Space key={field.key} align="baseline">
  //               <Form.Item
  //                 noStyle
  //                 shouldUpdate={(prevValues, curValues) =>
  //                   prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
  //                 }
  //               >
  //                 {() => (
  //                   <Form.Item
  //                     {...field}
  //                     label="Sight"
  //                     name={[field.name, 'sight']}
  //                     rules={[
  //                       {
  //                         required: true,
  //                         message: 'Missing sight',
  //                       },
  //                     ]}
  //                   >
  //                     <Select
  //                       disabled={!form.getFieldValue('area')}
  //                       style={{
  //                         width: 130,
  //                       }}
  //                     >
  //                       {(sights[form.getFieldValue('area')] || []).map((item) => (
  //                         <Option key={item} value={item}>
  //                           {item}
  //                         </Option>
  //                       ))}
  //                     </Select>
  //                   </Form.Item>
  //                 )}
  //               </Form.Item>
  //               <Form.Item
  //                 {...field}
  //                 label="Price"
  //                 name={[field.name, 'price']}
  //                 rules={[
  //                   {
  //                     required: true,
  //                     message: 'Missing price',
  //                   },
  //                 ]}
  //               >
  //                 <Input />
  //               </Form.Item>

  //               <FiMinusCircle onClick={() => remove(field.name)} />
  //             </Space>
  //           ))}

  //           <Form.Item>
  //             <Button type="dashed" onClick={() => add()} block icon={<FiPlus />}>
  //               Add sights
  //             </Button>
  //           </Form.Item>
  //         </>
  //       )}
  //     </Form.List>
  //     <Form.Item>
  //       <Button type="primary" htmlType="submit">
  //         Submit
  //       </Button>
  //     </Form.Item>
  //   </Form>
  // );




