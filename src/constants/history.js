export const dataHead = [
  {
    headerName: 'Date',
    fieldname: 'date',
    noCap: true,
  },
  {
    headerName: 'Patient',
    fieldname: 'patient',
    fieldChild: 'name',
  },
  {
    headerName: 'Doctor',
    fieldname: 'doctor',
    fieldChild: 'name',
  },
  {
    headerName: 'Status',
    fieldname: 'outpatientCondition',
    fieldChild: 'conditions',
  },
]
