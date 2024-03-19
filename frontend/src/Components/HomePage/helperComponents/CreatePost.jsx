import { useTheme } from "@emotion/react";
import { ArrowForward, Close } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";

function CreatePost({ setCreatePost }) {
  const Theme = useTheme();
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
        />
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
          >
            Post <ArrowForward sx={{ paddingLeft: "7px" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePost;
