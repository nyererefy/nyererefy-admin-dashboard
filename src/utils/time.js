import moment from 'moment'

export function formatTime(time) {
  return moment(time).format('MMMM Do YYYY, h:mm:ss a')
}
