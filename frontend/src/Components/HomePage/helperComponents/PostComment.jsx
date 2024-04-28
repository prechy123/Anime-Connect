import { useTheme } from "@emotion/react";
import { ArrowForward, Close } from "@mui/icons-material";
import { Box, Button, List, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BASE_URL from "../../../utils";
import Comment from "./Comments";
import { RotateLoader } from "react-spinners";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const PostComment = ({ setCommentState, postId, commentIndex, setPosts }) => {
  const Navigate = useNavigate();
  const Theme = useTheme();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (postId !== "") {
      fetch(`${BASE_URL}/post/getComments?postId=${postId}`)
        .then((res) => res.json())
        .then((doc) => {
          if (doc.message === "success") {
            setComments(doc.comments);
            setLoading(true);
            if (doc.comments.length === 0) {
              setLoading(false);
              setEmpty(true);
            }
          }
        });
    }
  }, [postId]);

  const handlePostComment = async () => {
    try {
      const userDet = JSON.parse(Cookies.get("weeebsuser"));
      const api = await fetch(`${BASE_URL}/post/postcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId: userDet._id,
          content: comment,
        }),
      });
      const response = await api.json();
      if (response.message === "Comment successfully created") {
        setComment("");
        setEmpty(false);
        comments.push({
          _id: userDet._id,
          content: comment,
          user: {
            // _id: userDet.user._id,
            username: userDet.username,
            profilepictureurl: userDet.profilepictureurl,
          },
          createdAt: new Date(),
        });
        setPosts((prevVal) => {
          const newPosts = [...prevVal];

          if (newPosts[commentIndex]) {
            newPosts[commentIndex] = {
              ...newPosts[commentIndex],
              commentsCount: newPosts[commentIndex].commentsCount + 1,
            };
          }
          return newPosts;
        });
      } else {
        setError(true);
        setTimeout(() => {
          Navigate("/signup");
        }, 1500);
      }
    } catch (err) {
      setError(true);
      setTimeout(() => {
        Navigate("/signup");
      }, 1500);
    }
  };
  return (
    <Box
      sx={{
        width: {
          xs: "95%",
          sm: "65%",
          md: "50%",
        },
        position: "fixed",
        top: { xs: "10%", sm: "20%" },
        zIndex: "2",
        backgroundColor: Theme.palette.primary.main,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "10px 10px 10px " + Theme.palette.primary.other,
        minHeight: "50vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Typography>Comments</Typography>
        <Close
          sx={{ cursor: "pointer" }}
          onClick={() => setCommentState(false)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            width: "80%",
            bgcolor: "background.paper",
            maxHeight: "300px",
            overflowY: "scroll",
            borderRadius: "20px",
          }}
        >
          {/* {comments ? <Typography>Be the first to post here</Typography> :} */}
          {comments.length > 0
            ? comments.map((comment) => (
                <Comment
                  key={comment._id}
                  content={comment.content}
                  user={comment.user}
                  createdAt={comment.createdAt}
                />
              ))
            : loading && <RotateLoader />}
          {empty && <Typography>Be the first to comment.</Typography>}
        </List>
      </Box>
      {error && (
        <Typography color="error">
          Signup or Signin, then try again
        </Typography>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "5fr 1fr",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        <Box>
          <TextField
            id="outlined-multiline-static"
            multiline
            fullWidth
            color="secondary"
            placeholder="Write new post here"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePostComment}
          >
            Post <ArrowForward sx={{ paddingLeft: "7px" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PostComment;
