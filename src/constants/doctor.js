export const field = [
  {
    title: 'NID',
    fieldname: 'nid',
    type: 'text',
    typeInput: 'number',
  },
  {
    title: 'Doctor Name',
    fieldname: 'name',
    type: 'text',
    typeInput: 'noNumber',
  },
  {
    title: 'Date of Birth',
    fieldname: 'dob',
    type: 'date',
  },
  {
    title: 'Department',
    fieldname: 'department_id',
    type: 'department',
    value: 'department',
    valueChild: 'id',
  },
  {
    title: 'Email',
    fieldname: 'email',
    type: 'email',
  },
  {
    title: 'Password',
    fieldname: 'password',
    type: 'password',
  },
  {
    title: 'Phone Number',
    fieldname: 'phoneNumber',
    type: 'text',
    typeInput: 'number',
  },
]

export const initialData = {
  name: '',
  nid: '',
  department_id: '',
  email: '',
  password: '',
  phoneNumber: '',
}

export const dataHead = [
  {
    headerName: 'NID',
    fieldname: 'nid',
    noCap: true,
  },
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
    headerName: 'Phone Number',
    fieldname: 'phoneNumber',
    noCap: true,
  },
  {
    headerName: 'Edit',
    fieldname: 'edit',
    delete: true,
  },
]
