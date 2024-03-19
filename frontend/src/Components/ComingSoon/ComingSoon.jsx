import { Close, Menu } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";
import LeftBarXS from "../HomePage/LeftBarXS";

function ComingSoon() {
  const [navBar, setNavBar] = useState(false);
  return (
    <>
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
          }}
          position="fixed"
          top={15}
          left={15}
          onClick={() => setNavBar(!navBar)}
        >
          {navBar ? <Close /> : <Menu />}
        </Box>
        <img
          src="https://img.freepik.com/free-vector/coming-soon-construction-illustration-design_1017-31446.jpg"
          alt="comming soon"
          width="100%"
        />
      </Box>
      <Box
        position="absolute"
        zIndex={2}
        sx={{
          left: navBar ? "0" : "-100vw",
          top: navBar ? "30px" : "-100vh",
          transition: "left 1s ease, top 1s ease",
        }}
      >
        <LeftBarXS />
      </Box>
    </>
  );
}

export default ComingSoon;
