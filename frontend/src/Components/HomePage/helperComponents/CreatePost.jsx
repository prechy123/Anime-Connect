import { useTheme } from "@emotion/react";
import { ArrowForward, Close } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import BASE_URL from "../../../utils";
import expirationTime from "../../../../calculate/expirationTime";
import { useNavigate } from "react-router-dom";
import emojis from "./emojis";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/toast";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreatePost = ({ setPosts, setCreatePost }) => {
  const Theme = useTheme();
  const Navigate = useNavigate();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const fileInputRef = useRef(null);
  const mode = useSelector((state) => state.theme.theme);

  const [image, setImage] = useState("");
  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  }
  const handleChange = (e) => {
    const file = e.target.files[0];
    previewFiles(file);
  };

  const handlePostMessage = async () => {
    let user;
    if (content.length < 5) {
      showErrorToast("Ensure post is not less than 5 letters", mode);
      return;
    }
    if (Cookies.get("weeebsuser")) {
      const toastId = showLoadingToast("Uploading Post", mode);
      user = JSON.parse(Cookies.get("weeebsuser"));
      await fetch(`${BASE_URL}/post/newpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          content,
          imageUrl: image,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "message posted successfully") {
            toast.dismiss(toastId);
            showSuccessToast("Post created successfully", mode);
            setPosts((prevItems) => [
              ...prevItems,
              {
                userId: {
                  _id: user._id,
                  username: user.username,
                  fullname: user.fullname,
                  profilepictureurl: user.profilepictureurl,
                },
                content,
                postImage: {
                  url: image,
                },
                likes: [],
                likesCount: 0,
                comments: [],
                commentsCount: 0,
                shareCount: 0,
                createdAt: new Date(),
              },
            ]);
            user.postcount++;
            const userDetails = JSON.stringify(user);
            Cookies.set("weeebsuser", userDetails, {
              expires: expirationTime(),
              sameSite: "None",
              secure: true,
            });
            setCreatePost(false);
          } else {
            toast.dismiss(toastId);
            showErrorToast("Ensure you are signed in then try again", mode);
            setError(true);
            setTimeout(() => {
              Navigate("/signin");
            }, 1500);
          }
        })
        .catch(() => setError(true));
    } else {
      setError(true);
      showErrorToast("Ensure you are signed in", mode)
      setTimeout(() => {
        Navigate("/signin");
      }, 1500);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        maxHeight: "70vh",
        position: "fixed",
        top: { xs: "10%", sm: "20%" },
        zIndex: "2",
        backgroundColor: Theme.palette.primary.main,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "10px 10px 10px " + Theme.palette.primary.other,
        overflowY: "scroll",
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
          rows={3}
          fullWidth
          color="secondary"
          placeholder="Write new post here"
          onChange={(e) => {
            setError(false);
            setContent(e.target.value);
          }}
          value={content}
          autoFocus
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={1}>
          {emojis.map((emoji, index) => (
            <span
              key={index}
              onClick={() => setContent((prev) => prev + emoji)}
              style={{ cursor: "pointer" }}
            >
              {emoji}
            </span>
          ))}
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            padding: "20px 20px 0 20px",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <label
            style={{
              border: "1px solid #ccc",
              display: "inline-block",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            {fileInputRef?.current?.value ? "Change " : "Upload "}
            Image
            <input
              type="file"
              onChange={handleChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </label>
          {image && (
            <div style={{ position: "relative" }}>
              <img
                src={image}
                width="100px"
                height="100px"
                style={{ borderRadius: "10px" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: -25,
                  cursor: "pointer",
                }}
                onClick={handleRemoveImage}
              >
                <Close />
              </span>
            </div>
          )}
        </div>
        
        <Box
          sx={{
            display: "flex",
            placeItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: "10px" }}
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
