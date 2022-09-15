

// import React from 'react'
// import { useFieldState } from 'react-form-hooks'
// import { Field } from './Component'

// export default function FormField({
//   form,
//   id,
//   component: InputComponent,
//   validate,
//   InputProps,
//   onChange = v => v,
//   mapState,
//   label,
//   InputLabelProps,
// }) {
//   const fieldState = useFieldState(form, id, mapState, { validate })
//   const { changeFieldValue, touchField } = form.fieldActions
//   const { value, touched, dirty, error } = fieldState

//   console.log('%cFIELD_STATE_UPDATE', 'background: #8f8', id, fieldState)

//   return (
//     <Field
//       id={id}
//       label={label}
//       InputLabelProps={InputLabelProps}
//       error={error}
//       touched={touched}
//       dirty={dirty}
//     >
//       <InputComponent
//         id={id}
//         value={value}
//         onChange={value => changeFieldValue(id, onChange(value))}
//         onBlur={() => touchField(id)}
//         {...InputProps}
//       />
//     </Field>
//   )
// }

