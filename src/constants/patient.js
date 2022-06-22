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
    fieldname: 'gender_id',
    type: 'radio-with-api',
    endPoint: 'genders',
  },
  {
    title: 'Phone Number',
    fieldname: 'phoneNumber',
    type: 'text',
  },
  {
    title: 'Blood Type',
    fieldname: 'blood_type_id',
    type: 'select-with-api',
    value: 'bloodType',
    valueChild: 'id',
    endPoint: 'bloods',
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
    redirect: true,
    path: '/patient/edit/',
  },
]
