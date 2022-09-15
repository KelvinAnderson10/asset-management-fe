// import React from 'react';
// import PropTypes from 'prop-types';

// const ItemInputs = ({ idx, itemState, handleItemChange }) => {
//     return (
//         <div key={`cat-${idx}`}>
//             <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
//             <input
//                 type="text"
//                 name={catId}
//                 data-idx={idx}
//                 id={catId}
//                 className="name"
//                 value={catState[idx].name}
//                 onChange={handleCatChange}
//             />
//             <label htmlFor={ageId}>Age</label>
//             <input
//                 type="text"
//                 name={ageId}
//                 data-idx={idx}
//                 id={ageId}
//                 className="age"
//                 value={catState[idx].age}
//                 onChange={handleCatChange}
//             />
//         </div>
//     );
// };

// CatInputs.propTypes = {
//     idx: PropTypes.number,
//     catState: PropTypes.array,
//     handleCatChange: PropTypes.func,
// };

// export default CatInputs;