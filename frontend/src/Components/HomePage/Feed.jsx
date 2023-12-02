import { Box, Typography } from "@mui/material";
import SearchBar from "./helperComponents/SearchBar";
import FeedBoilerPlate from "./helperComponents/FeedBoilerPlate";
import ThemeMode from "./helperComponents/ThemeMode";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@emotion/react";

const Feed = () => {
  const theme = useTheme();
  const [showArrow, setShowArrow] = useState(false);
  window.onscroll = function () {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > 100) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };
  const setCurrentPositionToBeggining = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box flex={4}>
      <Box>
        <SearchBar />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          fontWeight={400}
          color="primary.text"
          mt={7}
          mb={-2}
        >
          Feeds
        </Typography>
        <Typography
          variant="h6"
          fontWeight={600}
          color="primary.text"
          mt={7}
          mb={-2}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          WEEEDS
          <Typography display="inline" color="secondary">
            .com
          </Typography>
        </Typography>
      </Box>
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <FeedBoilerPlate />
      <Box
        position="fixed"
        right={-20}
        top={0}
        zIndex={2}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <ThemeMode />
      </Box>
      {showArrow && (
        <Box
          position="fixed"
          bottom={10}
          right="calc(50% - 22px)"
          zIndex={2}
          onClick={setCurrentPositionToBeggining}
          sx={{
            borderRadius: "50%",
            padding: "10px",
            backgroundColor: theme.palette.primary.arrow,
          }}
        >
          <ArrowUpwardIcon />
        </Box>
      )}
    </Box>
  );
};

export default Feed;
