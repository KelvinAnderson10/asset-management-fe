

// import React, { useState } from 'react'
// import { useForm } from 'react-form-hooks'


// import ArrayFormField from './components/ArrayFormField'
// import { Input } from './components/Component'
// import FormField from './components/FormField'
// import FormFooter from './components/FormFooter'



// export default function NestedForm() {
//   const [values, setValues] = useState({
//     name: {
//       firstname: 'John',
//       lastname: 'Doe',
//     },
//   })
//   const defaultValues = {
//     name: {
//       firstname: 'John',
//       lastname: 'Doe',
//     },
//     items: [1, 2],
//     itemsObj: [
//       {
//         title: 'My title',
//         description: 'My desc',
//       },
//     ],
//     email: 'form@email.me',
//   }
//   const changeValues = () => setValues(defaultValues)
//   const onSubmit = values => alert(JSON.stringify(values, null, 2))
//   const form = useForm({ initialValues: values })
//   console.log('FORM_RERENDER')

//   return (
//     <form
//       className="form-horizontal"
//       onSubmit={form.formActions.submitHandler(onSubmit)}
//     >
//       <FormField
//         form={form}
//         id="name.firstname"
//         label="Firstname"
//         component={Input}
//         validate={value => {
//           return /\d/.test(value) && 'should not contain a number'
//         }}
//         onChange={value => {
//           return value.toUpperCase()
//         }}
//       />
//       <FormField
//         form={form}
//         id="name.lastname"
//         label="Lastname"
//         component={Input}
//       />
//       <FormField
//         form={form}
//         id="email"
//         label="Email"
//         component={Input}
//         validate={value => /\d/.test(value) && 'should not contain a number'}
//       />
//       <ArrayFormField
//         form={form}
//         id="items"
//         label="Items"
//         validate={value => value.length < 2 && 'should have more than 1 items'}
//         InputProps={{
//           renderField: (id, index) => (
//             <FormField
//               form={form}
//               id={id}
//               label={`Item ${index}`}
//               component={Input}
//               validate={value => value <= 10 && 'should be greater than 10'}
//               InputProps={{
//                 type: 'number',
//               }}
//             />
//           ),
//         }}
//       />
//       <ArrayFormField
//         form={form}
//         id="itemsObj"
//         label="Items Object"
//         InputProps={{
//           renderField: (id, index) => (
//             <>
//               <FormField
//                 form={form}
//                 id={`${id}.title`}
//                 label={`Title ${index}`}
//                 component={Input}
//               />
//               <FormField
//                 form={form}
//                 id={`${id}.description`}
//                 label={`Description ${index}`}
//                 component={Input}
//               />
//             </>
//           ),
//         }}
//       />

//       <FormFooter form={form} resetToNewValues={changeValues} />
//     </form>
//   )
// }

