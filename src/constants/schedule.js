export const dayList = ['yesterday', 'today', 'tomorrow']

export const listField = ['doctor_id','availableFrom','availableTo']

export const dataHead = [
  {
    headerName: 'Department',
    fieldname: 'doctor',
    fieldChild: 'department',
    fieldGrandChild: 'name',
  },
  {
    headerName: 'Doctor Name',
    fieldname: 'doctor',
    fieldChild: 'name',
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
    delete: true,
  },
]

export const field = [
  {
    title: 'Doctor',
    fieldname: 'doctor_id',
    type: 'doctor',
    value: 'doctor',
    valueChild: 'id',
    disabled: true,
  },
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

export const initialData =  {
    department: '',
    doctor_id: '',
    availableFrom: '',
    availableTo: '',
  }

export const initialError = {
   doctor_id : false,
   availableFrom : false,
   availableTo : false,
   submit : false,
}
