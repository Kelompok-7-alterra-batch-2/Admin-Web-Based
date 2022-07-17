import Swal from 'sweetalert2'

export const getModalExpired = () => {
  localStorage.removeItem('token')

  return Swal.fire({
    title: 'Your Session is Expired',
    text: 'You need to relogin again',
    icon: 'info',
    confirmButtonColor: '#4E89A8',
    confirmButtonText: 'Relogin',
  })
}
