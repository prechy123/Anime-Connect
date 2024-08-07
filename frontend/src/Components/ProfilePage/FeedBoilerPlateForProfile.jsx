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
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Comment,
  DeleteForever,
  Edit,
  Equalizer,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";

import { format } from "date-fns";
import { forwardRef, memo, useEffect, useState } from "react";
import BASE_URL from "../../utils";
import Cookies from "js-cookie";
import expirationTime from "../../../calculate/expirationTime";
import emojis from "../HomePage/helperComponents/emojis";
import numeral from "numeral";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default memo(function FeedBoilerPlateForProfile({
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
  commentsCount,
  setCommentIndex,
  shareCount,
  views,
  profilepictureurl,
  createdAt,
}) {
  const theme = useTheme();
  const [message, setMessage] = useState(content);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [editor, setEditor] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editorError, setEditorError] = useState(false);
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
  const handleEditPost = async () => {
    if (editedContent.length < 5 || editedContent === message) {
      setEditorError(true);
      return;
    }
    setLoading(true);
    const response = await fetch(`${BASE_URL}/post/editpost?postId=${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        editedMessage: editedContent,
      }),
    });
    const responseData = await response.json();
    if (response.ok && responseData.message === "Updated successfully") {
      setEditor(false);
      setMessage(editedContent);
      setLoading(false);
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
            // title={fullname}
            title={fullname + " · " + format(createdAt, "d, MMMM, yyyy")}
            // subheader={"@" + username + " · " + format(createdAt, "d, MMMM")}
            subheader={"@" + username}
          />
          <Box>
            <Edit
              onClick={() => setEditor(true)}
              sx={{ mr: "15px", cursor: "pointer" }}
            />
            <DeleteForever
              sx={{ mr: "10px", cursor: "pointer" }}
              onClick={() => setOpen(true)}
            />
          </Box>
        </Box>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "15px",
            }}
          >
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="share">
              <Equalizer />
            </IconButton>
            <Typography>{views > 1000 ? numeral(views).format('0.0a') : views}</Typography>
          </Box>
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
      <Dialog
        open={editor}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setEditor(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Enter edited Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={6}
              fullWidth
              color="secondary"
              placeholder="Edit post here"
              onChange={(e) => {
                setEditedContent(e.target.value);
                setEditorError(false);
              }}
              value={editedContent}
              autoFocus
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              mt={1}
            >
              {emojis.map((emoji, index) => (
                <span
                  key={index}
                  onClick={() => setEditedContent((prev) => prev + emoji)}
                  style={{ cursor: "pointer" }}
                >
                  {emoji}
                </span>
              ))}
            </Box>
            {editorError && (
              <Typography color="error">
                Ensure new message and <br />
                mesage length greater than 5
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setEditor(false);
              setEditorError(false);
              setLoading(false);
            }}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleEditPost} variant="outlined" color="secondary">
            {loading ? "loading..." : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
