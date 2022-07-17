import Box from '@mui/material/Box'
import { useState } from 'react'

import { DataNotFound } from '@/components'

import ItemOutpatientBox from './ItemOutpatientBox'
import DetailOutpatientBox from './DetailOutpatientBox'

const PastOutpatientBox = (props) => {
  const { data } = props

  const [dataDetail, setDataDetail] = useState(null)

  const handleClickDetail = (index) => {
    setDataDetail(data[index])
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
      }}
    >
      {data.length !== 0 &&
        dataDetail === null &&
        data.map((item, index) => (
          <Box key={index}>
            <ItemOutpatientBox
              onClickDetail={() => handleClickDetail(index)}
              data={item}
            />
          </Box>
        ))}

      {data.length === 0 && <DataNotFound />}

      {dataDetail && (
        <DetailOutpatientBox
          data={dataDetail}
          onClickDetail={() => setDataDetail(null)}
        />
      )}
    </Box>
  )
}

export default PastOutpatientBox
