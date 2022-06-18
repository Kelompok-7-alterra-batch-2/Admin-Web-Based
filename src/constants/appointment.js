let moment = require('moment')

export const dataHead = [
  {
    headerName: 'Queue',
    fieldname: 'queue',
  },
  {
    headerName: 'Time',
    fieldname: 'time',
  },
  {
    headerName: 'Patient',
    fieldname: 'patient',
  },
  {
    headerName: 'Doctor',
    fieldname: 'doctor',
  },
  {
    headerName: 'Status',
    fieldname: 'status',
  },
  {
    headerName: 'Edit',
    fieldname: 'edit',
  },
]

export const field = [
  {
    title: 'Patient',
    fieldname: 'patient',
    type: 'search',
  },
  {
    title: 'Department',
    fieldname: 'department',
  },
  {
    title: 'Appointment Date',
    fieldname: 'date',
    type: 'date',
  },
  {
    title: 'Appointment Time',
    fieldname: 'time',
    type: 'time',
  },
  {
    title: 'Doctor',
    fieldname: 'doctor',
  },
  {
    title: 'Appointment Reason',
    fieldname: 'reason',
    type: 'area',
    rows: 3,
  },
]

export const filterItem = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'General',
    value: 'general',
  },
  {
    title: 'Neurology',
    value: 'neurology',
  },
  {
    title: 'Cardiology',
    value: 'cardiology',
  },
  {
    title: 'Pediatric',
    value: 'pediatric',
  },
  {
    title: 'Gynecology',
    value: 'gynecology',
  },
]

export const initialData = {
  patient: '',
  department: '',
  date: moment().format('YYYY[-]MM[-]DD'), 
  time: moment().format('HH[:]mm'),
  doctor: '',
  reason: '',
  status: 'pending',
}
