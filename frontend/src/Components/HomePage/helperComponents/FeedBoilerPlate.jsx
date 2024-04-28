/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AccessTime,
  Comment,
  DeleteForever,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";

import { formatDistanceToNow } from "date-fns";
import { memo, useEffect, useState } from "react";
import BASE_URL from "../../../utils";
import Cookies from "js-cookie";
import expirationTime from "../../../../calculate/expirationTime";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default memo(function FeedBoilerPlate({
  setPosts,
  index,
  setLoadingstate,
  setCommentState,
  setPostId,
  postUserId,
  postId,
  username,
  fullname,
  content,
  likes,
  likeCount,
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
  const [contentLength, setContentLength] = useState(120);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const handleDeletePost = async () => {
    setLoading(true);
    const response = await fetch(
      `${BASE_URL}/post/deletepost?postId=${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (
      response.ok &&
      responseData.message === "Message deleted successfully"
    ) {
      setOpen(false);
      setPosts((prevVals) =>
        prevVals.filter((prevVal) => prevVal._id !== postId)
      );
      const user = JSON.parse(Cookies.get("weeebsuser"));
      user.postcount--;
      const userDetails = JSON.stringify(user);
      Cookies.set("weeebsuser", userDetails, {
        expires: expirationTime(),
        sameSite: "None",
        secure: true,
      });
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <Card sx={{ margin: 2, backgroundColor: theme.palette.primary.other }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          {userId === postUserId && (
            <DeleteForever
              sx={{ mr: "10px", cursor: "pointer" }}
              onClick={() => setOpen(true)}
            />
          )}
        </Box>

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
                      setContentLength(content.length);
                    } else {
                      setContentLength(120);
                    }
                  }}
                >
                  ...Show {contentLength === 120 ? "More..." : "Less..."}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Confirm Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Click Yes to delete post and click No to cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="secondary"
          >
            No
          </Button>
          <Button
            onClick={handleDeletePost}
            variant="outlined"
            color="secondary"
          >
            {loading ? "loading..." : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
