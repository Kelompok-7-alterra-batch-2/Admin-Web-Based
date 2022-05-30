import { createTheme } from "@nextui-org/react";

export const theme = createTheme({
    type: "light",
    theme : {
        colors : {

            //primary
            primaryLight: '#4E89A8',
            primaryLightHover: '$green300',
            primaryLightActive: '$green400',
            primaryLightContrast: '$green600',
            primary: '#4E89A8',
            primaryBorder: '#4E89A8',
            primaryBorderHover: '$green600',
            primarySolidHover: '$green700',
            primarySolidContrast: '$white',
            primaryShadow: '#4E89A8',

            //neutral (check figma for more)
            black : '#060F1D',
            neutral500 : '#B3BDC9',
            neutral400 : '#CCD5DE',
            neutral300 : '#E2EAF2',
            neutral200 : '#EEF3ED'
        
        },
        fonts : {
            sans: " 'Lato' , sans-serif; ",
            mono : " "
        }
        
    },
})