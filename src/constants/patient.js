export const field = [
  {
    title: 'Name',
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
    title: 'Gender',
    fieldname: 'gender_id',
    type: 'radio',
    param: {
      title: 'type',
      value: 'id',
    },
    option: [
      {
        id: 1,
        type: 'Male',
      },
      {
        id: 2,
        type: 'Female',
      },
    ],
  },
  {
    title: 'Phone Number',
    fieldname: 'phoneNumber',
    type: 'text',
    typeInput: 'number',
  },
  {
    title: 'Blood Type',
    fieldname: 'blood_type_id',
    type: 'select',
    param: {
      title: 'type',
      value: 'id',
    },
    option: [
      {
        id: 1,
        type: 'A',
      },
      {
        id: 2,
        type: 'AB',
      },
      {
        id: 3,
        type: 'B',
      },
      {
        id: 4,
        type: 'O',
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
  gender_id: '',
  phoneNumber: '',
  blood_type_id: '',
  city: '',
  address: '',
}

export const dataHead = [
  {
    headerName: 'Patient ID',
    fieldname: 'id',
    noCap: true,
  },
  {
    headerName: 'Name',
    fieldname: 'name',
  },
  {
    headerName: 'Date of Birth',
    fieldname: 'dob',
    noCap: true,
  },
  {
    headerName: 'Gender',
    fieldname: `gender`,
    noCap: true,
    fieldChild: 'type',
  },
  {
    headerName: 'Blood Type',
    fieldname: `bloodType`,
    noCap: true,
    fieldChild: 'type',
  },
  {
    headerName: 'Edit',
    fieldname: 'edit',
    delete: true,
    redirect: true,
    path: '/patient/edit/',
  },
]
