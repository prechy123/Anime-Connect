import { useTheme } from "@emotion/react";
import { ArrowForward, Close } from "@mui/icons-material";
import { Box, Button, List, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BASE_URL from "../../../utils";
import Comment from "./Comments";

const PostComment = ({ setCommentState, postId }) => {
  const Theme = useTheme();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (postId !== "") {
      fetch(`${BASE_URL}/post/getComments?postId=${postId}`)
        .then((res) => res.json())
        .then((doc) => {
          if (doc.message === "success") {
            setComments(doc.comments);
          }
        });
    }
  }, [postId]);
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
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              content={comment.content}
              user={comment.user}
              createdAt={comment.createdAt}
            />
          ))}
          {/* <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment /> */}
        </List>
      </Box>
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
          />
        </Box>
        <Box>
          <Button variant="contained" color="secondary">
            Post <ArrowForward sx={{ paddingLeft: "7px" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PostComment;
