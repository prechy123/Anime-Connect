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
  MoreVert,
  Share,
} from "@mui/icons-material";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import BASE_URL from "../../../utils";
import Cookies from "js-cookie";

const FeedBoilerPlate = ({
  setPosts,
  index,
  setLoadingstate,
  postId,
  username,
  fullname,
  content,
  likes,
  likeCount,
  comments,
  commentsCount,
  shareCount,
  profilepictureurl,
  createdAt,
}) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
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
  }, []);
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
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={fullname}
        subheader={"@" + username}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
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
            <IconButton aria-label="Like Post">
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
};

export default FeedBoilerPlate;
