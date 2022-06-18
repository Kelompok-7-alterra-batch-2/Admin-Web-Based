export const field = [
  {
    title: 'Doctor Name',
    fieldname: 'name',
    type: 'text',
  },
  {
    title: 'NID',
    fieldname: 'nid',
    type: 'text',
  },
  {
    title: 'Department',
    fieldname: 'department',
    type: 'select',
    option: [
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
    ],
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
    fieldname: 'phone_number',
    type: 'text',
  },
]

export const initialData = {
  name: '',
  nid: '',
  department: '',
  email: '',
  password: '',
  phone_number: '',
}

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

export const dataHead = [
  {
    headerName: 'NID',
    fieldname: 'id',
  },
  {
    headerName: 'Department',
    fieldname: 'department',
  },
  {
    headerName: 'Doctor Name',
    fieldname: 'name',
  },
  {
    headerName: 'Phone Number',
    fieldname: 'phone_number',
  },
  {
    headerName: 'Edit',
    fieldname: 'edit',
  },
]
