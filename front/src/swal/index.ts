import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

export default {
  success: async (message: string, title?: string): Promise<void> => {
    await Swal.fire({
      icon: 'success',
      title: title ?? 'Success',
      text: message,
      confirmButtonText: 'OK'
    })
  },

  danger: async (message: string, title?: string): Promise<void> => {
    await Swal.fire({
      icon: 'error',
      title: title ?? 'ERROR',
      text: message,
      confirmButtonText: 'OK'
    })
  },

  info: async (message: string, title?: string): Promise<void> => {
    await Swal.fire({
      icon: 'info',
      title: title ?? 'Info',
      text: message,
      confirmButtonText: 'OK'
    })
  },

  warning: async (message: string, title?: string): Promise<void> => {
    await Swal.fire({
      icon: 'warning',
      title: title ?? 'Warning',
      text: message,
      confirmButtonText: 'OK'
    })
  },

  custom: async (
    options: SweetAlertOptions
  ): Promise<SweetAlertResult<any>> => {
    return await Swal.fire(options)
  }
}
