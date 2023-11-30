import { Box, Typography } from "@mui/material";
import SearchBar from "./helperComponents/SearchBar";
import FeedBoilerPlate from "./helperComponents/FeedBoilerPlate";

const Feed = () => {
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
          sx={{ display: { xs: "block", md: "none" }}}
          position="fixed"
          right={10}
        >
          ANIME CONNECT
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
    </Box>
  );
};

export default Feed;
