import { useState } from 'react'

import {
  Box,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Button,
  Typography,
} from '@mui/material'

import Search from '@mui/icons-material/Search'

import { CustomInput } from 'components'

import { fetchSearch } from 'api/get'

const SearchInput = (props) => {
  const { onChange, value, item, onSubmit, error } = props

  const [isLoading, setIsLoading] = useState(false)

  const [list, setList] = useState(null)

  const [openPopper, setOpenPopper] = useState(false)

  const [isError, setIsError] = useState(false)

  const handleSearch = async (param) => {
    setIsLoading(true)

    const { data, error } = await fetchSearch(param, value)

    if (data) {
      setOpenPopper(true)
      setList(data)
    }
    setIsError(error)
    setIsLoading(false)
  }

  const handleCancelSearch = () => {
    setOpenPopper(false)
    setList(null)
  }

  const handleSubmitSearch = (e) => {
    onSubmit(e)
    setOpenPopper(false)
  }

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <CustomInput
        name={item.fieldname}
        value={value}
        label={item.title}
        onChange={onChange}
        type='text'
        multiline={false}
        isError={error}
        errorMessage={`Field ${item.title} is empty or not search yet`}
        endAdornment={
          <Box>
            <IconButton
              onClick={() => {
                handleSearch(item.fieldname)
              }}
              sx={{
                position: 'relative',
              }}
            >
              <Search />
              {isLoading.search && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'primary.main',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </IconButton>
          </Box>
        }
      />

      {openPopper && (
        <Paper
          sx={{
            position: 'absolute',
            width: '100%',
            zIndex: 1,
            padding: '5px',
          }}
        >
          <List>
            {list &&
              list.length > 0 &&
              list.map((itemPop, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() => handleSubmitSearch(itemPop.name)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '1',
                      my: '5px',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography variant='body2'>{itemPop.name}</Typography>

                    <Typography variant='body7'>{itemPop.address}</Typography>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>

          {(isError || list.length === 0) && (
            <Typography
              sx={{
                textAlign: 'center',
                color: 'neutral500',
              }}
              variant='body2'
            >
              {value} isn't in database
            </Typography>
          )}

          <Button
            variant='outlined'
            color='error'
            onClick={handleCancelSearch}
            size='small'
            sx={{
              float: 'right',
            }}
          >
            Cancel
          </Button>
        </Paper>
      )}
    </Box>
  )
}

export default SearchInput
