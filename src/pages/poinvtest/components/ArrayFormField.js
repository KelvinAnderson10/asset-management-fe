

// import React from 'react'

// import FormField from './FormField'
// import { Button } from './Component'

// export const ArrayInput = ({
//   form,
//   onChange,
//   onBlur,
//   id,
//   value,
//   renderField,
// }) => {
//   const { getFieldState } = form.fieldActions
//   const arr = Array(value).fill(1)
//   const addItem = () => onChange([...getFieldState(id).value, null])
//   const deleteItem = index => () =>
//     onChange(getFieldState(id).value.filter((_, i) => index !== i))

//   return (
//     <>
//       {arr.map((_, i) => {
//         return (
//           <div key={i} style={{ position: 'relative', paddingBottom: '12px' }}>
//             <div>{renderField(`${id}[${i}]`, i)}</div>
//             <Button
//               style={{ position: 'absolute', top: 0, right: 0 }}
//               onClick={deleteItem(i)}
//             >
//               Delete
//             </Button>
//           </div>
//         )
//       })}
//       <Button onClick={addItem} style={{ width: '100%' }}>
//         Add
//       </Button>
//     </>
//   )
// }

// export default function ArrayFormField({ InputProps, ...props }) {
//   return (
//     <FormField
//       mapState={state => ({
//         value: state.value ? state.value.length : 0,
//         error: state.error,
//         dirty: state.dirty,
//       })}
//       component={ArrayInput}
//       InputProps={{
//         form: props.form,
//         ...InputProps,
//       }}
//       {...props}
//     />
//   )
// }

