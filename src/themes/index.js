import { createTheme } from "@mui/material";
export const theme = createTheme({
    palette : {
        //see more details in figma
        primary : {
            main : '#4E89A8',
        },
        neutral900 : '#060F1D',
        neutral500 : '#B3BDC9',
        neutral400 : '#CCD5DE',
        neutral300 : '#E2EAF2',
        neutral200 : '#EEF3ED'

    },
    components: {
        MuiButton: {
            styleOverrides: {
                root : {
                    fontSize: '16px'
                }
            }
        },
        MuiListItem : {
            styleOverrides: {
                root : {
                    paddingLeft : '0',
                    paddingRight : '0',
                    paddingTop : '0',
                    paddingBottom : '0'
                }
            }
        },
        MuiListItemIcon : {
            styleOverrides: {
                root : {
                    minWidth : '0'
                }
            }
        },
    },
    typography:{
        fontFamily : 'inherit',
        h1 : {
            fontWeight: 'bolder',
            fontSize : '36px'
        },
        h2 : {
            fontWeight : 'bold',
            fontSize : '32px'
        },
        h3 : {
            fontWeight: 'bold',
            fontSize : '24px'
        },
        body1 : {
            fontSize : '18px',
            fontWeight : 'bolder'
        },
        body2 : {
            fontSize : '16px',
            fontWeight : 'bolder'
        },
        body3 : {
            fontSize : '16px',
            fontWeight : 'bolder'
        },
        body4 : {
            fontSize : '16px',
            fontWeight : 'bold'
        },
        body5 : {
            fontSize : '16px',
            fontWeight : 'normal',
        },
        body6 : {
            fontSize : '14px',
            fontWeight : 'bold',
        },
        body7 : {
            fontSize : '14px',
            fontWeight : 'normal'
        },
        button : {
            textTransform : 'none',
            fontWeight: 'bolder'
        }
    }
})