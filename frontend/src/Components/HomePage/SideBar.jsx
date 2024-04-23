import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import ActiveFriends from "./helperComponents/ActiveFriends";
// import currentlyTrending from "./helperComponents/currentlyTrending";
import Axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const SideBar = () => {
  const Theme = useTheme();
  const [currentlyTrending, setCurrentlyTrending] = useState([]);
  const [ready, setReady] = useState(false);
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
        <ActiveFriends />
        <Typography variant="h6" fontWeight={600} mt={2}>
          CURRENTLY TRENDING
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 180px)",
            overflowY: "scroll",
          }}
        >
          {ready ? (
            <ImageList variant="masonry" cols={2} gap={8}>
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
                    />
                    <ImageListItemBar
                      position="below"
                      title={`${item.title.substring(0, 15)}...`}
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
    </Box>
  );
};

export default SideBar;
