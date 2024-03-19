import { useTheme } from "@emotion/react";
import { ArrowForward, Close } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import BASE_URL from "../../../utils";

const CreatePost = ({ setCreatePost }) => {
  const Theme = useTheme();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const handlePostMessage = async () => {
    let user = JSON.parse(Cookies.get("user"));

    await fetch(`${BASE_URL}/post/newpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== "message posted successfully") {
          setError(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <Box
      sx={{
        width: {
          xs: "95%",
          sm: "65%",
          md: "50%",
        },
        maxHeight: "70vh",
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
        <Typography>Write a New Post</Typography>
        <Close
          sx={{ cursor: "pointer" }}
          onClick={() => setCreatePost(false)}
        />
      </Box>
      <Box>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={6}
          fullWidth
          color="secondary"
          placeholder="Write new post here"
          onChange={(e) => {
            setError(false);
            setContent(e.target.value);
          }}
        />
        {error && (
          <Typography color="error">
            Ensure textfield is filled or try again
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            placeItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: "20px" }}
            onClick={handlePostMessage}
          >
            Post <ArrowForward sx={{ paddingLeft: "7px" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
