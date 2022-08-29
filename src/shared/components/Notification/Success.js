
import Swal from 'sweetalert2'

export const Success = (action) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `data ${action} sucessfully`,
    showConfirmButton: false,
    timer: 1500
})
}