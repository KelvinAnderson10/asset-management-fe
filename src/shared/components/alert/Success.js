import Swal from 'sweetalert2'

export const Success = (action) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `Data has been ${action}`,
    showConfirmButton: false,
    timer: 1500
})
}

/*
  added
  uploaded
  deleted
*/
