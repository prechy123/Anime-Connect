import { useTheme } from "@emotion/react";
import { ArrowForward, Close } from "@mui/icons-material";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = ({ setEditPage, setChangePP }) => {
  const theme = useTheme();
  const {
    // username,
    // fullname,
    // location,
    // bio,
    animeInterest,
  } = useSelector((state) => state.auth);
  const [newAnimeName, setNewAnimeName] = useState("");
  const [animeList, setAnimeList] = useState(animeInterest);

  const handleRemoveAnimeList = (selectedAnime) => {
    setAnimeList(animeList.filter((anime) => anime !== selectedAnime));
  };

  const handleAddAnime = () => {
    if (newAnimeName.length > 0) {
      setAnimeList([...animeList, newAnimeName]);
      setNewAnimeName("");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        overflowY: "scroll",
        position: "absolute",
        top: "20%",
        zIndex: "2",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "10px 10px 10px " + theme.palette.primary.other,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Typography>Edit Profile</Typography>
        <Close sx={{ cursor: "pointer" }} onClick={() => setEditPage(false)} />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setChangePP(true)}
        >
          Change Profile Picture
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <TextField
            id="standard-basic"
            label="Change Location"
            variant="standard"
            color="secondary"
          />
          <TextField
            id="standard-basic"
            label="Change Bio"
            variant="standard"
            color="secondary"
          />
        </Box>
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          paddingTop={1}
          marginTop={2}
        >
          {animeList.map((animeItem, index) => (
            <Box key={index} sx={{ display: "flex", placeItems: "center" }}>
              <Chip label={animeItem} />
              <Close
                onClick={() => handleRemoveAnimeList(animeItem)}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          ))}
          <Box sx={{ display: "flex", placeItems: "center" }}>
            <TextField
              id="standard-basic"
              label="Add Anime"
              variant="standard"
              color="secondary"
              onChange={(e) => setNewAnimeName(e.target.value)}
                value={newAnimeName}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddAnime}
            >
              Add
            </Button>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{marginTop: "20px"}}
        >
          Submit Change <ArrowForward />
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
