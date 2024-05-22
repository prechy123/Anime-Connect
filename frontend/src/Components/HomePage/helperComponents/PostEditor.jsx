import { useTheme } from "@emotion/react";
import { ArrowForward, Close } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import emojis from "./emojis";
import { useSelector } from "react-redux";
import { showErrorToast } from "../../../utils/toast";

const PostEditor = ({
  setEditor,
  setEditedContent,
  editedContent,
  handleEditPost,
  postImageUrl,
  setEditedImageUrl,
}) => {
  const Theme = useTheme();
  const fileInputRef = useRef(null)
  const mode = useSelector((state) => state.theme.theme);

  const [image, setImage] = useState(postImageUrl);
  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
      setEditedImageUrl(reader.result);
    };
  }
  const handleChange = (e) => {
    const file = e.target.files[0];
    previewFiles(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setEditedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showErrorToast("Feature not added yet", mode)
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
        <Typography>Edit Post</Typography>
        <Close sx={{ cursor: "pointer" }} onClick={() => setEditor(false)} />
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
            setEditedContent(e.target.value);
          }}
          value={editedContent}
          autoFocus
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            padding: "20px 20px 0 20px",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input type="file" onChange={handleChange} ref={fileInputRef}/>
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
                  right: 0,
                  cursor: "pointer",
                }}
                onClick={handleRemoveImage}
              >
                <Close />
              </span>
            </div>
          )}
        </div>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={1}>
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
            onClick={handleEditPost}
          >
            Post <ArrowForward sx={{ paddingLeft: "7px" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PostEditor;
