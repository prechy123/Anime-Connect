import { Alert, Box, Stack, Typography } from "@mui/material";
import SearchBar from "./helperComponents/SearchBar";
import FeedBoilerPlate from "./helperComponents/FeedBoilerPlate";
import ThemeMode from "./helperComponents/ThemeMode";
import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@emotion/react";
import { Close, Menu } from "@mui/icons-material";
import LeftBarXS from "./LeftBarXS";
import AddIcon from "@mui/icons-material/Add";
import CreatePost from "./helperComponents/CreatePost";
import BASE_URL from "../../utils";
import { RotateLoader } from "react-spinners";
import SearchProfile from "./helperComponents/SearchProfile";
import PostComment from "./helperComponents/PostComment";
import { UserDetails } from "./helperComponents/UserDetails";

const Feed = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [showArrow, setShowArrow] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [loadingState, setLoadingstate] = useState(true);
  const [searchState, setSearchState] = useState(false);
  const [searchedProfileId, setSearchedProfileId] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [commentState, setCommentState] = useState(false);
  const [commentIndex, setCommentIndex] = useState();
  const [postId, setPostId] = useState("");
  useEffect(() => {
    fetch(BASE_URL + "/post/getposts")
      .then((res) => res.json())
      .then((doc) => setPosts(doc.messsage));
  }, []);
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
      <Box flex={4} minHeight="100vh">
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
        <Box
          sx={{ marginLeft: { xs: "15%" } }}
          onClick={() => setSearchState(true)}
        >
          <SearchBar
            searchContent={searchContent}
            setSearchContent={setSearchContent}
          />
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
        {loadingState && (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            <RotateLoader color={theme.palette.primary.text} />
            <Typography>
              Please be patient while backend gets started. Patience this may
              take a minute
            </Typography>
          </Box>
        )}
        {posts
          .slice()
          .reverse()
          .map((post, index) => (
            <FeedBoilerPlate
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
              setSearchedProfileId={setSearchedProfileId}
              userPageId={post.userId._id}
            />
          ))}
        <Box
          position="fixed"
          right={-20}
          top={0}
          zIndex={2}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <ThemeMode />
        </Box>
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
        {createPost && (
          <CreatePost setPosts={setPosts} setCreatePost={setCreatePost} />
        )}
        {searchState && (
          <SearchProfile
            setSearchState={setSearchState}
            searchContent={searchContent}
            setSearchContent={setSearchContent}
            setSearchedProfileId={setSearchedProfileId}
          />
        )}
        {searchedProfileId && (
          <UserDetails
            searchedProfileId={searchedProfileId}
            setSearchedProfileId={setSearchedProfileId}
          />
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
          borderRadius: "10px",
          padding: "10px",
          backgroundColor: theme.palette.primary.text,
          color: theme.palette.primary.main,
          bottom: "10px",
          right: {
            md: "calc(100vw - 72vw + 15px)",
            xs: "15px",
          },
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        <AddIcon sx={{ cursor: "pointer" }} />
      </Box>
    </>
  );
};

export default Feed;
