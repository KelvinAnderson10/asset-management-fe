

// import React, { useCallback } from 'react'
// import { useFormState } from 'react-form-hooks'

// import { FormStateAndButton } from './Component'

// export default function FormFooter({ form, resetToNewValues }) {
//   const formState = useFormState(
//     form,
//     useCallback(
//       state => ({
//         anyError: state.anyError,
//         anyDirty: state.anyDirty,
//         anyTouched: state.anyTouched,
//         errors: state.errors,
//         values: state.values,
//       }),
//       []
//     )
//   )
//   const { anyError, anyDirty, anyTouched, values, errors } = formState

//   console.log('%cFORM_STATE_UPDATE', 'background: #f77;color: white', formState)
//   return (
//     <FormStateAndButton
//       {...{ anyError, anyDirty, anyTouched, errors, values }}
//       resetToInitial={() => form.formActions.resetFormValues()}
//       resetToNew={resetToNewValues}
//     />
//   )
// }

