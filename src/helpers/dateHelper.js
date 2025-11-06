import moment from 'moment'

export default {
  brazilFormat: (date) => {
    return moment(date).format('DD/MM/YYYY') || ''
  },
  sqlDate: (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm')
  },
  brazilDateTimeFormat: (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm') ?? ''
  },
}
