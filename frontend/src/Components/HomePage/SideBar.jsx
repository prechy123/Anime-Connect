import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import ActiveFriends from "./helperComponents/ActiveFriends";
import currentlyTrending from "./helperComponents/currentlyTrending";

const SideBar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position="fixed" p={2}>
        <Typography variant="h6" fontWeight={600}>
          ANIME CONNECT
        </Typography>
        <ActiveFriends />
        <Typography variant="h6" fontWeight={600} mt={2}>
          CURRENTLY TRENDING
        </Typography>
        <Box
          sx={{
            width: "auto",
            height: "calc(100vh - 180px)",
            overflowY: "scroll",
          }}
        >
          <ImageList variant="masonry" cols={2} gap={8}>
            {currentlyTrending.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar position="below" title={item.author} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
