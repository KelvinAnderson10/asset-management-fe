import React from 'react'

import Swal from 'sweetalert2'
export const Failed = (action) => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Oops !`,
        text: `${action}`,
        
    })
}
