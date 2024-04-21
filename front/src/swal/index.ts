import Swal from 'sweetalert2'

export default {
  success: (message: string, title?: string): void => {
    Swal.fire({
      icon: 'success',
      title: title ?? 'Success',
      text: message,
      confirmButtonText: 'OK'
    })
  },

  danger: (message: string, title?: string): void => {
    Swal.fire({
      icon: 'error',
      title: title ?? 'ERROR',
      text: message,
      confirmButtonText: 'OK'
    })
  },

  info: (message: string, title?: string): void => {
    Swal.fire({
      icon: 'info',
      title: title ?? 'Info',
      text: message,
      confirmButtonText: 'OK'
    })
  },

  warning: (message: string, title?: string): void => {
    Swal.fire({
      icon: 'warning',
      title: title ?? 'Warning',
      text: message,
      confirmButtonText: 'OK'
    })
  }
}
