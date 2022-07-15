import Box from '@mui/material/Box'

import ItemOutpatientBox from './ItemOutpatientBox'

const UpcomingOutpatientsBox = (props) => {
  const { data } = props

  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: '25px',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {data.map((item, index) => (
        <Box key={index}>
          <ItemOutpatientBox data={item} />
        </Box>
      ))}
    </Box>
  )
}

export default UpcomingOutpatientsBox
