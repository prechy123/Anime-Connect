import {
  Avatar,
  Badge,
  Box,
  Chip,
  Stack,
  Typography,
  styled,
  useTheme,
  Button,
} from "@mui/material";
import FeedBoilerPlate from "./FeedBoilerPlate";
import { useEffect, useState } from "react";
import BASE_URL from "../../../utils";
import { Close, Feed, FmdGood, Verified } from "@mui/icons-material";
import { RotateLoader } from "react-spinners";
// import Cookies from "js-cookie"

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const UserDetails = ({ searchedProfileId, setSearchedProfileId }) => {
  const Theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [userDetailReady, setUserDetailReady] = useState(false);
  const [loadingState, setLoadingstate] = useState(true);
  useEffect(() => {
    fetch(`${BASE_URL}/users/user?userId=${searchedProfileId}`)
      .then((res) => res.json())
      .then((doc) => {
        setUserDetail(doc);
        setUserDetailReady(true);
      });
    fetch(`${BASE_URL}/post/getmyposts?userId=${searchedProfileId}`)
      .then((res) => res.json())
      .then((doc) => setPosts(doc.messsage), setLoadingstate(false));
  }, [searchedProfileId]);

  const handleFollowUser = () => {
    // const userId = JSON.parse(Cookies.get("weeebsuser"))._id;
    // fetch(`${BASE_URL}/users/user?userId=${searchedProfileId}`)
  };

  const {
    username,
    fullname,
    profilePictureUrl,
    theme,
    post,
    followers,
    following,
    location,
    bio,
    animeInterest,
    verified,
  } = userDetail;
  return (
    <>
      {userDetailReady ? (
        <Box
          sx={{
            width: {
              xs: "95%",
              sm: "65%",
              md: "50%",
            },
            height: "70vh",
            position: "fixed",
            top: { xs: "10%", sm: "20%" },
            zIndex: "2",
            backgroundColor: Theme.palette.primary.other,
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "10px 10px 10px " + Theme.palette.primary.other,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "20px",
            }}
          >
            <Typography>Searched Profile</Typography>
            <Close
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setSearchedProfileId("");
              }}
            />
          </Box>
          <Box
            sx={{
              maxHeight: "60vh",
              overflowY: "scroll",
            }}
          >
            <Box
              sx={{
                backgroundColor: Theme.palette.primary.other,
                padding: "20px",
                borderRadius: Theme.shape.borderRadius,
              }}
              position="relative"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
              >
                <Badge sx={{ cursor: "pointer" }}>
                  <Avatar alt="Profile Picture" src={profilePictureUrl} />
                </Badge>
                <Typography
                  variant="p"
                  fontWeight={100}
                  display="flex"
                  gap={0.5}
                  alignItems="center"
                >
                  {username} {verified && <Verified />}
                </Typography>
                <Typography variant="h5" fontWeight={500}>
                  {fullname}
                </Typography>
                <Stack
                  direction="row"
                  gap={3}
                  sx={{ display: { sm: "none", md: "flex" } }}
                >
                  <StyledBox>
                    <Typography>{followers.length}</Typography>
                    <Typography>Followers</Typography>
                  </StyledBox>
                  <StyledBox>
                    <Typography>{following.length}</Typography>
                    <Typography>Following</Typography>
                  </StyledBox>
                </Stack>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleFollowUser}
                >
                  Follow
                </Button>
                <Typography display="flex" gap={1} alignItems="center">
                  <Feed /> {bio}
                </Typography>
              </Box>
              <Typography fontWeight={700} variant="h5" paddingTop={2}>
                Location:
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                gap={1}
                paddingTop={1}
              >
                <FmdGood /> {location}
              </Typography>
              <Typography fontWeight={700} variant="h5" paddingTop={2}>
                Anime Interests:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" paddingTop={1}>
                {animeInterest.map((animeItem, index) => (
                  <Chip
                    sx={{ backgroundColor: theme }}
                    key={index}
                    label={animeItem}
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: Theme.palette.primary.other,
                padding: "20px",
                borderRadius: Theme.shape.borderRadius,
              }}
            >
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight={700}>Profile Summary</Typography>
                  <Typography>Joined recently.</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Total Posts</Typography>
                  <Typography>{post.length}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Total Communities</Typography>
                  <Typography>0</Typography>
                </Box>
              </Box>
            </Box>
            {loadingState && <RotateLoader />}
            {posts
              .slice()
              .reverse()
              .map((post, index) => (
                <FeedBoilerPlate
                  setPosts={setPosts}
                  index={posts.length - 1 - index}
                  setLoadingstate={setLoadingstate}
                  key={post._id}
                  postId={post._id}
                  postUserId={post.userId._id}
                  username={post.userId.username}
                  fullname={post.userId.fullname}
                  content={post.content}
                  likes={post.likes}
                  likeCount={post.likesCount}
                  comments={post.comments}
                  commentsCount={post.commentsCount}
                  shareCount={post.shareCount}
                  profilepictureurl={post.userId.profilepictureurl}
                  createdAt={post.createdAt}
                  views={post.views}
                />
              ))}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: {
              xs: "95%",
              sm: "65%",
              md: "50%",
            },
            height: "70vh",
            position: "fixed",
            top: { xs: "10%", sm: "20%" },
            zIndex: "2",
            backgroundColor: Theme.palette.primary.main,
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "10px 10px 10px " + Theme.palette.primary.other,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "20px",
            }}
          >
            <Typography>Searched Profile</Typography>
            <Close
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setSearchedProfileId("");
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <RotateLoader />
          </Box>
        </Box>
      )}
    </>
  );
};
