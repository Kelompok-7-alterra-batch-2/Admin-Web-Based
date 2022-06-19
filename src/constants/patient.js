export const field = [
  {
    title: 'Name',
    fieldname: 'name',
    type: 'text',
  },
  {
    title: 'Date of Birth',
    fieldname: 'dob',
    type: 'date',
  },
  {
    title: 'Gender',
    fieldname: 'gender',
    type: 'radio',
    option: [
      {
        title: 'Male',
        value: 'Male',
      },
      {
        title: 'Female',
        value: 'Female',
      },
    ],
  },
  {
    title: 'Phone Number',
    fieldname: 'phone_number',
    type: 'text',
  },
  {
    title: 'Blood Type',
    fieldname: 'blood_type',
    type: 'select',
    option: [
      {
        title: 'A',
        value: 'A',
      },
      {
        title: 'AB',
        value: 'AB',
      },
      {
        title: 'B',
        value: 'B',
      },
      {
        title: 'O',
        value: 'O',
      },
    ],
  },
  {
    title: 'City',
    fieldname: 'city',
    type: 'text',
  },
  {
    title: 'Address',
    fieldname: 'address',
    type: 'text',
  },
]

export const initialData = {
  name: '',
  dob: '',
  gender: '',
  phone_number: '',
  blood_type: '',
  city: '',
  address: '',
}

export const dataHead = [
  {
    headerName: 'Patient ID',
    fieldname: 'id',
  },
  {
    headerName: 'Name',
    fieldname: 'name',
  },
  {
    headerName: 'Date of Birth',
    fieldname: 'dob',
  },
  {
    headerName: 'Gender',
    fieldname: 'gender',
  },
  {
    headerName: 'Blood Type',
    fieldname: 'blood_type',
  },
  {
    headerName: 'Edit',
    fieldname: 'edit',
  },
]
