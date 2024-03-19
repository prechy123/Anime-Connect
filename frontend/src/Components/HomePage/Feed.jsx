import { Box, Typography } from "@mui/material";
import SearchBar from "./helperComponents/SearchBar";
import FeedBoilerPlate from "./helperComponents/FeedBoilerPlate";
import ThemeMode from "./helperComponents/ThemeMode";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@emotion/react";
import { Close, Menu } from "@mui/icons-material";
import LeftBarXS from "./LeftBarXS";
import AddIcon from "@mui/icons-material/Add";
import CreatePost from "./helperComponents/CreatePost";

const Feed = () => {
  const theme = useTheme();
  const [showArrow, setShowArrow] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const [createPost, setCreatePost] = useState(false)
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
    <>
      <Box flex={4}>
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
        <Box sx={{ marginLeft: { xs: "15%" } }}>
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
            WEEEBS
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
        {/* {showArrow && ( */}
        <Box
          position="fixed"
          zIndex={2}
          onClick={setCurrentPositionToBeggining}
          sx={{
            borderRadius: "50%",
            padding: "10px",
            backgroundColor: theme.palette.primary.arrow,
            bottom: showArrow ? "10px" : "-70px",
            transition: "bottom 1s ease",
            right: {
              xs: "calc(50% - 24px)",
              sm: "calc(100vw - 70vw)",
              md: "50%",
            },
          }}
        >
          <ArrowUpwardIcon sx={{ cursor: "pointer" }} />
        </Box>
        {createPost && <CreatePost setCreatePost={setCreatePost} />}
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
      <Box
        position="fixed"
        zIndex={2}
        onClick={() => setCreatePost(true)}
        sx={{
          borderRadius: "50%",
          padding: "10px",
          backgroundColor: theme.palette.primary.text,
          color: theme.palette.primary.main,
          bottom: "10px",
          right: {
            md: "calc(100vw - 72vw + 15px)",
            xs: "15px",
          },
        }}
      >
        <AddIcon sx={{ cursor: "pointer" }} />
      </Box>
      
    </>
  );
};

export default Feed;
