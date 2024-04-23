import {
  Close,
  Edit,
  Feed,
  FmdGood,
  Menu,
  Verified,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeftBarXS from "../HomePage/LeftBarXS";
import ChangeProfilePic from "./helperComponents/ChangeProfilePic";
import EditProfile from "./helperComponents/EditProfile";
import BASE_URL from "../../utils";
import Cookies from "js-cookie";
import { RotateLoader } from "react-spinners";
import FeedBoilerPlateForProfile from "./FeedBoilerPlateForProfile";
import PostComment from "../HomePage/helperComponents/PostComment";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ProfileAuthenticated = () => {
  const Theme = useTheme();
  const [navBar, setNavBar] = useState(false);
  const [changePP, setChangePP] = useState(false);
  const [editPage, setEditPage] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loadingState, setLoadingstate] = useState(true);
  const [commentState, setCommentState] = useState(false);
  const [commentIndex, setCommentIndex] = useState();
  const [postId, setPostId] = useState("");
  useEffect(() => {
    const userId = JSON.parse(Cookies.get("weeebsuser"))._id;
    fetch(`${BASE_URL}/post/getmyposts?userId=${userId}`)
      .then((res) => res.json())
      .then((doc) => setPosts(doc.messsage), setLoadingstate(false));
  }, []);
  const {
    username,
    fullname,
    profilePictureUrl,
    theme,
    postcount,
    followers,
    following,
    location,
    bio,
    animeInterest,
    verified,
  } = useSelector((state) => state.auth);
  return (
    <Box display="flex" flexDirection="column" gap="20px" position="relative">
      <Box
        sx={{
          display: { xs: "block", sm: "none", cursor: "pointer" },
        }}
        position="fixed"
        top={15}
        left={15}
        zIndex={3}
        onClick={() => setNavBar(!navBar)}
      >
        {navBar ? <Close /> : <Menu />}
      </Box>
      <Box
        sx={{
          backgroundColor: Theme.palette.primary.other,
          padding: "20px",
          borderRadius: Theme.shape.borderRadius,
        }}
        position="relative"
      >
        <Box
          position="absolute"
          top={20}
          right={20}
          sx={{ cursor: "pointer" }}
          onClick={() => setEditPage(!editPage)}
        >
          <Edit />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Badge
            onClick={() => setChangePP(!changePP)}
            sx={{ cursor: "pointer" }}
          >
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
              <Typography>{followers}</Typography>
              <Typography>Followers</Typography>
            </StyledBox>
            <StyledBox>
              <Typography>{following}</Typography>
              <Typography>Following</Typography>
            </StyledBox>
          </Stack>
          <Typography display="flex" gap={1} alignItems="center">
            <Feed /> {bio}
          </Typography>
        </Box>
        <Typography fontWeight={700} variant="h5" paddingTop={2}>
          Location:
        </Typography>
        <Typography display="flex" alignItems="center" gap={1} paddingTop={1}>
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
            <Typography>{postcount}</Typography>
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
          <FeedBoilerPlateForProfile
            setPosts={setPosts}
            index={posts.length - 1 - index}
            setLoadingstate={setLoadingstate}
            setCommentState={setCommentState}
            setCommentIndex={setCommentIndex}
            setPostId={setPostId}
            key={post._id}
            postId={post._id}
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
          />
        ))}
      {navBar && (
        <Box
          position="absolute"
          zIndex={2}
          top={30}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <LeftBarXS />
        </Box>
      )}
      {changePP && <ChangeProfilePic setChangePP={setChangePP} />}
      {editPage && (
        <EditProfile setEditPage={setEditPage} setChangePP={setChangePP} />
      )}
      {commentState && (
        <PostComment
          setCommentState={setCommentState}
          postId={postId}
          commentIndex={commentIndex}
          setPosts={setPosts}
        />
      )}
    </Box>
  );
};

export default ProfileAuthenticated;
