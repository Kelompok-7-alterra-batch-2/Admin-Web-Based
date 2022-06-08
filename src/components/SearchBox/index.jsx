import React from 'react'

import { Button, Grid , InputBase, IconButton} from '@mui/material'

import Search from '@mui/icons-material/Search'

export default function SearchBox(props) {

    const {
        labelLeftButton,
        placeholder,
        onClickSearch,
        onChangeSearch,
        onClickLeftButton} = props

  return (

        <Grid 
        container
        spacing={5}
        >
            <Grid
            item
            xs={3}
            >

                <Button
                variant='contained'
                fullWidth
                onClick={onClickLeftButton}
                >{labelLeftButton}</Button>
            
            </Grid>
            
            <Grid
            item
            xs={9}
            >
            
            <InputBase
                fullWidth
                placeholder={placeholder}
                onChange={onChangeSearch}
                sx={{
                    bgcolor : 'neutral200',
                    fontSize : '14px',
                    fontWeight : '400',
                    borderRadius : '4px',
                    padding : '0.25px 30px'
                }}

                endAdornment={
                    <IconButton
                    aria-label='search'
                    onClick={onClickSearch}
                    sx={{
                        color: 'neutral500'
                    }}
                    >
                        <Search/>
                    </IconButton>}
                />

            </Grid>

        </Grid>

  )
}