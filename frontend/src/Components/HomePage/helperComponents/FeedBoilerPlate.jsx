/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AccessTime,
  Comment,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";

import { formatDistanceToNow } from "date-fns";
import { memo, useCallback, useEffect, useState } from "react";
import BASE_URL from "../../../utils";
import Cookies from "js-cookie";

export default memo(function FeedBoilerPlate({
  setPosts,
  index,
  setLoadingstate,
  setCommentState,
  setPostId,
  postId,
  username,
  fullname,
  content,
  likes,
  likeCount,
  comments,
  commentsCount,
  setCommentIndex,
  shareCount,
  profilepictureurl,
  createdAt,
  setSearchedProfileId,
  userPageId,
}) {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(true);
  const [contentLength, setContentLength] = useState(120)
  useEffect(() => {
    if (content.length > 150) {
      setShowFullContent(false);
    }
  }, []);
  if (index === 0) {
    setLoadingstate(false);
  }
  let userId;
  if (Cookies.get("weeebsuser")) {
    userId = JSON.parse(Cookies.get("weeebsuser"))._id;
  }
  useEffect(() => {
    if (likes.includes(userId)) {
      setChecked(true);
    }
  }, [likes, userId]);
  const handleLikeSystem = async () => {
    if (checked === false) {
      setChecked(true);
      setPosts((prevVal) => {
        const newPosts = [...prevVal];

        if (newPosts[index]) {
          newPosts[index] = {
            ...newPosts[index],
            likesCount: newPosts[index].likesCount + 1,
          };
        }
        return newPosts;
      });
      await fetch(`${BASE_URL}/post/likepost`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId,
        }),
      });
    } else {
      setChecked(false);
      setPosts((prevVal) => {
        const newPosts = [...prevVal];

        if (newPosts[index]) {
          newPosts[index] = {
            ...newPosts[index],
            likesCount: newPosts[index].likesCount - 1,
          };
        }
        return newPosts;
      });
      await fetch(`${BASE_URL}/post/unlikepost`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId,
        }),
      });
    }
  };
  return (
    <Card sx={{ margin: 2, backgroundColor: theme.palette.primary.other }}>
      <CardHeader
        avatar={<Avatar alt={username} src={profilepictureurl} />}
        title={fullname}
        subheader={"@" + username}
        onClick={() => setSearchedProfileId(userPageId)}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {showFullContent ? (
            content
          ) : (
            <>
              {content.substring(0, contentLength)}{" "}
              <Typography
                variant="p"
                sx={{ cursor: "pointer", display: "inline-block" }}
                color="secondary"
                onClick={() => {
                  if (contentLength === 120) {
                    setContentLength(content.length)
                  } else {
                    setContentLength(120)
                  }
                }}
              >
                ...Show {contentLength === 120 ? 'More...' : 'Less...'}
              </Typography>
            </>
          )}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              aria-label="like post"
              onClick={handleLikeSystem}
              checked={checked}
            />

            <Typography>{likeCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="comment on Post"
              onClick={() => {
                setCommentState(true);
                setPostId(postId);
                setCommentIndex(index);
              }}
            >
              <Comment />
            </IconButton>
            <Typography>{commentsCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
            <Typography>{shareCount}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton aria-label="share">
            <AccessTime />
          </IconButton>
          <Typography>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
});
