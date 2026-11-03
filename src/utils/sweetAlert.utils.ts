import Swal, { type SweetAlertResult } from 'sweetalert2'

interface AlertSettings {
  allowEscapeKey?: boolean
  allowOutsideClick?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  html?: string
  onCancel?: () => void
  onConfirm?: () => void
  preConfirm?: () => void | Promise<unknown>
  showCancelButton?: boolean
  showConfirmButton?: boolean
  showLoaderOnConfirm?: boolean
  target?: string | HTMLElement
  text?: string
  timer?: number
  title: string
}

type AlertIcon = 'success' | 'error' | 'warning' | 'info'

export const successAlert = (settings: AlertSettings) => {
  return fireAlert('success', settings)
}

export const errorAlert = (settings: AlertSettings): Promise<boolean> => {
  return fireAlert('error', settings)
}

export const warningAlert = (settings: AlertSettings): Promise<boolean> => {
  return fireAlert('warning', settings)
}

export const infoAlert = (settings: AlertSettings): Promise<boolean> => {
  return fireAlert('info', settings)
}

const fireAlert = (icon: AlertIcon, settings: AlertSettings): Promise<boolean> => {
  const { onConfirm, onCancel, ...swalOptions } = settings

  return Swal.fire({
    ...swalOptions,
    icon,
    customClass: {
      actions: 'gap-4',
    },
  }).then((result) => handleActions(result, settings))
}

const handleActions = (result: SweetAlertResult, options: AlertSettings): boolean => {
  if (result.isConfirmed) {
    options?.onConfirm?.()
  } else {
    options?.onCancel?.()
  }
  return result.isConfirmed
}
