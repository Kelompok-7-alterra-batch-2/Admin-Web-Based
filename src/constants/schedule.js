export const dayList = ['yesterday', 'today', 'tomorrow']

export const dataHead = [
  // {
  //   headerName : 'Date',
  //
  // },
  {
    headerName: 'Department',
    fieldname: 'department',
    fieldChild: 'name',
  },
  {
    headerName: 'Doctor Name',
    fieldname: 'name',
  },
  {
    headerName: 'Available From',
    fieldname: 'availableFrom',
    noCap: true,
  },
  {
    headerName: 'Available To',
    fieldname: 'availableTo',
    noCap: true,
  },
  {
    headerName: 'Edit',
    fieldname: 'edit',
  },
]

export const field = [
  {
    title: 'Available From',
    fieldname: 'availableFrom',
    type: 'time',
  },
  {
    title: 'Available To',
    fieldname: 'availableTo',
    type: 'time',
  },
]
