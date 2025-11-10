import { Notify } from 'quasar'

export default {
  showSuccess: (message) => {
    Notify.create({
      message,
      color: 'positive',
      timeout: 2000,
      type: 'positive',
      position: 'top',
    })
  },
  showWarning: (message) => {
    Notify.create({
      message,
      color: 'warning',
      timeout: 2000,
      type: 'warning',
      position: 'top',
    })
  },
  showError: (message) => {
    Notify.create({
      message,
      color: 'negative',
      timeout: 2000,
      type: 'negative',
      position: 'top',
    })
  },
}
