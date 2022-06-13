import { createTheme } from "@mui/material";

import { customPalette } from "./structures/palette";
import { customComponents } from "./structures/components";
import { customTyphography } from "./structures/typography";

export const theme = createTheme({
    palette : customPalette,
    components: customComponents,
    typography: customTyphography,
})