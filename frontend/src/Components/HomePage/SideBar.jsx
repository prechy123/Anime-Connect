import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
// import ActiveFriends from "./helperComponents/ActiveFriends";
// import currentlyTrending from "./helperComponents/currentlyTrending";
import Axios from "axios";
import { useEffect, useState } from "react";
import Messenger from "./helperComponents/Messenger";

const SideBar = () => {
  const Theme = useTheme();
  const [currentlyTrending, setCurrentlyTrending] = useState([]);
  const [ready, setReady] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);
  useEffect(() => {
    const data = async () => {
      const res = await Axios("https://api.jikan.moe/v4/top/anime");
      let content = [
        {
          img: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
          title: "One Piece",
          source: "Manga",
          url: "https://myanimelist.net/anime/21/One_Piece",
        },
      ];
      res.data.data.map((anime) => {
        content.push({
          img: anime.images.jpg.image_url,
          title: anime.title_english,
          source: anime.source,
          url: anime.url,
        });
      });
      setCurrentlyTrending(content);
      setReady(true);
    };
    data();
  }, []);
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position="fixed" p={2}>
        <Typography variant="h6" fontWeight={600}>
          WEEEBS
          <Typography display="inline" color="secondary">
            .com
          </Typography>
        </Typography>
        {/* <ActiveFriends /> */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowMessenger((prev) => !prev)}
        >
          Chat with friends
        </Button>
        <Typography variant="h6" fontWeight={600} mt={2}>
          CURRENTLY TRENDING
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 150px)",
            overflowY: "scroll",
            borderRadius: "30px",
            border: `3px solid ${Theme.palette.primary.text}`,
          }}
        >
          {ready ? (
            <ImageList
              variant="masonry"
              cols={2}
              gap={8}
              sx={{ margin: "4px" }}
            >
              {currentlyTrending.map((item) => (
                <a
                  key={item.img}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    color: Theme.palette.primary.text,
                  }}
                >
                  <ImageListItem>
                    <img
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        borderRadius: "15px",
                      }}
                    />
                    <ImageListItemBar
                      position="below"
                      title={item.title ? `${item.title.substring(0, 15)}...` : "No Name"}
                    />
                  </ImageListItem>
                </a>
              ))}
            </ImageList>
          ) : (
            <ImageList variant="masonry" cols={2} gap={8}>
              <Box>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton />
              </Box>
              <Box>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton />
              </Box>
              <Box>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton />
              </Box>
              <Box>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton />
              </Box>
            </ImageList>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "90vh",
          bottom: `${showMessenger ? "0" : "-90vh"}`,
          transition: "bottom 1s ease",
        }}
      >
        <Messenger setShowMessenger={setShowMessenger} />
      </Box>
    </Box>
  );
};

export default SideBar;
