import React, { useState } from "react";
import { Link } from "react-router-dom";

// components
import { Box } from "@mui/system";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// assets
import Logo from "assets/svg/Logo2.svg";

export default function Login() {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "primary.main",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "23rem",
          height: "30rem",
          bgcolor: "white",
          margin: "1.2rem",
          borderRadius: "24px",
          boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
          padding: "2rem 2.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img width="128px" src={Logo} alt="logo" />
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "primary.main",
              pt: "0.5rem",
              pb: "2rem",
            }}
          >
            Care Hospital
          </Box>
        </Box>

        <Box component="form">
          <InputLabel
            shrink
            htmlFor="login-email"
            sx={{ fontSize: "18px", color: "black" }}
          >
            Email
          </InputLabel>
          <TextField fullWidth id="login-email" size="small" type="text" />
          <br />
          <br />
          <InputLabel
            shrink
            htmlFor="login-password"
            sx={{ fontSize: "18px", color: "black" }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            fullWidth
            id="login-password"
            size="small"
            type={values.showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              fontSize: "14px",
              paddingTop: "0.3rem",
            }}
          >
            <Link style={{ textDecoration: "none", color: "#B3BDC9" }} to="/">
              Forget password?
            </Link>
          </Box>
          <br />
          <Button fullWidth variant="contained">
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
