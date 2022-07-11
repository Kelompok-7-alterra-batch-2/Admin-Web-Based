import React from "react";
import { Link } from "react-router-dom";

// Assets
import NotFoundLogo from "@/assets/svg/404.svg";
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#EEF3ED",
        textDecoration: "none",
      }}
    >
      <img src={NotFoundLogo} alt="404" width={"35%"} />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Box sx={{ display: "flex", color: "#3f3d56", mt: "20px" }}>
          Go back
        </Box>
      </Link>
    </Box>
    // <div className="h-screen w-screen flex justify-center flex-col items-center bg-base">
    //   <img src={NotFoundLogo} alt="" className="w-1/2 md:w-1/3" />
    //   <Link to="/" className="text-sm mt-5 font-medium flex items-center">
    //     <span className="mr-1"></span> Go Back
    //   </Link>
    // </div>
  );
};

export default NotFound;
