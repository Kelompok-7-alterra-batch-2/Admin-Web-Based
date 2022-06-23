import React from 'react'

import { Button, Grid, InputBase, IconButton } from '@mui/material'

import Search from '@mui/icons-material/Search'
import Add from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'

export default function SearchBox(props) {
  const {
    labelLeftButton,
    placeholder,
    onClickSearch,
    onChangeSearch,
    onClickLeftButton,
    onResetSearch,
    valueSearch,
    children,
  } = props

  return (
    <Grid container spacing={children === undefined ? 5 : 2}>
      {children}
      <Grid item xs={children === undefined ? 9 : 3}>
        <InputBase
          fullWidth
          placeholder={placeholder}
          onChange={onChangeSearch}
          sx={{
            bgcolor: 'neutral200',
            fontSize: '14px',
            fontWeight: '400',
            borderRadius: '4px',
            padding: '0.25px 30px',
          }}
          value={valueSearch}
          endAdornment={
            <>
              {valueSearch !== '' &&
                valueSearch !== null &&
                valueSearch !== undefined && (
                  <IconButton color='error' onClick={onResetSearch}>
                    <Close />
                  </IconButton>
                )}
              <IconButton
                disabled={valueSearch === ''}
                aria-label='search'
                onClick={onClickSearch}
                sx={{
                  color: 'neutral500',
                }}
              >
                <Search />
              </IconButton>
            </>
          }
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant='contained' fullWidth onClick={onClickLeftButton}>
          <Add
            sx={{
              marginRight: '10px',
            }}
          />
          {labelLeftButton}
        </Button>
      </Grid>
    </Grid>
  )
}
