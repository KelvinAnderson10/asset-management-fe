

// import React, { useLayoutEffect, useRef } from 'react'
// import classNames from 'classnames'

// export const Field = ({
//   id,
//   label,
//   InputLabelProps,
//   error,
//   touched,
//   dirty,
//   children,
// }) => {
//   const showError = touched && error

//   return (
//     <div className={classNames('form-group', showError && 'has-error')}>
//       {label && (
//         <div className="col-3 col-sm-12">
//           <label className="form-label" htmlFor={id} {...InputLabelProps}>
//             {label}
//           </label>
//         </div>
//       )}
//       <div className="col-9 col-sm-12" style={{ position: 'relative' }}>
//         {children}
//         {showError && <div className="form-input-hint">{error}</div>}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             padding: 6,
//             opacity: 0.3,
//             pointerEvents: 'none',
//           }}
//         >
//           {touched && <span className="label label-primary">Touched</span>}
//           {dirty && (
//             <span className="label label-warning" style={{ marginLeft: 3 }}>
//               Dirty
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export const FormStateAndButton = ({
//   anyTouched,
//   anyDirty,
//   anyError,
//   values,
//   errors,
//   resetToInitial,
//   resetToNew,
// }) => (
//   <div style={{ position: 'relative' }}>
//     <Code>{JSON.stringify(values, null, 2)}</Code>

//     {errors && (
//       <Code style={{ background: '#fce2e2' }}>
//         {JSON.stringify(errors, null, 2)}
//       </Code>
//     )}

//     <div
//       style={{
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         padding: 6,
//         pointerEvents: 'none',
//       }}
//     >
//       {anyTouched && <span className="label label-primary">Form Touched</span>}
//       {anyDirty && (
//         <span className="label label-warning" style={{ marginLeft: 3 }}>
//           Form Dirty
//         </span>
//       )}
//       {anyError && (
//         <span className="label label-error" style={{ marginLeft: 6 }}>
//           Form Invalid
//         </span>
//       )}
//     </div>
//     <Button disabled={!anyDirty} type="submit">
//       Submit
//     </Button>
//     {resetToInitial && (
//       <Button onClick={resetToInitial}>Reset to initial values</Button>
//     )}
//     {resetToNew && (
//       <Button onClick={resetToNew}>Reset to new initial values</Button>
//     )}
//   </div>
// )

// export const Code = ({ children, ...props }) => (
//   <pre className="code" data-lang="JSON">
//     <code {...props}>{children}</code>
//   </pre>
// )

// export const Button = props => (
//   <button
//     type="button"
//     className="btn btn-primary"
//     style={{ margin: 3 }}
//     {...props}
//   />
// )

// export function handleStringChange(handler) {
//   return event => handler(event.target.value)
// }

// export const Input = ({ onChange, value, ...otherProps }) => {
//   // Maintaining cursor position is not necessary here.
//   // It is necessary only if the value is being changed to a different one
//   // and the cursor jumps to the end of controlled input.
//   // https://github.com/facebook/react/issues/955
//   const cursorStart = useRef(null)
//   const cursorEnd = useRef(null)
//   const inputRef = useRef(null)
//   useLayoutEffect(() => {
//     if (cursorStart.current && cursorEnd.current) {
//       inputRef.current.setSelectionRange(cursorStart.current, cursorEnd.current)
//     }
//   }, [value])

//   return (
//     <input
//       ref={inputRef}
//       className="form-input"
//       onChange={e => {
//         cursorStart.current = e.target.selectionStart
//         cursorEnd.current = e.target.selectionEnd
//         return handleStringChange(onChange)(e)
//       }}
//       value={value}
//       {...otherProps}
//     />
//   )
// }

// function formatDate(date) {
//   let d = new Date(date),
//     month = '' + (d.getMonth() + 1),
//     day = '' + d.getDate(),
//     year = d.getFullYear()

//   if (month.length < 2) month = '0' + month
//   if (day.length < 2) day = '0' + day

//   return [year, month, day].join('-')
// }

// export const DatePicker = ({ value, onChange, ...otherProps }) => (
//   <Input
//     type="date"
//     value={value ? formatDate(value, 'YYYY-MM-DD') : ''}
//     onChange={value => {
//       if (!value) return onChange(null) // for clear button
//       return onChange(new Date(value).toISOString()) // set in utc as timezone is stripped in the server
//     }}
//     {...otherProps}
//   />
// )

// export const TimePicker = props => <Input type="time" {...props} />

// function formatDateTime(date) {
//   return date.replace('Z', '')
// }

// export const DateTimePicker = ({ value, onChange, ...otherProps }) => (
//   <Input
//     type="datetime-local"
//     value={value ? formatDateTime(value) : ''}
//     onChange={value => {
//       if (!value) return onChange(null) // for clear button
//       return onChange(new Date(value).toISOString()) // set in utc as timezone is stripped in the server
//     }}
//     {...otherProps}
//   />
// )

