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
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'

import Search from '@mui/icons-material/Search'
import Cancel from '@mui/icons-material/Cancel'

import { CustomInput } from 'components'

import { fetchSearch } from 'api/get'
import { toCapitalize } from 'helpers/function/toCapitalize'

const SearchInput = (props) => {
  const { initial, value, item, onSubmit, error } = props

  const [isLoading, setIsLoading] = useState(false)

  const [list, setList] = useState(null)

  const [openPopper, setOpenPopper] = useState(false)

  const [isError, setIsError] = useState(false)

  const [search, setSearch] = useState('')

  const [result, setResult] = useState(null)

  const handleSearch = async () => {
    setIsLoading(true)

    let data
    let error = false

    await fetchSearch(item.endPoint, search)
      .then((res) => {
        data = res.data
      })
      .catch(() => {
        error = true
      })

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

  const handleSubmitSearch = (value) => {
    setSearch('')
    setResult(value)
    onSubmit(value[item.param.first.value])
    setOpenPopper(false)
    setList(null)
  }

  const handleReset = () => {
    onSubmit('')
  }

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {value !== '' && (
        <>
          <FormControl fullWidth disabled>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 'normal',
              }}
            >
              {item.title}
            </Typography>

            <Select
              name={item.fieldname}
              value={value}
              size='small'
              sx={{
                fontSize: '16px',
                fontWeight: 'normal',
              }}
            >
              {initial !== '' && !result && (
                <MenuItem disabled value={initial[item.param.first.value]}>
                  {toCapitalize(initial[item.param.first.title])}
                </MenuItem>
              )}
              {result && value !== '' && (
                <MenuItem disabled value={result[item.param.first.value]}>
                  {toCapitalize(result[item.param.first.title])}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <IconButton
            color='error'
            sx={{
              position: 'absolute',
              transform: 'translate(-105%,65%)',
            }}
            onClick={handleReset}
          >
            <Cancel fontSize='small' />
          </IconButton>
        </>
      )}
      {value === '' && (
        <>
          <CustomInput
            name={item.fieldname}
            value={search}
            label={item.title}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            type='text'
            multiline={false}
            isError={error}
            errorMessage={`Field ${item.title} is empty or not search yet`}
            endAdornment={
              <Box>
                <IconButton
                  onClick={handleSearch}
                  sx={{
                    position: 'relative',
                  }}
                  disabled={search.length > 3 ? false : true}
                >
                  <Search />
                  {isLoading && (
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
                        onClick={() => handleSubmitSearch(itemPop)}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '1',
                          my: '5px',
                          alignItems: 'baseline',
                        }}
                      >
                        <Typography variant='body2'>
                          {itemPop[item.param.first.title]}
                        </Typography>

                        <Typography variant='body7'>
                          {itemPop[item.param.second]}
                        </Typography>
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
                  {search} isn't in database
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
        </>
      )}
    </Box>
  )
}

export default SearchInput
