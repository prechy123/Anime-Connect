import { Box, Typography } from "@mui/material";
import SearchBar from "./helperComponents/SearchBar";
import FeedBoilerPlate from "./helperComponents/FeedBoilerPlate";

const Feed = () => {
  return (
    <Box flex={4}>
      <Box>
        <SearchBar />
      </Box>
      <Typography variant="h4" fontWeight={400} color="primary.text" mt={7} mb={-2}>
          Feeds
        </Typography>
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
